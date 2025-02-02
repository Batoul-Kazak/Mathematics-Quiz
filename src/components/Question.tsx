
import Options from "./Options";
import { MostCommonProps } from "../types/shared-types";

type QuestionProps = Omit<MostCommonProps, "index" | "numOfQuestions" | "points">;

function Question({ question, dispatch, answer }: QuestionProps) {
    return (
        <div>
            <h4>{question.question}</h4>
            <Options question={question} dispatch={dispatch} answer={answer} />
        </div>
    );
}

export default Question;
