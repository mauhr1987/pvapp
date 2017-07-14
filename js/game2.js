var pVerbs = pverbs;
var length = pVerbs.length;
var verbPoints = 1;
var currentVerb, verbPointsId, showAnswer, inputAnswerValue, attemptsCounter, scoreVerb;
var userScore = 0;
var scoresArray = [];
var currentView = document.getElementById('game-by-sentences');

var synth = window.speechSynthesis;
var inputTxt = document.querySelector('#verb-answer');

function randomVerbs(){
    pVerbs.sort(function(a, b){return 0.5 - Math.random()});
    getNewVerbAndRender(pVerbs);
}

function getNewVerbAndRender(next) {
    verbPointsId = document.getElementById('verb-score');
    let verbExample = document.getElementById('verb-example');
    let verbMeaning = document.getElementById('verb-meaning');
    let verbTranslation = document.getElementById('verb-translation');
    currentVerb = getNextVerb(currentVerb, length, next);
    verbPoints = 1;
    let searchStr = pVerbs[currentVerb].name;
    let searchStrLenght = searchStr.length;
    let replaceStr = '<span class="input-container"><span class="answer-background"><span>' + pVerbs[currentVerb].name.toLowerCase() + '</span></span><span class="answer-word-container">' + pVerbs[currentVerb].name.toLowerCase() + '</span><input id="verb-answer" type="text" onkeydown="readInput(this, event)" maxlength="' + searchStrLenght + '"></span>';
    let reg = new RegExp(searchStr, "i");
    verbPointsId.innerHTML = '+' + verbPoints;
    verbExample.innerHTML = '<span>' + pVerbs[currentVerb].example.replace(reg, replaceStr) + '</span>';
    verbTranslation.innerHTML = '<span>' + pVerbs[currentVerb].translation + '</span>';
    verbMeaning.innerHTML = '<span>' + pVerbs[currentVerb].meaning + '</span>';
    inputAnswerValue = document.getElementById('verb-answer');
    inputAnswerValue.focus();
    setTimeout(function(){
      attemptsCounter = 0;
    }, 0);
}

function getNextVerb(currentVerb = 0, length, next) {
   switch (next) {
     case 'next': return (currentVerb + 1);
     default:     return currentVerb;
   }
}

function readInput(el, e) {
  let inputAnswer = document.getElementById('verb-answer').value.toLowerCase();
  let correctAnswer = pVerbs[currentVerb].name.toLowerCase();
  showAnswer = document.querySelector('.answer-word-container');
  showAnswer.style.opacity = "0";
  if (e.keyCode == 13 && /\S/.test(inputAnswer)) {
    if (inputAnswer == correctAnswer) {
      verbPointsId.innerHTML = '+' + verbPoints;
      attemptsCounter++;
      speakAndContinue(inputAnswerValue);
      if (attemptsCounter == 1) {
        scoresArray.push(verbPoints);
      }
      // if (attemptsCounter > 1) {
      //   pVerbs[currentVerb].attempts -= 1;
      // }
    }else{
      verbPoints = 0;
      attemptsCounter++;
      verbPointsId.innerHTML = '+' + verbPoints;
      speakAnswer(inputAnswerValue);
      if (attemptsCounter == 1) {
        scoresArray.push(verbPoints);
      }
      // if (attemptsCounter <= 1) {
      //   pVerbs[currentVerb].attempts += 1;
      // }
    }
    if (attemptsCounter == 1) {
      userScore += verbPoints;
    }
  }
}

function speakAndContinue(answer) {
  answer.value = '';
  showAnswer.style.color = "#00d038";
  showAnswer.style.opacity = "1";
  var utterThis = new SpeechSynthesisUtterance(pVerbs[currentVerb].example);
  var voices = synth.getVoices();
  if (navigator.appVersion.indexOf("Mac")!=-1){
    utterThis.voice = voices[0];
  }else{
    utterThis.voice = voices[3];
  }
  synth.speak(utterThis);
  utterThis.onend = function(event) {
    if (currentVerb < length - 1) {
      getNewVerbAndRender('next');
    }else{
      gameSummary();
    }
  }
}

function speakAnswer(answer) {
  answer.value = '';
  showAnswer.style.color = "#ff0200";
  showAnswer.style.opacity = "0.5";
  var utterThis = new SpeechSynthesisUtterance(pVerbs[currentVerb].name);
  var voices = synth.getVoices();
  if (navigator.appVersion.indexOf("Mac")!=-1){
    utterThis.voice = voices[0];
  }else{
    utterThis.voice = voices[3];
  }
  synth.speak(utterThis);
}

function gameSummary(){
    //Get Verb list
    let html = '<div id="game-header"><h2>Summary</h2></div>';
    html += '<div id="summary-box-heading">' +
    '<div id="verb-list" class="col-xs-8">Phrasal verb</div>' +
    '<div id="verb-scores" class="col-xs-4">Score</div>' +
    '</div>'
    html += '<div id="summary-box">' +
    '<div class="col-xs-8"><ul>';
    for (let i = 0; i < length; i++) {
        html += '<li>' + pVerbs[i].name + '</li>'; 
    };
    html += '</ul></div>';
    //Get Scores
    html += '<div class="col-xs-4"><ul>'
    for (let i = 0; i < scoresArray.length; i++) {
        html += '<li>'+ '+' + scoresArray[i] + '</li>';        
    };
    html += '</ul></div>' +
    '<div id="summary-box-footer">' +
    '<div id="summary-data-heading" class="col-xs-8"><span>YOUR SCORE</span></div>' +
    '<div id="summary-data-scores" class="col-xs-4">' +
    '<span>' + '+' + userScore + '</span>' +
    '</div></div>';
    currentView.innerHTML = html;
}

randomVerbs();