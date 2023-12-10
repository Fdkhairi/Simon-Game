let buttonColours=['red','blue','green','yellow'];//the four colors that will be generated ramdomly

let userClickedPattern =[];//user clicked pattern empty array and add the user clicked pattern

let gamePattern=[];//we get an empty array to push what ever color is added

let started =false;
let level = 0;


$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
    started = true;
    }
  });

  $(".btn").on('click',function(){
    let userChosenColour=  $(this).attr("id");// target the element that is being clicked on 
    userClickedPattern.push(userChosenColour);//add this to the empty array above created for user clicked pattern 
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

 });

 function checkAnswer(currentLevel){//if the user entered value same as computer generated value go to next level after 1000 milli second interval
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){       
    if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);
}
    }
else {
        playSound("wrong");
    
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },50);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
}
}


function nextSequence(){//function created to generate random numbersfrom 0 to 3.
    userClickedPattern=[];//reset the array again for next level

level++
$("#level-title").text("Level " + level);

let randomNumber=Math.floor(Math.random()*4);

let randomChosenColour = buttonColours[randomNumber];//using the radnom number generator function we select the random color from the array of colors

gamePattern.push(randomChosenColour);//then what ever color we get we push to the empty array and keep adding it 


$(`#${randomChosenColour}`).fadeOut(50).fadeIn(50);//animate the button using the following radnom

playSound(randomChosenColour);

}

/////////////////////////////////////////////////////

function playSound(name){//play sound function when both starting the next sequence and by user too
    var audio = new Audio(`./sounds/${name}.mp3`);

    audio.play();
}



function animatePress(currentColour){//when button pressed function add color and remove it to make it look like highlighted

    $(`#${currentColour}`).addClass("pressed");
   
   
    setTimeout(function(){//time out to remove the class 

        $(`#${currentColour}`).removeClass("pressed");
            },100);
}


function startOver(){
     level =0;
     gamePattern=[];
     started=false;
}


