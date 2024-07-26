import React, { useContext } from "react";

// import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";

import {
  TextField, Button, Switch,
  DialogContent,
  DialogActions,
} from "../../components/common";
import { FormControlLabel } from '@material-ui/core';


export default ({
  onConfirm = () => { },
}) => {
  const { closeDialog, t } = useContext(GlobalContext);

  const [state, setState] = React.useState({ commercial: 0, number: "" })

  return (
    <>
      <DialogContent
        dividers
        style={{
          width: 500
        }}>
        <TextField
          type="number"
          label={t("amount")}
          fullWidth
          style={{ marginBottom: 20 }}
          value={state.number}
          onChange={e => setState({ ...state, number: Number(e.target.value) })}
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.commercial === 1}
              onChange={e => setState({ ...state, commercial: e.target.checked ? 1 : 0 })}
              color="primary"
            />
          }
          label={t("commercial")}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>
          {t("cancel")}
        </Button>
        <Button color="primary" variant="contained" onClick={() => onConfirm(state)}>
          {t("confirm")}
        </Button>
      </DialogActions>
    </>
  )
}