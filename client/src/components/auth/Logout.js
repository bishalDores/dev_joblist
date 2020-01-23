import React from 'react';
import { Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

const Logout = ({ logout }) => {
  return (
    <>
      <Nav.Link onClick={logout}>Logout</Nav.Link>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(null, mapDispatchToProps)(Logout);
