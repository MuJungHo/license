import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { AuthContext } from "../contexts/AuthContext";
import {
  Table,
  DialogContent,
  DialogActions,
  Button,
  // Text,
  Paper,
  TextField
} from "../components/common";

import {
  BorderColorSharp,
  Delete,
  AddBox,
} from '@material-ui/icons';

import {
  Select,
  MenuItem
} from '@material-ui/core';

import { getKey } from '../utils/apis';

const CryptoJS = require("crypto-js");

const getAESEncrypt = async (txt) => {
  const timestamp = Date.now();
  const { secretkey } = await getKey({ timestamp });
  const cipher = CryptoJS.AES.encrypt(
    txt,
    CryptoJS.enc.Utf8.parse(secretkey),
    {
      iv: CryptoJS.enc.Utf8.parse(""),
      mode: CryptoJS.mode.ECB
    }
  )
  return cipher.toString()
}

const UserSection = ({
  onConfirm = () => { },
}) => {
  const [state, setState] = React.useState({
    roleid: 3,
    email: "",
    name: "",
    password: "",
    telephone: "",
    department: ""
  });
  const { closeDialog, t } = useContext(GlobalContext);
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
const User = () => {
  const { t, openDialog,closeDialog } = useContext(GlobalContext);
  const { role, authedApi } = useContext(AuthContext);

  const [accountList, setAccountList] = React.useState([])

  React.useEffect(() => {
    getAccountList()
  }, [])

  const getAccountList = async () => {
    const { result } = await authedApi.getAccountList({
      data: {
      },
      limit: 50,
      page: 1
    })
    let _accountList = result.map(p => ({ ...p, _id: p.accountid }))
    setAccountList(_accountList)
  }

  const openAddUserDialog = () => {
    openDialog({
      title: `Add User`,
      section: <UserSection onConfirm={handleAddUserAccount} />
    })
  }

  const handleAddUserAccount = async (user) => {

    const aesEncryptPassword = await getAESEncrypt(user.password)


    await authedApi.postAddAccount({
      data: {
        ...user,
        password: aesEncryptPassword
      }
    })
    getAccountList()
    closeDialog()
  }

  return (
    <Paper>
      <Table
        title={t("thing-management", { thing: t("account") })}
        rows={accountList}
        columns={[
          { key: 'name', label: t('name') },
          { key: 'email', label: t('email') },
          { key: 'rolename', label: t('rolename') },
        ]}
        checkable={role === 1}
        order="asc"
        orderBy="name"
        onPageChange={(event, page) => console.log(page)}
        onRowsPerPageChange={(event) => console.log(parseInt(event.target.value, 10))}
        onSortChange={(isAsc, property) => console.log(isAsc, property)}
        onKeywordSearch={(event) => console.log(event.target.value)}
        toolbarActions={role === 1 ? [
          { name: t('add'), onClick: openAddUserDialog, icon: <AddBox /> },
        ] : []}
        rowActions={role === 1 ? [
          { name: t('edit'), onClick: (e, row) => console.log(row), icon: <BorderColorSharp /> },
          { name: t('delete'), onClick: (e, row) => console.log(row), icon: <Delete /> }
        ] : []}
      // dense
      />
    </Paper>
  );
}


export default User;