import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import {
  Text,
  Paper,
  Button,
  DialogContent,
  DialogActions,
  TextField
} from "../components/common";

import {
  Divider
} from '@material-ui/core';

const DialogSection = ({
  onConfirm = () => { }
}) => {
  const [state, setState] = React.useState("")
  const { closeDialog } = useContext(GlobalContext);
  return (
    <>
      <DialogContent
        dividers
        style={{
          width: 500
        }}>
        <Text variant="h5">
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
          lacus vel augue laoreet rutrum faucibus dolor auctor.
        </Text>
        <TextField autoFocus
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          value={state} onChange={e => setState(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>
          Cancel
        </Button>
        <Button onClick={() => onConfirm(state)}>
          Confirm
        </Button>
      </DialogActions>
    </>)
}

const Feedback = () => {
  const { openDialog, openSnackbar } = useContext(GlobalContext);

  const handleSetDialog = () => {
    openDialog({
      title: "Dialog Title",
      section: <DialogSection onConfirm={state => console.log(state)} />
    })
  }

  const handleSetSnackbar = (severity) => {
    openSnackbar({
      message: "Snackbar Message",
      severity
    })
  }

  return (
    <>
      <Paper style={{ width: '100%', padding: 16, marginBottom: 20 }}>
        <Text variant="h5">Dialog</Text>
        <Divider style={{ margin: '16px 0' }} />
        <Button onClick={handleSetDialog}>Button</Button>
      </Paper>
      <Paper style={{ width: '100%', padding: 16, marginBottom: 20 }}>
        <Text variant="h5">Snackbar</Text>
        <Divider style={{ margin: '16px 0' }} />
        <Button color="primary" style={{ marginRight: 16 }} onClick={() => handleSetSnackbar("success")}>Button</Button>
        <Button color="secondary" onClick={() => handleSetSnackbar("error")}>Button</Button>
      </Paper>
    </>
  );
}


export default Feedback;