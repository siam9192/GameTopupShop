import { HiOutlineShoppingBag } from 'react-icons/hi';
import { TbRecharging } from 'react-icons/tb';
import { PiUsersThree } from 'react-icons/pi';
import { MdOutlineDirectionsRun } from 'react-icons/md';
import { getModeratorDashboardMetadataQuery } from '@/query/services/metadata';
import DashboardOverviewData from '@/components/ui/DashboardOverviewData';

export default function ModeratorDashboardOverviewData() {
  const { data, isLoading } = getModeratorDashboardMetadataQuery();

  const mapping = [
    { key: 'products', label: 'Total Products', icon: HiOutlineShoppingBag },
    { key: 'orders', label: 'Total Orders', icon: TbRecharging },
    { key: 'runningOrders', label: 'Running Orders', icon: MdOutlineDirectionsRun },
    { key: 'newCustomers', label: 'New Customers', icon: PiUsersThree },
  ];

  return <DashboardOverviewData data={data?.data} isLoading={isLoading} mapping={mapping} />;
}
