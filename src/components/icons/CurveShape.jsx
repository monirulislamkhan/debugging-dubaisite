export default function CurveShape({ className, ...props }) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="320"
        height="104"
        viewBox="0 0 320 104"
        className={className}
        {...props}
      >
        <path
          d="M0 0H320C290.545 0 267.772 24.6753 253.628 49.8666C235.516 82.1247 200.378 104 160 104C119.622 104 84.4835 82.1247 66.3718 49.8666C52.228 24.6753 29.4552 0 0 0Z"
          fill="currentColor"
        ></path>
      </svg>
    </>
  );
}
