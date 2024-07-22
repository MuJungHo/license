import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthContext } from "../../contexts/AuthContext";
import {
  Table, Paper,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "../../components/common";

import {
  ConfirmationNumber,
  GetApp
} from '@material-ui/icons';

import { CheckCircleOutline, BlockRounded } from '@material-ui/icons';
import Generator from "../../components/License/Generator";
import {
  TRANSACTION_STATUS
} from "../../utils/constant";

// Status : 1 (require) Status : 2 (approve) Status : 3 (reject) Status : 4 (transfer) Status : 5 (commit)

const LicenseList = () => {
  const md5 = require("md5");

  const { t, openDialog, closeDialog, authedApi } = useContext(GlobalContext);
  const { role, token } = useContext(AuthContext);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState({
    order: "desc",
    sort: "datetime",
    keyword: "",
    limit: 10,
    page: 1,
  });

  const [transactions, setTransactions] = React.useState([])

  React.useEffect(() => {
    getLicenseTransactionList()
  }, [filter])

  const getLicenseTransactionList = async () => {
    const { result, total } = await authedApi.getLicenseTransactionList({
      data: {
        status: [1, 2, 3, 4]
      },
      ...filter
    })
    let _transactions = result.map(p => ({
      ...p,
      _id: p.ltid,
      _status: TRANSACTION_STATUS[p.status]
    }))
    setTransactions(_transactions)
    setTotal(total)
  }

  const handleApproveLicense = async (row) => {
    const ltid = row.ltid;
    await authedApi.postLicenseApprove({ data: {}, ltid })
    getLicenseTransactionList()
  }

  const handleRejectLicense = async (row) => {
    const ltid = row.ltid;
    await authedApi.postLicenseReject({ data: {}, ltid })
    getLicenseTransactionList()
  }

  return (
    <Paper>
      <Table
        title={t("thing-list", { thing: t("transaction") })}
        rows={transactions}
        columns={[
          { key: 'consumer_name', label: t('consumer') },
          { key: 'provider_name', label: t('provider') },
          { key: 'product_name', label: t('product') },
          { key: 'number', label: t('count') },
          { key: 'description', label: t('description') },
          { key: '_status', label: t('status') },
        ]}
        checkable={false}
        order={filter.order}
        sort={filter.sort}
        total={total}
        onPageChange={(page) => setFilter({ ...filter, page })}
        onRowsPerPageChange={(limit) => setFilter({ ...filter, page: 1, limit })}
        onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        rowActions={[
          { name: t('approve'), onClick: (e, row) => handleApproveLicense(row), icon: <CheckCircleOutline />, showMenuItem: (row) => row.status === 1 && role === 1 },
          { name: t('reject'), onClick: (e, row) => handleRejectLicense(row), icon: <BlockRounded />, showMenuItem: (row) => row.status === 1 && role === 1 }
        ]}
      // dense
      />
    </Paper>
  );
}


export default LicenseList;