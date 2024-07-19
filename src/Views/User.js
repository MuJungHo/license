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

// import {
//   Select,
//   MenuItem
// } from '@material-ui/core';

import { getKey } from '../utils/apis';
import UserSection from "../components/User/UserSection";
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

const User = () => {
  const { t, openDialog, closeDialog } = useContext(GlobalContext);
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

  const openEditUserDialog = (user) => {
    openDialog({
      title: `Edit User`,
      section: <UserSection onConfirm={handleEditUserAccount} user={user} />
    })
  }

  const openAddUserDialog = () => {
    openDialog({
      title: `Add User`,
      section: <UserSection onConfirm={handleAddUserAccount} />
    })
  }

  const handleEditUserAccount = async (user) => {

    const aesEncryptPassword = await getAESEncrypt(user.password)


    await authedApi.postEditAccount({
      data: {
        ...user,
        password: user.password ? aesEncryptPassword : undefined
      }
    })
    getAccountList()
    closeDialog()
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
          { name: t('edit'), onClick: (e, row) => openEditUserDialog(row), icon: <BorderColorSharp /> },
          { name: t('delete'), onClick: (e, row) => console.log(row), icon: <Delete /> }
        ] : []}
      // dense
      />
    </Paper>
  );
}


export default User;