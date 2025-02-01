import { useQuiz } from "../context/QuizContext";

function Progress() {
  const { index, numOfQuestions, points, maxPossiblePoints, answer } =
    useQuiz();
  return (
    <header className="progress">
      <progress max={numOfQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index}</strong>/ {numOfQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
