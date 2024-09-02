import { useState } from "react"
import styles from "./Pagination.module.css"
import Button from "../Button"

const Pagination = () => {
  return (
    <div className={styles.container}>
      <div>
        <Button iconType="arrowLeft" variant="outline-grey" labelPosition="none"  />
      </div>

      <div><Button variant="blue" label="1" iconType="none" labelPosition="center"/></div>
      <div><Button variant="transparent" label="2" iconType="none" color="blue"/></div>
      <div><Button variant="transparent" label="3" iconType="none" color="blue"/></div>
      <div><Button variant="transparent" label="..." iconType="none" color="blue"/></div>
      <div><Button variant="transparent" label="10" iconType="none" color="blue"/></div>

      <div>
      <Button 
        iconType="arrowRight" 
        labelPosition="none" 
        variant="outline-blue" 
        
      />
      </div>
    </div>
  );
};

export default Pagination;