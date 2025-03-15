import React, { useRef } from "react";
import { FaExpand, FaFileImport, FaFileExport } from "react-icons/fa";
import "./styles/Footer.scss";

const Footer = ({ onRun, getCode, setCode }) => {
  const editorRef = useRef(null);

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const handleImportCode = (event) => {
    if (typeof setCode !== "function") {
      console.error("❌ setCode is not a function!");
      return;
    }

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setCode(e.target.result);
    };
    reader.readAsText(file);
  };

  const handleExportCode = () => {
    const code = getCode();
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "code.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div ref={editorRef} className="footer-container">
      <button className="footer-btn" onClick={handleFullScreen}>
        <FaExpand /> Full Screen
      </button>

      <button className="footer-btn" onClick={() => document.getElementById("fileInput").click()}>
        <FaFileImport /> Import Code
      </button>
      <input
        type="file"
        id="fileInput"
        accept=".txt, .js, .cpp, .py, .java, .c"
        style={{ display: "none" }}
        onChange={handleImportCode}
      />

      <button className="footer-btn" onClick={handleExportCode}>
        <FaFileExport /> Export Code
      </button>

      <button className="run-btn" onClick={onRun}>
        Run Code
      </button>
    </div>
  );
};

export default Footer;
