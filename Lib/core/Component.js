class Component {

	constructor() {

		this.name = "Component";
		this.target = null;

	}

	setTarget(gameObject) {

		this.target = gameObject;

	}

	// ----------------------------------------
	// Init method calls once when attact to 
	// a GameObject. This calls before first 
	// create method.
	// ----------------------------------------
	init() {

		var self = this.target;

		self.events.onDestroy.add(this.OnDestroy, this);

	}

	// ----------------------------------------
	// Create method calls once when attact to 
	// a GameObject. This calls before first 
	// update method.
	// ----------------------------------------
	create() {

	}

	// ----------------------------------------
	// Update method is calls every frames by 
	// the GameObject it's attacted to.
	// ----------------------------------------
	update() {

	}

	// ----------------------------------------
	// OnDestroy method calls when GameObject
	// is being destroyed
	// ----------------------------------------
	OnDestroy() {
		
	}

}