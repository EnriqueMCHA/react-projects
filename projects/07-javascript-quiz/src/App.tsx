import { Stack, Typography, useMediaQuery } from "@mui/material";
import "./App.css";
import { JavascriptLogoSvg } from "./JavascriptLogoSvg";
import { useTheme } from "@emotion/react";
import { Breakpoints } from "@mui/system/createTheme";
import { Game } from "./components/Game";
import { Start } from "./components/Start";
import { useQuestionsStore } from "./store/questions";

declare module "@emotion/react" {
  export interface Theme {
    breakpoints: Breakpoints;
  }
}

function App() {
  const questions = useQuestionsStore(state => state.questions);

  const theme = useTheme();
  const medium = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <main>
        <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} gap={2}>
          <JavascriptLogoSvg />
          <Typography variant={medium ? "h2" : "h5"} component={"h1"} fontWeight={"500"}>
            Javascript Quiz
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
      </main>
    </>
  );
}

export default App;
