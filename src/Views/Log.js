import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
// import { AuthContext } from "../contexts/AuthContext";
import {
  Table,
  Paper,
  // Button,
  // DialogContent,
  // DialogActions,
  // TextField
} from "../components/common";

// import {
//   BorderColorSharp,
//   Delete,
//   AddBox,
// } from '@material-ui/icons';

// import {
//   License
// } from "../images/icons";
// import moment from "moment/moment";

import { loglist } from "../utils/constant";

const User = () => {
  const { t } = useContext(GlobalContext);
  // const { role } = useContext(AuthContext);


  return (
    <Paper>
      <Table
        title={t("_log")}
        rows={loglist}
        columns={[
          { key: 'datetime', label: t('datetime') },
          { key: 'account', label: t('account') },
          { key: 'name', label: t('name') },
          { key: 'description', label: t('description') },
        ]}
        checkable={false}
        order="asc"
        orderBy="datetime"
        rowsPerPage={10}
        onPageChange={(event, page) => console.log(page)}
        onRowsPerPageChange={(event) => console.log(parseInt(event.target.value, 10))}
        onSortChange={(isAsc, property) => console.log(isAsc, property)}
        onKeywordSearch={(event) => console.log(event.target.value)}
        toolbarActions={[]}
        rowActions={[]}
      // dense
      />
    </Paper>
  );
}


export default User;