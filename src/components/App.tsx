import { useEffect, useReducer } from 'react';
import Loader from "./Loader";
import Error from './Error';
import './../App.css';
import Header from './Header';
import MainDiv from './MainDiv';
import StartScreen from "./StartScreen";
import Question from './Question';
import NextButton from "./NextButton";
import Progress from './Progress';
import FinishScreen from "./FinishScreen"
import Timer from './Timer';

const SECS_PER_QUESTION = 40;

interface QuestionType {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

interface State {
  questions: QuestionType[];
  status: "ready" | "loading" | "error" | "active" | "finished" | "restart";
  index: number;
  answer: number | null;
  points: number;
  highScore: number,
  remainingSeconds: number | null
}

type Action =
  | { type: "dataReceive"; payload: QuestionType[] }
  | { type: "dataFailed" }
  | { type: "start" }
  | { type: "newAnswer"; payload: string } // Payload is the selected answer
  | { type: "nextQuestion" }
  | { type: "finish" }
  | { type: "restart" }
  | { type: "tick" };

const initialState: State = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  remainingSeconds: null
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "dataReceive":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        index: 0, // Reset index when starting
        points: 0, // Reset points when starting
        answer: null, // Reset answer
        remainingSeconds: state.questions.length * SECS_PER_QUESTION
      };
    case "newAnswer": {
      const question = state.questions.at(Number(state.index));

      return {
        ...state,
        answer: Number(action.payload),
        points: Number(action.payload) === question.correctOption ? state.points + question.points : state.points,
      }
    };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state, status: "finished", highScore: state.points > state.highScore ?
          state.points : state.highScore
      };
    case "restart":
      return {
        ...initialState, status: "ready", questions: state.questions,
        remainingSeconds: state.questions.length * SECS_PER_QUESTION
      }
    case "tick": return {
      ...state, remainingSeconds: (state.remainingSeconds != null) ? state.remainingSeconds - 1 : 0,
      status: state.remainingSeconds === 0 ? "finished" : state.status
    }
    default:
      { throw new Error("Unknown Action") };
  }
}

function App() {
  const [{ questions, status, index, answer, points, highScore, remainingSeconds }, dispatch] = useReducer(reducer, initialState);

  const numOfQuestions: number = questions.length;
  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(`http://localhost:8000/questions`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`); // Improved error handling
        }
        const data: QuestionType[] = await res.json(); // Type the fetched data
        dispatch({ type: "dataReceive", payload: data });
      } catch (err) {
        console.error("Error fetching questions:", err); // Log the error for debugging
        dispatch({ type: "dataFailed" });
      }
    }

    fetchQuestions();
  }, []);

  return (
    <div className='app'>
      <Header />

      <MainDiv>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />}
        {status === "active" && questions[index] && ( // Check if currentQuestion exists
          <>
            <Progress numOfQuestions={numOfQuestions} index={index} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer} />
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
            <footer>
              <Timer dispatch={dispatch} remainingSeconds={remainingSeconds} />
              <NextButton dispatch={dispatch} answer={answer} currentQuestion={questions[index]}
                index={index} numOfQuestions={numOfQuestions} /> {/* Pass currentQuestion and index */}
            </footer>
          </>
        )}
        {status === "finished" && <FinishScreen points={points}
          maxPossiblePoints={maxPossiblePoints} dispatch={dispatch} highScore={highScore} />}
      </MainDiv>
    </div>
  );
}

export default App;