// pages
import Presentation from "./Presentation";
import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";
import MaterialTable from "./MaterialTable";

// documentation pages
import DocsOverview from "./documentation/DocsOverview";
import DocsDownload from "./documentation/DocsDownload";
import DocsQuickStart from "./documentation/DocsQuickStart";
import DocsLicense from "./documentation/DocsLicense";
import DocsFolderStructure from "./documentation/DocsFolderStructure";
import DocsBuild from "./documentation/DocsBuild";
import DocsChangelog from "./documentation/DocsChangelog";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";
import { RoutesPage } from "../routes";

const componentListForRoutes = [
    { path: RoutesPage.Presentation.path, with: 'RouteWithLoader', component: 'Signin'},
    { path: RoutesPage.Signin.path, with: 'RouteWithLoader', component: 'Signin'},
    { path: RoutesPage.Signup.path, with: 'RouteWithLoader', component: 'Signup'},
    { path: RoutesPage.ForgotPassword.path, with: 'RouteWithLoader', component: 'ForgotPassword'},
    { path: RoutesPage.ResetPassword.path, with: 'RouteWithLoader', component: 'ResetPassword'},
    { path: RoutesPage.Lock.path, with: 'RouteWithLoader', component: 'Lock'},
    { path: RoutesPage.NotFound.path, with: 'RouteWithLoader', component: 'NotFoundPage'},
    { path: RoutesPage.ServerError.path, with: 'RouteWithLoader', component: 'ServerError'},
    { path: '*', with: 'RouteWithLoader', component: 'NotFoundPage'},

    { path: RoutesPage.DashboardOverview.path, with: 'RouteWithSidebar', component: 'DashboardOverview'},
    { path: RoutesPage.Upgrade.path, with: 'RouteWithSidebar', component: 'Upgrade'},
    { path: RoutesPage.Transactions.path, with: 'RouteWithSidebar', component: 'Transactions'},
    { path: RoutesPage.Settings.path, with: 'RouteWithSidebar', component: 'Settings'},
    { path: RoutesPage.BootstrapTables.path, with: 'RouteWithSidebar', component: 'BootstrapTables'},
    { path: RoutesPage.MaterialTable.path, with: 'RouteWithSidebar', component: 'MaterialTable'},

    // components
    { path: RoutesPage.Accordions.path, with: 'RouteWithSidebar', component: 'Accordion'},
    { path: RoutesPage.Alerts.path, with: 'RouteWithSidebar', component: 'Alerts'},
    { path: RoutesPage.Badges.path, with: 'RouteWithSidebar', component: 'Badges'},
    { path: RoutesPage.Breadcrumbs.path, with: 'RouteWithSidebar', component: 'Breadcrumbs'},
    { path: RoutesPage.Buttons.path, with: 'RouteWithSidebar', component: 'Buttons'},
    { path: RoutesPage.Forms.path, with: 'RouteWithSidebar', component: 'Forms'},
    { path: RoutesPage.Modals.path, with: 'RouteWithSidebar', component: 'Modals'},
    { path: RoutesPage.Navs.path, with: 'RouteWithSidebar', component: 'Navs'},
    { path: RoutesPage.Navbars.path, with: 'RouteWithSidebar', component: 'Navbars'},
    { path: RoutesPage.Pagination.path, with: 'RouteWithSidebar', component: 'Pagination'},
    { path: RoutesPage.Popovers.path, with: 'RouteWithSidebar', component: 'Popovers'},
    { path: RoutesPage.Progress.path, with: 'RouteWithSidebar', component: 'Progress'},
    { path: RoutesPage.Tables.path, with: 'RouteWithSidebar', component: 'Tables'},
    { path: RoutesPage.Tabs.path, with: 'RouteWithSidebar', component: 'Tabs'},
    { path: RoutesPage.Tooltips.path, with: 'RouteWithSidebar', component: 'Tooltips'},
    { path: RoutesPage.Toasts.path, with: 'RouteWithSidebar', component: 'Toasts'},

    // documentation
    { path: RoutesPage.DocsOverview.path, with: 'RouteWithSidebar', component: 'DocsOverview'},
    { path: RoutesPage.DocsDownload.path, with: 'RouteWithSidebar', component: 'DocsDownload'},
    { path: RoutesPage.DocsQuickStart.path, with: 'RouteWithSidebar', component: 'DocsQuickStart'},
    { path: RoutesPage.DocsLicense.path, with: 'RouteWithSidebar', component: 'DocsLicense'},
    { path: RoutesPage.DocsFolderStructure.path, with: 'RouteWithSidebar', component: 'DocsFolderStructure'},
    { path: RoutesPage.DocsBuild.path, with: 'RouteWithSidebar', component: 'DocsBuild'},
    { path: RoutesPage.DocsChangelog.path, with: 'RouteWithSidebar', component: 'DocsChangelog'},
]
export default {
    componentListForRoutes, Presentation, Upgrade, DashboardOverview, Transactions, Settings, BootstrapTables, Signin, Signup, ForgotPassword, ResetPassword, Lock, NotFoundPage, ServerError, DocsOverview, DocsDownload, DocsQuickStart, DocsLicense, DocsFolderStructure, DocsBuild, DocsChangelog, Sidebar, Navbar, Footer, Preloader, Accordion, Alerts, Badges, Breadcrumbs, Buttons, Forms, Modals, Navs, Navbars, Pagination, Popovers, Progress, Tables, Tabs, Tooltips, Toasts, MaterialTable
}