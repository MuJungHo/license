import Home from '../Views/Home';

import {
  Home as HomeIcon,
} from "../images/icons"

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    icon: HomeIcon,
    sider: true,
    exact: true
  }
]

export default routes