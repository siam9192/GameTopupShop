import CustomersFilterBox from '@/components/sections/control-dashboard/CustomersFilterBox';
import CustomersFilterBoxModal from '@/components/sections/control-dashboard/CustomersFilterBoxModal';
import CustomersWalletTable from '@/components/sections/control-dashboard/CustomersWalletTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import React from 'react';

function page() {
  return (
    <div>
      <DashboardPageHeading title="Customers Wallet" />
      <CustomersFilterBox />
      <div className="flex justify-end">
        <CustomersFilterBoxModal />
      </div>
      <CustomersWalletTable />
    </div>
  );
}

export default page;
