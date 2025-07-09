import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";

const Modal = ({ deps, buttonText,  modalContent }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }
  }, [showModal]);

  useEffect(() => {
    handleCloseModal();
  }, [deps])

  return (
    <div>
      <button className="button-neutral" onClick={handleOpenModal}>
        {buttonText}
      </button>
      <ReactModal
        isOpen={showModal}
        contentLabel="Modal template"
        onRequestClose={handleCloseModal}
        className="modal"
        overlayClassName="overlay"
        appElement={document.getElementById("root") || undefined}
      >
        <button onClick={handleCloseModal} className="close-modal">
          <i className="bi bi-x"></i>
        </button>
        {modalContent}
      </ReactModal>
    </div>
  );
};

export default Modal;
