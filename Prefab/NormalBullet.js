class NormalBullet extends GameObject {

	constructor(game, x, y, frame) {
		super(game, x, y, 'normalBullet', frame);

		this.addComponent(new NormalBulletController());
	}

	static preload() {

		app.game.load.image('normalBullet', 'Assets/NormalBullet.png');
		app.game.load.spritesheet('bulletDestroy', 'Assets/bullet_destroy.png', 112, 96);

	}

	static fire(game, position, offset, rotation, speed) {

		var xPosition = position.x + Math.sin(rotation) * offset.x;
		var yPosition = position.y - Math.cos(rotation) * offset.y;
		var bullet = new NormalBullet(game, xPosition, yPosition);

		bullet.body.rotation = rotation;
		bullet.body.thrust(speed * 100);

		game.add.existing(bullet);
		
	}

}