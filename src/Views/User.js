import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { AuthContext } from "../contexts/AuthContext";
import {
  Table,
  // Text,
  Paper,
  Button,
  DialogContent,
  DialogActions,
  TextField
} from "../components/common";

import {
  BorderColorSharp,
  Delete,
  AddBox,
} from '@material-ui/icons';

import {
  License
} from "../images/icons";

const rows = [
  {
    _id: "Admin",
    name: "Admin",
    role: "Admin",
    products: "",
    license: {
      "EnOL Enterprise 1k": 10,
      "EnOL Enterprise 5k": 10,
      "SMARTPASS-Trial": 20,
      "SMARTPASS-Pro": 20,
    }
  },
  {
    _id: "UserA",
    name: "UserA",
    role: "User",
    products: "ENOL, SMARTPASS",
    license: {
      "EnOL Enterprise 1k": 10,
      "EnOL Enterprise 5k": 10,
      "SMARTPASS-Trial": 20,
      "SMARTPASS-Pro": 20,
    }
  },
  {
    _id: "UserB",
    name: "UserB",
    role: "User",
    products: "SMARTPASS",
    license: {
      "SMARTPASS-Trial": 20,
      "SMARTPASS-Pro": 20,
    }
  },
  {
    _id: "UserC",
    name: "UserC",
    role: "User",
    products: "ENOL",
    license: {
      "EnOL Enterprise 1k": 10,
      "EnOL Enterprise 5k": 10,
    }
  }
]

const DialogSection = ({
  onConfirm = () => { },
  license = {}
}) => {
  const [state, setState] = React.useState({ ...license });
  const { closeDialog } = useContext(GlobalContext);
  return (
    <>
      <DialogContent
        dividers
        style={{
          width: 500
        }}>
        {
          Object.keys(state).map(key =>
            <TextField
              key={key}
              fullWidth
              type="number"
              margin="dense"
              label={key}
              value={state[key]}
              onChange={e => setState({
                ...state,
                [key]: e.target.value
              })} />)
        }

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
  const { t, openDialog } = useContext(GlobalContext);
  const { role } = useContext(AuthContext);

  const handleSetDialog = (row) => {
    openDialog({
      title: `${row.name}'s License`,
      section: <DialogSection onConfirm={state => console.log(state)} license={row.license} />
    })
  }

  return (
    <Paper>
      <Table
        title={t("thing-management", { thing: t("account") })}
        rows={rows}
        columns={[
          { key: 'name', label: t('name') },
          { key: 'role', label: t('role') },
          { key: 'products', label: t('product') },
        ]}
        checkable={role === 1}
        order="asc"
        orderBy="name"
        onPageChange={(event, page) => console.log(page)}
        onRowsPerPageChange={(event) => console.log(parseInt(event.target.value, 10))}
        onSortChange={(isAsc, property) => console.log(isAsc, property)}
        onKeywordSearch={(event) => console.log(event.target.value)}
        toolbarActions={role === 1 ? [
          { name: t('add'), onClick: () => { }, icon: <AddBox /> },
        ] : []}
        rowActions={role === 1 ? [
          { name: t('license'), onClick: (e, row) => handleSetDialog(row), icon: <License /> },
          { name: t('edit'), onClick: (e, row) => console.log(row), icon: <BorderColorSharp /> },
          { name: t('delete'), onClick: (e, row) => console.log(row), icon: <Delete /> }
        ] : []}
      // dense
      />
    </Paper>
  );
}


export default User;