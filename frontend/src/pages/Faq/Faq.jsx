import styles from "./Faq.module.css";
import { useState } from "react";
import NavigationTop from "../../components/NavigationTop/NavigationTop";
import FaqSpoiler from "../../components/FaqSpoiler/FaqSpoiler";
import { questions } from "../../assets/dummyData";
import useSmoothScroll from "../../hooks/useSmoothScroll";

const Faq = () => {

    const [clickedButton, setClickedButton] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const scrollTo = useSmoothScroll()

    const handleScroll = (sectionId) => {
        setClickedButton(sectionId);
        scrollTo(sectionId);
      };      

      const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
      };

  return (
    <div>
      <NavigationTop title="FAQ" />
      <section className={styles.banner}>
        <div className={styles.bannerCont}>
          <h2 className="h2-bold">
            Find answers to all your questions about our free and paid products
          </h2>
          <p className="h4-medium">
            Or contact us via email grids@matchmovemachine.com
          </p>
        </div>
      </section>

      <section className={styles.main}>
        <div className={styles.sidebar}>
          <div className={styles.adaptiveSidebar} onClick={toggleSidebar}>
            Contents
          </div>
          <div className={`${styles.links} ${isSidebarOpen ? styles.open : styles.closed}`}>
            <ul>
              <li>
                <button
                  className={
                    clickedButton === "tech-specs" ? styles.clicked : ""
                  }
                  onClick={() => handleScroll("tech-specs")}
                >
                  Tech specs
                </button>
              </li>
              <li>
                <button
                  className={clickedButton === "pricing" ? styles.clicked : ""}
                  onClick={() => handleScroll("pricing")}
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  className={clickedButton === "payment" ? styles.clicked : ""}
                  onClick={() => handleScroll("payment")}
                >
                  Payment
                </button>
              </li>
              <li>
                <button
                  className={clickedButton === "howToUse" ? styles.clicked : ""}
                  onClick={() => handleScroll("howToUse")}
                >
                  How to use the website
                </button>
              </li>
              <li>
                <button
                  className={
                    clickedButton === "personalAccount" ? styles.clicked : ""
                  }
                  onClick={() => handleScroll("personalAccount")}
                >
                  Personal account
                </button>
              </li>
              <li>
                <button
                  className={clickedButton === "license" ? styles.clicked : ""}
                  onClick={() => handleScroll("license")}
                >
                  License
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.body}>
          <section id="tech-specs">
            <div className={styles.bannerCont}>
              <h2 className="h2-bold">Tech specs</h2>
            </div>
            <div className={styles.spoilerCont}>
              {questions.techSpecs.map((item, i) => (
                <FaqSpoiler key={i} spoiler={item} />
              ))}
            </div>
          </section>

          <section id="pricing">
            <div className={styles.bannerCont}>
              <h2 className="h2-bold">Pricing</h2>
            </div>
            <div className={styles.spoilerCont}>
              {questions.pricing.map((item, i) => (
                <FaqSpoiler key={i} spoiler={item} />
              ))}
            </div>
          </section>

          <section id="payment">
            <div className={styles.bannerCont}>
              <h2 className="h2-bold">Payment</h2>
            </div>
            <div className={styles.spoilerCont}>
              {questions.payment.map((item, i) => (
                <FaqSpoiler key={i} spoiler={item} />
              ))}
            </div>
          </section>

          <section id="howToUse">
            <div className={styles.bannerCont}>
              <h2 className="h2-bold">How to use the website</h2>
            </div>
            <div className={styles.spoilerCont}>
              {questions.howToUse.map((item, i) => (
                <FaqSpoiler key={i} spoiler={item} />
              ))}
            </div>
          </section>

          <section id="personalAccount">
            <div className={styles.bannerCont}>
              <h2 className="h2-bold">Personal account</h2>
            </div>
            <div className={styles.spoilerCont}>
              {questions.personalAccount.map((item, i) => (
                <FaqSpoiler key={i} spoiler={item} />
              ))}
            </div>
          </section>

          <section id="license">
            <div className={styles.bannerCont}>
              <h2 className="h2-bold">License</h2>
            </div>
            <div className={styles.spoilerCont}>
              {questions.license.map((item, i) => (
                <FaqSpoiler key={i} spoiler={item} />
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Faq;
