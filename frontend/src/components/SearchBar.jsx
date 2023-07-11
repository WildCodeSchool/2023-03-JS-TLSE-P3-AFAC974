import PropTypes from "prop-types";

export default function SearchBar({ searchTerm, handleInputChange }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher une oeuvre..."
        className="border-solid border-2 border-gray-300 py-1 pl-2 rounded-md my-2"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
}

SearchBar.propTypes = {
  handleInputChange: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
};
