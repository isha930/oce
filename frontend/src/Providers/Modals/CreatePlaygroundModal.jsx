import React, { useContext } from "react";
import { Dialog } from "primereact/dialog";
import { ModalContext } from "../ModalProvider";
import "./CreatePlaygroundModal.scss";
import { PlaygroundContext } from "../PlaygroundProvider";

function CreatePlaygroundModal() {
  const { closeModal } = useContext(ModalContext);
  const { createNewPlayground } = useContext(PlaygroundContext);

  const OnSubmitModal = (e) => {
    e.preventDefault();
    const folderName = e.target.folderName.value;
    const cardName = e.target.cardName.value;
    //✅ get the language from the form
    const language = e.target.language.value;

    if (!folderName.trim() || !cardName.trim()) return;

    //✅ update createNewPlayground call
    createNewPlayground({ folderName, cardName, language });
    closeModal();
  };

   return (
    <Dialog visible onHide={closeModal} header="Create New Playground">
      <div className="modal-container">
        <form onSubmit={OnSubmitModal}>
          <div className="field">
            <label htmlFor="folderName">Folder Name:</label>
            <input type="text" id="folderName" name="folderName" />
          </div>

          <div className="field">
            <label htmlFor="cardName">Card Name:</label>
            <input type="text" id="cardName" name="cardName" />
          </div>

          <div className="field">
            <label htmlFor="language">Language:</label>
            <select id="language" name="language">
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="c">C</option>
            </select>
          </div>

          <button type="submit" className="p-button">Create</button>
        </form>
      </div>
    </Dialog>
  );
};

export default CreatePlaygroundModal;
