import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className='flex justify-center items-center space-x-2 my-4'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50'
      >
        <IoChevronBack />
      </button>
      <span className='text-gray-700'>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50'
      >
        <IoChevronForward />
      </button>
    </div>
  );
};

export default Pagination;
