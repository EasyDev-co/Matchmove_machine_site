import { warningsvg} from "../../assets/svg/svgimages";
import Select from "./Select";
import styles from "./Select.module.css"

const Occupation = ({ formData, handleChange, errors }) => {

  const occupations = [
    { id: '1st AC', label: '1st AC' },
    { id: '3D Modeler', label: '3D Modeler' },
    { id: 'Animator', label: 'Animator' },
    { id: 'Cameraman', label: 'Cameraman' },
    { id: 'Character Artist', label: 'Character Artist' },
    { id: 'Compositor', label: 'Compositor' },
    { id: 'Concept Artist', label: 'Concept Artist' },
    { id: 'DoP', label: 'DoP' },
    { id: 'Environment Artist', label: 'Environment Artist' },
    { id: 'Lighting Artist', label: 'Lighting Artist' },
    { id: 'On-set supervisor', label: 'On-set supervisor' },
    { id: 'VFX Artist', label: 'VFX Artist' },
    { id: 'VFX supervisor', label: 'VFX supervisor' },
    { id: 'Other', label: 'Other' },
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