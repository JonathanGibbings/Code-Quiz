// time limit for quiz
var countLength = 15;
var startBtnEl = document.querySelector(".start-btn");
var quizAreaEl = document.querySelector("#quiz-area");
// index tracker for question array
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

// Runs countdown till end of quizLength set at top
var countdown = function() {
    var timerEl = document.querySelector("#timer");
    timerEl.innerHTML = "Time: " + countLength;
    var interval = setInterval(decrement, 1000);
    function decrement() {
        timerEl.innerHTML = "Time: " + countLength;
        if (countLength < 1) {
            clearInterval(interval);
            removeQuestion();
            endQuiz(countLength);
        }
        if (questionCounter >= questionsList.length) {
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
    randomizeQuestions(questionsList);
    nextQuestion();
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

// brings up the highscore screen
var endQuiz = function(score) {
    // creates a box for the other elements
    console.log("IT'S OVER!");
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
        if (questionCounter < questionsList.length) {
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
            }
        }
    }
}

// event listeners for buttons
startBtnEl.addEventListener("click", startQuiz);
quizAreaEl.addEventListener("click", ansCheck);