
import Options from "./Options";
import { MostCommonProps } from "../types/shared-types";

// interface QuestionProps {
//     question: QuestionType;
//     dispatch: Dispatch<Action>;
//     answer: number | null;
// };

type QuestionProps = Omit<MostCommonProps, "index" | "numOfQuestions" | "numOfQuestions">;

function Question({ question, dispatch, answer }: QuestionProps) {
    return (
        <div>
            <h4>{question.question}</h4>
            <Options question={question} dispatch={dispatch} answer={answer} />
        </div>
    );
}

export default Question;
