/*$(window).on('resize orientationChange', function(event) {
  var width = $(window).width();
  var height = $(window).height();
  jwplayer('player').resize(width, height);
});*/
/*var resizeViewPort = function(width, height) {
  if (window.outerWidth) {
    window.resizeTo(
        width + (window.outerWidth - window.innerWidth),
        height + (window.outerHeight - window.innerHeight)
    );
  } else {
    window.resizeTo(500, 500);
    window.resizeTo(
        width + (500 - document.body.offsetWidth),
        height + (500 - document.body.offsetHeight)
    );
  }
};*/
var PlayScreen = me.ScreenObject.extend({
  onDestroyEvent: function() {
    me.gamestat.reset("coins");
  },
  onResetEvent: function() {
    me.levelDirector.loadLevel("level1");
    me.input.bindKey(me.input.KEY.LEFT, "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
    //me.input.bindKey(me.input.KEY.DOWN, "down");
    document.getElementById('game_state').innerHTML = "Collect all of the coins!";
    document.getElementById('instructions').innerHTML = "Arrows to move and Space to jump.";
  }
});
var TitleScreen = me.ScreenObject.extend({
  init: function() {
    this.parent(true);
    me.input.bindKey(me.input.KEY.UP, "jump", true);
  },
  onResetEvent: function() {
    if (this.title == null) {
      this.title = me.loader.getImage("titleScreen");
      document.getElementById('game_state').innerHTML = "";
      document.getElementById('instructions').innerHTML = ""; 
    }
  },
  update: function() {
    if (me.input.isKeyPressed('jump')) {
      me.state.change(me.state.PLAY);
    }
    return true;
  },
  draw: function(context){
    context.drawImage(this.title, 50, 50);
  }
});
