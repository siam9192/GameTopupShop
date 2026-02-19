
import OrdersFilterBox from '@/components/sections/control-dashboard/OrdersFilterBox';
import OrdersFilterBoxModal from '@/components/sections/control-dashboard/OrdersFilterBoxModal';
import OrdersTable from '@/components/sections/control-dashboard/OrdersTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import OrdersPageProvider from '@/provider/OrdersPageProvider';
import React from 'react';

function page() {
  return (
    <OrdersPageProvider>
      <div>
        <DashboardPageHeading title="Orders" />
        <OrdersFilterBox />
        <div className="flex justify-end">
          <OrdersFilterBoxModal />
        </div>
        <OrdersTable />
      </div>
    </OrdersPageProvider>
  );
}

export default page;
