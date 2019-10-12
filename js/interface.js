function clear_selected_tints() {
  let selected = document.getElementsByClassName("img-tint selected");
  if (selected) {
    for (let i2 = 0; i2 < selected.length; i2++) {
      selected[i2].classList.remove("selected");
    }
  }
}

function toggle_bg(bg_img = false) {
  let tint_div = document.getElementById("tints-panel");
  let img_panel = document.getElementById("image-upload-panel");
  let bg_panel = document.getElementById("watercolor-background");

  if (bg_img) {
    tint_div.classList.add("disabled");
    img_panel.classList.add("no-img");
    bg_panel.classList.remove("disabled");

    remove_img();
    clear_selected_tints();

    let file_input = document.getElementById("img-upload");
    file_input.value = "";
  } else {
    tint_div.classList.remove("disabled");
    img_panel.classList.remove("no-img");
    bg_panel.classList.add("disabled");
  }

  redraw();
}

function save_img() {
  let now = new Date();
  let clock = now.getHours() + "·" + now.getMinutes();
  let day = now.toJSON().slice(0, 10);
  saveCanvas(canvas, "post-" + day + "-" + clock, "jpg");
}

function redraw_logo(top, left, who) {
  top_logo = top;
  left_logo = left;
  let selected = document.getElementsByClassName("logo-sim selected");
  if (selected) {
    for (let i2 = 0; i2 < selected.length; i2++) {
      selected[i2].classList.remove("selected");
    }
  }
  who.classList.add("selected");
  redraw();
}

function select_text_align(alignment, who) {
  user_text_align = alignment;
  let els = document.getElementsByClassName("text-align-control");
  [].forEach.call(els, function(e) {
    e.classList.remove("selected");
  });
  who.classList.add("selected");
  redraw();
}

function update_text_color(e = null) {
  // got here from clicking on the palette
  if (e) {
    let color = rgb2hex(e.style.backgroundColor);
    let selected = document.getElementsByClassName("text-tint selected");
    if (selected) {
      for (let i = 0; i < selected.length; i++) {
        selected[i].classList.remove("selected");
      }
    }
    e.classList.add("selected");
    user_text_color = color;
    redraw();
  }
}

//Function to convert hex format to a rgb color
//https://jsfiddle.net/Mottie/xcqpF/1/light/
function rgb2hex(rgb) {
  rgb = rgb.match(
    /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
  );
  return rgb && rgb.length === 4
    ? "#" +
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2)
    : "";
}

let img_tint_els = document.getElementsByClassName("text-tint");
[].forEach.call(img_tint_els, function(e) {
  e.onclick = function() {
    update_text_color(e);
  };
});

document.getElementById("post-text").onchange = function() {
  change_text();
};

let tint_links = document.getElementsByClassName("img-tint");
for (let i = 0; i < tint_links.length; i++) {
  tint_links[i].onclick = function(e) {
    if (document.getElementById("tints-panel").classList.contains("disabled")) {
      return;
    }

    clear_selected_tints();
    e.srcElement.classList.add("selected");
    // in my html elements, I have an “empty” element at the
    // 0th spot, but when converting to the tint function
    // this has to be == -1
    change_tint(i - 1);
  };
}

// watercolor events
let bg_links = document.getElementsByClassName("bg-selection");
for (let i = 0; i < bg_links.length; i++) {
  bg_links[i].onclick = function(e) {
    if (
      document
        .getElementById("watercolor-background")
        .classList.contains("disabled")
    ) {
      return;
    }
    let selected = document.getElementsByClassName("bg-selection selected");
    if (selected) {
      for (let i2 = 0; i2 < selected.length; i2++) {
        selected[i2].classList.remove("selected");
      }
    }
    e.srcElement.parentElement.classList.add("selected");
    change_bg(i - 1);
  };
}
