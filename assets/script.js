// a variable for start time
let secondsLeft = 75;

//the element that displays the time
let timer = document.getElementById("timer");

//start button div
var startButton = document.getElementById("start-button");

// variable for the questions title
var questionDiv = document.getElementById("question-div");

// divs for the choices
var choices0 = document.getElementById("choices0");
var choices1 = document.getElementById("choices1");
var choices2 = document.getElementById("choices2");
var choices3 = document.getElementById("choices3");

// array of divs where the multiple choice questions will display
var choiceArr = [choices0, choices1, choices2, choices3];

// a variable to accumulate correct answers


// keeping track of which question we're on
var questionCount = 0;

//keeping score
let score = 0

// dynamically creating and inserting start button so I can hide it once clicked.
function pageLoad() {
  //Need to add a class to the button to give it meterialize style
  const start = document.createElement("button");
  start.innerHTML = "Start Quiz!";
  startButton.append(start);
  startButton.addEventListener("click", setTime);
}

//Timer starts when the user clicks startButton (see above).
function setTime() {
  displayQuestions();
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = "Time left: " + secondsLeft;
    if (secondsLeft === 0 || questionCount === 4) {
      clearInterval(timerInterval);
    } 
  }, 1000);
}

//function to load the questions on the page
function displayQuestions() {
  startButton.remove();
  questionDiv.innerHTML = questions[questionCount].title;
  for (let i = 0; i < questions[questionCount].multiChoice.length; i++) {
    let el = document.createElement("button");
    el.innerText = questions[questionCount].multiChoice[i];
    el.setAttribute("data-id", i);
    el.addEventListener("click", function(event) {
      event.stopPropagation();
      if (el.innerText === questions[questionCount].answer) {
        score++;
        console.log(score);
      } else {
        score--;
        secondsLeft = secondsLeft - 30;
        console.log(score);
      }
      choiceArr[questionCount].remove();
      questionDiv.innerHTML = "";
      questionCount++;
      if (questionCount === 4) {
        return;
      } else {
        displayQuestions();
      }
    });
    choiceArr[questionCount].append(el);
  }
}

pageLoad();

//Need variablesto store the user's score with their initials in local storage
