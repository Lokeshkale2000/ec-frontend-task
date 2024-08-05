import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1} className="mx-2 px-4 py-2 border border-gray-300 rounded">
        Previous
      </button>
      <span className="mx-2">{currentPage} / {totalPages}</span>
      <button onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages} className="mx-2 px-4 py-2 border border-gray-300 rounded">
        Next
      </button>
    </div>
  );
};

export default Pagination;
