import React, { useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';

import {
  FormGroup,
  RadioGroup
} from '@material-ui/core';

// import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthContext } from "../../contexts/AuthContext";

import {
  TextField, Checkbox, Radio, Button, Switch,
  DialogContent,
  DialogActions,
} from "../../components/common";
import { FormControlLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(3),
    position: 'relative'
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  actions: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    '& svg': {
      color: theme.palette.layout.color,
    }
  },
  content: {
    width: 700,
    backgroundColor: theme.palette.dialog.background,
    color: theme.palette.dialog.color,
  },
  info: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    height: 45,
    '& > *:first-child': {
      flexBasis: '25%'
    },
    '& > *:not(:first-child)': {
      flexBasis: '74%'
    },
  },
}));

export default ({
  onConfirm = () => { },
}) => {
  const { closeDialog, t } = useContext(GlobalContext);

  const [state, setState] = React.useState({ commercial: 0 })

  return (
    <>
      <DialogContent
        dividers
        style={{
          width: 500
        }}>
        <TextField
          type="number"
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
          Cancel
        </Button>
        <Button onClick={() => onConfirm(state)}>
          Generate
        </Button>
      </DialogActions>
    </>
  )
}