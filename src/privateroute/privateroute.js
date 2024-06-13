import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const carttoken = localStorage.getItem("carttoken") == null ? false : true;
    return carttoken ? children : <Navigate to="/login" />;
};
export default PrivateRoute;