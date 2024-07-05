// import React, { useEffect } from 'react';
// import { useImmer } from 'use-immer';
// import { useSelector } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
// import { io } from 'socket.io-client';
// import Channels from './Channels';
// import Messages from './Messages';
// import MessageForm from './MessageForm';
// import { fetchChannels, actions as channelsActions } from '../store/slices/channelsSlice';
// import { fetchMessages, actions as messagesActions } from '../store/slices/messagesSlice';
// import addButtonImg from '../assets/images/addButton.svg';
import Add from './Add.jsx';
// import Remove from './Remove.jsx';
import Rename from './Rename.jsx';
import { actions as modalActions } from '../../store/slices/modalSlice';

const modals = {
  adding: Add,
  // removing: Remove,
  renaming: Rename,
};

const Modal = () => {
  console.log('modal');
  const dispatch = useDispatch();
  const { type } = useSelector((state) => state.modal);

  const closeModal = () => {
    // dispatch(channelsActions.resetChannelError());
    dispatch(modalActions.hideModal());
    setTimeout(() => {
      dispatch(modalActions.resetModal());
    }, '300'); // 300ms waiting for modal-closing animation
  };

  if (type === null) {
    return null;
  }
  const ModalComponent = modals[type];
  return (
    <ModalComponent
      // modalInfo={modalInfo}
      // hideModal={hideModal}
      closeModal={closeModal}
      // getSuccessToast={getSuccessToast}
      // getErrorToast={getErrorToast}
    />
  );
};

export default Modal;
