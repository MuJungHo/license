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
import { Download, Verified, Link, LinkOff } from "../../images/icons"

// Status : 1 (require) Status : 2 (approve) Status : 3 (reject) Status : 4 (transfer) Status : 5 (commit)

const CommitList = () => {
  const md5 = require("md5");

  const { t, openDialog, closeDialog, authedApi } = useContext(GlobalContext);
  const { role, token } = useContext(AuthContext);

  const [transactions, setTransactions] = React.useState([])

  React.useEffect(() => {
    getLicenseCommitList()
  }, [])

  const getLicenseCommitList = async () => {
    const { result } = await authedApi.getLicenseTransactionList({
      data: {
        status: [5]
      },
      limit: 50,
      page: 1
    })
    let _transactions = result.map(p => ({
      ...p,
      _id: p.ltid,
      _status: TRANSACTION_STATUS[p.status],
      _commercial: p.commercial ? <Verified /> : null
    }))
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
    closeDialog()
    getLicenseCommitList()
  }

  const handleDownloadLicense = async (ltid) => {

    const host = process.env.NODE_ENV === 'production' ? "" : `http://${process.env.REACT_APP_HOST}`
    const timestamp = Date.now()
    const sign = md5(timestamp + '#' + token)
    const url = `${host}/cgi-bin/db/license/download?timestamp=${timestamp}&sign=${sign}&ltid=${ltid}`

    window.open(url);
  }

  const handleApproveLicense = async (row) => {
    const ltid = row.ltid;
    await authedApi.postLicenseApprove({ data: {}, ltid })
    getLicenseCommitList()
  }

  const handleRejectLicense = async (row) => {
    const ltid = row.ltid;
    await authedApi.postLicenseReject({ data: {}, ltid })
    getLicenseCommitList()
  }

  const handleUnBindLicense = async row => {
    const ltid = row.ltid;
    await authedApi.postLicenseUnBind({ ltid })
    getLicenseCommitList()
  }

  return (
    <Paper>
      <Table
        title={t("thing-list", { thing: t("commit") })}
        rows={transactions}
        columns={[
          { key: 'consumer_name', label: t('consumer') },
          { key: 'provider_name', label: t('provider') },
          { key: 'product_name', label: t('product') },
          { key: 'number', label: t('count') },
          { key: '_commercial', label: t('commercial') },
        ]}
        checkable={false}
        order="asc"
        orderBy="consumer_name"
        onPageChange={(event, page) => console.log(page)}
        onRowsPerPageChange={(event) => console.log(parseInt(event.target.value, 10))}
        onSortChange={(isAsc, property) => console.log(isAsc, property)}
        onKeywordSearch={(event) => console.log(event.target.value)}
        rowActions={[
          { name: t('bind'), onClick: (e, row) => handleBindDialog(row), icon: <Link />, showMenuItem: (row) => row.status === 5 && !row.is_bind },
          { name: t('unbind'), onClick: (e, row) => handleUnBindLicense(row), icon: <LinkOff />, showMenuItem: (row) => row.status === 5 && row.is_bind },
          { name: t('download'), onClick: (e, row) => handleDownloadLicense(row.ltid), icon: <Download />, showMenuItem: (row) => row.is_bind },
        ]}
      // dense
      />
    </Paper>
  );
}


export default CommitList;