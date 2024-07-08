import React from 'react'
import styles from './Modal.module.css'

interface Props {
  children: React.ReactNode //children é uma forma de usar JSX dentro do TSX
}

const Modal = ({children}: Props) => {
  //Evento de clic pra fechar o modal, e resgatar ele pelo id que a gente criou
  const fechamentoModal = (e: React.MouseEvent): void => {
      const modal = document.querySelector('#modal')
     modal!.classList.add('hide')     
   }
  return (
    <div id='modal'>
        <div className={styles.fade} onClick={fechamentoModal}></div>
        <div className={styles.modal}>
            <h2>Texto Modal</h2>
            {children}
        </div>
    </div>
  )
}

export default Modal