import React, { useEffect, useState } from "react";
import styles from "./Slider.module.css";
import sliderRight from "../../assets/svg/sliderRight.svg";
import sliderLeft from "../../assets/svg/sliderLeft.svg";

const Slider = ({ items = [], visibleSlides = 3 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Если items не передан или пуст, возвращаем null или заглушку
  if (!items || items.length === 0) {
    return <div>Нет данных для отображения</div>;
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + visibleSlides) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - visibleSlides + items.length) % items.length
    );
  };

  // Вычисляем видимые слайды
  const visibleItems = [];
  for (let i = 0; i < visibleSlides; i++) {
    const index = (currentIndex + i) % items.length;
    visibleItems.push(items[index]);
  }

  return (
    <div className={styles.slider}>
      <div className={styles.sliderContent}>
        {visibleItems.map((item, index) => (
          <div key={index} className={styles.slide}>
            {item}
          </div>
        ))}
      </div>
      <div className={styles.sliderControls}>
        <button
          className={`${styles.sliderButton} ${styles.left}`}
          onClick={prevSlide}
        >
          <img src={sliderLeft} alt="Previous" />
        </button>
        <div className={styles.sliderDots}>
          {Array.from({ length: Math.ceil(items.length / visibleSlides) }).map(
            (_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${
                  index === Math.floor(currentIndex / visibleSlides)
                    ? styles.active
                    : ""
                }`}
                onClick={() => setCurrentIndex(index * visibleSlides)}
              ></span>
            )
          )}
        </div>
        <button
          className={`${styles.sliderButton} ${styles.right}`}
          onClick={nextSlide}
        >
          <img src={sliderRight} alt="Next" />
        </button>
      </div>
    </div>
  );
};

export default Slider;
