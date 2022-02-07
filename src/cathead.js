import Phaser from 'phaser';
export default class Player {
    constructor(scene, x, y){
        this.scene = scene;
        const anims = scene.anims;
        //create the sprite
        this.sprite = scene.physics.add
            .sprite(x, y, 'cathead', 0) // create player
            .setDrag(1000, 0)
            .setMaxVelocity(300, 400)
            .setScale(0.2)
            .setBounce(0.3);
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
        this.audio_jump = new Audio('../sound/jump2.wav');
    }

    update() {
        const keys = this.keys;
        const sprite = this.sprite;
        const onGround = sprite.body.blocked.down;

        if (keys.left.isDown || keys.a.isDown)
        {
            sprite.setVelocityX(-160);
        }
        else if (keys.right.isDown || keys.d.isDown)
        {
            sprite.setVelocityX(160);
        }
        else
        {
            sprite.setVelocityX(0);
        }
        if ((keys.up.isDown || keys.w.isDown)&& onGround)
        {
            sprite.setVelocityY(-330);
            this.audio_jump.play();
        }

    }

    destroy() {
        this.sprite.destroy();
    }
}