var canvas;
let debug = true;
let draw_grid = true;

let myFont;
let logo;
let mods_logo = 3;

let w = 1080,
  h = 1080;

let n_mods = 24;
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
  // textAlign(CENTER);
  // textFont(myFont);
  // textSize(50);
  // fill(255);
  // text("Teste de foníáãte", width / 2, height / 2);

  draw_logo(1, 1);
  draw_logo(1, n_mods - mods_logo - 1);
  draw_logo(n_mods - mods_logo - 1, 1);
  draw_logo(n_mods - mods_logo - 1, n_mods - mods_logo - 1);

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

function grid(x, y) {
  if (x > n_mods + 1 || y > n_mods + 1 || x < 0 || y < 0) {
    return null;
  }
  return createVector(x * mod, y * mod);
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
