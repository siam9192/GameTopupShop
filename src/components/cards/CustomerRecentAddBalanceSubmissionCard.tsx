import React, { useState } from 'react';
import { Button, Stack, Typography, Divider, Paper } from '@mui/material';
import { WalletSubmission } from '@/types/wallet-submission.type';
import { getTimeAgo } from '@/utils/helper';
import CustomerWalletAddBalanceSubmissionDetailsDialog from '../sections/customer-dashboard/CustomerWalletAddBalanceSubmissionDetailsDialog';

interface Props {
  submission: WalletSubmission;
}

function CustomerRecentAddBalanceSubmissionCard({ submission }: Props) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className=" p-2 relative">
      <Stack
        direction={{
          xs: 'column',
          md: 'row',
        }}
        spacing={2}
      >
        <Stack spacing={0.5}>
          <Typography variant="h5" fontSize={20} fontWeight={500} color="secondary">
            Amount: ${submission.amount}
          </Typography>

          <Stack
            marginTop={2}
            direction={'row'}
            alignItems={'center'}
            spacing={{
              xs: 1,
              md: 2,
            }}
          >
            <Typography
              fontWeight={500}
              fontSize={{
                xs: 14,
                lg: 16,
              }}
              color="text.secondary"
            >
              Method: {submission.methodName}
            </Typography>

            <Typography
              fontSize={{
                xs: 14,
                lg: 16,
              }}
              fontWeight={500}
              color="text.secondary"
            >
              Status:
              <Typography
                fontSize={'inherit'}
                component={'span'}
                display={'inline'}
                fontWeight={500}
                color="success"
              >
                {' '}
                {submission.status}
              </Typography>
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack marginTop={1} direction={'row'} alignItems={'center'} justifyContent={'end'} gap={1}>
        <Button
          onClick={() => setShowDetails(true)}
          variant="outlined"
          className="w-fit "
          color="info"
        >
          Details
        </Button>
      </Stack>

      <p className="text-primary font-medium absolute right-1 top-0 ">
        {getTimeAgo(submission.createdAt)}
      </p>
      {showDetails ? (
        <CustomerWalletAddBalanceSubmissionDetailsDialog
          id={submission._id}
          onClose={() => setShowDetails(false)}
        />
      ) : null}
    </div>
  );
}

export default CustomerRecentAddBalanceSubmissionCard;
