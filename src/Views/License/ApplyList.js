import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Table, Paper } from "../../components/common";

// import {
//   BorderColorSharp,
//   Delete,
//   AddBox,
// } from '@material-ui/icons';

import { applylist } from "../../utils/constant";

import { CheckCircleOutline, BlockRounded } from '@material-ui/icons';

const ApplyList = () => {
  const { t } = useContext(GlobalContext);
  const { role } = useContext(AuthContext);

  return (
    <Paper>
      <Table
        title={t("thing-list", { thing: t("apply") })}
        rows={applylist}
        columns={[
          { key: 'applicant', label: t('applicant') },
          { key: 'license', label: t('license') },
          { key: 'count', label: t('count') },
          { key: 'status', label: t('status') },
          { key: 'description', label: t('description') },
        ]}
        checkable={false}
        order="asc"
        orderBy="applicant"
        onPageChange={(event, page) => console.log(page)}
        onRowsPerPageChange={(event) => console.log(parseInt(event.target.value, 10))}
        onSortChange={(isAsc, property) => console.log(isAsc, property)}
        onKeywordSearch={(event) => console.log(event.target.value)}
        rowActions={[
          { name: t('approve'), onClick: (e, row) => console.log(row), icon: <CheckCircleOutline />, showMenuItem: (row) => (role === 1 || role === 2) && row.status === "Under Approval" },
          { name: t('reject'), onClick: (e, row) => console.log(row), icon: <BlockRounded />, showMenuItem: (row) => (role === 1 || role === 2) && row.status === "Under Approval" }
        ]}
      // dense
      />
    </Paper>
  );
}


export default ApplyList;