import { Button } from "@mui/material";
import { useQuestionsData } from "../hooks/useQuestionsData";
import { useQuestionsStore } from "../store/questions";

export const Footer = () => {

  const { correctAnswers, incorrectAnswers, unanswered } = useQuestionsData();
  const resetQuestions = useQuestionsStore(state => state.resetQuestions);

  return (
    <>
      <header style={{ marginTop: "1rem" }}>
        <span> Correctas: {correctAnswers} ✅ - Incorrectas: {incorrectAnswers} ❌ - Por responder: {unanswered} ❓ </span>
      </header>
      <Button onClick={resetQuestions} sx={{ marginTop: "1rem" }}>Empezar de nuevo</Button>
    </>
  )
}