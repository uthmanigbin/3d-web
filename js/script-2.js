var deg = Math.PI / 180;

//class player
function player(x, y, z, rx, ry) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.rx = rx;
  this.ry = ry;
}

var map = [
  //array for x y z rx ry rz width height "bg color"
  [0, 0, 100, 0, 180, 0, 2000, 200, "#3D3EF5"],
  [0, 0, -1000, 0, 0, 0, 2000, 200, "#45B4F5"],
  [1000, 0, 0, 0, -90, 0, 2000, 200, "#45B6F5"],
  [-1000, 0, 0, 0, 90, 0, 2000, 200, "#457DF5"],
  [0, 100, 0, 90, 0, 0, 2000, 2000, "#DD3556"], //ground
  [0, 0, -600, 0, 0, 0, 200, 200, "#898FFF"], //back
  [0, 0, -400, 0, 0, 0, 200, 200, "#898FFF"], // front
  [-100, 0, -500, 0, -90, 0, 200, 200, "#898FFF"], //left
  [100, 0, -500, 0, -90, 0, 200, 200, "#898FFF"], //right
  [0, -100, -500, 90, 0, 90, 200, 200, "#000000"], // top
  [0, 99, -500, 90, 0, 90, 200, 200, "#000000"], //bottom
  //[0,-200,-500,90,0,90,2000,2000,"#000000"], // roof
];

//variables , moments
var PressLeft = 0;
var PressRight = 0;
var PressForward = 0;
var PressBack = 0;
var PressUp = 0;
var MouseY = 0;
var MouseX = 0;

//variable for locked mouse
var lock = false;

var container = document.getElementById("container");

//if the mouse if pressed
container.onclick = function () {
  container.requestPointerLock();
};

document.addEventListener("keydown", (event) => {
  if (event.key == "a") {
    PressLeft = 1;
  }
  if (event.key == "d") {
    PressRight = 1;
  }
  if (event.key == "w") {
    PressForward = 1;
  }
  if (event.key == "s") {
    PressBack = 1;
  }
  if (event.keyCode == 32) {
    PressUp = 1;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key == "a") {
    PressLeft = 0;
  }
  if (event.key == "d") {
    PressRight = 0;
  }
  if (event.key == "w") {
    PressForward = 0;
  }
  if (event.key == "s") {
    PressBack = 0;
  }
  if (event.keyCode == 32) {
    PressUp = 0;
  }
});

document.addEventListener("pointerlockchange", (event) => {
  lock = !lock;
});
// mouse Movement

document.addEventListener("mousemove", (event) => {
  MouseX = event.movementX;
  MouseY = event.movementY;
});

var pawn = new player(0, 0, 0, 0, 0);

var world = document.getElementById("world");

function update() {
  dx =
    Math.cos(pawn.ry * deg) * (PressRight - PressLeft) -
    Math.sin(pawn.ry * deg) * (PressForward - PressBack);
  dz =
    -Math.sin(pawn.ry * deg) * (PressRight - PressLeft) -
    Math.cos(pawn.ry * deg) * (PressForward - PressBack);

  //Movement
  //dx = PressRight - PressLeft;
  //dz = PressBack - PressForward;
  dy = -PressUp;
  drx = MouseY;
  dry = -MouseX;

  MouseX = MouseY = 0;

  console.log(PressRight);

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

function CreateNewWorld() {
  for (let i = 0; i < map.length; i++) {
    let newElement = document.createElement("div");
    newElement.className = "square";
    newElement.id = "square" + i;
    console.log(i, map[i][8]);
    newElement.style.width = map[i][6] + "px";
    newElement.style.height = map[i][7] + "px";
    newElement.style.background = map[i][8];
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

    //inserting rectangles to the world
    world.append(newElement);
  }
}

// the genaration of the world
CreateNewWorld();

TimerGame = setInterval(update, 10);
