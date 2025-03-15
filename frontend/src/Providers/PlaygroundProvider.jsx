import React, { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
//✅ Import all themes
import { githubDark } from "@uiw/codemirror-theme-github";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { xcodeDark } from "@uiw/codemirror-theme-xcode";
import { solarizedDark } from "@uiw/codemirror-theme-solarized";
import { bbedit } from "@uiw/codemirror-theme-bbedit";
import { duotoneLight, duotoneDark } from "@uiw/codemirror-theme-duotone";
import { sublime } from "@uiw/codemirror-theme-sublime";

export const PlaygroundContext = createContext();

// ✅ Default code snippets for new files
const defaultCodes = {
  java: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}',
  cpp: '#include <iostream>\n\nint main() {\n  std::cout << "Hello, World!\\n";\n  return 0;\n}',
  c: '#include <stdio.h>\n\nint main() {\n  printf("Hello, World!\\n");\n  return 0;\n}',
  javascript: 'console.log("Hello, World!");',
  python: 'print("Hello, World!")',
};

// ✅ Language ID map for Judge0 API
const languageIds = {
  java: 62, // Java
  cpp: 54, // C++ (GCC 9.2.0)
  javascript: 63, // JavaScript (Node.js 12.14.0)
  python: 71, // Python (3.8.1)
  c: 50, // C
};

// ✅ Theme map for CodeMirror
const themes = {
  githubDark: githubDark,
  dracula: dracula,
  vscodeDark: vscodeDark,
  xcodeDark: xcodeDark,
  solarizedDark: solarizedDark,
  bbedit: bbedit,
  duotoneLight: duotoneLight,
  duotoneDark: duotoneDark,
  sublime: sublime,
};

