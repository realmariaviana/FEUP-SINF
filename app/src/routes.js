import Dashboard from "@material-ui/icons/Dashboard";
import SettingsIcon from '@material-ui/icons/Settings';
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Processes from "views/Processes.js";
import Settings from "views/Settings.js";
import MasterData from "views/MasterData.js";
import Logs from "views/Logs.js";

const dashboardRoutes = [
  {
    path: "/processes",
    name: "Processes",
    icon: Dashboard,
    component: Processes,
    layout: "/admin"
  },
  {
    path: "/settings",
    name: "Settings",
    icon: SettingsIcon,
    component: Settings,
    layout: "/admin"
  },
  {
    path: "/masterdata",
    name: "Master Data",
    icon: "content_paste",
    component: MasterData,
    layout: "/admin"
  },
  {
    path: "/logs",
    name: "Logs",
    icon: LibraryBooks,
    component: Logs,
    layout: "/admin"
  },
];

export default dashboardRoutes;
