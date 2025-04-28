import { warningsvg} from "../../assets/svg/svgimages";

const Email = ({ formData, handleChange, errors, validateEmail, register = false }) => {
  const handleEmailChange = (e) => {
    const { value } = e.target;
    handleChange(e);

    if (!validateEmail(value)) {
      errors.email = 'Invalid email format'; 
    } else {
      errors.email = ''; 
    }
  };

  return (
    <>
      <input
        type="text"
        id="email"
        name="email"
        autoComplete="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={handleEmailChange}
        className={errors.email ? "error" : ""}
      />
      {errors.email && (
        <div className="error-message">
          {warningsvg} {register ? errors.email : 'Incorrect login or password'}
          {/* {errors.email} */}
        </div>
      )}
    </>
  );
};

export default Email;