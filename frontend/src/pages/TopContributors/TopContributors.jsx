import { useSelector } from "react-redux";
import NavigationTop from "../../components/NavigationTop/NavigationTop";
import styles from "./TopContributors.module.css";
import Pagination from "../../components/Pagination/Pagination";
import testPhoto from "../../assets/images/testava.jpg";

const TopContributors = () => {
  const { products, status } = useSelector((state) => state.products);

  const test = [
    {
        photo: testPhoto,
        name: 'Pidor Ivanov',
        quantity: '666',
    },
  ]

//Сделай функцию для поиска в массиве
  return (
    <div>
      <NavigationTop
        title="Top Contribution"
        text="We spotlight the incredible users who power the Distortion Grids Database! 
        This page recognizes our top contributors, ranked by the number of their uploaded 
        assets that have passed moderation. Your contributions are vital in building 
        a fantastic resource for the community."
      />
      <section className={`height`}>
        <Pagination
          pagination={{
            count: products.count,
            next: products.next,
            previous: products.previous,
          }}
        />
        <div className={styles.main}>
          
        </div>
        <Pagination
          pagination={{
            count: products.count,
            next: products.next,
            previous: products.previous,
          }}
        />
      </section>
    </div>
  );
};

export default TopContributors;
