import React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";

function Login({ loginModalOpened, setLoginModalOpened }) {
  return (
    <ReactModal
      isOpen={loginModalOpened}
      onRequestClose={() => setLoginModalOpened(false)}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          backgroundColor: "#fff",
          color: "#000",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40%",
          width: "40%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <div>
        <h1>Enregistrez vous</h1>
        <div>
          <img src="" alt="" />
          <p>Nom</p>
        </div>
        <div>
          <img src="" alt="" />
          <p>Prénom</p>
        </div>
        <div>
          <img src="" alt="" />
          <p>Coucou</p>
        </div>
      </div>
    </ReactModal>
  );
}

Login.propTypes = {
  loginModalOpened: PropTypes.bool.isRequired,
  setLoginModalOpened: PropTypes.func.isRequired,
};

export default Login;
