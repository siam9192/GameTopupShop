'use client';
import React, { MouseEvent, useState } from 'react';
import {
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
import { MdOutlineEdit } from 'react-icons/md';
import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io';
import { useTopupPageContext } from '@/app/control-dashboard/products/top-ups/page';
import { SortOrder } from '@/types/utils.type';
import { useRouter } from 'next/navigation';
import { TopupStatus } from '@/types/topup.type';
import { SlOptionsVertical } from 'react-icons/sl';
import { deleteTopupMutation, updateTopupStatusMutation } from '@/query/services/topup';
import { queryClient } from '@/provider/Provider';
import { toast } from 'react-toastify';

const heads = [
  {
    name: 'Name',
    fieldName: 'name',
    sortable: true,
  },
  {
    name: 'Packages',
    sortable: false,
  },
  {
    name: 'Orders',
    fieldName: 'ordersCount',
    sortable: true,
  },
  {
    name: "Start's From",
    fieldName: 'startForm',
    sortable: true,
  },
  {
    name: 'Status',
    sortable: false,
  },

  {
    name: 'Created At',
    fieldName: 'createdAt',
    sortable: true,
  },

  {
    name: 'Updated At',
    fieldName: 'updatedAt',
    sortable: true,
  },
  {
    name: 'Actions',
    sortable: false,
  },
];

function TopUpsTable() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuId, setMenuId] = useState<string | null>(null);
  const { queryResult, setPage, sort, setSort } = useTopupPageContext();
  const { data, isLoading, error } = queryResult;
  const topups = data?.data;

  const meta = data?.meta;
  const totalPages = meta ? Math.ceil(meta.totalResults / meta.limit) : 0;

  const router = useRouter();
  const navigate = (path: string) => {
    router.push(path);
  };

  const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    setAnchorEl(e.currentTarget);
    setMenuId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuId(null);
  };

  const { mutate: deleteMutate, isPending: isDeleting } = deleteTopupMutation();
  const { mutate: updateStatusMutate, isPending: isStatusUpdating } = updateTopupStatusMutation();

  async function handleUpdateStatus(id: string, status: TopupStatus) {
    updateStatusMutate(
      {
        id,
        status,
      },
      {
        onSuccess: () => {
          toast.success(
            status === TopupStatus.ACTIVE ? 'Product Activated' : 'Product Inactivated',
          );
          handleCloseMenu();
          queryClient.invalidateQueries({ queryKey: ['getTopups'] });
        },
        onError: (err: any) => {
          toast.error(err.message);
          handleCloseMenu();
        },
      },
    );
  }
  const handelDeleteTopup = (id: string) => {
    deleteMutate(id, {
      onSuccess: data => {
        queryClient.invalidateQueries({ queryKey: ['getTopups'] });
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
    <div className="mt-10 p-3 lg:p-5 glass overflow-x-auto dark:bg-paper">
      <Typography
        component="h1"
        variant="h5"
        fontFamily="jost"
        fontWeight={600}
        color="text.primary"
        mb={1}
      >
        Top ups
      </Typography>

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
                {topups?.map(topup => (
                  <TableRow key={topup._id}>
                    <TableCell style={{ minWidth: '300px' }}>
                      <p className="text-primary text-sm">#{topup._id}</p>
                      <Stack direction={'row'} alignItems={'center'} gap={1}>
                        <img
                          src={topup.coverPhoto}
                          alt={'image'}
                          className=" size-14 md:size-16 rounded-lg bg-cover"
                        />

                        <Typography>{topup.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{topup.packages.length}</TableCell>

                    <TableCell>{topup.ordersCount}</TableCell>
                    <TableCell>${topup.startFrom}</TableCell>
                    <TableCell>{topup.status}</TableCell>
                    <TableCell>{new Date(topup.createdAt).toDateString()}</TableCell>
                    <TableCell>{new Date(topup.updatedAt).toDateString()}</TableCell>

                    <TableCell>
                      <Tooltip title="View Full Details">
                        <button
                          onClick={() => navigate(`top-ups/${topup._id}`)}
                          className="text-2xl hover:text-primary mr-2 hover:cursor-pointer"
                        >
                          <HiOutlineViewfinderCircle />
                        </button>
                      </Tooltip>
                      <Tooltip title="Make changes">
                        <button
                          onClick={() => router.push(`top-ups/edit/${topup._id}`)}
                          className="text-2xl hover:text-primary mr-2 hover:cursor-pointer"
                        >
                          <MdOutlineEdit />
                        </button>
                      </Tooltip>
                      <Tooltip title="Menu">
                        <button
                          onClick={e => handleOpenMenu(e, topup._id)}
                          className="text-xl hover:text-secondary mr-2 hover:cursor-pointer"
                        >
                          <SlOptionsVertical />
                        </button>
                      </Tooltip>
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
                  const topup = topups?.find(c => c._id === menuId);
                  if (!topup) return null;

                  return [
                    topup.status === TopupStatus.ACTIVE ? (
                      <MenuItem
                        key="active"
                        disabled={isPending}
                        onClick={() => handleUpdateStatus(menuId, TopupStatus.INACTIVE)}
                      >
                        Inactive
                      </MenuItem>
                    ) : (
                      <MenuItem
                        key="inactive"
                        disabled={isPending}
                        onClick={() => handleUpdateStatus(menuId, TopupStatus.ACTIVE)}
                      >
                        Active
                      </MenuItem>
                    ),

                    <MenuItem
                      key="delete"
                      disabled={isPending}
                      onClick={() => handelDeleteTopup(menuId)}
                    >
                      Delete
                    </MenuItem>,
                  ];
                })()}
            </Menu>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default TopUpsTable;
