import Phaser from 'phaser';
export default class Rabbit {
    constructor(scene, x, y){
        this.scene = scene;
        this.worldWidth = scene.physics.world.bounds.width;
        const anims = scene.anims;
        //create the sprite
        this.sprite = scene.physics.add
            .sprite(x, y, 'rabbit', 0) // create player
            .setDrag(1000, 0)
            .setMaxVelocity(300, 400)
            .setSize(32,32)
            .setScale(1)
            .setBounce(0.3);
        anims.create({
            key: 'left',
            frames: anims.generateFrameNumbers('rabbit', { start: 9, end: 12 }),
            frameRate: 8,
            repeat: -1
        });
        anims.create({
            key: 'right',
            frames: anims.generateFrameNumbers('rabbit', { start: 13, end: 16 }),
            frameRate: 8,
            repeat: -1
        });
        this.direction = "left";
        this.sprite.setCollideWorldBounds(true);
    }

    update() {
        const sprite = this.sprite;
        const onGround = sprite.body.blocked.down;
        if (sprite.x <= 10){
            this.direction = "right";
        }
        if (sprite.x >= this.worldWidth-10){
            this.direction = "left";
        }
        if (this.direction === "left" && onGround){
            sprite.setVelocityX(-160);
            sprite.anims.play("left", true);
        }
        if (this.direction === "right" && onGround){
            sprite.setVelocityX(160);
            sprite.anims.play("right", true);
        }
    }
    destroy() {
        this.sprite.destroy();
    }
}