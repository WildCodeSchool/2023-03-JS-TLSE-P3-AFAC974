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
  const [jwtCookie, setJwtCookie] = useState(null);
  const [headers, setHeaders] = useState(null);
  useEffect(() => {
    setJwtCookie(Cookies.get("jwt"));
  }, [Cookies.get("jwt")]);

  useEffect(() => {
    setHeaders({
      Authorization: `Bearer ${jwtCookie}`,
      "Content-Type": "application/json",
    });
  }, [jwtCookie]);

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
      jwtCookie,
      setJwtCookie,
    }),
    [userRole, userId, loggedUserData, isLoadedUser, headers, jwtCookie]
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
