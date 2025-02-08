let currentQuestion = null;
let onResultScreen = false;

function hideResult(event) {
    event.target.parentElement.style.display = "none";
    onResultScreen = false;
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
    selectAnswer(buttonID);
}

function selectAnswer(id) {
    let index = parseInt(id.match(/\d+/));
    console.log(index, currentQuestion.correctIndex);
    let resultBox;
    if (currentQuestion.correctIndex == index) {
        resultBox = document.querySelector("#correct-box");
        currentQuestion.correct++;

    } else {
        document.querySelector("#correct-answer").textContent = currentQuestion.answers[currentQuestion.correctIndex];
        resultBox = document.querySelector("#incorrect-box");
        currentQuestion.incorrect++;
    }

    currentQuestion.age = 0;
    for (question of questions) {
        if (question != currentQuestion) question.age++;
    }

    resultBox.style.display = "";

    populateQuestion(getNextQuestion());
    onResultScreen = true;
}

function populateQuestion(questionInfo) {
    currentQuestion = questionInfo;
    document.querySelector("#question-text").textContent = questionInfo.questionText;

    let answerOptions = [];

    document.querySelector("#answer-choices").textContent = "";
    for (let i = 0; i < questionInfo.answers.length; i++) {
        let answerText = questionInfo.answers[i];
        let answerOption = document.createElement("div");
        answerOption.classList.add("answer-button");
        answerOption.id = `answer${i}`;
        answerOption.innerText = answerText;
        answerOption.addEventListener("click", onQuestionClick);
        answerOptions.push(answerOption);
    }

    if (questionInfo.shuffle) shuffle(answerOptions);
    document.querySelector("#answer-choices").append(...answerOptions);
}

function hideAllResults() {
    document.querySelectorAll(".result-dialog").forEach(element => element.style.display = "none");
    onResultScreen = false;
}

function setup() {
    document.querySelectorAll(".continue-button").forEach(button => button.addEventListener("click", hideResult));
    document.addEventListener("keydown", e => {
        if (e.code.toLowerCase() == "space") hideAllResults();
        if (onResultScreen) return;
        const digit = e.code.match(/\d/);
        console.log(e.code)
        console.log(digit);
        if (!digit) return;

        selectAnswer(document.querySelector("#answer-choices").children[parseInt(digit[0]) - 1].id);
    })

    populateQuestion(getNextQuestion());
}