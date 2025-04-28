import React from "react";

const ProtectedMenu = ({ role, allowedRoles, children }) => {
  if (allowedRoles.includes(role)) {
    return <>{children}</>;
  }
  return null; 
};

export default ProtectedMenu;
