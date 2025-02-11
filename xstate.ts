import { setup } from "xstate";

export const machine = setup({
  types: {
    context: {} as {},
    events: {} as
      | { type: "Answered" }
      | { type: "Continue" }
      | { type: "questionSetSelected" }
      | { type: "continue" },
  },
  guards: {
    incorrect: function ({ context, event }) {
      // Add your guard condition here
      return true;
    },
    questionsLeft: function ({ context, event }) {
      // Add your guard condition here
      return true;
    },
  },
}).createMachine({
  context: {},
  id: "main",
  initial: "Title Screen",
  states: {
    "Title Screen": {
      on: {
        questionSetSelected: {
          target: "Showing Question",
        },
      },
    },
    "Showing Question": {
      on: {
        Answered: {
          target: "resultScreen",
        },
      },
    },
    resultScreen: {
      initial: "Locked",
      states: {
        Locked: {
          after: {
            "2000": [
              {
                target: "Unlocked",
                guard: {
                  type: "incorrect",
                },
              },
              {
                target: "#main.progressGuard",
              },
            ],
          },
        },
        Unlocked: {
          on: {
            continue: {
              target: "#main.progressGuard",
            },
          },
        },
      },
    },
    Summary: {
      on: {
        Continue: {
          target: "Showing Question",
        },
      },
    },
    progressGuard: {
      always: [
        {
          target: "Showing Question",
          guard: {
            type: "questionsLeft",
          },
        },
        {
          target: "Summary",
        },
      ],
    },
  },
});

