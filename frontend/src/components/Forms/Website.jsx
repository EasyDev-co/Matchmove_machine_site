
const Website = ({ formData, handleChange }) => {
    return (
      <input
        type="text"
        id="website"
        name="website"
        placeholder="Website"
        value={formData.website}
        onChange={handleChange}
      />
    );
  };
  
  export default Website;