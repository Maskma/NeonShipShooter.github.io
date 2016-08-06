app.boot = class {

	create() {

	    //  Enable P2
	    app.game.physics.startSystem(Phaser.Physics.P2JS);

	    //  Turn on impact events for the world, without this we get no collision callbacks
	    app.game.physics.p2.setImpactEvents(true);

	    app.game.physics.p2.restitution = 0.8;
		app.game.state.start('load');

	}

}