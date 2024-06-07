import React from "react";
import {
  // Breadcrumbs,
  Radio,
  Checkbox,
  Text,
  Paper,
  Button,
  Switch,
  TextField
} from "../components/common";

import {
  // Link,
  // Typography,
  Divider,
} from '@material-ui/core'

import { DateRangePicker, DatePicker } from 'rsuite';


const Input = () => {
  // const { t } = useContext(GlobalContext);
  return (
    <>
      <Paper style={{ width: '100%', padding: 16, marginBottom: 20 }}>
        <Text variant="h5">Radio</Text>
        <Divider style={{ margin: '16px 0' }} />
        <Radio checked={false} />
        <Radio checked={true} color="default" />
        <Radio checked={true} color="primary" />
        <Radio checked={true} color="secondary" />
        <Radio disabled checked={false} />
        <Radio disabled checked={true} color="default" />
      </Paper>
      <Paper style={{ width: '100%', padding: 16, marginBottom: 20 }}>
        <Text variant="h5">Checkbox</Text>
        <Divider style={{ margin: '16px 0' }} />
        <Checkbox checked={false} color="default" />
        <Checkbox checked={true} color="default" />
        <Checkbox checked={true} color="primary" />
        <Checkbox checked={true} color="secondary" />
        <Checkbox disabled checked={false} color="default" />
        <Checkbox disabled checked={true} color="default" />
      </Paper>
      <Paper style={{ width: '100%', padding: 16, marginBottom: 20 }}>
        <Text variant="h5">Button</Text>
        <Divider style={{ margin: '16px 0' }} />
        <div style={{ marginBottom: 16 }}>
          <Button color="primary" style={{ marginRight: 16 }}>Button</Button>
          <Button color="secondary" style={{ marginRight: 16 }}>Button</Button>
          <Button color="default" style={{ marginRight: 16 }}>Button</Button>
          <Button variant="outlined" color="primary" style={{ marginRight: 16 }}>Button</Button>
          <Button variant="outlined" color="secondary" style={{ marginRight: 16 }}>Button</Button>
          <Button variant="outlined" color="default" style={{ marginRight: 16 }}>Button</Button>
        </div>
        <Button variant="contained" color="primary" style={{ marginRight: 16 }}>Button</Button>
        <Button variant="contained" color="secondary" style={{ marginRight: 16 }}>Button</Button>
        <Button variant="contained" color="default" style={{ marginRight: 16 }}>Button</Button>
        <Button disabled color="primary" style={{ marginRight: 16 }}>Button</Button>
        <Button disabled variant="outlined" color="primary" style={{ marginRight: 16 }}>Button</Button>
        <Button disabled variant="contained" color="primary" style={{ marginRight: 16 }}>Button</Button>
      </Paper>
      <Paper style={{ width: '100%', padding: 16, marginBottom: 20 }}>
        <Text variant="h5">Switch</Text>
        <Divider style={{ margin: '16px 0' }} />
        <Switch checked={false} style={{ marginRight: 16 }} />
        <Switch checked={true} color="primary" style={{ marginRight: 16 }} />
        <Switch checked={true} color="secondary" style={{ marginRight: 16 }} />
        <Switch disabled checked={false} style={{ marginRight: 16 }} />
        <Switch disabled checked={true} color="primary" style={{ marginRight: 16 }} />
      </Paper>
      <Paper style={{ width: '100%', padding: 16, marginBottom: 20 }}>
        <Text variant="h5">TextField</Text>
        <Divider style={{ margin: '16px 0' }} />
        <TextField label="TextField" style={{ marginRight: 16 }} />
        <TextField label="TextField" style={{ marginRight: 16 }} value="TextField Text" />
        <TextField type="search" style={{ marginRight: 16 }} label="Search TextField" value="Search Text" />
        <TextField type="number" label="TextField Number" value={1000} />
      </Paper>
      <Paper style={{ width: '100%', padding: 16, marginBottom: 20 }}>
        <Text variant="h5">DateTimePicker</Text>
        <Divider style={{ margin: '16px 0' }} />
        <DateRangePicker format="yyyy-MM-dd HH:mm:ss" style={{ marginRight: 16 }} placement="auto" />
        <DatePicker placement="auto" />
      </Paper>
    </>
  );
}


export default Input;