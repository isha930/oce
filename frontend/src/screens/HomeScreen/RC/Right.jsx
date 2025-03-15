import React, { useContext, useState } from "react";
import "./index.scss";
import { PlaygroundContext } from "../../../Providers/PlaygroundProvider";
import { ModalContext, ModalConstants } from "../../../Providers/ModalProvider";
import { Link } from "react-router-dom";

const Folder = ({ folderId, folderTitle, cards }) => {
  const { deleteFolder, editFolder, deleteFile, editFile } =
    useContext(PlaygroundContext);
  const { openModal } = useContext(ModalContext);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isEditingFolder, setIsEditingFolder] = useState(false);
  const [folderName, setFolderName] = useState(folderTitle);

  const handleFolderEdit = () => {
    if (folderName.trim() && folderName !== folderTitle) {
      editFolder(folderId, folderName);
    }
    setIsEditingFolder(false);
  };

  return (
    <div className="folder-container">
      <div className="folder-header">
        <div className="folder-header-item">
          <span className="material-icons" style={{ color: "#FFCA29" }}>
            folder
          </span>
          {isEditingFolder ? (
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              onBlur={handleFolderEdit}
              onKeyDown={(e) => e.key === "Enter" && handleFolderEdit()}
              autoFocus
              className="edit-input"
            />
          ) : (
            <span onClick={() => setIsEditingFolder(true)}>{folderTitle}</span>
          )}
        </div>
        <div className="folder-header-item">
          <span
            className="material-icons"
            onClick={() => setIsEditingFolder(true)}
          >
            edit
          </span>
          <span
            className="material-icons"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            delete
          </span>
          <button
            onClick={() =>
              openModal(ModalConstants.CREATE_FILE, { folderId })
            }
          >
            <span className="material-icons">add</span>
            <span>New File</span>
          </button>
        </div>
      </div>

      <div className="card-container">
        {cards?.map((file) => (
          <FileCard
            key={file.id}
            file={file}
            folderId={folderId}
            deleteFile={deleteFile}
            editFile={editFile}
          />
        ))}
      </div>

      {showDeleteConfirmation && (
        <div className="delete-modal">
          <div className="delete-modal-content">
            <h3>Are you sure you want to delete this folder?</h3>
            <div className="delete-modal-buttons">
              <button
                className="confirm-delete"
                onClick={() => deleteFolder(folderId)}
              >
                Delete
              </button>
              <button
                className="cancel-delete"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FileCard = ({ file, folderId, deleteFile, editFile }) => {
  const [isEditingFile, setIsEditingFile] = useState(false);
  const [fileTitle, setFileTitle] = useState(file.title);
  const [showFileDeleteConfirmation, setShowFileDeleteConfirmation] =
    useState(false);
  const { openFile } = useContext(PlaygroundContext); // ✅ Destructure openFile from context

  const handleFileEdit = () => {
    if (fileTitle.trim()) {
      editFile(folderId, file.id, { title: fileTitle });
    } else {
      setFileTitle(file.title);
    }
    setIsEditingFile(false);
  };

  

  return (
    
    <div className="card">
      <Link to={`/playground/${file.id}/${folderId}`} style={{textDecoration: 'none', color:'black'}}> {/* ✅ Use Link to navigate */}
      <img src="logo.png" alt="logo" className="card-logo" />
      </Link>
      <div className="card-content">
        {isEditingFile ? (
          <input
            type="text"
            value={fileTitle}
            onChange={(e) => setFileTitle(e.target.value)}
            onBlur={handleFileEdit}
            onKeyDown={(e) => e.key === "Enter" && handleFileEdit()}
            autoFocus
            className="edit-input"
          />
        ) : (
          <span onClick={() => setIsEditingFile(true)}>{file.title}</span>
        )}
        <span className="card-language">{file.language}</span>
      </div>
      <div className="card-actions">
        <span
          className="material-icons"
          onClick={() => setIsEditingFile(true)}
        >
          edit
        </span>
        <span
          className="material-icons"
          onClick={() => setShowFileDeleteConfirmation(true)}
        >
          delete
        </span>
      </div>

      {showFileDeleteConfirmation && (
        <div className="delete-modal">
          <div className="delete-modal-content">
            <h3>Are you sure you want to delete this file?</h3>
            <div className="delete-modal-buttons">
              <button
                className="confirm-delete"
                onClick={() => deleteFile(folderId, file.id)}
              >
                Delete
              </button>
              <button
                className="cancel-delete"
                onClick={() => setShowFileDeleteConfirmation(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
   
  );
};

const Right = () => {
  const { folders, openFile } = useContext(PlaygroundContext); // ✅ Get openFile from context
  const { openModal } = useContext(ModalContext);

  const openCreateNewFolderModal = () => {
    openModal(ModalConstants.CREATE_FOLDER);
  };

  return (
    <div className="right-container">
      <div className="header">
        <h1>My Playground</h1>
        <button className="add-folder" onClick={openCreateNewFolderModal}>
          <span>+ New Folder</span>
        </button>
      </div>

      {folders?.map((folder) => (
        <Folder
          key={folder.id}
          folderId={folder.id}
          folderTitle={folder.title}
          cards={folder.files}
        />
      ))}
    </div>
  );
};

export default Right;
