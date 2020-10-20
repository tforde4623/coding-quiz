// save html elements to variable for easier access
let listEl = document.querySelector('#highscore-list');
let clearBtnEl = document.querySelector('#clear');

// listener for when the clear button is clicked
clearBtnEl.addEventListener('click', function() {
    localStorage.removeItem('highscores');
    // reload to show changes
    location.reload();
});

// if no scores, don't grab any, if there are, grab them
scores = JSON.parse(localStorage.getItem('highscores')) || [];

// take the array we just got and sort it by integer
if(scores.length > 0){
    scores.sort(function(score1, score2) {
        tempNum = score2.score - score1.score;
        return tempNum;
    });
}

// create a score list el and append to high scores parent on html page
for(let i = 0; i < scores.length; i++) {
    let tempScore = document.createElement('li');
    tempScore.textContent = `${scores[i].name}: ${scores[i].score} points`;
    listEl.appendChild(tempScore);
}



