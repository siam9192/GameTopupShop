import PopularOfferCard from '@/components/cards/PopularOfferCard';
import DashboardSectionHeading from '@/components/ui/DashboardSectionHeading';
import { OfferStatus, PopularOffer } from '@/types/offer.type';
import { Badge, Stack } from '@mui/material';
import React from 'react';
import { TbRecharging } from 'react-icons/tb';
export const offers: PopularOffer[] = [
  {
    _id: '1',
    rank: 1,
    name: 'Netflix Gift Card',
    coverPhoto:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiAQjUrfAF_r_j9N_XpMtjiRU02en3U_ea-w&s',
    platformName: 'Netflix',
    revenue: 186000,
    ordersSuccess: 1740,
    ordersCount: 1800,
    status: OfferStatus.RUNNING,
  },
  {
    _id: '2',
    rank: 2,
    name: 'Spotify Premium Subscription',
    coverPhoto:
      'https://ariksoft.com.bd/wp-content/uploads/2020/05/Spotify-Premium-Account.png.webp',
    platformName: 'Spotify',
    revenue: 162000,
    ordersSuccess: 1550,
    ordersCount: 1600,
    status: OfferStatus.RUNNING,
  },
  {
    _id: '3',
    rank: 3,
    name: 'Amazon Gift Voucher',
    coverPhoto:
      'https://5.imimg.com/data5/SELLER/Default/2023/10/357079646/FU/IS/UD/74172299/amazon-gift-voucher.jpeg',
    platformName: 'Amazon',
    revenue: 142000,
    ordersSuccess: 1370,
    ordersCount: 1420,
    status: OfferStatus.RUNNING,
  },
  {
    _id: '4',
    rank: 4,
    name: 'Google Play Credit',
    coverPhoto:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs-RgOnhZSTDHuZuEqCK55mFPGUl_zfbd3gA&s',
    platformName: 'Google Play',
    revenue: 126000,
    ordersSuccess: 1190,
    ordersCount: 1250,
    status: OfferStatus.RUNNING,
  },
  {
    _id: '5',
    rank: 5,
    name: 'Apple Gift Card',
    coverPhoto: 'https://netflixmartbd.net/wp-content/uploads/2024/07/apple-gift-card.jpg',
    platformName: 'Apple',
    revenue: 118000,
    ordersSuccess: 1110,
    ordersCount: 1160,
    status: OfferStatus.RUNNING,
  },
  {
    _id: '6',
    rank: 6,
    name: 'Disney+ Hotstar Subscription',
    coverPhoto:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfnxa1ue3i_MAD8hfxaia528-HaIFrxt1FCg&s',
    platformName: 'Disney+ Hotstar',
    revenue: 96000,
    ordersSuccess: 910,
    ordersCount: 940,
    status: OfferStatus.RUNNING,
  },
  {
    _id: '7',
    rank: 7,
    name: 'YouTube Premium Voucher',
    coverPhoto:
      'https://zamve.com/wp-content/uploads/2023/08/Youtube-Premium-Subscription-from-Zmave-Online-Subscription-Shop-BD-by-zamve.com_.jpg',
    platformName: 'YouTube',
    revenue: 89000,
    ordersSuccess: 860,
    ordersCount: 900,
    status: OfferStatus.RUNNING,
  },
  {
    _id: '8',
    rank: 8,
    name: 'PlayStation Store Card',
    coverPhoto: 'https://gamebuybd.com/wp-content/uploads/2022/07/PlayStation-Store-Gift-Card.jpg',
    platformName: 'PlayStation',
    revenue: 82000,
    ordersSuccess: 780,
    ordersCount: 810,
    status: OfferStatus.RUNNING,
  },
  {
    _id: '9',
    rank: 9,
    name: 'Xbox Game Pass Ultimate',
    coverPhoto: 'https://gamebuybd.com/wp-content/uploads/2024/07/XBOX-Game-Pass.png',
    platformName: 'Xbox',
    revenue: 76000,
    ordersSuccess: 740,
    ordersCount: 770,
    status: OfferStatus.RUNNING,
  },
  {
    _id: '10',
    rank: 10,
    name: 'Steam Wallet Code',
    coverPhoto: 'https://cdn.bynogame.com/games/steam-wallet-code-20-eur-1671790698044.webp',
    platformName: 'Steam',
    revenue: 69000,
    ordersSuccess: 660,
    ordersCount: 700,
    status: OfferStatus.RUNNING,
  },
];
function PopularOffers() {
  return (
    <Stack className="glass  p-3 md:p-5 h-full  ">
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <DashboardSectionHeading title="Popular Top Offers (Demo)" />
        <Badge color="secondary" badgeContent={10} variant="standard">
          <TbRecharging className="text-txt-primary" size={28} />
        </Badge>
      </Stack>

      <Stack marginTop={2} spacing={2}>
        {offers.map((_, index) => (
          <PopularOfferCard offer={_} key={index} />
        ))}
      </Stack>
    </Stack>
  );
}

export default PopularOffers;
