import PropTypes from "prop-types";

function SortBy({ handleChange }) {
  return (
    <div>
      <select
        name="select"
        className="border-solid border-2 border-gray-300 p-1 rounded-md"
        onChange={handleChange}
        defaultValue="default"
      >
        <option value="default" disabled>
          Ordre
        </option>
        <option value="asc">Alphabétique</option>
        <option value="desc">Inversé</option>
      </select>
    </div>
  );
}

SortBy.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default SortBy;
