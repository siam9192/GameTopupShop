import { useAppSettings } from '@/provider/AppSettingsProvider';
import { Topup } from '@/types/topup.type';
import { Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';

interface Props {
  topup: Topup;
}
function TopupCard({ topup }: Props) {
  const { currency } = useAppSettings();
  return (
    <div className="p-3  duration-75 hover:cursor-pointer dark:bg-black bg-white rounded-lg shadow_1 h-full">
      <div>
        <img src={topup.coverPhoto} alt="" className=" rounded-lg" />
      </div>
      <div className="mt-3">
        <p className=" text-lg md:text-xl font-medium text-center text-txt-primary">{topup.name}</p>
        <p className="text-primary font-medium text-center">
          Start's From {currency.symbol}
          {topup.startFrom}
        </p>
        <div className="text-center mt-3">
          <Link href={`/top-ups/${topup._id}`}>
            <Button variant="outlined" color="secondary">
              Topup Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopupCard;
