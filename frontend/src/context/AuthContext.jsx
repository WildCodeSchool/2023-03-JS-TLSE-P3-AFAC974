import React, { createContext, useState, useMemo, useEffect } from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const AuthContext = createContext();

export default AuthContext;

export function AuthProvider({ children }) {
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedRole = Cookies.get("role");
    const storedId = Cookies.get("sub");
    if (storedRole && storedId) {
      setUserRole(Number(storedRole));
      setUserId(Number(storedId));
    }
  }, []);

  const authValue = useMemo(
    () => ({
      userRole,
      setUserRole,
      userId,
      setUserId,
    }),
    [userRole, userId]
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
