import Phaser from 'phaser';
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);


function preload ()
{
    this.load.image('background', 'assets/platform1/background.png');
    this.load.image('star', 'assets/platform1/star.png');
    this.load.image('bomb', 'assets/platform1/bomb.png');
    this.load.spritesheet('boy','/assets/platform1/boy.png',{frameWidth:50,frameHeight:50})
    this.load.image("basictilemap", "/assets/platform1/basictile.png");
    this.load.tilemapTiledJSON("level0map", "/assets/platform1/level0.json");
}

let platforms;
let player;
let stars;
var score = 0;
var scoreText;
var bombs;
var gameOver;

function create ()
{
    // add background
    this.add.image(400, 300, 'background');
    // add platforms
    const map = this.make.tilemap({key:'level0map'});
    const tiles = map.addTilesetImage("Basic","basictilemap");
    const platformLayer = map.createLayer('platform', tiles, 0, 0);
    platformLayer.setCollisionByProperty({ collision: true });;
    // add player
    const spawnPoint = map.findObject("object", obj => obj.name === "start point");
    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'boy');
    player.setBounce(0.3);
    player.setCollideWorldBounds(true);
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('boy', { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'boy', frame: 0 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('boy', { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    // set collision between player and platforms
    this.physics.add.collider(player, platformLayer);
    // add stars
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    this.physics.add.collider(stars, platformLayer);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    // add bombs
    bombs = this.physics.add.group();
    this.physics.add.collider(bombs, platformLayer);
    this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function collectStar (player, star)
{
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
    if (stars.countActive(true) === 0)
    {
        stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);

        });
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
}

function hitBomb (player, bomb)
{
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
}

function update ()
{
    let cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    if (cursors.up.isDown && player.body.blocked.down)
    {
        player.setVelocityY(-330);
    }
}