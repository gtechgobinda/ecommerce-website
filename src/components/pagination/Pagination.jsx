import { useState } from "react";
import "./Pagination.scss";
const Pagination = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) => {
  const pageNumbers = [];
  const totalPages = totalProducts / productsPerPage;
  //limit the page Number shown
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  //paginate
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //go to next page
  const paginateNext = () => {
    setCurrentPage(currentPage + 1);
    //show next set of page no
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  //go to prev page
  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);
    // Show prev set of pageNumbers
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <ul className="pagination">
        <li
          onClick={paginatePrev}
          className={currentPage === pageNumbers[0] ? "hidden" : ""}
        >
          Prev
        </li>
        {pageNumbers.map((number) => {
          if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
              <li
                key={number}
                onClick={() => paginate(number)}
                className={currentPage === number ? "active" : ""}
              >
                {number}
              </li>
            );
          }
        })}
        <li
          onClick={paginateNext}
          className={
            currentPage === pageNumbers[pageNumbers.length - 1]
              ? `hidden`
              : null
          }
        >
          Next
        </li>
      </ul>
      <p className="pageOfPage">
        <b>Page</b>
        <b className="page">{`${currentPage}`}</b>
        <span>{`of`}</span>
        <b>{`${Math.ceil(totalPages)}`}</b>
      </p>
    </>
  );
};

export default Pagination;
