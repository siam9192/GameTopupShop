import AdministratorsFilterBox from '@/components/sections/control-dashboard/AdministratorsFilterBox';
import AdministratorsFilterBoxModal from '@/components/sections/control-dashboard/AdministratorsFilterBoxModel';
import AdministratorsTable from '@/components/sections/control-dashboard/AdministratorsTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import AdministratorsPageProvider from '@/provider/AdministratorsPageProvider';
import React from 'react';

export default function page() {
  return (
    <AdministratorsPageProvider>
      <div>
        <DashboardPageHeading title="Administrators" />
        <AdministratorsFilterBox />
        <div className="flex justify-end">
          <AdministratorsFilterBoxModal />
        </div>
        <AdministratorsTable />
      </div>
    </AdministratorsPageProvider>
  );
}
