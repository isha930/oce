import React, { useState, useContext } from "react";
import { Dialog } from "primereact/dialog";
import { ModalContext } from "../ModalProvider";
import { PlaygroundContext } from "../PlaygroundProvider";

function CreateFileModal({ folderId }) {
  const { closeModal } = useContext(ModalContext);
  const { addFile } = useContext(PlaygroundContext); // ✅ Get addFile function

  const [fileName, setFileName] = useState("");
  const [language, setLanguage] = useState("javascript");

  const handleCreateFile = () => {
    if (!fileName.trim()) return;
    addFile(folderId, fileName, language); // ✅ Add file to selected folder
    closeModal();
  };

  return (
    <Dialog visible onHide={closeModal} header="Create New File/Card">
      <div className="modal-container">
        <div className="field">
          <label>File/Card Name</label>
          <input
            type="text"
            placeholder="Enter file name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
          </select>
        </div>

        <button className="p-button" onClick={handleCreateFile}>
          Create File
        </button>
      </div>
    </Dialog>
  );
}

export default CreateFileModal;
