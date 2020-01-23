import React from 'react';
import { Spinner } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import './singleJob.css';

const SingleJob = props => {
  const { singleJob } = props.location.state;
  return (
    <div className='single_job_wrapper'>
      <div className='company_logo'>
        {singleJob.company_logo ? (
          <img src={singleJob.company_logo} alt='company logo' />
        ) : (
          <Spinner animation='border' />
        )}
      </div>
      <h1>
        <a href={singleJob.company_url} target='_blank'>
          {singleJob.company}
        </a>
      </h1>
      <h4>Job Title: {singleJob.title}</h4>
      <h4>Location: {singleJob.location}</h4>
      <h4>Type: {singleJob.type}</h4>
      <div>
        <h4>Job Description:</h4>
        {ReactHtmlParser(singleJob.description)}
      </div>
      <div>
        <h4>How to apply :</h4>
        {ReactHtmlParser(singleJob.how_to_apply)}
      </div>
    </div>
  );
};

export default SingleJob;
