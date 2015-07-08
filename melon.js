/*
 MelonJS Game Engine
 Copyright (C) 2012, Olivier BIOT
 http://www.melonjs.org

 melonJS is licensed under the MIT License.
 http://www.opensource.org/licenses/mit-license.php

 Tween JS
 https://github.com/sole/Tween.js
 */
(function(a, c) {
 function b() {
  if (!h) {
   if (!d.body) return setTimeout(b, 13);
   d.removeEventListener ? d.removeEventListener("DOMContentLoaded", b, !1) : a.removeEventListener("load", b, !1);
   h = !0;
   for (var i = 0; i < j.length; i++) j[i].call(a, []);
   j.length = 0
  }
 }

 function g() {
  return {
   xmlDoc: null,
   parser: null,
   parseFromString: function(d) {
    a.DOMParser ? (this.parser = new DOMParser, this.xmlDoc = this.parser.parseFromString(d, "text/xml")) : (this.xmlDoc = new ActiveXObject("Microsoft.XMLDOM"), this.xmlDoc.async = "false", this.xmlDoc.loadXML(d));
    null == this.xmlDoc && console.log("xml " + this.xmlDoc + " not found!")
   },
   getFirstElementByTagName: function(a) {
    return this.xmlDoc ? this.xmlDoc.getElementsByTagName(a)[0] : null
   },
   getAllTagElements: function() {
    return this.xmlDoc ? this.xmlDoc.getElementsByTagName("*") : null
   },
   getStringAttribute: function(a, d, b) {
    return (a = a.getAttribute(d)) ? a.trim() : b
   },
   getIntAttribute: function(a, d, b) {
    return (a = this.getStringAttribute(a, d, b)) ? parseInt(a) : b
   },
   getFloatAttribute: function(a, d, b) {
    return (a = this.getStringAttribute(a, d, b)) ? parseFloat(a) :
        b
   },
   getBooleanAttribute: function(a, d, b) {
    return (a = this.getStringAttribute(a, d, b)) ? "true" == a : b
   },
   free: function() {
    this.parser = this.xmlDoc = null
   }
  }
 }
 var d = a.document;
 me = {
  mod: "melonJS",
  nocache: "",
  audio: null,
  video: null,
  timer: null,
  input: null,
  state: null,
  game: null,
  entityPool: null,
  levelDirector: null,
  XMLParser: null,
  loadingScreen: null,
  TMXTileMap: null,
  debug: {
   displayFPS: !1,
   renderHitBox: !1,
   renderDirty: !1
  }
 };
 me.sys = {
  ua: navigator.userAgent.toLowerCase(),
  sound: !1,
  localStorage: "object" == typeof a.localStorage,
  gyro: a.DeviceMotionEvent !==
  c,
  nativeBase64: "function" == typeof a.atob,
  touch: !1,
  fps: 60,
  interpolation: !1,
  scale: 1,
  gravity: c,
  useNativeAnimFrame: !1,
  cacheImage: !1,
  dirtyRegion: !1,
  enableWebGL: !1,
  stopOnAudioError: !0
 };
 a.me = me;
 var e = !1,
     f = !1,
     h = !1,
     j = [];
 onReady = function(e) {
  f || (f = !0, "complete" === d.readyState ? util.domReady() : (d.addEventListener && d.addEventListener("DOMContentLoaded", b, !1), a.addEventListener("load", b, !1)));
  h ? e.call(a, []) : j.push(function() {
   return e.call(a, [])
  });
  return this
 };
 a.onReady(function() {
  if (!e) {
   var b = d.createElement("audio");
   me.utils.setNocache(d.location.href.match(/\?nocache/));
   if (b.canPlayType) me.audio.capabilities.mp3 = "no" != b.canPlayType("audio/mpeg") && "" != b.canPlayType("audio/mpeg"), me.audio.capabilities.ogg = "no" != b.canPlayType('audio/ogg; codecs="vorbis"') && "" != b.canPlayType('audio/ogg; codecs="vorbis"'), me.audio.capabilities.wav = "no" != b.canPlayType('audio/wav; codecs="1"') && "" != b.canPlayType('audio/wav; codecs="1"'), me.sys.sound = me.audio.capabilities.mp3 || me.audio.capabilities.ogg || me.audio.capabilities.wav;
   if (-1 <
       me.sys.ua.search("iphone") || -1 < me.sys.ua.search("ipod") || -1 < me.sys.ua.search("ipad") || -1 < me.sys.ua.search("android")) me.sys.sound = !1;
   me.sys.touch = "createTouch" in d || "ontouchstart" in a;
   me.timer.init();
   me.XMLParser = new g;
   me.loadingScreen = new me.DefaultLoadingScreen;
   me.state.init();
   me.entityPool.init();
   me.levelDirector.reset();
   e = !0
  }
 });
 var k = !1,
     m = /xyz/.test(function() {}) ? /\bparent\b/ : /.*/;
 Object.extend = function(a) {
  function d() {
   !k && this.init && this.init.apply(this, arguments)
  }
  var b = this.prototype;
  k = !0;
  var e =
      new this;
  k = !1;
  for (var f in a) e[f] = "function" == typeof a[f] && "function" == typeof b[f] && m.test(a[f]) ? function(a, d) {
   return function() {
    var e = this.parent;
    this.parent = b[a];
    var i = d.apply(this, arguments);
    this.parent = e;
    return i
   }
  }(f, a[f]) : a[f];
  d.prototype = e;
  d.constructor = d;
  d.extend = arguments.callee;
  return d
 };
 if ("function" !== typeof Object.create) Object.create = function(a) {
  function d() {}
  d.prototype = a;
  return new d
 };
 if (!Function.bind) Function.prototype.bind = function() {
  var a = this,
      d = Array.prototype.slice.call(arguments),
      b = d.shift();
  return function() {
   return a.apply(b, d.concat(Array.prototype.slice.call(arguments)))
  }
 };
 "undefined" === typeof console && (console = {
  log: function() {}
 });
 Function.prototype.defer = function() {
  var a = this,
      d = Array.prototype.slice.call(arguments);
  return window.setTimeout(function() {
   return a.apply(a, d)
  }, 0.01)
 };
 if (!Object.defineProperty) Object.defineProperty = function(a, d, b) {
  if (a.__defineGetter__) b.get && a.__defineGetter__(d, b.get), b.set && a.__defineSetter__(d, b.set);
  else throw "melonJS: Object.defineProperty not supported";
 };
 String.prototype.trim = function() {
  return this.replace(/^\s+/, "").replace(/\s+$/, "")
 };
 String.prototype.isNumeric = function() {
  return null != this && !isNaN(this) && "" != this.trim()
 };
 String.prototype.isBoolean = function() {
  return null != this && ("true" == this.trim() || "false" == this.trim())
 };
 String.prototype.contains = function(a) {
  return -1 < this.indexOf(a)
 };
 String.prototype.toHex = function() {
  for (var a = "", d = 0; d < this.length;) a += this.charCodeAt(d++).toString(16);
  return a
 };
 Number.prototype.clamp = function(a, d) {
  return this <
  a ? a : this > d ? d : this
 };
 Number.prototype.random = function(a, d) {
  return ~~(Math.random() * (d - a + 1)) + a
 };
 Number.prototype.round = function() {
  var a = 1 == arguments.length ? this : arguments[0],
      d = Math.pow(10, arguments[1] || arguments[0]);
  return Math.round(a * d) / d
 };
 Number.prototype.toHex = function() {
  return "0123456789ABCDEF".charAt(this - this % 16 >> 4) + "0123456789ABCDEF".charAt(this % 16)
 };
 Number.prototype.sign = function() {
  return 0 > this ? -1 : 0 < this ? 1 : 0
 };
 Number.prototype.degToRad = function(a) {
  return (a || this) / 180 * Math.PI
 };
 Number.prototype.radToDeg =
     function(a) {
      return (a || this) * (180 / Math.PI)
     };
 var l = function() {
  var a = {},
      d = [],
      b, e = [];
  a.isDirty = !1;
  a.reset = function() {
   d.length = 0;
   e.length = 0;
   b = me.game.viewport.getRect();
   a.makeAllDirty()
  };
  a.makeDirty = function(b, f, c) {
   if (f) a.isDirty = !0, me.sys.dirtyRegion && (c ? d.push(c.union(b)) : b.getRect && d.push(b.getRect()));
   b.visible && e.splice(0, 0, b)
  };
  a.makeAllDirty = function() {
   d.length = 0;
   d.push(b);
   a.isDirty = !0
  };
  a.remove = function(d) {
   var b = e.indexOf(d);
   if (-1 != b) e.splice(b, 1), b = d.visible, d.visible = !1, a.makeDirty(d, !0), d.visible =
       b
  };
  a.draw = function(a) {
   for (var b = d.length, f; b--, f = d[b];) {
    for (var c = e.length, i; c--, i = e[c];)(!me.sys.dirtyRegion || !i.isEntity || i.overlaps(f)) && i.draw(a, f);
    me.debug.renderDirty && f.draw(a, "white")
   }
  };
  a.flush = function() {
   if (me.sys.dirtyRegion) d.length = 0;
   e.length = 0;
   a.isDirty = !1
  };
  return a
 }();
 me.game = function() {
  var a = {},
      d = null,
      b = [],
      e = 0,
      f = !1,
      c = null;
  a.viewport = null;
  a.HUD = null;
  a.collisionMap = null;
  a.currentLevel = null;
  a.NO_OBJECT = 0;
  a.ENEMY_OBJECT = 1;
  a.COLLECTABLE_OBJECT = 2;
  a.ACTION_OBJECT = 3;
  a.onLevelLoaded = null;
  a.init =
      function(b, e) {
       if (!f) b = b || me.video.getWidth(), e = e || me.video.getHeight(), a.viewport = new me.Viewport(0, 0, b, e), d = me.video.getScreenFrameBuffer(), f = !0
      };
  a.reset = function() {
   c && clearTimeout(c);
   c = null;
   f || a.init();
   a.removeAll();
   a.viewport && a.viewport.reset();
   null != a.HUD && a.add(a.HUD);
   l.reset()
  };
  a.loadTMXLevel = function(d) {
   a.currentLevel = d;
   a.collisionMap = a.currentLevel.getLayerByName("collision");
   (!a.collisionMap || !a.collisionMap.isCollisionMap) && alert("WARNING : no collision map detected");
   a.currentLevel.addTo(me.game);
   if (a.currentLevel.realwidth < a.viewport.getWidth() || a.currentLevel.realheight < a.viewport.getHeight()) throw "melonJS: map size should be at least equal to the defined display size";
   a.viewport.setBounds(a.currentLevel.realwidth, a.currentLevel.realheight);
   for (var b = a.currentLevel.getObjectGroups(), e = 0; e < b.length; e++)
    for (var f = 0; f < b[e].objects.length; f++) a.addEntity(b[e].objects[f], b[e].z);
   a.sort();
   a.onLevelLoaded && a.onLevelLoaded.apply(a.onLevelLoaded, Array(d.name))
  };
  a.add = function(a, d) {
   a.z = d ? d : a.z;
   b.push(a);
   e = b.length
  };
  a.addEntity = function(d, b) {
   a.add(me.entityPool.newIstanceOf(d), b)
  };
  a.getEntityByName = function(a) {
   for (var d = [], a = a.toLowerCase(), f = e, c; f--, c = b[f];) c.name == a && d.push(c);
   return d
  };
  a.getEntityByGUID = function(a) {
   for (var d = e, f; d--, f = b[d];)
    if (f.isEntity && f.GUID == a) return f;
   return null
  };
  a.addHUD = function(d, b, e, f, c) {
   if (null == a.HUD) a.HUD = new me.HUD_Object(d, b, e, f, c), a.add(a.HUD)
  };
  a.disableHUD = function() {
   if (null != a.HUD) a.remove(a.HUD), a.HUD = null
  };
  a.update = function() {
   me.timer.update();
   for (var d = null,
            f = e, c; f--, c = b[f];) {
    var d = me.sys.dirtyRegion && c.isEntity ? c.getRect() : null,
        h = c.update();
    if (c.isEntity) c.visible = a.viewport.isVisible(c.collisionBox);
    l.makeDirty(c, h, h ? d : null)
   }
   a.viewport.update(l.isDirty) && l.makeAllDirty()
  };
  a.remove = function(a) {
   if (!a.destroy || a.destroy()) a.visible = !1, a.isEntity = !1, l.remove(a), c = function(a) {
    a = b.indexOf(a);
    if (-1 != a) b.splice(a, 1), e = b.length;
    c = null
   }.defer(a)
  };
  a.removeAll = function() {
   for (var a = e, d; a--, d = b[a];) d.autodestroy = !0, d.destroy && d.destroy();
   e = 0;
   b.length = 0;
   l.flush()
  };
  a.sort = function() {
   b.sort(function(a, d) {
    return d.z - a.z
   });
   a.repaint()
  };
  a.collide = function(a) {
   for (var d = null, f = e, c;
        (f--, c = b[f]) && (!(c.visible && c.collidable && c.isEntity && c != a) || !(d = c.checkCollision(a))););
   return d
  };
  a.repaint = function() {
   l.makeAllDirty()
  };
  a.draw = function() {
   l.isDirty && (l.draw(d), a.viewport.draw(d));
   l.flush()
  };
  return a
 }();
 me.ScreenObject = Object.extend({
  visible: !0,
  addAsObject: !1,
  rect: null,
  init: function(a) {
   this.addAsObject = a;
   this.visible = !0 === a || !1;
   this.rect = new me.Rect(new me.Vector2d(0, 0),
       0, 0)
  },
  reset: function() {
   me.game.reset();
   if (this.addAsObject) this.visible = !0, this.rect = me.game.viewport.getRect(), me.game.add(this, 999);
   this.onResetEvent.apply(this, arguments);
   me.game.sort()
  },
  getRect: function() {
   return this.rect
  },
  destroy: function() {
   this.onDestroyEvent.apply(this, arguments);
   return !0
  },
  update: function() {
   return !1
  },
  onUpdateFrame: function() {
   me.game.update();
   me.game.draw();
   me.video.blitSurface()
  },
  draw: function() {},
  onResetEvent: function() {},
  onDestroyEvent: function() {}
 });
 window.requestAnimFrame =
     function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function() {
           return -1
          }
     }();
 window.cancelRequestAnimFrame = function() {
  return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || function() {
       return -1
      }
 }();
 me.state = function() {
  function d() {
   if (-1 ==
       g && -1 == j) {
    me.timer.reset();
    if (me.sys.useNativeAnimFrame) {
     j = window.requestAnimFrame(b);
     if (-1 != j) return;
     me.sys.useNativeAnimFrame = !1
    }
    g = setInterval(u, y)
   }
  }

  function b() {
   u();
   window.requestAnimFrame(b)
  }

  function e() {
   -1 != g && (clearInterval(g), g = -1); - 1 != j && (cancelRequestAnimFrame(j), j = -1)
  }

  function f(a) {
   e();
   o[h] && (o[h].screen.visible ? me.game.remove(o[h].screen) : o[h].screen.destroy());
   o[a] && (h = a, o[h].screen.reset.apply(o[h].screen, v), u = o[h].screen.onUpdateFrame.bind(o[h].screen), d(), l && l(), me.game.repaint())
  }
  var c = {},
      h = -1,
      g = -1,
      j = -1,
      o = {},
      m = "",
      k = 0,
      l = null,
      v = null,
      u = null,
      y = null;
  c.LOADING = 0;
  c.MENU = 1;
  c.READY = 2;
  c.PLAY = 3;
  c.GAMEOVER = 4;
  c.GAME_END = 5;
  c.SCORE = 6;
  c.CREDITS = 7;
  c.SETTINGS = 8;
  c.onPause = null;
  c.onResume = null;
  c.init = function() {
   c.set(c.LOADING, me.loadingScreen);
   a.addEventListener("blur", function() {
    if (h != c.LOADING && (c.pause(!0), c.onPause)) c.onPause()
   }, !1);
   a.addEventListener("focus", function() {
    if (h != c.LOADING) {
     c.resume(!0);
     if (c.onResume) c.onResume();
     me.game.repaint()
    }
   }, !1);
   y = ~~(1E3 / me.sys.fps)
  };
  c.pause = function(a) {
   e();
   a && me.audio.pauseTrack()
  };
  c.resume = function(a) {
   d(h);
   a && me.audio.resumeTrack()
  };
  c.isRunning = function() {
   return -1 != g || -1 != j
  };
  c.set = function(a, d) {
   o[a] = {};
   o[a].screen = d;
   o[a].transition = !0
  };
  c.current = function() {
   return o[h].screen
  };
  c.transition = function(a, d, b) {
   "fade" == a && (m = d, k = b)
  };
  c.setTransition = function(a, d) {
   o[a].transition = d
  };
  c.change = function(a) {
   switch (a) {
    default: v = null,
    1 < arguments.length && (v = Array.prototype.slice.call(arguments, 1)),
        k && o[a].transition ? (l = function() {
         me.game.viewport.fadeOut(m, k)
        }, me.game.viewport.fadeIn(m,
            k,
            function() {
             f(a)
            })) : f.defer(a)
   }
  };
  c.isCurrent = function(a) {
   return h == a
  };
  return c
 }()
})(window);
(function(a, c) {
 me.DefaultLoadingScreen = me.ScreenObject.extend({
  init: function() {
   this.parent(!0);
   this.logo1 = new me.Font("century gothic", 32, "white");
   this.logo2 = new me.Font("century gothic", 32, "#89b002");
   this.logo2.bold();
   this.invalidate = !1;
   this.loadPercent = 0;
   me.loader.onProgress = this.onProgressUpdate.bind(this)
  },
  onDestroyEvent: function() {
   this.logo1 = this.logo2 = null
  },
  onProgressUpdate: function(a) {
   this.loadPercent = a;
   this.invalidate = !0
  },
  update: function() {
   return !0 === this.invalidate ? (this.invalidate = !1, !0) :
       !1
  },
  draw: function(a) {
   var c = a.canvas.height / 2,
       d = this.logo1.measureText(a, "melon").width,
       e = d + this.logo2.measureText(a, "JS").width;
   me.video.clearSurface(a, "black");
   this.logo1.draw(a, "melon", (a.canvas.width - e) / 2, (a.canvas.height + 60) / 2);
   this.logo2.draw(a, "JS", (a.canvas.width - e) / 2 + d, (a.canvas.height + 60) / 2);
   c += 40;
   d = Math.floor(this.loadPercent * a.canvas.width);
   a.strokeStyle = "silver";
   a.strokeRect(0, c, a.canvas.width, 6);
   a.fillStyle = "#89b002";
   a.fillRect(2, c + 2, d - 4, 2)
  }
 });
 me.loader = function() {
  function b() {
   if (m ==
       k - l) {
    for (var a in h) h[a].isTMX && (me.levelDirector.addTMXLevel(a), e.onResourceLoaded());
    e.onload ? setTimeout(e.onload, 300) : alert("no load callback defined")
   } else setTimeout(b, 100)
  }

  function g(d, b, e, c) {
   if (a.XMLHttpRequest) {
    var f = new XMLHttpRequest;
    f.overrideMimeType && f.overrideMimeType("text/xml")
   } else f = new ActiveXObject("Microsoft.XMLHTTP");
   f.open("GET", d.src + me.nocache, !1);
   f.onerror = c;
   f.onload = function() {
    h[d.name] = {};
    h[d.name].xml = f.responseText;
    h[d.name].isTMX = b;
    e()
   };
   b && (this.resourceCount += 1, this.tmxCount +=
       1);
   f.send()
  }

  function d(a, d, b) {
   var e = new XMLHttpRequest;
   e.open("GET", a.src + me.nocache, !1);
   e.responseType = "arraybuffer";
   xmlhttp.onerror = b;
   e.onload = function() {
    var b = e.response;
    if (b) {
     var b = new Uint8Array(b),
         f = [];
     j[a.name] = new dataType;
     for (var c = 0; c < b.byteLength; c++) f[c] = String.fromCharCode(b[c]);
     j[a.name].data = f.join("");
     d()
    }
   };
   e.send()
  }
  var e = {},
      f = [],
      h = {},
      j = {},
      k = 0,
      m = 0,
      l = 0;
  e.onload = c;
  e.onProgress = c;
  e.onResourceLoaded = function() {
   m++;
   if (e.onProgress) e.onProgress(e.getLoadProgress())
  };
  e.onLoadingError = function(a) {
   throw "melonJS: Failed loading resource " +
   a.src;
  };
  e.preload = function(a) {
   for (var d = 0; d < a.length; d++) k += e.load(a[d], e.onResourceLoaded.bind(e), e.onLoadingError.bind(e, a[d]));
   b()
  };
  e.load = function(a, b, e) {
   a.name = a.name.toLowerCase();
   switch (a.type) {
    case "binary":
     return d(a, b, e), 1;
    case "image":
     return f.push(a.name), f[a.name] = new Image, f[a.name].onload = b, f[a.name].onerror = e, f[a.name].src = a.src + me.nocache, 1;
    case "tmx":
     return g(a, !0, b, e), 1;
    case "audio":
     me.audio.setLoadCallback(b);
     if (me.audio.isAudioEnable()) return me.audio.load(a), 1;
     break;
    default:
     throw "melonJS: me.loader.load : unknow or invalide resource type : %s" +
     a.type;
   }
   return 0
  };
  e.getXML = function(a) {
   a = a.toLowerCase();
   return null != h ? h[a].xml : null
  };
  e.getBinary = function(a) {
   a = a.toLowerCase();
   return null != j ? j[a] : null
  };
  e.getImage = function(a) {
   a = a.toLowerCase();
   if (null != f[a]) {
    if (!0 === me.sys.cacheImage) {
     var d = me.video.createCanvasSurface(f[a].width, f[a].height);
     d.drawImage(f[a], 0, 0);
     return d.canvas
    }
    return f[a]
   }
   return null
  };
  e.getLoadProgress = function() {
   return m / k
  };
  return e
 }()
})(window);
(function() {
 me.Vector2d = Object.extend({
  x: 0,
  y: 0,
  init: function(a, c) {
   this.x = a || 0;
   this.y = c || 0
  },
  set: function(a, c) {
   this.x = a;
   this.y = c
  },
  setZero: function() {
   this.set(0, 0)
  },
  setV: function(a) {
   this.x = a.x;
   this.y = a.y
  },
  add: function(a) {
   this.x += a.x;
   this.y += a.y
  },
  sub: function(a) {
   this.x -= a.x;
   this.y -= a.y
  },
  scale: function(a) {
   this.x *= a.x;
   this.y *= a.y
  },
  div: function(a) {
   this.x /= a;
   this.y /= a
  },
  abs: function() {
   if (0 > this.x) this.x = -this.x;
   if (0 > this.y) this.y = -this.y
  },
  clamp: function(a, c) {
   return new me.Vector2d(this.x.clamp(a, c), this.y.clamp(a,
       c))
  },
  minV: function(a) {
   this.x = this.x < a.x ? this.x : a.x;
   this.y = this.y < a.y ? this.y : a.y
  },
  maxV: function(a) {
   this.x = this.x > a.x ? this.x : a.x;
   this.y = this.y > a.y ? this.y : a.y
  },
  floor: function() {
   return new me.Vector2d(~~this.x, ~~this.y)
  },
  ceil: function() {
   return new me.Vector2d(Math.ceil(this.x), Math.ceil(this.y))
  },
  negate: function() {
   return new me.Vector2d(-this.x, -this.y)
  },
  negateSelf: function() {
   this.x = -this.x;
   this.y = -this.y
  },
  copy: function(a) {
   this.x = a.x;
   this.y = a.y
  },
  length: function() {
   return Math.sqrt(this.x * this.x + this.y *
       this.y)
  },
  normalize: function() {
   var a = this.length();
   if (a < Number.MIN_VALUE) return 0;
   var c = 1 / a;
   this.x *= c;
   this.y *= c;
   return a
  },
  dotProduct: function(a) {
   return this.x * a.x + this.y * a.y
  },
  distance: function(a) {
   return Math.sqrt((this.x - a.x) * (this.x - a.x) + (this.y - a.y) * (this.y - a.y))
  },
  clone: function() {
   return new me.Vector2d(this.x, this.y)
  },
  toString: function() {
   return "x:" + this.x + "y:" + this.y
  }
 });
 me.Rect = Object.extend({
  pos: null,
  colPos: null,
  left: null,
  right: null,
  top: null,
  bottom: null,
  width: 0,
  height: 0,
  hWidth: 0,
  hHeight: 0,
  hProp: !1,
  vProp: !1,
  init: function(a, c, b) {
   this.pos = a;
   this.colPos = new me.Vector2d;
   this.width = c;
   this.height = b;
   this.hWidth = ~~(c / 2);
   this.hHeight = ~~(b / 2);
   Object.defineProperty(this, "left", {
    get: function() {
     return this.pos.x
    },
    configurable: !0
   });
   Object.defineProperty(this, "right", {
    get: function() {
     return this.pos.x + this.width
    },
    configurable: !0
   });
   Object.defineProperty(this, "top", {
    get: function() {
     return this.pos.y
    },
    configurable: !0
   });
   Object.defineProperty(this, "bottom", {
    get: function() {
     return this.pos.y + this.height
    },
    configurable: !0
   })
  },
  set: function(a, c, b) {
   this.pos = a;
   this.width = c;
   this.height = b;
   this.hWidth = ~~(c / 2);
   this.hHeight = ~~(b / 2)
  },
  getRect: function() {
   return new me.Rect(this.pos.clone(), this.width, this.height)
  },
  union: function(a) {
   var c = Math.min(this.pos.x, a.pos.x),
       b = Math.min(this.pos.y, a.pos.y);
   this.width = Math.ceil(Math.max(this.pos.x + this.width, a.pos.x + a.width) - c);
   this.height = Math.ceil(Math.max(this.pos.y + this.height, a.pos.y + a.height) - b);
   this.pos.x = ~~c;
   this.pos.y = ~~b;
   return this
  },
  adjustSize: function(a, c, b, g) {
   if (-1 != a && (this.colPos.x =
           a, this.width = c, this.hWidth = ~~(this.width / 2), !this.hProp)) Object.defineProperty(this, "left", {
    get: function() {
     return this.pos.x + this.colPos.x
    },
    configurable: !0
   }), Object.defineProperty(this, "right", {
    get: function() {
     return this.pos.x + this.colPos.x + this.width
    },
    configurable: !0
   }), this.hProp = !0;
   if (-1 != b && (this.colPos.y = b, this.height = g, this.hHeight = ~~(this.height / 2), !this.vProp)) Object.defineProperty(this, "top", {
    get: function() {
     return this.pos.y + this.colPos.y
    },
    configurable: !0
   }), Object.defineProperty(this, "bottom", {
    get: function() {
     return this.pos.y + this.colPos.y + this.height
    },
    configurable: !0
   }), this.vProp = !0
  },
  flipX: function(a) {
   this.colPos.x = a - this.width - this.colPos.x;
   this.hWidth = ~~(this.width / 2)
  },
  flipY: function(a) {
   this.colPos.y = a - this.height - this.colPos.y;
   this.hHeight = ~~(this.height / 2)
  },
  overlaps: function(a) {
   return this.left < a.right && a.left < this.right && this.top < a.bottom && a.top < this.bottom
  },
  within: function(a) {
   return a.left <= this.left && a.right >= this.right && a.top <= this.top && a.bottom >= this.bottom
  },
  contains: function(a) {
   return a.left >=
       this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom
  },
  containsPoint: function(a) {
   return a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom
  },
  collideVsAABB: function(a) {
   var c = new me.Vector2d(0, 0);
   if (this.overlaps(a)) {
    var b = this.left + this.hWidth - a.left - a.hWidth,
        g = this.top + this.hHeight - a.top - a.hHeight;
    c.x = a.hWidth + this.hWidth - (0 > b ? -b : b);
    c.y = a.hHeight + this.hHeight - (0 > g ? -g : g);
    c.x < c.y ? (c.y = 0, c.x = 0 > b ? -c.x : c.x) : (c.x = 0, c.y = 0 > g ? -c.y : c.y)
   }
   return c
  },
  draw: function(a, c) {
   a.strokeStyle =
       c || "red";
   a.strokeRect(this.left - me.game.viewport.pos.x, this.top - me.game.viewport.pos.y, this.width, this.height)
  }
 })
})(window);
(function() {
 var a = Math.min,
     c = Math.max;
 me.Viewport = me.Rect.extend({
  AXIS: {
   NONE: 0,
   HORIZONTAL: 1,
   VERTICAL: 2,
   BOTH: 3
  },
  limits: null,
  target: null,
  follow_axis: 0,
  _shake: null,
  _fadeIn: null,
  _fadeOut: null,
  _deadwidth: 0,
  _deadheight: 0,
  _limitwidth: 0,
  _limitheight: 0,
  init: function(a, c, d, e, f, h) {
   this.parent(new me.Vector2d(a, c), d - a, e - c);
   this.last = new me.Vector2d(-1, -1);
   this.limits = new me.Vector2d(f || this.width, h || this.height);
   this.target = null;
   this.follow_axis = this.AXIS.NONE;
   this._shake = {
    intensity: 0,
    duration: 0,
    axis: this.AXIS.BOTH,
    onComplete: null
   };
   this._fadeOut = {
    color: 0,
    alpha: 0,
    duration: 0,
    tween: null
   };
   this._fadeIn = {
    color: 0,
    alpha: 1,
    duration: 0,
    tween: null
   };
   this.setDeadzone(this.width / 6, this.height / 6)
  },
  _followH: function(b) {
   if (b.x - this.pos.x > this._deadwidth) this.pos.x = ~~a(b.x - this._deadwidth, this._limitwidth);
   else if (b.x - this.pos.x < this.deadzone.x) this.pos.x = ~~c(b.x - this.deadzone.x, 0)
  },
  _followV: function(b) {
   if (b.y - this.pos.y > this._deadheight) this.pos.y = ~~a(b.y - this._deadheight, this._limitheight);
   else if (b.y - this.pos.y < this.deadzone.y) this.pos.y = ~~c(b.y - this.deadzone.y, 0)
  },
  reset: function(a, c) {
   this.pos.x = a || 0;
   this.pos.y = c || 0;
   this.last.set(-1, -1);
   this.follow_axis = this.target = null
  },
  setDeadzone: function(a, c) {
   this.deadzone = new me.Vector2d(~~((this.width - a) / 2), ~~((this.height - c) / 2 - 0.25 * c));
   this._deadwidth = this.width - this.deadzone.x;
   this._deadheight = this.height - this.deadzone.y;
   this.update(!0)
  },
  setBounds: function(a, c) {
   this.limits.set(a, c);
   this._limitwidth = this.limits.x - this.width;
   this._limitheight = this.limits.y - this.height
  },
  follow: function(a, c) {
   if (a instanceof me.ObjectEntity) this.target = a.pos;
   else if (a instanceof me.Vector2d) this.target = a;
   else throw "melonJS: invalid target for viewport.follow";
   this.follow_axis = c || this.AXIS.BOTH;
   this.update(!0)
  },
  move: function(a, c) {
   var d = ~~(this.pos.x + a),
       e = ~~(this.pos.y + c);
   if (0 <= d && d <= this._limitwidth) this.pos.x = d;
   if (0 <= e && e <= this._limitheight) this.pos.y = e
  },
  update: function(a) {
   if (this.target && a) {
    switch (this.follow_axis) {
     case this.AXIS.HORIZONTAL:
      this._followH(this.target, 0 < this._shake.duration);
      break;
     case this.AXIS.VERTICAL:
      this._followV(this.target,
          0 < this._shake.duration);
      break;
     case this.AXIS.BOTH:
      this._followH(this.target, 0 < this._shake.duration), this._followV(this.target, 0 < this._shake.duration)
    }
    a = this.last.x != this.pos.x || this.last.y != this.pos.y;
    this.last.copy(this.pos)
   }
   if (0 < this._shake.duration)
    if (this._shake.duration -= me.timer.tick, 0 > this._shake.duration) {
     if (this._shake.onComplete) this._shake.onComplete()
    } else {
     if (this._shake.axis == this.AXIS.BOTH || this._shake.axis == this.AXIS.HORIZONTAL) a = Math.random() * this._shake.intensity, this.pos.x = this.pos.x +
     this.width + a < this.limits.x ? this.pos.x + ~~a : this.pos.x - ~~a;
     if (this._shake.axis == this.AXIS.BOTH || this._shake.axis == this.AXIS.VERTICAL) a = Math.random() * this._shake.intensity, this.pos.y = this.pos.y + this.height + a < this.limits.y ? this.pos.y + ~~a : this.pos.y - ~~a;
     a = !0
    }
   if (null != this._fadeIn.tween || null != this._fadeOut.tween) a = !0;
   return a
  },
  shake: function(a, c, d, e) {
   d = d || this.AXIS.BOTH;
   if (d == this.AXIS.BOTH)
    if (this.width == this.limits.x) d = this.AXIS.VERTICAL;
    else if (this.height == this.limits.y) d = this.AXIS.HORIZONTAL;
   if (!(d ==
       this.AXIS.HORIZONTAL && this.width == this.limits.x || d == this.AXIS.VERTICAL && this.height == this.limits.y)) this._shake.intensity = a, this._shake.duration = c, this._shake.axis = d, this._shake.onComplete = e || null
  },
  fadeOut: function(a, c, d) {
   this._fadeOut.color = a;
   this._fadeOut.duration = c || 1E3;
   this._fadeOut.alpha = 1;
   this._fadeOut.tween = (new me.Tween(this._fadeOut)).to({
    alpha: 0
   }, this._fadeOut.duration).onComplete(d || null);
   this._fadeOut.tween.start()
  },
  fadeIn: function(a, c, d) {
   this._fadeIn.color = a;
   this._fadeIn.duration = c ||
       1E3;
   this._fadeIn.alpha = 0;
   this._fadeIn.tween = (new me.Tween(this._fadeIn)).to({
    alpha: 1
   }, this._fadeIn.duration).onComplete(d || null);
   this._fadeIn.tween.start()
  },
  getWidth: function() {
   return this.width
  },
  getHeight: function() {
   return this.height
  },
  focusOn: function(a) {
   this.pos.x = a.x - 0.5 * this.width;
   this.pos.y = a.y - 0.5 * this.height
  },
  isVisible: function(a) {
   return a.overlaps(this)
  },
  draw: function(a) {
   if (this._fadeIn.tween && (me.sys.enableWebGL ? me.video.clearSurface(a, me.utils.HexToRGB(this._fadeIn.color, this._fadeIn.alpha)) :
           (a.globalAlpha = this._fadeIn.alpha, me.video.clearSurface(a, me.utils.HexToRGB(this._fadeIn.color)), a.globalAlpha = 1), 1 == this._fadeIn.alpha)) this._fadeIn.tween = null;
   if (this._fadeOut.tween && (me.sys.enableWebGL ? me.video.clearSurface(a, me.utils.HexToRGB(this._fadeOut.color, this._fadeOut.alpha)) : (a.globalAlpha = this._fadeOut.alpha, me.video.clearSurface(a, me.utils.HexToRGB(this._fadeOut.color)), a.globalAlpha = 1), 0 == this._fadeOut.alpha)) this._fadeOut.tween = null
  }
 })
})(window);
(function(a, c) {
 var b = Math.min;
 me.ObjectSettings = {
  name: null,
  image: null,
  transparent_color: null,
  spritewidth: null,
  spriteheight: null,
  type: 0,
  collidable: !1
 };
 me.entityPool = function() {
  var a = {},
      b = {};
  a.init = function() {
   a.add("me.LevelEntity", me.LevelEntity);
   a.add("me.ObjectEntity", me.ObjectEntity);
   a.add("me.CollectableEntity", me.CollectableEntity);
   a.add("me.InvisibleEntity", me.InvisibleEntity)
  };
  a.add = function(a, d) {
   b[a.toLowerCase()] = d
  };
  a.newIstanceOf = function(a) {
   return !b[a.name.toLowerCase()] ? (alert("cannot instance entity of type '" +
       a.name + "': Class not found!"), null) : new(b[a.name.toLowerCase()])(a.x, a.y, a)
  };
  return a
 }();
 var g = me.Rect.extend({
  init: function(a, b, c) {
   this.image = me.loader.getImage(a);
   if (null == this.image) throw "melonJS: image " + a + " for Parallax Layer not found!";
   this.parent(new me.Vector2d(0, 0), this.image.width, this.image.height);
   this.baseOffset = 0;
   this.z = c || 0;
   this.scrollspeed = b;
   this.vp_width = me.game.viewport.width
  },
  draw: function(a, e, c) {
   var h = 0,
       g = b(this.width - e, this.vp_width);
   do a.drawImage(this.image, e, 0, g, this.height,
       h, c, g, this.height), h += g, e = 0, g = b(this.width, this.vp_width - h); while (h < this.vp_width)
  }
 });
 me.ParallaxBackgroundEntity = me.Rect.extend({
  init: function(a) {
   this.parent(new me.Vector2d(0, 0), 0, 0);
   this.name = "parallaxBackgroundEntity";
   this.visible = !0;
   this.z = a || 0;
   this.vp = me.game.viewport.pos;
   this.lastx = this.vp.x;
   this.parallaxLayers = [];
   this.updated = !0
  },
  addLayer: function(a, b, c) {
   var h = this.parallaxLayers.length;
   this.parallaxLayers.push(new g(a, b, c));
   if (this.parallaxLayers[h].width > this.width) this.width = this.parallaxLayers[h].width;
   if (this.parallaxLayers[h].height > this.height) this.height = this.parallaxLayers[h].height
  },
  clearTile: function() {},
  update: function() {
   return this.updated
  },
  getRect: function() {
   return new me.Rect(this.vp.clone(), this.width, this.height)
  },
  draw: function(a) {
   var b = this.vp.x;
   if (b > this.lastx)
    for (var c = 0, h; h = this.parallaxLayers[c++];) h.baseOffset = (h.baseOffset + h.scrollspeed * me.timer.tick) % h.width, h.draw(a, ~~h.baseOffset, 0), this.lastx = b, this.updated = !0;
   else if (b < this.lastx)
    for (c = 0; h = this.parallaxLayers[c++];) h.baseOffset =
        (h.width + (h.baseOffset - h.scrollspeed * me.timer.tick)) % h.width, h.draw(a, ~~h.baseOffset, 0), this.lastx = b, this.updated = !0;
   else
    for (c = 0; h = this.parallaxLayers[c++];) h.draw(a, ~~h.baseOffset, 0), this.lastx = b, this.updated = !1
  }
 });
 me.SpriteObject = me.Rect.extend({
  scale: null,
  scaleFlag: !1,
  lastflipX: !1,
  lastflipY: !1,
  z: 0,
  offset: null,
  autodestroy: !0,
  visible: !0,
  image: null,
  collisionBox: null,
  flickering: !1,
  flickerTimer: -1,
  flickercb: null,
  flickerState: !1,
  vp: null,
  init: function(a, b, c, h, g) {
   this.parent(new me.Vector2d(a, b), h || c.width,
       g || c.height);
   this.image = c;
   this.scale = new me.Vector2d(1, 1);
   this.collisionBox = new me.Rect(this.pos, this.width, this.height);
   this.vp = me.game.viewport;
   this.offset = new me.Vector2d(0, 0);
   this.spritecount = new me.Vector2d(~~(this.image.width / this.width), ~~(this.image.height / this.height))
  },
  setTransparency: function(a) {
   a = "#" == a.charAt(0) ? a.substring(1, 7) : a;
   this.image = me.video.applyRGBFilter(this.image, "transparent", a.toUpperCase()).canvas
  },
  isFlickering: function() {
   return this.flickering
  },
  flicker: function(a, b) {
   this.flickerTimer =
       a;
   if (0 > this.flickerTimer) this.flickering = !1, this.flickercb = null;
   else if (!this.flickering) this.flickercb = b, this.flickering = !0
  },
  flipX: function(a) {
   if (a != this.lastflipX) this.lastflipX = a, this.scale.x = -this.scale.x, this.scaleFlag = 1 != this.scale.x || 1 != this.scale.y, this.collisionBox.flipX(this.width)
  },
  flipY: function(a) {
   if (a != this.lastflipY) this.lastflipY = a, this.scale.y = -this.scale.y, this.scaleFlag = 1 != this.scale.x || 1 != this.scale.y, this.collisionBox.flipY(this.height)
  },
  resize: function(a) {
   if (0 < a) this.scale.x =
       0 > this.scale.x ? -a : a, this.scale.y = 0 > this.scale.y ? -a : a, this.scaleFlag = 1 != this.scale.x || 1 != this.scale.y
  },
  update: function() {
   return this.flickering ? (this.flickerTimer -= me.timer.tick, 0 > this.flickerTimer && (this.flickercb && this.flickercb(), this.flicker(-1)), !0) : !1
  },
  draw: function(a) {
   if (this.flickering && (this.flickerState = !this.flickerState, !this.flickerState)) return;
   var b = ~~(this.pos.x - this.vp.pos.x),
       c = ~~(this.pos.y - this.vp.pos.y);
   this.scaleFlag && (a.translate(b + this.hWidth, c + this.hHeight), a.scale(this.scale.x,
       this.scale.y), a.translate(-this.hWidth, -this.hHeight), b = c = 0);
   a.drawImage(this.image, this.offset.x, this.offset.y, this.width, this.height, b, c, this.width, this.height);
   this.scaleFlag && a.setTransform(1, 0, 0, 1, 0, 0);
   me.debug.renderHitBox && (this.parent(a, "blue"), this.collisionBox.draw(a, "red"))
  },
  destroy: function() {
   if (this.autodestroy) this.onDestroyEvent();
   return this.autodestroy
  },
  onDestroyEvent: function() {}
 });
 me.AnimationSheet = me.SpriteObject.extend({
  fpscount: 0,
  animationspeed: 0,
  init: function(a, b, c, h, g) {
   this.anim = [];
   this.current = this.resetAnim = null;
   this.parent(a, b, c, h, g);
   if (1 == this.spritecount.x * this.spritecount.y) this.setAnimationFrame = function() {};
   this.animationspeed = me.sys.fps / 10;
   this.addAnimation("default", null);
   this.setCurrentAnimation("default")
  },
  addAnimation: function(a, b) {
   this.anim[a] = {
    name: a,
    frame: [],
    idx: 0,
    length: 0
   };
   if (null == b)
    for (var b = [], c = 0, h = this.spritecount.x * this.spritecount.y; c < h; c++) b[c] = c;
   c = 0;
   for (h = b.length; c < h; c++) this.anim[a].frame[c] = new me.Vector2d(this.width * (b[c] % this.spritecount.x),
       this.height * ~~(b[c] / this.spritecount.x));
   this.anim[a].length = this.anim[a].frame.length
  },
  setCurrentAnimation: function(a, b) {
   this.current = this.anim[a];
   this.resetAnim = b || null;
   this.setAnimationFrame(this.current.idx)
  },
  isCurrentAnimation: function(a) {
   return this.current.name == a
  },
  setAnimationFrame: function(a) {
   this.current.idx = (a || 0) % this.current.length;
   this.offset = this.current.frame[this.current.idx]
  },
  update: function() {
   this.parent();
   return this.visible && this.fpscount++ > this.animationspeed ? (this.setAnimationFrame(++this.current.idx),
       this.fpscount = 0, 0 == this.current.idx && this.resetAnim && ("string" == typeof this.resetAnim ? this.setCurrentAnimation(this.resetAnim) : "function" == typeof this.resetAnim && this.resetAnim()), !0) : !1
  }
 });
 me.ObjectEntity = me.AnimationSheet.extend({
  GUID: null,
  type: 0,
  collidable: !1,
  init: function(a, b, f) {
   this.parent(a, b, "string" == typeof f.image ? me.loader.getImage(f.image) : f.image, f.spritewidth, f.spriteheight);
   f.transparent_color && this.setTransparency(f.transparent_color);
   this.GUID = me.utils.createGUID();
   this.name = f.name ?
       f.name.toLowerCase() : "";
   this.pos.set(a, me.game.currentLevel ? b + me.game.currentLevel.tileheight - this.height : b);
   this.vel = new me.Vector2d;
   this.accel = new me.Vector2d;
   this.friction = new me.Vector2d;
   this.maxVel = new me.Vector2d(1E3, 1E3);
   this.gravity = me.sys.gravity != c ? me.sys.gravity : 0.98;
   this.alive = this.isEntity = !0;
   this.falling = !1;
   this.jumping = !0;
   this.slopeY = 0;
   this.onladder = this.onslope = !1;
   this.collidable = f.collidable || !1;
   this.type = f.type || 0;
   this.collisionMap = me.game.collisionMap;
   this.canBreakTile = !1;
   this.onTileBreak =
       null
  },
  updateColRect: function(a, b, c, h) {
   this.collisionBox.adjustSize(a, b, c, h)
  },
  checkCollision: function(a) {
   var b = this.collisionBox.collideVsAABB(a.collisionBox);
   return 0 != b.x || 0 != b.y ? (this.onCollision(b, a), b.type = this.type, b.obj = this, b) : null
  },
  onCollision: function() {
   this.collidable && this.type == me.game.COLLECTABLE_OBJECT && me.game.remove(this)
  },
  setVelocity: function(a, b) {
   this.accel.x = 0 != a ? a : this.accel.x;
   this.accel.y = 0 != b ? b : this.accel.y;
   this.setMaxVelocity(a, b)
  },
  setMaxVelocity: function(a, b) {
   this.maxVel.x =
       a;
   this.maxVel.y = b
  },
  setFriction: function(a, b) {
   this.friction.x = a || 0;
   this.friction.y = b || 0
  },
  doWalk: function(a) {
   this.flipX(a);
   this.vel.x += a ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick
  },
  doClimb: function(a) {
   return this.onladder ? (this.vel.y = a ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick, !0) : !1
  },
  doJump: function() {
   return !this.jumping && !this.falling ? (this.vel.y = -this.maxVel.y * me.timer.tick, this.jumping = !0) : !1
  },
  forceJump: function() {
   this.jumping = this.falling = !1;
   this.doJump()
  },
  distanceTo: function(a) {
   var b =
           this.pos.x + this.hWidth - (a.pos.x + a.hWidth),
       a = this.pos.y + this.hHeight - (a.pos.y + a.hHeight);
   return Math.sqrt(b * b + a * a)
  },
  checkSlope: function(a, b) {
   this.pos.y = a.pos.y - this.height;
   this.slopeY = b ? a.height - (this.collisionBox.right + this.vel.x - a.pos.x) : this.collisionBox.left + this.vel.x - a.pos.x;
   this.vel.y = 0;
   this.pos.y += this.slopeY.clamp(0, a.height)
  },
  computeVelocity: function(a) {
   if (this.gravity) a.y += !this.onladder ? this.gravity * me.timer.tick : 0, this.jumping = (this.falling = 0 < a.y) ? !1 : this.jumping;
   if (this.friction.x) a.x =
       me.utils.applyFriction(a.x, this.friction.x);
   if (this.friction.y) a.y = me.utils.applyFriction(a.y, this.friction.y);
   if (0 != a.y) a.y = a.y.clamp(-this.maxVel.y, this.maxVel.y);
   if (0 != a.x) a.x = a.x.clamp(-this.maxVel.x, this.maxVel.x)
  },
  updateMovement: function() {
   this.computeVelocity(this.vel);
   var a = this.collisionMap.checkCollision(this.collisionBox, this.vel);
   this.onslope = a.yprop.isSlope || a.xprop.isSlope;
   this.onladder = !1;
   if (a.y)
    if (this.onladder = a.yprop.isLadder, 0 < a.y)
     if (a.yprop.isSolid || a.yprop.isPlatform && this.collisionBox.bottom -
         1 <= a.ytile.pos.y) this.pos.y = ~~this.pos.y, this.vel.y = this.falling ? a.ytile.pos.y - this.collisionBox.bottom : 0, this.falling = !1;
     else if (a.yprop.isSlope && !this.jumping) this.checkSlope(a.ytile, a.yprop.isLeftSlope), this.falling = !1;
     else {
      if (a.yprop.isBreakable)
       if (this.canBreakTile) {
        if (me.game.currentLevel.clearTile(a.ytile.row, a.ytile.col), this.onTileBreak) this.onTileBreak()
       } else this.pos.y = ~~this.pos.y, this.vel.y = this.falling ? a.ytile.pos.y - this.collisionBox.bottom : 0, this.falling = !1
     } else if (0 > a.y && !a.yprop.isPlatform &&
        !a.yprop.isLadder) this.falling = !0, this.vel.y = 0;
   if (a.x)
    if (this.onladder = a.xprop.isLadder, a.xprop.isSlope && !this.jumping) this.checkSlope(a.xtile, a.xprop.isLeftSlope), this.falling = !1;
    else if (!a.xprop.isPlatform && !a.xprop.isLadder)
     if (a.xprop.isBreakable && this.canBreakTile) {
      if (me.game.currentLevel.clearTile(a.xtile.row, a.xtile.col), this.onTileBreak) this.onTileBreak()
     } else this.vel.x = 0;
   this.pos.add(this.vel);
   return a
  }
 });
 me.CollectableEntity = me.ObjectEntity.extend({
  init: function(a, b, c) {
   this.parent(a, b, c);
   this.collidable = !0;
   this.type = me.game.COLLECTABLE_OBJECT
  }
 });
 me.InvisibleEntity = me.Rect.extend({
  GUID: null,
  z: 0,
  collisionBox: null,
  init: function(a, b, c) {
   this.parent(new me.Vector2d(a, b), c.width, c.height);
   this.collisionBox = new me.Rect(this.pos, c.width, c.height);
   this.GUID = me.utils.createGUID();
   this.name = c.name ? c.name.toLowerCase() : "";
   this.isEntity = this.collidable = this.visible = !0
  },
  updateColRect: function(a, b, c, h) {
   this.collisionBox.adjustSize(a, b, c, h)
  },
  checkCollision: function(a) {
   var b = this.collisionBox.collideVsAABB(a.collisionBox);
   return 0 != b.x || 0 != b.y ? (this.onCollision(b, a), b.type = this.type, b.obj = this, b) : null
  },
  onCollision: function() {
   this.collidable && this.type == me.game.COLLECTABLE_OBJECT && me.game.remove(this)
  },
  destroy: function() {
   this.onDestroyEvent();
   return !0
  },
  onDestroyEvent: function() {},
  update: function() {
   return !1
  },
  draw: function(a) {
   if (me.debug.renderHitBox) a.strokeStyle = "blue", a.strokeRect(this.pos.x - me.game.viewport.pos.x, this.pos.y - me.game.viewport.pos.y, this.width, this.height), this.collisionBox.draw(a)
  }
 });
 me.LevelEntity =
     me.InvisibleEntity.extend({
      init: function(a, b, c) {
       this.parent(a, b, c);
       this.nextlevel = c.to;
       this.fade = c.fade;
       this.duration = c.duration;
       this.fading = !1;
       this.gotolevel = c.to
      },
      onFadeComplete: function() {
       me.levelDirector.loadLevel(this.gotolevel);
       me.game.viewport.fadeOut(this.fade, this.duration)
      },
      goTo: function(a) {
       this.gotolevel = a || this.nextlevel;
       if (this.fade && this.duration) {
        if (!this.fading) this.fading = !0, me.game.viewport.fadeIn(this.fade, this.duration, this.onFadeComplete.bind(this))
       } else me.levelDirector.loadLevel(this.gotolevel)
      },
      onCollision: function() {
       this.goTo()
      }
     })
})(window);
(function() {
 me.Font = Object.extend({
  ALIGN: {
   LEFT: "left",
   CENTER: "center",
   RIGHT: "right"
  },
  font: null,
  height: null,
  color: null,
  align: null,
  init: function(a, c, b, g) {
   this.set(a, c, b, g)
  },
  bold: function() {
   this.font = "bold " + this.font
  },
  italic: function() {
   this.font = "italic " + this.font
  },
  set: function(a, c, b, g) {
   this.font = "" + c + "px " + a;
   this.height = c;
   this.color = b;
   this.align = g || "top"
  },
  getRect: function() {
   return new me.Rect(new Vector2d(0, 0), 0, 0)
  },
  measureText: function(a, c) {
   a.font = this.font;
   a.fillStyle = this.color;
   a.textBaseLine =
       this.align;
   var b = a.measureText(c);
   b.height = this.height;
   return b
  },
  draw: function(a, c, b, g) {
   a.font = this.font;
   a.fillStyle = this.color;
   a.textBaseLine = this.align;
   a.fillText(c, ~~b, ~~g)
  }
 });
 me.BitmapFont = me.Font.extend({
  size: null,
  sSize: null,
  firstChar: 32,
  charCount: 0,
  init: function(a, c, b, g) {
   this.parent(a, null, null);
   this.size = new me.Vector2d;
   this.sSize = new me.Vector2d;
   this.firstChar = g || 32;
   this.loadFontMetrics(a, c);
   this.align = this.ALIGN.RIGHT;
   b && this.resize(b)
  },
  loadFontMetrics: function(a, c) {
   this.font = me.loader.getImage(a);
   this.size.x = c.x || c;
   this.size.y = c.y || this.font.height;
   this.sSize.copy(this.size);
   this.charCount = ~~(this.font.width / this.size.x)
  },
  set: function(a, c) {
   this.align = a;
   c && this.resize(c)
  },
  resize: function(a) {
   this.sSize.copy(this.size);
   this.sSize.x *= a;
   this.sSize.y *= a
  },
  measureText: function(a) {
   return {
    width: a.length * this.sSize.x,
    height: this.sSize.y
   }
  },
  draw: function(a, c, b, g) {
   c = new String(c);
   switch (this.align) {
    case this.ALIGN.RIGHT:
     b -= this.measureText(c).width;
     break;
    case this.ALIGN.CENTER:
     b -= 0.5 * this.measureText(c).width
   }
   for (var d =
       0, e = c.length; d < e; d++) {
    var f = c.charCodeAt(d) - this.firstChar;
    a.drawImage(this.font, this.size.x * (f % this.charCount), this.size.y * ~~(f / this.charCount), this.size.x, this.size.y, ~~b, ~~g, this.sSize.x, this.sSize.y);
    b += this.sSize.x
   }
  }
 })
})(window);
(function() {
 me.GUI_Object = me.SpriteObject.extend({
  isClickable: !0,
  updated: !1,
  init: function(a, c, b) {
   this.parent(a, c, "string" == typeof b.image ? me.loader.getImage(b.image) : b.image, b.spritewidth, b.spriteheight);
   me.input.registerMouseEvent("mousedown", this.collisionBox, this.clicked.bind(this))
  },
  update: function() {
   return this.updated ? (this.updated = !1, !0) : !1
  },
  clicked: function() {
   if (this.isClickable) return this.updated = !0, this.onClicked()
  },
  onClicked: function() {
   return !0
  },
  onDestroyEvent: function() {
   me.input.releaseMouseEvent("mousedown",
       this.collisionBox)
  }
 })
})(window);
(function(a, c) {
 me.HUD_Item = Object.extend({
  init: function(a, c, d) {
   this.pos = new me.Vector2d(a || 0, c || 0);
   this.visible = !0;
   this.defaultvalue = d || 0;
   this.value = d || 0;
   this.updated = !0
  },
  reset: function() {
   this.set(this.defaultvalue)
  },
  set: function(a) {
   this.value = a;
   return this.updated = !0
  },
  update: function(a) {
   return this.set(this.value + a)
  },
  draw: function() {}
 });
 me.HUD_Object = me.Rect.extend({
  init: function(a, c, d, e, f) {
   this.parent(new me.Vector2d(a || 0, c || 0), d || me.video.getWidth(), e || me.video.getHeight());
   this.bgcolor = f;
   this.HUDItems = {};
   this.HUDobj = [];
   this.objCount = 0;
   this.HUD_invalidated = this.visible = !0;
   this.HUDCanvasSurface = me.video.createCanvasSurface(this.width, this.height);
   this.z = 999
  },
  addItem: function(a, c) {
   this.HUDItems[a] = c;
   this.HUDobj.push(this.HUDItems[a]);
   this.objCount++;
   this.HUD_invalidated = !0
  },
  removeItem: function(a) {
   if (this.HUDItems[a]) this.HUDobj.splice(this.HUDobj.indexOf(this.HUDItems[a]), 1), this.HUDItems[a] = null, this.objCount--, this.HUD_invalidated = !0
  },
  setItemValue: function(a, c) {
   if (this.HUDItems[a] && !0 == this.HUDItems[a].set(c)) this.HUD_invalidated = !0
  },
  updateItemValue: function(a, c) {
   if (this.HUDItems[a] && !0 == this.HUDItems[a].update(c)) this.HUD_invalidated = !0
  },
  getItemValue: function(a) {
   return this.HUDItems[a] ? this.HUDItems[a].value : 0
  },
  update: function() {
   return this.HUD_invalidated
  },
  reset: function(a) {
   a != c ? (this.HUDItems[a] && this.HUDItems[a].reset(), this.HUD_invalidated = !0) : this.resetAll()
  },
  resetAll: function() {
   for (var a = this.objCount, c; a--, c = this.HUDobj[a];) c.reset();
   this.HUD_invalidated = !0
  },
  getRect: function() {
   p = this.pos.clone();
   p.add(me.game.viewport.pos);
   return new me.Rect(p, this.width, this.height)
  },
  draw: function(a) {
   if (this.HUD_invalidated) {
    this.bgcolor ? me.video.clearSurface(this.HUDCanvasSurface, this.bgcolor) : this.HUDCanvasSurface.canvas.width = this.HUDCanvasSurface.canvas.width;
    for (var c = this.objCount, d; c--, d = this.HUDobj[c];)
     if (d.visible && (d.draw(this.HUDCanvasSurface, 0, 0), d.updated)) d.updated = !1
   }
   a.drawImage(this.HUDCanvasSurface.canvas, this.pos.x, this.pos.y);
   this.HUD_invalidated = !1
  }
 })
})(window);
(function() {
 me.audio = function() {
  function a() {
   var a = 0;
   if (me.sys.sound) {
    if (-1 != h.search(/mp3/i) && d.capabilities.mp3) return f[a];
    if (-1 != h.search(/ogg/i) && d.capabilities.ogg || -1 != h.search(/wav/i) && d.capabilities.wav) return f[++a];
    l = !1;
    return -1
   }
   l = !1
  }

  function c(a) {
   for (var a = e[a], b = 0, c; c = a[b++];)
    if (c.ended || !c.currentTime) return c.currentTime = i, c;
   a[0].pause();
   a[0].currentTime = i;
   return a[0]
  }

  function b(a, b, d) {
   var e = c(a.toLowerCase());
   e.loop = b || !1;
   e.play();
   d && !b && e.addEventListener("ended", function(a) {
    e.removeEventListener("ended",
        arguments.callee, !1);
    d()
   }, !1)
  }

  function g(a, b, c) {
   c && !b && setTimeout(c, 2E3)
  }
  var d = {},
      e = [],
      f = ["mp3", "ogg", "wav"],
      h = null,
      j = -1,
      k = null,
      m = null,
      l = !0,
      i = 0,
      n = 0;
  d.capabilities = {
   mp3: !1,
   ogg: !1,
   ma4: !1,
   wav: !1
  };
  d.init = function(c) {
   h = c ? new String(c) : new String("mp3");
   j = a();
   d.play = l ? b : g;
   return l
  };
  d.setLoadCallback = function(a) {
   k = a
  };
  d.isAudioEnable = function() {
   return l
  };
  d.enable = function() {
   l = me.sys.sound;
   d.play = l ? b : g
  };
  d.disable = function() {
   l = !1;
   d.play = g
  };
  d.load = function(a) {
   if (-1 == j) return 0;
   var b = new Audio(a.src + a.name + "." +
       j + me.nocache);
   b.preload = "auto";
   b.addEventListener("canplaythrough", function(b) {
    this.removeEventListener("canplaythrough", arguments.callee, !1);
    var c = a.name,
        d = a.channel;
    n = 0;
    if (1 < d)
     for (var f = e[c][0], h = 1; h < d; h++) {
      var g = f.cloneNode(!0);
      if (0 == g.currentSrc.length) g.src = f.src;
      e[c][h] = g;
      e[c][h].load()
     }
    k && k()
   }, !1);
   b.addEventListener("error", function() {
    var b = a.name;
    if (3 < n++)
     if (b = "melonJS: failed loading " + b + "." + j, !1 === me.sys.stopOnAudioError) me.audio.disable(), k && k(), console.log(b + ", disabling audio");
     else throw b;
    else e[b][0].load()
   }, !1);
   b.src = a.src + a.name + "." + j + me.nocache;
   b.load();
   e[a.name] = [b];
   return 1
  };
  d.stop = function(a) {
   if (l)
    for (var a = e[a.toLowerCase()], b = a.length; b--;) a[b].pause(), a[b].currentTime = i
  };
  d.pause = function(a) {
   if (l)
    for (var a = e[a.toLowerCase()], b = a.length; b--;) a[b].pause()
  };
  d.playTrack = function(a) {
   if (l && (null != m && d.stopTrack(), m = c(a.toLowerCase()))) m.loop = !0, m.play()
  };
  d.stopTrack = function() {
   l && m && (m.pause(), m = null)
  };
  d.pauseTrack = function() {
   l && m && m.pause()
  };
  d.resumeTrack = function() {
   l && m && m.play()
  };
  return d
 }()
})(window);
(function() {
 me.timer = function() {
  var a = {},
      c = null,
      b = !1,
      g = 0,
      d = 0,
      e = 0,
      f = 0,
      h = 0,
      j = Math.ceil(1E3 / me.sys.fps),
      k = 1.25 * (1E3 / me.sys.fps);
  a.tick = 1;
  a.init = function() {
   c = document.getElementById("framecounter");
   b = null !== c;
   a.reset()
  };
  a.reset = function() {
   f = e = (new Date).getTime();
   g = d = 0
  };
  a.getTime = function() {
   return f
  };
  a.update = function() {
   e = f;
   f = (new Date).getTime();
   h = f - e;
   if (b && (g++, d += h, 0 == g % 10)) {
    var m = (~~(1E3 * g / d)).clamp(0, me.sys.fps);
    c.replaceChild(document.createTextNode("(" + m + "/" + me.sys.fps + " fps)"), c.firstChild);
    g =
        d = 0
   }
   a.tick = h > k && me.sys.interpolation ? h / j : 1
  };
  return a
 }();
 me.video = function() {
  var a = {},
      c = null,
      b = null,
      g = null,
      d = null,
      e = null,
      f = !1,
      h = 0,
      j = 0;
  a.init = function(k, m, l, i, n) {
   f = i || !1;
   me.sys.scale = !0 === f ? n || 1 : 1;
   h = m * me.sys.scale;
   j = l * me.sys.scale;
   c = document.createElement("canvas");
   c.setAttribute("width", h + "px");
   c.setAttribute("height", j + "px");
   c.setAttribute("border", "0px solid black");
   e = k ? document.getElementById(k) : document.body;
   e.appendChild(c);
   if (me.sys.enableWebGL && window.WebGLRenderingContext) try {
    WebGL2D.enable(c),
        b = c.getContext("webgl-2d"), me.sys.cacheImage = !0
   } catch (q) {
    b = null
   }
   if (null == b) {
    me.sys.enableWebGL = !1;
    if (!c.getContext) return !1;
    b = c.getContext("2d")
   }
   f ? (d = a.createCanvasSurface(m, l), g = d.canvas) : (d = b, g = b.canvas);
   return !0
  };
  a.getWrapper = function() {
   return e
  };
  a.getWidth = function() {
   return g.width
  };
  a.getPos = function(a) {
   for (var a = a || c, b = new me.Vector2d(a.offsetLeft, a.offsetTop); a = a.offsetParent;) b.x += a.offsetLeft, b.y += a.offsetTop;
   return b
  };
  a.getHeight = function() {
   return g.height
  };
  a.createCanvasSurface = function(a,
                                   b) {
   var c = document.createElement("canvas");
   c.width = a || g.width;
   c.height = b || g.height;
   return c.getContext("2d")
  };
  a.getScreenCanvas = function() {
   return c
  };
  a.getScreenFrameBuffer = function() {
   return d
  };
  a.updateDisplaySize = function(a) {
   if (f) me.sys.scale = a ? a : document.getElementById("screen size").value, h = g.width * me.sys.scale, j = g.height * me.sys.scale, c.width = h, c.height = j
  };
  a.clearSurface = function(a, b) {
   a.fillStyle = b;
   a.fillRect(0, 0, a.canvas.width, a.canvas.height)
  };
  a.scale = function(a, b) {
   a.translate(-(a.canvas.width *
   b - a.canvas.width >> 1), -(a.canvas.height * b - a.canvas.height >> 1));
   a.scale(b, b)
  };
  a.setAlpha = function(a, b) {
   a.globalCompositeOperation = b ? "source-over" : "copy"
  };
  a.blitSurface = function() {
   a.blitSurface = f ? function() {
    b.drawImage(g, 0, 0, g.width, g.height, 0, 0, h, j)
   } : function() {};
   a.blitSurface()
  };
  a.applyRGBFilter = function(b, c, d) {
   var e = a.createCanvasSurface(b.width, b.height),
       b = me.utils.getPixels(b),
       f = b.data;
   switch (c) {
    case "b&w":
     for (var c = 0, h = f.length; c < h; c += 4) d = 3 * f[c] + 4 * f[c + 1] + f[c + 2] >>> 3, f[c] = d, f[c + 1] = d, f[c + 2] = d;
     break;
    case "brightness":
     d = Math.abs(d).clamp(0, 1);
     c = 0;
     for (h = f.length; c < h; c += 4) f[c] *= d, f[c + 1] *= d, f[c + 2] *= d;
     break;
    case "transparent":
     c = 0;
     for (h = f.length; c < h; c += 4) me.utils.RGBToHex(f[c], f[c + 1], f[c + 2]) === d && (f[c + 3] = 0);
     break;
    default:
     return null
   }
   e.putImageData(b, 0, 0);
   return e
  };
  return a
 }()
})(window);
(function(a) {
 me.input = function() {
  function c() {
   if (!x) i.touches.push({
    x: 0,
    y: 0
   }), i.mouse.pos = new me.Vector2d(0, 0), i.mouse.offset = me.video.getPos(), me.sys.touch ? (me.video.getScreenCanvas().addEventListener("touchmove", j, !1), me.video.getScreenCanvas().addEventListener("touchstart", m, !1), me.video.getScreenCanvas().addEventListener("touchend", m, !1)) : (a.addEventListener("mousewheel", h, !1), me.video.getScreenCanvas().addEventListener("mousemove", j, !1), me.video.getScreenCanvas().addEventListener("mousedown",
       k, !1), me.video.getScreenCanvas().addEventListener("mouseup", k, !1)), x = !0
  }

  function b(a) {
   a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0;
   a.preventDefault ? a.preventDefault() : a.returnValue = !1
  }

  function g(a, c) {
   var d = n[c || a.keyCode || a.which];
   return d ? (r[d] || (q[d] = !0, r[d] = s[d]), b(a), !1) : !0
  }

  function d(a, c) {
   var d = n[c || a.keyCode || a.which];
   return d ? (q[d] = !1, r[d] = !1, b(a), !1) : !0
  }

  function e(a) {
   var b = i.mouse.handlers[a.type];
   if (b)
    for (var c = 0, d = i.touches.length; c < d; c++)
     for (var e = b.length, f;
          (e--, f = b[e]) && !((null ===
          f.rect || f.rect.containsPoint({
           x: i.touches[c].x,
           y: i.touches[c].y
          })) && !1 === f.cb(a)););
  }

  function f(a) {
   i.touches.length = 0;
   if (a.touches)
    for (var b = 0, c = a.changedTouches.length; b < c; b++) {
     var d = a.changedTouches[b],
         e = d.clientX - i.mouse.offset.x,
         f = d.clientY - i.mouse.offset.y;
     1 != me.sys.scale && (e /= me.sys.scale, f /= me.sys.scale);
     i.touches.push({
      x: e,
      y: f,
      id: d.identifier
     })
    } else {
    var e = a.pageX - i.mouse.offset.x,
        f = a.pageY - i.mouse.offset.y;
    1 != me.sys.scale && (e /= me.sys.scale, f /= me.sys.scale);
    i.touches.push({
     x: e,
     y: f,
     id: 0
    })
   }
   i.mouse.pos.set(i.touches[0].x,
       i.touches[0].y)
  }

  function h(a) {
   e(a);
   b(a)
  }

  function j(a) {
   f(a);
   e(a);
   b(a)
  }

  function k(a) {
   var c = i.mouse.bind[a.button || 0];
   e(a);
   c ? "mousedown" === a.type || "touchstart" === a.type ? g(a, c) : d(a, c) : b(a)
  }

  function m(a) {
   f(a);
   k(a)
  }

  function l(a) {
   i.accel = a.accelerationIncludingGravity
  }
  var i = {},
      n = [],
      q = [],
      s = [],
      r = [],
      w = !1,
      x = !1,
      t = !1;
  i.accel = {
   x: 0,
   y: 0,
   z: 0
  };
  i.mouse = {
   pos: null,
   offset: null,
   LEFT: 0,
   MIDDLE: 1,
   RIGHT: 2,
   bind: [3],
   handlers: {}
  };
  i.touches = [];
  i.KEY = {
   LEFT: 37,
   UP: 38,
   RIGHT: 39,
   DOWN: 40,
   ENTER: 13,
   SHIFT: 16,
   CTRL: 17,
   ALT: 18,
   PAUSE: 19,
   ESC: 27,
   SPACE: 32,
   NUM0: 48,
   NUM1: 49,
   NUM2: 50,
   NUM3: 51,
   NUM4: 52,
   NUM5: 53,
   NUM6: 54,
   NUM7: 55,
   NUM8: 56,
   NUM9: 57,
   A: 65,
   B: 66,
   C: 67,
   D: 68,
   E: 69,
   F: 70,
   G: 71,
   H: 72,
   I: 73,
   J: 74,
   K: 75,
   L: 76,
   M: 77,
   N: 78,
   O: 79,
   P: 80,
   Q: 81,
   R: 82,
   S: 83,
   T: 84,
   U: 85,
   V: 86,
   W: 87,
   X: 88,
   Y: 89,
   Z: 90
  };
  i.isKeyPressed = function(a) {
   return q[a] ? (s[a] && (r[a] = !0, q[a] = !1), !0) : !1
  };
  i.keyStatus = function(a) {
   return !0 === r[a] ? !0 : q[a]
  };
  i.triggerKeyEvent = function(a, b) {
   b ? g({}, a) : d({}, a)
  };
  i.bindKey = function(b, c, e) {
   w || (a.addEventListener("keydown", g, !1), a.addEventListener("keyup", d, !1), w = !0);
   n[b] =
       c;
   s[c] = e ? e : !1;
   r[c] = !1
  };
  i.unbindKey = function(a) {
   q[n[a]] = !1;
   s[n[a]] = !1;
   n[a] = null
  };
  i.bindMouse = function(a, b) {
   c();
   if (!n[b]) throw "melonJS : no action defined for keycode " + b;
   i.mouse.bind[a] = b
  };
  i.unbindMouse = function(a) {
   i.mouse.bind[a] = null
  };
  i.bindTouch = function() {
   object.bindMouse(me.input.mouse.LEFT, keycode)
  };
  i.unbindTouch = function() {
   i.unbindMouse(me.input.mouse.LEFT)
  };
  i.registerMouseEvent = function(a, b, d) {
   c();
   switch (a) {
    case "mousewheel":
    case "mousemove":
    case "mousedown":
    case "mouseup":
    case "touchmove":
    case "touchstart":
    case "touchend":
     me.sys.touch &&
     ("mousemove" == a ? a = "touchmove" : "mousedown" == a ? a = "touchstart" : "mouseup" == a && (a = "touchend"));
     i.mouse.handlers[a] || (i.mouse.handlers[a] = []);
     i.mouse.handlers[a].push({
      rect: b || null,
      cb: d
     });
     break;
    default:
     throw "melonJS : invalid event type : " + a;
   }
  };
  i.releaseMouseEvent = function(a, b) {
   switch (a) {
    case "mousewheel":
    case "mousemove":
    case "mousedown":
    case "mouseup":
    case "touchmove":
    case "touchstart":
    case "touchend":
     me.sys.touch && ("mousemove" == a ? a = "touchmove" : "mousedown" == a ? a = "touchstart" : "mouseup" == a && (a = "touchend"));
     var c = i.mouse.handlers[a];
     if (c)
      for (var d = c.length, e; d--, e = c[d];)
       if (e.rect === b) e.rect = e.cb = null, i.mouse.handlers[a].splice(d, 1);
     break;
    default:
     throw "melonJS : invalid event type : " + a;
   }
  };
  i.watchAccelerometer = function() {
   return a.sys.gyro ? (t || (a.addEventListener("devicemotion", l, !1), t = !0), !0) : !1
  };
  i.unwatchAccelerometer = function() {
   t && (a.removeEventListener("devicemotion", l, !1), t = !1)
  };
  return i
 }()
})(window);
(function(a) {
 var c = function() {
  return {
   decode: function(b) {
    b = b.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    if (me.sys.nativeBase64) return a.atob(b);
    for (var c = [], d, e, f, h, j, k = 0; k < b.length;) d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(b.charAt(k++)), e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(b.charAt(k++)), h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(b.charAt(k++)), j = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(b.charAt(k++)),
        d = d << 2 | e >> 4, e = (e & 15) << 4 | h >> 2, f = (h & 3) << 6 | j, c.push(String.fromCharCode(d)), 64 != h && c.push(String.fromCharCode(e)), 64 != j && c.push(String.fromCharCode(f));
    return c = c.join("")
   }
  }
 }();
 me.utils = function() {
  var a = {},
      g = {},
      d = "",
      e = 0;
  a.decodeBase64 = function(a) {
   return c.decode(a)
  };
  a.decodeBase64AsArray = function(a, b) {
   var b = b || 1,
       d = c.decode(a),
       e = [],
       g, l, i;
   for (g = 0, i = d.length / b; g < i; g++) {
    e[g] = 0;
    for (l = b - 1; 0 <= l; --l) e[g] += d.charCodeAt(g * b + l) << (l << 3)
   }
   return e
  };
  a.decodeCSV = function(a, b) {
   for (var a = a.trim().split("\n"), c = [], d = 0; d <
   a.length; d++) {
    entries = a[d].split(",", b);
    for (var e = 0; e < entries.length; e++) c.push(+entries[e])
   }
   return c
  };
  a.setNocache = function(a) {
   me.nocache = a ? "?" + parseInt(1E7 * Math.random()) : ""
  };
  a.HexToRGB = function(a, b) {
   a = "#" == a.charAt(0) ? a.substring(1, 7) : a;
   null == g[a] && (g[a] = parseInt(a.substring(0, 2), 16) + "," + parseInt(a.substring(2, 4), 16) + "," + parseInt(a.substring(4, 6), 16));
   return (b ? "rgba(" : "rgb(") + g[a] + (b ? "," + b + ")" : ")")
  };
  a.RGBToHex = function(a, b, c) {
   return a.toHex() + b.toHex() + c.toHex()
  };
  a.getPixels = function(a) {
   if (a instanceof HTMLImageElement) {
    var b = me.video.createCanvasSurface(a.width, a.height);
    b.drawImage(a, 0, 0);
    return b.getImageData(0, 0, a.width, a.height)
   }
   return a.getContext("2d").getImageData(0, 0, a.width, a.height)
  };
  a.resetGUID = function(a) {
   d = a.toString().toUpperCase().toHex();
   e = 0
  };
  a.createGUID = function() {
   return d + "-" + e++
  };
  a.applyFriction = function(a, b) {
   return 0 > a + b ? a + b * me.timer.tick : 0 < a - b ? a - b * me.timer.tick : 0
  };
  return a
 }()
})(window);
(function(a, c) {
 function b(a) {
  this.defaultvalue = a || 0;
  this.value = a || 0;
  this.updated = !0
 }
 b.prototype.reset = function() {
  this.set(this.defaultvalue)
 };
 b.prototype.update = function(a) {
  return this.set(this.value + a)
 };
 b.prototype.set = function(a) {
  this.value = a;
  return this.updated = !0
 };
 me.gamestat = function() {
  var a = {},
      d = {},
      e = [],
      f = 0;
  a.add = function(a, c) {
   d[a] = new b(c);
   e.push(d[a]);
   f++
  };
  a.updateValue = function(a, b) {
   d[a] && d[a].update(b)
  };
  a.setValue = function(a, b) {
   d[a] && d[a].set(b)
  };
  a.getItemValue = function(a) {
   return d[a] ? d[a].value :
       0
  };
  a.reset = function(b) {
   b != c ? d[b] && d[b].reset() : a.resetAll()
  };
  a.resetAll = function() {
   for (var a = f, b; a--, b = e[a];) b.reset()
  };
  return a
 }()
})(window);
(function(a, c) {
 var b = /^.*(\\|\/|\:)/,
     g = /\.[^\.]*$/;
 me.LevelConstants = {
  COLLISION_MAP: "collision",
  PARALLAX_MAP: "parallax"
 };
 me.Tile = me.Rect.extend({
  tileId: null,
  init: function(a, b, c, h, g) {
   this.parent(new me.Vector2d(a * c, b * h), c, h);
   this.tileId = g;
   this.row = a;
   this.col = b
  }
 });
 me.Tileset = Object.extend({
  init: function(a, c, f, h, j, k) {
   this.name = a;
   this.tilewidth = c;
   this.tileheight = f;
   this.spacing = h;
   this.margin = j;
   (this.image = k ? me.loader.getImage(k.replace(b, "").replace(g, "")) : null) || console.log("melonJS: '" + k + "' file for tileset '" +
       this.name + "' not found!");
   this.type = {
    SOLID: "solid",
    PLATFORM: "platform",
    L_SLOPE: "lslope",
    R_SLOPE: "rslope",
    LADDER: "ladder",
    BREAKABLE: "breakable"
   };
   this.TileProperties = [];
   this.tileXOffset = [];
   this.tileYOffset = [];
   if (this.image) this.hTileCount = ~~((this.image.width - this.margin) / (this.tilewidth + this.spacing)), this.vTileCount = ~~((this.image.height - this.margin) / (this.tileheight + this.spacing))
  },
  getPropertyList: function() {
   return {
    isCollidable: !1,
    isSolid: !1,
    isPlatform: !1,
    isSlope: !1,
    isLeftSlope: !1,
    isRightSlope: !1,
    isLadder: !1,
    isBreakable: !1
   }
  },
  getTileProperties: function(a) {
   return this.TileProperties[a]
  },
  isTileCollidable: function(a) {
   return this.TileProperties[a].isCollidable
  },
  getTileImage: function(a) {
   var b = me.video.createCanvasSurface(this.tilewidth, this.tileheight);
   this.drawTile(b, 0, 0, a);
   return b.canvas
  },
  getTileOffsetX: function(a) {
   null == this.tileXOffset[a] && (this.tileXOffset[a] = this.margin + (this.spacing + this.tilewidth) * (a % this.hTileCount));
   return this.tileXOffset[a]
  },
  getTileOffsetY: function(a) {
   null == this.tileYOffset[a] &&
   (this.tileYOffset[a] = this.margin + (this.spacing + this.tileheight) * ~~(a / this.hTileCount));
   return this.tileYOffset[a]
  },
  drawTile: function(a, b, c, h, g, k, m) {
   if (g || k || m) {
    var l = 1,
        i = 0,
        n = 0,
        q = 1,
        s = b,
        r = c,
        b = c = 0;
    m && (l = 0, n = i = 1, q = 0, r += this.tileheight - this.tilewidth);
    g && (l = -l, n = -n, s += m ? this.tileheight : this.tilewidth);
    k && (i = -i, q = -q, r += m ? this.tilewidth : this.tileheight);
    a.setTransform(l, i, n, q, s, r)
   }
   a.drawImage(this.image, this.getTileOffsetX(h), this.getTileOffsetY(h), this.tilewidth, this.tileheight, b, c, this.tilewidth, this.tileheight);
   (g || k || m) && a.setTransform(1, 0, 0, 1, 0, 0)
  }
 });
 CollisionTiledLayer = Object.extend({
  init: function(a, b) {
   this.realwidth = a;
   this.realheight = b;
   this.isCollisionMap = !0
  },
  checkCollision: function(a, b) {
   var c = 0 > b.x ? a.left + b.x : a.right + b.x,
       h = 0 > b.y ? a.top + b.y : a.bottom + b.y,
       g = {
        x: 0,
        y: 0,
        xprop: {},
        yprop: {}
       };
   if (0 >= c || c >= this.realwidth) g.x = b.x;
   if (0 >= h || h >= this.realheight) g.y = b.y;
   return g
  }
 });
 me.TiledLayer = Object.extend({
  init: function(a, b, c, h, g, k) {
   this.width = a;
   this.height = b;
   this.tilewidth = c;
   this.tileheight = h;
   this.realwidth = this.width *
       this.tilewidth;
   this.realheight = this.height * this.tileheight;
   this.z = k;
   this.name = null;
   this.visible = !1;
   this.layerData = null;
   this.xLUT = {};
   this.yLUT = {};
   this.tileset = (this.tilesets = g) ? this.tilesets.getTilesetByIndex(0) : null
  },
  initArray: function(a) {
   this.layerData = [];
   for (var b = 0; b < this.width + 1; b++) {
    this.layerData[b] = [];
    for (var c = 0; c < this.height + 1; c++) this.layerData[b][c] = null
   }
   if (a) {
    for (b = 0; b < this.width * this.tilewidth; b++) this.xLUT[b] = ~~(b / this.tilewidth);
    for (c = 0; c < this.height * this.tileheight; c++) this.yLUT[c] = ~~(c / this.tileheight)
   }
  },
  getTileId: function(a, b) {
   var c = this.layerData[this.xLUT[a]][this.yLUT[b]];
   return c ? c.tileId : null
  },
  getTile: function(a, b) {
   return this.layerData[this.xLUT[a]][this.yLUT[b]]
  },
  setTile: function(a, b, c) {
   this.layerData[a][b] = new me.Tile(a, b, this.tilewidth, this.tileheight, c)
  },
  clearTile: function(a, b) {
   this.layerData[a][b] = null
  },
  checkCollision: function(a, b) {
   var f = 0 > b.x ? ~~(a.left + b.x) : Math.ceil(a.right - 1 + b.x),
       h = 0 > b.y ? ~~(a.top + b.y) : Math.ceil(a.bottom - 1 + b.y),
       g = {
        x: 0,
        xtile: c,
        xprop: {},
        y: 0,
        ytile: c,
        yprop: {}
       };
   if (0 >= f || f >= this.realwidth) g.x = b.x;
   else if (0 != b.x)
    if (g.xtile = this.getTile(f, Math.ceil(a.bottom - 1)), g.xtile && this.tileset.isTileCollidable(g.xtile.tileId)) g.x = b.x, g.xprop = this.tileset.getTileProperties(g.xtile.tileId);
    else if (g.xtile = this.getTile(f, ~~a.top), g.xtile && this.tileset.isTileCollidable(g.xtile.tileId)) g.x = b.x, g.xprop = this.tileset.getTileProperties(g.xtile.tileId);
   if (0 != b.y)
    if (g.ytile = this.getTile(0 > b.x ? ~~a.left : Math.ceil(a.right - 1), h), g.ytile && this.tileset.isTileCollidable(g.ytile.tileId)) g.y =
        b.y || 1, g.yprop = this.tileset.getTileProperties(g.ytile.tileId);
    else if (g.ytile = this.getTile(0 > b.x ? Math.ceil(a.right - 1) : ~~a.left, h), g.ytile && this.tileset.isTileCollidable(g.ytile.tileId)) g.y = b.y || 1, g.yprop = this.tileset.getTileProperties(g.ytile.tileId);
   return g
  },
  update: function() {
   return !1
  }
 });
 me.TileMap = Object.extend({
  init: function(a, b) {
   this.pos = new me.Vector2d(a, b);
   this.z = 0;
   this.name = null;
   this.height = this.width = 0;
   this.realheight = this.realwidth = -1;
   this.tileheight = this.tilewidth = 0;
   this.tilesets = null;
   this.mapLayers = [];
   this.objectGroups = [];
   this.initialized = !1
  },
  reset: function() {
   this.tilesets = null;
   this.mapLayers.length = 0;
   this.objectGroups.length = 0;
   this.initialized = !1
  },
  getObjectGroupByName: function(a) {
   return this.objectGroups[a]
  },
  getObjectGroups: function() {
   return this.objectGroups
  },
  getLayerByName: function(a) {
   for (var b = null, a = a.trim().toLowerCase(), c = this.mapLayers.length; c--;)
    if (this.mapLayers[c].name.toLowerCase().contains(a)) {
     b = this.mapLayers[c];
     break
    }
   a.toLowerCase().contains(me.LevelConstants.COLLISION_MAP) &&
   null == b && (b = new CollisionTiledLayer(me.game.currentLevel.realwidth, me.game.currentLevel.realheight));
   return b
  },
  clearTile: function(a, b) {
   for (var c = this.mapLayers.length; c--;)(this.mapLayers[c].visible || this.mapLayers[c].isCollisionMap) && this.mapLayers[c].clearTile(a, b)
  },
  addTo: function(a) {
   this.visible && a.add(this);
   for (var b = this.mapLayers.length; b--;) this.mapLayers[b].visible && a.add(this.mapLayers[b])
  },
  update: function() {
   return !1
  }
 });
 me.levelDirector = function() {
  var a = {},
      b = {},
      f = [],
      g = 0;
  a.reset = function() {};
  a.addLevel = function() {
   throw "melonJS: no level loader defined";
  };
  a.addTMXLevel = function(a, c) {
   if (null == b[a]) b[a] = new me.TMXTileMap(a, 0, 0), b[a].name = a, f[f.length] = a;
   c && c()
  };
  a.loadLevel = function(a) {
   a = a.toString().toLowerCase();
   if (b[a] === c) throw "melonJS: level " + a + " not found";
   if (b[a] instanceof me.TMXTileMap) {
    var d = me.state.isRunning();
    d && me.state.pause();
    me.game.reset();
    me.utils.resetGUID(a);
    b[g] && b[g].reset();
    b[a].load();
    g = f.indexOf(a);
    me.game.loadTMXLevel(b[a]);
    d && me.state.resume()
   } else throw "melonJS: no level loader defined";
   return !0
  };
  a.getCurrentLevelId = function() {
   return f[g]
  };
  a.reloadLevel = function() {
   return a.loadLevel(a.getCurrentLevelId())
  };
  a.nextLevel = function() {
   return g + 1 < f.length ? a.loadLevel(f[g + 1]) : !1
  };
  a.previousLevel = function() {
   return 0 <= g - 1 ? a.loadLevel(f[g - 1]) : !1
  };
  return a
 }()
})(window);
(function() {
 me.TMX_TAG_MAP = "map";
 me.TMX_TAG_NAME = "name";
 me.TMX_TAG_VALUE = "value";
 me.TMX_TAG_VERSION = "version";
 me.TMX_TAG_ORIENTATION = "orientation";
 me.TMX_TAG_WIDTH = "width";
 me.TMX_TAG_HEIGHT = "height";
 me.TMX_TAG_OPACITY = "opacity";
 me.TMX_TAG_TRANS = "trans";
 me.TMX_TAG_TILEWIDTH = "tilewidth";
 me.TMX_TAG_TILEHEIGHT = "tileheight";
 me.TMX_TAG_TILEOFFSET = "tileoffset";
 me.TMX_TAG_FIRSTGID = "firstgid";
 me.TMX_TAG_GID = "gid";
 me.TMX_TAG_TILE = "tile";
 me.TMX_TAG_ID = "id";
 me.TMX_TAG_DATA = "data";
 me.TMX_TAG_COMPRESSION = "compression";
 me.TMX_TAG_ENCODING = "encoding";
 me.TMX_TAG_ATTR_BASE64 = "base64";
 me.TMX_TAG_CSV = "csv";
 me.TMX_TAG_SPACING = "spacing";
 me.TMX_TAG_MARGIN = "margin";
 me.TMX_TAG_PROPERTIES = "properties";
 me.TMX_TAG_PROPERTY = "property";
 me.TMX_TAG_IMAGE = "image";
 me.TMX_TAG_SOURCE = "source";
 me.TMX_TAG_VISIBLE = "visible";
 me.TMX_TAG_TILESET = "tileset";
 me.TMX_TAG_LAYER = "layer";
 me.TMX_TAG_OBJECTGROUP = "objectgroup";
 me.TMX_TAG_OBJECT = "object";
 me.TMX_TAG_X = "x";
 me.TMX_TAG_Y = "y";
 me.TMX_TAG_WIDTH = "width";
 me.TMX_TAG_HEIGHT = "height"
})(window);
(function() {
 me.TMXUtils = function() {
  return {
   setTMXProperties: function(a, c) {
    var b = c.getElementsByTagName(me.TMX_TAG_PROPERTIES)[0];
    if (b)
     for (var b = b.getElementsByTagName(me.TMX_TAG_PROPERTY), g = 0; g < b.length; g++) {
      var d = me.XMLParser.getStringAttribute(b[g], me.TMX_TAG_NAME),
          e = me.XMLParser.getStringAttribute(b[g], me.TMX_TAG_VALUE);
      !e || e.isBoolean() ? e = e ? "true" == e : !0 : e.isNumeric() && (e = parseInt(e));
      a[d] = e
     }
   }
  }
 }()
})(window);
(function() {
 me.TMXOBjectGroup = Object.extend({
  init: function(a, c, b, g) {
   this.objects = [];
   this.name = a;
   this.width = me.XMLParser.getIntAttribute(c, me.TMX_TAG_WIDTH);
   this.height = me.XMLParser.getIntAttribute(c, me.TMX_TAG_HEIGHT);
   this.z = g;
   a = c.getElementsByTagName(me.TMX_TAG_OBJECT);
   for (c = 0; c < a.length; c++) this.objects.push(new TMXOBject(a[c], b, g))
  },
  getObjectCount: function() {
   return this.objects.length
  },
  getObjectByIndex: function(a) {
   return this.objects[a]
  }
 });
 TMXOBject = Object.extend({
  init: function(a, c, b) {
   this.name =
       me.XMLParser.getStringAttribute(a, me.TMX_TAG_NAME);
   this.x = me.XMLParser.getIntAttribute(a, me.TMX_TAG_X);
   this.y = me.XMLParser.getIntAttribute(a, me.TMX_TAG_Y);
   this.z = b;
   (this.gid = me.XMLParser.getIntAttribute(a, me.TMX_TAG_GID, null)) ? (c = c.getTilesetByGid(this.gid), this.width = c.tilewidth, this.height = c.tileheight, this.spritewidth = this.width, this.y -= this.height, this.image = c.getTileImage(this.gid - c.firstgid)) : (this.width = me.XMLParser.getIntAttribute(a, me.TMX_TAG_WIDTH, 0), this.height = me.XMLParser.getIntAttribute(a,
       me.TMX_TAG_HEIGHT, 0));
   me.TMXUtils.setTMXProperties(this, a)
  },
  getObjectPropertyByName: function(a) {
   return this[a]
  }
 })
})(window);
(function() {
 me.TMXTilesetGroup = Object.extend({
  init: function() {
   this.tilesets = []
  },
  add: function(a) {
   this.tilesets.push(a)
  },
  getTilesetByIndex: function(a) {
   return this.tilesets[a]
  },
  getTilesetByGid: function(a) {
   for (var c = -1, b = 0, g = this.tilesets.length; b < g; b++) {
    if (this.tilesets[b].contains(a)) return this.tilesets[b];
    this.tilesets[b].firstgid == this.tilesets[b].lastgid && a >= this.tilesets[b].firstgid && (c = b)
   }
   if (-1 != c) return this.tilesets[c];
   throw "no matching tileset found for gid " + a;
  }
 });
 me.TMXTileset = me.Tileset.extend({
  init: function(a) {
   this.firstgid =
       me.XMLParser.getIntAttribute(a, me.TMX_TAG_FIRSTGID);
   this.parent(me.XMLParser.getStringAttribute(a, me.TMX_TAG_NAME), me.XMLParser.getIntAttribute(a, me.TMX_TAG_TILEWIDTH), me.XMLParser.getIntAttribute(a, me.TMX_TAG_TILEHEIGHT), me.XMLParser.getIntAttribute(a, me.TMX_TAG_SPACING, 0), me.XMLParser.getIntAttribute(a, me.TMX_TAG_MARGIN, 0), a.getElementsByTagName(me.TMX_TAG_IMAGE)[0].getAttribute(me.TMX_TAG_SOURCE));
   this.lastgid = this.firstgid + (this.hTileCount * this.vTileCount - 1 || 0);
   this.trans = a.getElementsByTagName(me.TMX_TAG_IMAGE)[0].getAttribute(me.TMX_TAG_TRANS);
   if (null !== this.trans && this.image) this.image = me.video.applyRGBFilter(this.image, "transparent", this.trans.toUpperCase()).canvas;
   this.tileoffset = new me.Vector2d(0, 0);
   var c = a.getElementsByTagName(me.TMX_TAG_TILEOFFSET);
   if (0 < c.length) this.tileoffset.x = me.XMLParser.getIntAttribute(c[0], me.TMX_TAG_X), this.tileoffset.y = me.XMLParser.getIntAttribute(c[0], me.TMX_TAG_Y);
   a = a.getElementsByTagName(me.TMX_TAG_TILE);
   for (c = 0; c < a.length; c++) {
    var b = me.XMLParser.getIntAttribute(a[c], me.TMX_TAG_ID) + this.firstgid;
    this.TileProperties[b] = {};
    b = this.TileProperties[b];
    me.TMXUtils.setTMXProperties(b, a[c]);
    b.isSolid = b.type ? b.type.toLowerCase() === this.type.SOLID : !1;
    b.isPlatform = b.type ? b.type.toLowerCase() === this.type.PLATFORM : !1;
    b.isLeftSlope = b.type ? b.type.toLowerCase() === this.type.L_SLOPE : !1;
    b.isRightSlope = b.type ? b.type.toLowerCase() === this.type.R_SLOPE : !1;
    b.isBreakable = b.type ? b.type.toLowerCase() === this.type.BREAKABLE : !1;
    b.isLadder = b.type ? b.type.toLowerCase() === this.type.LADDER : !1;
    b.isSlope = b.isLeftSlope || b.isRightSlope;
    b.isCollidable =
        b.isSolid || b.isPlatform || b.isSlope || b.isLadder || b.isBreakable
   }
  },
  contains: function(a) {
   return a >= this.firstgid && a <= this.lastgid
  }
 })
})(window);
(function() {
 TMXRenderer = Object.extend({
  init: function(a, c, b, g, d) {
   this.predraw = a;
   this.width = c;
   this.height = b;
   this.tilewidth = g;
   this.tileheight = d
  },
  drawTile: function() {}
 });
 me.TMXOrthogonalRenderer = TMXRenderer.extend({
  drawTile: function(a, c, b, g, d, e, f, h) {
   d.drawTile(a, d.tileoffset.x + c * this.tilewidth, d.tileoffset.y + (b + 1) * this.tileheight - d.tileheight, g - d.firstgid, e, f, h)
  }
 });
 me.TMXIsometricRenderer = TMXRenderer.extend({
  drawTile: function(a, c, b, g, d, e, f, h) {
   d.drawTile(a, (this.width - 1) * d.tilewidth + (c - b) * d.tilewidth >>
       1, -d.tilewidth + (c + b) * d.tileheight >> 2, g - d.firstgid, e, f, h)
  }
 })
})(window);
(function() {
 me.TMXTileMap = me.TileMap.extend({
  init: function(a, c, b) {
   this.parent(c, b);
   this.xmlMap = me.loader.getXML(a);
   if (!this.xmlMap) throw "melonJS:" + a + " TMX map not found";
   this.orientation = this.version = "";
   this.tilesets = null
  },
  reset: function() {
   this.background_image = null;
   for (var a = this.mapLayers.length; a--;) this.mapLayers[a].layerSurface = null, this.mapLayers[a].layerCanvas = null, this.mapLayers[a].layerData = null, this.mapLayers[a].xLUT = this.yLUT = null, this.mapLayers[a].tilesets = this.tileset = null, this.mapLayers[a].objectGroups =
       null, this.mapLayers[a] = null;
   this.initialized = !1;
   this.parent()
  },
  load: function() {
   if (!this.initialized) {
    var a = 0,
        c = 1;
    me.XMLParser.parseFromString(this.xmlMap);
    for (var b = me.XMLParser.getAllTagElements(), g = 0; g < b.length; g++) switch (b.item(g).nodeName) {
     case me.TMX_TAG_MAP:
      var d = b.item(g);
      this.version = me.XMLParser.getStringAttribute(d, me.TMX_TAG_VERSION);
      this.orientation = me.XMLParser.getStringAttribute(d, me.TMX_TAG_ORIENTATION);
      this.width = me.XMLParser.getIntAttribute(d, me.TMX_TAG_WIDTH);
      this.height = me.XMLParser.getIntAttribute(d,
          me.TMX_TAG_HEIGHT);
      this.tilewidth = me.XMLParser.getIntAttribute(d, me.TMX_TAG_TILEWIDTH);
      this.tileheight = me.XMLParser.getIntAttribute(d, me.TMX_TAG_TILEHEIGHT);
      this.realwidth = this.width * this.tilewidth;
      this.realheight = this.height * this.tileheight;
      this.z = a++;
      me.TMXUtils.setTMXProperties(this, d);
      this.visible = !1;
      if (this.background_color) this.visible = !0, this.background_color = me.utils.HexToRGB(this.background_color);
      if (this.background_image) this.visible = !0, this.background_image = me.loader.getImage(this.background_image);
      break;
     case me.TMX_TAG_TILESET:
      if (!this.tilesets) this.tilesets = new me.TMXTilesetGroup;
      this.tilesets.add(new me.TMXTileset(b.item(g)));
      break;
     case me.TMX_TAG_LAYER:
      if (me.XMLParser.getStringAttribute(b.item(g), me.TMX_TAG_NAME).toLowerCase().contains(me.LevelConstants.PARALLAX_MAP)) {
       if (1 == me.XMLParser.getIntAttribute(b.item(g), me.TMX_TAG_VISIBLE, 1)) {
        d = {};
        me.TMXUtils.setTMXProperties(d, b.item(g));
        var e = this.getLayerByName(me.LevelConstants.PARALLAX_MAP);
        e || (e = new me.ParallaxBackgroundEntity(a), this.mapLayers.push(e));
        e.addLayer(d.imagesrc, c++, a++)
       }
      } else this.mapLayers.push(new me.TMXLayer(b.item(g), this.tilewidth, this.tileheight, this.orientation, this.tilesets, a++)), a++;
      break;
     case me.TMX_TAG_OBJECTGROUP:
      d = me.XMLParser.getStringAttribute(b.item(g), me.TMX_TAG_NAME), this.objectGroups.push(new me.TMXOBjectGroup(d, b.item(g), this.tilesets, a++))
    }
    me.XMLParser.free();
    this.initialized = !0
   }
  },
  draw: function(a, c) {
   if (this.background_color) a.fillStyle = this.background_color, a.fillRect(c.left, c.top, c.width, c.height);
   this.background_image &&
   a.drawImage(this.background_image, c.left, c.top, c.width, c.height, c.left, c.top, c.width, c.height)
  }
 });
 me.TMXLayer = me.TiledLayer.extend({
  init: function(a, c, b, g, d, e) {
   this.parent(me.XMLParser.getIntAttribute(a, me.TMX_TAG_WIDTH), me.XMLParser.getIntAttribute(a, me.TMX_TAG_HEIGHT), c, b, d, e);
   this.orientation = g;
   this.layerInvalidated = !0;
   this.name = me.XMLParser.getStringAttribute(a, me.TMX_TAG_NAME);
   this.visible = 1 == me.XMLParser.getIntAttribute(a, me.TMX_TAG_VISIBLE, 1);
   this.opacity = me.XMLParser.getFloatAttribute(a, me.TMX_TAG_OPACITY,
       1);
   me.TMXUtils.setTMXProperties(this, a);
   if (this.isCollisionMap = this.name.toLowerCase().contains(me.LevelConstants.COLLISION_MAP)) this.visible = !1;
   this.vp = me.game.viewport;
   a = a.getElementsByTagName(me.TMX_TAG_DATA)[0];
   c = me.XMLParser.getStringAttribute(a, me.TMX_TAG_ENCODING, null);
   b = me.XMLParser.getStringAttribute(a, me.TMX_TAG_COMPRESSION, null);
   "" == c && (c = null);
   "" == b && (b = null);
   if (this.visible) {
    switch (this.orientation) {
     case "orthogonal":
      this.renderer = new me.TMXOrthogonalRenderer(!0, this.width, this.height,
          this.tilewidth, this.tileheight);
      break;
     case "isometric":
      this.renderer = new me.TMXIsometricRenderer(!0, this.width, this.height, this.tilewidth, this.tileheight);
      break;
     default:
      throw "melonJS: " + this.orientation + " type TMX Tile Map not supported!";
    }
    this.layerSurface = me.video.createCanvasSurface(this.width * this.tilewidth, this.height * this.tileheight);
    this.layerCanvas = this.layerSurface.canvas;
    if (0 < this.opacity && 1 > this.opacity) this.layerSurface.globalAlpha = this.opacity
   }
   if (this.visible || this.isCollisionMap) this.initArray(this.isCollisionMap),
       this.fillArray(a, c, b)
  },
  fillArray: function(a, c, b) {
   switch (b) {
    case null:
     switch (c) {
      case null:
       a = a.getElementsByTagName(me.TMX_TAG_TILE);
       break;
      case me.TMX_TAG_CSV:
      case me.TMX_TAG_ATTR_BASE64:
       for (var b = "", g = 0, d = a.childNodes.length; g < d; g++) b += a.childNodes[g].nodeValue;
       a = c == me.TMX_TAG_ATTR_BASE64 ? me.utils.decodeBase64AsArray(b, 4) : me.utils.decodeCSV(b, this.width);
       break;
      default:
       throw "melonJS: TMX Tile Map " + c + " encoding not supported!";
     }
     break;
    default:
     throw "melonJS: " + b + " compressed TMX Tile Map not supported!";
   }
   for (var b = 0, e, f, h = 0; h < this.height; h++)
    for (var j = 0; j < this.width; j++)
     if (f = null == c ? me.XMLParser.getIntAttribute(a[b++], me.TMX_TAG_GID) : a[b++], g = f & 2147483648, d = f & 1073741824, e = f & 536870912, f &= 536870911, 0 < f) {
      this.setTile(j, h, f);
      if (!this.tileset.contains(f)) this.tileset = this.tilesets.getTilesetByGid(f);
      this.visible && this.renderer.drawTile(this.layerSurface, j, h, f, this.tileset, g, d, e)
     }
  },
  clearTile: function(a, c) {
   this.parent(a, c);
   this.visible && this.layerSurface.clearRect(a * this.tilewidth, c * this.tileheight, this.tilewidth,
       this.tileheight)
  },
  draw: function(a, c) {
   a.drawImage(this.layerCanvas, this.vp.pos.x + c.pos.x, this.vp.pos.y + c.pos.y, c.width, c.height, c.pos.x, c.pos.y, c.width, c.height)
  }
 })
})(window);
(function() {
 me.Tween = function(a) {
  var c = {},
      b = {},
      g = {},
      d = 1E3,
      e = 0,
      f = null,
      h = me.Tween.Easing.Linear.EaseNone,
      j = null,
      k = null,
      m = null;
  this.to = function(b, c) {
   null !== c && (d = c);
   for (var e in b) null !== a[e] && (g[e] = b[e]);
   return this
  };
  this.start = function() {
   me.game.add(this, 999);
   f = me.timer.getTime() + e;
   for (var d in g) null !== a[d] && (c[d] = a[d], b[d] = g[d] - a[d]);
   return this
  };
  this.stop = function() {
   me.game.remove(this);
   return this
  };
  this.delay = function(a) {
   e = a;
   return this
  };
  this.easing = function(a) {
   h = a;
   return this
  };
  this.chain = function(a) {
   j =
       a;
   return this
  };
  this.onUpdate = function(a) {
   k = a;
   return this
  };
  this.onComplete = function(a) {
   m = a;
   return this
  };
  this.update = function() {
   var e, g, n;
   g = me.timer.getTime();
   if (g < f) return !0;
   if (1 <= (g = (g - f) / d)) g = 1;
   n = h(g);
   for (e in b) a[e] = c[e] + b[e] * n;
   null !== k && k.call(a, n);
   return 1 === g ? (me.game.remove(this), null !== m && m.call(a), null !== j && j.start(), !1) : !0
  };
  this.destroy = function() {
   return !0
  }
 };
 me.Tween.Easing = {
  Linear: {},
  Quadratic: {},
  Cubic: {},
  Quartic: {},
  Quintic: {},
  Sinusoidal: {},
  Exponential: {},
  Circular: {},
  Elastic: {},
  Back: {},
  Bounce: {}
 };
 me.Tween.Easing.Linear.EaseNone = function(a) {
  return a
 };
 me.Tween.Easing.Quadratic.EaseIn = function(a) {
  return a * a
 };
 me.Tween.Easing.Quadratic.EaseOut = function(a) {
  return a * (2 - a)
 };
 me.Tween.Easing.Quadratic.EaseInOut = function(a) {
  return 1 > (a *= 2) ? 0.5 * a * a : -0.5 * (--a * (a - 2) - 1)
 };
 me.Tween.Easing.Cubic.EaseIn = function(a) {
  return a * a * a
 };
 me.Tween.Easing.Cubic.EaseOut = function(a) {
  return --a * a * a + 1
 };
 me.Tween.Easing.Cubic.EaseInOut = function(a) {
  return 1 > (a *= 2) ? 0.5 * a * a * a : 0.5 * ((a -= 2) * a * a + 2)
 };
 me.Tween.Easing.Quartic.EaseIn =
     function(a) {
      return a * a * a * a
     };
 me.Tween.Easing.Quartic.EaseOut = function(a) {
  return 1 - --a * a * a * a
 };
 me.Tween.Easing.Quartic.EaseInOut = function(a) {
  return 1 > (a *= 2) ? 0.5 * a * a * a * a : -0.5 * ((a -= 2) * a * a * a - 2)
 };
 me.Tween.Easing.Quintic.EaseIn = function(a) {
  return a * a * a * a * a
 };
 me.Tween.Easing.Quintic.EaseOut = function(a) {
  return --a * a * a * a * a + 1
 };
 me.Tween.Easing.Quintic.EaseInOut = function(a) {
  return 1 > (a *= 2) ? 0.5 * a * a * a * a * a : 0.5 * ((a -= 2) * a * a * a * a + 2)
 };
 me.Tween.Easing.Sinusoidal.EaseIn = function(a) {
  return 1 - Math.cos(a * Math.PI / 2)
 };
 me.Tween.Easing.Sinusoidal.EaseOut =
     function(a) {
      return Math.sin(a * Math.PI / 2)
     };
 me.Tween.Easing.Sinusoidal.EaseInOut = function(a) {
  return 0.5 * (1 - Math.cos(Math.PI * a))
 };
 me.Tween.Easing.Exponential.EaseIn = function(a) {
  return 0 === a ? 0 : Math.pow(1024, a - 1)
 };
 me.Tween.Easing.Exponential.EaseOut = function(a) {
  return 1 === a ? 1 : 1 - Math.pow(2, -10 * a)
 };
 me.Tween.Easing.Exponential.EaseInOut = function(a) {
  return 0 === a ? 0 : 1 === a ? 1 : 1 > (a *= 2) ? 0.5 * Math.pow(1024, a - 1) : 0.5 * (-Math.pow(2, -10 * (a - 1)) + 2)
 };
 me.Tween.Easing.Circular.EaseIn = function(a) {
  return 1 - Math.sqrt(1 - a * a)
 };
 me.Tween.Easing.Circular.EaseOut = function(a) {
  return Math.sqrt(1 - --a * a)
 };
 me.Tween.Easing.Circular.EaseInOut = function(a) {
  return 1 > (a *= 2) ? -0.5 * (Math.sqrt(1 - a * a) - 1) : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
 };
 me.Tween.Easing.Elastic.EaseIn = function(a) {
  var c, b = 0.1;
  if (0 === a) return 0;
  if (1 === a) return 1;
  !b || 1 > b ? (b = 1, c = 0.1) : c = 0.4 * Math.asin(1 / b) / (2 * Math.PI);
  return -(b * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - c) * 2 * Math.PI / 0.4))
 };
 me.Tween.Easing.Elastic.EaseOut = function(a) {
  var c, b = 0.1;
  if (0 === a) return 0;
  if (1 === a) return 1;
  !b || 1 > b ?
      (b = 1, c = 0.1) : c = 0.4 * Math.asin(1 / b) / (2 * Math.PI);
  return b * Math.pow(2, -10 * a) * Math.sin((a - c) * 2 * Math.PI / 0.4) + 1
 };
 me.Tween.Easing.Elastic.EaseInOut = function(a) {
  var c, b = 0.1;
  if (0 === a) return 0;
  if (1 === a) return 1;
  !b || 1 > b ? (b = 1, c = 0.1) : c = 0.4 * Math.asin(1 / b) / (2 * Math.PI);
  return 1 > (a *= 2) ? -0.5 * b * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - c) * 2 * Math.PI / 0.4) : 0.5 * b * Math.pow(2, -10 * (a -= 1)) * Math.sin((a - c) * 2 * Math.PI / 0.4) + 1
 };
 me.Tween.Easing.Back.EaseIn = function(a) {
  return a * a * (2.70158 * a - 1.70158)
 };
 me.Tween.Easing.Back.EaseOut = function(a) {
  return --a *
      a * (2.70158 * a + 1.70158) + 1
 };
 me.Tween.Easing.Back.EaseInOut = function(a) {
  return 1 > (a *= 2) ? 0.5 * a * a * (3.5949095 * a - 2.5949095) : 0.5 * ((a -= 2) * a * (3.5949095 * a + 2.5949095) + 2)
 };
 me.Tween.Easing.Bounce.EaseIn = function(a) {
  return 1 - Tween.Easing.Bounce.EaseOut(1 - a)
 };
 me.Tween.Easing.Bounce.EaseOut = function(a) {
  return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375 : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375
 };
 me.Tween.Easing.Bounce.EaseInOut = function(a) {
  return 0.5 > a ? 0.5 * Tween.Easing.Bounce.EaseIn(2 *
      a) : 0.5 * Tween.Easing.Bounce.EaseOut(2 * a - 1) + 0.5
 }
})(window);