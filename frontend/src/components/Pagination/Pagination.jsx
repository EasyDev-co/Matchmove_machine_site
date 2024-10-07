import styles from "./Pagination.module.css"
import Button from "../Button"

import { useSearchParams } from "react-router-dom";

const Pagination = ({ pagination }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = Number(searchParams.get('page_size')) || 2;
  const currentPage = Number(searchParams.get('page')) || 1;

  const totalPages = Math.ceil(pagination.count / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;

    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set('page', newPage);
    updatedSearchParams.set('page_size', pageSize);
    setSearchParams(updatedSearchParams);
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    // Always show the first page
    pageButtons.push(
      <div key={1}>
        <Button
          variant={1 === currentPage ? 'blue' : 'transparent'}
          label="1"
          labelPosition="center"
          onClick={() => handlePageChange(1)}
        />
      </div>
    );

    // Add ellipsis if current page is far from the beginning
    if (currentPage > 3) {
      pageButtons.push(<span key="start-ellipsis">...</span>);
    }

    // Show up to 2 pages before the current page
    for (let page = Math.max(2, currentPage - 1); page < currentPage; page++) {
      pageButtons.push(
        <div key={page}>
          <Button
            variant={page === currentPage ? 'blue' : 'transparent'}
            label={page.toString()}
            labelPosition="center"
            onClick={() => handlePageChange(page)}
          />
        </div>
      );
    }

    // Show the current page
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageButtons.push(
        <div key={currentPage}>
          <Button
            variant="blue"
            label={currentPage.toString()}
            labelPosition="center"
            onClick={() => handlePageChange(currentPage)}
          />
        </div>
      );
    }

    // Show up to 1 page after the current page
    for (let page = currentPage + 1; page < Math.min(totalPages, currentPage + 2); page++) {
      pageButtons.push(
        <div key={page}>
          <Button
            variant={page === currentPage ? 'blue' : 'transparent'}
            label={page.toString()}
            labelPosition="center"
            onClick={() => handlePageChange(page)}
          />
        </div>
      );
    }

    // Add ellipsis if current page is far from the last page
    if (currentPage < totalPages - 2) {
      pageButtons.push(<span key="end-ellipsis">...</span>);
    }

    // Always show the last page
    if (totalPages > 1) {
      pageButtons.push(
        <div key={totalPages}>
          <Button
            variant={totalPages === currentPage ? 'blue' : 'transparent'}
            label={totalPages.toString()}
            labelPosition="center"
            onClick={() => handlePageChange(totalPages)}
          />
        </div>
      );
    }

    return pageButtons;
  };

  return (
    <div className={styles.container}>
      <div>
        <Button
          iconType="arrowLeft"
          variant={pagination.previous ? 'outline-blue' : 'outline-grey'}
          onClick={() => handlePageChange(currentPage - 1)}
        />
      </div>

      {renderPageButtons()}

      <div>
        <Button
          iconType="arrowRight"
          variant={pagination.next ? 'outline-blue' : 'outline-grey'}
          onClick={() => handlePageChange(currentPage + 1)}
        />
      </div>
    </div>
  );
};

export default Pagination;