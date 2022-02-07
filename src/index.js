import Phaser from 'phaser';
// import PlatformerScene from './platform-scene.js';
import PlatformerScene from './catjump-scene';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 630,
  parent:'root',
  pixelart:true,
  scene: PlatformerScene,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
      }
  },
};
new Phaser.Game(config);