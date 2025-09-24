'use client';
import React, { MouseEvent, useEffect, useState } from 'react';
import {
  Avatar,
  CircularProgress,
  Menu,
  MenuItem,
  Pagination,
  Stack,
  Tooltip,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { HiOutlineViewfinderCircle } from 'react-icons/hi2';
import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io';
import { LiaUserEditSolid } from 'react-icons/lia';
import DashboardSectionHeading from '@/components/ui/DashboardSectionHeading';
import {
  deleteCustomerMutation,
  getCustomersQuery,
  updateCustomerStatusMutation,
} from '@/query/services/customer';
import { Param } from '@/types/metadata.type';
import CustomerDetailsDialog from '@/components/ui/CustomerDetailsDialog';
import { useCustomersPageContext } from '@/app/control-dashboard/users/customers/page';
import { AccountStatus } from '@/types/user.type';
import { toast } from 'react-toastify';
import { queryClient } from '@/provider/Provider';

const heads = [
  { name: 'ID', fieldName: '_id', sortable: true },
  { name: 'Name', fieldName: 'fullName', sortable: true },
  { name: 'Orders', fieldName: 'ordersCount', sortable: true },
  { name: 'Email', fieldName: 'email', sortable: true },
  { name: 'Phone', fieldName: 'phone', sortable: false },
  { name: 'Provider', fieldName: '_id', sortable: false },
  { name: 'Status', fieldName: '_id', sortable: false },
  { name: 'Join Date', fieldName: 'createdAt', sortable: true },
  { name: 'Actions', fieldName: '_id', sortable: false },
];

function CustomersTable() {
  const [sort, setSort] = useState<{ by: string; order: 'asc' | 'desc' }>({
    by: 'createdAt',
    order: 'desc',
  });
  const [page, setPage] = useState(1);

  // Menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeCustomerId, setActiveCustomerId] = useState<string | null>(null);

  const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    setAnchorEl(e.currentTarget);
    setActiveCustomerId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveCustomerId(null);
  };

  const { filters } = useCustomersPageContext();

  const params: Param[] = [
    { name: 'page', value: page },
    ...Object.entries(filters).map(([key, value]) => ({ name: key, value })),
    { name: 'sortBy', value: sort.by },
    { name: 'sortOrder', value: sort.order },
  ];

  const { data, isLoading, refetch, isPending } = getCustomersQuery(params);
  const customers = data?.data;
  const meta = data?.meta;
  const totalPages = meta ? Math.ceil(meta.totalResults / meta.limit) : 0;

  const { mutate: updateStatus } = updateCustomerStatusMutation();
  const { mutate: deleteCustomer } = deleteCustomerMutation();

  async function handleUpdateStatus(id: string, status: AccountStatus) {
    updateStatus(
      { id, status },
      {
        onSuccess: () => {
          toast.success(
            status === AccountStatus.ACTIVE ? 'Customer unblocked' : 'Customer blocked',
          );
          handleCloseMenu();
          queryClient.invalidateQueries({ queryKey: ['getCustomers'] });
        },
        onError: (err: any) => {
          toast.error(err.message);
          handleCloseMenu();
        },
      },
    );
  }

  async function handleDelete(id: string) {
    deleteCustomer(id, {
      onSuccess: () => {
        toast.success('Customer deleted successfully');
        handleCloseMenu();
        queryClient.invalidateQueries({ queryKey: ['customers'] });
      },
      onError: (err: any) => {
        toast.error(err.message);
        handleCloseMenu();
      },
    });
  }

  const [customerId, setCustomerId] = useState<string | null>(null);
  useEffect(() => {
    if (isPending) return;
    refetch();
  }, [page, sort, filters]);
  return (
    <div className="mt-10 p-2 lg:p-5 glass overflow-x-auto ">
      <DashboardSectionHeading title="Customers Table" />

      {isLoading ? (
        <div className="h-[300px] flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <TableContainer
            sx={{ width: '100%', minHeight: '100px', display: 'table', tableLayout: 'fixed' }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {heads.map(head => (
                    <TableCell key={head.name}>
                      {head.sortable ? (
                        <Stack direction="row" gap={0.5} alignItems="center">
                          <span>{head.name.toUpperCase()}</span>
                          <button
                            onClick={() =>
                              setSort(p => ({
                                by: head.fieldName,
                                order:
                                  p.by === head.fieldName && p.order === 'asc' ? 'desc' : 'asc',
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
                {customers?.map(customer => (
                  <TableRow key={customer._id}>
                    <TableCell>#{customer._id}</TableCell>
                    <TableCell style={{ minWidth: '250px' }}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt={customer.fullName} src={customer.profilePicture} />
                        <Typography>{customer.fullName}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{customer.ordersCount}</TableCell>
                    <TableCell>{customer.email || 'N/A'}</TableCell>
                    <TableCell>{customer.phone || 'N/A'}</TableCell>
                    <TableCell>{customer.provider}</TableCell>
                    <TableCell>{customer.status}</TableCell>
                    <TableCell>{new Date(customer.createdAt).toDateString()}</TableCell>
                    <TableCell>
                      <Tooltip title="View Full Details">
                        <button
                          onClick={() => setCustomerId(customer._id)}
                          className="text-2xl hover:text-primary mr-2 hover:cursor-pointer"
                        >
                          <HiOutlineViewfinderCircle />
                        </button>
                      </Tooltip>

                      <Tooltip title="Edit Customer">
                        <button
                          onClick={e => handleOpenMenu(e, customer._id)}
                          className="text-2xl hover:text-secondary mr-2 hover:cursor-pointer"
                        >
                          <LiaUserEditSolid />
                        </button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

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
            open={Boolean(anchorEl) && Boolean(activeCustomerId)}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            {activeCustomerId &&
              (() => {
                const customer = customers?.find(c => c._id === activeCustomerId);
                if (!customer) return null;

                return [
                  customer.status === AccountStatus.ACTIVE ? (
                    <MenuItem
                      key="block"
                      onClick={() => handleUpdateStatus(customer._id, AccountStatus.BLOCKED)}
                    >
                      Block
                    </MenuItem>
                  ) : (
                    <MenuItem
                      key="unblock"
                      onClick={() => handleUpdateStatus(customer._id, AccountStatus.ACTIVE)}
                    >
                      Unblock
                    </MenuItem>
                  ),
                  <MenuItem key="id">{customer._id}</MenuItem>,
                  <MenuItem key="delete" onClick={() => handleDelete(customer._id)}>
                    Delete
                  </MenuItem>,
                ];
              })()}
          </Menu>
        </>
      )}

      {customerId && <CustomerDetailsDialog id={customerId} onClose={() => setCustomerId(null)} />}
    </div>
  );
}

export default CustomersTable;
