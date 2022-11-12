import { Component } from 'react';
import PropTypes from 'prop-types';
import * as SC from './Modal.styled';
import { createPortal } from 'react-dom';

const ModalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleDown);
  }

  handleDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <SC.Overlay onClick={this.handleClick}>
        <SC.Modal>{this.props.children}</SC.Modal>
      </SC.Overlay>,
      ModalRoot
    );
  }
}

Modal.propTypes = {
  handleClick: PropTypes.func,
};
