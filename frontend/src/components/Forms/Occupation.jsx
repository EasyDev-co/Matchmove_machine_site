import { warningsvg} from "../../assets/svg/svgimages";
import Select from "./Select";
import styles from "./Select.module.css"

const Occupation = ({ formData, handleChange, errors }) => {

  const occupations = [
    { id: 'editor', label: 'Editor' },
    { id: 'director', label: 'Director' },
    { id: 'scriptwriter', label: 'Scriptwriter' },
    { id: 'producer', label: 'Producer' }
  ];

  const handleOccupationSelect = (selectedId) => {
    handleChange({ target: { name: 'occupation', value: selectedId } });
  };

  return (
    <div className={styles.occupationCont}>
      <Select
        placeholder="Select your occupation"
        options={occupations}
        selected={formData.occupation}
        onSelect={handleOccupationSelect}
      />
      {errors.occupation && (
        <div className="error-message">
          {warningsvg} {errors.occupation}
        </div>
      )}
    </div>
  );
};

export default Occupation;