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
    ];

//functions
class Quiz{
    static nextQuestion(id){
        this.id = id;
        for (let i = 0; i < questions[id].a.length; i++) {
            questionText.textContent = questions[this.id].q;
            answerOptions[i].textContent = questions[id].a[i].text;
            answerOptions[i].value = questions[id].a[i].isCorrect;
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
        } else if (t <= 0){
            clearInterval(t);
            timerEl.textContent = `Time: ${t}`;
        }
    },1000)
}

//event listeners//
start.addEventListener('click', (e) =>{
    console.log(' yes ');
    if (e.target.parentElement === dialog){
        closeDialog(dialog);
        startTimer();
        Quiz.nextQuestion(id);
    }
});

answerOptions.forEach((o) => {
    return o.addEventListener('click', function(event){
        if (event.target.value === "false"){
            t-=5;
            timerEl.textcontent = `Time: ${t}`;
            id++;
            Quiz.nextQuestion(id);
        } else {

            id++;
            Quiz.nextQuestion(id);
        }
    });
});