import Phaser from 'phaser';
import Player from './cathead.js'; // Player

class PlatformerScene extends Phaser.Scene {
    preload() {
        this.load.image('background', 'assets/platform1/background.png');
        this.load.spritesheet('cathead','assets/catjump/cat-jump-225.png',{frameWidth:225,frameHeight:225})
        this.load.image('star', '../assets/platform1/star.png');
        this.load.image("basictilemap", "/assets/platform1/basictile.png");
        this.load.tilemapTiledJSON("level0map", "/assets/platform1/singleFrameIce.json");
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
        // add stars
        const starPositionLayer = map.getObjectLayer('stars');
        this.stars = this.physics.add.group();
        this.physics.add.collider(this.stars, this.platformLayer);
        starPositionLayer.objects.forEach(object => { 
            if(object.name === 'star'){
                this.stars.create(object.x, object.y, 'star');  
            }}
        )  
        this.physics.add.overlap(this.player.sprite, this.stars, collectStar, null, this);
        this.score = 0;
        this.scoreText=this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        function collectStar (player, star) {
            console.log("Overlapped")
            star.disableBody(true, true);
            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);
        }
        // add enermies

    }
    update ()
    {
        this.player.update();
    }
}

function InitCatJumpSingle() {
    const config = {
        type: Phaser.AUTO,
        width: 840,
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
};

export {InitCatJumpSingle};