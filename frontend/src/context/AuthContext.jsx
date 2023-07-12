import React, { createContext, useState, useMemo, useEffect } from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const AuthContext = createContext();

export default AuthContext;

export function AuthProvider({ children }) {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedRole = Cookies.get("role");
    if (storedRole) {
      setUserRole(Number(storedRole));
    }
  }, []);

  const authValue = useMemo(
    () => ({
      userRole,
      setUserRole,
    }),
    [userRole]
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
