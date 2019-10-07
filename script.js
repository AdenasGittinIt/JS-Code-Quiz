// a variable to hold the time display
var secondsLeft = 75;

//variable for my start button div
var startButton = document.getElementById("start-button");

var questionBlock = document.getElementById("question-block");
var timeEl = document.getElementById("timeEl")

var choices0 = document.getElementById("choices0")
var choices1 = document.getElementById("choices1")
var choices2 = document.getElementById("choices2")
var choices3 = document.getElementById("choices3")

var choiceArr = [choices0, choices1, choices2, choices3];

// adding a click event to the choices div


// a variable to accumulate correct answers 
var correctAnswers = 0;


var questionCount = 0;
var score = 0;



// creating my button dynamically so I an hide it after it's clicked.
function pageLoad() {
  var start = document.createElement("button");
  start.innerHTML = "Start!"
  startButton.append(start);
}

pageLoad();

startButton.addEventListener("click", setTime);

//Timer that starts when the user clicks to start the quiz
function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = "Time left: " + secondsLeft;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);

  startQuiz();
  startButton.remove();
}


function startQuiz() {
  questionBlock.innerHTML = questions[questionCount].title;
  for (var i = 0; i < questions[questionCount].multiChoice.length; i++) {
    var el = document.createElement("button");
    el.innerHTML = questions[questionCount].multiChoice[i];
    choiceArr[questionCount].append(el);
  }
  choiceArr[questionCount].addEventListener("click", function(){
    choiceArr[questionCount].remove();
    questionBlock.innerHTML = "";
    questionCount ++;
    nextQuestion();
  } );
};

function nextQuestion() {
  questionBlock.innerHTML = questions[questionCount].title;
  for (var i = 0; i < questions[questionCount].multiChoice.length; i++) {
    var el = document.createElement("button");
    el.innerHTML = questions[questionCount].multiChoice[i];
     choiceArr[questionCount].append(el);
  }
    choiceArr[questionCount].addEventListener("click", function(){
      choiceArr[questionCount].remove();
      questionBlock.innerHTML = "";
      questionCount ++;
  } );
}









//after the user clicks a queston increment the queston count by 1 the re-run start quiz with the next question and answer set.


//when the user clicks an answer the question count increments 1 then a function will run to insert the question answer block with an index number that corresponds with the next question.

// var question = questions[0].title;
// var questionP = document.createElement("p");
// questionP.textContent = question.text;
// questionBlock.appendChild(questionP);



