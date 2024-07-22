import React, {
  useContext
} from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import {
  Paper,
  Table,
  // DialogContent,
  // DialogActions,
  // Button,
  // TextField
} from "../../components/common";

import Commit from "../../components/License/Commit";
import Transfer from "../../components/License/Transfer";
import Require from "../../components/License/Require";

// import {
//   Select,
//   MenuItem
// } from '@material-ui/core';

import {
  License,
  PostAdd,
  Commit as CommitIcon
} from "../../images/icons";

const MyLicense = () => {
  const { account, role, accountid } = useContext(AuthContext);
  const { t, openDialog, closeDialog, authedApi } = useContext(GlobalContext);
  const [rows, setRows] = React.useState([]);
  const [totalDownload, setTotalDownload] = React.useState(0)
  // console.log(role)
  React.useEffect(() => {
    getMyAccount()
  }, [])

  const getMyAccount = async () => {
    const { products, total_sales } = await authedApi.getAccountInfo({ accountid })
    let _products = products.map(p => ({ ...p, _id: p.productid }))
    setRows(_products)
    setTotalDownload(total_sales)
  }

  const handleSetCommitDialog = (row) => {
    openDialog({
      title: `${t("commit")} ${row.product_name}`,
      section: <Commit onConfirm={state => handleCommitLicense(state, row.productid)} />
    })
  }

  const handleCommitLicense = async (state, productid) => {
    await authedApi.postLicenseCommit({ data: { ...state, productid }, })
    closeDialog()
    getMyAccount()
  }

  const handleSetTransferDialog = (row) => {
    openDialog({
      title: `${t("transfer")} ${row.product_name}`,
      section: <Transfer onConfirm={state => handleTransferLicense(state, row.productid)} />
    })
  }

  const handleTransferLicense = async (state, productid) => {
    await authedApi.postLicenseTransfer({ data: { ...state, productid }, })
    closeDialog()
    getMyAccount()
  }

  const handleSetRequireDialog = (row) => {
    openDialog({
      title: `${t("require")} ${row.product_name}`,
      section: <Require onConfirm={state => handleRequireLicense(state, row.productid)} />
    })
  }

  const handleRequireLicense = async (state, productid) => {
    await authedApi.postLicenseApply({ data: { ...state, productid }, })
    closeDialog()
    getMyAccount()
  }

  return (
    <Paper>
      <Table
        title={`Hi ${account}. 以下是您所擁有的產品, 總共交易 ${totalDownload} 筆。`}
        rows={rows}
        columns={[
          { key: 'product_name', label: t('name') },
          { key: 'number', label: t('thing-amount', { thing: t("license") }) },
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
          { name: t('commit'), onClick: (e, row) => handleSetCommitDialog(row), icon: <CommitIcon /> },
          { name: t('transfer'), onClick: (e, row) => handleSetTransferDialog(row), icon: <License />, showMenuItem: (row) => role === 1 || role === 2 },
          { name: t('require'), onClick: (e, row) => handleSetRequireDialog(row), icon: <PostAdd />, showMenuItem: () => (role === 2 || role === 3) },
        ]}
      // dense
      />

    </Paper>
  );
}


export default MyLicense;