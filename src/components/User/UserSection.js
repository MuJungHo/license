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
  TextField, Checkbox, Radio, Button,
  DialogContent,
  DialogActions,
} from "../common";

import {
  Select,
  MenuItem
} from '@material-ui/core';

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
const UserSection = ({
  user = {
    roleid: 3,
    email: "",
    name: "",
    password: "",
    telephone: "",
    department: "",
    products: "[]",
    productsParse: []
  },
  onConfirm = () => { },
}) => {
  const [state, setState] = React.useState(user);
  const { closeDialog, t, authedApi } = useContext(GlobalContext);
  const [products, setProducts] = React.useState([])

  React.useEffect(() => {
    getProductList()
  }, [])

  const getProductList = async () => {
    const { result } = await authedApi.getProductList({
      data: {
      },
      limit: 50,
      page: 1
    })
    let _products = result.map(p => ({ ...p, _id: p.productid }))
    setProducts(_products)
  }
  return (
    <>
      <DialogContent
        dividers
        style={{
          width: 500
        }}>
        <Select
          value={state.roleid}
          onChange={e => setState({ ...state, roleid: e.target.value })}
        >
          <MenuItem value={1}>Admin</MenuItem>
          <MenuItem value={2}>Operator</MenuItem>
          <MenuItem value={3}>User</MenuItem>
        </Select>
        <Select
          multiple
          value={state.productsParse || []}
          onChange={e => setState({
            ...state, productsParse: e.target.value,
            products: e.target.value
          })}
        >
          {
            products.map(p => <MenuItem key={p.productid} value={p.productid}>{p.name}</MenuItem>)
          }
        </Select>
        <div
          style={{ marginTop: 20 }}
        >
          <TextField
            label={t("email")}
            type="text"
            value={state.email}
            onChange={e => setState({ ...state, email: e.target.value })}
          />
          <TextField
            label={t("account")}
            type="text"
            value={state.name}
            onChange={e => setState({ ...state, name: e.target.value })}
          />
          <TextField
            label={t("password")}
            type="password"
            value={state.password}
            onChange={e => setState({ ...state, password: e.target.value })}
          />
          <TextField
            label={t("telephone")}
            type="text"
            value={state.telephone}
            onChange={e => setState({ ...state, telephone: e.target.value })}
          />
          <TextField
            label={t("department")}
            type="text"
            value={state.department}
            onChange={e => setState({ ...state, department: e.target.value })}
          />
        </div>
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