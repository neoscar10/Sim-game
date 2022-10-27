var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var started = false;



$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickPattern.push(userChosenColor);
  playSound(userChosenColor)

  function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")
    setTimeout(function() {
      $("#" + currentColour).removeClass("pressed")
    }, 100)
  }
  animatePress(userChosenColor)

  checkAnswer(userClickPattern.length - 1)
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    if (userClickPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
      userClickPattern = [];
    }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")
    },200);
    $("h1").text("Game Over, Press The Button To Restart")
    $("h2").text("Restart Game");
    $("button").show();
    startOver();
  }
};

// Restart Game
function startOver(){
  level = 0;
  userClickPattern = []
  gamePattern = [];
  started = false;

};

function startGame(){
  if (!started){
    nextSequence();
    started = true;
    $("h1").text("Level "+ level)
  }
};

$("button").click(startGame);


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

// function to select a random number between 0-3
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  // increasing the level anytime this function is called
  level++;
  $("h1").text("Level " + level)
  $("button").hide()
};
