import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthContext } from "../../contexts/AuthContext";
import {
  Table, Paper,
} from "../../components/common";

import Generator from "../../components/License/Generator";

import { Download, Verified, Link, LinkOff } from "../../images/icons"

// Status : 1 (require) Status : 2 (approve) Status : 3 (reject) Status : 4 (transfer) Status : 5 (commit)

const CommitList = () => {
  const md5 = require("md5");

  const { t, openDialog, closeDialog, authedApi, openSnackbar } = useContext(GlobalContext);
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
    getLicenseCommitList()
  }, [filter])

  const getLicenseCommitList = async () => {
    const { result, total } = await authedApi.getLicenseTransactionList({
      data: {
        status: [5]
      },
      ...filter
    })
    let _transactions = result.map(p => ({
      ...p,
      _id: p.ltid,
      _commercial: p.commercial ? <Verified /> : null
    }))
    setTransactions(_transactions)
    setTotal(total)
  }
  const handleBindDialog = (row) => {
    openDialog({
      title: `${t("bind")} ${row.product_name}`,
      section: <Generator onConfirm={params => handleBindLicense(params, row.ltid)} productid={row.productid} />
    })
  }
  const handleBindLicense = async (params, ltid) => {
    await authedApi.postLicenseBind({ data: { ...params }, ltid })
    closeDialog()
    getLicenseCommitList()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("bind") })
    })
  }

  const handleDownloadLicense = async (ltid) => {

    const host = process.env.NODE_ENV === 'production' ? "" : `http://${process.env.REACT_APP_HOST}`
    const timestamp = Date.now()
    const sign = md5(timestamp + '#' + token)
    const url = `${host}/cgi-bin/db/license/download?timestamp=${timestamp}&sign=${sign}&ltid=${ltid}`

    window.open(url);
  }

  const handleUnBindLicense = async row => {
    const ltid = row.ltid;
    await authedApi.postLicenseUnBind({ ltid })
    getLicenseCommitList()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("unbind") })
    })
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
        order={filter.order}
        sort={filter.sort}
        total={total}
        onPageChange={(page) => setFilter({ ...filter, page })}
        onRowsPerPageChange={(limit) => setFilter({ ...filter, page: 1, limit })}
        onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
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