import React from 'react'
import styles from './Modal.module.css'

interface Props {}

const Modal = (props: Props) => {
  return (
    <div id='modal'>
        <div className={styles.fade}></div>
        <div className={styles.modal}>
            <h2>Texto Modal</h2>
        </div>
    </div>
  )
}

export default Modal