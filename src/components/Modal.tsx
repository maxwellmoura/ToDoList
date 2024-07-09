import React from 'react';
import styles from './Modal.module.css';

//Dentro do modal a gente vai colocar a nossa propriedade de childern
interface Props {
  children: React.ReactNode; //Childern vai ser um nó react
}

const Modal = ({ children }: Props) => {
  //Adicionar a função de fechamento
  const closeModal = (e: React.MouseEvent): void => {
    const modal = document.querySelector('#modal');
    modal!.classList.add('hide');
  };

  return (
    <div id="modal" className="hide">
      <div className={styles.fade} onClick={closeModal}></div>
      <div className={styles.modal}>
        <h2>Texto Modal</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
