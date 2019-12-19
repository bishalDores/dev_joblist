import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button, FormControl } from 'react-bootstrap';

const Search = ({ onChangeHandler, onClickHandler }) => {
  return (
    <InputGroup className='mb-3'>
      <FormControl
        placeholder='Search by programming languages or location...'
        aria-label='Search by programming languages or location...'
        aria-describedby='basic-addon2'
        onChange={onChangeHandler}
      />
      <InputGroup.Append>
        <Button variant='outline-primary' onClick={onClickHandler}>
          Submit
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};
export default Search;
