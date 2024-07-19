import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Table, Paper } from "../../components/common";
import { useHistory } from "react-router-dom";

import {
  BorderColorSharp,
  Delete,
  AddBox,
} from '@material-ui/icons';
import ProductSection from "../../components/License/ProductSection";

const LicenseList = () => {
  const { t, openDialog } = useContext(GlobalContext);
  const { role, authedApi } = useContext(AuthContext);
  const history = useHistory();
  const [products, setProducts] = React.useState([])

  React.useEffect(() => {
    getProductList()
  }, [])

  const getProductList = async () => {
    const { result } = await authedApi.getProductList({
      data: {
      },
      limit: 50,
      page: 1
    })
    let _products = result.map(p => ({ ...p, _id: p.productid }))
    setProducts(_products)
  }

  const openAddProductDialog = () => {
    openDialog({
      title: `Add Product`,
      section: <ProductSection onConfirm={handleAddProduct} />
    })
  }

  const handleAddProduct = async (product) => {
    await authedApi.postAddProduct({ data: { ...product } })
    getProductList()
  }

  const handleDeleteProduct = async (product) => {
    await authedApi.deleteProduct({ productid: product.productid })
    getProductList()
  }



  return (
    <Paper>
      <Table
        title={t("thing-list", { thing: t("product") })}
        rows={products}
        columns={[
          { key: 'name', label: t('name') },
          { key: 'description', label: t('description') },
        ]}
        checkable={role === 1}
        order="asc"
        orderBy="name"
        onPageChange={(event, page) => console.log(page)}
        onRowsPerPageChange={(event) => console.log(parseInt(event.target.value, 10))}
        onSortChange={(isAsc, property) => console.log(isAsc, property)}
        onKeywordSearch={(event) => console.log(event.target.value)}
        toolbarActions={role === 1 ? [
          { name: t('add'), onClick: openAddProductDialog, icon: <AddBox /> },
        ] : []}
        rowActions={role === 1 ? [
          { name: t('edit'), onClick: (e, row) => { history.push(`/product/${row._id}`) }, icon: <BorderColorSharp /> },
          { name: t('delete'), onClick: (e, row) => handleDeleteProduct(row), icon: <Delete /> }
        ] : []}
      // dense
      />
    </Paper>
  );
}


export default LicenseList;