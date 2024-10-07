import ProfileTop from "../components/ProfileTop/ProfileTop"
import ProfileAssets from "../components/ProfileAssets"
import AboutAuthor from "../components/AboutAithor/AboutAuthor";
import SharePage from "../components/SharePage/SharePage";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../store/slices/profileSlice";

const Profile=()=>{

  const { id } = useParams();
  const dispatch = useDispatch()
  const {profile, status} = useSelector(state=> state.profile)

  useEffect(()=>{
    dispatch(fetchUserProfile())
  },[dispatch])

  if(status.fetchUserProfileStatus==="loading"){
    return(<LoadingScreen/>)
  }

  if(status.fetchUserProfileStatus==="failed"){
    return(
      <section className="width">
        <h2 className="h2-medium">An error occurred</h2>
        <p className="h4-medium">Please refresh or try again later. If the issue persists, contact support.</p>
      </section>
    )
  }


  if(profile){
    return (
      <>
        <ProfileTop profile={profile} status={status} profileId={id} />
        <ProfileAssets />
        <AboutAuthor about={profile.about_me}/>
        <SharePage profileId={id} profileQR={profile.qr_code}/>
      </>
    );
  }
}

export default Profile