import React, { useState, useContext } from "react";
import { Dialog } from "primereact/dialog";
import { PlaygroundContext } from "../PlaygroundProvider";
import { ModalContext } from "../ModalProvider";
import "./EditFolderModal.scss";

function EditFolderModal({ folderId, currentTitle }) {
  const { closeModal } = useContext(ModalContext);
  const { editFolderTitle } = useContext(PlaygroundContext);
  const [newTitle, setNewTitle] = useState(currentTitle);

  const handleEdit = () => {
    if (!newTitle.trim()) return;
    editFolderTitle(folderId, newTitle);
    closeModal();
  };

  return (
    <Dialog visible onHide={closeModal} header="Edit Folder Name">
      <div className="modal-container">
        <h2>Edit Folder</h2>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button className="p-button" onClick={handleEdit}>
          Save Changes
        </button>
      </div>
    </Dialog>
  );
}

export default EditFolderModal;
