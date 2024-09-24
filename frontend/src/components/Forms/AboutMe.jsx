
const AboutMe = ({ formData, handleChange }) => {
    return (
      <textarea
        type="text"
        id="aboutMe"
        name="aboutMe"
        placeholder="About me"
        value={formData.aboutMe}
        onChange={handleChange}
      />
    );
  };
  
  export default AboutMe;