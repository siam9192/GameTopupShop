import { HiMiniUserGroup, HiOutlineWallet } from 'react-icons/hi2';
import { PiCurrencyDollarSimpleBold } from 'react-icons/pi';
import { TbRecharging } from 'react-icons/tb';
import { getSuperAdminDashboardMetadataQuery } from '@/query/services/metadata';
import DashboardOverviewData from '@/components/ui/DashboardOverviewData';

export default function SuperAdminDashboardAllOverviewData() {
  const { data, isLoading } = getSuperAdminDashboardMetadataQuery();

  const mapping = [
    { key: 'products', label: 'Total Products', icon: HiOutlineWallet },
    { key: 'orders', label: 'Total Orders', icon: TbRecharging },
    { key: 'revenue', label: 'Total Revenue', icon: PiCurrencyDollarSimpleBold, isCurrency: true },
    { key: 'users', label: 'Total Users', icon: HiMiniUserGroup },
  ];

  return <DashboardOverviewData data={data?.data} isLoading={isLoading} mapping={mapping} />;
}
