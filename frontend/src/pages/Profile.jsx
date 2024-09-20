import ProfileTop from "../components/ProfileTop/ProfileTop"
import ProfileAssets from "../components/ProfileAssets"
import AboutAuthor from "../components/AboutAithor/AboutAuthor";
import SharePage from "../components/SharePage/SharePage";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../store/slices/profileSlice";

const Profile=()=>{

  const dispatch = useDispatch()
  const {profile, status} = useSelector(state=> state.profile)

  useEffect(()=>{
    dispatch(fetchUserProfile())
  },[dispatch])

  if(profile){

    return (
      <>
        <ProfileTop profile={profile} status={status} />
        <ProfileAssets />
        <AboutAuthor about={profile.about_me}/>
        <SharePage/>
      </>
    );
  }
}

export default Profile