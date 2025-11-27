import ManualPaymentMethodsFilterBox from '@/components/sections/control-dashboard/ManualPaymentMethodsFilterBox';
import ManualPaymentMethodsFilterBoxModal from '@/components/sections/control-dashboard/ManualPaymentMethodsFilterBoxModal';
import ManualPaymentMethodsTable from '@/components/sections/control-dashboard/ManualPaymentMethodsTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import ManualPaymentMethodsPageProvider from '@/provider/ManualPaymentMethodsPageProvider';
import React from 'react';

function page() {
  return (
    <ManualPaymentMethodsPageProvider>
      <div>
        <DashboardPageHeading title="Manual Payment Methods" />
        <ManualPaymentMethodsFilterBox />
        <div className="flex justify-end">
          <ManualPaymentMethodsFilterBoxModal />
        </div>
        <ManualPaymentMethodsTable />
      </div>
    </ManualPaymentMethodsPageProvider>
  );
}

export default page;
