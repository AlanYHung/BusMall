'use strict';

var numOfVotingRounds = 25;
var numOfVotingTimes = 1;
var numOfImagesToBeDisplayed = 3;
var allBussMallProducts = [];
var allBussMallProductTitles = [];
var allBussMallProductShown = [];
var allBussMallProductVote = [];
var randomProductIndex = [];
var tableImageElement = [document.getElementById('Image1'), document.getElementById('Image2'), document.getElementById('Image3')];
var bmpTable = document.getElementById('ProductsTable');
var viewResultsButton = document.getElementById('ViewResultsButton');
var lsShownTag = 'Shown'; //ls = Local Storage
var lsVotesTag = 'Votes';

var bussMallProducts = function(bmpName){ //bmp stands for bussMallProducts to denote variables belong to this constructor
  this.bmpFilePath = `./images/${bmpName}`;
  this.bmpAlt = this.bmpTitle = bmpName.slice(0,bmpName.length - 4);
  this.bmpShown = 0;
  this.bmpVote = 0;

  allBussMallProducts.push(this);
  allBussMallProductTitles.push(this.bmpTitle);
  allBussMallProductShown.push(this.bmpShown);
  allBussMallProductVote.push(this.bmpVote);
}

function randomIndex(){
  return Math.floor(Math.random() * allBussMallProducts.length);
}

function getRandomNumbers(){
  var getRandomIndex = randomIndex();

  for(var i = 0; i < numOfImagesToBeDisplayed; i++){
    while(randomProductIndex.includes(getRandomIndex)){
      getRandomIndex = randomIndex();
    }

    randomProductIndex.unshift(getRandomIndex);
  }

  while(randomProductIndex.length > numOfImagesToBeDisplayed * 2){
    randomProductIndex.pop();
  }
}

function bmpRender(){
  var bmpRenderWidth = '1410';
  var bmpRenderheight = '900';

  getRandomNumbers();

  for(var i = 0; i < numOfImagesToBeDisplayed; i++){
    tableImageElement[i].src = allBussMallProducts[randomProductIndex[i]].bmpFilePath;
    tableImageElement[i].Title = allBussMallProducts[randomProductIndex[i]].bmpTitle;
    tableImageElement[i].Alt = allBussMallProducts[randomProductIndex[i]].bmpAlt;
    allBussMallProducts[randomProductIndex[i]].bmpShown++;
    allBussMallProductShown[randomProductIndex[i]]++;
    tableImageElement[i].width = bmpRenderWidth / numOfImagesToBeDisplayed;
    tableImageElement[i].height = bmpRenderheight / numOfImagesToBeDisplayed;
  }
}

function retrieveResults(){
  var retrieveShownfromLS = localStorage.getItem(lsShownTag); // LS = Local Storage
  var retrieveVotesfromLS = localStorage.getItem(lsVotesTag);

  var parsedShown = JSON.parse(retrieveShownfromLS);
  var parsedVotes = JSON.parse(retrieveVotesfromLS);

  for(var i = 0; i < allBussMallProducts.length; i++){
    allBussMallProductShown[i] += parsedShown[i];
    allBussMallProductVote[i] += parsedVotes[i];
  }

  localStorage.clear();
  storeResults();
}

function storeResults(){
  var srLSShown = []; //sr = storeResults  |  LS = Local Storage
  var srLSVotes = [];

  if(!localStorage.length){
    srLSShown = JSON.stringify(allBussMallProductShown);
    srLSVotes = JSON.stringify(allBussMallProductVote);

    localStorage.setItem(lsShownTag, srLSShown);
    localStorage.setItem(lsVotesTag, srLSVotes);
  }else{
    retrieveResults();
    console.log('Completed');
  }
}

