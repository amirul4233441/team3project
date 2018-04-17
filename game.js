var gameStarted = false;
var dif;

$( document ).ready(function() {
    showIntro();

    // Start game on difficulty select
  this.onkeypress = function(e) {
  if (gameStarted == false && e.keyCode == 49 ) { // 49 = Digit1, 50 = Digit2, 51 = Digit3
      dif = 1;
      gameStarted = true;
      gamerun();  
    } else if (gameStarted == false && e.keyCode == 50) {
      dif = 2;
      gameStarted = true;
      gamerun();      
    } else if (gameStarted == false && e.keyCode == 51) {
      dif = 3;
      gameStarted = true;
      gamerun();  
    }  else {
     
    } 
  }
});

function gamerun() {
  init();
}

function step(){
  update();
  draw();
}

function update() {
  if (!movesnake()) {
    die();
    showConclusion(size)
  }
}

function draw() {
  if (gameStarted) {
      screenclear();
      drawsnake();
      drawfood();
  }
}

function showIntro() {
    var canvas = document.getElementById("canvas");
    var ctx=canvas.getContext("2d");
    ctx.font="30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("SNAKE", canvas.width/2, canvas.height/2);

    ctx.font="20px Arial";
    ctx.fillText("press 1, 2 or 3 to start", canvas.width/2, canvas.height/2+40);
}

function showConclusion(score) {
    screenclear();
    var canvas = document.getElementById("canvas");
    var ctx=canvas.getContext("2d");
    ctx.font="30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);
    ctx.fillText("score: " + score, canvas.width/2, canvas.height/2-40);
    ctx.font="20px Arial";
    ctx.fillText("press 1, 2 or 3 to start", canvas.width/2, canvas.height/2+80);
}