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
import { useOrdersPageContext } from '@/app/control-dashboard/orders/page';
import { useRouter } from 'next/navigation';
import { updateOrderStatusMutation } from '@/query/services/order';
import { OrderStatus } from '@/types/order.type';
import { toast } from 'react-toastify';
import { queryClient } from '@/provider/Provider';
import { SortOrder } from '@/types/utils.type';
import OrderDetailsDialog from './OrderDetailsDialog';
import { SlOptionsVertical } from 'react-icons/sl';

const heads = [
  {
    name: 'ID',
    fieldName: '_id',
    sortable: true,
  },
  {
    name: 'Product',
    sortable: false,
  },
  {
    name: 'Category',
    sortable: false,
  },
  {
    name: 'Quantity',
    fieldName: 'product.quantity',
    sortable: true,
  },
  {
    name: 'Total',
    fieldName: 'payment.amount',
    sortable: true,
  },
  {
    name: 'Payment Status',
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
    name: 'Actions',
    sortable: false,
  },
];

function OrdersTable() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [detailsId, setDetailsId] = useState<string | null>();
  const { queryResult, setPage, sort, setSort } = useOrdersPageContext();
  const { data, isLoading } = queryResult;
  const orders = data?.data;

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

  const { mutate: updateStatusMutate, isPending: isStatusUpdating } = updateOrderStatusMutation();

  async function handleUpdateStatus(id: string, status: OrderStatus) {
    updateStatusMutate(
      {
        id,
        status,
      },
      {
        onSuccess: data => {
          toast.success(data.message);
          handleCloseMenu();
          queryClient.invalidateQueries({ queryKey: ['getOrders'] });
        },
        onError: (err: any) => {
          toast.error(err.message);
          handleCloseMenu();
        },
      },
    );
  }

  const isPending = isStatusUpdating;

  return (
    <div className="mt-10 p-2 lg:p-5 glass overflow-x-auto ">
      <Typography
        component="h1"
        variant="h5"
        fontFamily="jost"
        fontWeight={600}
        color="text.primary"
        mb={1}
      >
        Orders Table
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
                {orders?.map(order => (
                  <TableRow key={order._id}>
                    <TableCell>#{order._id}</TableCell>
                    <TableCell style={{ minWidth: '300px' }}>
                      <Stack direction={'row'} alignItems={'center'} gap={1}>
                        <img
                          src={order.product.image}
                          alt={'image'}
                          className=" size-14 md:size-16 rounded-lg object-cover"
                        />
                        <Typography>{order.product.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{order.product.category}</TableCell>

                    <TableCell>{order.product.quantity}</TableCell>
                    <TableCell>{order.payment.amount}</TableCell>
                    <TableCell>{order.payment.status}</TableCell>

                    <TableCell>{order.status}</TableCell>

                    <TableCell>{new Date(order.createdAt).toDateString()}</TableCell>

                    <TableCell>
                      <Tooltip title="View Full Details">
                        <button
                          onClick={() => setDetailsId(order._id)}
                          className="text-2xl hover:text-primary mr-2 hover:cursor-pointer"
                        >
                          <HiOutlineViewfinderCircle />
                        </button>
                      </Tooltip>
                      <Tooltip title="Menu">
                        <button
                          onClick={e => handleOpenMenu(e, order._id)}
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
                  const order = orders?.find(c => c._id === menuId);
                  if (!order) return null;

                  if (order.status === OrderStatus.RUNNING) {
                    return [
                      order.status === OrderStatus.RUNNING ? (
                        <MenuItem
                          key={OrderStatus.COMPLETED}
                          onClick={() => handleUpdateStatus(order.status, OrderStatus.COMPLETED)}
                        >
                          Set as Completed
                        </MenuItem>
                      ) : (
                        <MenuItem
                          key={OrderStatus.FAILED}
                          onClick={() => handleUpdateStatus(order.status, OrderStatus.FAILED)}
                        >
                          Set as Failed
                        </MenuItem>
                      ),
                    ];
                  } else {
                    return [];
                  }
                })()}
              <MenuItem key={OrderStatus.REFUNDED}>Refund</MenuItem>
            </Menu>
            {detailsId ? (
              <OrderDetailsDialog id={detailsId} onClose={() => setDetailsId(null)} />
            ) : null}
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default OrdersTable;
