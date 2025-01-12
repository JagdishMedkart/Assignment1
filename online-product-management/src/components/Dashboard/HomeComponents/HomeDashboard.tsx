import React from 'react'
import { cookies } from "next/headers";
import prisma from "../../../../prisma/client";

export default async function HomeDashBoard() {
  const sess = (await cookies()).get('session-us')?.value;
  if (sess == null)
    return <></>
  const usr = await prisma.user.findFirst({
    where: {
      sessions: {
        some: {
          sessionToken: sess
        }
      }
    }
  });
  //const superAdmin = usr?.isSuperAdmin;
  return (
    <div className="scroll-auto  bg-gray-100">
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-1 justify-evenly">
        {/* {usr?.isSuperAdmin && <AddDataSourceModel />} */}
        {/* <Box icon={AiFillDatabase} title="Total Data Sources" amount={`${dataSourcesCount}`} />
        <Box icon={GiDatabase} title="Total Databases" amount={`${dbCount}`} />
        <Box icon={BsTable} title="Total Tables" amount={`${tblCount}`} /> */}
      </div>
      {/*Horizontal Line */}
      <div className="px-3 ">
        <hr className="my-2 h-0.5 bg-neutral-400 w-full" />
      </div>

      {/* <ClientSideDashBoard
        formData={formData}
        formGraphData={final_form_data}
        apiGraphData={final_api_data}
        apiData={apiData}
        dataSourcesCount={dataSourcesCount}
        superAdmin={superAdmin}
        userId={usr.id}
      /> */}
    </div >
  )
}