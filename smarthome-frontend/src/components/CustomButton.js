import "../styles/Button.css";

function CustomButton({ content, onClick, className }) {
  return (
    <button className={`custom-button ${className}`} onClick={onClick}>
      {content}
    </button>
  );
}

export default CustomButton;
