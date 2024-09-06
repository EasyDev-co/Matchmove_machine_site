import styles from "./AffiliateProgram.module.css"
import NavigationTop from "../../components/NavigationTop/NavigationTop"
import ContributionForm from "../../components/ContributionForm/ContributionForm";


const AffiliateProgram =()=>{
    return (
      <>
        <NavigationTop title="Affiliate program" />
        <section className="height">
          <div>
            <p>Join the community of Lens Distortion Contributors!</p>
            <p>
              Shape the future. Let’s build the most comprehensive Distortion
              Grids Database. Your shared distortion grids will make this
              resource even more valuable for the entire community.
            </p>
            <p>Become a Contributor &
              Earn rewards. Everyone who uploads distortion grids and gets them
              approved by our team becomes a valued contributor. You'll receive
              a 15% discount promo code for any purchase in the Distortion Grids
              Database as a token of our appreciation. Top contributors, those
              who consistently share high-quality assets, will be recognized on
              a dedicated page, showcasing their work to a wider audience.</p>
              <p>Let's
              push the boundaries of CG together! Share your assets and
              contribute to this ever-growing resource. The more distortion
              grids we have, the more options artists will have to bring their
              visions to life. Upload your grids today and become part of a
              thriving creative community!</p>
          </div>
          <ContributionForm/>
        </section>
      </>
    );
}

export default AffiliateProgram