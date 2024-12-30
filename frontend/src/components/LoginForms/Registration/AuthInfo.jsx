import {useState} from "react";
import Button from "../../Button";
import Email from "../../Forms/Email";
import Password from "../../Forms/Password";
import Name from "../../Forms/Name";
import Occupation from "../../Forms/Occupation";
import {setEmail} from "../../../store/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../../store/userSlice";

const AuthInfo = ({handleNext}) => {

    const dispatch = useDispatch();
    const {status} = useSelector(state => state.user)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        old_password: '',
        occupation: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        occupation: '',
    });

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });

        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        return passwordRegex.test(password);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;
        let newErrors = {};

        if (!formData.name) {
            newErrors.name = 'Name is required';
            valid = false;
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
            valid = false;
        }

        if (!formData.old_password) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (!validatePassword(formData.old_password)) {
            newErrors.password = 'Password must be at least 8 characters, contain latin letters and numbers';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            try {
                await dispatch(registerUser({
                    username: formData.name,
                    email: formData.email,
                    password: formData.old_password
                })).unwrap();
                dispatch(setEmail(formData.email))
                handleNext(); // Call handleNext after successful registration
            } catch (error) {

                const backendErrors = error;
                let apiErrors = {};

                if (backendErrors.email) {
                    apiErrors.email = backendErrors.email[0];
                }
                if (backendErrors.username) {
                    apiErrors.name = backendErrors.username[0];
                }
                if (backendErrors.password) {
                    apiErrors.password = backendErrors.password[0];
                }

                // Update local errors state
                setErrors(prevErrors => ({
                    ...prevErrors,
                    ...apiErrors,
                }));
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <Name
                    formData={{name: formData.name}}
                    handleChange={handleChange}
                    errors={errors}
                />
                <Email
                    formData={{email: formData.email}}
                    handleChange={handleChange}
                    errors={errors}
                    validateEmail={validateEmail}
                />
                <Password
                    formData={{old_password: formData.old_password}}
                    setFormData={setFormData}
                    errors={errors}
                    setErrors={setErrors}
                />
                <Occupation
                    formData={{occupation: formData.occupation}}
                    handleChange={handleChange}
                    errors={errors}
                />
                <Button variant={status.registerStatus === "loading" ? "grey" : "blue"} iconType="arrowRight"
                        type="submit" label={status.registerStatus === "loading" ? "Registration..." : "Next"}/>
            </div>
        </form>
    );
};

export default AuthInfo;