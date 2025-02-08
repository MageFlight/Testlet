let questions = [
    {
        question: "What's the meaning of life?",
        answers: [
            "idk", "death", "taxes", "work"
        ]
    }
];

function populateQuestion(question) {
    questionInfo = questions[question];
    document.querySelector("#question-text").textContent = questionInfo.question;
    
}