import Phaser from "phaser";

var config = {
  type: Phaser.AUTO,
  width: 770,
  height: 500,
  backgroundColor: '#01171C',
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

var game = new Phaser.Game(config);

function preload(){
  this.load.image('forestBackground', './assets/forestBG.png')
}

function create(){
  this.add.image(385, 220, 'forestBackground').setScale(1.2);
  

}

function update(){

}
