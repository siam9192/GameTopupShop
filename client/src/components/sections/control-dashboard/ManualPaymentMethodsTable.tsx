'use client';
import React, { MouseEvent, useState } from 'react';
import {
  Avatar,
  CircularProgress,
  Menu,
  MenuItem,
  Pagination,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { HiOutlineViewfinderCircle } from 'react-icons/hi2';
import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io';
import DashboardSectionHeading from '@/components/ui/DashboardSectionHeading';
import { useRouter } from 'next/navigation';
import { SortOrder } from '@/types/utils.type';
import WalletAddBalanceSubmissionDetailsDialog from './WalletAddBalanceSubmissionDetailsDialog';
import { SlOptionsVertical } from 'react-icons/sl';
import { ManualPaymentMethodStatus } from '@/types/manual-payment-method.type';
import {
  deleteManualPaymentMethodMutation,
  updateManualPaymentMethodMutation,
  updateManualPaymentMethodStatusMutation,
} from '@/query/services/manual-payment-method';
import { toast } from 'react-toastify';
import { queryClient } from '@/provider/Provider';
import { useManualPaymentMethodsPageContext } from '@/provider/ManualPaymentMethodsPageProvider';

const heads = [
  {
    name: 'ID',
    fieldName: '_id',
    sortable: true,
  },

  {
    name: 'Name',
    sortable: false,
  },

  {
    name: 'Status',
    sortable: false,
  },
  {
    name: 'Created At',
    sortable: true,
  },
  {
    name: 'Updated At',
    sortable: true,
  },
  {
    name: 'Actions',
    sortable: false,
  },
];
function ManualPaymentMethodsTable() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [detailsId, setDetailsId] = useState<string | null>(null);
  const { queryResult, setPage, sort, setSort } = useManualPaymentMethodsPageContext();
  const { data, isLoading } = queryResult;
  const methods = data?.data;

  const meta = data?.meta;
  const totalPages = meta ? Math.ceil(meta.totalResults / meta.limit) : 0;

  const router = useRouter();

  const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    setAnchorEl(e.currentTarget);
    setMenuId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuId(null);
  };

  const { mutate: deleteMutate, isPending: isDeleting } = deleteManualPaymentMethodMutation();
  const { mutate: updateStatusMutate, isPending: isStatusUpdating } =
    updateManualPaymentMethodStatusMutation();

  async function handleUpdateStatus(id: string, status: ManualPaymentMethodStatus) {
    updateStatusMutate(
      {
        id,
        status,
      },
      {
        onSuccess: data => {
          toast.success(data.message);
          handleCloseMenu();
          queryClient.invalidateQueries({ queryKey: ['getManualPaymentMethods'] });
        },
        onError: (err: any) => {
          toast.error(err.message);
          handleCloseMenu();
        },
      },
    );
  }
  const handelDelete = (id: string) => {
    deleteMutate(id, {
      onSuccess: data => {
        queryClient.invalidateQueries({ queryKey: ['getManualPaymentMethods'] });
        toast.success(data.message);
        handleCloseMenu();
      },
      onError: error => {
        toast.error(error.message);
      },
    });
  };

  const isPending = isDeleting || isStatusUpdating;

  return (
    <div className="mt-10 p-2 lg:p-5 glass overflow-x-auto ">
      <DashboardSectionHeading title="Manual Payment Methods" />
      {isLoading ? (
        <div className="h-[300px] flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className=" overflow-x-auto">
          <TableContainer sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
            <Table>
              <TableHead>
                <TableRow>
                  {heads.map(head => (
                    <TableCell key={head.name}>
                      {head.fieldName && head.sortable ? (
                        <Stack direction="row" gap={0.5} alignItems="center">
                          <span>{head.name.toUpperCase()}</span>
                          <button
                            onClick={() =>
                              setSort(p => ({
                                by: head.fieldName,
                                order:
                                  p.by === head.fieldName && p.order === SortOrder.ASC
                                    ? SortOrder.DESC
                                    : SortOrder.ASC,
                              }))
                            }
                            className={`text-xl ${
                              sort?.by === head.fieldName ? 'text-primary' : 'text-txt-primary'
                            }`}
                          >
                            {sort?.by === head.fieldName && sort?.order === 'asc' ? (
                              <IoMdArrowUp />
                            ) : (
                              <IoMdArrowDown />
                            )}
                          </button>
                        </Stack>
                      ) : (
                        head.name.toUpperCase()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {methods?.map(method => (
                  <TableRow key={method._id}>
                    <TableCell>#{method._id}</TableCell>
                    <TableCell style={{ minWidth: '250px' }}>
                      <Stack direction={'row'} alignItems={'center'} spacing={2}>
                        <Avatar alt={'Img'} src={method.logo} />
                        <Typography>{method.name}</Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>{method.status}</TableCell>
                    <TableCell>{new Date(method.createdAt).toDateString()}</TableCell>
                    <TableCell>{new Date(method.updatedAt).toDateString()}</TableCell>
                    <TableCell>
                      <Stack direction={'row'} gap={1} alignItems={'center'}>
                        <Tooltip title="View Full Details">
                          <button
                            onClick={() =>
                              router.push(`/control-dashboard/payment-methods/manual/${method._id}`)
                            }
                            className="text-2xl hover:text-primary mr-2 hover:cursor-pointer"
                          >
                            <HiOutlineViewfinderCircle />
                          </button>
                        </Tooltip>
                        <Tooltip title="Menu">
                          <button
                            onClick={e => handleOpenMenu(e, method._id)}
                            className="text-xl hover:text-secondary mr-2 hover:cursor-pointer"
                          >
                            <SlOptionsVertical />
                          </button>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {meta?.totalResults === 0 && (
              <Typography variant="h5" color="text.primary" align="center">
                No results
              </Typography>
            )}

            <Pagination
              style={{ marginTop: '15px' }}
              count={totalPages}
              onChange={(e, value) => setPage(value)}
              size="large"
              color="primary"
              variant="outlined"
              shape="rounded"
            />
            {/* Shared Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && Boolean(menuId)}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              {menuId &&
                (() => {
                  const method = methods?.find(c => c._id === menuId);
                  if (!method) return null;

                  return [
                    method.status === ManualPaymentMethodStatus.ACTIVE ? (
                      <MenuItem
                        key="active"
                        disabled={isPending}
                        onClick={() =>
                          handleUpdateStatus(method._id, ManualPaymentMethodStatus.INACTIVE)
                        }
                      >
                        Activate
                      </MenuItem>
                    ) : (
                      <MenuItem
                        key="inactive"
                        disabled={isPending}
                        onClick={() =>
                          handleUpdateStatus(method._id, ManualPaymentMethodStatus.ACTIVE)
                        }
                      >
                        Inactivate
                      </MenuItem>
                    ),

                    <MenuItem
                      key="delete"
                      disabled={isPending}
                      onClick={() => handelDelete(method._id)}
                    >
                      Delete
                    </MenuItem>,
                    <MenuItem
                      key="edit"
                      disabled={isPending}
                      onClick={() => router.push(`manual/edit/${method._id}`)}
                    >
                      Edit
                    </MenuItem>,
                  ];
                })()}
            </Menu>
            {detailsId ? (
              <WalletAddBalanceSubmissionDetailsDialog
                id={detailsId}
                onClose={() => setDetailsId(null)}
              />
            ) : null}
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default ManualPaymentMethodsTable;
