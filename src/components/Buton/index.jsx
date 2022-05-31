import "./styles.css";

export const Button = ({ text, onClick, disabled }) => {
  return (
    <button className="button" disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
};
