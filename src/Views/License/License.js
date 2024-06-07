import React, { useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';

import {
  AddBox,
  Delete,
  ArrowBack
} from '@material-ui/icons';

import {
  Divider,
  Select,
  MenuItem
} from '@material-ui/core';
import { useHistory } from "react-router-dom";

import { GlobalContext } from "../../contexts/GlobalContext";
import { TextField, Paper, Button } from "../../components/common";
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
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
  info: {
    display: 'flex',
    width: 'calc(50% - 24px)',
    alignItems: 'center',
    height: 45,
    margin: '6px 12px',
    '& > *:first-child': {
      flexBasis: '25%'
    },
    '& > *:not(:first-child)': {
      flexBasis: '74%'
    },
  },
  button: {
  },
  content: {
    width: 700,
    backgroundColor: theme.palette.dialog.background,
    color: theme.palette.dialog.color,
  },
}));

const Parameter = ({ parameter }) => {
  const classes = useStyles();
  return (<React.Fragment>
    <div>
      <div style={{ display: 'flex' }}>
        <div className={classes.info}><span>Key:</span> <TextField value={parameter.name} /></div>
        <div className={classes.info}><span>Type:</span> <Select
          value={parameter.type} >
          {
            [
              { label: "text", value: "text" },
              { label: "textarea", value: "textarea" },
              { label: "const", value: "const" },
              { label: "dropdown", value: "dropdown" },
              { label: "checkboxes", value: "checkboxes" },
              { label: "checkbox", value: "checkbox" },
              { label: "radio", value: "radio" },
              { label: "date", value: "date" },
              { label: "upload", value: "upload" },
            ].map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)
          }
        </Select>
        </div>
      </div>
      {parameter.type === "const" && <div className={classes.info}>
        <span>Const:</span> <TextField value={parameter.text} />
      </div>}
      {parameter.type === "radio" && <div>
        <div className={classes.info}><span style={{ flexBasis: '12.5%' }}>Options: </span><AddBox /></div>
        {parameter.options.map(option =>
          <div className={classes.info} key={option} >
            <Delete /><TextField value={option} />
          </div>
        )}
      </div>}
      {parameter.type === "checkboxes" && <div>
        <div className={classes.info}><span style={{ flexBasis: '12.5%' }}>Options: </span><AddBox /></div>
        {parameter.options.map(option =>
          <div className={classes.info} key={option} >
            <Delete /><TextField value={option} />
          </div>
        )}
      </div>}
      {parameter.type === "dropdown" && <div>
        <div className={classes.info}><span style={{ flexBasis: '12.5%' }}>Options: </span><AddBox /></div>
        {parameter.options.map(option =>
          <div className={classes.info} key={option} >
            <Delete /><TextField value={option} />
          </div>
        )}
      </div>}
    </div>
    <Divider /></React.Fragment>)
}

export default () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useContext(GlobalContext);
  // const { licenseid } = useParams();
  const license = {
    id: "SMARTPASS_pro",
    name: "SMARTPASS Pro",
    product: "SMARTPASS",
    parameters: [
      { _id: "count", name: "count", type: "text", options: [], text: "" },
      { _id: "expiredays", name: "expiredays", type: "text", options: [], text: "" },
      { _id: "upload", name: "upload", type: "upload", options: [], text: "" },
      { _id: "purpose", name: "purpose", type: "text", options: [], text: "" },
    ]
  }

  return (
    <div className={classes.root}>
      <Button
        style={{ marginBottom: 20 }}
        onClick={() => history.push('/licenselist')}>
        <ArrowBack />
      </Button>
      <Paper style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', padding: 8 }}>
          <div className={classes.info}>
            <span>{t("name")}</span>
            <TextField value={license.name} />
          </div>
          <div className={classes.info}>
            <span>{t("product")}</span>
            <TextField value={license.product} />
          </div>
        </div>
      </Paper>
      <Paper>
        {license.parameters?.map(parameter => <Parameter
          key={parameter._id}
          parameter={parameter}
        />)}
      </Paper>
    </div>
  )
}