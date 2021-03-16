import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { INCREMENT, DECREMENT, increment, decrement } from "./actions";

function Counterhooks() {
  const count = useSelector((state) => state.reducer.count);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>Increase</button>
      <button onClick={() => dispatch(decrement())}>Decrease</button>
    </div>
  );
}

export default Counterhooks;
