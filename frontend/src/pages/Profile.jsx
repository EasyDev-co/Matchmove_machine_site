import ProfileTop from "../components/ProfileTop/ProfileTop"
import ProfileAssets from "../components/ProfileAssets"
import AboutAuthor from "../components/AboutAithor/AboutAuthor";
import SharePage from "../components/SharePage/SharePage";

const Profile=()=>{

    return (
      <>
        <ProfileTop />
        <ProfileAssets />
        <AboutAuthor/>
        <SharePage/>
      </>
    );
}

export default Profile