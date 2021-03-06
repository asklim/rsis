// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import AddBox from "@material-ui/icons/AddBoxOutlined";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import Fingerprint from '@material-ui/icons/Fingerprint';

// core components/views for Admin layout
import DashboardPage from "../views/m-d-r/Dashboard.js";
import ProcurementBoardPage from "../views/ProcurementBoard.js";
import UserProfile from "../views/m-d-r/UserProfile.js";
import TableList from "../views/m-d-r/TableList.js";
import Typography from "../views/m-d-r/Typography.js";
import Icons from "../views/m-d-r/Icons.js";
import Maps from "../views/m-d-r/Maps.js";
import NotificationsPage from "../views/m-d-r/Notifications.js";
import UpgradeToPro from "../views/m-d-r/UpgradeToPro.js";

// core components/views for RTL layout
import RTLPage from "../views/m-d-r/RTLPage.js";

import DialogList from "../views/DialogList.js";


const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        rtlName: "لوحة القيادة",
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
        path: "/user",
        name: "User Profile",
        rtlName: "ملف تعريفي للمستخدم",
        icon: Person,
        component: UserProfile,
        layout: "/admin"
    },
    {
        path: "/dialogs",
        name: "Dialog List",
        rtlName: "قائمة الجدول",
        icon: Fingerprint,
        component: DialogList,
        layout: "/admin"
    },
    {
        path: "/table",
        name: "Table List",
        rtlName: "قائمة الجدول",
        icon: "content_paste",
        component: TableList,
        layout: "/admin"
    },
    {
        path: "/typography",
        name: "Typography",
        rtlName: "طباعة",
        icon: LibraryBooks,
        component: Typography,
        layout: "/admin"
    },
    {
        path: "/icons",
        name: "Icons",
        rtlName: "الرموز",
        icon: BubbleChart,
        component: Icons,
        layout: "/admin"
    },
    {
        path: "/maps",
        name: "Maps",
        rtlName: "خرائط",
        icon: LocationOn,
        component: Maps,
        layout: "/admin"
    },
    {
        path: "/notifications",
        name: "Notifications",
        rtlName: "إخطارات",
        icon: Notifications,
        component: NotificationsPage,
        layout: "/admin"
    },
    {
        path: "/upgrade-to-pro",
        name: "Upgrade To PRO",
        rtlName: "التطور للاحترافية",
        icon: Unarchive,
        component: UpgradeToPro,
        layout: "/admin"
    },
    {
        path: "/rtl-page",
        name: "RTL Support",
        rtlName: "پشتیبانی از راست به چپ",
        icon: Language,
        component: RTLPage,
        layout: "/rtl"
    },  
];

export default dashboardRoutes;
