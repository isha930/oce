import React, { useContext, useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";// ✅ Add C language
import "./styles/Editor.scss";
import { PlaygroundContext } from "../../Providers/PlaygroundProvider";

// ✅ Language extension map
const languageExtensions = {
  java,
  cpp,
  javascript,
  python,
};

// ✅ Map language IDs to names
const languageIdToName = {
  62: "java",
  54: "cpp",
  63: "javascript",
  71: "python",
  50: "c",
};

function Editor() {
  const { code, setCode, activeFile, activeTheme, activeLanguageId } =
    useContext(PlaygroundContext);

  // ✅ Determine the correct language extension
  const activeLanguageExtension = useMemo(() => {
    if (!activeFile?.fileId) return [];
    const fileLanguage = languageIdToName[activeLanguageId] || "";
    const extension = languageExtensions[fileLanguage];
    return extension ? [extension()] : [];
  }, [activeLanguageId]);

  return (
    <div className="editor-container">
      <CodeMirror
        value={code}
        height="400px"
        extensions={activeLanguageExtension} // ✅ Apply language-specific highlighting
        theme={activeTheme} // ✅ Apply theme
        onChange={setCode}
      />
    </div>
  );
}

export default Editor;
