// a variable for start time
var secondsLeft = 75;

//the element that displays the time
var timeEl = document.getElementById("timeEl")

//start button div
var startButton = document.getElementById("start-button");

// variable for the questions title
var questionBlock = document.getElementById("question-block");

// divs for the choices
var choices0 = document.getElementById("choices0")
var choices1 = document.getElementById("choices1")
var choices2 = document.getElementById("choices2")
var choices3 = document.getElementById("choices3")

// array of divs
var choiceArr = [choices0, choices1, choices2, choices3];

// a variable to accumulate correct answers 
var correctAnswers = 0;

// keeping track of which question we're on
var questionCount = 0;

//keeping score
var score = 0;

// dynamically creating and inserting start button so I can hide it once clicked.
function pageLoad() {
  var start = document.createElement("button");
  start.innerHTML = "Start!"
  startButton.append(start);
}

pageLoad();

startButton.addEventListener("click", setTime);

//Timer starts when the user clicks startButton (see above).
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

//function to load the first question on the page
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

//fuction to load susequent questions on the page (may be unnecessary)
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
      nextQuestion();
  } );
}


//need conditional statments to ditermine of the button clicked is the correct answer.  If the button clicked matches the answer in the object score++

//else decrement secondsLeft by 10

//Need variablesto store the user's score with their initials in local storage


