
import TopNavBar from '@/components/Dashboard/TopNavbar'
import ProductPage from "../../../components/Dashboard/Products/ProductPage"
import React from 'react'

const Products = () => {
  return (
    <>
      <TopNavBar title='Forms' breadcrumbs={[]} />
      <div className='overflow-y-scroll'>
        <ProductPage />
      </div>
    </>
  )
}

export default Products;
