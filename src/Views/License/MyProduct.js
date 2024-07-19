import React, {
  useContext
} from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import {
  Paper,
  Table,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "../../components/common";
import GetAppIcon from '@material-ui/icons/GetApp';
import Commit from "../../components/License/Commit";
import Transfer from "../../components/License/Transfer";
import Apply from "../../components/License/Apply";

import {
  Select,
  MenuItem
} from '@material-ui/core';

import {
  License,
  PostAdd
} from "../../images/icons";

const MyLicense = () => {
  const { account, role, authedApi, accountid } = useContext(AuthContext);
  const { t, openDialog, closeDialog } = useContext(GlobalContext);
  const [rows, setRows] = React.useState([]);
  // console.log(role)
  React.useEffect(() => {
    getMyAccount()
  }, [])

  const getMyAccount = async () => {
    const { products } = await authedApi.getAccountInfo({ accountid })
    let _products = products.map(p => ({ ...p, _id: p.productid }))
    setRows(_products)
  }

  const handleSetCommitDialog = (row) => {
    openDialog({
      title: `Download ${row.product_name}`,
      section: <Commit onConfirm={state => handleCommitLicense(state, row.productid)} />
    })
  }

  const handleCommitLicense = async (state, productid) => {
    await authedApi.postLicenseCommit({ data: { ...state, productid }, })
  }

  const handleSetTransferDialog = (row) => {
    openDialog({
      title: `Transfer ${row.product_name}`,
      section: <Transfer onConfirm={state => handleTransferLicense(state, row.productid)} />
    })
  }

  const handleTransferLicense = async (state, productid) => {
    await authedApi.postLicenseTransfer({ data: { ...state, productid, consumer_accountid: 17 }, })
    closeDialog()
  }

  const handleSetApplyDialog = (row) => {
    openDialog({
      title: `Apply ${row.product_name}`,
      section: <Apply onConfirm={state => handleApplyLicense(state, row.productid)} />
    })
  }

  const handleApplyLicense = async (state, productid) => {
    await authedApi.postLicenseApply({ data: { ...state, productid, provider_accountid: 19 }, })
    closeDialog()
  }

  return (
    <Paper>
      <Table
        title={`Hi ${account}. 以下是您所擁有的產品`}
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
          { name: t('commit'), onClick: (e, row) => handleSetCommitDialog(row), icon: <GetAppIcon /> },
          { name: t('transfer'), onClick: (e, row) => handleSetTransferDialog(row), icon: <License />, showMenuItem: (row) => role === 1 || (row.amount > 0 && role === 2) },
          { name: t('apply'), onClick: (e, row) => handleSetApplyDialog(row), icon: <PostAdd />, showMenuItem: () => (role === 2 || role === 3) },
        ]}
      // dense
      />

    </Paper>
  );
}


export default MyLicense;