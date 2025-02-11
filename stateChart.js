const stateMachine = {
    states: {
        titleScreen: {
            on: {
                questionsUploaded: {
                    target: "showingQuestions"
                }
            }
        },
        question: {
            on: {
                answered: [

                ]
            }
        },
        answerResult: {
            type: "parallel",
            on: {
                continue: [

                ]
            },
            states: {

            }
        }
    },
    initial: "titleScreen",
}
