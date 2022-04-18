import Phaser from 'phaser';
export function InitPhaserMatter(){
    const config = {
        type: Phaser.AUTO,
        width: 840,
        height: 630,
        backgroundColor: "#f2f2e9",
        parent:'root',
        pixelart:true,
        scene: MainScene,
        physics: {
            default: 'matter',
            matter: {
                gravity: { y: 1 },
                debug: false
            }
        },
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
      };
    
    new Phaser.Game(config);  
}

class MainScene extends Phaser.Scene {
    preload(){
        this.load.image("basictilemap", "/assets/platform1/basictile.png");
        this.load.tilemapTiledJSON("map", "/assets/platform1/collisionTest.json");
        this.load.atlas('food', 'assets/platform1/rainco_cats.png', 'assets/platform1/rainco_cats_atlas.json');
        // this.load.atlas('food', '../assets/platform1/pixelfood.png', '../assets/platform1/pixelfood_atlas.json');
    };
    create(){
        const map = this.make.tilemap({key:'map'});
        const tiles = map.addTilesetImage('Basic','basictilemap');
        const platformLayer = map.createLayer('platform', tiles, 0, 0);
        platformLayer.setCollisionByProperty({collision: true });
        this.matter.world.convertTilemapLayer(platformLayer);
        const framenames = this.textures.get('food').getFrameNames();
        this.input.on('pointerdown', ()=>{
            const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
            for (let i=0; i < 2; i++) {
                const x = worldPoint.x + Phaser.Math.RND.integerInRange(-10, 10);
                const y = worldPoint.y + Phaser.Math.RND.integerInRange(-10, 10);
                const frame = Phaser.Utils.Array.GetRandom(framenames);
                this.matter.add.image(x, y, 'food', frame, {restitution: 1, friction:0, shape:'circle'}).setScale(0.5);
            }
        })
    };
    update(){};
}