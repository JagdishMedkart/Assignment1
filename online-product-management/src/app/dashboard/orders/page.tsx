
import TopNavBar from '@/components/Dashboard/TopNavbar'
import React from 'react'
import AdminOrdersPage from '@/components/Dashboard/Orders/AdminOrders'

const Products = () => {
  return (
    <>
      <TopNavBar title='Orders' breadcrumbs={[]} />
      <div className='overflow-y-scroll'>
        <AdminOrdersPage />
      </div>
    </>
  )
}

export default Products;
