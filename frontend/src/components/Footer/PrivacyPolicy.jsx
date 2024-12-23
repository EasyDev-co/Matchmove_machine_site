import { privacyPolicy } from "../../assets/dummyData";

function PrivacyPolicy() {
    return ( 
        <div dangerouslySetInnerHTML={{ __html: privacyPolicy }} />
     );
}

export default PrivacyPolicy;