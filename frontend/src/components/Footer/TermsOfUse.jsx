import { termsOfUse } from "../../assets/dummyData";

function TermsOfUse() {
    return ( 
        <div dangerouslySetInnerHTML={{ __html: termsOfUse }} />
     );
}

export default TermsOfUse