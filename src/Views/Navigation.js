import React from "react";
import {
  Breadcrumbs,
  // Radio,
  // Checkbox,
  Text,
  Paper,
  // Button,
  // Switch,
  // TextField
} from "../components/common";

import {
  Link,
  Typography,
  Divider,
  // InputAdornment
} from '@material-ui/core'

// import { DateRangePicker, DatePicker } from 'rsuite';
// import SearchIcon from "@material-ui/icons/Search"


const Navigation = () => {
  // const { t } = useContext(GlobalContext);
  return (
    <>
      <Paper style={{ width: '100%', padding: 16, marginBottom: 20 }}>
        <Text variant="h5">Breadcrumbs</Text>
        <Divider style={{ margin: '16px 0' }} />
        <Breadcrumbs>
          <Link component="button">
            Material-UI
          </Link>
          <Link component="button">
            Core
          </Link>
          <Typography>Breadcrumb</Typography>
        </Breadcrumbs>
      </Paper>
    </>
  );
}


export default Navigation;