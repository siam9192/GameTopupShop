import AdministratorsFilterBox from '@/components/sections/control-dashboard/AdministratorsFilterBox';
import AdministratorsFilterBoxModal from '@/components/sections/control-dashboard/AdministratorsFilterBoxModel';
import AdministratorsTable from '@/components/sections/control-dashboard/AdministratorsTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import React from 'react';

function page() {
  return (
    <div>
      <DashboardPageHeading title="Administrators" />
      <AdministratorsFilterBox />
      <div className="flex justify-end">
        <AdministratorsFilterBoxModal />
      </div>
      <AdministratorsTable />
    </div>
  );
}

export default page;
