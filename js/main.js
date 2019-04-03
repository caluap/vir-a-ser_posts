var canvas;
let debug = true;
let grid = true;

let myFont;
let logo;

function preload() {
  myFont = loadFont("../assets/antropos.otf");
  logo = loadImage("../assets/logo.svg");
}

function setup() {
  canvas = createCanvas(1080, 1080);
  canvas.class("canv");
}

function draw() {
  background(0);
  // textAlign(CENTER);
  // textFont(myFont);
  // textSize(50);
  // fill(255);
  // text("Teste de foníáãte", width / 2, height / 2);
  if (logo) {
    image(logo, width / 2, height / 2, width / 6, height / 6);
  }

  if (grid) {
    stroke(255, 0, 0, 128);
    let n_mod = 24;
    let mod = width / n_mod;
    for (let x = 1; x <= n_mod; x++) {
      line(x * mod, 0, x * mod, height);
    }
    for (let y = 1; y <= n_mod; y++) {
      line(0, y * mod, width, y * mod);
    }
  }

  noLoop();
}
