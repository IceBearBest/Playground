import Phaser from 'phaser';
import Player from './player.js';

export default class PlatformerScene extends Phaser.Scene {
    preload() {
        this.load.image('background', 'assets/platform1/background.png');
        this.load.image('star', 'assets/platform1/star.png');
        this.load.image('bomb', 'assets/platform1/bomb.png');
        this.load.spritesheet('boy','/assets/platform1/boy.png',{frameWidth:50,frameHeight:50})
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
        // add stars
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        this.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });
        this.physics.add.collider(this.stars, this.platformLayer);
        this.physics.add.overlap(this.player.sprite, this.stars, this.collectStar, null, this);
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        this.score = 0;
        // add bombs
        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, this.platformLayer);
        this.physics.add.collider(this.player.sprite, this.bombs, this.hitBomb, null, this);
    }

     hitBomb (player, bomb)
    {
        this.physics.pause();
        this.player.sprite.setTint(0xff0000);
        this.player.sprite.anims.play('turn');
    }
    collectStar (player, star)
    {
        star.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
        if (this.stars.countActive(true) === 0)
        {
            this.stars.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
    
            });
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            var bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    }
    update ()
    {
        this.player.update();
    }
}