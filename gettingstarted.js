// start this at 0 and increment this each time a question is asked and answered...
// this acts as a pointer to the current question, similar to 'i' in a for loop
var questions = 0;

function renderQuestion() {
    // shortcut variable to an individual question (the current question)
    var question = questions[questionNum]; 

    // div to hold the question and all of its answers, will later be inserted into the HTML
    var questionDiv = document.createElement("div");

    // paragraph to hold question
    var questionP = document.createElement("p"); 
    questionP.textContent = question.text;
    questionDiv.appendChild(questionP)

    // paragraph to hold first answer
    var answer1 = document.createElement("p");
    answer1.textContent = question.answer1;
    questionDiv.appendChild(answer1)

    // ^^^ repeat above for all four answers, then: ^^^

    // after the question and all four answers are appended to the questionDiv,
    // put the questionDiv on the page!
    document.querySelector(".your-div-to-insert-in-here").innerHTML = questionDiv;
}

// A different ID for each answer
// four buttons with the question