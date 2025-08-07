import CustomersTable from '@/components/sections/control-dashboard/CustomersTable';
import TopUpsTable from '@/components/sections/control-dashboard/TopUpsTable';
import AllOverviewData from '@/components/sections/CustomerDashboard/AllOverviewData';
import React from 'react';

function page() {
  return (
    <div>
      <AllOverviewData />
      <CustomersTable />
    </div>
  );
}

export default page;
