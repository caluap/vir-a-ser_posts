var canvas;
let debug = true;

let myFont;

function preload() {
  myFont = loadFont("assets/waldorf_font.otf");
}

function setup() {
  canvas = createCanvas(1080, 1080);
  canvas.class("canv");
}

function draw() {
  noLoop();
}
