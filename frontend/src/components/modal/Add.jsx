import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import {
  addChannel,
  selectors as channelsSelectors,
  // actions as channelsActions,
} from '../../store/slices/channelsSlice';
// import { actions as modalActions } from '../../store/slices/modalSlice';

const Add = ({
  closeModal,
}) => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { authHeader } = useSelector((state) => state.auth);
  const { loadingStatus } = useSelector((state) => state.channels);
  const { show } = useSelector((state) => state.modal);

  const channelNames = useSelector(channelsSelectors.selectAll).map((channel) => channel.name);

  const validationSchema = yup.object({
    name: yup.string().required('Обязательное поле').trim()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channelNames, 'Должно быть уникальным'),
  });

  useEffect(() => {
    if (show) {
      inputRef.current.focus();
    }
  }, [show]);

  // useEffect(() => {
  //   if (error) {
  //     // inputRef.current.select();
  //     // hideModal(); // ////////////////////////////
  //     closeModal();
  //     // console.log('Ошибка соединения');
  //     // getErrorToast('Ошибка соединения');
  //     // toast.error('Ошибка соединения');
  //   }
  // }, [error, closeModal]);

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema,
    onSubmit: (value) => {
      const newChannel = { name: value.name.trim() };
      dispatch(addChannel({ newChannel, authHeader }))
        .then(() => {
          // if (!data.error) {
          //   // getSuccessToast('Канал создан');
          //   // toast.success('Канал создан');
          //   // hideModal();
          //   // closeModal();
          //   dispatch(channelsActions.setCurrentChannelId(data.payload.id));
          // }
          closeModal();
        });
    },
  });

  return (
    <Modal show={show} centered onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              ref={inputRef}
              onChange={formik.handleChange}
              // onBlur={formik.handleBlur} // не пойму нужно тут это или нет (вопрос куратору)
              isInvalid={formik.touched.name && formik.errors.name}
              value={formik.values.name}
              name="name"
              id="name"
            />
            <Form.Label className="visually-hidden" htmlFor="name">Имя канала</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                disabled={loadingStatus === 'loading'}
                variant="secondary"
                onClick={closeModal}
                className="me-2"
              >
                Отменить
              </Button>
              <Button
                disabled={loadingStatus === 'loading'}
                variant="primary"
                type="submit"
              >
                Отправить
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
// END
