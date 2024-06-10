import React, {
  useContext
} from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import {
  Paper,
  Table,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "../../components/common";
import GetAppIcon from '@material-ui/icons/GetApp';
import Generator from "./Generator";

import {
  Select,
  MenuItem
} from '@material-ui/core';

import {
  License,
  PostAdd
} from "../../images/icons";

import { userlist } from "../../utils/constant";

const TransferSection = ({
  onConfirm = () => { },
}) => {
  const [state, setState] = React.useState({ user: "", amount: 0 });
  const { closeDialog } = useContext(GlobalContext);
  return (
    <>
      <DialogContent
        dividers
        style={{
          width: 500
        }}>
        <Select
          value={state.user}
          displayEmpty
          onChange={e => setState({ ...state, user: e.target.value })}
        >
          <MenuItem value="">轉移對象</MenuItem>
          {userlist.map(user => <MenuItem key={user._id}>{user.name}</MenuItem>)}
        </Select>
        <div
          style={{ marginTop: 20 }}
        >
          <TextField
            label="轉移數量"
            type="number"
            value={state.amount}
            onChange={e => setState({ ...state, amount: e.target.value })}
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

const ApplySection = ({
  onConfirm = () => { },
}) => {
  const [state, setState] = React.useState({ user: "", amount: 0 });
  const { closeDialog } = useContext(GlobalContext);
  return (
    <>
      <DialogContent
        dividers
        style={{
          width: 500
        }}>
        <Select
          value={state.user}
          displayEmpty
          onChange={e => setState({ ...state, user: e.target.value })}
        >
          <MenuItem value="">申請對象</MenuItem>
          {userlist.map(user => <MenuItem key={user._id}>{user.name}</MenuItem>)}
        </Select>
        <div
          style={{ marginTop: 20 }}
        >
          <TextField
            label="申請數量"
            type="number"
            value={state.amount}
            onChange={e => setState({ ...state, amount: e.target.value })}
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

const MyLicense = () => {
  const { account, role } = useContext(AuthContext);
  const { t, openDialog } = useContext(GlobalContext);
  const me = userlist.find(user => user._id === account) || { license: {} }
  const rows = Object.keys(me.license).map(key => ({ _id: key, name: key, amount: role === 1 ? "--" : me.license[key] })) || [];

  const handleSetDialog = (row) => {
    openDialog({
      title: `Download ${row.name}`,
      section: <Generator onConfirm={state => console.log(state)} license={row.license} />
    })
  }

  const handleSetTransferDialog = (row) => {
    openDialog({
      title: `Transfer ${row.name}`,
      section: <TransferSection onConfirm={state => console.log(state)} />
    })
  }

  const handleSetApplyDialog = (row) => {
    openDialog({
      title: `Apply ${row.name}`,
      section: <ApplySection onConfirm={state => console.log(state)} />
    })
  }


  return (
    <Paper>
      <Table
        title={`Hi ${account}. 以下是您所擁有的授權`}
        rows={rows}
        columns={[
          { key: 'name', label: t('name') },
          { key: 'amount', label: t('amount') },
        ]}
        checkable={false}
        order="asc"
        orderBy="name"
        onPageChange={(event, page) => console.log(page)}
        onRowsPerPageChange={(event) => console.log(parseInt(event.target.value, 10))}
        onSortChange={(isAsc, property) => console.log(isAsc, property)}
        onKeywordSearch={(event) => console.log(event.target.value)}
        toolbarActions={[
        ]}
        rowActions={[
          { name: t('download'), onClick: (e, row) => handleSetDialog(row), icon: <GetAppIcon />, showMenuItem: (row) => role === 1 || row.amount > 0 },
          { name: t('transfer'), onClick: (e, row) => handleSetTransferDialog(row), icon: <License />, showMenuItem: (row) => (role === 1 || role === 2) && row.amount },
          { name: t('apply'), onClick: (e, row) => handleSetApplyDialog(row), icon: <PostAdd />, showMenuItem: () => (role === 2 || role === 3) },
        ]}
      // dense
      />

    </Paper>
  );
}


export default MyLicense;