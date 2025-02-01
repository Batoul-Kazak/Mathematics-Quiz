interface ProgressProps {
    numOfQuestions: number;
    index: number;
    points: number;
    maxPossiblePoints: number;
    answer: number | null;
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