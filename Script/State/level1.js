app.level1 = class {

	preload() {

		app.game.load.image('universe', 'Assets/universe.jpg');
		app.game.load.image('galaxy', 'Assets/galaxy.jpg');
		NormalBullet.preload();
		PlayerShip.preload();
		Enemy1.preload();

	}

	create() {
		var game = app.game;

		var background = game.add.sprite(0, 0, 'galaxy');
		game.world.setBounds(0, 0, background.width, background.height);

		this.ship = new PlayerShip(game, game.world.centerX, game.world.centerY);

		game.camera.follow(this.ship);

		var shipRef = this.ship
		setInterval(function() {
			this.count = this.count || 0;
			if (this.count > -1) {
				var enemy = new Enemy1(game, game.world.randomX, game.world.randomY);
				enemy.getComponent('Enemy1Controller').setEnemy(shipRef);
			}
			this.count ++;
		}, 1000);

	}

	render() {
		
	}

}