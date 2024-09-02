import PropTypes from "prop-types"

const ICONS = {
  arrowRight: (
    <svg
      width="27"
      height="36"
      viewBox="0 0 27 36"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16.707 11.9908L22.364 17.6478C22.5515 17.8354 22.6568 18.0897 22.6568 18.3548C22.6568 18.62 22.5515 18.8743 22.364 19.0618L16.707 24.7188C16.5184 24.901 16.2658 25.0018 16.0036 24.9995C15.7414 24.9972 15.4906 24.8921 15.3052 24.7067C15.1198 24.5212 15.0146 24.2704 15.0123 24.0082C15.01 23.746 15.1108 23.4934 15.293 23.3048L19.243 19.3548L6 19.3548C5.73478 19.3548 5.48043 19.2495 5.29289 19.0619C5.10536 18.8744 5 18.6201 5 18.3548C5 18.0896 5.10536 17.8353 5.29289 17.6477C5.48043 17.4602 5.73478 17.3548 6 17.3548L19.243 17.3548L15.293 13.4048C15.1975 13.3126 15.1213 13.2022 15.0689 13.0802C15.0165 12.9582 14.9889 12.827 14.9877 12.6942C14.9866 12.5615 15.0119 12.4298 15.0622 12.3069C15.1125 12.184 15.1867 12.0723 15.2806 11.9784C15.3745 11.8845 15.4861 11.8103 15.609 11.76C15.7319 11.7097 15.8636 11.6844 15.9964 11.6856C16.1292 11.6867 16.2604 11.7143 16.3824 11.7667C16.5044 11.8191 16.6148 11.8953 16.707 11.9908Z" />
    </svg>
  ),
  arrowLeft: (
    <svg
      width="27"
      height="37"
      viewBox="0 0 27 37"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_3719_6079"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="5"
        y="12"
        width="18"
        height="14"
      >
        <path
          d="M5.29279 18.1486C5.10532 18.3362 5 18.5905 5 18.8556C5 19.1208 5.10532 19.3751 5.29279 19.5626L10.9498 25.2196C11.1384 25.4018 11.391 25.5026 11.6532 25.5003C11.9154 25.498 12.1662 25.3929 12.3516 25.2075C12.537 25.0221 12.6422 24.7712 12.6445 24.509C12.6467 24.2469 12.5459 23.9943 12.3638 23.8056L8.41379 19.8556L21.6568 19.8556C21.922 19.8556 22.1764 19.7503 22.3639 19.5628C22.5514 19.3752 22.6568 19.1209 22.6568 18.8556C22.6568 18.5904 22.5514 18.3361 22.3639 18.1485C22.1764 17.961 21.922 17.8556 21.6568 17.8556L8.41379 17.8556L12.3638 13.9056C12.5459 13.717 12.6467 13.4644 12.6445 13.2022C12.6422 12.9401 12.537 12.6892 12.3516 12.5038C12.1662 12.3184 11.9154 12.2133 11.6532 12.211C11.391 12.2087 11.1384 12.3095 10.9498 12.4916L5.29279 18.1486Z"
          fill="black"
        />
      </mask>
      <g mask="url(#mask0_3719_6079)">
        <rect
          width="27"
          height="36"
          transform="matrix(1 0 0 -1 0 36.5)"
          fill="currentColor"
        />
      </g>
    </svg>
  ),
  person: (
    <svg
      width="27"
      height="36"
      viewBox="0 0 27 36"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.9961 12.0677C17.9961 14.3143 16.2052 16.1355 13.9961 16.1355C11.787 16.1355 9.99609 14.3143 9.99609 12.0677C9.99609 9.82118 11.787 8 13.9961 8C16.2052 8 17.9961 9.82118 17.9961 12.0677Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M17.4091 19.8645H10.5909C7.45288 19.8645 4.64207 22.828 6.70731 25.2443C8.11176 26.8875 10.4343 28 14 28C17.5657 28 19.8882 26.8875 21.2927 25.2443C23.3579 22.828 20.5471 19.8645 17.4091 19.8645Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  ),
  crossbtn: (
    <svg
      width="27"
      height="36"
      viewBox="0 0 27 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_3719_35129"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="1"
        y="5"
        width="26"
        height="26"
      >
        <path
          d="M14 5C6.811 5 1 10.811 1 18C1 25.189 6.811 31 14 31C21.189 31 27 25.189 27 18C27 10.811 21.189 5 14 5ZM14 28.4C8.267 28.4 3.6 23.733 3.6 18C3.6 12.267 8.267 7.6 14 7.6C19.733 7.6 24.4 12.267 24.4 18C24.4 23.733 19.733 28.4 14 28.4ZM18.667 11.5L14 16.167L9.333 11.5L7.5 13.333L12.167 18L7.5 22.667L9.333 24.5L14 19.833L18.667 24.5L20.5 22.667L15.833 18L20.5 13.333L18.667 11.5Z"
          fill="#BF3636"
        />
      </mask>
      <g mask="url(#mask0_3719_35129)">
        <rect
          x="-3.11523"
          y="-6.92383"
          width="33.2308"
          height="49.8462"
          fill="white"
        />
      </g>
    </svg>
  ),
  checkMark: (
    <svg
      width="27"
      height="37"
      viewBox="0 0 27 37"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3719_7174)">
        <mask
          id="mask0_3719_7174"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="6"
          width="27"
          height="24"
        >
          <path
            d="M8.86205 29.5L0 20.3089L4.03858 16.1203L8.86205 21.1377L22.9614 6.5L27 10.6885L8.86205 29.5Z"
            fill="currentColor"
          />
        </mask>
        <g mask="url(#mask0_3719_7174)">
          <rect
            width="27"
            height="36"
            transform="matrix(-1 0 0 1 27 0.5)"
            fill="currentColor"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_3719_7174">
          <rect
            width="27"
            height="36"
            fill="currentColor"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  ),
  settings: (
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path 
    d="M22.1214 5.45482C20.9498 4.28325 19.0503 4.28324 17.8787 5.45482L15.8787 7.45482C15.3161 8.01742 14.553 8.3335 13.7574 8.3335H11.3334C9.67652 8.3335 8.33337 9.67664 8.33337 11.3335V13.7575C8.33337 14.5532 8.0173 15.3162 7.45469 15.8788L5.4547 17.8788C4.28312 19.0504 4.28312 20.9499 5.45469 22.1215L7.45469 24.1215C8.0173 24.6841 8.33337 25.4472 8.33337 26.2428V28.6668C8.33337 30.3237 9.67652 31.6668 11.3334 31.6668H13.7574C14.5531 31.6668 15.3161 31.9829 15.8787 32.5455L17.8787 34.5455C19.0503 35.7171 20.9498 35.7171 22.1214 34.5455L24.1214 32.5455C24.684 31.9829 25.447 31.6668 26.2427 31.6668H28.6667C30.3236 31.6668 31.6667 30.3237 31.6667 28.6668V26.2428C31.6667 25.4472 31.9828 24.6841 32.5454 24.1215L34.5454 22.1215C35.717 20.9499 35.717 19.0504 34.5454 17.8788L32.5454 15.8788C31.9828 15.3162 31.6667 14.5532 31.6667 13.7575V11.3335C31.6667 9.67664 30.3236 8.3335 28.6667 8.3335H26.2427C25.447 8.3335 24.684 8.01743 24.1214 7.45482L22.1214 5.45482Z" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinejoin="round"
  />
  <path 
    d="M20 25C21.3261 25 22.5979 24.4732 23.5355 23.5355C24.4732 22.5979 25 21.3261 25 20C25 18.6739 24.4732 17.4021 23.5355 16.4645C22.5979 15.5268 21.3261 15 20 15C18.6739 15 17.4021 15.5268 16.4645 16.4645C15.5268 17.4021 15 18.6739 15 20C15 21.3261 15.5268 22.5979 16.4645 23.5355C17.4021 24.4732 18.6739 25 20 25Z" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinejoin="round"
  />
</svg>
  ),
  logout: (
<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path 
    d="M27.1416 14.9998H13.7883M22.5166 21.0598L28.3333 14.9998L22.5166 8.93984M17.425 6.6665V1.6665H1.66663V28.3332H17.425V23.3332" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  />
</svg>
  ),
};
const Button = ({ iconType = null, label, labelPosition = 'left', onClick = () => {}, variant = 'blue', ...props }) => {
  const icon = ICONS[iconType] || null;
  const buttonClass = `custom-button ${variant ? `button-${variant}` : ''} ${labelPosition === 'none' ? 'no-label' : ''}`;

  const renderLabel = label && labelPosition !== 'none';
  const renderIcon = icon;

  return (
      <button className={buttonClass} onClick={onClick} {...props}>
          {labelPosition === 'left' && renderLabel && <span className="button-label">{label}</span>}
          {renderIcon && <span className="button-icon">{icon}</span>}
          {labelPosition === 'right' && renderLabel && <span className="button-label">{label}</span>}
      </button>
  );
};

Button.propTypes = {
  iconType: PropTypes.oneOf(['arrowRight', 'person', 'arrowLeft', 'checkMark', 'crossbtn', 'settings', 'logout']),
  label: PropTypes.string,
  labelPosition: PropTypes.oneOf(['left', 'right', 'none']),
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['blue', 'red', "grey", 'outline-blue', 'outline-red', 'outline-grey']),
};

export default Button;