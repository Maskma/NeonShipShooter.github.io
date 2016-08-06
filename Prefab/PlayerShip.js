class PlayerShip extends GameObject {

	constructor(game, x, y, frame) {
		super(game, x, y, "ship", frame);

		game.add.existing(this);

		//this.className = 'PlayerShip';
		this.addComponent(new PlayerShipController());
	}

	static preload() {

		app.game.load.image("ship", "Assets/NeonShip.png");
		app.game.load.physics('shipPolygon', 'Assets/NeonShip.json');

	}

}