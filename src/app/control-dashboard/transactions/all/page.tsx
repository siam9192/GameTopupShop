import CustomersFilterBox from '@/components/sections/control-dashboard/CustomersFilterBox';
import CustomersFilterBoxModal from '@/components/sections/control-dashboard/CustomersFilterBoxModal';
import TransactionsFilterBox from '@/components/sections/control-dashboard/TransactionsFilterBox';
import TransactionsFilterBoxModal from '@/components/sections/control-dashboard/TransactionsFilterBoxModal';
import TransactionsTable from '@/components/sections/control-dashboard/TransactionsTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import React from 'react';

function page() {
  return (
    <div>
      <DashboardPageHeading title="Transactions" />
      <TransactionsFilterBox />
      <div className="flex justify-end">
        <TransactionsFilterBoxModal />
      </div>
      <TransactionsTable />
    </div>
  );
}

export default page;
