import { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as SC from './Modal.styled';
import { createPortal } from 'react-dom';

const ModalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, children }) {
  const handleCloseClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
  useEffect(() => {
    const handleDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleDown);
    return () => window.removeEventListener('keydown', handleDown);
  }, [onClose]);

  // handleClick = event => {
  //   if (event.currentTarget === event.target) {
  //     this.props.onClose();
  //   }
  // };

  return createPortal(
    <SC.Overlay onClick={handleCloseClick}>
      <SC.Modal>{children}</SC.Modal>
    </SC.Overlay>,
    ModalRoot
  );
}

Modal.propTypes = {
  handleClose: PropTypes.func,
};
