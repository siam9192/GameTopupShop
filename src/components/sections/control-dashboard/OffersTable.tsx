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
import { SortOrder } from '@/types/utils.type';
import { useRouter } from 'next/navigation';
import { SlOptionsVertical } from 'react-icons/sl';
import { queryClient } from '@/provider/Provider';
import { toast } from 'react-toastify';
import { useOffersPageContext } from '@/app/control-dashboard/products/offers/page';
import { OfferStatus } from '@/types/offer.type';
import { deleteOfferMutation, updateOfferStatusMutation } from '@/query/services/offer';

const heads = [
  {
    name: 'Name',
    fieldName: 'name',
    sortable: true,
  },

  {
    name: 'Orders',
    fieldName: 'ordersCount',
    sortable: true,
  },
  {
    name: 'Price',
    fieldName: 'price',
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

function OrdersTable() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuId, setMenuId] = useState<string | null>(null);
  const { queryResult, setPage, sort, setSort } = useOffersPageContext();
  const { data, isLoading } = queryResult;
  const offers = data?.data;

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

  const { mutate: deleteMutate, isPending: isDeleting } = deleteOfferMutation();
  const { mutate: updateStatusMutate, isPending: isStatusUpdating } = updateOfferStatusMutation();

  async function handleUpdateStatus(id: string, status: OfferStatus) {
    updateStatusMutate(
      {
        id,
        status,
      },
      {
        onSuccess: () => {
          toast.success(status === OfferStatus.RUNNING ? 'Offer is running' : 'Offer is paused');
          handleCloseMenu();
          queryClient.invalidateQueries({ queryKey: ['getOffers'] });
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
        queryClient.invalidateQueries({ queryKey: ['getOffers'] });
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
        Offers Table
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
                {offers?.map(offer => (
                  <TableRow key={offer._id}>
                    <TableCell style={{ minWidth: '300px' }}>
                      <p className="text-primary text-sm">#{offer._id}</p>
                      <Stack direction={'row'} alignItems={'center'} gap={1}>
                        <img
                          src={offer.coverPhoto}
                          alt={'image'}
                          className=" w-14 h-16 rounded-lg  object-cover"
                        />

                        <Typography>{offer.name}</Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>{offer.ordersCount}</TableCell>
                    <TableCell>${offer.price}</TableCell>
                    <TableCell>{offer.status}</TableCell>
                    <TableCell>{new Date(offer.createdAt).toDateString()}</TableCell>
                    <TableCell>{new Date(offer.updatedAt).toDateString()}</TableCell>

                    <TableCell>
                      <Tooltip title="View Full Details">
                        <button
                          onClick={() => navigate(`offers/${offer._id}`)}
                          className="text-2xl hover:text-primary mr-2 hover:cursor-pointer"
                        >
                          <HiOutlineViewfinderCircle />
                        </button>
                      </Tooltip>
                      <Tooltip title="Make changes">
                        <button
                          onClick={() => router.push(`offers/edit/${offer._id}`)}
                          className="text-2xl hover:text-primary mr-2 hover:cursor-pointer"
                        >
                          <MdOutlineEdit />
                        </button>
                      </Tooltip>
                      <Tooltip title="Menu">
                        <button
                          disabled={
                            offer.status === OfferStatus.PENDING ||
                            offer.status === OfferStatus.ENDED
                          }
                          onClick={e => handleOpenMenu(e, offer._id)}
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
                  const offer = offers?.find(c => c._id === menuId);
                  if (!offer) return null;

                  return [
                    offer.status === OfferStatus.RUNNING ? (
                      <MenuItem
                        key="active"
                        disabled={isPending}
                        onClick={() => handleUpdateStatus(menuId, OfferStatus.PAUSED)}
                      >
                        Pause
                      </MenuItem>
                    ) : (
                      <MenuItem
                        key="inactive"
                        disabled={isPending}
                        onClick={() => handleUpdateStatus(menuId, OfferStatus.RUNNING)}
                      >
                        Resume
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

export default OrdersTable;
