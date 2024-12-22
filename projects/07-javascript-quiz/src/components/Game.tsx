import { Card, IconButton, List, ListItemButton, ListItemText, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useQuestionsStore } from "../store/questions";
import { type Question } from "../types";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Footer } from "./Footer";


const getBackgroundColor = ({ question, index }: { question: Question, index: number }) => {

  const { userSelectedAnswer, correctAnswer } = question;

  if (userSelectedAnswer == null) return "transparent";
  if (index !== correctAnswer && index !== userSelectedAnswer) return "transparent";
  if (index === correctAnswer) return "green";
  if (index === userSelectedAnswer) return "red";
  return "transparent";
}

const Question = ({ info }: { info: Question }) => {

  const selectAnswer = useQuestionsStore(state => state.selectAnswer);

  const theme = useTheme();
  const medium = useMediaQuery(theme.breakpoints.up("sm"));

  const handleSelectAnswer = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  }

  return (
    <Card variant="outlined" sx={{ marginTop: "2rem", minHeight: "400px", width: medium ? "auto" : "100vw" }}>
      <Typography variant="h5" component="h2" sx={{ padding: "1rem" }}>
        {info.question}
      </Typography>

      <SyntaxHighlighter language="javascript" style={oneDark}>
        {info.code}
      </SyntaxHighlighter>

      <List>
        {info.answers.map((answer, index) => (
          <ListItemButton key={index} onClick={handleSelectAnswer(index)} disabled={info.userSelectedAnswer != null} sx={{ backgroundColor: getBackgroundColor({ question: info, index }) }}>
            <ListItemText sx={{ textAlign: "center" }}>
              {answer}
            </ListItemText>
          </ListItemButton>
        ))}
      </List>

    </Card>
  )
}

// https://www.tiktok.com/@darka.113/video/7296255748256861446?lang=en

export const Game = () => {

  const questions = useQuestionsStore(state => state.questions);
  const currentQuestionIndex = useQuestionsStore(state => state.currentQuestionIndex);
  const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion);
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion);

  const questionInfo = questions[currentQuestionIndex];

  return (
    <>
      <Footer />

      <Question info={questionInfo} />

      <Stack direction={"row"} gap={2} justifyContent={"center"} sx={{ marginTop: "2rem" }}>
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestionIndex === 0}>
          <ArrowBackIosNew />
        </IconButton>
        <Typography variant="h5" component="h2">
          {currentQuestionIndex + 1} / {questions.length}
        </Typography>
        <IconButton onClick={goNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>

    </>
  )
};
