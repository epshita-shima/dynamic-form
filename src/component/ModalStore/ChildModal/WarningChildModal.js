import React from 'react'
import { Modal } from 'react-bootstrap';
const WarningChildModal = ({showErrorModal,handleErrorClose,errorMessageString}) => {
  return (
    <div>
      <Modal
          show={showErrorModal}
          onHide={handleErrorClose}
          backdrop="true"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>
              <h5 className="fw-bold">Warning!</h5>
            </Modal.Title>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              onClick={handleErrorClose}
            >
              X
            </button>
          </Modal.Header>
          <Modal.Body>
            <label>{errorMessageString}</label>
          </Modal.Body>
        </Modal>
    </div>
  )
}

export default WarningChildModal
