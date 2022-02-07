import Phaser from 'phaser';
export default class Player {
    constructor(scene, x, y){
        this.scene = scene;
        const anims = scene.anims;
        //create the sprite
        this.sprite = scene.physics.add
            .sprite(x, y, 'boy', 0) // create player
            .setDrag(1000, 0)
            .setMaxVelocity(300, 400)
            .setBounce(0.3);
            
        anims.create({
            key: 'left',
            frames: anims.generateFrameNumbers('boy', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: 'turn',
            frames: [ { key: 'boy', frame: 0 } ],
            frameRate: 20
        });
        anims.create({
            key: 'right',
            frames: anims.generateFrameNumbers('boy', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        // Track the arrow keys & WASD
        const { LEFT, RIGHT, UP, W, A, D } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = scene.input.keyboard.addKeys({
        left: LEFT,
        right: RIGHT,
        up: UP,
        w: W,
        a: A,
        d: D
        });
    }

    update() {
        const keys = this.keys;
        const sprite = this.sprite;
        const onGround = sprite.body.blocked.down;

        if (keys.left.isDown || keys.a.isDown)
        {
            sprite.setVelocityX(-160);
            sprite.anims.play('left', true);
        }
        else if (keys.right.isDown || keys.d.isDown)
        {
            sprite.setVelocityX(160);
            sprite.anims.play('right', true);
        }
        else
        {
            sprite.setVelocityX(0);
            sprite.anims.play('turn');
        }
        if ((keys.up.isDown || keys.w.isDown)&& onGround)
        {
            sprite.setVelocityY(-330);
        }

    }

    destroy() {
        this.sprite.destroy();
    }
}