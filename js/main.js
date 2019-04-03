var canvas;
let debug = false;

let myFont;
let logo;
let mods_logo = 4;

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

  // draw_logo(1, 1);
  // draw_logo(n_mods - mods_logo - 1, 1);
  // draw_logo(1, n_mods - mods_logo - 1);
  draw_logo(n_mods - mods_logo - 1, n_mods - mods_logo - 1);

  draw_text(
    "Blandit mi id neque dignissim fusce lorem morbi ut vestibulum netus vitae lectus suscipit ullamcorper enim magnis vestibulum est bibendum vestibulum nec suscipit ac. Parturient lectus pulvinar sagittis luctus a a hendrerit vestibulum leo parturient a arcu vulputate euismod dolor elit parturient vitae in eleifend condimentum ullamcorper pretium eu cubilia posuerelaoreet facilisi. Scelerisque hac nec mauris mattis nascetur est cursus eros ac class suspendisse donec nibh parturient mi vestibulum curabitur mi. Suspendisse vitae velit vestibulum habitant varius inceptos leo mi a ullamcorper erat pulvinar a quis luctus nisi sed. Facilisi elementum vestibulum parturient id ullamcorper potenti habitasse metus"
  );

  if (debug) {
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
  let text_m = 2;
  let text_m_y = 5 / 2;

  let tx = _mod(text_m),
    ty = _mod(text_m * text_m_y),
    tw = _mod(n_mods - text_m * 2),
    th = _mod(n_mods - text_m * 2 * text_m_y);

  if (debug) {
    fill(255, 0, 255, 255 / 4);
    rect(tx, ty, tw, th);
  }

  rectMode(CORNER);
  textFont(myFont);

  let align = CENTER;

  let ts,
    n = t.length;
  if (n < 280) {
    ts = 50;
  } else if (n < 340) {
    ts = 45;
  } else if (n < 440) {
    ts = 40;
  } else if (n < 700) {
    ts = 32;
    align = LEFT;
  } else {
    ts = 25;
    align = LEFT;
  }

  textAlign(align, CENTER);
  textSize(ts);
  fill(255);
  text(t, tx, ty, tw, th);
}
