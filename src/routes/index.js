import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/Shop",
      element: <Shop />,
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
