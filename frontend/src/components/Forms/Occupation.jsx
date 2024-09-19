import { warningsvg} from "../../assets/svg/svgimages";

const Occupation = ({ formData, handleChange, errors }) => {
  
    const occupations = ['Editor', 'Director', 'Scriptwriter', 'Producer'];
  
    return (
      <>
        <select
          id="occupation"
          name="occupation"
          value={formData.occupation || ''}
          onChange={handleChange}
          className={errors.occupation ? "error" : ""}
        >
          <option value="" disabled>Select your occupation</option>
          {occupations.map((occupation) => (
            <option key={occupation} value={occupation}>
              {occupation}
            </option>
          ))}
        </select>
        {errors.occupation && (
          <div className="error-message">
            {warningsvg} {errors.occupation}
          </div>
        )}
      </>
    );
  };
  
  export default Occupation;