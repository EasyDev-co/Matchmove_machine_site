import styles from "./MainShare.module.css"

const MainShare =()=>{
    return (
      <section className={styles.main}>
        <div className={styles.content}>
          <h2 className="h2-bold">
            “Each lens is unique - it is impossible to create a universal
            preset!”
          </h2>
          <p className="h4-medium">
            We tested the hypothesis in practice and share the results
          </p>
        </div>
      </section>
    );
}

export default MainShare