var gamePattern = [];
var userClickedPattern=[];
var buttonColours = ["red", "blue", "green", "yellow"];
var level=0;
var started=false;
var seq=0;
$(document).keypress(function(){
  if(!started)
  {
      $("h1").text("Level "+(level));
      started=true;
      newSequence();
  }
});
function newSequence() {
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $( "#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  /*$( "#"+ randomChosenColour).fadeTo( 40 , 0, function() {
    $(this).fadeTo(40, 1);
  });*/
  playSound(randomChosenColour);
}
// switch (randomChosenColour) {
//   case "red":
//     var audio = new Audio("sounds/red.mp3");
//     audio.play();
//     break;
//   case "blue":
//     var audio = new Audio("sounds/blue.mp3");
//     audio.play();
//     break;
//   case "green":
//     var audio = new Audio("sounds/green.mp3");
//     audio.play();
//     break;
//   case "yellow":
//     var audio = new Audio("sounds/yellow.mp3");
//     audio.play();
//     break;
//   default:
//
// }

$(".btn").on("click",function(event){
  var userChosenColour=$(this).attr("id");
  /*alert("button clicked"+userChosenColour);*/
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColour){
$("#"+currentColour).addClass("pressed");
setTimeout(function(){
  $("#"+currentColour).removeClass("pressed");
},100);
}
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    /*console.log("success");*/
    if(userClickedPattern.length===gamePattern.length)
    {
      setTimeout(function(){
        newSequence();
      },1000);
    }

  }
  else
  {
    /*console.log("wrong");*/
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }

}
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
  $("h1").text("Game Over, Press Any Key to Restart");
}