export const PlaygroundProvider = ({ children }) => {
  const [folders, setFolders] = useState(() => {
    const localData = localStorage.getItem("data");
    return localData ? JSON.parse(localData) : [];
  });

  const [code, setCode] = useState("");
  const [fileName, setFileName] = useState("");
  const [activeFile, setActiveFile] = useState({ folderId: null, fileId: null });
  //✅ new state variable
  const [activeLanguageId, setActiveLanguageId] = useState(languageIds.java);
  // ✅ Add activeTheme state
  const [activeTheme, setActiveTheme] = useState(themes.githubDark); // Default theme

  // ✅ Save `folders` to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(folders));
  }, [folders]);

  // ✅ Load saved code & file name when active file changes
  useEffect(() => {
    if (activeFile.fileId) {
      const currentFolder = folders.find(
        (folder) => folder.id === activeFile.folderId
      );
      const currentFile = currentFolder?.files.find(
        (file) => file.id === activeFile.fileId
      );
      setFileName(currentFile?.title || "Untitled");
      // ✅ Get code from localStorage if present, otherwise use currentFile.code
      const savedCodes = JSON.parse(localStorage.getItem("savedCodes")) || {};
      if (savedCodes[activeFile.fileId]?.code) {
        setCode(savedCodes[activeFile.fileId]?.code);
      } else {
        setCode(currentFile?.code || "");
      }
      // ✅ Set the language ID when a new file is opened
      setActiveLanguageId(
        languageIds[currentFile?.language?.toLowerCase()] || languageIds.java
      );
    }
  }, [activeFile, folders]);

  // ✅ Save code whenever it changes
  useEffect(() => {
    if (activeFile.fileId) {
      const savedCodes = JSON.parse(localStorage.getItem("savedCodes")) || {};
      savedCodes[activeFile.fileId] = { code };
      localStorage.setItem("savedCodes", JSON.stringify(savedCodes));
    }
  }, [code, activeFile]);

  // ✅ Save filename whenever it changes
  useEffect(() => {
    if (activeFile.fileId && fileName) {
      const savedFileNames =
        JSON.parse(localStorage.getItem("savedFileName")) || {};
      savedFileNames[activeFile.fileId] = fileName;
      localStorage.setItem("savedFileName", JSON.stringify(savedFileNames));
    }
  }, [fileName, activeFile]);

  // ✅ Function to update the active file
  const openFile = (folderId, fileId) => {
    console.log("Opening file:", { folderId, fileId });
    if (folderId === activeFile.folderId && fileId === activeFile.fileId)
      return;

    setActiveFile({ folderId, fileId });

    const folder = folders.find((f) => f.id === folderId);
    if (folder) {
      const file = folder.files.find((file) => file.id === fileId);
      if (file) {
        setFileName(file.title);
        // the code is now set in the useEffect.
        //✅ Set the language ID when a new file is opened
        setActiveLanguageId(
          languageIds[file.language?.toLowerCase()] || languageIds.java
        );
      }
    }
  };

  // ✅ Create a new playground (folder with a file)
  const createNewPlayground = (newPlayground) => {
    const newFolder = {
      id: uuidv4(),
      title: newPlayground.folderName,
      files: [
        {
          id: uuidv4(),
          title: newPlayground.cardName,
          language: newPlayground.language,
          // ✅ add the default code
          code: defaultCodes[newPlayground.language] || "",
        },
      ],
    };
    setFolders((prev) => [...prev, newFolder]);
  };

  // ✅ Create a new folder
  const addFolder = (folderName) => {
    setFolders((prev) => [
      ...prev,
      { id: uuidv4(), title: folderName, files: [] },
    ]);
  };

  // ✅ Edit folder title
  const editFolder = (folderId, newTitle) => {
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === folderId ? { ...folder, title: newTitle } : folder
      )
    );
  };

  // ✅ Delete folder
  const deleteFolder = (folderId) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== folderId));
  };

  // ✅ Add a new file inside a folder
  const addFile = (folderId, fileName, language) => {
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === folderId
          ? {
              ...folder,
              files: [
                ...folder.files,
                {
                  id: uuidv4(),
                  title: fileName,
                  language,
                  // ✅ add the default code
                  code: defaultCodes[language] || "",
                },
              ],
            }
          : folder
      )
    );
  };

  // ✅ Edit file (name, code, or language)
  const editFile = (folderId, fileId, updatedFile) => {
    // ✅ set the code
    if (updatedFile.language) {
      const newCode = defaultCodes[updatedFile.language] || "";
      setCode(newCode);
    }

    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === folderId
          ? {
              ...folder,
              files: folder.files.map((file) =>
                file.id === fileId ? { ...file, ...updatedFile } : file
              ),
            }
          : folder
      )
    );
    if (updatedFile.title) {
      const savedFileNames =
        JSON.parse(localStorage.getItem("savedFileName")) || {};
      savedFileNames[fileId] = updatedFile.title;
      localStorage.setItem("savedFileName", JSON.stringify(savedFileNames));
      setFileName(updatedFile.title); // ✅ Ensure UI updates properly
    }
    // Update the code when we change the language
    if (updatedFile.language) {
      // Update the active language ID
      setActiveLanguageId(
        languageIds[updatedFile.language.toLowerCase()] || languageIds.java
      );
    }
  };

  // ✅ Delete a file
  const deleteFile = (folderId, fileId) => {
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === folderId
          ? {
              ...folder,
              files: folder.files.filter((file) => file.id !== fileId),
            }
          : folder
      )
    );

    const savedFileNames =
      JSON.parse(localStorage.getItem("savedFileName")) || {};
    delete savedFileNames[fileId];
    localStorage.setItem("savedFileName", JSON.stringify(savedFileNames));

    if (activeFile.fileId === fileId) {
      setActiveFile({ folderId: null, fileId: null });
      setFileName("Untitled");
      setCode("");
    }
  };

  // ✅ Save code
  const saveCode = () => {
    if (activeFile.fileId) {
      const savedCodes = JSON.parse(localStorage.getItem("savedCodes")) || {};
      savedCodes[activeFile.fileId] = { code }; // ✅ Only save when button is clicked
      localStorage.setItem("savedCodes", JSON.stringify(savedCodes));
    }
  };

  // ✅ Context Value
  const playGroundFeatures = {
    folders,
    createNewPlayground,
    addFolder,
    editFolder,
    deleteFolder,
    addFile,
    editFile,
    deleteFile,
    openFile,
    code,
    setCode,
    fileName,
    setFileName,
    activeFile,
    saveCode,
    activeLanguageId, // ✅ Add the language ID to the context
    setActiveLanguageId, // ✅ Add the function to set the language ID to the context
    activeTheme, // ✅ Add the theme to the context
    setActiveTheme, // ✅ Add the function to set the theme to the context
  };

  return (
    <PlaygroundContext.Provider value={playGroundFeatures}>
      {children}
    </PlaygroundContext.Provider>
  );
};

export default PlaygroundProvider;
