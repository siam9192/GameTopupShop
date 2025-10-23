import { WalletHistory, WalletHistoryType } from '@/types/wallet-history.type';
import { Stack, Typography } from '@mui/material';
import React from 'react';
import { PiArrowDownBold, PiArrowUpBold } from 'react-icons/pi';
interface Props {
  history: WalletHistory;
}
function WalletHistoryCard({ history }: Props) {
  const isCredit = history.type === WalletHistoryType.CREDIT;
  return (
    <div className="relative  p-3 md:p-4  transition-all duration-300">
      <Stack spacing={1}>
        {/* Header: Transaction Type + Amount */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            {isCredit ? (
              <PiArrowDownBold className="text-green-600 text-xl" />
            ) : (
              <PiArrowUpBold className="text-red-500 text-xl" />
            )}
            <Typography
              fontWeight={600}
              fontSize={18}
              color={isCredit ? 'success.main' : 'error.main'}
            >
              {isCredit ? 'Credit' : 'Debit'}
            </Typography>
          </Stack>

          <Typography
            fontSize={{ xs: 20, md: 24 }}
            fontWeight={600}
            color={isCredit ? 'success.main' : 'error.main'}
          >
            {isCredit ? '+' : '-'}${history.amount.toFixed(2)}
          </Typography>
        </Stack>

        {/* Balance Info */}
        <Typography fontSize={14} color="text.secondary">
          Previous Balance: ${history.prevBalance.toFixed(2)}
        </Typography>

        {/* Date & Time */}
        <Typography fontSize={14} color="text.secondary">
          {new Date(history.createdAt).toLocaleDateString()} &bull;{' '}
          {new Date(history.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>
      </Stack>
    </div>
  );
}

export default WalletHistoryCard;
