import React, { useState, useContext } from "react";
import { Dialog } from "primereact/dialog";
import { ModalContext } from "../ModalProvider";
import { PlaygroundContext } from "../PlaygroundProvider";
import "./CreateFolderModal.scss";

function CreateFolderModal() {
  const { closeModal } = useContext(ModalContext);
  const { addFolder } = useContext(PlaygroundContext); // ✅ Use addFolder function
  const [folderName, setFolderName] = useState("");

  const handleCreateFolder = () => {
    if (!folderName.trim()) return;
    addFolder(folderName); // ✅ Call addFolder from context
    
    setFolderName("");
    closeModal();
  };

  return (
    <Dialog visible onHide={closeModal} header="Create New Folder">
  <div className="modal-container">
    <div className="field">
      <label htmlFor="folderName">Folder Name</label>
      <input
        id="folderName"
        type="text"
        placeholder="Enter folder name"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
      />
    </div>

    <button className="p-button" onClick={handleCreateFolder}>
      Create Folder
    </button>
  </div>
</Dialog>

  );
}

export default CreateFolderModal;
