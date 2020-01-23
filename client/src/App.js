import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import JobList from './components/JobList';
import Search from './components/Search';
import SingleJob from './components/SingleJob';
import Pagination from './components/Pagination';
import { Provider } from 'react-redux';
import store from './store';
import axios from 'axios';
import { loadUser } from '../src/actions/authActions';
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
  const [pageNumber, setPageNumber] = useState(1);

  const generateURL = value => {
    let url = `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?page=${pageNumber}`;
    if (value == '') {
      return url;
    } else {
      return (url = `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${value}&page=1`);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(generateURL(''))
      .then(res => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, [pageNumber]);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const onChangeHandler = e => {
    setSearchValue(e.target.value);
  };

  const onClickHandler = () => {
    setLoading(true);
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

  const newJobHandler = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <Provider store={store}>
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
                    <div className='footer-info-wrapper'>
                      <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={jobs.length}
                        paginate={paginate}
                        currentPage={currentPage}
                      />
                      <Button variant='primary' onClick={newJobHandler}>
                        Click Here for Newer Jobs
                      </Button>
                    </div>
                  </div>
                )}
              />
              <Route path='/:id' component={SingleJob} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
