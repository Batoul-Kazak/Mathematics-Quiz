import { useEffect, useReducer } from 'react';
import Loader from "./Loader";
import Error from './Error';
import './../App.css';
import Header from './Header';
import MainDiv from './MainDiv';
import StartScreen from "./StartScreen";
import Question from './Question';
import NextButton from "./NextButton";
import Progress from "./Progress"

interface QuestionType {
    question: string;
    options: string[];
    correctOption: string;
    points: number;
}

interface State {
    questions: QuestionType[];
    status: "ready" | "loading" | "error" | "active" | "finished";
    index: number;
    answer: string | null;
    points: number;
}

type Action =
    | { type: "dataReceive"; payload: QuestionType[] }
    | { type: "dataFailed" }
    | { type: "start" }
    | { type: "newAnswer"; payload: string } // Payload is the selected answer
    | { type: "nextQuestion" };


const initialState: State = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
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
            };
        case "newAnswer":
            const question = state.questions[state.index];
            if (!question) {
                return state; // Handle the case where the question is not available
            }
            const isCorrect = action.payload === question.correctOption;
            return {
                ...state,
                answer: action.payload,
                points: isCorrect ? state.points + question.points : state.points,
            };
        case "nextQuestion":
            return { ...state, index: state.index + 1, answer: null };
        default:
            throw new Error("Unknown Action");
    }
}

function App() {
    const [{ questions, status, index, answer, points }, dispatch] = useReducer(reducer, initialState);

    const numOfQuestions: number = questions.length;

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

    const currentQuestion = questions[index];

    return (
        <div className='app'>
            <Header />

            <MainDiv>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />}
                {status === "active" && currentQuestion && ( // Check if currentQuestion exists
                    <>
                        <Question question={currentQuestion} dispatch={dispatch} answer={answer} />
                        <NextButton dispatch={dispatch} answer={answer} currentQuestion={currentQuestion} index={index} numOfQuestions={numOfQuestions} /> {/* Pass currentQuestion and index */}
                        <p>Points: {points}</p> {/* Display the points */}
                    </>
                )}
                {status === "finished" && !currentQuestion && ( // Handle end of questions
                    <p>Quiz finished! Your final score is {points} out of {questions.reduce((sum, q) => sum + q.points, 0)}.</p>
                )}
            </MainDiv>
        </div>
    );
}

export default App;