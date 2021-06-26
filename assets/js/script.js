var questions = [
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },

    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },

    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },

    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
]
// Establishing score and question baseline //
var score = 0;
var questionIndex = 0;
// Establishing Global variables tied to HTML elements //
var currentTime = document.querySelector("#currentTime")
var timer = document.querySelector("#startTime")
var questionsDiv = document.querySelector("#questionsDiv")
var wrapper = document.querySelector("#wrapper")
// Establishing variables for timer
var secondsLeft = 76
var holdInterval = 0 
var penalty = 10
// Establishing new variable which will populate the questions/answers to the page
var ulCreate = document.createElement("ul");

// Adding EventListener that will trigger the timer
timer.addEventListener("click", function (){
    if (holdInterval === 0) {
        holdInterval = setInterval(function() {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;
            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                //allDone()
                currentTime.textContent = "Time is up!!";
            }
        }, 1000);
    }
    render(questionIndex)
});

// Adding function that will render the questions to the page
function render(questionIndex) {
    // First we need to clear existing HTML data
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // Now that all info is cleared, we can set the title of the question on the page
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title
        var userChoices = questions[questionIndex].choices
        questionsDiv.textContent = userQuestion;        
    }
    // Now that we have the title, we need to add the choices.
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Now we need an event that will compare the answer to the choices 

function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            // Correct condition 
        } else {
            // Will deduct -5 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
        // Question Index determines number question user is on
        questionIndex++;

        if (questionIndex >= questions.length) {
            // All done will append last page with user stats
            allDone();
            createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
        } else {
            render(questionIndex);
        }
        questionsDiv.appendChild(createDiv);
    
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function allDone() {
    // Clearing all HTML in the div so that we can display a new message in the div
        questionsDiv.innerHTML = "";
    // Clearing the timer    
        currentTime.innerHTML = "";
    
        // Creating the Thanks for playing! heading 
        var createH1 = document.createElement("h1");
        createH1.setAttribute("id", "createH1");
        createH1.textContent = "Thanks for Playing!"
        // Appending the element to the div so that it will appear in the correct place on the page
        questionsDiv.appendChild(createH1);
    
        // Creating the paragraph that will display the final score to the user 
        var createP = document.createElement("p");
        createP.setAttribute("id", "createP");
    
        questionsDiv.appendChild(createP);
    
        // If statement to use timeLeft to calculate the user's score 
        if (secondsLeft >= 0) {
            var timeRemaining = secondsLeft;
            var createP2 = document.createElement("p");
            clearInterval(holdInterval);
            createP.textContent = "Your final score is " + timeRemaining;
    
            questionsDiv.appendChild(createP2);
        }
    
        // Creating the field for the user to enter their initials
        var createLabel = document.createElement("label");
        createLabel.setAttribute("id", "createLabel");
        createLabel.textContent = "Enter your initials: ";
    
        questionsDiv.appendChild(createLabel);
    
        // This is where the user will actually type in their initials
        var createInput = document.createElement("input");
        createInput.setAttribute("type", "text");
        createInput.setAttribute("id", "initials");
        createInput.textContent = "";
    
        questionsDiv.appendChild(createInput);
    
        // submit
        var createSubmit = document.createElement("button");
        createSubmit.setAttribute("type", "submit");
        createSubmit.setAttribute("id", "Submit");
        createSubmit.textContent = "Submit";
    
        questionsDiv.appendChild(createSubmit);
    
        // Event listener to capture initials and local storage for initials and score
        createSubmit.addEventListener("click", function () {
            var initials = createInput.value;
    
            if (initials === null) {
    
                console.log("No value entered!");
    
            } else {
                var finalScore = {
                    initials: initials,
                    score: timeRemaining
                }
                console.log(finalScore);
                var allScores = localStorage.getItem("allScores");
                if (allScores === null) {
                    allScores = [];
                } else {
                    allScores = JSON.parse(allScores);
                }
                allScores.push(finalScore);
                var newScore = JSON.stringify(allScores);
                localStorage.setItem("allScores", newScore);
                // Brings the user to the scorepage upon entry of score
                window.location.replace("./scorePage.html");
            }
        });
    
    }
