var canvas;
let debug = true;

let myFont;
let logo;

function preload() {
  myFont = loadFont("../assets/antropos.otf");
  // logo = loadImage("");
}

function setup() {
  canvas = createCanvas(1080, 1080);
  canvas.class("canv");
}

function draw() {
  background(0);
  textAlign(CENTER);
  textFont(myFont);
  textSize(50);
  fill(255);
  text("Teste de foníáãte", width / 2, height / 2);
  noLoop();
}
