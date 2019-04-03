var canvas;
let debug = true;

let uploaded_img;
let input, bg_slider;

let myFont;
let logo;
let mods_logo = 4;

let w = 1080,
  h = 1080;

let n_mods = 24;
let mod = w / n_mods;

let current_background = -1;
let backgrounds = [
  { src: "../assets/backgrounds/01.jpg", img: null, text_color: "#ffffff" },
  { src: "../assets/backgrounds/02.jpg", img: null, text_color: "#ffffff" },
  { src: "../assets/backgrounds/03.jpg", img: null, text_color: "#000000" },
  { src: "../assets/backgrounds/04.jpg", img: null, text_color: "#ffffff" },
  { src: "../assets/backgrounds/05.jpg", img: null, text_color: "#000000" },
  { src: "../assets/backgrounds/06.jpg", img: null, text_color: "#ffffff" },
  { src: "../assets/backgrounds/07.jpg", img: null, text_color: "#ffffff" },
  { src: "../assets/backgrounds/08.jpg", img: null, text_color: "#ffffff" },
  { src: "../assets/backgrounds/09.jpg", img: null, text_color: "#000000" },
  { src: "../assets/backgrounds/10.jpg", img: null, text_color: "#ffffff" },
  { src: "../assets/backgrounds/11.jpg", img: null, text_color: "#ffffff" },
  { src: "../assets/backgrounds/12.jpg", img: null, text_color: "#ffffff" },
  { src: "../assets/backgrounds/13.jpg", img: null, text_color: "#000000" }
];

let tint_index = -1;
let tints = ["#dea1db", "#ffdb73", "#f2bcbf", "#4ecde8", "#94dfe5"];

let text_breakpoints = [120, 280, 340, 440, 700, 899];
let sample_text =
  "Aptent a quis id scelerisque elementum donec a quis ut arcu habitant natoque posuere tempor vestibulum id faucibus leo a. Mollis scelerisque a ante quis adipiscing a accumsan tincidunt vestibulum ut mattis justo sem lobortis nascetur habitant ullamcorper mi in dui faucibus a. Mi orci cubilia blandit at suspendisse magnis ullamcorper vestibulum penatibus in potenti justo nec augue cras ac ridiculus fringilla ullamcorper condimentum etiam quisque ipsum ut pretium mattis elit imperdiet. In quam eros suscipit natoque hac hendrerit a orci montes consectetur ac adipiscing nec adipiscing commodo adipiscing pretium mi a accumsan viverra habitasse a inceptos potenti. Mus iaculis enim ut mus orci et suscipit vestibulum dapibus a fermentum non orci luctus sed ullamcorper himenaeos dis ultrices vestibulum.Facilisis scelerisque gravida dictum eget hendrerit est nam dignissim at a accumsan consequat.";

function preload() {
  myFont = loadFont("../assets/antropos.otf");
  logo = loadImage("../assets/logo.svg");
}

function setup() {
  canvas = createCanvas(w, h);
  canvas.class("canv");

  let controllers = createDiv();
  controllers.id("input-controllers");

  bg_slider = createSlider(-1, 12, -1, 1);
  bg_slider.mouseClicked(change_bg);

  input = createFileInput(handle_upload);
  input.id("file-input");

  controllers.child(input);
  controllers.child(bg_slider);
  // input.position(0, 0);
}

function draw() {
  background(0);

  let bg_ready = draw_background(current_background);

  if (bg_ready || current_background == -1) {
    // draw_logo(1, 1);
    // draw_logo(n_mods - mods_logo - 1, 1);
    // draw_logo(1, n_mods - mods_logo - 1);

    if (uploaded_img) {
      draw_uploaded_img();
    }
    draw_logo(n_mods - mods_logo - 1, n_mods - mods_logo - 1);
    draw_text(sample_text.slice(0, text_breakpoints[0] - 1));
  } else {
    draw_text("carregando \n imagem....");
  }

  if (debug) {
    draw_grid();
  }

  noLoop();
}

function handle_upload(file) {
  if (file.type === "image") {
    uploaded_img = loadImage(file.data, () => {
      redraw();
      if (debug) {
        console.log("Uploaded image loaded successfully!");
      }
    });
  }
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

function draw_grid() {
  stroke(255, 0, 0, 128);
  for (let x = 1; x <= n_mods; x++) {
    line(x * mod, 0, x * mod, height);
  }
  for (let y = 1; y <= n_mods; y++) {
    line(0, y * mod, width, y * mod);
  }
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
  let offset_y = 1;

  let tx = _mod(text_m),
    ty = _mod(text_m * text_m_y - offset_y),
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
  if (n < text_breakpoints[0]) {
    ts = 70;
  } else if (n < text_breakpoints[1]) {
    ts = 50;
  } else if (n < text_breakpoints[2]) {
    ts = 45;
  } else if (n < text_breakpoints[3]) {
    ts = 40;
  } else if (n < text_breakpoints[4]) {
    ts = 32;
    align = LEFT;
  } else {
    ts = 25;
    align = LEFT;
  }

  textAlign(align, CENTER);
  textSize(ts);

  // some images require dark text; some, light.
  if (current_background != -1) {
    fill(backgrounds[current_background].text_color);
  } else {
    fill(255);
  }
  text(t, tx, ty, tw, th);
}

function place_background(n) {
  image(backgrounds[n].img, 0, 0);
  redraw();
}

function draw_background(n = 0) {
  if (n > backgrounds.length || n == -1) {
    return null;
  }
  current_background = n;
  if (backgrounds[n].img == null) {
    // will wait until image is load to continue drawing
    loadImage(backgrounds[n].src, img => {
      backgrounds[n].img = img;
      place_background(n);
    });
    return false;
  } else {
    image(backgrounds[n].img, 0, 0);
    return true;
  }
}

function draw_uploaded_img() {
  if (tint_index != -1) {
    tint(tints[tint_index]);
  }
  if (uploaded_img.width > uploaded_img.height) {
    let ratio = width / uploaded_img.height;
    let new_width = uploaded_img.width * ratio;
    image(uploaded_img, width / 2 - new_width / 2, 0, new_width, h);
  } else {
    let ratio = width / uploaded_img.width;
    let new_height = uploaded_img.height * ratio;
    image(uploaded_img, 0, height / 2 - new_height / 2, w, new_height);
  }
  if (tint_index != -1) {
    noTint();
  }
}

// controller functions

function change_bg() {
  current_background = bg_slider.value();
  if (debug) {
    console.log(current_background);
  }
  redraw();
}
