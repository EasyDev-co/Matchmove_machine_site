import styles from "./Faq.module.css";
import { useState, useEffect } from "react";
import NavigationTop from "../../components/NavigationTop/NavigationTop";
import FaqSpoiler from "../../components/FaqSpoiler/FaqSpoiler";
import { questions } from "../../assets/dummyData";
import useSmoothScroll from "../../hooks/useSmoothScroll";
import { burgersvg, closesvg } from "../../assets/svg/svgimages";
import Modal from "../../components/Modal/Modal";
import ContacUs from "../../components/ContacUs/ContacUs";

const Faq = () => {

    const [clickedButton, setClickedButton] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
      setIsOpen(true);
    };
  
    const handleClose = () => {
      setIsOpen(false);
    }
    const scrollTo = useSmoothScroll()

    const handleScroll = (sectionId) => {
        setClickedButton(sectionId);
        scrollTo(sectionId);
        setIsSidebarOpen(false)
      };      

      const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
      };

      useEffect(() => {

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setClickedButton(entry.target.id);
              }
            });
          },
          { threshold: 0.5 }
        );
    
        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section) => {
          observer.observe(section);
        });
    
        return () => {
          sections.forEach((section) => {
            observer.unobserve(section);
          });
        };
      }, []);

  return (
    <div>
      <NavigationTop title="FAQ" />
      <section className={styles.banner}>
        <div className={styles.bannerCont}>
          <h2 className="h2-bold">
            Find answers to all your questions about our free and paid products
          </h2>
          <p className="h4-medium">
            Or contact us via email{" "}
            <p onClick={handleOpen} style={{cursor: 'pointer'}} className={styles.highLight}>
              grids@matchmovemachine.com
            </p>
          </p>
        </div>
      </section>

      <section className={styles.main}>
        <div className={styles.sidebar}>
          <div
            className={`${styles.links} ${
              isSidebarOpen ? styles.open : styles.closed
            }`}
          >
            <ul>
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
                    clickedButton === "tech-specs" ? styles.clicked : ""
                  }
                  onClick={() => handleScroll("tech-specs")}
                >
                  Tech specs
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
                  className={clickedButton === "license" ? styles.clicked : ""}
                  onClick={() => handleScroll("license")}
                >
                  License
                </button>
              </li>
            </ul>
          </div>
          <div className={styles.adaptiveSidebar} onClick={toggleSidebar}>
            <p className="h4-bold">Contents</p>
            {isSidebarOpen ? closesvg : burgersvg}
          </div>
        </div>
        <div className={styles.body}>

        <section id="howToUse" className={styles.spoilerSection}>
            <div className={`${styles.spoilerBanner} ${styles.howtouse}`}>
              <h2 className="h2-bold">How to use the website</h2>
            </div>
            <div className={styles.spoilerCont}>
              {questions.howToUse.map((item, i) => (
                <div key={i}>
                  <FaqSpoiler spoiler={item} />
                  {i !== questions.howToUse.length - 1 && (
                    <div className={styles.underline} />
                  )}
                </div>
              ))}
            </div>
          </section>

          <section id="tech-specs" className={styles.spoilerSection}>
            <div className={`${styles.spoilerBanner} ${styles.techspecs}`}>
              <h2 className="h2-bold">Tech specs</h2>
            </div>
            <div className={styles.spoilerCont}>
              {questions.techSpecs.map((item, i) => (
                <div key={i}>
                  <FaqSpoiler spoiler={item} />
                  {i !== questions.techSpecs.length - 1 && (
                    <div className={styles.underline} />
                  )}
                </div>
              ))}
            </div>
          </section>

          <section id="personalAccount" className={styles.spoilerSection}>
            <div className={`${styles.spoilerBanner} ${styles.personalaccount}`}>
              <h2 className="h2-bold">Personal account</h2>
            </div>
            <div className={styles.spoilerCont}>
              {questions.personalAccount.map((item, i) => (
                <div key={i}>
                  <FaqSpoiler spoiler={item} />
                  {i !== questions.personalAccount.length - 1 && (
                    <div className={styles.underline} />
                  )}
                </div>
              ))}
            </div>
          </section>

          <section id="pricing" className={styles.spoilerSection}>
            <div className={`${styles.spoilerBanner} ${styles.pricing}`}>
              <h2 className="h2-bold">Pricing</h2>
            </div>
            <div className={styles.spoilerCont}>
              {questions.pricing.map((item, i) => (
                <div key={i}>
                  <FaqSpoiler spoiler={item} />
                  {i !== questions.pricing.length - 1 && (
                    <div className={styles.underline} />
                  )}
                </div>
              ))}
            </div>
          </section>

          <section id="payment" className={styles.spoilerSection}>
            <div className={`${styles.spoilerBanner} ${styles.payment}`}>
              <h2 className="h2-bold">Payment</h2>
            </div>
            <div className={styles.spoilerCont}>
              {questions.payment.map((item, i) => (
                <div key={i}>
                  <FaqSpoiler spoiler={item} />
                  {i !== questions.payment.length - 1 && (
                    <div className={styles.underline} />
                  )}
                </div>
              ))}
            </div>
          </section>

          <section id="license" className={styles.spoilerSection}>
            <div className={`${styles.spoilerBanner} ${styles.license}`}>
              <h2 className="h2-bold">License</h2>
            </div>
            <div className={styles.spoilerCont}>
              {questions.license.map((item, i) => (
                <div key={i}>
                  <FaqSpoiler spoiler={item} />
                  {i !== questions.license.length - 1 && (
                    <div className={styles.underline} />
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
      <div style={{position: 'relative', zIndex: '10', color: 'white'}}>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ContacUs onClose={handleClose}/>
      </Modal>
      </div>
    </div>
  );
};

export default Faq;
