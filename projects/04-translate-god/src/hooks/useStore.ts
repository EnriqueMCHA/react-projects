import { useReducer } from "react";
import {
  type FromLanguage,
  type Language,
  type Action,
  type State,
} from "../types";

// Step 1, create a initial state
const initialState = {
  fromLanguage: "auto" as FromLanguage,
  toLanguage: "en" as Language,
  fromText: "",
  result: "",
  loading: false,
};

// Step 2, create a reducer
const reducer = (state: State, action: Action) => {
  const { type } = action;

  switch (type) {
    case "INTERCHANGE_LANGUAGES": {
      if (state.fromLanguage === "auto") return state;

      const loading = state.fromText !== "";

      return {
        ...state,
        loading,
        result: "",
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
      };
    }
    case "SET_FROM_LANGUAGE": {
      if (state.fromLanguage === action.payload) return state;

      const loading = state.fromText !== "";

      return {
        ...state,
        loading,
        result: "",
        fromLanguage: action.payload,
      };
    }
    case "SET_TO_LANGUAGE": {
      if (state.toLanguage === action.payload) return state;

      const loading = state.fromText !== "";

      return {
        ...state,
        loading,
        result: "",
        toLanguage: action.payload,
      };
    }
    case "SET_FROM_TEXT": {
      const loading = state.fromText !== "";

      return {
        ...state,
        loading,
        result: "",
        fromText: action.payload,
      };
    }
    case "SET_RESULT": {
      return {
        ...state,
        loading: false,
        result: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const useStore = () => {
  // Step 3, use the reducer function to create a store
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] = useReducer(reducer, initialState);

  const interchangeLanguages = () => {
    dispatch({ type: "INTERCHANGE_LANGUAGES" });
  };

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: "SET_FROM_LANGUAGE", payload });
  };

  const setToLanguage = (payload: Language) => {
    dispatch({ type: "SET_TO_LANGUAGE", payload });
  };

  const setFromText = (payload: string) => {
    dispatch({ type: "SET_FROM_TEXT", payload });
  };

  const setResult = (payload: string) => {
    dispatch({ type: "SET_RESULT", payload });
  };

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  };
};
