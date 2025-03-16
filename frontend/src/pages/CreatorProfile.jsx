import CreatorProfileTop from "../components/ProfileTop/CreatorProfileTop";
import AboutAuthor from "../components/AboutAithor/AboutAuthor";
import SharePage from "../components/SharePage/SharePage";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCreatorProfile } from "../store/slices/creatorProfileSlice";

import { useParams } from "react-router-dom";

const CreatorProfile =()=>{

    const {profileId} = useParams()
    const dispatch = useDispatch()
    const {profile, status} = useSelector(state=> state.creatorProfile)
  
    useEffect(()=>{
      dispatch(fetchCreatorProfile(profileId))
    },[dispatch, profileId])
  
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
          <CreatorProfileTop profile={profile} status={status} />
          <AboutAuthor about={profile.about_me}/>
          {/* <SharePage profileId={profileId} profile={profile}/> */}
        </>
      );
    }
  }
  
  export default CreatorProfile