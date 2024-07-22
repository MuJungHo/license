import React, { useContext } from "react";
// import { makeStyles } from '@material-ui/core/styles';

// import {
//   FormGroup,
//   RadioGroup
// } from '@material-ui/core';

// import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
// import { AuthContext } from "../../contexts/AuthContext";

import {
  TextField, Button,
  DialogContent,
  DialogActions,
} from "../common";

const UserSection = ({
  onConfirm = () => { },
}) => {
  const [state, setState] = React.useState({
    name: ""
  });
  const { closeDialog, t } = useContext(GlobalContext);

  return (
    <>
      <DialogContent
        dividers
        style={{
          width: 500
        }}>
        <TextField
          label={t("name")}
          type="text"
          fullWidth
          value={state.name}
          onChange={e => setState({ ...state, name: e.target.value })}
        />
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

export default UserSection