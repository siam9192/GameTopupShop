'use client';
import { WalletSubmission, WalletSubmissionStatus } from '@/types/wallet-submission.type';
import { Button, Chip, Stack, Typography } from '@mui/material';
import AlertDialog from '../ui/AleartDialog';
import { cancelWalletSubmissionMutation } from '@/query/services/wallet-submission';
import { toast } from 'react-toastify';
import { useState } from 'react';
import CustomerWalletAddBalanceSubmissionDetailsDialog from '../sections/customer-dashboard/CustomerWalletAddBalanceSubmissionDetailsDialog';
import { useAppSettings } from '@/provider/AppSettingsProvider';

interface Props {
  submission: WalletSubmission;
}

const CustomerWalletSubmissionCard: React.FC<Props> = ({ submission }) => {
  const [showDetails, setShowDetails] = useState(false);
  const statusColor =
    submission.status === WalletSubmissionStatus.APPROVED
      ? 'success'
      : submission.status === WalletSubmissionStatus.DECLINED
        ? 'error'
        : 'warning';

  const { mutate } = cancelWalletSubmissionMutation();
  const handelCancel = () => {
    mutate(submission._id, {
      onSuccess: data => {
        toast.success(data.message);
      },
      onError: data => {
        toast.error(data.message);
      },
    });
  };

  const { currency } = useAppSettings();

  return (
    <div className="p-2">
      <Stack direction="row" spacing={2} alignItems="center">
        <Chip
          label={submission.status}
          color={statusColor as any}
          sx={{ ml: 'auto', fontWeight: 'bold' }}
        />
      </Stack>

      <Typography variant="body1" color="text.primary" mt={2}>
        Amount: {currency.symbol}
        {submission.amount}
      </Typography>
      {submission.note && (
        <Typography variant="body2" color="text.secondary">
          Note: {submission.note}
        </Typography>
      )}
      {submission.declineReason && (
        <Typography variant="body2" color="error">
          Decline Reason: {submission.declineReason}
        </Typography>
      )}
      <Typography variant="caption" color="text.secondary" display="block" mt={1}>
        Submitted on: {new Date(submission.createdAt).toLocaleString()}
      </Typography>
      <Stack
        marginTop={1}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'end'}
        gap={1}
        width={'100%'}
      >
        <Stack direction={'row'} justifyContent={'end'} spacing={2}>
          {submission.status === WalletSubmissionStatus.PENDING ? (
            <AlertDialog
              title="Are you sure?"
              description="This action will cancel your current submission. Once cancelled, it cannot be undone."
              onAgree={handelCancel}
            >
              <Button variant="outlined" className="w-fit" color="warning">
                Cancel
              </Button>
            </AlertDialog>
          ) : null}

          <Button
            onClick={() => setShowDetails(true)}
            variant="outlined"
            className="w-fit "
            color="secondary"
          >
            Details
          </Button>
        </Stack>
      </Stack>
      {showDetails ? (
        <CustomerWalletAddBalanceSubmissionDetailsDialog
          id={submission._id}
          onClose={() => setShowDetails(false)}
        />
      ) : null}
    </div>
  );
};

export default CustomerWalletSubmissionCard;
