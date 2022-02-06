export default class Player {
    constructor(scene, x, y){
        this.scene = scene;
        //create the sprite
        this.sprite = scene.physics.add.sprite(x, y, 'player', 0);
        player.setBounce(0.3);
        player.setCollideWorldBounds(true);
}
}