class Question {
    questionText = "";
    answers = [];
    correctIndex = -1;
    shuffle = true;
    correct = 0;
    incorrect = 0;
    age = Infinity;

    constructor(text, shuffle=true) {
        this.questionText = text;
        this.shuffle = shuffle
    }

    answer(text) {
        this.answers.push(text);
        return this;
    }

    correctAnswer(text) {
        this.answers.push(text);
        this.correctIndex = this.answers.length - 1;
        return this;
    }
}


function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

let questions = [
    new Question("What's 11 * 11?")
        .correctAnswer("121")
        .answer("111")
        .answer("136")
        .answer("108"),

    new Question("What's 11 * 12?")
        .answer("136")
        .correctAnswer("132")
        .answer("121")
        .answer("144"),

    new Question("What's 11 * 13?")
        .correctAnswer("143")
        .answer("144")
        .answer("131")
        .answer("149"),

    new Question("What's 11 * 14?")
        .answer("156")
        .answer("141")
        .correctAnswer("154")
        .answer("162"),

    new Question("What's 11 * 15?")
        .answer("145")
        .answer("169")
        .answer("156")
        .correctAnswer("165"),

    new Question("What's 12 * 12?")
        .answer("132")
        .correctAnswer("144")
        .answer("122")
        .answer("138"),

    new Question("What's 12 * 13?")
        .answer("154")
        .answer("132")
        .correctAnswer("156")
        .answer("123"),

    new Question("What's 12 * 14?")
        .answer("169")
        .answer("158")
        .correctAnswer("168")
        .answer("154"),

    new Question("What's 12 * 15?")
        .answer("170")
        .answer("190")
        .answer("200")
        .correctAnswer("180"),

    new Question("What's 13 * 13?")
        .correctAnswer("169")
        .answer("163")
        .answer("166")
        .answer("173"),

    new Question("What's 13 * 14?")
        .correctAnswer("182")
        .answer("176")
        .answer("192")
        .answer("186"),

    new Question("What's 13 * 15?")
        .correctAnswer("195")
        .answer("190")
        .answer("200")
        .answer("205"),

    new Question("What's 14 * 14?")
        .correctAnswer("196")
        .answer("192")
        .answer("206")
        .answer("184"),

    new Question("What's 14 * 15?")
        .answer("200")
        .correctAnswer("210")
        .answer("195")
        .answer("190"),

    new Question("What's 15 * 15?")
        .answer("215")
        .answer("220")
        .answer("230")
        .correctAnswer("225")
];

shuffle(questions);