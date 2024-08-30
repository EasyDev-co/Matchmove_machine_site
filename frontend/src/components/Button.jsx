import PropTypes from "prop-types"

const ICONS = {
    arrowRight: (
        <svg width="27" height="36" viewBox="0 0 27 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.707 11.9908L22.364 17.6478C22.5515 17.8354 22.6568 18.0897 22.6568 18.3548C22.6568 18.62 22.5515 18.8743 22.364 19.0618L16.707 24.7188C16.5184 24.901 16.2658 25.0018 16.0036 24.9995C15.7414 24.9972 15.4906 24.8921 15.3052 24.7067C15.1198 24.5212 15.0146 24.2704 15.0123 24.0082C15.01 23.746 15.1108 23.4934 15.293 23.3048L19.243 19.3548L6 19.3548C5.73478 19.3548 5.48043 19.2495 5.29289 19.0619C5.10536 18.8744 5 18.6201 5 18.3548C5 18.0896 5.10536 17.8353 5.29289 17.6477C5.48043 17.4602 5.73478 17.3548 6 17.3548L19.243 17.3548L15.293 13.4048C15.1975 13.3126 15.1213 13.2022 15.0689 13.0802C15.0165 12.9582 14.9889 12.827 14.9877 12.6942C14.9866 12.5615 15.0119 12.4298 15.0622 12.3069C15.1125 12.184 15.1867 12.0723 15.2806 11.9784C15.3745 11.8845 15.4861 11.8103 15.609 11.76C15.7319 11.7097 15.8636 11.6844 15.9964 11.6856C16.1292 11.6867 16.2604 11.7143 16.3824 11.7667C16.5044 11.8191 16.6148 11.8953 16.707 11.9908Z" />
        </svg>
    ),
    person: (
        <svg width="27" height="36" viewBox="0 0 27 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.9961 12.0677C17.9961 14.3143 16.2052 16.1355 13.9961 16.1355C11.787 16.1355 9.99609 14.3143 9.99609 12.0677C9.99609 9.82118 11.787 8 13.9961 8C16.2052 8 17.9961 9.82118 17.9961 12.0677Z" stroke="currentColor" strokeWidth="2" />
            <path d="M17.4091 19.8645H10.5909C7.45288 19.8645 4.64207 22.828 6.70731 25.2443C8.11176 26.8875 10.4343 28 14 28C17.5657 28 19.8882 26.8875 21.2927 25.2443C23.3579 22.828 20.5471 19.8645 17.4091 19.8645Z" stroke="currentColor" strokeWidth="2" />
        </svg>
    ),
};
const Button = ({ iconType = null, label, onClick = () => {}, variant = 'blue', ...props }) => {
    const icon = ICONS[iconType] || null;
    const buttonClass = `custom-button ${variant ? `button-${variant}` : ''}`;

    return (
        <button className={buttonClass} onClick={onClick} {...props}>
            {label} {icon}
        </button>
    );
};

Button.propTypes = {
    iconType: PropTypes.oneOf(['arrowRight', 'person']),
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(['blue', 'red', 'outline-blue', 'outline-red', 'outline-grey']),
};

export default Button;