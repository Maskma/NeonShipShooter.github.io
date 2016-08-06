app.load = class {

	preload() {

		app.game.load.path = '../';

	}

	create() {

		app.game.state.start('level1');

	}

}