import CustomersWalletFilterBox from '@/components/sections/control-dashboard/CustomersWalletFilterBox';
import CustomersWalletFilterModal from '@/components/sections/control-dashboard/CustomersWalletFilterModal';
import CustomersWalletTable from '@/components/sections/control-dashboard/CustomersWalletTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import CustomersWalletPageProvider from '@/provider/CustomersWalletPageProvider';
import React from 'react';

function page() {
  return (
    <CustomersWalletPageProvider>
      <div>
        <DashboardPageHeading title="Customers Wallet" />
        <CustomersWalletFilterBox />
        <div className="flex justify-end">
          <CustomersWalletFilterModal />
        </div>
        <CustomersWalletTable />
      </div>
    </CustomersWalletPageProvider>
  );
}

export default page;
