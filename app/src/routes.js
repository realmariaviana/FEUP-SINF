// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import Settings from "views/Settings/Settings.js";
import MasterData from "views/MasterData/MasterData.js";
import Typography from "views/Typography/Typography.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/settings",
    name: "Settings",
    icon: Person,
    component: Settings,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Master Data",
    icon: "content_paste",
    component: MasterData,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Logs",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
