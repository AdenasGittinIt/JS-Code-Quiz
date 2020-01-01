// a variable for start time
let secondsLeft = 76;

//the element that displays the time
let timer = document.getElementById("timer");

//button to view high scores
let highScores = document.getElementById("high-scores");

//start button div
var startButton = document.getElementById("start-button");

// variable for the questions title
var questionDiv = document.getElementById("question-div");

// div to hold the results
let results = document.getElementById("results");

// divs for the choices
var choices0 = document.getElementById("choices0");
var choices1 = document.getElementById("choices1");
var choices2 = document.getElementById("choices2");
var choices3 = document.getElementById("choices3");

// array of divs where the multiple choice questions will display
var choiceArr = [choices0, choices1, choices2, choices3];

// an array to store high scores
let emptyArray = [];

let storedArray = JSON.parse(window.localStorage.getItem("highScores"));



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
  let timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = "";
    timer.textContent = "Time: " + secondsLeft;
    if (secondsLeft <= 0 || questionCount === questions.length) {
      clearInterval(timerInterval);
      displayUserScore();
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
        score += secondsLeft;
        console.log(score);
      } else {
        score -= 10;
        secondsLeft = secondsLeft - 15;
        console.log(score);
      }
      choiceArr[questionCount].remove();
      questionDiv.innerHTML = "";
      questionCount++;
      if (questionCount === questions.length) {

        return;
      } else {
        displayQuestions();
      }
    });
    choiceArr[questionCount].append(el);
  }
}

function displayUserScore() {
  timer.remove();
  
  let initialsInput = document.createElement("input");
  let submitBtn = document.createElement("input");

  results.innerHTML = `You scored ${score} points! Enter initials: `;
  initialsInput.setAttribute("type","text");
  submitBtn.setAttribute("type", "button");
  submitBtn.setAttribute("value", "Post Score!");
  submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    let scoresArray = correctArray(storedArray,emptyArray)

    let initials = initialsInput.value;
    let userAndScore = {
      initials: initials,
      score: score,
    } 

    scoresArray.push(userAndScore);
    handleScores(scoresArray);

  })
  results.append(initialsInput);  
  results.append(submitBtn);

}


const handleScores = (array) => {
  window.localStorage.setItem("highScores", JSON.stringify(array));
}

let correctArray = function(arr1,arr2) {
  if(arr1 === null){
    return arr2
  } else {
    return arr1
  }
}

pageLoad();
