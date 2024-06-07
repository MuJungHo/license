import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Table, Paper } from "../../components/common";
import { useHistory } from "react-router-dom";

import {
  BorderColorSharp,
  Delete,
  AddBox,
  CloudDownload
} from '@material-ui/icons';

const rows = [
  {
    _id: "SMARTPASS_trial",
    name: "SMARTPASS Trial",
    product: "SMARTPASS",
    parameters: [
      { _id: "amount", name: "amount", type: "text", options: [], text: "" },
      { _id: "expiredays", name: "expiredays", type: "text", options: [], text: "" },
      { _id: "seed", name: "seed", type: "text", options: [], text: "" },
      { _id: "const", name: "type", type: "const", options: [], text: "Trial" },
      { _id: "permissions", name: "permissions", type: "checkboxes", options: ["FRS", "VMS", "PMS"], text: "" },
      { _id: "filetype", name: "filetype", type: "dropdown", options: [".lic", ".hex"], text: "" },
    ]
  },
  {
    _id: "SMARTPASS_pro",
    name: "SMARTPASS Pro",
    product: "SMARTPASS",
    parameters: [
      { _id: "count", name: "count", type: "text", options: [], text: "" },
      { _id: "expiredays", name: "expiredays", type: "text", options: [], text: "" },
      { _id: "upload", name: "upload", type: "upload", options: [], text: "" },
      { _id: "purpose", name: "purpose", type: "text", options: [], text: "" },
    ]
  },
  {
    _id: "ENOL_1k",
    name: "EnOL Enterprise 1k",
    product: "ENOL",
    parameters: [
      { _id: "hostname", name: "hostname", type: "textarea", options: [], text: "" },
      { _id: "hostip", name: "hostip", type: "textarea", options: [], text: "" },
      { _id: "serialnumber", name: "serialnumber", type: "text", options: [], text: "" },
      { _id: "supplier", name: "supplier", type: "text", options: [], text: "" },
      { _id: "client", name: "client", type: "text", options: [], text: "" },
      { _id: "note", name: "note", type: "textarea", options: [], text: "" },
      { _id: "dashboard", name: "dashboard", type: "date", options: [], text: "" },
      { _id: "producttype", name: "producttype", type: "radio", options: ["trail", "pro"], text: "" },
    ]
  },
  {
    _id: "ENOL_5k",
    name: "EnOL Enterprise 5k",
    product: "ENOL",
    parameters: [
      { _id: "amount", name: "amount", type: "const", options: [], text: "1000" },
    ]
  }
]


const LicenseTypeList = () => {
  const { t } = useContext(GlobalContext);
  const { role } = useContext(AuthContext);
  const history = useHistory();
  return (
    <Paper>
      <Table
        title={t("thing-list", { thing: t("license") })}
        rows={rows}
        columns={[
          { key: 'name', label: t('name') },
          { key: 'product', label: t('product') },
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
          { name: t('export'), onClick: () => { }, icon: <CloudDownload /> },
        ] : []}
        rowActions={role === 1 ? [
          { name: t('edit'), onClick: (e, row) => { history.push(`/licenseitem/${row._id}`) }, icon: <BorderColorSharp /> },
          { name: t('delete'), onClick: (e, row) => console.log(row), icon: <Delete /> }
        ] : []}
      // dense
      />
    </Paper>
  );
}


export default LicenseTypeList;