
import Options from "./Options";
import { Dispatch } from "react";
import { QuestionType, Action } from "../types/shared-types";

interface QuestionProps {
    question: QuestionType;
    dispatch: Dispatch<Action>;
    answer: number | null;
};

function Question({ question, dispatch, answer }: QuestionProps) {
    return (
        <div>
            <h4>{question.question}</h4>
            <Options question={question} dispatch={dispatch} answer={answer} />
        </div>
    );
}

export default Question;
