import React, { ReactNode } from 'react';
import SideNav from '../../components/Dashboard/SideNav';
interface Props {
  children: ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex">
      <SideNav />
      <div className="flex flex-col max-h-screen overflow-y-hidden w-full">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;