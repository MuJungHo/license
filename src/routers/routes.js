import User from '../Views/User';
import LicenseList from '../Views/License/LicenseList';
import ApplyList from '../Views/License/ApplyList';
import License from '../Views/License/License';
import MyLicense from '../Views/License/MyLicense';
import Log from '../Views/Log';


import {
  Home as HomeIcon,
  ManageAccount,
  License as LicenseIcon
} from "../images/icons";
import AssignmentIcon from '@material-ui/icons/Assignment';

const routes = [
  {
    path: "/license",
    name: "_license",
    icon: LicenseIcon,
    sider: true,
    children: [
      { name: "_licenselist", path: "/licenselist", roles: [1, 2, 3] },
      { name: "_applylist", path: "/applylist", roles: [1, 2] },
      { name: "myLicense", path: "/licenseme", roles: [1, 2, 3] },
    ],
    roles: [1, 2, 3]
  },
  {
    path: "/user",
    name: "_account",
    component: User,
    icon: ManageAccount,
    sider: true,
    roles: [1, 2]
  },
  {
    path: "/log",
    name: "_log",
    component: Log,
    icon: AssignmentIcon,
    sider: true,
    roles: [1, 2]
  },
  {
    path: '/licenselist',
    component: LicenseList,
    roles: [1, 2, 3]
  },
  {
    path: '/applylist',
    component: ApplyList,
    roles: [1, 2]
  },
  {
    path: '/licenseitem/:licenseid',
    component: License,
    roles: [1, 2]
  },
  {
    path: '/licenseme',
    component: MyLicense,
    roles: [1, 2, 3]
  }
]

export default routes