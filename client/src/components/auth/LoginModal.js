import React, { useState, useEffect } from 'react';
import { Modal, Nav, Button, Form, Alert, Toast } from 'react-bootstrap';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

const RegisterModal = ({ login, error, clearErrors, isAuthenticated }) => {
  const [show, setShow] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

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
    const { email, password } = userInfo;
    const newUser = {
      email,
      password
    };
    login(newUser).then(res => {
      handleClose();
      setUserInfo({
        ...userInfo,
        email: '',
        password: ''
      });
      setSuccessMsg(res.msg);
      //   return (
      //     <Toast show={true} delay={3000} autohide>
      //       <Toast.Body>{res.msg}</Toast.Body>
      //     </Toast>
      //   );
    });
  };
  useEffect(() => {
    setErrorMsg(error.msg.msg);
  }, [error]);

  return (
    <>
      <Nav.Link onClick={handleShow} href='#'>
        Login
      </Nav.Link>
      <div
        aria-live='polite'
        aria-atomic='true'
        style={{
          position: 'relative'
        }}>
        <Toast
          show={successMsg !== '' ? true : false}
          onClose={() => setSuccessMsg('')}
          delay={3000}
          autohide
          style={{
            position: 'absolute',
            top: '0px',
            right: '50%',
            width: '196px'
          }}>
          <Toast.Body>{successMsg}</Toast.Body>
        </Toast>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>Login</Modal.Header>
        <Modal.Body>
          {errorMsg ? <Alert variant='danger'>{errorMsg}</Alert> : null}
          <Form autoComplete='off' onSubmit={onSubmitHandler}>
            <Form.Group>
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
                Login
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
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});
const mapDispatchToProps = dispatch => {
  return {
    login: payload => dispatch(login(payload)),
    clearErrors: () => dispatch(clearErrors())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
