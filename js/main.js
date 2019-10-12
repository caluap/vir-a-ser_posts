var canvas;
let debug = false;

let uploaded_img;
let input, bg_slider, tint_slider;
let p_tint, p_bg;

let myFont;
let logo;
let mods_logo = 4;

let w = 1080,
  h = 1080;

let n_mods = 24;
let mod = w / n_mods;

let left_logo = false;
let top_logo = false;

let user_text_color = "";
let user_text_align = null;
let vertical_user_text_align = null;

let current_background = -1;
let backgrounds = [
  {
    src: "../assets/backgrounds/01.jpg",
    name: "Água-marinha",
    img: null,
    text_color: "#ffffff"
  },
  {
    src: "../assets/backgrounds/02.jpg",
    name: "Esmeralda",
    img: null,
    text_color: "#ffffff"
  },
  {
    src: "../assets/backgrounds/03.jpg",
    name: "Rosa claro",
    img: null,
    text_color: "#000000"
  },
  {
    src: "../assets/backgrounds/04.jpg",
    name: "Rosa profundo",
    img: null,
    text_color: "#ffffff"
  },
  {
    src: "../assets/backgrounds/05.jpg",
    name: "Azul taparuere",
    img: null,
    text_color: "#000000"
  },
  {
    src: "../assets/backgrounds/06.jpg",
    name: "Azul flor de milho",
    img: null,
    text_color: "#ffffff"
  },
  {
    src: "../assets/backgrounds/07.jpg",
    name: "Verde fluorescente",
    img: null,
    text_color: "#ffffff"
  },
  {
    src: "../assets/backgrounds/08.jpg",
    name: "Verde lima",
    img: null,
    text_color: "#ffffff"
  },
  {
    src: "../assets/backgrounds/09.jpg",
    name: "Orquídea / Ciano",
    img: null,
    text_color: "#000000"
  },
  {
    src: "../assets/backgrounds/10.jpg",
    name: "Celeste",
    img: null,
    text_color: "#ffffff"
  },
  {
    src: "../assets/backgrounds/11.jpg",
    name: "Heliotrópio",
    img: null,
    text_color: "#ffffff"
  },
  {
    src: "../assets/backgrounds/12.jpg",
    name: "Jambo",
    img: null,
    text_color: "#ffffff"
  },
  {
    src: "../assets/backgrounds/13.jpg",
    name: "Jasmine",
    img: null,
    text_color: "#000000"
  }
];

let current_tint = -1;
let tints = [
  { color: "#00CCEE", name: "Azul turquesa" },
  { color: "#ECDB00", name: "Amarelo brasilis" },
  { color: "#7B68EE", name: "Azul ardósia " },
  { color: "#007FFF", name: "Azul celeste" },
  { color: "#FF7F50", name: "Coral" },
  { color: "#B53389", name: "Fandango" },
  { color: "#00A86B", name: "Jade" },
  { color: "#CD69CD", name: "Rosa" },
  { color: "#B22222", name: "Tijolo" }
];

let text_breakpoints = [120, 280, 340, 440, 700, 899];
let sample_text = "";

function preload() {
  myFont = loadFont("../assets/antropos.otf");
  logo = loadImage("../assets/logo.svg");
}

function setup() {
  canvas = createCanvas(w, h);
  canvas.class("canv");

  input = createFileInput(handle_upload);
  input.id("img-upload");

  let panel = select("#image-upload-panel");
  panel.child(input);

  select("#control-panel").removeClass("hidden-panel");
}

