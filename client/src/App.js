import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import JobList from "./components/JobList";
import axios from 'axios';
import './App.css';

const contentHeadlineStyle = {
    textDecoration:'underline'
};

const App = () => {
const[jobs,setJobs] = useState([]);

useEffect(() => {
   axios.get('https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json')
       .then(res => {
           setJobs(res.data);
       })
       .catch(err => console.log(err))
},[]);
  return (
    <div className="App">
      <AppNavbar/>
      <div className="container">
          <h3 className="mt-3 mb-3 text-center" style={contentHeadlineStyle}>Software Engineering Jobs</h3>
        <JobList jobs={jobs}/>
      </div>
    </div>
  );
};

export default App;
