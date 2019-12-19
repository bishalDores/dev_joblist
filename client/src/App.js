import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import JobList from './components/JobList';
import Search from './components/Search';
import SingleJob from './components/SingleJob';
import axios from 'axios';
import './App.css';

const contentHeadlineStyle = {
  textDecoration: 'underline'
};

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  // const generateURL = value => {
  //   let url =
  //   if(value=''){

  //   }
  // };

  useEffect(() => {
    axios
      .get(
        'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json'
      )
      .then(res => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  const onChangeHandler = e => {
    setSearchValue(e.target.value);
  };
  console.log(searchValue);
  return (
    <BrowserRouter>
      <div className='App'>
        <AppNavbar />
        <div className='container'>
          <Switch>
            <Route
              path='/'
              exact
              render={props => (
                <div>
                  <h3
                    className='mt-3 mb-3 text-center'
                    style={contentHeadlineStyle}>
                    Software Engineering Jobs
                  </h3>
                  <Search onChangeHandler={onChangeHandler} />
                  <JobList jobs={jobs} loading={loading} />
                </div>
              )}
            />
            <Route path='/:id' component={SingleJob} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
