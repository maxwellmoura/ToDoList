import React from 'react';
import styles from './Modal.module.css';

// Interface para as propriedades do modal
interface Props {
  children: React.ReactNode; // Children será um nó React
}

const Modal = ({ children }: Props) => {
  // Função para fechar o modal
  const closeModal = (): void => {
    const modal = document.querySelector('#modal');
    modal!.classList.add('hide');
  };

  return (
    <div id="modal" className="hide">
      <div className={styles.fade}></div>
      <div className={styles.modal}>
        {/* Botão para fechar o modal */}
        <button
          onClick={closeModal}
          className={styles.closeButton}
        >
          Fechar
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