function draw() {
  let h_text = measure_text_height(sample_text);

  background(0);

  let bg_ready = draw_background(current_background);

  if (bg_ready || current_background == -1) {
    if (uploaded_img) {
      draw_uploaded_img();
    }
    if (left_logo) {
      if (top_logo) {
        draw_logo(1, 1);
      } else {
        draw_logo(1, n_mods - mods_logo - 1);
      }
    } else {
      if (top_logo) {
        draw_logo(n_mods - mods_logo - 1, 1);
      } else {
        draw_logo(n_mods - mods_logo - 1, n_mods - mods_logo - 1);
      }
    }
    textAlign(CENTER, CENTER);
    draw_text(sample_text, false, h_text);
  } else {
    textAlign(CENTER, CENTER);
    draw_text("carregando \n imagem....");
  }

  if (debug) {
    draw_grid();
  }

  noLoop();
}

function remove_img() {
  uploaded_img = "";
  current_tint = -1;
}

function handle_upload(file) {
  toggle_bg(false);
  let panel = select("#image-upload-panel");
  panel.removeClass("no-img");

  if (file.type === "image") {
    uploaded_img = loadImage(file.data, () => {
      redraw();
      if (debug) {
        console.log("Uploaded image loaded successfully!");
      }
    });

    let tints_panel = select("#tints-panel");
    tints_panel.removeClass("disabled");
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

function draw_text(t, measure = false) {
  let tx = _mod(1),
    ty = _mod(1),
    tw = width - tx * 2,
    th = height - ty * 2;

  if (debug && !measure) {
    fill(255, 0, 255, 255 / 4);
    rect(tx, ty, tw, th);
  }

  textFont(myFont);

  let align = CENTER;

  let ts,
    n = t.length;

  const lines = (t.match(/\n/g) || "").length + 1;
  n += lines * 10; // each \n counts as more than only one character

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
  } else {
    ts = 25;
  }
  if (user_text_align) {
    align = user_text_align;
  }

  let vert_align;

  if (vertical_user_text_align) {
    vert_align = vertical_user_text_align;
  } else {
    vert_align = CENTER;
  }

  textAlign(align, vert_align);
  textSize(ts);

  // if the user selects a color, avoids the automatic color scheme
  if (user_text_color != "") {
    fill(user_text_color);
  } else {
    // some images require dark text; some, light
    if (current_background != -1 && !uploaded_img) {
      fill(backgrounds[current_background].text_color);
    } else {
      if (uploaded_img) {
        let sum_c = 0;
        loadPixels();
        for (let x = tx; x < tw; x++) {
          for (let y = ty; y < th; y++) {
            let off = y * width + x;
            sum_c += (pixels[off] + pixels[off + 1] + pixels[off + 2]) / 3;
          }
        }
        let avg = sum_c / ((tw - tx) * (th - ty));
        // lightish gray (it prefers to choose white text)
        if (avg > (255 * 3) / 4) {
          fill(0);
        } else {
          // darkish gray
          fill(255);
        }
      } else {
        fill(255);
      }
    }
    if (measure) {
      fill(0);
    }
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
  if (current_tint != -1) {
    tint(tints[current_tint].color);
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
  if (current_tint != -1) {
    noTint();
  }
}

// controller functions

function change_bg(i_bg) {
  current_background = i_bg;
  redraw();
}

function change_tint(i_tint) {
  current_tint = i_tint;
  redraw();
}

function change_text() {
  let new_text = select("#post-text").value();
  console.log(new_text);
  if (new_text != null) {
    sample_text = new_text;
    redraw();
  }
}

function measure_text_height(t) {
  if (t == "") {
    return 0;
  }
  background(255);

  draw_text(t, true);
  let min_y = Infinity,
    max_y = -1;

  loadPixels();
  for (let y = 0; y < height; y++) {
    yes = true;
    for (let x = 0; x < width; x++) {
      let c = get(x, y);
      // if (yes && c[0] != 255) {
      //   console.log(c + " @ line " + y);
      //   yes = false;
      // }

      // is there any text here?
      if (c[0] < 255) {
        if (y > max_y) {
          max_y = y;
        }
        if (y < min_y) {
          min_y = y;
        }
        continue;
      }
    }
  }
  return max_y - min_y;
}
