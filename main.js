let questions = [
    {
        question: "What's the meaning of life?",
        answers: [
            "idk", "death", "taxes", "work"
        ],
        correctAnswer: 0,
        shuffle: true,
    },
    {
        question: "What the flip is that",
        answers: [
            "egg", "gge", "lock", "rock"
        ],
        correctAnswer: 3,
        shuffle: true,
    },
    {
        question: "True or False: You are addicted",
        answers: [
            "True", "False"
        ],
        correctAnswer: 0,
    },
    {
        question: "What is 532 * 1205 + 53?",
        answers: [
            "669,256", "641,113", "544,102", "712,821"
        ],
        correctAnswer: 1,
        shuffle: true,
    },
    {
        question: "Are we there yet?",
        answers: [
            "No", "Not yet", "Nah", "Yesn't"
        ],
        correctAnswer: 2,
    },
    {
        question: "What's the best operating system?",
        answers: [
            "Windows", "MacOS", "GNU Linux"
        ],
        correctAnswer: 2,
        shuffle: true,
    }
];

function onQuestionClick(event) {
    let buttonID = event.target.id;
    let info = buttonID.split(";");
    let question = parseInt(info[0]);
    let answerChoice = parseInt(info[1]);

    let resultBox;
    if (questions[question].correctAnswer == answerChoice) {
        resultBox = document.querySelector("#correct-box");
    } else {
        document.querySelector("#correct-answer").textContent = questions[question].answers[questions[question].correctAnswer];
        resultBox = document.querySelector("#incorrect-box");
    }

    resultBox.style.display = "";

    populateQuestion(question + 1);
}

function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

function populateQuestion(question) {
    let questionInfo = questions[question];
    document.querySelector("#question-text").textContent = questionInfo.question;

    let answerOptions = [];

    document.querySelector("#answer-choices").textContent = "";
    for (let i = 0; i < questionInfo.answers.length; i++) {
        let answerText = questionInfo.answers[i];
        let answerOption = document.createElement("div");
        answerOption.classList.add("answer-button");
        answerOption.id = `${question};${i}`;
        answerOption.innerText = answerText;
        answerOption.addEventListener("click", onQuestionClick);
        answerOptions.push(answerOption);
    }

    shuffle(answerOptions);
    document.querySelector("#answer-choices").append(...answerOptions);
}