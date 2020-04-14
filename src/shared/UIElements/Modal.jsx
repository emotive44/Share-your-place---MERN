import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import BackDrop from '../UIElements/BackDrop';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';

const ModalOverlay = props => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form onSubmit={props.onSubmit ? props.onSubmit : (e) => e.preventDefault()}> 
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
    );
  return ReactDOM.createPortal(content , document.getElementById('modal-hook'));
}

const Modal = props => {
  return (
    <Fragment>
      {/* we use BackDrop, if we want to click outside on modal to close Modal window */}
      {props.show && <BackDrop onClick={props.onCancel} />}
      {/* end */}
      <CSSTransition 
        in={props.show} 
        mountOnEnter 
        unmountOnExit 
        timeout={1000}
        classNames="modal"
      >
        <ModalOverlay {...props}/>
      </CSSTransition>
    </Fragment>
  );
}

export default Modal;
 