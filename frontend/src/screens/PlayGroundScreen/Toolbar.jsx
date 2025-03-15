import React, { useState, useEffect, useContext } from "react";
import { FaEdit } from "react-icons/fa";
import "./styles/Toolbar.scss";
import { PlaygroundContext } from "../../Providers/PlaygroundProvider";
//✅ Import all themes
import { githubDark } from "@uiw/codemirror-theme-github";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { xcodeDark } from "@uiw/codemirror-theme-xcode";
import { solarizedDark } from "@uiw/codemirror-theme-solarized";
import { bbedit } from "@uiw/codemirror-theme-bbedit";
import { duotoneLight } from "@uiw/codemirror-theme-duotone";
import { duotoneDark } from "@uiw/codemirror-theme-duotone";
import { sublime } from "@uiw/codemirror-theme-sublime";

//✅ language select array
const languages = [
  { id: 62, name: "java" },
  { id: 54, name: "cpp" },
  { id: 63, name: "javascript" },
  { id: 71, name: "python" },
  { id: 50, name: "c" },
];
//✅ List of themes
const themes = [
  { name: "GitHub Dark", value: githubDark },
  { name: "Dracula", value: dracula },
  { name: "VSCode Dark", value: vscodeDark },
  { name: "Xcode Dark", value: xcodeDark },
  { name: "Solarized Dark", value: solarizedDark },
  { name: "BBEdit", value: bbedit },
  { name: "Duotone Light", value: duotoneLight },
  { name: "Duotone Dark", value: duotoneDark },
  { name: "Sublime", value: sublime },
];
function Toolbar() {
  const {
    activeFile,
    editFile,
    fileName,
    setFileName,
    saveCode,
    activeLanguageId,
    setActiveLanguageId,
    activeTheme,
    setActiveTheme,
  } = useContext(PlaygroundContext); // ✅ Get fileName from context
  const [isEditing, setIsEditing] = useState(false);
  const [showCodeSaved, setShowCodeSaved] = useState(false);

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };
  useEffect(() => {
    console.log("Active File Changed:", activeFile); // Debug log

    if (activeFile.fileId) {
      const savedFileName =
        JSON.parse(localStorage.getItem("savedFileName")) || {};
      setFileName(savedFileName[activeFile.fileId] || "Untitled");
    }
  }, [activeFile]);

  const handleSave = () => {
    if (!fileName.trim() || !activeFile?.folderId || !activeFile?.fileId)
      return; // ✅ Check for activeFile

    editFile(activeFile.folderId, activeFile.fileId, { title: fileName });
    setIsEditing(false);
  };

  // ✅ Handle save code click
  const handleSaveCode = () => {
    saveCode();
    // Show popup
    setShowCodeSaved(true);
    // Hide popup after 3 seconds
    setTimeout(() => {
      setShowCodeSaved(false);
    }, 3000);
  };
  // ✅ Handle language change
  const handleLanguageChange = (event) => {
    const selectedLanguageId = Number(event.target.value);
    setActiveLanguageId(selectedLanguageId);
  };
  // ✅ Handle theme change
  const handleThemeChange = (event) => {
    const selectedTheme = themes.find(
      (theme) => theme.name === event.target.value
    )?.value;
    if (selectedTheme) {
      setActiveTheme(selectedTheme);
    }
  };

  return (
    <div className="toolbar">
      {/* ✅ Code saved popup */}
      {showCodeSaved && <div className="code-saved-popup">Code Saved!</div>}
      <div className="file-name">
        {isEditing ? (
          <input
            type="text"
            value={fileName}
            onChange={handleFileNameChange}
            onBlur={handleSave}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            autoFocus
          />
        ) : (
          <span onClick={() => setIsEditing(true)}>
            {fileName || "Untitled File"} {/* ✅ Display filename from context */}
          </span>
        )}
        <FaEdit className="edit-icon" onClick={() => setIsEditing(true)} />
      </div>

      {/* ✅ Save code button */}
      <button className="save-btn" onClick={handleSaveCode}>
        Save Code
      </button>
      {/* ✅ Language selection */}
     

      {/* ✅ Theme selection */}
      <select
        className="theme-select"
        onChange={handleThemeChange}
        value={
          themes.find((theme) => theme.value === activeTheme)?.name ||
          "GitHub Dark"
        } // Set the default value to "GitHub Dark" if not found
      >
        {themes.map((theme) => (
          <option key={theme.name} value={theme.name}>
            {theme.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Toolbar;
