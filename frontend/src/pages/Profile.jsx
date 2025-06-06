import ProfileTop from "../components/ProfileTop/ProfileTop"
import ProfileAssets from "../components/ProfileAssets"
import AboutAuthor from "../components/AboutAithor/AboutAuthor";
import SharePage from "../components/SharePage/SharePage";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../store/slices/profileSlice";
import { useNavigate } from "react-router-dom";

const Profile=()=>{

  const dispatch = useDispatch()
  const {profile, status} = useSelector(state=> state.profile)
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(fetchUserProfile())
  },[dispatch])

  if(status.fetchUserProfileStatus==="loading"){
    return(<LoadingScreen/>)
  }

  if(status.fetchUserProfileStatus==="failed"){
    navigate("/authorization");
    // return(
    //   <section className="width">
    //     <h2 className="h2-medium">An error occurred</h2>
    //     <p className="h4-medium">Please refresh or try again later. If the issue persists, contact support.</p>
    //   </section>
    // )
  }


  if(profile){
    return (
      <>
        <ProfileTop profile={profile} status={status} />
        <ProfileAssets />
        {profile.about_me && <AboutAuthor about={profile.about_me}/>}
      </>
    );
  }
}

export default Profile