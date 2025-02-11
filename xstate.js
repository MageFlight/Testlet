import { createMachine } from "xstate";

export const machine = createMachine({
  context: {},
  id: "Untitled",
  initial: "Title Screen",
  states: {
    "Title Screen": {
      on: {
        questionSelected: {
          target: "Showing Question",
        },
      },
    },
    "Showing Question": {
      on: {
        Answered: [
          {
            target: "Correct Screen",
            guard: {
              type: "correct",
            },
          },
          {
            target: "Incorrect Screen",
          },
        ],
      },
    },
    "Correct Screen": {
      on: {
        Continue: [
          {
            target: "Showing Question",
            guard: {
              type: "not last question",
            },
          },
          {
            target: "Summary",
          },
        ],
      },
    },
    "Incorrect Screen": {
      type: "parallel",
      states: {
        Locked: {
          on: {
            "Timeout Reached": {
              target: "Unlocked",
            },
          },
        },
        Unlocked: {
          on: {
            Continue: [
              {
                target: "#Untitled.Showing Question",
                guard: {
                  type: "not last question",
                },
              },
              {
                target: "#Untitled.Summary",
              },
            ],
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
  },
}).withConfig({
  guards: {
    "not last question": function (context, event) {
      // Add your guard condition here
      return true;
    },
    correct: function (context, event) {
      // Add your guard condition here
      return true;
    },
  },
});
