import { FaCog, FaCogs, FaHome, FaShieldAlt } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import React from 'react';
import { FaFilePen } from 'react-icons/fa6';
import { SidebarDataView } from './Sidebar/SidebarDataView';
import { cookies } from 'next/headers';
import prisma from '../../../prisma/client';
import { SideNavBarContainer } from './Sidebar/SidebarContainer';
import { SidebarLogout } from './Sidebar/SidebarLogout';
import { SidebarBtn } from "./Sidebar/SidebarButton";
import { FaShoppingCart } from "react-icons/fa";


async function SideNavBar() {

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

  return (
    <SideNavBarContainer dataView={<SidebarDataView />}>
      {/*General Setting */}
      <SidebarBtn text="Home" clickLink="/" icon={<FaHome />} />
      {/*Form */}
      <SidebarBtn text="Products" clickLink="/dashboard/products" icon={<FaFilePen />} />
      {/* <SidebarBtn text="APIs" clickLink="/dashboard/api" icon={<FaCogs />} /> */}
      {/*Role */}
      {(usr?.isSuperAdmin) && <SidebarBtn text="Users" clickLink="/dashboard/users" icon={<FaUserShield />} />}
      {(usr?.isSuperAdmin) && <SidebarBtn text="Orders" clickLink="/dashboard/orders" icon={<FaShoppingCart />} />}
      {/* {(usr?.isSuperAdmin) && <SidebarBtn text="Roles" clickLink="/dashboard/roles" icon={<FaShieldAlt />} />} */}
      {/* {(usr?.isSuperAdmin) && <SidebarBtn text="Audit Logs" clickLink="/dashboard/auditlog" icon={<SiFormspree />} />} */}
      {/* <SidebarBtn text="Settings" clickLink="/dashboard/settings" icon={<FaCog />} /> */}
      <hr className="my-2 h-0.5 bg-neutral-700" />
      <SidebarLogout />
      <hr className="my-2 h-0.5 bg-neutral-700" />
    </SideNavBarContainer>
  );
};

export default SideNavBar