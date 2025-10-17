import DashboardSectionHeading from '@/components/ui/DashboardSectionHeading';
import { queryClient } from '@/provider/Provider';
import { declineWalletSubmissionMutation } from '@/query/services/wallet-submission';
import { WalletSubmission, WalletSubmissionStatus } from '@/types/wallet-submission.type';
import { Box, Button, Modal, Stack, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '80%',
    lg: '50%',
  },
  maxWidth: '800px',
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: '10px',
};

interface Props {
  submission: WalletSubmission;
}

function WalletAddBalanceSubmissionDeclineModal({ submission }: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [declineReason, setDeclineReason] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const { mutate, isPending } = declineWalletSubmissionMutation();

  async function handleDecline() {
    setErrorMessage('');
    mutate(
      {
        id: submission._id,
        payload: {
          declineReason,
        },
      },
      {
        onSuccess: data => {
          toast.success(data.message);
          queryClient.invalidateQueries({ queryKey: ['getWalletSubmissions'] });
          handleClose();
        },
        onError: (err: any) => {
          setErrorMessage(err.message);
        },
      },
    );
  }

  const disabled =
    submission.status !== WalletSubmissionStatus.PENDING ||
    isPending ||
    declineReason.trim().length === 0;
  return (
    <React.Fragment>
      <Tooltip title="Decline">
        <button
          onClick={handleOpen}
          className="text-2xl hover:text-secondary mr-2 hover:cursor-pointer"
        >
          <RxCross2 />
        </button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DashboardSectionHeading title="Decline Form" />
          <Box marginTop={2}>
            {/* SUBMISSION DETAILS */}
            {submission && (
              <Box>
                <Stack spacing={1.2}>
                  <Typography fontSize={15} color="text.secondary">
                    Submission ID:{' '}
                    <Typography component="span" fontWeight={600}>
                      {submission._id}
                    </Typography>
                  </Typography>
                  <Typography fontSize={15} color="text.secondary">
                    Amount:{' '}
                    <Typography component="span" color="success.main" fontWeight={600}>
                      {submission.amount.toLocaleString()} BDT
                    </Typography>
                  </Typography>
                  <Typography fontSize={15} color="text.secondary">
                    Method:{' '}
                    <Typography component="span" fontWeight={600}>
                      {submission.methodName}
                    </Typography>
                  </Typography>
                </Stack>
              </Box>
            )}

            {/* Form */}

            <Box marginTop={2} display={'flex'} flexDirection={'column'} gap={2}>
              <Box>
                <textarea
                  className="w-full h-60 border-secondary border-2 resize-none  p-2 rounded-lg text-txt-secondary"
                  placeholder="Decline reason here"
                  onChange={e => {
                    setDeclineReason(e.target.value);
                  }}
                />
              </Box>
              <Button onClick={handleDecline} disabled={disabled} size="large" variant="contained">
                Decline
              </Button>
            </Box>

            {errorMessage ? <p className="text-red-600 mt-2">{errorMessage}</p> : null}
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default WalletAddBalanceSubmissionDeclineModal;
