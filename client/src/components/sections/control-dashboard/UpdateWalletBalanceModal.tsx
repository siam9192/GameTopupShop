import DashboardSectionHeading from '@/components/ui/DashboardSectionHeading';
import { queryClient } from '@/provider/Provider';
import { updateWalletBalanceMutation } from '@/query/services/wallet';
import { Wallet } from '@/types/wallet.type';
import { Box, Button, Modal, Stack, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { TbEdit } from 'react-icons/tb';
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
  wallet: Wallet;
}

function UpdateWalletBalanceModal({ wallet }: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [balance, setBalance] = useState(wallet.balance);
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate: updateBalanceMutate, isPending } = updateWalletBalanceMutation();

  async function handleUpdateBalance() {
    setErrorMessage('');
    updateBalanceMutate(
      {
        id: wallet._id,
        balance,
      },
      {
        onSuccess: data => {
          toast.success(data.message);
          queryClient.invalidateQueries({ queryKey: ['getWallets'] });
          handleClose();
        },
        onError: (err: any) => {
          setErrorMessage(err.message);
        },
      },
    );
  }

  const disabled = isPending || wallet.balance === balance;
  return (
    <React.Fragment>
      <Tooltip title="Edit Balance">
        <button
          onClick={handleOpen}
          className="text-2xl hover:text-secondary mr-2 hover:cursor-pointer"
        >
          <TbEdit />
        </button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DashboardSectionHeading title="Update Wallet Balance" />
          <Box marginTop={2}>
            <Box>
              <Stack mt={3} mb={2} spacing={1.5} alignItems="center">
                <Typography fontSize={15} color="text.secondary" fontWeight={500}>
                  Wallet ID:{' '}
                  <Typography component="span" fontWeight={600} color="text.primary">
                    {wallet?._id}
                  </Typography>
                </Typography>

                <Typography fontSize={15} color="text.secondary" fontWeight={500}>
                  Current Balance:{' '}
                  <Typography component="span" fontWeight={600} color="success.main">
                    {wallet?.balance?.toLocaleString() || 0} BDT
                  </Typography>
                </Typography>
              </Stack>
            </Box>

            {/* Form */}

            <Box marginTop={2} display={'flex'} flexDirection={'column'} gap={2}>
              <Box>
                <TextField
                  label="Balance"
                  name="balance"
                  defaultValue={wallet.balance}
                  type="number"
                  fullWidth
                  onChange={e => {
                    const val = parseInt(e.target.value);
                    if (!Number.isNaN(val) && val > -1) {
                      setBalance(val); // ✅ fixed typo (was setMaxBalance)
                    }
                  }}
                />
              </Box>
              <Button
                onClick={handleUpdateBalance}
                disabled={disabled}
                size="large"
                variant="outlined"
              >
                Update
              </Button>
            </Box>

            {errorMessage ? <p className="text-red-600 mt-2">{errorMessage}</p> : null}
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default UpdateWalletBalanceModal;
