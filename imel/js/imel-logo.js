// var W = 800;
// var H = 300;
// var HEX_SIZE = 100;
// var HEX_BORDER = 12;

var W = 400;
var H = 100;
var HEX_SIZE = 40;
var HEX_BORDER = 6;
var PADDING_L = 10;

var LOGO_W = W-150;
var LOGO_H = H;
var IMEL_SIZE = HEX_SIZE*0.5;
var LONG_NAME_SIZE = HEX_SIZE/2.5;

var frameRate = 60;
var latoBold;

var c1, c2;
var color1A, color2A, color1B, color2B;

var windowLoadWidth;
var ROTATION_SPEED = 2.0;
var mouseLoadX;
var sketchFocused = false;
var scriptsPath = calculateScriptsPath();

function preload() {
  latoBold = loadFont(scriptsPath+'assets/Lato-Black.ttf');
}

function setup() {
	var c = createCanvas(W, H);
	c.parent('page-logo');
  c.mouseOver(updateFocusOn);
  c.mouseOut(updateFocusOff);

  // hide existing logo on webpage
  select('#page-logo-text').addClass('visuallyhidden');

	colorMode(RGB, 255);

  // Initial load colors of LOGO
  color1A = color(231,106,40);
  color2A = color(247,199,43);

  // Target colors LOGO will transition to on Hover
  color1B = color(48,134,211);
  color2B = color(91,213,201);

  // Current colors of LOGO
  c1 = color1A;
  c2 = color2A;

  windowLoadWidth = windowWidth;
  mouseLoadX = mouseX;
	frameRate(frameRate);

// drawLogo();
// saveCanvas(c, 'imel-logo', 'png');
}

function draw() {
  background(255);

  /* Update LOGO colors based on mouse position
   * if the mosue is hovering over our LOGO
   */
  if(sketchFocused && mouseX != mouseLoadX){
    var pos = float(mouseX) / width;
    c1 = lerpColor(color1A, color1B, pos);
    c2 = lerpColor(color2A, color2B, pos);
  }

  push();
  translate(PADDING_L, 0);
  drawLogo();
  pop();
}

function updateFocusOff() {
  sketchFocused = false;
}
function updateFocusOn() {
  sketchFocused = true;
}

function drawLogo() {
  var rotateHex = PI/6.0;
  if(windowWidth != windowLoadWidth) {
    rotateHex = rotateHex + (windowWidth - windowLoadWidth)/windowLoadWidth*ROTATION_SPEED;
  }

  push();
  openHexagon(HEX_SIZE, LOGO_H/2.0, HEX_SIZE, HEX_BORDER, c1, rotateHex);
  pop();
  push();
  openHexagon(HEX_SIZE, LOGO_H/2.0, HEX_SIZE-HEX_BORDER, HEX_BORDER, c2, rotateHex);
  pop();

  noStroke();
  fill(c2);
  rectMode(CORNER);
  rect(HEX_SIZE*2+5, LOGO_H/2.0-HEX_SIZE*1.1/2.0+1, HEX_BORDER, HEX_SIZE*1.05);

  fill(c1);
  textFont(latoBold);
  textSize(IMEL_SIZE);
  textAlign(CENTER, TOP);
  text("IMEL", HEX_SIZE, LOGO_H/2.0-IMEL_SIZE/2.0-HEX_BORDER+4);

  fill(c1);
  textSize(LONG_NAME_SIZE);
  textAlign(LEFT, CENTER);
  text("Interactive Materials\nEducation Laboratory", 2*HEX_SIZE+LONG_NAME_SIZE+2, LOGO_H/2.0-5);
}

function openHexagon(x, y, size, borderSize, color, angle) {
  push();
  strokeWeight(borderSize);
  stroke(color);
  fill(255);
  translate(x, y);
  drawHexagon2(0, 0, size, angle);
  pop();
}

// http://www.openprocessing.org/sketch/117535
function drawHexagon(x, y) {
  push();
  translate(x, y);
  beginShape();
  for (var i = 0; i < 6; i++) {
    push();
    var angle = PI*i/3.0;
    vertex(cos(angle) * radius, sin(angle) * radius);
    pop();
  }
  endShape(CLOSE);
  pop();
}
/* rotate PI/6.0, for a side on top, because we
 * have 6 sides */
function drawHexagon2(x, y, radius, angle) {
  push();
  translate(x, y);
  rotate(angle);
  beginShape();
  for (var i = 0; i < 6; i++) {
    push();
    var angle = PI*i/3.0;
    vertex(cos(angle) * radius, sin(angle) * radius);
    pop();
  }
  endShape(CLOSE);
  pop();
}

// https://stackoverflow.com/questions/143847/best-way-to-find-if-an-item-is-in-a-javascript-array
function containing(arr, obj) {
    for(var i=0; i<arr.length; i++) {
        if (arr[i].src.indexOf(obj) !== -1) return arr[i].src;
    }
    return undefined;
}

function calculateScriptsPath() {
  // get path for scripts
  // ref: https://stackoverflow.com/questions/2161159/get-script-path
  var scripts = document.getElementsByTagName('script');
  var script = containing(scripts, "imel-logo.js");
  if (typeof script != 'undefined') {
    var path = script.split('?')[0]; // remove ?query
    var scriptsPath = path.split('/').slice(0, -1).join('/')+'/';  // remove last filename part of path
    return scriptsPath;
  }

  return ""; // unknown
}
