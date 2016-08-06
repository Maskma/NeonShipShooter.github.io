class GameObject extends Phaser.Sprite {

	constructor(game, x, y, key, frame) {
		super(game, x, y, key, frame);

		this.className = this.constructor.name;
		this.component = {};

	}

	addComponent(comp) {

		this.component[comp.name] = comp;

		this.component[comp.name].setTarget(this);

		this.component[comp.name].init();

		return comp;

	}

	getComponent(componentName) {

		return this.component[componentName];

	}

	update() {

		// ----------------------------------------
		// Call update method on all components 
		// attacted to this GameObject
		// ----------------------------------------
		Object.keys(this.component).forEach(function(componentName) {
			this.component[componentName].update();
		}, this);

	}
}