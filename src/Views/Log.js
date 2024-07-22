import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { AuthContext } from "../contexts/AuthContext";
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
import moment from "moment/moment";

const User = () => {
  const { t, authedApi } = useContext(GlobalContext);
  const [loglist, setLoglist] = React.useState([])

  React.useEffect(() => {
    getLogList()
  }, [])

  const getLogList = async () => {
    const { result } = await authedApi.getLogList({
      data: {
      },
      limit: 10,
      page: 1,
      start: moment().startOf('date').valueOf(),
      end: moment().endOf('date').valueOf(),

    });
    let _logs = result.map(l => ({ ...l, _id: l.logid }))
    setLoglist(_logs)
  }

  return (
    <Paper>
      <Table
        title={t("_log")}
        rows={loglist}
        columns={[
          { key: 'datetime', label: t('datetime') },
          { key: 'accountname', label: t('account') },
          { key: 'condition', label: t('condition') },
          { key: 'detail', label: t('detail') },
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