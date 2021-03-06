var ctx;
var WIDTH;
var HEIGHT;
var clr = "#FFFFFF";

var dx = 20;
var dy = 20;
var dr = 10;
var i;

var diff;

// 0: left
// 1: up
// 2: right
// 3: down
var direction;

var snake;
var size;

var sndHit = new Audio();
  sndHit.src = "sounds/hit.wav";
  
var sndEat = new Audio();
  sndEat.src = "sounds/pickup.wav";

var food;

var id;

function diffSet(dif) {
  if (dif == 1) {
    diff = 140;
  } else if (dif == 2) {
    diff = 100;
  } else if (dif == 3) {
    diff = 75;
  } else if (dif == 4) {
    diff = 45;
  } else if (dif == 5) {
    diff = 75;
  }
}

function init() {
  ctx = $('#canvas')[0].getContext("2d");
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();

  createsnake();
  newfood();

  direction = 0;
  size = 0;
  diffSet(dif);
  id = setInterval(step, diff);
}

function onKeyDown(evt) {
  if (evt.keyCode == 32) {
    return;
  }
  newdir = evt.keyCode - 37;

  // only lateral turns are allowed
  // (that is, no u-turns)
  if (newdir != direction && newdir != direction+2 && newdir != direction-2) {
    direction = newdir;
  }
}

if ($.browser.mozilla) {
    $(document).keypress(onKeyDown);
} else {
    $(document).keydown(onKeyDown);
}

function createsnake() {
  snake = Array();
  var head = Array();
  head.x = WIDTH/2;
  head.y = HEIGHT/2;
  snake.push(head);
}

function collision(n) {
  // are we out of the playground?
  if (n.x < 0 || n.x > WIDTH - 1 || n.y < 0 || n.y > HEIGHT - 1) {
    return true;
  }

  // are we eating ourselves?
  for (var i = 0; i < snake.length; i++) {
    if (snake[i].x == n.x && snake[i].y == n.y) {
      return true;
    }
  }
  return false;
}

function newfood() {
  var wcells = WIDTH/dx;
  var hcells = HEIGHT/dy;

  var randomx = Math.floor(Math.random()*wcells);
  var randomy = Math.floor(Math.random()*hcells);

  food = Array();
  food.x = randomx * dx;
  food.y = randomy * dy;
  food.r = dr;
  size = size+200;
}
function bonusfood() {
  var wcells = WIDTH/dx;
  var hcells = HEIGHT/dy;

  var randomx = Math.floor(Math.random()*wcells);
  var randomy = Math.floor(Math.random()*hcells);

  food = Array();
  food.x = randomx * dx;
  food.y = randomy * dy;
  food.r = dr+10;
  size = size+1000;
}




function meal(n) {
  return (n.x == food.x && n.y == food.y);
}

function movesnake() {

  h = snake[0]; // peek head

  // create new head relative to current head
  var n = Array();
  switch (direction) {
    case 0: // left
      n.x = h.x - dx;
      n.y = h.y;
      break;
    case 1: // up
      n.x = h.x;
      n.y = h.y - dy;
      break;
    case 2: // right
      n.x = h.x + dx;
      n.y = h.y;
      break;
    case 3: // down
      n.x = h.x;
      n.y = h.y + dy;
      break;
  }

  // if out of box or collision with ourselves, we die
  if (collision(n)) {
    sndHit.play();
    return false;
  }

  snake.unshift(n);

  // if there's food there
    if (dif == 1 || dif == 2 || dif == 3 || dif == 4) {
      if (meal(n)) {
        sndEat.play();
		if(size == 800 ){
		bonusfood();
		}
		else
		newfood();
      
      } else {
        snake.pop();
      }
    } else if (dif == 5) {
      
	  if (meal(n)) {
        sndEat.play();
		
      } 
	  else {
        
              
      }    
    }

  return true;

}

function die() {
  if (id) {
    clearInterval(id);
  }
  gameStarted = false;
}

function circle(x,y,r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}

function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

function screenclear() {
  ctx.fillStyle = "#000000";
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  rect(0,0,WIDTH,HEIGHT);
}

function drawsnake() {
  ctx.fillStyle = clr;
  snake.forEach(function(p) {
    rect(p.x, p.y, dx, dy);
  })
}

function drawfoodRED() {
  ctx.fillStyle = "#F0000F";
  circle(food.x+food.r, food.y+food.r, food.r);
}
function drawfoodYELLOW() {
  ctx.fillStyle = "#FFFF00";
  circle(food.x+food.r, food.y+food.r, food.r);
}