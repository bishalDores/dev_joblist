import React from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';

const JobList = ({ jobs, loading, authenticated }) => {
  return loading ? (
    <Spinner animation='border' />
  ) : (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Company</th>
          <th>Location</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job, id) => {
          return (
            <tr key={id}>
              <td>{job.title}</td>
              <td>{job.company}</td>
              <td>{job.location}</td>
              <td>
                {authenticated ? (
                  <Link
                    to={{ pathname: `/${job.id}`, state: { singleJob: job } }}>
                    View Details
                  </Link>
                ) : (
                  'login to view details'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
const mapStateToProps = state => ({
  authenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, null)(JobList);
