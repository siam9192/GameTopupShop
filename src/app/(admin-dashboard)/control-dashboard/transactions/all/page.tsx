import TransactionsFilterBox from '@/components/sections/control-dashboard/TransactionsFilterBox';
import TransactionsFilterBoxModal from '@/components/sections/control-dashboard/TransactionsFilterBoxModal';
import TransactionsTable from '@/components/sections/control-dashboard/TransactionsTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import TransactionsPageProvider from '@/provider/TransactionsPageProvider';
import React from 'react';

function page() {
  return (
    <TransactionsPageProvider>
      <div>
        <DashboardPageHeading title="Transactions" />
        <TransactionsFilterBox />
        <div className="flex justify-end">
          <TransactionsFilterBoxModal />
        </div>
        <TransactionsTable />
      </div>
    </TransactionsPageProvider>
  );
}

export default page;
