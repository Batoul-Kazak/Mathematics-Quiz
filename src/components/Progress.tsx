import { MostCommonProps } from "../types/shared-types";

type commonPropsForProgress = Omit<MostCommonProps, "dispatch" | "question">;
interface ProgressProps extends commonPropsForProgress {
    maxPossiblePoints: number;
}

function Progress({ numOfQuestions, index, points, maxPossiblePoints, answer }: ProgressProps) {
    return (
        <header className="progress">
            <progress max={numOfQuestions} value={index + Number(answer !== null)}></progress>
            <p>
                Question <strong>{index + 1}</strong> / {numOfQuestions}
            </p>
            <p>
                <strong>{points}</strong> / {maxPossiblePoints}
            </p>
        </header>
    );
}

export default Progress;