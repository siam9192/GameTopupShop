import WalletAddBalanceSubmissionsFilterBox from '@/components/sections/control-dashboard/WalletAddBalanceSubmissionsFilterBox';
import WalletAddBalanceSubmissionsFilterBoxModal from '@/components/sections/control-dashboard/WalletAddBalanceSubmissionsFilterBoxModal';
import WalletAddBalanceSubmissionsTable from '@/components/sections/control-dashboard/WalletAddBalanceSubmissionsTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import WalletSubmissionsPageProvider from '@/provider/WalletSubmissionsPageProvider';
import React from 'react';

function page() {
  return (
    <WalletSubmissionsPageProvider>
      <div>
        <DashboardPageHeading title="Add Balance Submissions" />
        <WalletAddBalanceSubmissionsFilterBox />
        <div className="flex justify-end">
          <WalletAddBalanceSubmissionsFilterBoxModal />
        </div>
        <WalletAddBalanceSubmissionsTable />
      </div>
    </WalletSubmissionsPageProvider>
  );
}

export default page;
