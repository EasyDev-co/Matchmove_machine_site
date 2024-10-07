import { warningsvg} from "../../assets/svg/svgimages";

const Name = ({ formData, handleChange, errors }) => {
    return (
      <>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          autoComplete="username"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? "error" : ""}
        />
        {errors.name && (
          <div className="error-message">
            {warningsvg} {errors.name}
          </div>
        )}
      </>
    );
  };
  
  export default Name;