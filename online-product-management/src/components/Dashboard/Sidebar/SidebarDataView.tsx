'use server'
import React from 'react';
import { cookies } from 'next/headers';

export const SidebarDataView: React.FC = async () => {
  const sess = (await cookies()).get('session-us')?.value;
  //const userSession = await prisma.session.findFirst({ where: { sessionToken: sess } });

  //const db = await User.getAccessibleEntities(userSession.userId as Id<"User">);

   const comps: React.JSX.Element[] = [];
//   for (const [srcId, src] of db) {
//     let dbComps = [];
    // for (const [dbEntityId, dbEntity] of src.children) {
    //   let tblComps = [];
    //   for (const [tblID, tbl] of dbEntity.children) {
    //     const linkPath = `/dashboard/sheet/${srcId}/${dbEntityId}/${tblID}`;
    //     let tblEl = <SidebarCollapsible display={tbl.name} icon={<FiTable />} link={linkPath} />
    //     tblComps.push(tblEl);
    //   }
    //   let dbEl = <SidebarCollapsible display={dbEntity.name} icon={<LuDatabase />}>
    //     {tblComps}
    //   </SidebarCollapsible>

    //   dbComps.push(dbEl);
    // }
    // let srcEl = <SidebarCollapsible display={src.name} icon={<AiOutlineDatabase />}>
    //   {dbComps}
    // </SidebarCollapsible>
    // comps.push(srcEl);

  return (
    <div className="overflow-y-auto scrollbar-thin ">
      <ul className="menu menu-xs menu-vertical w-full max-w-xs" >
        {comps}
      </ul>
    </div>)
}