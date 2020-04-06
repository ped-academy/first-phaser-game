const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 300
      },
      debug: false,
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  }
};

const game = new Phaser.Game(config);
let platforms;
let player;
let cursors;
function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('platform', 'assets/platform.png');
  this.load.spritesheet('player', 'assets/dude.png',
      {
        frameWidth: 32,
        frameHeight: 48,
      });
}
function create() {
  cursors = this.input.keyboard.createCursorKeys();

  this.add.image(400, 300, 'star');
  this.add.image(400, 300, 'sky');

  platforms = this.physics.add.staticGroup();
  platforms.create(410, 568, 'platform').setScale(2).refreshBody();
  platforms.create(600, 400, 'platform');
  platforms.create(60, 300, 'platform');
  platforms.create(690, 200, 'platform');

  player = this.physics.add.sprite(200, 300, 'player');
  player.setBounce(0.5);
  player.setCollideWorldBounds(true);

  this.physics.add.collider(player, platforms);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('player', {
      start: 0,
      end: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('player', {
      start: 5,
      end: 8,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'still',
    frames: [{
      key: 'player',
      frame: 4,
    }],
    frameRate: 20,
  });

}

function update() {
  if(cursors.left.isDown) {
    player.setVelocityX(-100);
    player.anims.play('left', true);
  }else if (cursors.right.isDown) {
    player.setVelocityX(100);
    player.anims.play('right', true);
  }else {
    player.setVelocityX(0);
    player.anims.play('still');
  }
  if(cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-400);
  }
}
