import React from "react";
import { FaFileImport } from "react-icons/fa";
import "./styles/Input.scss"; // ✅ Correct import

const Input = ({input, setInput }) => {
  return (
    <div className="input-container">
      <div className="input-header">
        <span>Input:</span>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="input-box"
        placeholder="Enter input here..."
      />
    </div>
  );
};

export default Input;
