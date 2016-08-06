class Enemy1 extends GameObject {

	constructor(game, x, y, frame) {
		super(game, x, y, 'enemy1', frame);

		game.add.existing(this);

		this.addComponent(new Enemy1Controller());

	}

	static preload() {

		app.game.load.image('enemy1', 'Assets/Enemy1.png');

	}

}