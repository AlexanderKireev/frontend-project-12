import React, { useEffect } from 'react';
// import { useImmer } from 'use-immer';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import Channels from './Channels';
import Messages from './Messages';
import MessageForm from './MessageForm';
import Modal from './modal/Modal';
import { fetchChannels, actions as channelsActions } from '../store/slices/channelsSlice';
import { fetchMessages, actions as messagesActions } from '../store/slices/messagesSlice';
import { actions as modalActions } from '../store/slices/modalSlice';
import addButtonImg from '../assets/images/addButton.svg';
// import changeModal from './modal/changeModal';

const Contetnt = () => {
  console.log('Content');
  // const [modalInfo, setModalInfo] = useImmer({ type: null, show: false, channelName: '' });
  const dispatch = useDispatch();
  const { authHeader } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   const socket = io();

  // });
  useEffect(() => {
    const socket = io();
    // socket.on('connect', () => {
    //   console.log('connectttt');
    //   dispatch(messagesActions.resetState());
    //   dispatch(channelsActions.resetState());
    //   dispatch(fetchChannels(authHeader));
    //   dispatch(fetchMessages(authHeader));
    // });

    socket.on('newChannel', (payload) => {
      dispatch(channelsActions.addChannel(payload));
      console.log('soc new');
      // dispatch(channelsActions.setCurrentChannelId('2'));
    });
    socket.on('newMessage', (payload) => {
      dispatch(messagesActions.addMessage(payload));
      // dispatch(channelsActions.setCurrentChannelId('2'));
    });
  }, [authHeader, dispatch]);

  useEffect(() => {
    console.log('disp');
    dispatch(fetchChannels(authHeader));
    dispatch(fetchMessages(authHeader));
  }, [authHeader, dispatch]);

  // const showModal = (type, show, channelName = '') => {
  //   setModalInfo((state) => {
  //     state.type = type;
  //     state.show = show;
  //     state.channelName = channelName;
  //   });
  // };

  // const hideModal = () => {
  //   // dispatch(channelsActions.resetChannelError());
  //   setModalInfo((state) => {
  //     state.show = false;
  //   });
  //   setTimeout(() => {
  //     setModalInfo((state) => {
  //       state.type = null;
  //     });
  //   }, '300'); // 300ms waiting for modal-closing animation
  // };

  return (
    <div className="row h-100 bg-white flex-md-row">
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>Каналы</b>

          <button
            // onClick={() => showModal('adding', true)}
            onClick={() => dispatch(modalActions.showModal({ type: 'adding', show: true, channelName: '' }))}
            type="button"
            className="p-0 text-primary btn btn-group-vertical shadow-none"
          >
            <img src={addButtonImg} alt="Добавить канал" />
            <span className="visually-hidden">+</span>
          </button>

        </div>
        {/* <Channels showModal={showModal} /> */}
        <Channels />
      </div>
      <div className="col p-0 h-100">
        <div className="d-flex flex-column h-100">
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0"><b># general</b></p>
            <span className="text-muted">1 сообщение</span>
          </div>
          <Modal />
          {/* {changeModal({
            modalInfo, hideModal, getSuccessToast, getErrorToast,
          })} */}
          <Messages />
          <MessageForm />
        </div>
      </div>
    </div>
  );
};

export default Contetnt;
