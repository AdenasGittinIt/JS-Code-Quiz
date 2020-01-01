// a variable for start time
let secondsLeft = 76;

//the element that displays the time
let timer = document.getElementById("timer");

//div for high scores
let scoresDiv = document.getElementById("scores-div");

let buttonsDiv = document.getElementById("buttons")

//button for high scores
let viewScoresBtn = document.getElementById("view-scores")

//start button div
let startButton = document.getElementById("start-button");
startButton.addEventListener("click", setTime);


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

// the array from local storage
let storedArray = JSON.parse(window.localStorage.getItem("highScores"));

// keeping track of which question we're on
var questionCount = 0;

//keeping score
let score = 0



//Timer starts when the user clicks startButton (see above).
function setTime() {
  displayQuestions();
  let timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = "";
    timer.textContent = "Time: " + secondsLeft;
    if (secondsLeft <= 0 || questionCount === questions.length) {
      clearInterval(timerInterval);
      captureUserScore();
    } 
  }, 1000);
}

//function to load the questions on the page
function displayQuestions() {
  removeEls(startButton);
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

function captureUserScore() {
  timer.remove();

  
  let initialsInput = document.createElement("input");
  let postScoreBtn = document.createElement("input");

  results.innerHTML = `You scored ${score} points! Enter initials: `;
  initialsInput.setAttribute("type","text");
  postScoreBtn.setAttribute("type", "button");
  postScoreBtn.setAttribute("value", "Post My Score!");
  postScoreBtn.addEventListener("click", function(event) {
    event.preventDefault();
    let scoresArray = defineScoresArray(storedArray,emptyArray)

    let initials = initialsInput.value;
    let userAndScore = {
      initials: initials,
      score: score,
    } 

    scoresArray.push(userAndScore);
    saveScores(scoresArray);
    displayAllScores();
    clearScoresBtn();
    goBackBtn();
    viewScoresBtn.remove();
  })
  results.append(initialsInput);  
  results.append(postScoreBtn);

}

const saveScores = (array) => {
  window.localStorage.setItem("highScores", JSON.stringify(array));
}

const defineScoresArray = (arr1, arr2) => {
  if(arr1 !== null) {
    return arr1
  } else {
    return arr2
  }
}

const removeEls = (...els) => {
  for (let el of els) el.remove();
}

function displayAllScores() {
  removeEls(timer, startButton, results);
  let scoresArray = defineScoresArray(storedArray, emptyArray);

  scoresArray.forEach(obj => {
    let initials = obj.initials;
    let storedScore = obj.score;
    let resultsP = document.createElement("p");
    resultsP.innerText = `${initials}: ${storedScore}`;
    scoresDiv.append(resultsP);
  });

  // iterate through array and create divs or p elements for each object that displays initials and score
}

function viewScores() {
  viewScoresBtn.addEventListener("click", function(event) {
    event.preventDefault();
    removeEls(timer, startButton);
    displayAllScores();
    removeEls(viewScoresBtn);
    clearScoresBtn();
    goBackBtn();
  });
}

function clearScoresBtn() {    
  let clearBtn = document.createElement("input");
  clearBtn.setAttribute("type", "button");
  clearBtn.setAttribute("value", "Clear Scores");
  clearBtn.addEventListener("click", function(event){
    event.preventDefault();
    removeEls(scoresDiv);
    window.localStorage.removeItem("highScores");
  })
  scoresDiv.append(clearBtn)
}

function goBackBtn() {
  let backBtn = document.createElement("input");
  backBtn.setAttribute("type", "button");
  backBtn.setAttribute("value", "Go Back");
  backBtn.addEventListener("click", function(event){
    event.preventDefault();
    window.location.reload();
  })
  buttonsDiv.append(backBtn)
}


viewScores();
