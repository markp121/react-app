import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";

const Modal = ({ openButtonClass, openButtonInnerHtml, children }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "15px";
  };

  const handleCloseModal = () => {
    document.body.style.overflow = "unset";
    document.body.style.paddingRight = "0px";
    setShowModal(false);
  };

  return (
    <>
      <button className={openButtonClass} onClick={handleOpenModal}>
        {openButtonInnerHtml}
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
        {React.cloneElement(children, { onSuccess: handleCloseModal })}
      </ReactModal>
    </>
  );
};

export default Modal;
