import { useRoutes } from "react-router-dom";
import Claim from "./components/claim/Claim";
import DashboardLayout from "./components/dashboard";
import Collections from "./components/collection/Collection";
import Landing from "./components/landing/Landing";
import LendingPageLayout from "./components/landing/LendingPageLayout"; 
import Profile from "./components/profile/Profile";
import CreateTemplate from "./components/template/CreateTemplate";
import Broadcast from "./components/Broadcast";
import Collectors from "./components/List/Collectors";
import Badge1 from "./badge/Badge";
import Index from "./badge/Index";
import User from "./components/profile";
import NewTemplates from "./components/template/NewTemplates";

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [ 
        {
          path: "collection",
          element: <Collections />, 
        },
        {
          path:"collectors/:token",
          element: <Collectors/>
        },
        {
          path: "profile",
          element: <User />,
        },
        {
          path: "templates",
          element: <CreateTemplate />,
        },
        {
          path: "broadcast",
          element: <Broadcast />,
        }, 
        {
          path: "badge",
          element: <Index/> ,
        },
        {
          path: "temp",
          element: <NewTemplates/> ,
        },
      ],
    },
    {
      path: "/",
      element: <LendingPageLayout />,
      children: [{ path: "/", element: <Landing /> }],
    },
    {
      path: "/claim",
      element: <LendingPageLayout />,
      children: [{ path: "/claim/:token", element: <Claim /> }],
    },
  ]);
}
