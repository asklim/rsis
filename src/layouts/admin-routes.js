// Google Material-UI/icons
import {
    AddBox,
    //BubbleChart,
    Dashboard,
    ExitToApp,
    Fingerprint,
    Language,
    LibraryBooks,
    //LocationOn,
    Notifications,
    Person,
    Unarchive,
} from '@mui/icons-material';

// core components/views for Admin layout
import DashboardPage from "../views/m-d-r/Dashboard.jsx";
import LoginSignupPage from "../views/LoginSignup/LoginSignup.jsx";
import UserProfile from "../views/m-d-r/UserProfile.jsx";
import TableList from "../views/m-d-r/TableList.jsx";
import Typography from "../views/m-d-r/Typography.jsx";
//import Icons from "../views/m-d-r/Icons.jsx";
//import Maps from "../views/m-d-r/Maps.jsx";
import NotificationsPage from "../views/m-d-r/Notifications.jsx";
import UpgradeToPro from "../views/m-d-r/UpgradeToPro.jsx";

import DialogList from "../views/DialogList.jsx";
import ProcurementBoardPage from "../views/invoice/ProcurementBoard.jsx";

// core components/views for RTL layout
import RTLPage from "../views/m-d-r/RTLPage.jsx";


const dashboardRoutes = [
    {
        path: "dashboard",
        name: "Dashboard",
        rtlName: "لوحة القيادة",
        icon: Dashboard,
        component: DashboardPage,
        layout: "/admin"
    },
    {
        path: "procurement",
        name: "Procurement",
        rtlName: "rtl_procurement",
        icon: AddBox,
        component: ProcurementBoardPage,
        layout: "/invoice"
    },
    {
        path: "user",
        name: "User Profile",
        rtlName: "ملف تعريفي للمستخدم",
        icon: Person,
        component: UserProfile,
        layout: "/admin"
    },
    {
        path: "dialogs",
        name: "Dialog List",
        rtlName: "قائمة الجدول",
        icon: Fingerprint,
        component: DialogList,
        layout: "/admin"
    },
    {
        path: "table",
        name: "Table List",
        rtlName: "قائمة الجدول",
        icon: "content_paste",
        component: TableList,
        layout: "/admin"
    },
    {
        path: "typography",
        name: "Typography",
        rtlName: "طباعة",
        icon: LibraryBooks,
        component: Typography,
        layout: "/admin"
    },
    /*{
        path: "icons",
        name: "Icons",
        rtlName: "الرموز",
        icon: BubbleChart,
        component: Icons,
        layout: "/admin"
    },
    {
        path: "maps",
        name: "Maps",
        rtlName: "خرائط",
        icon: LocationOn,
        component: Maps,
        layout: "/admin"
    },*/
    {
        path: "notifications",
        name: "Notifications",
        rtlName: "إخطارات",
        icon: Notifications,
        component: NotificationsPage,
        layout: "/admin"
    },
    {
        path: "login",
        name: "Log In / Sign Up",
        rtlName: "rtlLogIn",
        icon: ExitToApp,
        component: LoginSignupPage,
        layout: "/admin"
    },
    {
        path: "upgrade-to-pro",
        name: "Upgrade To PRO",
        rtlName: "التطور للاحترافية",
        icon: Unarchive,
        component: UpgradeToPro,
        layout: "/admin"
    },
    {
        path: "rtl-page",
        name: "RTL Support",
        rtlName: "پشتیبانی از راست به چپ",
        icon: Language,
        component: RTLPage,
        layout: "/rtl"
    },
];

export default dashboardRoutes;
