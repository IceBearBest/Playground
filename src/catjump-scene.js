import Phaser from 'phaser';
import Player from './cathead.js';

export default class PlatformerScene extends Phaser.Scene {
    preload() {
        this.load.image('background', 'assets/platform1/background.png');
        this.load.svg('cathead', 'assets/catjump/cat.svg');
        this.load.image("basictilemap", "/assets/platform1/basictile.png");
        this.load.tilemapTiledJSON("level0map", "/assets/platform1/level0.json");
    }
    create () {
        // add background
        this.add.image(400, 300, 'background');
        // add platforms
        const map = this.make.tilemap({key:'level0map'});
        const tiles = map.addTilesetImage("Basic","basictilemap");
        this.platformLayer = map.createLayer('platform', tiles, 0, 0);
        this.platformLayer.setCollisionByProperty({collision: true });
        // add player
        const spawnPoint = map.findObject("object", obj => obj.name === "start point");
        this.player = new Player(this, spawnPoint.x, spawnPoint.y) 
        // set collision between player and platforms
        this.physics.add.collider(this.player.sprite, this.platformLayer);
        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  
    }

    update ()
    {
        this.player.update();
    }
}