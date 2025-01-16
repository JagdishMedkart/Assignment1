import TopNavBar from '@/components/Dashboard/TopNavbar'
import React from 'react'
import AdminUsersPage from '@/components/Dashboard/Users/AdminUsersPage'

const Products = () => {
  return (
    <>
      <TopNavBar title='Users' breadcrumbs={[]} />
      <div className='overflow-y-scroll'>
        <AdminUsersPage/>
      </div>
    </>
  )
}

export default Products;
