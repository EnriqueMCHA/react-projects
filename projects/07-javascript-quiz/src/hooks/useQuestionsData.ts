import { useQuestionsStore } from "../store/questions";

export const useQuestionsData = () => {
  const questions = useQuestionsStore((state) => state.questions);

  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let unanswered = 0;

  questions.forEach((question) => {
    const { isCorrectUserAnswer, userSelectedAnswer } = question;

    if (userSelectedAnswer == null) unanswered++;
    else if (isCorrectUserAnswer) correctAnswers++;
    else incorrectAnswers++;
  });

  return { correctAnswers, incorrectAnswers, unanswered };
};
