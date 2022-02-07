import Phaser from 'phaser';
import PlatformerScene from './platform-scene.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 630,
  parent:'root',
  scene: PlatformerScene,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
      }
  },
};
new Phaser.Game(config);