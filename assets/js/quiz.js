const
    o1 = document.querySelector('#op1'),
    o2 = document.querySelector('#op2'),
    o3 = document.querySelector('#op3'),
    o4 = document.querySelector('#op4'),
    answerOptions = [o1, o2, o3, o4],
    questionText = document.querySelector('#question-text'),
    start = document.querySelector('#start'),
    dialog = document.querySelector("#quiz-rules");
let t = 45, id = 0,
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
    score = 0,
    resultDialog = document.querySelector('.rules-dialog'),
    started, viewAttempts = document.querySelector('.attempts'),
    attemptsDialog = document.querySelector('.attempts-dialog'),
    attempt = 0;

//functions
class Quiz{
    static nextQuestion(id){
        this.id = id;
        for (let i = 0; i < questions[id].a.length; i++) {
            if (questions[id].a.length === undefined){
                questionText.style.display = "none";
                answerOptions[i].style.display = "none";
                document.querySelector('.rules-dialog').open = true;
            }
            if (id <= questions.length-1) {
                questionText.textContent = questions[id].q;
                answerOptions[i].textContent = questions[id].a[i].text;
                answerOptions[i].value = questions[id].a[i].isCorrect;
            }
        }
    }
}

function closeDialog(dialogElement){
    if (dialogElement.open){
        return dialogElement.open = false;
    }
}
function startTimer(){
    let ti;
    return ti = setInterval(() =>{
        if (t>0){
            t--;
            timerEl.textContent = `Time: ${t}`;
        } else if (t <= 0 || started === false){
            clearInterval(ti);
            timerEl.textContent = `Time: ${t}`;
        }
    },1000)
}

//event listeners//
start.addEventListener('click', (e) =>{
    id = 0; t = 45;
    if (e.target.parentElement === dialog){
        closeDialog(dialog);
        startTimer();
        Quiz.nextQuestion(id);
        for (let i = 0; i < answerOptions.length; i++) {
            answerOptions[i].style.display = "grid";
            questionText.style.display = "grid";
        }

    }
});

answerOptions.forEach((o) => {
    o.addEventListener('click', function(event){
        if (event.target.value === "false"){
            event.target.style.backgroundColor = "red";
            setTimeout(() =>{
                event.target.style.backgroundColor = "lightgray";
            }, 100);
            t-=5;
            timerEl.textcontent = `Time: ${t}`;
            id++;
            Quiz.nextQuestion(id);
        } else if (event.target.value === "true") {
            setTimeout(() =>{
                event.target.style.backgroundColor = "lightgray";
            }, 100);
            score++;
            scoreEl.textContent = `Score: ${score}`
            id++;
            event.target.style.backgroundColor = "green";
            if (id <= questions.length-1)
                Quiz.nextQuestion(id);
            if (id > questions.length-1){
                resultDialog.open = true;
                answerOptions.forEach((ops) =>{
                    ops.style.display = "none";
                    questionText.style.display = "none";
                })
            }
        }

    });
});

saveScore.addEventListener('click', function(){

    localStorage.setItem(`attempt # ${attempt+=1}`, JSON.stringify({
        name: document.querySelector("#name-input").value,
        score: score
    }));
    document.querySelector("#name-input").value = "";
    score = 0; scoreEl.textContent = `Score: ${score}`;
    id = 0;
    dialog.open = true;
    resultDialog.open = false;
});
    viewAttempts.addEventListener('click', function(){
        attemptsDialog.textContent = `${JSON.parse(localStorage.getItem(`attempt # 1`)).name}`+ "  :  "+`${JSON.parse(localStorage.getItem(`attempt # 1`)).score}`
        attemptsDialog.open = true;
    });