function bmpHandleClick(event){
  for(var i = 0; i < allBussMallProducts.length; i++)
  {
    if(event.target.Title === allBussMallProducts[i].bmpTitle){
      allBussMallProducts[i].bmpVote++;
      allBussMallProductVote[i]++;
    }
  }

  if(numOfVotingTimes === numOfVotingRounds){
    bmpTable.removeEventListener('click', bmpHandleClick);

    for(i = 0; i < tableImageElement.length; i++){
      tableImageElement[i].src = './images/Done.jpg'
    }

    storeResults();
  }else{
    bmpRender();
    numOfVotingTimes++;
  }
}

function drawBarGraph(){
  var canvasParent = document.getElementById('ProductChart');
  new Chart(canvasParent, {
    type: 'bar',
    data: {
      labels: allBussMallProductTitles,
      datasets: [
        {
          label: 'Product Voted',
          barPercentage: 0.5,
          backgroundColor: 'Green',
          data: allBussMallProductVote
        },
        {
          label: 'Product Shown',
          barPercentage: 0.5,
          backgroundColor: 'Black',
          data: allBussMallProductShown
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Total Results',
        fontSize: 20
      },
      scales: {
        xAxes: [{
          stacked: true,
          ticks: {
            autoSkip: false,
            maxRotation: 75,
            minRotation: 75
          }
        }],
        yAxes: [{
          stacked: true
        }]
      }
    },
  });

  canvasParent.style.width = '1460px';
}

function bmpViewResults(){
  if(numOfVotingTimes === numOfVotingRounds){
    var rtParentElement = document.getElementById('ResultsTable'); //rt = ResultsTable
    var rtRowElement = document.createElement('tr');
    var rtDataElement = document.createElement('th');

    rtParentElement.innerHTML = '';
    rtParentElement.style.border = 'black solid 1px';
    rtRowElement.setAttribute('id','ResultsTableHeader');

    rtParentElement.appendChild(rtRowElement);
    rtDataElement.textContent = 'Product';
    rtRowElement.appendChild(rtDataElement);

    rtDataElement = document.createElement('th');
    rtDataElement.textContent = '# Viewed';
    rtRowElement.appendChild(rtDataElement);

    rtDataElement = document.createElement('th');
    rtDataElement.textContent = '# Voted';
    rtRowElement.appendChild(rtDataElement);

    for(var i = 0; i < allBussMallProducts.length; i++){
      rtRowElement = document.createElement('tr');
      rtParentElement.appendChild(rtRowElement);

      rtDataElement = document.createElement('td');
      rtDataElement.textContent = allBussMallProducts[i].bmpTitle;
      rtRowElement.appendChild(rtDataElement);

      rtDataElement = document.createElement('td');
      rtDataElement.textContent = allBussMallProducts[i].bmpShown;
      rtDataElement.align = 'center';
      rtRowElement.appendChild(rtDataElement);

      rtDataElement = document.createElement('td');
      rtDataElement.textContent = allBussMallProducts[i].bmpVote;
      rtDataElement.align = 'center';
      rtRowElement.appendChild(rtDataElement);
    }

    drawBarGraph();
  }
}

new bussMallProducts('bag.jpg');
new bussMallProducts('banana.jpg');
new bussMallProducts('bathroom.jpg');
new bussMallProducts('boots.jpg');
new bussMallProducts('breakfast.jpg');
new bussMallProducts('bubblegum.jpg');
new bussMallProducts('chair.jpg');
new bussMallProducts('cthulhu.jpg');
new bussMallProducts('dog-duck.jpg');
new bussMallProducts('dragon.jpg');
new bussMallProducts('pen.jpg');
new bussMallProducts('pet-sweep.jpg');
new bussMallProducts('scissors.jpg');
new bussMallProducts('shark.jpg');
new bussMallProducts('sweep.png');
new bussMallProducts('tauntaun.jpg');
new bussMallProducts('unicorn.jpg');
new bussMallProducts('usb.gif');
new bussMallProducts('water-can.jpg');
new bussMallProducts('wine-glass.jpg');

bmpTable.addEventListener('click',bmpHandleClick);
viewResultsButton.addEventListener('click',bmpViewResults);

bmpRender();
