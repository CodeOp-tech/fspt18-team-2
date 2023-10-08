import React from 'react';
import { Button } from '@nextui-org/react';
import { LiaEyeSolid } from 'react-icons/lia';
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb';


const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex gap-6 justify-end">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        fontsize="medium"
        color="danger"
        aria-label="Like"
        shadow="lg"
        endContent={<LiaEyeSolid />}
        type="submit"
      >
        Previous Page <TbPlayerTrackPrevFilled />
      </Button>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        fontsize="medium"
        color="danger"
        aria-label="Like"
        shadow="lg"
        endContent={<LiaEyeSolid />}
        type="submit"
      >
        Next Page <TbPlayerTrackNextFilled />
      </Button>
    </div>
  );
};

export default Pagination;
