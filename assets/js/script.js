// time limit for quiz
var countLength = 75;
// index tracker for questionList array
var questionCounter = 0;
var questionsList = [
    {
        question: "Which is the proper HTML element used to call a javascript file?",
        ans1: "1. <script>",
        ans2: "2. <javascript>",
        ans3: "3. <javafile>",
        ans4: "4. <file>",
        ans5: "5. <js>",
        numAns: 5,
        answer: "ans1"
    },
    {
        question: "What is the correct section to insert a JavaScript?",
        ans1: "1. Both the <head> and <body>",
        ans2: "2. <body>",
        ans3: "3. <head>",
        numAns: 3,
        answer: "ans1"
    },
    {
        question: "Which is not a way to create a function?",
        ans1: "1. function aFunction()",
        ans2: "2. function = aFunction()",
        ans3: "3. var aFunction = function()",
        ans4: "4. function.aFunction()",
        ans5: "5. both 2 and 4",
        numAns: 5,
        answer: "ans5"
    },
    {
        question: "What are two types of loops?",
        ans1: "1. for and while",
        ans2: "2. do and loop",
        ans3: "3. while and repeat",
        ans4: "4. repeat and for",
        numAns: 4,
        answer: "ans1"
    },
    {
        question: "Which is not one of the JavaScript primitive values?",
        ans1: "1. Number",
        ans2: "2. Boolean",
        ans3: "3. Date",
        ans4: "4. Symbol",
        ans5: "5. String",
        numAns: 5,
        answer: "ans3"
    },
    {
        question: "Boolean(!x) will return true when x is which value?",
        ans1: "1. x = true",
        ans2: "2. x = 'false'",
        ans3: "3. x = 0",
        ans4: "4. x = '!'",
        numAns: 4,
        answer: "ans3"
    },
    {
        question: "Which function would you call to get a random number?",
        ans1: "1. Math.random()",
        ans2: "2. getRandom()",
        ans3: "3. Random('number')",
        ans4: "4. random.num()",
        numAns: 4,
        answer: "ans1"
    },
    {
        question: "How would you combine two arrays?",
        ans1: "1. .concat",
        ans2: "2. .join",
        ans3: "3. .combine",
        ans4: "4. .fuse",
        numAns: 4,
        answer: "ans1"
    },
    {
        question: "What will the output of console.log(typeof NaN)?",
        ans1: "1. NaN",
        ans2: "2. number",
        ans3: "3. null",
        ans4: "4. undefined",
        numAns: 4,
        answer: "ans2"
    }
]
// var for score tracking
var scores = [];
// elements for event listeners
var quizAreaEl = document.querySelector("#quiz-area");
var headerEl = document.querySelector("#header");
var bodyEl = document.querySelector("#body");


// Runs countdown till end of quizLength set at top
var countdown = function() {
    var timerEl = document.querySelector("#timer");
    timerEl.innerHTML = "Time: " + countLength;
    var interval = setInterval(decrement, 1000);
    function decrement() {
        countLength--;
        timerEl.innerHTML = "Time: " + countLength;
        if (countLength <= 0) {
            // stops timer
            clearInterval(interval);
            // resets time to 0 if negative
            countLength = 0;
            timerEl.innerHTML = "Time: " + countLength;

            removeQuestion();
            endQuiz(countLength);
        }
        if (questionCounter >= questionsList.length) {
            clearInterval(interval);
            endQuiz(countLength);
        }

    }
}

// Starts quiz by starting countdown, shuffling questions, and pulling first question
var startQuiz = function() {
    var introEl = document.querySelector("#intro-box");
    introEl.remove();
    countdown();
    randomizeQuestions(questionsList);
    nextQuestion();
}

// brings up the highscore screen
var endQuiz = function(score) {
    // creates a box for the other elements
    var resultsBoxEl = document.createElement("section");
    resultsBoxEl.className = "results-box";
    quizAreaEl.appendChild(resultsBoxEl);
    // shows the results
    var doneEl = document.createElement("h1");
    doneEl.innerText = "All done!";
    resultsBoxEl.appendChild(doneEl);
    var resultsEl = document.createElement("p");
    resultsEl.innerText = "Your final score is " + score + ".";
    resultsBoxEl.appendChild(resultsEl);
    // form for saving scores
    var formEl = document.createElement("form");
    formEl.className = ("form-box");
    resultsBoxEl.appendChild(formEl);
    var labelEl = document.createElement("label");
    labelEl.setAttribute("for", "initials");
    labelEl.innerText = "Enter initials: ";
    formEl.appendChild(labelEl);
    var inputEl = document.createElement("input");
    inputEl.setAttribute("id", "initials");
    inputEl.setAttribute("name", "initials");
    inputEl.setAttribute("maxlength", "3");
    formEl.appendChild(inputEl);
    var submitBtnEl = document.createElement("button");
    submitBtnEl.setAttribute("name", "Submit");
    submitBtnEl.setAttribute("type", "Submit");
    submitBtnEl.className = "btn submit-btn";
    submitBtnEl.innerText = "Submit";
    formEl.appendChild(submitBtnEl);
}

