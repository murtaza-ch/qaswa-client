import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  History,
  Wishlist,
  Password,
  Dashboard,
  RegisterComplete,
  ProductCreate,
  ProductList,
  ProductUpdate,
  CategoryCreate,
  CategoryList,
  CategoryUpdate,
} from "../containers";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";

const AppRoutes = () => {
  return (
    <Switch>
      {/* Public route */}
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/register/complete" component={RegisterComplete} />

      {/* User Routes */}
      <UserRoutes exact path="/user/history" component={History} />
      <UserRoutes exact path="/user/wishlist" component={Wishlist} />
      <UserRoutes exact path="/user/password" component={Password} />

      {/* Admin Routes */}
      <AdminRoutes exact path="/admin/dashboard" component={Dashboard} />

      {/* Admin Prodct */}
      <AdminRoutes
        exact
        path="/admin/product/create"
        component={ProductCreate}
      />
      <AdminRoutes exact path="/admin/product/list" component={ProductList} />
      <AdminRoutes
        exact
        path="/admin/product/update"
        component={ProductUpdate}
      />

      {/* Admin Category */}
      <AdminRoutes
        exact
        path="/admin/category/create"
        component={CategoryCreate}
      />
      <AdminRoutes exact path="/admin/category/list" component={CategoryList} />
      <AdminRoutes
        exact
        path="/admin/category/update/:slug"
        component={CategoryUpdate}
      />
    </Switch>
  );
};

export default AppRoutes;

// export const routes = [
//   {
//     exact: true,
//     path: "/login",
//     Comp: Login,
//     guarded: false,
//   },
//   {
//     exact: true,
//     path: "/register",
//     Comp: Register,
//     guarded: false,
//   },
//   {
//     exact: true,
//     path: "/register/complete",
//     Comp: RegisterComplete,
//     guarded: false,
//   },
//   {
//     exact: true,
//     path: "/",
//     Comp: Home,
//     guarded: true,
//   },
//   {
//     exact: true,
//     path: "/user/history",
//     Comp: History,
//     guarded: true,
//   },
//   {
//     exact: true,
//     path: "/user/wishlist",
//     Comp: Wishlist,
//     guarded: true,
//   },
//   {
//     exact: true,
//     path: "/user/password",
//     Comp: Password,
//     guarded: true,
//   },
// ];
