// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import AddBox from "@material-ui/icons/AddBoxOutlined";
import Fingerprint from '@material-ui/icons/Fingerprint';


// core components/views for Invoice layout
import DashboardPage from "../views/m-d-r/Dashboard.jsx";
import DialogList from "../views/m-d-r/DialogList.jsx";
import ProcurementBoardPage from "../views/ProcurementBoard.jsx";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "rtl_admin",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/procurement",
    name: "Procurement",
    rtlName: "rtl_procurement",
    icon: AddBox,
    component: ProcurementBoardPage,
    layout: "/invoice"
  },
  {
    path: "/dialogs",
    name: "Dialog List",
    rtlName: "rtl_dialogs",
    icon: Fingerprint,
    component: DialogList,
    layout: "/invoice"
  },
];

export default dashboardRoutes;
