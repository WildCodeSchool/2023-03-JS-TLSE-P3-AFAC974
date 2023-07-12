// import { useContext } from "react";
// import { Route, Redirect } from "react-router-dom";
// import { AuthContext } from "./AuthContext";

// export default function PrivateRoute({
//   component: Component,
//   allowedRoles,
//   ...rest
// }) {
//   const { userRole } = useContext(AuthContext);

//   const isRoleAllowed = allowedRoles.includes(userRole);

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isRoleAllowed ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/unauthorized" />
//         )
//       }
//     />
//   );
// }

// import React, { useContext } from "react";
// import { Route, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import Unauthorized from "../pages/Unauthorized";

// const PrivateRoute = ({ path, element: Element, allowedRoles }) => {
//   const { userRole } = useContext(AuthContext);

//   const isRoleAllowed = allowedRoles.includes(userRole);

//   if (isRoleAllowed) {
//     return <Route path={path} element={<Element />} />;
//   } else {
//     return <Route path="/unauthorized" element={<Unauthorized />} />;
//   }
// };

// export default PrivateRoute;
