
import { MostCommonProps } from "../types/shared-types";

type OptionsProps = Omit<MostCommonProps, "numOfQuestions" | "index" | "points">

function Options({ question, dispatch, answer }: OptionsProps) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index: number) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""}
          ${hasAnswered ? index === question.correctOption ? "correct" : "wrong" : ""}
        `}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index.toString() })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
