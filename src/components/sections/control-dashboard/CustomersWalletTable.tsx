'use client';
import React, { MouseEvent, useState } from 'react';
import {
  Avatar,
  Box,
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
import { useCustomersWalletPageContext } from '@/app/control-dashboard/wallets/customers/page';
import { SortOrder } from '@/types/utils.type';
import WalletDetailsDialog from './WalletDetailsDialog';
import UpdateWalletBalanceModal from './UpdateWalletBalanceModal';

const heads = [
  {
    name: 'Customer',
    sortable: true,
  },
  {
    name: 'Balance',
    fieldName: 'balance',
    sortable: true,
  },

  {
    name: 'Actions',
    sortable: false,
  },
];
function CustomersWalletTable() {
  const [detailsId, setDetailsId] = useState<string | null>(null);
  const { queryResult, setPage, sort, setSort } = useCustomersWalletPageContext();
  const { data, isLoading } = queryResult;
  const wallets = data?.data;

  const meta = data?.meta;
  const totalPages = meta ? Math.ceil(meta.totalResults / meta.limit) : 0;

  return (
    <div className="mt-10 p-2 lg:p-5 glass overflow-x-auto ">
      <DashboardSectionHeading title="Customers Wallet Table" />
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
                {wallets?.map(wallet => (
                  <TableRow key={wallet._id}>
                    <TableCell style={{ minWidth: '250px' }}>
                      <Stack direction={'row'} alignItems={'center'} spacing={2}>
                        <Avatar
                          alt={wallet.customer.fullName}
                          src={wallet.customer.profilePicture}
                        />
                        <Box>
                          <Typography>{wallet.customer.fullName}</Typography>
                          <Typography color="primary">#{wallet.customer._id}</Typography>
                        </Box>
                      </Stack>
                    </TableCell>

                    <TableCell>{wallet.balance} $USD</TableCell>

                    <TableCell>
                      <Tooltip title="View Full Details">
                        <button
                          onClick={() => setDetailsId(wallet._id)}
                          className="text-2xl hover:text-primary mr-2 hover:cursor-pointer"
                        >
                          <HiOutlineViewfinderCircle />
                        </button>
                      </Tooltip>

                      <UpdateWalletBalanceModal wallet={wallet} />
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

            {detailsId ? (
              <WalletDetailsDialog id={detailsId} onClose={() => setDetailsId(null)} />
            ) : null}
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default CustomersWalletTable;
