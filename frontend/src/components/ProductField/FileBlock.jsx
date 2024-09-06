import styles from "./ProductField.module.css"
import { files } from "../../assets/dummyData"
import Button from "../Button"
import { filesvg } from "../../assets/svg/svgimages"

const FileBlock =()=>{
    return (
      <div className={styles.fileCont}>
        {files.map((item) => (
          <div key={item.id} className={styles.file}>
            <div className={styles.fileName}><div>{filesvg} </div><p>{item.file}</p></div>
            <div className={styles.btn}>
              {item.price === "free" ? (
                <Button iconType="download" variant="grey"  labelPosition="none" />
              ) : (
                <Button variant="outline-grey" iconType="cart" labelPosition="none" />
              )}
            </div>
          </div>
        ))}
      </div>
    );
}

export default FileBlock