
const Portfolio = ({ formData, handleChange }) => {
    return (
      <input
        type="text"
        id="portfolio"
        name="portfolio"
        placeholder="Portfolio"
        value={formData.portfolio}
        onChange={handleChange}
      />
    );
  };
  
  export default Portfolio;