import React from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

const JobList = ({ jobs, loading }) => {
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
          console.log(job);
          return (
            <tr key={id}>
              <td>{job.title}</td>
              <td>{job.company}</td>
              <td>{job.location}</td>
              <td>
                <Link
                  to={{ pathname: `/${job.id}`, state: { singleJob: job } }}>
                  View Details
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default JobList;
