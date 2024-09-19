import styles from "./Pagination.module.css"
import Button from "../Button"

import { useSearchParams } from "react-router-dom";

const Pagination = ({pagination}) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = Number(searchParams.get('page_size')) || 2;
  const currentPage = Number(searchParams.get('page')) || 1;

  const totalPages = Math.ceil(pagination.count / pageSize);


  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
  
    // Create a new URLSearchParams object from the current searchParams
    const updatedSearchParams = new URLSearchParams(searchParams);
  
    // Set the new page value while keeping other params intact
    updatedSearchParams.set("page", newPage);
    updatedSearchParams.set("page_size", pageSize);
  
    // Apply the updated search parameters
    setSearchParams(updatedSearchParams);
  };
  
  return (
    <div className={styles.container}>
      <div>
        <Button 
          iconType="arrowLeft" 
          variant={pagination.previous ? "outline-blue" : "outline-grey"} 
          onClick={() => handlePageChange(currentPage - 1)} 
        />
      </div>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        return (
          <div key={page}>
            <Button 
              variant={page === currentPage ? "blue" : "transparent"} 
              label={page.toString()} 
              labelPosition="center" 
              onClick={() => handlePageChange(page)} 
            />
          </div>
        );
      })}

      <div>
        <Button 
          iconType="arrowRight" 
          variant={pagination.next ? "outline-blue" : "outline-grey"} 
          onClick={() => handlePageChange(currentPage + 1)} 
        />
      </div>
    </div>
  );
};

export default Pagination;