// randomizes the order of the questions in the array with Fisher-Yates algorithm
var randomizeQuestions = function(array) {
    for (var i = array.length -1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// puts the next question on the screen
var nextQuestion = function() {
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
}
// removes current question
var removeQuestion = function() {
    var quizEl = document.querySelector(".quiz-box");
    quizEl.remove();
    questionCounter++;
}

// checks if answer is correct
var ansCheck = function(target) {
    // gets what  was clicked
    var targetEl = target;
    // finds correct answer from object
    var correct = questionsList[questionCounter].answer
    // removes current question and increments question count
    removeQuestion();
    if (questionCounter < questionsList.length && countLength > 0) {
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
        } else {
            evalEl.innerText = "Wrong";
            ansBoxEl.appendChild(evalEl);
            countLength -= 10;
        }
    }
}

// checks what was clicked
var eventHandler = function(event) {
    // gets what  was clicked
    var targetEl = event.target;
    // runs function based on what was clicked
    if (targetEl.matches(".start-btn")) {
        startQuiz();
    } else if (targetEl.matches(".ans-btn")) {
        ansCheck(targetEl);
    } else if (targetEl.matches(".submit-btn")) {
        event.preventDefault();
        // initializes and fills object
        var userScore = {
            player: "",
            score: 0
        };
        userScore.player = document.querySelector("input[name='initials']").value;
        userScore.score = countLength;
        // adds object to array
        scores.push(userScore);
        saveScore();
        showScores();
    } else if (targetEl.matches(".back-btn")) {
        location.reload();
    } else if (targetEl.matches(".delete-btn")) {
        deleteScores();
    }
}

// dynamically changes screen to show top scores
var showScores = function() {
    // clears screen
    quizAreaEl.remove();
    headerEl.remove();
    // adds score elements
    var scoreBoxEl = document.createElement("section");
    scoreBoxEl.setAttribute("id", "score-box");
    bodyEl.appendChild(scoreBoxEl);
    var highScoreEl = document.createElement("h1");
    highScoreEl.innerText = "High Scores";
    scoreBoxEl.appendChild(highScoreEl);
    var scoreListEl = document.createElement("ul");
    scoreBoxEl.appendChild(scoreListEl);
    for (var i = 0; i , i < scores.length; i++) {
        var scoreItemEl = document.createElement("li");
        scoreItemEl.innerHTML = (i+1) + ". " + scores[i].player + " - " + scores[i].score;
        scoreListEl.appendChild(scoreItemEl);
    }
    // add buttons for return and delete
    var goBackBtn = document.createElement("button");
    goBackBtn.className = "btn back-btn";
    goBackBtn.innerText = "Go Back";
    scoreBoxEl.appendChild(goBackBtn);
    var deleteBtn = document.createElement("button");
    deleteBtn.className = "btn delete-btn";
    deleteBtn.innerText = "Clear high scores";
    scoreBoxEl.appendChild(deleteBtn);
}

// sets the screen to the home start screen for the quiz
var introScreen = function() {
    var introBoxEl = document.createElement("section");
    introBoxEl.setAttribute("id", "intro-box");
    quizAreaEl.appendChild(introBoxEl);
    var introTitle = document.createElement("h1");
    introTitle.innerText = "Coding Quiz Challenge";
    introBoxEl.appendChild(introTitle);
    var introInstruct = document.createElement("p");
    introInstruct.innerText = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    introBoxEl.appendChild(introInstruct);
    var startBtn = document.createElement("button");
    startBtn.innerText = "Start Quiz";
    startBtn.className = "btn start-btn";
    introBoxEl.appendChild(startBtn);
}

// saves scores to local storage
var saveScore = function() {
    scores.sort(function(a, b) {
        return b.score - a.score;
    });
    localStorage.setItem("scores", JSON.stringify(scores));
    // loadScores();
}

// loads scores from local storage
var loadScores = function() {
    var savedScores = localStorage.getItem("scores");
    if (!savedScores) {
        return false
    }
    savedScores = JSON.parse(savedScores);
    for (i = 0; i < savedScores.length; i++) {
        scores.push(savedScores[i]);
    }
}

// deletes scores from storage
var deleteScores = function() {
    localStorage.removeItem("scores");
    var scoreListEl = document.querySelector("ul")
    scoreListEl.remove();
}
introScreen();
loadScores();
// event listeners for buttons
bodyEl.addEventListener("click", eventHandler);
headerEl.addEventListener("click", showScores);