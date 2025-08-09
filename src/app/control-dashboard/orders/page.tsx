import OrdersFilterBox from '@/components/sections/control-dashboard/OrdersFilterBox';
import OrdersFilterBoxModal from '@/components/sections/control-dashboard/OrdersFilterBoxModal';
import OrdersTable from '@/components/sections/control-dashboard/OrdersTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import React from 'react';

function page() {
  return (
    <div>
      <DashboardPageHeading title="Orders" />
      <OrdersFilterBox />
      <div className="flex justify-end">
        <OrdersFilterBoxModal />
      </div>
      <OrdersTable />
    </div>
  );
}

export default page;
