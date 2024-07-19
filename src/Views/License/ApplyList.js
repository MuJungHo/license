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

const ApplyList = () => {
  const md5 = require("md5");
  
  const { t, openDialog } = useContext(GlobalContext);
  const { role, authedApi, token } = useContext(AuthContext);

  const [transactions, setTransactions] = React.useState([])

  React.useEffect(() => {
    getLicenseTransactionList()
  }, [])

  const getLicenseTransactionList = async () => {
    const { result } = await authedApi.getLicenseTransactionList({
      data: {
      },
      limit: 50,
      page: 1
    })
    let _transactions = result.map(p => ({ ...p, _id: p.ltid }))
    setTransactions(_transactions)
  }
  const handleBindDialog = (row) => {
    openDialog({
      title: `Bind ${row.product_name}`,
      section: <Generator onConfirm={params => handleBindLicense(params, row.ltid)} productid={row.productid} />
    })
  }
  const handleBindLicense = async (params, ltid) => {
    await authedApi.postLicenseBind({ data: { ...params }, ltid })
  }
  const handleDownloadDialog = (row) => {
    openDialog({
      title: `Download ${row.product_name}`,
      section: <Button onClick={() => handleDownloadLicense(row.ltid)}>Download</Button>
    })
  }
  const handleDownloadLicense = async (ltid) => {

    const host = process.env.NODE_ENV === 'production' ? "" : `http://${process.env.REACT_APP_HOST}`
    const timestamp = Date.now()
    const sign = md5(timestamp + '#' + token)
    const url = `${host}/cgi-bin/db/license/download?timestamp=${timestamp}&sign=${sign}&ltid=${ltid}`

    window.open(url);
  }
  return (
    <Paper>
      <Table
        title={t("thing-list", { thing: t("apply") })}
        rows={transactions}
        columns={[
          { key: 'consumer_name', label: t('applicant') },
          { key: 'product_name', label: t('license') },
          { key: 'number', label: t('count') },
          { key: 'status', label: t('status') },
        ]}
        checkable={false}
        order="asc"
        orderBy="consumer_name"
        onPageChange={(event, page) => console.log(page)}
        onRowsPerPageChange={(event) => console.log(parseInt(event.target.value, 10))}
        onSortChange={(isAsc, property) => console.log(isAsc, property)}
        onKeywordSearch={(event) => console.log(event.target.value)}
        rowActions={[
          { name: t('bind'), onClick: (e, row) => handleBindDialog(row), icon: <ConfirmationNumber />, showMenuItem: (row) => !row.is_bind },
          { name: t('download'), onClick: (e, row) => handleDownloadDialog(row), icon: <GetApp />, showMenuItem: (row) => row.is_bind },
          { name: t('approve'), onClick: (e, row) => console.log(row), icon: <CheckCircleOutline />, showMenuItem: (row) => (role === 1 || role === 2) && row.status === 1 },
          { name: t('reject'), onClick: (e, row) => console.log(row), icon: <BlockRounded />, showMenuItem: (row) => (role === 1 || role === 2) && row.status === 1 }
        ]}
      // dense
      />
    </Paper>
  );
}


export default ApplyList;