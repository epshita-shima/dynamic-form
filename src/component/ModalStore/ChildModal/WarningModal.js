import React from 'react'
import { Modal } from 'react-bootstrap';
const WarningModal = ({showParentErrorModal,handleParentErrorClose,errorMessageString}) => {
  return (
    <div>
      <Modal
          show={showParentErrorModal}
          onHide={handleParentErrorClose}
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
              onClick={handleParentErrorClose}
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

export default WarningModal
