class PlayerShipController extends Component {

	constructor() {
		super();

		this.name = "PlayerShipController";

		this.maxHp = 500;
		this.hp = this.maxHp;

	}

	init() {
		super.init();

		var self = this.target;

		self.game.physics.p2.enable(self);

		self.body.collideWorldBounds = true;

		self.body.clearShapes();
		self.body.loadPolygon('shipPolygon', 'NeonShip');


		this.cursors = self.game.input.keyboard.createCursorKeys();
		this.fireButton = self.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.spinButton = self.game.input.keyboard.addKey(Phaser.Keyboard.Q);
		this.rocketButton = self.game.input.keyboard.addKey(Phaser.Keyboard.W);

		this.canFire = true;
		this.canSpin = true;
		this.canRocket = true;

		this.createHpBar();
	}

	update() {
		var self = this.target;

		this.updateHpBar();

	    if (this.cursors.left.isDown) {
	    	self.body.rotateLeft(50);
	    }   
	    else if (this.cursors.right.isDown) {
	    	self.body.rotateRight(50);
	    }
	    else {
	    	self.body.setZeroRotation();
	    }

	    if (this.cursors.up.isDown) {
	    	self.body.thrust(200);
	    }
	    else if (this.cursors.down.isDown) {
	    	self.body.reverse(100);
	    }

	    if (this.fireButton.isDown && this.canFire) {

	    	this.canFire = false;
	    	var this_ = this;
	    	setTimeout(function() {
	    		this_.canFire = true;
	    	}, 200);

	    	NormalBullet.fire(self.game, self, { x: 70, y: 70 }, self.body.rotation, 600);

	    }

	    if (this.spinButton.isDown && this.canSpin) {

	    	this.canSpin = false;
	    	var this_ = this;
	    	setTimeout(function() {
	    		this_.canSpin = true;
	    	}, 500);

	    	var bulletCount = 10;
	    	for (var i = 0; i < bulletCount; i++) {

	    		// 360 * bulletCount * i is degrees
	    		var increaseRadians = (360 / bulletCount * i) * (Math.PI / 180); 
	    		NormalBullet.fire(self.game, 
	    			self, 
	    			{ x: 70, y: 70 }, 
	    			self.body.rotation + increaseRadians, 
	    			600);

	    	}

	    }

	    if (this.rocketButton.isDown && this.canRocket) {

	    	this.canRocket = false;
	    	var this_ = this;
	    	setTimeout(function() {
	    		this_.canRocket = true;
	    	}, 500);

	    	var bulletCount = 6;
	    	for (var i = 0; i < bulletCount; i++) {

	    		// 360 * bulletCount * i is degrees
	    		var angle = 50;
	    		var increaseRadians = (-angle/2  +  i * angle / (bulletCount - 1)) * (Math.PI / 180.0); 
	    		NormalBullet.fire(self.game, 
	    			self, 
	    			{ x: 75, y: 75 }, 
	    			self.body.rotation + increaseRadians, 
	    			600);

	    	}	    	

	    }

	}

	damaged(hp_lose) {
		var self = this.target;
		
		this.hp -= hp_lose;

		if (this.hp <= 0) 
			self.destroy();
	}

	createHpBar() {
		var self = this.target;

		var bmdHpBarBG = self.game.add.bitmapData(100, 10);
		bmdHpBarBG.ctx.beginPath();
		bmdHpBarBG.ctx.rect(0, 0, 100, 10);
		bmdHpBarBG.ctx.fillStyle = '#403f35';
		bmdHpBarBG.ctx.fill();
		this.hpBarBG = self.game.add.sprite(self.x, self.y, bmdHpBarBG);
		this.hpBarBG.anchor.setTo(0, 0.5);
		this.hpBarBG.events.onDestroy.add(function() {
			bmdHpBarBG.clear();
		}, this);

		var bmdHpBarFG = self.game.add.bitmapData(100, 10);
		bmdHpBarFG.ctx.beginPath();
		bmdHpBarFG.ctx.rect(0, 0, 100, 10);
		bmdHpBarFG.ctx.fillStyle = '#5ddb51';
		bmdHpBarFG.ctx.fill();
		this.hpBarFG = self.game.add.sprite(self.x, self.y, bmdHpBarFG);
		this.hpBarFG.anchor.setTo(0, 0.5);
		this.hpBarFG.events.onDestroy.add(function() {
			bmdHpBarFG.clear();
		}, this);
	}

	updateHpBar() {
		var self = this.target;

		this.hpBarBG.position = {
			x: self.x - 50,
			y: self.y - 40
		};

		this.hpBarFG.position = {
			x: self.x - 50,
			y: self.y - 40
		};
		this.hpBarFG.scale.x = this.hp / this.maxHp;
	}

	OnDestroy() {

		this.hpBarBG.destroy();
		this.hpBarFG.destroy();

	}

}