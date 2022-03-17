const
    o1 = document.querySelector('#op1'),
    o2 = document.querySelector('#op2'),
    o3 = document.querySelector('#op3'),
    o4 = document.querySelector('#op4'),
    answerOptions = [o1, o2, o3, o4],
    questionText = document.querySelector('#question-text'),
    start = document.querySelector('#start'),
    dialog = document.querySelector("#quiz-rules"),
    ul = document.querySelector('.attempts-list'),
    saveClose = document.querySelector('#close-save');
let t = 45, id = 0, attempt = 0,score = 0, ti,
    timerEl = document.querySelector("#timer-text"),
    scoreEl = document.querySelector("#score-text"),
    questions = [{
          id: 0,
          q: "When was javascript created? ",
          a: [{ text: "2003", isCorrect: false },
                { text: "1998", isCorrect: false },
                { text: "1995", isCorrect: true },
                { text: "2001", isCorrect: false }
          ]
    },
          {
                id: 1,
                q: "Which is an example of a use case for javascript? ",
                a: [{ text: "Start a server", isCorrect: false },
                      { text: "Building a native application", isCorrect: false },
                      { text: "Building a database", isCorrect: false },
                      { text: "Manipulating HTML and css properties on a webpage", isCorrect: true }
                ]
          },
          {
                id: 2,
                q: "What does 'DOM' stand for?",
                a: [{ text: "Document Orientation Model", isCorrect: false },
                      { text: "Document Origin Main", isCorrect: false },
                      { text: "Document Object Model", isCorrect: true },
                      { text: "Another term for HTML Element", isCorrect: false }
                ]
          },
          {
                id: 3,
                q: "What does HTML stand for? ",
                a: [{ text: "Hypertext Markup Language", isCorrect: true },
                      { text: "A file always named 'index'", isCorrect: false },
                      { text: "Building a database", isCorrect: false },
                      { text: "Another name for CSS", isCorrect: false }
                ]
          },
          {
                id: 4,
                q: "What is CSS used for? ",
                a: [{ text: "Styling HTML documents", isCorrect: true },
                      { text: "Saving files from the web", isCorrect: false },
                      { text: "Redirecting users on a site to a different page", isCorrect: false },
                      { text: "Translating HTML documents", isCorrect: false }
                ]
          },
    ],
    saveScore = document.querySelector('#name-save'),
    resultDialog = document.querySelector('.results-dialog'),
    started, viewAttempts = document.querySelector('.attempts'),
    attemptsDialog = document.querySelector('.attempts-dialog'),
    storedScore = [],
    nameInput = document.querySelector('#name-input'),
    closeAttempts = document.querySelector("#close-attempts");
function close(d){
      return d.open = false;
}
function open(d){
      return d.open = true;
}
function getAttempts(){
      if (!localStorage.getItem('attempts')){
            let noAttempts = document.createElement('p');
            noAttempts.textContent = "No attempts saved yet";
            attemptsDialog.prepend(noAttempts);
            
      } else
      {
            return storedScore = (JSON.parse(localStorage.getItem('attempts')));
      }
}
function storeAttempt() {
      getAttempts();
      const attempt = {
            name: nameInput.value,
            score: score
      }
      storedScore.push(attempt);
      localStorage.setItem('attempts', JSON.stringify(storedScore));
      nameInput.textContent.replace(nameInput.value, '');
}
function displayScores(){
      getAttempts();
      attemptsDialog.open = true;
      storedScore.forEach(s =>{
            if (storedScore.length <= JSON.parse(localStorage.getItem('attempts')).length) {
                  const li = document.createElement('li');
                  li.className = "attempts-list-name";
                  li.textContent = `Name: ${s.name}`;
                  ul.appendChild(li);
                  const sLi = document.createElement('li');
                  sLi.className = "attempts-list-score";
                  sLi.textContent = `Score: ${s.score}`;
                  ul.appendChild(sLi);
            } else if (document.querySelector('.attempts-list-name')&&document.querySelector('.attempts-list-score')){
                  console.log("already displaying all scores")
            }
      })
}
function Question(id){
      for (let i = 0; i < questions[id].a.length; i++) {
            if (id <= questions.length - 1) {
                  questionText.textContent = questions[id].q;
                  answerOptions[i].textContent = questions[id].a[i].text;
                  answerOptions[i].value = questions[id].a[i].isCorrect;
            }else if (id > questions.length-1){
                  started = false;
            }
      }
}
function startTimer(){
      return ti = setInterval(() =>{
            if (t>0){
                  t--;
                  timerEl.textContent = `Time: ${t}`;
            } else if (t <= 0 || id > questions.length-1){
                  started = false;
                  clearInterval(ti);
                  timerEl.textContent = `Time: ${t}`;
            }
      },1000)
}
function correct(e){
      this.e = e;
      score+=1;
      scoreEl.textContent = `Score: ${score}`;
      this.e.target.style.backgroundColor = "green";
      this.e.target.style.color = "white";
      restoreStyle(e)
}
function incorrect(e){
      e.target.style.backgroundColor = "red";
      e.target.style.color = "white";
      t-=5;
      timerEl.textContent = `Time: ${t}`
      timerEl.style.color = "red";
      restoreStyle(e);
}
function restoreStyle(e) {
            return setTimeout(() => {
                  e.target.style.backgroundColor = "whitesmoke";
                  e.target.style.color = "black";
                  timerEl.style.color = "black";
                  id++;
                  Question(id);
            }, 200);
}
function endQuiz(e) {
      return setTimeout(() => {
            clearInterval(ti)
            console.log("no more questions");
            document.querySelector('.quiz-main').style.display = "none";
            questionText.style.display = "none";
            resultDialog.open = true;
            restoreStyle(e);
            viewAttempts.disabled = false;
      }, 100);
}
function checkAnswer(e) {
            switch (e.target.value) {
                  case "true":
                        return correct(e);
                  case "false":
                        return incorrect(e);
                  default:
                        break;
            }
}
function startQuiz(){
      started = true;
      timerEl.textContent = `Time: ${t}`
      startTimer();
      id = 0; Question(id);
      close(dialog);
      document.querySelector('.quiz-main').style.display = "grid";
      viewAttempts.disabled = true;
}


start.addEventListener('click', startQuiz);

answerOptions.forEach(o => {
      o.addEventListener('click', function(event){
            if (id === questions.length-1){
                  checkAnswer(event);
                  return endQuiz(event);
            }
            else {
                  checkAnswer(event);
            }
      });
});

viewAttempts.addEventListener('click', ()=>{
      attemptsDialog.open = true;
      displayScores();
      close(dialog);
      viewAttempts.disabled = true;
});
closeAttempts.addEventListener('click', () => {
      close(attemptsDialog)
      open(dialog);
      document.querySelectorAll('.attempts-list-name').forEach(e => e.remove());
      document.querySelectorAll('.attempts-list-score').forEach(e => e.remove());
      viewAttempts.disabled = false;
});
saveScore.addEventListener('click', storeAttempt);
saveClose.addEventListener('click', () =>{
      close(resultDialog);
      open(dialog);
});