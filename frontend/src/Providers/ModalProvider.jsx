import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalConstants = {
  CREATE_PLAYGROUND: "CREATE_PLAYGROUND",
  CREATE_FOLDER: "CREATE_FOLDER",
  CREATE_FILE: "CREATE_FILE",
  EDIT_FOLDER: "EDIT_FOLDER"
};

function ModalProvider({ children }) {
  const [activeModal, setActiveModal] = useState(null);
  const [modalProps, setModalProps] = useState({});

  const openModal = (modalName, props = {}) => {
    setActiveModal(modalName);
    setModalProps(props);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalProps({});
  };
  
  // Remove this function as you don't have it in PlaygroundProvider.jsx
  // const editFolderTitle = () => {
  //     console.log("Edit folder title");
  //   };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, activeModal, modalProps }}>
      {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
