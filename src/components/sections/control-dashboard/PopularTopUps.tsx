import PopularTopUpCard from '@/components/cards/PopularTopUpCard';
import DashboardSectionHeading from '@/components/ui/DashboardSectionHeading';
import { PopularTopup, TopupStatus } from '@/types/topup.type';
import { Badge, Stack } from '@mui/material';
import React from 'react';
import { TbRecharging } from 'react-icons/tb';


export const topups: PopularTopup[] = [
  {
    _id: '1',
    rank: 1,
    name: 'Mobile Legends Diamond Top-up',
    coverPhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJelHHZgwjYfpyplNvt06m7MbXANgqPQVKfQ&s',
    platformName: 'Mobile Legends',
    revenue: 154000,
    ordersSuccess: 1450,
    ordersCount: 1500,
    status: TopupStatus.ACTIVE,
  },
  {
    _id: '2',
    rank: 2,
    name: 'PUBG Mobile UC Recharge',
    coverPhoto: 'https://i.namu.wiki/i/QN3f9O-XMyCmUUHzphCAYOtOhNFOlbWleXP_d14o64fNZPRZ0UbNDqMKueyGWK1ug5ZNvdvNqtUkBZGlhW0qpg.jpg',
    platformName: 'PUBG Mobile',
    revenue: 132000,
    ordersSuccess: 1210,
    ordersCount: 1270,
    status: TopupStatus.ACTIVE,
  },
  {
    _id: '3',
    rank: 3,
    name: 'Free Fire Diamond Top-up',
    coverPhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4-XO5aKaJxlq5_olJ0IsbgEH-Tv1SZh7IVQ&s',
    platformName: 'Free Fire',
    revenue: 98000,
    ordersSuccess: 910,
    ordersCount: 940,
    status: TopupStatus.ACTIVE,
  },
  {
    _id: '4',
    rank: 4,
    name: 'Call of Duty CP Top-up',
    coverPhoto: 'https://play-lh.googleusercontent.com/0DENLOaGXbadNpuWBLJf4lEhJCJmQV5Na1k5L311-sDPSncoW6_kDLsG_Vc4N0_AM_IGEf3cKTHGHKAyBYAe',
    platformName: 'Call of Duty: Mobile',
    revenue: 87000,
    ordersSuccess: 830,
    ordersCount: 860,
    status: TopupStatus.ACTIVE,
  },
  {
    _id: '5',
    rank: 5,
    name: 'Valorant Points Top-up',
    coverPhoto: 'https://store-images.s-microsoft.com/image/apps.47078.14502996617718058.a3a8ad4d-5b60-4158-bc37-a8faab485416.58c529e3-6ac2-4fa7-a93a-c997a4522997',
    platformName: 'Valorant',
    revenue: 76000,
    ordersSuccess: 740,
    ordersCount: 780,
    status: TopupStatus.ACTIVE,
  },
  {
    _id: '6',
    rank: 6,
    name: 'Genshin Impact Genesis Crystals',
    coverPhoto: 'https://play-lh.googleusercontent.com/-gSYfE68AvxlSAiKzXThyDw1-iUlwBJGsJBAXllBA8i_NM7kvft32U2DYSmQFglaOaw',
    platformName: 'Genshin Impact',
    revenue: 68000,
    ordersSuccess: 650,
    ordersCount: 690,
    status: TopupStatus.ACTIVE,
  },
  {
    _id: '7',
    rank: 7,
    name: 'League of Legends Wild Rift Coins',
    coverPhoto: 'https://play-lh.googleusercontent.com/4b8E4y0776rFq9cUJTLjUnZAjRa2nd9kjGD_HH4sOYbKaEMsMPh3YCXVQ1871dBDtxIi',
    platformName: 'LoL: Wild Rift',
    revenue: 59000,
    ordersSuccess: 560,
    ordersCount: 600,
    status: TopupStatus.ACTIVE,
  },
  {
    _id: '8',
    rank: 8,
    name: 'Clash of Clans Gems',
    coverPhoto: 'https://play-lh.googleusercontent.com/sFmWfYbYp_2ea7VRMTnwd3gjIBrPGXHj_d_ab1_k1q1p2OMk4riGMF1vqxdhONOtTYOt_BVpk7a4AYcKU68LNGQ=w240-h480-rw',
    platformName: 'Clash of Clans',
    revenue: 52000,
    ordersSuccess: 490,
    ordersCount: 520,
    status: TopupStatus.ACTIVE,
  },
  {
    _id: '9',
    rank: 9,
    name: 'Apex Legends Mobile Syndicate Gold',
    coverPhoto: 'https://cdn.mobygames.com/covers/10562813-apex-legends-mobile-iphone-front-cover.jpg',
    platformName: 'Apex Legends Mobile',
    revenue: 46000,
    ordersSuccess: 440,
    ordersCount: 470,
    status: TopupStatus.ACTIVE,
  },
  {
    _id: '10',
    rank: 10,
    name: 'Fortnite V-Bucks Recharge',
    coverPhoto: 'https://images.dwncdn.net/images/t_app-icon-l/p/0f1cd020-5f3b-11e8-a529-0242ac120009/2505927033/2095_4-78528489-logo',
    platformName: 'Fortnite',
    revenue: 41000,
    ordersSuccess: 390,
    ordersCount: 420,
    status: TopupStatus.ACTIVE,
  },
];
function PopularTopUps() {
  return (
    <Stack className="glass p-3 md:p-5 h-full  ">
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <DashboardSectionHeading title="Popular Top ups (Demo)" />
        <Badge color="secondary" badgeContent={10} variant="standard">
          <TbRecharging className="text-txt-primary" size={28} />
        </Badge>
      </Stack>
      <Stack marginTop={2} spacing={2}>
        {topups.map((_, index) => (
          <PopularTopUpCard topup={_} key={index} />
        ))}
      </Stack>
    </Stack>
  );
}

export default PopularTopUps;
