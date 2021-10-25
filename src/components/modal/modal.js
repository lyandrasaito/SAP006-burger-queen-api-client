import React from "react";
import Button from "../button/button";
import '../../components/modal/modal.css'

// se não for passado onClose, executa função vazia(nada)
const Modal = ({ onClose = () => { }, children }) => {

  const handleOutsideClick = (e) => {
    // fechar também se clicar na div modal (div de fundo)
    if (e.target.id === 'modal') onClose();
  }

  return (
    <div className="modal" id="modal" onClick={handleOutsideClick}>
      <div className="modalContainer">
        <div className="modalContent">{children}</div>
        <Button text="Fechar" className='button closeModal' onClick={onClose} />
      </div>
    </div>
  )
}

export default Modal;