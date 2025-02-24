import styles from "./AffiliateProgram.module.css";
import NavigationTop from "../../components/NavigationTop/NavigationTop";
import ContributionForm from "../../components/ContributionForm/ContributionForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopContributors } from "../../store/slices/topContributorsSlice";
import { useEffect } from "react";
import iconimg from "../../assets/images/iconplaceholder.png";
import countFiles from "../../assets/svg/countFiles.svg";
import arrowbtn from "../../assets/svg/arrowbtn.svg";
import { useNavigate } from "react-router-dom";
import MiniTopContributors from "../../components/MiniTopContributors/MiniTopContributors";

const AffiliateProgram = () => {
  const navigate =useNavigate()
  const dispatch = useDispatch();
  const { top, status, error } = useSelector((state) => state.topContribiutors);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTopContributors());
    }
    console.log(top);
  }, [status, dispatch]);
  return (
    <>
      <NavigationTop title="Affiliate program" />
      <section className={`height ${styles.main}`}>
        <div className={styles.container}>
          <div className={`h4-medium ${styles.textCont}`}>
            <p>
              {" "}
              <span>Join the community of Lens Distortion Contributors!</span>
            </p>
            <p>
              <span>Shape the future.</span> Let’s build the most comprehensive
              Distortion Grids Database. Your shared distortion grids will make
              this resource even more valuable for the entire community.
            </p>
            <p>
              <span>Become a Contributor & Earn rewards.</span> Everyone who
              uploads distortion grids and gets them approved by our team
              becomes a valued contributor. You'll receive a{" "}
              <span> 15% discount promo code</span> for any purchase in the
              Distortion Grids Database as a token of our appreciation. Top
              contributors, those who consistently share high-quality assets,
              will be recognized on a dedicated page, showcasing their work to a
              wider audience.
            </p>
            <p>
              <span>Let's push the boundaries of CG together!</span> Share your
              assets and contribute to this ever-growing resource. The more
              distortion grids we have, the more options artists will have to
              bring their visions to life. Upload your grids today and become
              part of a thriving creative community!
            </p>
          </div>
          <ContributionForm />
        </div>
        <MiniTopContributors />
      </section>
    </>
  );
};

export default AffiliateProgram;
