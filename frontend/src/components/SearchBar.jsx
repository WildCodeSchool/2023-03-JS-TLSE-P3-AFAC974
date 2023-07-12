import PropTypes from "prop-types";

export default function SearchBar({
  placeholder,
  searchTerm,
  handleInputChange,
}) {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        className="border-solid border-2 border-gray-300 py-1 pl-2 rounded-md"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  handleInputChange: PropTypes.func,
  searchTerm: PropTypes.string,
};

SearchBar.defaultProps = {
  placeholder: "Rechercher ...",
  handleInputChange: () => {},
  searchTerm: "",
};
