var isInvincible = false;
var hasDied = false;
var PlayerEntity = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    this.setVelocity(2, 15);
  },
  update: function() {
    if (me.input.isKeyPressed('left')) { this.doWalk(true); }
    else if (me.input.isKeyPressed('right')) { this.doWalk(false); }
    else { this.vel.x = 0; };
    if (me.input.isKeyPressed('jump')) {
      this.forceJump();
    }
    me.game.collide(this);
    this.updateMovement();
    if (this.bottom > 900){ }
    if (this.vel.x!=0 || this.vel.y!=0) {
      this.parent(this);
      return true;
    }
    return false;
  },
  gameOver: function() {
    me.state.change(me.state.MENU);
  },
  youWin: function() {
    me.state.change(me.state.MENU);
    document.getElementById('game_state').innerHTML = "You Win!";
    document.getElementById('instructions').innerHTML = "";
  }
});
var ShieldEntity = me.CollectableEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
  },
  onCollision : function (res, obj) {
    this.collidable = false;
    me.game.remove(this);
    setTimeout(function(){isInvincible = false;},5000 );
    isInvincible = true;
    }
  });
var EnemyEntity = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    settings.image = "badguy";
    settings.spritewidth = 32;
    this.parent(x, y, settings);
    this.startX = x;
    this.endX = x + settings.width - settings.spritewidth;
    this.pos.x = this.endX;
    this.walkLeft = true;
    this.setVelocity(1);
    this.collidable = true;
  },
  onCollision: function(res, obj) {
    if (isInvincible==false) {
      hasDied = true;
      obj.gameOver();
    }
  },
  update: function() {
    if (!this.visible){
      return false;
    }
    if (this.alive) {
      if (this.walkLeft && this.pos.x <= this.startX) {
        this.walkLeft = false;
      }
      else if (!this.walkLeft && this.pos.x >= this.endX){
        this.walkLeft = true;
      }
      this.doWalk(this.walkLeft);
    }
    else { this.vel.x = 0; }
    this.updateMovement();
    if (this.vel.x!=0 || this.vel.y!=0) {
      this.parent(this);
      return true;
    }
    return false;
  }
});
var JetpackEntity = me.CollectableEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
  },
  onCollision: function (res, obj) {
    var currentGravity = obj.gravity;
    setTimeout(function(){obj.gravity=currentGravity;},10000 );
    this.collidable = false;
    me.game.remove(this);
    obj.gravity = 0;
  }
});
var KeyEntity = me.CollectableEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
  },
  onCollision: function (res,obj) {
    this.collidable = false;
    me.game.remove(this);
  }
});
var StarEntity = me.CollectableEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
  },
   onCollision: function(res, obj) {
     this.collidable = false;
     me.game.remove(this);
    }
  };


/* me.gamestat.updateValue("coins", 1);
this.collidable = false;
me.game.remove(this);
if(me.gamestat.getItemValue("coins") === me.gamestat.getItemValue("totalCoins")){
  obj.youWin();} */