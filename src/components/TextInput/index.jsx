import "./styles.css";

export const TextInput = ({ searchValue, handleChange, placeholder }) => {
  return (
    <input
      className="text-input"
      type="search"
      value={searchValue}
      placeholder={!!placeholder ? placeholder : "Type your search"}
      onChange={(e) => handleChange(e)}
    />
  );
};
