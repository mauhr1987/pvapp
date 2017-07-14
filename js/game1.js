const gameHeader = '<div id="game-header"><h2>Beginner</h2></div>';
var currentView = document.getElementById('game-by-definitions');
var pVerbs = pverbs;
var length = pVerbs.length;
var clueOneEnable = true;
var clueTwoEnable = true;
var coins = 3;
var verbPoints = 4;
var currentVerb, verbPointsId, coinsId;
var userScore = 0;
var scoresArray = [];

function getNextVerb(currentVerb = 0, length, next) {
   switch (next) {
     case 'next': return (currentVerb + 1);
     default:     return currentVerb;
   }
}

function randomVerbs(){
    pVerbs.sort(function(a, b){return 0.5 - Math.random()});
    getNewVerbAndRender(pVerbs);
}

function getNewVerbAndRender(next) {
    currentVerb = getNextVerb(currentVerb, length, next);
    verbPoints = 4;
    let html = gameHeader;
        html += '<div id="score-bar"><div id="verb-score" class="col-xs-6">' + '+' + verbPoints + '</div>' +
        '<div id="game-coins" class="col-xs-6">' + coins + '</div>' +
        '</div>' +
        '<div class="container"><div id="verb-definition"><span>' +
        pVerbs[currentVerb].definition +
        '</span></div>' +
        '<div id="verb-input"><input id="verb-answer" type="text">' +
        '</input><button id="check-answer" onclick="checkAnswer()">Go</button></div>' +
        '<ul id="verb-clues">' +
        '<li id="four-options" onclick="applyClue(this)"><span class="glyphicon glyphicon-th-large" aria-hidden="true"></span></li>' +
        '<li id="hint-option" onclick="applyClue(this)"><span class="glyphicon glyphicon-text-color" aria-hidden="true"></li>' +
        '</div></div>';
        currentView.innerHTML = html;
        coinsId = document.getElementById('game-coins');
        verbPointsId = document.getElementById('verb-score');
    disableClues();
}

function gameSummary(){
    //Get Verb list
    var summaryTotal = userScore + coins;
    let html = '<div id="game-header"><h2>Summary</h2></div>';
    html += '<div class="row">' +
    '<div class="col-md-8">Phrasal verb</div>' +
    '<div class="col-md-4">Score</div>' +
    '</div>'
    html += '<div class="row">' +
    '<div class="col-md-8"><ul>';
    for (let i = 0; i < length; i++) {
        html += '<li>' + pVerbs[i].name + '</li>'; 
    };
    html += '</ul></div>';
    //Get Scores
    html += '<div class="col-md-4"><ul>'
    for (let i = 0; i < scoresArray.length; i++) {
        html += '<li>'+ '+' + scoresArray[i] + '</li>';        
    };
    html += '</ul></div>' +
    '<div class="row">' +
    '<div class="col-md-8"><span>Subtotal</span><span>Kept Coins</span><span>YOUR SCORE</span></div>' +
    '<div class="col-md-4">' +
    '<span>' + userScore + '</span>' +
    '<span>' + coins + '</span>' +
    '<span>' + summaryTotal + '</span>'
    '</div></div>';
    currentView.innerHTML = html;
}

