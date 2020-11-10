'use strict';

var allBussMallProducts = [];
var tableImage1 = document.getElementById('Image1');
var tableImage2 = document.getElementById('Image2');
var tableImage3 = document.getElementById('Image3');
var bmpTable = document.getElementById('ProductsTable');
var viewResultsButton = document.getElementById('VoteButton');
var numOfVotingRounds = 10;
var numOfVotingTimes = 0;

var bussMallProducts = function(bmpName){ //bmp stands for bussMallProducts to denote variables belong to this constructor
  this.bmpFilePath = `./images/${bmpName}`;
  this.bmpAlt = this.bmpTitle = bmpName.slice(0,bmpName.length - 4);
  this.bmpShown = 0;
  this.bmpVote = 0;

  allBussMallProducts.push(this);
}

function randomIndex(){
  return Math.floor(Math.random() * allBussMallProducts.length);
}

function bmpRender(){
  var bmpRenderWidth = '470';
  var bmpRenderheight = '300';
  var bmpImageIndex1 = 0;
  var bmpImageIndex2 = 0;
  var bmpImageIndex3 = 0;

  bmpImageIndex1 = randomIndex();

  do{
    bmpImageIndex2 = randomIndex();
    bmpImageIndex3 = randomIndex();
  }while(bmpImageIndex2 === bmpImageIndex1 || bmpImageIndex2 === bmpImageIndex3 || bmpImageIndex3 === bmpImageIndex1);
  
  tableImage1.src = allBussMallProducts[bmpImageIndex1].bmpFilePath;
  tableImage2.src = allBussMallProducts[bmpImageIndex2].bmpFilePath;
  tableImage3.src = allBussMallProducts[bmpImageIndex3].bmpFilePath;

  tableImage1.Title = allBussMallProducts[bmpImageIndex1].bmpTitle;
  tableImage2.Title = allBussMallProducts[bmpImageIndex2].bmpTitle;
  tableImage3.Title = allBussMallProducts[bmpImageIndex3].bmpTitle;

  tableImage1.Alt = allBussMallProducts[bmpImageIndex1].bmpAlt;
  tableImage2.Alt = allBussMallProducts[bmpImageIndex2].bmpAlt;
  tableImage3.Alt = allBussMallProducts[bmpImageIndex3].bmpAlt;

  allBussMallProducts[bmpImageIndex1].bmpShown++;
  allBussMallProducts[bmpImageIndex2].bmpShown++;
  allBussMallProducts[bmpImageIndex3].bmpShown++;

  tableImage1.width = tableImage2.width = tableImage3.width = bmpRenderWidth;
  tableImage1.height = tableImage2.height = tableImage3.height = bmpRenderheight;
}

function bmpHandleClick(event){
  bmpRender();
  numOfVotingTimes++;

  for(var i = 0; i < allBussMallProducts.length; i++)
  {
    if(event.target.Title === allBussMallProducts[i].bmpTitle){
      allBussMallProducts[i].bmpVote++;
    }
  }

  if(numOfVotingTimes === numOfVotingRounds){
    bmpTable.removeEventListener('click', bmpHandleClick);
  }
}

function bmpViewResults(event){
  if(numOfVotingTimes === numOfVotingRounds){
    var rtParentElement = document.getElementById('ResultsTable'); //rt = ResultsTable
    var rtRowElement = document.createElement('tr');
    var rtDataElement = document.createElement('th');

    rtParentElement.innerHTML = '';

    rtParentElement.appendChild(rtRowElement);
    rtDataElement.textContent = 'Product';
    rtRowElement.appendChild(rtDataElement);

    rtDataElement = document.createElement('th');
    rtDataElement.textContent = 'Times Viewed';
    rtRowElement.appendChild(rtDataElement);

    rtDataElement = document.createElement('th');
    rtDataElement.textContent = 'Times Voted';
    rtRowElement.appendChild(rtDataElement);

    rtDataElement = document.createElement('th');
    rtDataElement.textContent = 'Percent Chosen';
    rtRowElement.appendChild(rtDataElement);

    for(var i = 0; i < allBussMallProducts.length; i++){
      rtRowElement = document.createElement('tr');
      rtParentElement.appendChild(rtRowElement);

      rtDataElement = document.createElement('td');
      rtDataElement.textContent = allBussMallProducts[i].bmpTitle;
      rtRowElement.appendChild(rtDataElement);

      rtDataElement = document.createElement('td');
      rtDataElement.textContent = allBussMallProducts[i].bmpShown;
      rtRowElement.appendChild(rtDataElement);

      rtDataElement = document.createElement('td');
      rtDataElement.textContent = allBussMallProducts[i].bmpVote;
      rtRowElement.appendChild(rtDataElement);

      rtDataElement = document.createElement('td');
      if(allBussMallProducts[i].bmpShown !== 0){
        rtDataElement.textContent = `${Math.round((allBussMallProducts[i].bmpVote / allBussMallProducts[i].bmpShown) * 100)}%`;
      }else{
        rtDataElement.textContent = 0;
      }
      rtRowElement.appendChild(rtDataElement);
    }
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
