import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import JobList from './components/JobList';
import Search from './components/Search';
import SingleJob from './components/SingleJob';
import Pagination from './components/Pagination';
import axios from 'axios';
import './App.css';

const contentHeadlineStyle = {
  textDecoration: 'underline'
};

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const generateURL = value => {
    let url =
      'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?page=0';
    if (value == '') {
      return url;
    } else {
      return (url = `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${value}&page=0`);
    }
  };

  useEffect(() => {
    axios
      .get(generateURL(''))
      .then(res => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  const onChangeHandler = e => {
    setSearchValue(e.target.value);
  };

  const onClickHandler = () => {
    axios
      .get(generateURL(searchValue))
      .then(res => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  };

  // get current job posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = jobs.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = num => {
    setCurrentPage(num);
  };

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
                  <Search
                    onChangeHandler={onChangeHandler}
                    onClickHandler={onClickHandler}
                  />
                  <JobList jobs={currentPosts} loading={loading} />
                </div>
              )}
            />
            <Route path='/:id' component={SingleJob} />
          </Switch>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={jobs.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
