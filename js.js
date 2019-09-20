//javascript.js
var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
//if we click on the start/reset
document.getElementById("startreset").onclick = function(){
    //if you are playing
    if(playing == true){
        //reload page
        location.reload();
    }else{ //if we are not playing
        playing = true;
        //set score to 0
        score=0;
        document.getElementById("scorevalue").innerHTML = score;
        //show countdown box
        show("timeremaining");
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        hide("gameover");
        //change button to reset
        document.getElementById("startreset").innerHTML = "Reset Game";
        //reduce time by 1sec in loop
        startcountdown();
        generate();
    }
}   

for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
    //check if we are playing     
    if(playing == true){//yes
        if(this.innerHTML == correctAnswer){
        //correct answer
            
            //increase score by 1
            score++;
            document.getElementById("scorevalue").innerHTML = score;
            //hide wrong box and show correct box
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");   
            }, 1000);            
            generate();
        }else{
        //wrong answer
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");   
            }, 1000);
            score--;
            document.getElementById("scorevalue").innerHTML = score;
            generate();
        }
    }
}   
}

function startcountdown(){
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0){
            stopcountdown();
            document.getElementById("scoreshow").innerHTML = score;
            show("gameover");
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing=false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000)
}
function stopcountdown(){
    clearInterval(action);
}
function hide(Id){
    document.getElementById(Id).style.display = "none";
}
function show(Id){
    document.getElementById(Id).style.display = "block";
}
function generate(){
    var x = 1+ Math.round(9*Math.random());
    var y = 1+ Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1+ Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer
    
    //fill other boxes with wrong answers
    
    var answers = [correctAnswer];
    
    for(i=1; i<5; i++){
        if(i != correctPosition) {
            var wrongAnswer;
            do{
                wrongAnswer = (1+ Math.round(9*Math.random()))*(1+ Math.round(9*Math.random())); //a wrong answer
            }while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}