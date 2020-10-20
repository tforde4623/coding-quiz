// save html elements in variables for easier access
// !!!!! NEED TO MAKE THE ALERT FLASH AND THEN GO TO NEXT PAGE, CHECK LAST
// !!!!! QUESTION FOR EXAMPLE
let startBtnEl = document.querySelector('#start-quiz');
let timeEl = document.querySelector('#time');
let questionEl = document.querySelector('#quiz-screen');
let answersEl = document.querySelector('#answers');
let unSubmitEl = document.querySelector('#submit-userName');
let usernameEl = document.querySelector('#userName');
let startScreenEl = document.querySelector('#start-screen');
let alertEl = document.querySelector('#alert');


// questions object
let Questions = [{
    'questionHead':'Temporary question!! What is your favorite color? Hope its not shitty!',
    'answers':['shit-brown', 'diarrea-green', 'piss-yellow', 'ass-pink'],
    'correctAnswer':'shit-brown'
}, {
    'questionHead':'Temporary question!! What is your favorite color? Hope its not shitty!',
    'answers':['shit-brown', 'diarrea-green', 'piss-yellow', 'ass-pink'],
    'correctAnswer':'shit-brown'
}];

// initiate interval ID function to access throughout
let interval;
// assuming 5 questions 5x20
let timeLeft = 100;

// listener to start game when start button is pressed
startBtnEl.addEventListener('click', function(event) {
    event.preventDefault();
    // hide start screen
    startScreenEl.setAttribute('class', 'notCurrent');

    // set questions screen to current screen
    questionEl.setAttribute('class', 'current');

    // push STARTING time to counter, only happens once
    timeEl.textContent = timeLeft;

    // start the timer and set interval to tic every second
    interval = setInterval(function(){

        // time counting down by interval of 1 second
        timeLeft--;
        
        // changing timer in corner every second
        timeEl.textContent = timeLeft;

        if(timeLeft <= 0) {
            end();
        }

    }, 1000);

    // call function to handle question page and get question
    questionPage();
});
// !!! create a function to handle attributes in question page function! !!!


// listeners to submit name and score if submit or enter is pressed
usernameEl.addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
        submit();
    }
});

unSubmitEl.addEventListener('click', submit);


// to allow grabbing of FIRST current question
let questionIndex = 0;

// function to handle questions div and draw from 'questions' object
function questionPage() {

    // re assigning element to object
    let qHeaderEl = document.querySelector('#qHead');
    // push qHeader to screen (in qHeaderEl)
    qHeaderEl.textContent = Questions[questionIndex].questionHead;

    // get rid of last questions, or they'll stack, really took awhile to figure out why lol
    answersEl.textContent = '';

    // setting answer choices
    for(let i = 0; i < Questions[questionIndex].answers.length; i++) {
        let choiceBtn = document.createElement('button');
        choiceBtn.setAttribute('class', 'inline-button');
        // set value to answer in button
        choiceBtn.setAttribute('value', `${Questions[questionIndex].answers[i]}`)
        // create a varibale to pass through onclick attrbt so we can access arg in function
        let answrNum = `btnClick(${i})`
        choiceBtn.setAttribute('onclick', answrNum);
        choiceBtn.textContent = Questions[questionIndex].answers[i];
        answersEl.appendChild(choiceBtn);
    }

}

// init. outside function, so I can use it in another function
//let responseStatus;
function btnClick(btnPressed) {
    let responseStatus;
    // note: btnPressed arguement will return number 0-3 if 4 answers so we can compare
    // save current question to variable for easier access
    let currentQuestion = Questions[questionIndex];
    // compare which button was pressed (index to answer) to corrent answer
    if(currentQuestion.answers[btnPressed] !== currentQuestion.correctAnswer) {
        timeLeft -= 20;
        //test
        console.log('Question Wrong')
        // if incorrect
        responseStatus = 'Wrong';

        // in case subtract 20 brings it below 0
        if(timeLeft < 0) {
            timeLeft = 0;
        }
    } else {
        //test
        console.log('Question Right')
        // if correct
        responseStatus = 'Correct';

    }

    document.querySelector('#alert').textContent = `You are ${responseStatus}!`;
    document.querySelector('#alert').setAttribute('class', 'current');
    let timeOut = setTimeout(function() {
        document.querySelector('#alert').setAttribute('class', 'notCurrent')
    }, 750);


    // move to next question after comparison
    questionIndex++;

    if(questionIndex === Questions.length) {
        // if last question
        end();
    } else {
        // render next question on page!
        questionPage();
    }
}


function end() {
    // stop the time (if theres time left)
    // need to update score (when the game ends in case you got the last question wrong)
    timeEl.textContent = timeLeft;
    clearInterval(interval); // had id from variable
    document.querySelector('#quiz-screen').setAttribute('class', 'notCurrent');
    document.querySelector('#end-screen').setAttribute('class', 'current');
}

// put this in a function instead of a listener instead of having two
// of the same listeners, I was repeating myself doing that
function submit() {
    if(usernameEl.value.length > 0){
        // if we already have scores, get them, if not, lets create some in this array here
        let currentScores = JSON.parse(localStorage.getItem('highscores')) || [];

        // push new score as an object (JSON format) to empty list or other scores
        currentScores.push({score: timeLeft, name: usernameEl.value});
        let scores = JSON.stringify(currentScores);
        localStorage.setItem('highscores', scores);
        location.href = 'scorePage.html';
    } else {
        // flash a message if they don't put in any initials/ a name
        document.querySelector('#alert').textContent = `Please input valid initials to submit.`;
        document.querySelector('#alert').setAttribute('class', 'current');
        let timeOut = setTimeout(function() {
            document.querySelector('#alert').setAttribute('class', 'notCurrent')
        }, 3000);
    }
}

