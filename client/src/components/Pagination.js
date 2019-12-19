import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationComponent = ({
  currentPage,
  postsPerPage,
  totalPosts,
  paginate
}) => {
  const pageNumbers = [];

  for (let i = 1; i < Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(
      <Pagination.Item
        key={i}
        onClick={() => paginate(i)}
        active={i == currentPage}>
        {i}
      </Pagination.Item>
    );
  }
  return (
    <div>
      <Pagination>{pageNumbers}</Pagination>
    </div>
  );
};

export default PaginationComponent;
