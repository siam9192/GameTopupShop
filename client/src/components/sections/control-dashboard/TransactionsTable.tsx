'use client';
import React, { useState } from 'react';
import { Avatar, CircularProgress, Pagination, Stack, Tooltip, Typography } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { HiOutlineViewfinderCircle } from 'react-icons/hi2';
import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io';
import DashboardSectionHeading from '@/components/ui/DashboardSectionHeading';

import { SortOrder } from '@/types/utils.type';
import TransactionDetailsDialog from './TransactionDetailsDialog';
import { useTransactionsPageContext } from '@/provider/TransactionsPageProvider';

const heads = [
  {
    name: 'ID',
    fieldName: 'id',
    sortable: true,
  },

  {
    name: 'Amount',
    fieldName: 'amount',
    sortable: true,
  },
  {
    name: 'Currency',
    sortable: false,
  },
  {
    name: 'Method Type',
    sortable: true,
  },
  {
    name: 'By',
    sortable: true,
  },

  {
    name: 'Status',
    sortable: false,
  },
  {
    name: 'Transaction ID',
    sortable: true,
  },
  {
    name: 'Date',
    sortable: true,
  },
  {
    name: 'Actions',
    sortable: false,
  },
];
function TransactionsTable() {
  const [detailsId, setDetailsId] = useState<string | null>(null);
  const { queryResult, setPage, sort, setSort } = useTransactionsPageContext();
  const { data, isLoading } = queryResult;
  const transactions = data?.data;

  const meta = data?.meta;
  const totalPages = meta ? Math.ceil(meta.totalResults / meta.limit) : 0;

  return (
    <div className="mt-10 p-2 lg:p-5 glass overflow-x-auto ">
      <DashboardSectionHeading title="Transactions Table" />
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
                {transactions?.map(transaction => (
                  <TableRow key={transaction._id}>
                    <TableCell>#{transaction._id}</TableCell>

                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.currency}</TableCell>
                    <TableCell>{transaction.method?.type || 'Unknown'}</TableCell>
                    <TableCell style={{ minWidth: '250px' }}>
                      <Stack direction={'row'} alignItems={'center'} spacing={2}>
                        <Avatar alt="Image" src={transaction.customer.profilePicture} />
                        <Typography>{transaction.customer.fullName}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{transaction.status}</TableCell>

                    <TableCell>{transaction.reference}</TableCell>
                    <TableCell>{new Date().toDateString()}</TableCell>

                    <TableCell>
                      <Tooltip title="View Full Details">
                        <button
                          onClick={() => setDetailsId(transaction._id)}
                          className="text-2xl hover:text-primary mr-2 hover:cursor-pointer"
                        >
                          <HiOutlineViewfinderCircle />
                        </button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {meta?.totalResults === 0 && (
              <Typography mt={3} variant="h5" color="text.primary" align="center">
                No results
              </Typography>
            )}
            {detailsId ? (
              <TransactionDetailsDialog id={detailsId} onClose={() => setDetailsId(null)} />
            ) : null}
            <Pagination
              style={{ marginTop: '15px' }}
              count={totalPages}
              onChange={(e, value) => setPage(value)}
              size="large"
              color="primary"
              variant="outlined"
              shape="rounded"
            />
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default TransactionsTable;
