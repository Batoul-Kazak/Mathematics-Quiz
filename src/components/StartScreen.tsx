function StartScreen({ numOfQuestions, dispatch }) {
    return (
        <div className="start">
            <h2>Welcome to the Mathematic's Quiz</h2>
            <h3>{numOfQuestions} questions to test your skills in this course</h3>
            <button className="btn btn-ui" onClick={() => dispatch({ type: "start" })}>Let us start</button>
        </div>
    );
}

export default StartScreen;