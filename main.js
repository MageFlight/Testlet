let questions = [
    {
        question: "What's the meaning of life?",
        answers: [
            "idk", "death", "taxes", "work"
        ],
        correctAnswer: 0,
        shuffle: true,
        correct: 0,
        incorrect: 0,
        age: Infinity,
    },
    {
        question: "What the flip is that",
        answers: [
            "egg", "gge", "lock", "rock"
        ],
        correctAnswer: 3,
        shuffle: true,
        correct: 0,
        incorrect: 0,
        age: Infinity,
    },
    {
        question: "True or False: You are addicted",
        answers: [
            "True", "False"
        ],
        correctAnswer: 0,
        correct: 0,
        incorrect: 0,
        age: Infinity,
    },
    {
        question: "What is 532 * 1205 + 53?",
        answers: [
            "669,256", "641,113", "544,102", "712,821"
        ],
        correctAnswer: 1,
        shuffle: true,
        correct: 0,
        incorrect: 0,
        age: Infinity,
    },
    {
        question: "Are we there yet?",
        answers: [
            "No", "Not yet", "Nah", "Yesn't"
        ],
        correctAnswer: 2,
        correct: 0,
        incorrect: 0,
        age: Infinity,
    },
    {
        question: "What's the best operating system?",
        answers: [
            "Windows", "MacOS", "GNU Linux"
        ],
        correctAnswer: 2,
        shuffle: true,
        correct: 0,
        incorrect: 0,
        age: Infinity,
    }
];

function hideResult(event) {
    event.target.parentElement.style.display = "none";
}

function getNextQuestion() {
    let questionPriority = questions.toSorted((a, b) => {
        let totalA = a.correct + a.incorrect;
        let totalB = b.correct + b.incorrect;
        let scoreA = totalA == 0 ? -1 : a.correct / totalA;
        let scoreB = totalB == 0 ? -1 : b.correct / totalB;

        if (scoreA - scoreB != 0) return scoreA - scoreB;

        return b.age - a.age;
    });

    console.log(questionPriority);

    for (question of questionPriority) {
        if (question.age > 3) return question;
    }

    return questionPriority[0];
}

function onQuestionClick(event) {
    let buttonID = event.target.id;
    let info = buttonID.split(";");
    let questionNum = parseInt(info[0]);
    let answerChoice = parseInt(info[1]);

    let questionInfo = questions[questionNum];

    let resultBox;
    if (questionInfo.correctAnswer == answerChoice) {
        resultBox = document.querySelector("#correct-box");
        questionInfo.correct++;

    } else {
        document.querySelector("#correct-answer").textContent = questionInfo.answers[questionInfo.correctAnswer];
        resultBox = document.querySelector("#incorrect-box");
        questionInfo.incorrect++;
    }

    questionInfo.age = 0;
    for (question of questions) {
        if (question != questionInfo) question.age++;
    }

    resultBox.style.display = "";

    populateQuestion(getNextQuestion());
}

function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

function populateQuestion(questionInfo) {
    document.querySelector("#question-text").textContent = questionInfo.question;

    let answerOptions = [];

    document.querySelector("#answer-choices").textContent = "";
    for (let i = 0; i < questionInfo.answers.length; i++) {
        let answerText = questionInfo.answers[i];
        let answerOption = document.createElement("div");
        answerOption.classList.add("answer-button");
        answerOption.id = `${questions.indexOf(questionInfo)};${i}`;
        answerOption.innerText = answerText;
        answerOption.addEventListener("click", onQuestionClick);
        answerOptions.push(answerOption);
    }

    if (questionInfo.shuffle) shuffle(answerOptions);
    document.querySelector("#answer-choices").append(...answerOptions);
}

function setup() {
    document.querySelectorAll(".continue-button").forEach(button => button.addEventListener("click", hideResult));
    populateQuestion(getNextQuestion());
}