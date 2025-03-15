import React from 'react';
import { useContext } from 'react';
import { ModalConstants, ModalContext } from '../ModalProvider'; 
import CreatePlaygroundModal from './CreatePlaygroundModal';
import CreateFolderModal from './CreateFolderModal';
import CreateFileModal from './CreateFileModal';

function Modal() {
    const { activeModal, modalProps } = useContext(ModalContext);

    return (
        <div>
            {activeModal === ModalConstants.CREATE_PLAYGROUND && <CreatePlaygroundModal />}
            {activeModal === ModalConstants.CREATE_FOLDER && <CreateFolderModal />}
            {activeModal === ModalConstants.CREATE_FILE && <CreateFileModal folderId={modalProps.folderId} />}
            {/* ✅ Pass folderId from modalProps */}
        </div>
    );
}

export default Modal;
