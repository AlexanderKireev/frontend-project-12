import React, { useRef, useEffect } from 'react';
// import _ from 'lodash';
import { useFormik } from 'formik';
import {
  Modal,
  Form,
  Button,
} from 'react-bootstrap';

// const generateOnSubmit = ({ setItems, onHide }) => (values) => {
//   const item = { id: _.uniqueId(), body: values.body };
//   setItems((items) => {
//     items.push(item);
//   });
//   onHide();
// };

const Rename = ({ modalInfo, handleClose }) => {
  const { channelName } = modalInfo;
  // console.log(modalInfo);

  const inputRef = useRef();
  const formik = useFormik({
    initialValues: { name: channelName },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    if (modalInfo.show) {
      inputRef.current.select();
    }
  }, [modalInfo.show]);

  return (
    <Modal show={modalInfo.show} centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              // required
              className="mb-2"
              // placeholder="Ваш ник"
              ref={inputRef}
              onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              value={formik.values.name}
              name="name"
              id="name"
            />
            <Form.Label className="visually-hidden" htmlFor="name">Имя канала</Form.Label>
            <Form.Control.Feedback type="invalid">Должно быть уникальным</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                Отменить
              </Button>
              <Button variant="primary" type="submit">Отправить</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
// END
