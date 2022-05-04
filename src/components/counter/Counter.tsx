import React from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
    decrement,
    increment,
    incrementByValue,
    reset,
} from "../../store/slices/counter.slice";

const Counter = () => {
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();

    const incrementHandler = () => {
        dispatch(increment());
    };
    const resetHandler = () => {
        dispatch(reset());
    };
    const decrementHandler = () => {
        dispatch(decrement());
    };
    const incrementByValueHandler = (value: number) => {
        dispatch(incrementByValue(value));
    };

    return (
        <div>
            <h1>Count: {count}</h1>
            <br />
            <button onClick={incrementHandler}>Increment</button>
            <button onClick={resetHandler}>Reset</button>
            <button onClick={decrementHandler}>Decrement</button>
            <button onClick={() => incrementByValueHandler(10)}>
                Increment by 10
            </button>
        </div>
    );
};

export default Counter;