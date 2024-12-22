import { Button } from "@mui/material"
import { useQuestionsStore } from "../store/questions"

const LIMIT_QUESTIONS = 10;

export const Start = () => {

  const fetchQuestions = useQuestionsStore(state => state.fetchQuestions);

  return (
    <Button onClick={() => fetchQuestions(LIMIT_QUESTIONS)} variant="contained" sx={{ marginTop: "2rem" }}>
      Comenzar
    </Button>
  )
}