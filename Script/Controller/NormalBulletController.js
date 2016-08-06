class NormalBulletController extends Component {

	constructor() {
		super();

		this.name = "NormalBulletController";

	}

	init() {
		super.init();

		var self = this.target;

		self.game.physics.p2.enable(self);

		//self.body.collideWorldBounds = false;
		self.checkWorldBounds = true;
		self.outOfBoundsKill = true;

		self.body.onBeginContact.add(function(body, bodyB, shapeA, shapeB, equation) {
			if (body && body.sprite) {
				if (body.sprite.className != "PlayerShip" && body.sprite.className != "NormalBullet") {
					body.sprite.getComponent('Enemy1Controller').damaged(50);
					self.destroy();
				}
			}
			else {
				self.destroy();
			}
		}, this);
	}

	OnDestroy() {
		var self = this.target;

		var destroy_sprite = self.game.add.sprite(self.x, self.y, 'bulletDestroy');
		var destroy_effect = destroy_sprite.animations.add('effect', [0, 1, 2, 3, 4]);
		destroy_sprite.anchor.setTo(0.5, 0.5);

		destroy_effect.onComplete.add(function() {
			destroy_sprite.destroy();
		}, this);

		destroy_sprite.animations.play('effect', 15, false);
	
	}

}