import { Dispatch } from "react";
import { Action } from "../types/shared-types";

interface NextButtonProps {
    dispatch: Dispatch<Action>;
    answer: number | null;
    index: number;
    numOfQuestions: number;
}

function NextButton({ dispatch, answer, index, numOfQuestions }: NextButtonProps) {
    if (answer === null) return null;
    if (index === numOfQuestions) return (
        <button className="btn btn-ui" onClick={() => dispatch({ type: "restart" })}>Finish</button>
    )

    if (index === numOfQuestions - 1) return (
        <button className="btn btn-ui" onClick={() => dispatch({ type: "finish" })}>Finish</button>
    )
    return (
        <button className="btn btn-ui" onClick={() => dispatch({ type: "nextQuestion" })}>Next</button>
    );
}

export default NextButton;