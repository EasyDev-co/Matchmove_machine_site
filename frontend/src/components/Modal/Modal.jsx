import React, { useEffect, useState } from 'react';
import styles from './Modal.module.css';
import crossModal from '../../assets/svg/crossModal.svg';

const Modal = ({ isOpen, onClose, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
    // if (isOpen) {
    //   // Запоминаем текущую позицию скролла
    //   const scrollY = window.scrollY;
      
    //   // Блокируем скролл на body и html
    //   document.body.style.position = 'fixed';
    //   document.body.style.top = `-${scrollY}px`;
    //   document.body.style.width = '100%';
    //   document.body.style.overflow = 'hidden';
      
    //   // Для html элемента на всякий случай
    //   document.documentElement.style.overflow = 'hidden';
    // } else {
    //   // Разблокируем скролл
    //   const scrollY = document.body.style.top;
    //   document.body.style.position = '';
    //   document.body.style.top = '';
    //   document.body.style.overflow = '';
    //   document.documentElement.style.overflow = '';
      
    //   // Восстанавливаем позицию скролла
    //   window.scrollTo(0, parseInt(scrollY || '0') * -1);
    // }

    // return () => {
    //   // Очистка при размонтировании компонента
    //   document.body.style.position = '';
    //   document.body.style.top = '';
    //   document.body.style.overflow = '';
    //   document.documentElement.style.overflow = '';
    // };
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