import "./style.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToTruncateLimit } from "../form/formSlice";

function InputNumber(props) {
  const dispatch = useDispatch();
  const { truncateLimit } = useSelector((state) => state.input.settings);

  // function increment() {
  //   const { max } = props;

  //   if (typeof max === "number" && truncateLimit >= max) return;

  //   dispatch(addToTruncateLimit(1));
  // }

  // function decrement() {
  //   const { min } = props;

  //   if (typeof min === "number" && truncateLimit <= min) return;

  //   dispatch(addToTruncateLimit(-1));
  // }

  function onChange(event) {
    const value = event.target.value;
    dispatch(addToTruncateLimit(value - truncateLimit));
  }

  return (
    <input
      type="number"
      min={props.min}
      max={props.max}
      value={truncateLimit}
      onChange={onChange}
    />
    // <div className="input-number" style={props.style}>
    //   <button type="button" onClick={decrement}>
    //     &minus;
    //   </button>

    //   {/* <input value={truncateLimit} /> */}
    //   {/* <span>{truncateLimit}</span> */}
    //   <button type="button" onClick={increment}>
    //     &#43;
    //   </button>
    // </div>
  );
}

export default InputNumber;
