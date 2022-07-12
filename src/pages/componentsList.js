// pages
import Presentation from "./Presentation";
import DashboardOverview from "./dashboard/DashboardOverview";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";
import MaterialTable from "./MaterialTable";
import Users from "./Users";
import Roles from "./Roles";


// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import { RoutesPage } from "../routes";

const componentListForRoutes = [
    { path: RoutesPage.Presentation.path, with: 'RouteWithLoader', component: 'Signin', parent: 'singleWithParent' , child: 'sign_in'},
    { path: RoutesPage.Signin.path, with: 'RouteWithLoader', component: 'Signin', parent: 'singleWithParent' , child: 'sign_in'},
    { path: RoutesPage.NotFound.path, with: 'RouteWithLoader', component: 'NotFoundPage', parent: 'singleWithParent' , child: '404'},
    { path: '*', with: 'RouteWithLoader', component: 'NotFoundPage', parent: 'singleWithParent' , child: '404'},

    { path: RoutesPage.DashboardOverview.path, with: 'RouteWithSidebar', component: 'DashboardOverview', parent: 'singleWithParent' , child: 'overview'},
    { path: RoutesPage.MaterialTable.path, with: 'RouteWithSidebar', component: 'MaterialTable', parent: 'singleWithParent' , child: 'materialtable'},

    { path: RoutesPage.Users.path, with: 'RouteWithSidebar', component: 'Users', parent: 'access_control' , child: 'users'},
    { path: RoutesPage.Roles.path, with: 'RouteWithSidebar', component: 'Roles', parent: 'access_control' , child: 'roles'}
]

export default {
    componentListForRoutes, Presentation, DashboardOverview, Signin, Signup, ForgotPassword, ResetPassword, Lock, NotFoundPage, ServerError, Sidebar, Navbar, Footer, Preloader, MaterialTable, Users, Roles
}