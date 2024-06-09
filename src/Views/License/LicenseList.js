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
import { licenselist } from "../../utils/constant";

const LicenseTypeList = () => {
  const { t } = useContext(GlobalContext);
  const { role } = useContext(AuthContext);
  const history = useHistory();
  return (
    <Paper>
      <Table
        title={t("thing-list", { thing: t("license") })}
        rows={licenselist}
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