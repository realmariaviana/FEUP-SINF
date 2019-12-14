import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
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
    icon: Person,
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
