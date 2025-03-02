import React, { useEffect, useState } from 'react';
import styles from './Modal.module.css';
import crossModal from '../../assets/svg/crossModal.svg';

const Modal = ({ isOpen, onClose, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  if (!isModalOpen) return null;

  return (
    <div className={`${styles.modal} ${isModalOpen ? styles.modal_open : ''}`}>
      <div className={styles.modal_overlay} onClick={handleClose} />
      <div className={styles.modal_content}>
        {children}
        <button className={styles.modal_close} onClick={handleClose}>
          <img style={{opacity: '1'}} src={crossModal} alt="cross" />
        </button>
      </div>
    </div>
  );
};

export default Modal;