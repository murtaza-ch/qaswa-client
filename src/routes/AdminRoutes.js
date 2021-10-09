import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import LoadingRedirect from "./LoadingRedirect";
import { currentAdmin } from "../ducks/actions";

const AdminRoutes = ({ children, ...rest }) => {
  const toast = useToast();
  const { user } = useSelector((state) => ({ ...state }));
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin({ toast })
        .then((res) => {
          setIsAdmin(true);
        })
        .catch((error) => {
          setIsAdmin(false);
        });
    }
  }, [user, toast]);

  return isAdmin ? <Route {...rest} /> : <LoadingRedirect />;
};

export default AdminRoutes;
