let currentQuestion = null;
let currentBlock = [];
let blockIndex = 0;

function hideResult(event) {
    event.target.parentElement.style.display = "none";
}

function getNextQuestion() {
    let questionPriority = currentBlock.toSorted((a, b) => {
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
    for (question of currentBlock) {
        if (question != currentQuestion) question.age++;
    }

    resultBox.style.display = "";

    let answeredQuestions = 0;
    let confidentQuestions = 0;
    let totalViews = 0;
    let totalCorrect = 0;
    for (question of currentBlock) {
        let views = question.correct + question.incorrect
        totalViews += views;
        totalCorrect += question.correct;
        answeredQuestions += Math.min(views, 2) / 2;
        confidentQuestions += views > 0 ? question.correct / views >= 0.65 : 0;
    }

    answeredQuestions /= currentBlock.length;
    confidentQuestions /= currentBlock.length
    console.log(answeredQuestions, confidentQuestions, totalCorrect / totalViews);
    document.querySelector("#answered-questions").style.width = `${answeredQuestions * 100}%`;
    document.querySelector("#correct-percentage").style.width = `${totalCorrect / totalViews * 100}%`;

    if (confidentQuestions == 1 && answeredQuestions == 1 && totalCorrect / totalViews >= .8) {
        populateSummary();
        blockIndex += 10;
        reloadBlock();
    }

    populateQuestion(getNextQuestion());
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

function populateSummary() {
    console.log("populating summary");
    let summary = [];
    for (question of currentBlock) {
        let questionSummary = document.createElement("template");
        // TODO: Security
        let confidence = question.correct / (question.correct + question.incorrect) * 100;
        questionSummary.innerHTML = `<div class="summary-item">
            <div class="summary-question">${question.questionText}</div>
            <div class="confidence-summary">
                <div class="confidence-bar">
                    <div style="width:${confidence}%"></div>
                </div>
                <span>${confidence.toFixed(0)}%</span>
            </div>
        </div>`;
        summary.push(questionSummary.content);
    }

    document.querySelector("#summary").textContent = '';
    document.querySelector("#summary").append(...summary);
    document.querySelector("#block-summary").style.display = '';
}

function hideAllResults() {
    document.querySelectorAll(".result-dialog").forEach(element => element.style.display = "none");
}

function reloadBlock() {
    document.querySelector("#answered-questions").style.width = '0%';
    document.querySelector("#correct-percentage").style.width = '0%';

    if (blockIndex + currentBlock.length == questions.length - 1) {
        return false;
    }

    let endIndex = Math.min(blockIndex + 10, questions.length - 1);
    currentBlock = questions.slice(blockIndex, endIndex);
    return true;
}

function setup() {
    document.querySelectorAll(".continue-button").forEach(button => button.addEventListener("click", hideResult));
    document.addEventListener("keydown", e => {
        if (e.code.toLowerCase() == "space") hideAllResults();
        for (screen of document.querySelectorAll(".post-question")) {
            console.log(screen.style.display);
            if (!screen.style.display) return;
        }
        const digit = e.code.match(/\d/);
        if (!digit) return;

        selectAnswer(document.querySelector("#answer-choices").children[parseInt(digit[0]) - 1].id);
    })

    reloadBlock();
    populateQuestion(getNextQuestion());
}