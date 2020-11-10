'use strict';

var allBussMallProducts = [];
var tableImage1 = document.getElementById('Image1');
var tableImage2 = document.getElementById('Image2');
var tableImage3 = document.getElementById('Image3');

var bussMallProducts = function(bmpName){ //bmp stands for bussMallProducts to denote variables belong to this constructor
  this.bmpFilePath = `./images/${bmpName}`;
  this.bmpAlt = this.bmpTitle = bmpName.slice(0,bmpName.length - 4);

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

  tableImage1.width = tableImage2.width = tableImage3.width = bmpRenderWidth;
  tableImage1.height = tableImage2.height = tableImage3.height = bmpRenderheight;
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

bmpRender();
