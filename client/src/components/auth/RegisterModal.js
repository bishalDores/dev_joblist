import React, { useState, useEffect } from 'react';
import { Modal, Nav, Button, Form, Alert } from 'react-bootstrap';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

const RegisterModal = ({ register, error, clearErrors, isAuthenticated }) => {
  const [show, setShow] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleClose = () => {
    setShow(false);
    clearErrors();
  };
  const handleShow = () => setShow(true);

  const onChangeHandler = e => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  };
  const onSubmitHandler = e => {
    e.preventDefault();
    const { name, email, password } = userInfo;
    const newUser = {
      name,
      email,
      password
    };
    register(newUser).then(res => {
      handleClose();
      setUserInfo({
        ...userInfo,
        name: '',
        email: '',
        password: ''
      });
    });
  };
  useEffect(() => {
    setErrorMsg(error.msg.msg);
  }, [error]);

  return (
    <>
      <Nav.Link onClick={handleShow} href='#'>
        Register
      </Nav.Link>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>Register</Modal.Header>
        <Modal.Body>
          {errorMsg ? <Alert variant='danger'>{errorMsg}</Alert> : null}
          <Form autoComplete='off' onSubmit={onSubmitHandler}>
            <Form.Group>
              <Form.Label htmlFor='name'>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                id='name'
                placeholder='Enter your name'
                onChange={onChangeHandler}
                className='mb-3'
                required
              />
              <Form.Label htmlFor='email'>Email</Form.Label>
              <Form.Control
                type='text'
                name='email'
                id='email'
                placeholder='Enter your email'
                onChange={onChangeHandler}
                className='mb-3'
                required
              />
              <Form.Label htmlFor='password'>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                id='password'
                placeholder='Enter your password'
                onChange={onChangeHandler}
                className='mb-3'
                autoComplete='new-password'
                required
              />
              <Button
                variant='dark'
                style={{ marginTop: '2rem' }}
                type='submit'
                block>
                Register
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});
const mapDispatchToProps = dispatch => {
  return {
    register: payload => dispatch(register(payload)),
    clearErrors: () => dispatch(clearErrors())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
