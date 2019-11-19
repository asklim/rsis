// @material-ui/icons
//import Dashboard from "@material-ui/icons/Dashboard";
//import AddBox from "@material-ui/icons/AddBoxOutlined";
//import Fingerprint from '@material-ui/icons/Fingerprint';
import {
  AddBoxOutlined,
  ArrowBack,
  Fingerprint,
} from "@material-ui/icons";

// core components/views for Invoice layout
import DashboardPage from "../views/m-d-r/Dashboard.js";
import DialogList from "../views/DialogList.js";
import ProcurementBoardPage from "../views/ProcurementBoard.js";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Back to Dashboard",
    rtlName: "rtl_Back",
    icon: ArrowBack,      //Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/procurement",
    name: "Procurement",
    rtlName: "rtl_procurement",
    icon: AddBoxOutlined,
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
