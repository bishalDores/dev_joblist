import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import RegisterModal from '../components/auth/RegisterModal';
import Logout from '../components/auth/Logout';
import LoginModal from '../components/auth/LoginModal';
import { connect } from 'react-redux';

const AppNavbar = ({ isAuthenticated, user }) => {
  const authLinks = (
    <>
      <span className='navbar-text mr3'>
        <strong>{user ? `Welcome ${user.name}` : ''}</strong>
      </span>
      <Logout />
    </>
  );

  const guestLinks = (
    <>
      <RegisterModal />
      <LoginModal />
    </>
  );
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <div className='container'>
        <Navbar.Brand>
          <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
            devJobs
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ml-auto'>
            {isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});
export default connect(mapStateToProps, null)(AppNavbar);
