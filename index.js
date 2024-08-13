//check if index.js is added properly
//alert("Press a key to start the game");
/*$(document).click(function() {
$("h1").css("color", "red");
});*/

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomNumber;
var randomChosenColour;
var level = 0;
var i = 0;

function wrongAction() 
{
    console.log("WRONG : " + level);
    playSound("wrong");
    $("body").addClass("game-over").dequeue().delay(200).queue(function () {
        $("body").removeClass("game-over");
    })

    $("h1").text('Game Over, Press any key to Restart');
    startOver();
}

function startOver() {
    if (gamePattern.length == 0) 
    {
        //The game did not start yet and the player clicked on a button
        level = 0
        return;
    }
    else 
    {
        i = 0;
        level = 0;
        gamePattern.length = 0;
        userClickedPattern.length = 0;
        $(document).one("keypress", function () {
            nextSequence();
        });
    }
}

function checkAnswer(currentLevel) {
    if (currentLevel.length == gamePattern.length) 
    {
        if (gamePattern[i] == currentLevel[i]) 
        {
            console.log("Ok => Next level");
            i = 0;
            userClickedPattern.length = 0;
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
        else 
        {
            wrongAction();
        }
    }

    else if (currentLevel.length <= gamePattern.length) 
    {
        if (gamePattern[i] == currentLevel[i]) 
        {
            console.log("Ok");
            i++;
        }

        else 
        {
            wrongAction();
        }
    }

    else 
    {
        wrongAction();
    }
}

function animatePress(currentColour) {
    console.log("in animatePress " + currentColour);
    $("." + currentColour).addClass("pressed").dequeue().delay(200).queue(function () {
        $("." + currentColour).removeClass("pressed");
    })
}

function nextSequence() 
{
    var tmp = Math.random() * 4;
    randomNumber = Math.floor(tmp);

    //Select a color in the array
    gamePattern.push(buttonColours[randomNumber]);
    randomChosenColour = buttonColours[randomNumber];// 

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    level += 1;
    $("h1").text('LEVEL ' + level);
    console.log(gamePattern);    
}

//Play file name
function playSound(name) 
{
    var fileNameToPlay = "./sounds/" + name + ".mp3";
    var audio = new Audio(fileNameToPlay);
    audio.play();
}

$(".btn").click(function () {
    var userChosenColour = this.id;
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour)
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern);
});

//Program starts here
$(document).one("keypress", function () {
    nextSequence();
});
