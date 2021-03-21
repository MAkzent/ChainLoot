import React, { ReactNode } from 'react';
import ReactModal from 'react-modal';
import style from './Modal.module.scss';
import FontAwesomeIcon from 'components/FontAwesomeIcon';

interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
  children?: ReactNode;
  header: string;
}

const customStyles = {
  overlay: {
    zIndex: 99,
    padding: '6rem 2rem',
    overflow: 'auto',
    backdropFilter: 'blur(2px)',
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    top: 'auto',
    left: 'auto',
    bottom: 'auto',
    right: 'auto',
    width: '42rem',
    minHeight: '14rem',
    border: '1px solid black',
    height: 'auto',
    boxShadow: '4px 4px 6px black',
    background: '#38383a',
    borderRadius: '0.25rem',
  },
};

const Modal = ({ onClose, isOpen, children, header }: ModalProps) => {
  return (
    <ReactModal
      style={customStyles}
      role='presentation'
      isOpen={isOpen}
      contentLabel='Modal'
      onRequestClose={onClose}
      shouldCloseOnOverlayClick>
      <div className={style.container}>
        <div className={style.header}>{header}</div>
        <div className={style.close} onClick={onClose}>
          <FontAwesomeIcon icon='farTimes' />
        </div>
      </div>
      {children}
    </ReactModal>
  );
};

export default Modal;
