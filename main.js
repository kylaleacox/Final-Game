var game;
if (!game) { game = {}; };

game.onload =  function() {
    if (!me.video.init(800, 600, {
		wrapper: "jsapp",
		renderer: me.video.CANVAS,
		doubleBuffering: true,
		scale: 2.0
	})){
      alert("html 5 canvas is not supported by this browser.");
      return;
    }
    me.loader.onload = this.loaded.bind(this);
    me.loader.preload(game.resources);
    me.state.change(me.state.LOADING);
   //me.gamestat.add("coins", 0);
   // me.gamestat.add("totalCoins", 3);
  }
  
 game.loaded = function() {
    me.pool.register("player", PlayerEntity);
    me.pool.register("shield",ShieldEntity);
    me.pool.register("jetpack", JetpackEntity);
    me.pool.register("EnemyEntity", EnemyEntity);
    me.state.set(me.state.PLAY, new PlayScreen());
    me.state.set(me.state.MENU, new TitleScreen());
    me.state.transition("fade", "#2FA2C2", 250);
    me.state.change(me.state.MENU);
}
window.onReady(function() {
  game.onload();
});
