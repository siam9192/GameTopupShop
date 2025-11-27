'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { logout } from '@/api-services/auth';
import { useCurrentUser } from '@/provider/CurrentUserProvider';

interface LogoutDialogProps {
  title?: string;
  description?: string;
  onLogout?: () => void;
  onClose?: () => void;
}

export default function LogoutDialog({
  title = 'Logout Confirmation',
  description = 'Are you sure you want to log out of your account?',
  onLogout,
  onClose,
}: LogoutDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);
  const { clearUser } = useCurrentUser();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onClose && onClose();
  };

  React.useEffect(() => {
    handleOpen();
  }, []);

  const handleLogout = async () => {
    setIsPending(true);
    try {
      await logout();
      onLogout && onLogout();
      clearUser();
      handleClose();
      setOpen(false);
    } catch (error) {
      setIsPending(false);
    }
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">{title}</DialogTitle>

        <DialogContent>
          <DialogContentText id="logout-dialog-description">{description}</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>

          <Button
            onClick={handleLogout}
            disabled={isPending}
            color="error"
            variant="contained"
            autoFocus
          >
            {isPending ? 'Just a moment...' : 'Logout'}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
