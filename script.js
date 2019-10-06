// a variable to hold the time display
var secondsLeft = 75;

//variable for my start button
var startButton = document.getElementById("start-button");

//creating a button dynamically so I can clear it later
// var startButton = document.createElement("button");
// startButton.innerHTML = "Start!";
// startButton.append("Start!");

var questionBlock = document.getElementById("question-block");
var timeEl = document.getElementById("timeEl")
var choices = document.getElementById("choices")
// a variable to accumulate correct answers 
var correctAnswers = "place-holder"



// creating my button dynamically so I an hide it after it's clicked.
function pageLoad() {
  var start = document.createElement("button");
  start.innerHTML = "Start!"
  startButton.append(start);
}

pageLoad();
startButton.addEventListener("click", setTime);


function startQuiz() {
  for (var i = 0; i < questions.length; i++) {
    questionBlock.innerHTML = questions[0].title
    var el = document.createElement("button");
    choices.appendChild(el)
  
    el.innerHTML = questions[i].choices[i];

  }
};


function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = "Time left: " + secondsLeft;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
    }

  }, 1000);
  startQuiz();
  startButton.remove();
}









