import React from "react";
import PropTypes from "prop-types";

function UserCard({ user }) {
  return <div>{user.lastname}</div>;
}

UserCard.propTypes = {
  user: PropTypes.shape({
    lastname: PropTypes.string,
    firstname: PropTypes.string,
    pseudo: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default UserCard;
