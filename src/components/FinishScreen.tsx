// import { useQuiz } from "../context/QuizContext";

import happy from "./../assets/Pi (Happy).png"
import dumb from "./../assets/Pi (Dumb).png"
import confident from "./../assets/Pi (Confident).png"
import pi from "./../assets/Pi.png"

function FinishScreen({ points, maxPossiblePoints, dispatch, highScore }) {
  // const { points, maxPossiblePoints, highscore, dispatch } = useQuiz();
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = confident;
  if (percentage >= 80 && percentage < 100) emoji = happy;
  if (percentage >= 50 && percentage < 80) emoji = pi;
  if (percentage >= 0 && percentage < 50) emoji = dumb;
  return (
    <>
      <p className="result">
        <img src={emoji} alt="pi" />
        You Scored <strong>{points}</strong>out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>
      {/* <p className="highscore">(Highscore: {highScore} points)</p> */}
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
