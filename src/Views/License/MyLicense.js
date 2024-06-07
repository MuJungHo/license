import React, {
  useContext
} from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import {
  Paper,
  Table
} from "../../components/common";
import GetAppIcon from '@material-ui/icons/GetApp';
import Generator from "./Generator";

const users = [
  {
    _id: "Admin",
    name: "Admin",
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
    products: "SMARTPASS",
    license: {
      "SMARTPASS-Trial": 20,
      "SMARTPASS-Pro": 20,
    }
  },
  {
    _id: "UserC",
    name: "UserC",
    products: "ENOL",
    license: {
      "EnOL Enterprise 1k": 10,
      "EnOL Enterprise 5k": 10,
    }
  }
]

const MyLicense = () => {
  const { account, role } = useContext(AuthContext);
  const { t, openDialog } = useContext(GlobalContext);
  const me = users.find(user => user._id === account) || { license: {} }
  const rows = Object.keys(me.license).map(key => ({ _id: key, name: key, amount: role === 1 ? "--" : me.license[key] })) || [];

  const handleSetDialog = (row) => {
    openDialog({
      title: `${row.name}'s Generator`,
      section: <Generator onConfirm={state => console.log(state)} license={row.license} />
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
          { name: t('download'), onClick: (e, row) => handleSetDialog(row), icon: <GetAppIcon /> },
        ]}
        dense
      />

    </Paper>
  );
}


export default MyLicense;