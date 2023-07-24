import React, { createContext, useState, useMemo, useEffect } from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const AuthContext = createContext();

export default AuthContext;

export function AuthProvider({ children }) {
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loggedUserData, setLoggedUserData] = useState(null);
  const [isLoadedUser, setIsLoadedUser] = useState(false);
  const [hope, setHope] = useState(null);
  const [headers, setHeaders] = useState(null);
  useEffect(() => {
    setHope(Cookies.get("jwt"));
  }, [Cookies.get("jwt")]);

  useEffect(() => {
    setHeaders({
      Authorization: `Bearer ${hope}`,
      "Content-Type": "application/json",
    });
  }, [hope]);

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
      loggedUserData,
      setLoggedUserData,
      isLoadedUser,
      setIsLoadedUser,
      headers,
      hope,
      setHope,
    }),
    [userRole, userId, loggedUserData, isLoadedUser, headers, hope]
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
