import Home from '../Views/Home';
import User from '../Views/User';
import LicenseList from '../Views/License/LicenseList';
import License from '../Views/License/License';
import MyLicense from '../Views/License/MyLicense';


import {
  Home as HomeIcon,
  ManageAccount,
  License as LicenseIcon
} from "../images/icons"

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    icon: HomeIcon,
    sider: true,
    exact: true
  },
  {
    path: "/user",
    name: "_account",
    component: User,
    icon: ManageAccount,
    sider: true
  },
  {
    path: "/license",
    name: "_license",
    icon: LicenseIcon,
    sider: true,
    children: [
      { name: "_licenselist", path: "/licenselist" },
      { name: "myLicense", path: "/licenseme" }
    ]
  },
  {
    path: '/licenselist',
    component: LicenseList,
  },
  {
    path: '/licenseitem/:licenseid',
    component: License,
  },
  {
    path: '/licenseme',
    component: MyLicense,
  }
]

export default routes