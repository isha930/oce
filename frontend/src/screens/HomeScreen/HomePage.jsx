import React from 'react'
import "./index.scss"
import Right from './RC/Right'
import Modal from '../../Providers/Modals/Modal'
import { useContext } from 'react'
import { ModalConstants, ModalContext } from '../../Providers/ModalProvider'


function Home() {
  const modalFeatures = useContext(ModalContext);
  const openCreatePLaygroundModal = () => {
    modalFeatures.openModal(ModalConstants.CREATE_PLAYGROUND);
  }
  return (
    <div className='home-container'>
    <div className="left-container">
    <img src="logo.png" alt="Logo" />
    <h1 className="logo-name">DevDon</h1>
    <h2 className="tagline">Compile. Cry. Repeat.</h2>
    <button  onClick={openCreatePLaygroundModal}
    className="cta-button"> +Create PlayGround</button> 
</div>
     <Right/>
     <Modal/>
      </div>
  )
}

export default Home
