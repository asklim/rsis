// Google Material-UI/icons
import {
    AddBoxOutlined,
    ArrowBack,
    Fingerprint,
} from "@mui/icons-material";

// core components/views for Invoice layout
import DashboardPage from "../views/m-d-r/Dashboard.jsx";
import DialogList from "../views/DialogList.jsx";
import ProcurementBoardPage from "../views/invoice/ProcurementBoard.jsx";


const dashboardRoutes = [
    {
        path: "dashboard",
        name: "Back to Dashboard",
        rtlName: "rtl_Back",
        icon: ArrowBack,      //Dashboard,
        component: DashboardPage,
        layout: "/admin"
    },
    {
        path: "procurement",
        name: "Procurement",
        rtlName: "rtl_procurement",
        icon: AddBoxOutlined,
        component: ProcurementBoardPage,
        layout: "/invoice"
    },
    {
        path: "dialogs",
        name: "Dialog List",
        rtlName: "rtl_dialogs",
        icon: Fingerprint,
        component: DialogList,
        layout: "/invoice"
    },
];

export default dashboardRoutes;
