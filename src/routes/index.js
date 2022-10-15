import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import AuthGaurd from "../Auth/AuthGaurd.js";
import Layout from "../layout/index.js";
import LoginPage from "../pages/Login/index.js";
import SignupPage from "../pages/Signup/index.js";

const Router = () => {
  return useRoutes([
    { path: "/Login", element: <LoginPage /> },
    { path: "/Signup", element: <SignupPage /> },
    {
      path: "/",
      element: (
        <AuthGaurd>
          <Layout />
        </AuthGaurd>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/Shop",
          element: <Shop />,
        },
      ],
    },
    {
      path: "*",
      element: <div>Not Found</div>,
    },
  ]);
};

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<div>loading ....</div>}>
      <Component {...props} />
    </Suspense>
  );
};
const Home = Loadable(lazy(() => import("../pages/Home/index.js")));
const Shop = Loadable(lazy(() => import("../pages/Shop/index.js")));
export default Router;
