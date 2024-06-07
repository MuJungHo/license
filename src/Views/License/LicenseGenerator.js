import React, { useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';

import {
  ArrowBack
} from '@material-ui/icons';

import {
  FormGroup,
  RadioGroup
} from '@material-ui/core';
import { useHistory } from "react-router-dom";

import { GlobalContext } from "../../contexts/GlobalContext";
import { TextField, Checkbox, Radio, Button } from "../../components/common";
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
  button: {
    position: 'fixed',
    padding: 5,
    minWidth: 'unset',
    marginBottom: 20,
    background: theme.palette.button.background,
    color: theme.palette.button.color,
    boxShadow: theme.palette.boxShadow[0],
  },
  content: {
    width: 700,
    backgroundColor: theme.palette.dialog.background,
    color: theme.palette.dialog.color,
  },
  info: {
    display: 'flex',
    width: 'calc(50% - 24px)',
    alignItems: 'center',
    // height: 45,
    margin: '6px 12px',
    '& > *:first-child': {
      flexBasis: '25%'
    },
    '& > *:not(:first-child)': {
      flexBasis: '74%'
    },
  },
}));

const Parameter = ({ parameter, state, setState }) => {
  const classes = useStyles();
  // console.log(state)
  const handleChecked = (checked, name, key) => {
    if (checked) {
      setState({
        ...state,
        [name]: [...state[name], key]
      })
    } else {
      let arr = [...state[name]].filter(i => i != key)
      setState({
        ...state,
        [name]: [...arr]
      })
    }
  }

  return (<div className={classes.info}><span>{parameter.name}:</span> {{
    "text": <TextField
      type="text"
      value={state[parameter.name] || ""}
      onChange={e => setState({
        ...state,
        [parameter.name]: e.target.value
      })}
    />,
    "date": <TextField
      type="date"
      value={state[parameter.name] || ""}
      onChange={e => setState({
        ...state,
        [parameter.name]: e.target.value
      })}
    />,
    "textarea": <TextField
      type="text"
      multiline
      minRows={5}
      maxRows={10}
      value={state[parameter.name] || ""}
      onChange={e => setState({
        ...state,
        [parameter.name]: e.target.value
      })}
    />,
    "const": <span>{parameter.text}</span>,
    "checkboxes": <FormGroup row>{parameter.options.map(option => <FormControlLabel
      key={option}
      control={
        <Checkbox
          checked={state[parameter.name]?.includes(option) || false}
          onChange={e => handleChecked(e.target.checked, parameter.name, option)}
          name={option}
          color="primary"
        />
      }
      label={option}
    />)}</FormGroup>,
    "radio": <RadioGroup value={state[parameter.name] || parameter.options[0]} onChange={e => setState({
      ...state,
      [parameter.name]: e.target.value
    })} row>
      {parameter.options.map(option => <FormControlLabel
        key={option}
        control={
          <Radio color="primary" />
        }
        value={option}
        label={option}
      />)}
    </RadioGroup>,
    "upload": <input type="file" />
  }[parameter.type]}</div>)
}

export default () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useContext(GlobalContext);
  const [state, setState] = React.useState({})

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

  React.useEffect(() => {
    const _state = license.parameters
      .reduce((obj, cur) => ({
        ...obj, [cur.name]: cur.type === "const" ? cur.text : ""
      }), {})
    setState(_state)
  }, [])
  return (
    <div className={classes.root}>
      <Button
        variant="outlined"
        className={classes.button}
        onClick={() => history.push('/license/list')}>
        <ArrowBack />
      </Button>
      <div style={{ display: 'flex', flexWrap: 'wrap', padding: 8 }}>
        {license.parameters.map(parameter => <Parameter
          key={parameter._id}
          state={state}
          setState={setState}
          parameter={parameter}
        />)}
      </div>
    </div>
  )
}