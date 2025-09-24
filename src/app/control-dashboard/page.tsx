'use client';
import AllOverviewData from '@/components/sections/control-dashboard/AllOverviewData';
import NewCustomerChart from '@/components/sections/control-dashboard/NewCustomerChart';
import OrdersStatusChart from '@/components/sections/control-dashboard/OrdersStatusChart';
import OrderTargetProgressChart from '@/components/sections/control-dashboard/OrderTargetProgessChart';
import RecentOrders from '@/components/sections/control-dashboard/RecentOrders';
import RevenueChart from '@/components/sections/control-dashboard/RevenueChart';
import TargetProgress from '@/components/sections/control-dashboard/TargetProgress';
import TopCustomers from '@/components/sections/control-dashboard/TopCustomers';
import UnreadNotifications from '@/components/sections/customer-dashboard/UnreadNotifications';
import { Grid } from '@mui/material';
import React from 'react';

function page() {
  return (
    <div>
      <AllOverviewData />
      <div className="mt-10 grid lg:grid-cols-3 gap-5">
        <div className=" grid col-span-2 gap-5">
          <RevenueChart />
          <RecentOrders />
        </div>

        <div className="grid gap-5 h-fit">
          <OrdersStatusChart />
          <TargetProgress />
          <TopCustomers />
        </div>
      </div>
    </div>
  );
}

export default page;
