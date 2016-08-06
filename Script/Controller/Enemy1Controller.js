class Enemy1Controller extends Component {

	constructor() {
		super();

		this.name = "Enemy1Controller";

		this.maxHp = 100;
		this.hp = this.maxHp;

	}

	init() {
		super.init();

		var self = this.target;

		self.game.physics.p2.enable(self);

		this.enemy = null;

		self.body.onBeginContact.add(function(body, bodyB, shapeA, shapeB, equation) {
			if (body && body.sprite) {
				if (body.sprite.className == 'PlayerShip') {
					body.sprite.getComponent('PlayerShipController').damaged(50);
				}
			}
		}, this);


		this.createHpBar();
	}

	setEnemy(enemy) {
		this.enemy = enemy;
	}

	update() {
		var self = this.target;

		this.updateHpBar();

		if (this.enemy)
			this.accelerateToObject(self, this.enemy, 150);

	}

	accelerateToObject(obj1, obj2, speed) {
	    if (typeof speed === 'undefined') { speed = 60; }
	    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
	    obj1.body.rotation = angle + this.target.game.math.degToRad(90);  // correct angle of angry bullets (depends on the sprite used)
	    obj1.body.force.x = Math.cos(angle) * speed * Math.random();    // accelerateToObject 
	    obj1.body.force.y = Math.sin(angle) * speed * Math.random();
	}

	damaged(hp_lose) {
		var self = this.target;
		
		this.hp -= hp_lose;

		if (this.hp <= 0) {
			self.destroy();
		}

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
		bmdHpBarFG.ctx.fillStyle = '#cc0000';
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
			x: self.x - self.width / 2,
			y: self.y - 40
		};

		this.hpBarFG.position = {
			x: self.x - self.width / 2,
			y: self.y - 40
		};
		this.hpBarFG.scale.x = this.hp / this.maxHp;
	}

	OnDestroy() {

		this.hpBarBG.destroy();
		this.hpBarFG.destroy();

	}

}