// world
var deg = Math.PI / 180;

var map = [
  // x, y, z, rx, ry, rz, width, height, background
  [0, 0, 1000, 0, 180, 0, 2000, 200, "img/brick.jpg"],
  // front wall
  [0, 0, -1000, 0, 0, 0, 2000, 200, "img/brick.jpg"],
  // right wall
  [1000, 0, 0, 0, -90, 0, 2000, 200, "img/brick.jpg", 1],
  // left wall
  [-1000, 0, 0, 0, 90, 0, 2000, 200, "img/brick.jpg", 1],
  // ground
  [0, 100, 0, 90, 0, 0, 2000, 2000, "img/stone.jpg", 1],
  // my Cube
  //front
  [0, 0, -500, 0, 0, 0, 200, 200, "img/meme.png", 0.5],
  //left
  [-100, 0, -600, 0, -90, 0, 200, 200, "#00ff99", 0.5],
  //right
  [100, 0, -600, 0, -90, 0, 200, 200, "#00ff99", 0.5],
  //back
  [0, 0, -700, 0, 0, 0, 200, 200, "#00ff99", 0.5],
  // top
  [0, -100, -600, 90, 0, 0, 200, 200, "#00ff99", 0.5],

  // roof
  [0, -100, 0, 90, 0, 0, 2000, 2000, "#ffff66", 1],
];

// Variable for movement
var pressLeft = 0;
var pressRight = 0;
var pressForward = 0;
var pressBack = 0;
var pressUp = 0;
var mouseX = 0;
var mouseY = 0;

// variable for locked mouse
var lock = false;
var container = document.getElementById("container");
container.onclick = function () {
  container.requestPointerLock();
};

// if the button is pressed
document.addEventListener("keydown", (event) => {
  if (event.key == "a") {
    pressLeft = 1;
  }
  if (event.key == "d") {
    pressRight = 1;
  }
  if (event.key == "w") {
    pressForward = 1;
  }
  if (event.key == "s") {
    pressBack = 1;
  }
  if (event.keyCode == 32) {
    pressUp = 1;
  }
});

// if the button is released
document.addEventListener("keyup", (event) => {
  if (event.key == "a") {
    pressLeft = 0;
  }
  if (event.key == "d") {
    pressRight = 0;
  }
  if (event.key == "w") {
    pressForward = 0;
  }
  if (event.key == "s") {
    pressBack = 0;
  }
  if (event.keyCode == 32) {
    pressUp = 0;
  }
});

document.addEventListener("pointerlockchange", (event) => {
  lock = !lock;
});

// mouse movement listener
document.addEventListener("mousemove", (event) => {
  mouseX = event.movementX;
  mouseY = event.movementY;
});

//class player
function player(x, y, z, rx, ry) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.rx = rx;
  this.ry = ry;
}

var pawn = new player(0, 0, 0, 0, 0);

var world = document.getElementById("world");

function update() {
  dx =
    Math.cos(pawn.ry * deg) * (pressRight - pressLeft) -
    Math.sin(pawn.ry * deg) * (pressForward - pressBack);
  dz =
    -Math.sin(pawn.ry * deg) * (pressRight - pressLeft) -
    Math.cos(pawn.ry * deg) * (pressForward - pressBack);

  //Movement
  //dx = PressRight - PressLeft;
  //dz = PressBack - PressForward;
  dy = -pressUp;
  drx = mouseY;
  dry = -mouseX;

  mouseX = mouseY = 0;

  console.log(pressRight);

  //add changes to the coordinates
  pawn.x = pawn.x + dx;
  pawn.y = pawn.y + dy;
  pawn.z = pawn.z + dz;
  //allow rotation only if the mouse is locked
  if (lock) {
    pawn.rx = pawn.rx + drx;
    pawn.ry = pawn.ry + dry;
  }
  //put pown to the new coordinates
  world.style.transform =
    "translateZ(600px)" +
    "rotateX(" +
    -pawn.rx +
    "deg)" +
    "rotateY(" +
    -pawn.ry +
    "deg)" +
    "translate3d(" +
    -pawn.x +
    "px," +
    -pawn.y +
    "px," +
    -pawn.z +
    "px)";
}

function createNewWorld() {
  for (let i = 0; i < map.length; i++) {
    // creates new layer
    let newElement = document.createElement("div");
    newElement.className = "square";
    newElement.id = "square" + i;
    newElement.style.width = map[i][6] + "px";
    newElement.style.height = map[i][7] + "px";
    newElement.style.background = map[i][8];
    newElement.style.opacity = map[i][9];
    newElement.style.backgroundImage = "url(" + map[i][8] + ")";
    newElement.style.transform =
      "translate3d(" +
      (600 - map[i][6] / 2 + map[i][0]) +
      "px," +
      (400 - map[i][7] / 2 + map[i][1]) +
      "px," +
      map[i][2] +
      "px)" +
      "rotateX(" +
      map[i][3] +
      "deg)" +
      "rotateY(" +
      map[i][4] +
      "deg)" +
      "rotateZ(" +
      map[i][5] +
      "deg)";
    //insert rectangles to the world
    world.append(newElement);
  }
}

// generation of the world
createNewWorld();

TimerGame = setInterval(update, 10);
