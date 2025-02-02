import { useEffect } from "react";
import { Dispatch } from "react";
import { Action } from "../types/shared-types";

interface TimerProps {
    dispatch: Dispatch<Action>;
    remainingSeconds: number | null;
};

function Timer({ dispatch, remainingSeconds }: TimerProps) {
    const mins = Math.floor(remainingSeconds !== null ? remainingSeconds / 60 : 0);
    const seconds = remainingSeconds !== null ? remainingSeconds & 60 : 0;

    useEffect(function () {
        const id = setInterval(function () {
            dispatch({ type: "tick" })
        }, 1000);

        return () => clearInterval(id);

    }, [dispatch])
    return (
        <div className="timer">{mins < 10 && "0"}{mins}:{seconds < 10 && "0"}{seconds}</div>
    );
}

export default Timer;