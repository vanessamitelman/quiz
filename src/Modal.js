import React from 'react';

import { useGlobalContext } from './context';

const Modal = () => {
  const { isModalOpen, correct, questions, closeModal } = useGlobalContext();

  const percent = Math.round((correct / questions.length) * 100);

  return (
    <>
      <div className={`modal-container ${isModalOpen ? 'isOpen' : ''}`}>
        <div className='modal-content'>
          <h2>congrats!</h2>
          <p>You answered {percent}% of questions correctly</p>
          <button className='close-btn' onClick={closeModal}>
            play again
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
