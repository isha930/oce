import React from "react";
import { FaFileExport } from "react-icons/fa";
import "./styles/Output.scss"; // ✅ Correct import

const Output = ({ output }) => {
  return (
    <div className="output-container">
      <div className="output-header">
        <span>Output:</span>
       
      </div>
      <textarea
        value={output}
        readOnly
        className="output-box"
        placeholder="Output will be displayed here..."
      />
    </div>
  );
};

export default Output;
