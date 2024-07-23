import React, { useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';

import {
  AddBox,
  Delete,
  ArrowBack,
  Save
} from '@material-ui/icons';

import {
  Divider,
  Select,
  MenuItem
} from '@material-ui/core';
import { useHistory } from "react-router-dom";

import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthContext } from "../../contexts/AuthContext";
import { TextField, Paper, Button, IconButton } from "../../components/common";

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

const Parameter = ({ parameter, onParameterChange }) => {
  const classes = useStyles();
  return (<React.Fragment>
    <div>
      <div style={{ display: 'flex' }}>
        <div className={classes.info}><span>Key:</span> <TextField
          onChange={e => onParameterChange(parameter, 'name', e.target.value)}
          value={parameter.name} /></div>
        <div className={classes.info}><span>Type:</span> <Select
          onChange={e => onParameterChange(parameter, 'type', e.target.value)}
          value={parameter.type} >
          {
            [
              { label: "text", value: "text" },
              { label: "number", value: "number" },
              // { label: "textarea", value: "textarea" },
              // { label: "const", value: "const" },
              // { label: "dropdown", value: "dropdown" },
              // { label: "checkboxes", value: "checkboxes" },
              // { label: "checkbox", value: "checkbox" },
              // { label: "radio", value: "radio" },
              // { label: "date", value: "date" },
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
  const { t, authedApi, openSnackbar } = useContext(GlobalContext);
  const { productid } = useParams();

  const [product, setProduct] = React.useState({
    name: "",
    description: "",
    parameters: []
  })

  React.useEffect(() => {
    getProduct()
  }, [])

  const getProduct = async () => {
    const _product = await authedApi.getProduct({ productid });
    _product.parameters = [];
    if (_product.fields) {
      _product.parameters = JSON.parse(_product.fields);
    }
    setProduct(_product)
  }

  const handleAddParamter = () => {
    const _id = Date.now();
    let _parameters = [...product.parameters, { _id, name: "", type: "text", options: [], text: "" }];
    let _product = { ...product, parameters: _parameters, fields: JSON.stringify(_parameters) }
    setProduct(_product)
  }

  const handleSaveProduct = async () => {
    await authedApi.editProduct({
      data: {
        ...product
      }
    })

    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("edit") })
    })
  }

  const onParameterChange = (parameter, key, value) => {
    let _parameters = [...product.parameters].map(p => p._id === parameter._id ? { ...parameter, [key]: value } : p)
    let _product = { ...product, parameters: _parameters, fields: JSON.stringify(_parameters) }
    setProduct(_product)
  }

  return (
    <div className={classes.root}>
      <Button
        style={{ marginBottom: 20 }}
        onClick={() => history.push('/product-list')}>
        <ArrowBack />
      </Button>
      <Button
        onClick={handleSaveProduct}
        style={{ marginBottom: 20 }}>
        <Save />
      </Button>
      <Paper style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', padding: 8 }}>
          <div className={classes.info}>
            <span>{t("name")}</span>
            <TextField value={product.name} onChange={e => setProduct({
              ...product,
              name: e.target.value
            })} />
          </div>
          <div className={classes.info}>
            <span>{t("description")}</span>
            <TextField value={product.description} onChange={e => setProduct({
              ...product,
              description: e.target.value
            })} />
          </div>
        </div>
      </Paper>
      <Paper>
        <IconButton onClick={handleAddParamter}><AddBox /></IconButton>
        {product.parameters.map(parameter => <Parameter
          key={parameter._id}
          parameter={parameter}
          onParameterChange={onParameterChange}
        />)}
      </Paper>
    </div>
  )
}