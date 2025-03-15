import React, { useState, useEffect, useContext } from "react";
import Header from "./Header";
import Toolbar from "./Toolbar";
import Editor from "./Editor";
import Input from "./Input";
import Output from "./Output";
import Footer from "./Footer";
import "./styles/PlaygroundScreen.scss";
import { executeCode } from "../../api";
import { PlaygroundContext } from "../../Providers/PlaygroundProvider";
import { useParams } from "react-router-dom";

const PlaygroundScreen = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const {
    activeFile,
    code,
    setCode,
    openFile,
    activeLanguageId,
    setActiveLanguageId,
  } = useContext(PlaygroundContext);
  const { fileId, folderId } = useParams();

  // ✅ Call openFile on component mount
  useEffect(() => {
    openFile(folderId, fileId);
  }, [fileId, folderId]);

  const handleRunCode = async () => {
    console.log("Running Code...");
    try {
      const result = await executeCode(activeLanguageId, code, input); // ✅ Pass languageId
      if (result.status && result.status.description === "Accepted") {
        setOutput(result.stdout || "No output");
      } else {
        setOutput(
          result.stderr || `Status: ${result.status?.description || "Unknown"}`
        );
      }
    } catch (error) {
      console.error("Run Code Error:", error);
      setOutput("An unexpected error occurred.");
    }
  };

  return (
    <div className="playground-container">
      <Header />
      {activeFile && activeFile.fileId && <Toolbar />}
      <div className="playground-grid">
        {activeFile && activeFile.fileId && <Editor />}
        <div className="input-output-panel">
          <Input input={input} setInput={setInput} />
          <Output output={output} />
        </div>
      </div>
      <Footer onRun={handleRunCode} getCode={() => code} setCode={setCode} />
    </div>
  );
};

export default PlaygroundScreen;
