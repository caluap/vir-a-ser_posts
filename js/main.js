var canvas;
let debug = true;
let draw_grid = true;

let myFont;
let logo;
let mods_logo = 3;

let w = 1080,
  h = 1080;

let n_mods = 18;
let mod = w / n_mods;

function preload() {
  myFont = loadFont("../assets/antropos.otf");
  logo = loadImage("../assets/logo.svg");
}

function setup() {
  canvas = createCanvas(w, h);
  canvas.class("canv");
}

function draw() {
  background(0);

  // draw_logo(1, 1);
  // draw_logo(n_mods - mods_logo - 1, 1);
  draw_logo(1, n_mods - mods_logo - 1);
  draw_logo(n_mods - mods_logo - 1, n_mods - mods_logo - 1);

  draw_text(
    "A cubilia in purus cum odio parturient parturient suspendisse a et condimentum et senectus posuere hac porttitor facilisis et urna augue. Feugiat eleifend a facilisis a lectus habitasse aliquet commodo ut a a mattis justo lacus eros senectus egestas phasellus ornare nam. In aliquam a accumsan ligula tortor et egestas adipiscing "
  );

  if (draw_grid) {
    stroke(255, 0, 0, 128);
    for (let x = 1; x <= n_mods; x++) {
      line(x * mod, 0, x * mod, height);
    }
    for (let y = 1; y <= n_mods; y++) {
      line(0, y * mod, width, y * mod);
    }
  }

  noLoop();
}

// grid functions

function _mod(n) {
  if (n > n_mods + 1 || n < 0) {
    return null;
  }
  return n * mod;
}

function grid(x, y) {
  if (x > n_mods + 1 || y > n_mods + 1 || x < 0 || y < 0) {
    return null;
  }
  return createVector(_mod(x), _mod(y));
}

/// drawing functions

function draw_logo(x, y) {
  if (logo) {
    // logo position
    let c = grid(x, y);
    // logo size
    let sw = mod * mods_logo,
      sh = mod * mods_logo;
    image(logo, c.x, c.y, sw, sh);
  }
}

function draw_text(t) {
  fill(255, 0, 255);

  rectMode(CORNER);
  textAlign(CENTER, CENTER);
  textFont(myFont);
  textSize(50);
  fill(255);
  text(
    t,
    _mod(1),
    _mod(1),
    _mod(n_mods - 2),
    _mod(-1 + n_mods - 1 - mods_logo - 1)
  );
}
