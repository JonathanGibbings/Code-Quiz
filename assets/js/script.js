// time limit for quiz
var countLength = 5;
var questionCounter = 0;
var startBtnEl = document.querySelector(".start-btn");
var quizAreaEl = document.querySelector("#quiz-area");
var questionsList = [
    {
        question: "Question 1 is 4?",
        ans1: "answer 1 ahsdfvoaiuyfd",
        ans2: "answer 2",
        ans3: "answer 3",
        ans4: "answer 4",
        numAns: 4,
        answer: "ans4"
    },
    {
        question: "Question 2 is 3?",
        ans1: "answer 1",
        ans2: "answer 2",
        ans3: "answer 3",
        ans4: "answer 4",
        numAns: 4,
        answer: "ans3"
    }
]

// Runs countdown till end of quizLength set at top
var countdown = function() {
    var timerEl = document.querySelector("#timer");
    timerEl.innerHTML = "Time: " + countLength;
    var interval = setInterval(decrement, 1000);
    function decrement() {
        timerEl.innerHTML = "Time: " + countLength;
        if (countLength < 1) {
            clearInterval(interval);
            endQuiz(countLength);
        }
        countLength--;
    }
}

// Starts quiz by starting countdown, shuffling questions, and pulling first question
var startQuiz = function() {
    var introEl = document.querySelector("#intro-box");
    introEl.remove();
    countdown();
    randomizeQuestions();
    nextQuestion();
}

// randomizes the order of the questions in the array
var randomizeQuestions = function() {}

// puts the next question on the screen
var nextQuestion = function() {
    if (questionCounter < questionsList.length - 1 ) {
        var quizEl = document.createElement("section");
        quizEl.className = "quiz-box";
        quizAreaEl.appendChild(quizEl);

        var questionEl = document.createElement("h1");
        questionEl.innerText = questionsList[questionCounter].question;
        quizEl.appendChild(questionEl);

        var ansBoxEl = document.createElement("div");
        ansBoxEl.className = "ans-box";
        quizEl.appendChild(ansBoxEl);

        for (var i=1; i <= questionsList[questionCounter].numAns; i++) {
            eval("var ansBtn" + i + " = document.createElement('button');");
            eval("ansBtn" + i + ".className = 'btn ans-btn';");
            eval("ansBtn" + i + ".id = 'ans" + i + "';");
            eval("ansBtn" + i + ".innerText = questionsList[questionCounter].ans" + i + ";");
            eval("ansBoxEl.appendChild(ansBtn" + i + ");");
        }
    } else {
        endQuiz(countLength);
    }
}
// removes current question
var removeQuestion = function() {
    var quizEl = document.querySelector(".quiz-box");
    quizEl.remove();
    questionCounter++;
}

// brings up the highscore screen
var endQuiz = function(score) {
    console.log("IT'S OVER!");
}

// checks if answer is correct
var ansCheck = function(event) {
    // gets what answer was clicked
    var targetEl = event.target;
    // checks if target was an answer button
    if (targetEl.matches(".ans-btn")) {
        // finds correct answer from object
        var correct = questionsList[questionCounter].answer
        // removes current question and increments question count
        removeQuestion();
        // brings next question up
        nextQuestion();
        // creates elements to show evaluation of answer
        var ansBoxEl = document.querySelector(".ans-box");
        var hRuleEl = document.createElement("hr");
        hRuleEl.className = "ruler";
        ansBoxEl.appendChild(hRuleEl);
        var evalEl = document.createElement("h2");
        evalEl.className = "evaluation";
        // checks if answers match and shows evaluation
        if (targetEl.id === correct) {
            evalEl.innerText = "Correct";
            ansBoxEl.appendChild(evalEl);
            console.log("correct");
        } else {
            console.log("Wrong");
            evalEl.innerText = "Wrong";
            ansBoxEl.appendChild(evalEl);
        }
    }
}

// event listeners for buttons
startBtnEl.addEventListener("click", startQuiz);
quizAreaEl.addEventListener("click", ansCheck);