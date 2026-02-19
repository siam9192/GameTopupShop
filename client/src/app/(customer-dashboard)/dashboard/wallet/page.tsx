import RecentAddBalanceSubmissions from '@/components/sections/customer-dashboard/RecentAddBalanceSubmissions';
import WalletOverviewData from '@/components/sections/customer-dashboard/WalletOverviewData';
import React from 'react';

function page() {
  return (
    <div>
      <WalletOverviewData />
      <RecentAddBalanceSubmissions />
    </div>
  );
}

export default page;
