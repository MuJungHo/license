import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { Table, Paper } from "../components/common";

import {
  BorderColorSharp,
  Delete,
  AddBox,
  CloudDownload
} from '@material-ui/icons';
const rows = [
  {
    _id: "ABC",
    name: "ABC",
    identity: "staff",
    company: "Delta",
    department: "BASBD",
    email: "ABC@deltaww.com"
  },
  {
    _id: "DEF",
    name: "DEF",
    identity: "staff",
    company: "Delta",
    department: "BASBD",
    email: "DEF@deltaww.com"
  },
  {
    _id: "GHI",
    name: "GHI",
    identity: "staff",
    company: "Delta",
    department: "BASBD",
    email: "GHI@deltaww.com"
  },
  {
    _id: "Jay Ciou",
    name: "Jay Ciou",
    identity: "VIP",
    company: "Delta",
    department: "BASBD",
    email: "Jay.Ciou@deltaww.com"
  },
  {
    _id: "Uno Lee",
    name: "Uno Lee",
    identity: "Guset",
    company: "",
    department: "",
    email: ""
  },
  {
    _id: "UNKNOWN",
    name: "UNKNOWN",
    identity: "Stranger",
    company: "",
    department: "",
    email: ""
  },
]

const User = () => {
  const { t } = useContext(GlobalContext);
  return (
    <Paper>
      <Table
        title={t("user")}
        rows={rows}
        columns={[
          { key: 'name', label: t('name') },
          { key: 'identity', label: t('identity') },
          { key: 'company', label: t('company') },
          { key: 'department', label: t('department') },
          { key: 'email', label: t('email') },
        ]}
        order="asc"
        orderBy="name"
        onPageChange={(event, page) => console.log(page)}
        onRowsPerPageChange={(event) => console.log(parseInt(event.target.value, 10))}
        onSortChange={(isAsc, property) => console.log(isAsc, property)}
        onKeywordSearch={(event) => console.log(event.target.value)}
        toolbarActions={[
          { name: t('add'), onClick: () => { }, icon: <AddBox /> },
          { name: t('export'), onClick: () => { }, icon: <CloudDownload /> },
        ]}
        rowActions={[
          { name: t('edit'), onClick: (e, row) => console.log(row), icon: <BorderColorSharp /> },
          { name: t('delete'), onClick: (e, row) => console.log(row), icon: <Delete /> }
        ]}
        dense
      />
    </Paper>
  );
}


export default User;