function checkAnswer(){
    let inputAnswer = document.getElementById('verb-answer').value.toLowerCase();
    let correctAnswer = pVerbs[currentVerb].name.toLowerCase();
    if (/\S/.test(inputAnswer)) {
        let userRightgAnswer = '<div id="user-answer" class="right-answer"><span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>Your answer: <strong>' + inputAnswer + '</strong></div>';
        let userWrongAnswer = '<div id="user-answer" class="wrong-answer"><span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>Your answer: <strong>' + inputAnswer + '</strong></div>';
        let verbNameAnswer = '<div id="verb-name-answer"><span>' + pVerbs[currentVerb].name +'</span></div>';
        let htmlNextButton = '<button id="next-verb" class="btn btn-primary">next</button>';
        let htmlDoneButton = '<button id="game-over" onclick="gameSummary()">done</button>';
        if (currentVerb < length - 1) {
            if (inputAnswer == correctAnswer) {
                let html = gameHeader + 
                '<div id="score-bar"><div id="verb-score" class="col-xs-6">' + '+' + verbPoints + '</div>' +
                '<div id="game-coins" class="col-xs-6">' + coins + '</div>' +
                '</div>' +
                '<div class="container">' +
                userRightgAnswer + verbNameAnswer + htmlNextButton +
                '</div>';                
                currentView.innerHTML = html;
            }else{
                verbPoints = 0;
                let html = gameHeader + 
                '<div id="score-bar"><div id="verb-score" class="col-xs-6">' + '+' + verbPoints + '</div>' +
                '<div id="game-coins" class="col-xs-6">' + coins + '</div>' +
                '</div>' +
                '<div class="container">' +
                userWrongAnswer + verbNameAnswer + htmlNextButton +
                '</div>';                 
                currentView.innerHTML = html;
            }
            var nextButton = document.getElementById("next-verb");
            nextButton.onclick = function() { getNewVerbAndRender('next') };
        }else{
            if (inputAnswer == correctAnswer) {
                let html = gameHeader + 
                '<div id="score-bar"><div id="verb-score" class="col-xs-6">' + '+' + verbPoints + '</div>' +
                '<div id="game-coins" class="col-xs-6">' + coins + '</div>' +
                '</div>' +
                '<div class="container">' +
                userRightgAnswer + verbNameAnswer + htmlDoneButton +
                '</div>';               
                currentView.innerHTML = html;
            }else{
                verbPoints = 0;
                let html = gameHeader + 
                '<div id="score-bar"><div id="verb-score" class="col-xs-6">' + '+' + verbPoints + '</div>' +
                '<div id="game-coins" class="col-xs-6">' + coins + '</div>' +
                '</div>' +
                '<div class="container">' +
                userWrongAnswer + verbNameAnswer + htmlDoneButton +
                '</div>';              
                currentView.innerHTML = html;
            }
        }
        clueOneEnable = true;
        clueTwoEnable = true;
        userScore += verbPoints;
        scoresArray.push(verbPoints);
    }
}

function disableClues(){
    var clueOne = document.getElementById('four-options');
    var clueTwo = document.getElementById('hint-option');
    if (coins < 1) {
        clueOne.classList.add("clue-used");
    }
    if (coins < 2) {
        clueTwo.classList.add("clue-used");
    }
}

function applyClue(currentObject){
    if (currentObject.id == 'four-options' && clueOneEnable) {
        clueOne();
        currentObject.classList.add("clue-used");
        clueOneEnable = false;
    }
    if (currentObject.id == 'hint-option' && clueTwoEnable) {
        clueTwo();
        currentObject.classList.add("clue-used");
        clueTwoEnable = false;
    }
    disableClues();
}

function clueOne(){
    if (coins >= 1) {
        verbPoints -= 1;
        verbPointsId.innerHTML = '+' + verbPoints;
        coins -= 1;
        coinsId.innerHTML = coins;
        var currentDefinition = document.getElementById('verb-definition');
        var originalDefinition = currentDefinition.innerHTML;
        currentDefinition.innerHTML = 'test';
        setTimeout(function() {
            currentDefinition.innerHTML = originalDefinition;
        }, 5000);
    }
}

function clueTwo(){
    if (coins >= 2) {
        verbPoints -= 2;
        verbPointsId.innerHTML = '+' + verbPoints;
        coins -= 2;
        coinsId.innerHTML = coins;
        var strVerb = pVerbs[currentVerb].name;
        var divStr = strVerb.split(" ", 2);
        var strHint = divStr[0];
        var gameInput = document.getElementById('verb-answer');
        gameInput.value = strHint;
    }
}

randomVerbs();
