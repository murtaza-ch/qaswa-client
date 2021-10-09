import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import LoadingRedirect from "./LoadingRedirect";

const UserRoutes = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? <Route {...rest} /> : <LoadingRedirect />;
};

export default UserRoutes;
