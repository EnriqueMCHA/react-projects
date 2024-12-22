import { create } from "zustand";
import { type Question } from "../types";
import confetti from "canvas-confetti";
import { persist } from "zustand/middleware";

interface QuestionsState {
  questions: Question[];
  currentQuestionIndex: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  resetQuestions: () => void;
}

export const useQuestionsStore = create<QuestionsState>()(
  persist(
    (set, get) => {
      return {
        questions: [],
        currentQuestionIndex: 0,
        fetchQuestions: async (limit: number) => {
          const response = await fetch("./data.json");
          const json = await response.json();
          const questions = json
            .sort(() => Math.random() - 0.5)
            .slice(0, limit);

          set({ questions });
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
          const { questions } = get();

          const newQuestions = structuredClone(questions);
          const questionIndex = questions.findIndex((q) => q.id === questionId);
          const questionInfo = newQuestions[questionIndex];
          const isCorrectUserAnswer =
            questionInfo.correctAnswer === answerIndex;
          if (isCorrectUserAnswer) {
            confetti({
              particleCount: 400,
              spread: 100,
              origin: { y: 0.6 },
            });
          }
          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex,
          };

          set({ questions: newQuestions });
        },

        goNextQuestion: () => {
          const { questions, currentQuestionIndex } = get();
          const nextQuestionIndex = currentQuestionIndex + 1;
          if (nextQuestionIndex < questions.length) {
            set({ currentQuestionIndex: nextQuestionIndex });
          }
        },

        goPreviousQuestion: () => {
          const { currentQuestionIndex } = get();
          const previousQuestionIndex = currentQuestionIndex - 1;
          if (previousQuestionIndex >= 0) {
            set({ currentQuestionIndex: previousQuestionIndex });
          }
        },

        resetQuestions: () => {
          set({ questions: [], currentQuestionIndex: 0 });
        },
      };
    },
    {
      name: "questions-storage",
    }
  )
);
