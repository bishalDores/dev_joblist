import React from 'react';
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'

const JobList = ({jobs}) =>{
return(
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

            {
                jobs ? (jobs.map((job,id) => {
                    return (
                        <tr key={id}>
                            <td>{job.title}</td>
                            <td>{job.company}</td>
                            <td>{job.location}</td>
                            <td><a href='#'>View Details</a></td>
                        </tr>
                    )
                })):<Spinner animation="border"/>
            }

        </tbody>
    </Table>
)
};

export default JobList;