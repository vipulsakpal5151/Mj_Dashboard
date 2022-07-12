
import OverviewImg from "../assets/img/pages/overview.jpg";
import SignUpImg from "../assets/img/pages/sign-up.jpg";
import NotFoundImg from "../assets/img/pages/404.jpg";

import { RoutesPage } from "../routes";


export default [
    {
        "id": 1,
        "name": "Overview",
        "image": OverviewImg,
        "link": RoutesPage.DashboardOverview.path
    },
    {
        "id": 1,
        "name": "Materialtable",
        "image": OverviewImg,
        "link": RoutesPage.MaterialTable.path
    },
    {
        "id": 5,
        "name": "Sign IN",
        "image": SignUpImg,
        "link": RoutesPage.Signin.path
    },
    {
        "id": 9,
        "name": "404",
        "image": NotFoundImg,
        "link": RoutesPage.NotFound.path
    }
];