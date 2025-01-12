import HomeDashboard from "../../../components/Dashboard/HomeComponents/HomeDashboard";
import TopNavBar from "../../../components/Dashboard/TopNavbar"
import React from 'react';

function page() {
  return (
    <>
      <TopNavBar title='Home' breadcrumbs={[]} />
      <div className='overflow-y-scroll'>
        <HomeDashboard />
      </div>
    </>
  )
}

export default page