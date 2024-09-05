import styles from "./ProductField.module.css"
import { files } from "../../assets/dummyData"
import Button from "../Button"

const FileBlock =()=>{
    return(
        <div className={styles.fileCont}>
            {files.map((item)=> (
                <div key={item.id} className={styles.file}>
                    <div>svg</div>
                    <p>{item.file}</p>
                    <div><Button/></div>
                </div>
            ))}
        </div>
    )
}

export default FileBlock