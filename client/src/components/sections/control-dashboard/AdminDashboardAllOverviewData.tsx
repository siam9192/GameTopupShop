import { HiMiniUserGroup } from 'react-icons/hi2';
import { PiCurrencyDollarSimpleBold } from 'react-icons/pi';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { TbRecharging } from 'react-icons/tb';
import { getAdminDashboardMetadataQuery } from '@/query/services/metadata';
import DashboardOverviewData from '@/components/ui/DashboardOverviewData';

export default function AdminDashboardOverviewData() {
  const { data, isLoading } = getAdminDashboardMetadataQuery();

  const mapping = [
    { key: 'customers', label: 'Total Customers', icon: HiMiniUserGroup },
    { key: 'revenue', label: 'Total Revenue', icon: PiCurrencyDollarSimpleBold, isCurrency: true },
    { key: 'products', label: 'Total Products', icon: HiOutlineShoppingBag },
    { key: 'orders', label: 'Total Orders', icon: TbRecharging },
  ];

  return <DashboardOverviewData data={data?.data} isLoading={isLoading} mapping={mapping} />;
}
