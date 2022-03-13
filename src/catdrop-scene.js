import Phaser from "phaser";

// [TODO] Add GameOver Condition, Timer Needed?
// [TODO] Rescale to support mobile
function weightedRandom(pool) {
    var candidates = Object.keys(pool);
    var sum = 0;
    for (let i in pool){
        sum += pool[i];
    }
    var r = Math.random()*sum;
    var cumSum = 0;
    for (let idx=0;idx < candidates.length;idx++){
        if (r >= cumSum && r< pool[candidates[idx]]+cumSum){
            return candidates[idx];
        }
        cumSum += pool[candidates[idx]];
    }
    return candidates[-1];
}

class CatDropScene extends Phaser.Scene{
    preload(){
        this.load.atlas('cats', 'assets/platform1/rainco_cats.png', 'assets/platform1/rainco_cats_atlas.json');
    }
    create(){
        this.matter.world.setBounds();
        var floor = this.add.rectangle(300, 800, 600, 50, 0x3273a8);
        this.add.line(300,50,0,50, 600, 50, 0xe07f70, 5);
        this.matter.add.gameObject(floor);
        floor.setStatic(true);
        this.framenames = ['cat-bun','cat-happy','demon','cat2','cat-crown','cat-sword','cat-wink','cat-stand','cat-astro']
        this.frameScale = {'cat-bun': 0.6, 'cat-happy':0.8, 'demon': 1.1,'cat2':0.8, 'cat-crown': 1.0,'cat-sword':1.0 ,'cat-wink': 0.9,'cat-stand':1.2, 'cat-astro':0.9}
        this.framePool = {'cat-bun':1,'cat-happy':0.5,'demon':0.25};
        this.nextFrame = weightedRandom(this.framePool);
        this.preview = this.add.image(550, 50, 'cats', this.nextFrame).setDisplaySize(80,80);
        this.add.text(480, 20, 'Next', { fontSize: '15px', fill: '#000' })
        this.input.on('pointerdown', ()=>{
            const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
            const x = worldPoint.x + Phaser.Math.RND.integerInRange(-10, 10);
            this.createImage(this.nextFrame, x, 100)
            this.nextFrame = weightedRandom(this.framePool);
            this.preview.destroy();
            this.preview = this.add.image(550, 50, 'cats', this.nextFrame).setDisplaySize(80,80);
        })
    }
    createImage(framename, x, y){
        var cat = this.matter.add.image(x, y, 'cats', framename, {restitution: 1, friction:0, shape:'circle'}).setScale(this.frameScale[framename]);
        cat.setOnCollide(pair => {
            var bodyA = pair.bodyA;
            var bodyB = pair.bodyB;
            if (bodyA && bodyB && bodyA.gameObject && bodyB.gameObject && bodyA.gameObject.type === 'Image' && bodyB.gameObject.type === 'Image'){
                if (bodyA.gameObject.frame.name === bodyB.gameObject.frame.name){
                    const name = bodyA.gameObject.frame.name;
                    const idx = this.framenames.indexOf(name);
                    if (idx !== this.framenames.length-1){
                        this.createImage(this.framenames[idx+1], bodyA.position.x, bodyA.position.y);
                        if(!(this.framenames[idx+1] in this.framePool)){
                            this.framePool[this.framenames[idx+1]] = this.framePool[this.framenames[idx]]*0.5;
                        }
                        bodyA.gameObject.destroy();
                        bodyB.gameObject.destroy();
                    }   
                }
            }
        })
    }

    update(){

    }
}

export default function InitCatDrop(){
    const config = {
        type: Phaser.AUTO,
        width: 600,
        height: 800,
        backgroundColor: "#f2f2e9",
        parent: "root",
        pixelart: true,
        scene: CatDropScene,
        physics: {
            default: "matter",
            matter: {
                gravity: {y: 1},
                debug: true,
            }
        },
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        }
    };
    new Phaser.Game(config);
}