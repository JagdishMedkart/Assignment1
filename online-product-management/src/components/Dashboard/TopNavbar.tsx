import { cookies } from 'next/headers';
import React from 'react';
import { FaAngleRight } from 'react-icons/fa';
import prisma from '../../../prisma/client';
import { FaUserCircle } from "react-icons/fa";

async function TopNavBar({ title, breadcrumbs }: { title: string, breadcrumbs: { display: string, link: string }[] }) {
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
    },
    select: {
      name: true
    }
  });
  return (
    <nav className="bg-slate-50 shadow-sm p-2">
      <div className="container flex flex-col">
        <div className="text-black text-xl flex align-middle  justify-between ">
          <div className=''>{title}</div>
          <div className="text-sm mr-5 flex italic mt-1">{usr?.name} <FaUserCircle className='ml-3' size={23}/></div>
        </div>
        <div className="flex flex-row items-center">{
          breadcrumbs.map((crumb, idx) => {
            return <><a href={crumb.link} key={idx} className="text-black p-1 text-sm">{crumb.display}</a> {idx !== breadcrumbs.length - 1 ? <FaAngleRight /> : <></>}</>
          })
        }</div>
      </div>
    </nav>
  )
};
export default TopNavBar