'use client';
import React, { useState } from 'react';
import { Avatar, CircularProgress, Pagination, Stack, Tooltip, Typography } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { HiOutlineViewfinderCircle } from 'react-icons/hi2';
import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io';
import DashboardSectionHeading from '@/components/ui/DashboardSectionHeading';
import { useWalletAddBalanceSubmissionsPageContext } from '@/app/control-dashboard/wallets/submissions/page';
import { useRouter } from 'next/navigation';
import { SortOrder } from '@/types/utils.type';
import WalletAddBalanceSubmissionDetailsDialog from './WalletAddBalanceSubmissionDetailsDialog';
import { LuCheck } from 'react-icons/lu';
import WalletAddBalanceSubmissionDeclineModal from './WalletAddBalanceSubmissionDeclineModal';
import { WalletSubmissionStatus } from '@/types/wallet-submission.type';
import { approveWalletSubmissionMutation } from '@/query/services/wallet-submission';
import { toast } from 'react-toastify';
import { queryClient } from '@/provider/Provider';
import AlertDialog from '@/components/ui/AleartDialog';

const heads = [
  {
    name: 'ID',
    fieldName: '_id',
    sortable: true,
  },
  {
    name: 'Submitted By',
    sortable: false,
  },
  {
    name: 'Amount',
    fieldName: 'amount',
    sortable: true,
  },
  {
    name: 'Method',
    sortable: false,
  },

  {
    name: 'Status',
    sortable: false,
  },
  {
    name: 'Submit Date',
    sortable: true,
  },
  {
    name: 'Actions',
    sortable: false,
  },
];
function WalletAddBalanceSubmissionsTable() {
  const [detailsId, setDetailsId] = useState<string | null>(null);
  const { queryResult, setPage, sort, setSort } = useWalletAddBalanceSubmissionsPageContext();
  const { data, isLoading } = queryResult;
  const submissions = data?.data;

  const meta = data?.meta;
  const totalPages = meta ? Math.ceil(meta.totalResults / meta.limit) : 0;

  const router = useRouter();
  const navigate = (path: string) => {
    router.push(path);
  };
  const { mutate, isPending } = approveWalletSubmissionMutation();

  async function handleApprove(id: string) {
    mutate(id, {
      onSuccess: data => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ['getWalletSubmissions'] });
      },
      onError: (err: any) => {
        toast.error(err.message);
      },
    });
  }

  return (
    <div className="mt-10 p-2 lg:p-5 glass overflow-x-auto ">
      <DashboardSectionHeading title="Add Balance Submissions Table" />
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
                {submissions?.map(submission => (
                  <TableRow key={submission._id}>
                    <TableCell>#{submission._id}</TableCell>
                    <TableCell style={{ minWidth: '250px' }}>
                      <Stack direction={'row'} alignItems={'center'} spacing={2}>
                        <Avatar alt={'Img'} src={submission.customer.profilePicture} />
                        <Typography>{submission.customer.fullName}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{submission.amount} USD</TableCell>
                    <TableCell>{submission.methodName}</TableCell>

                    <TableCell>{submission.status}</TableCell>
                    <TableCell>{new Date(submission.createdAt).toDateString()}</TableCell>

                    <TableCell>
                      <Stack direction={'row'} gap={1} alignItems={'center'}>
                        <Tooltip title="View Full Details">
                          <button
                            onClick={() => setDetailsId(submission._id)}
                            className="text-2xl hover:text-primary mr-2 hover:cursor-pointer"
                          >
                            <HiOutlineViewfinderCircle />
                          </button>
                        </Tooltip>

                        {submission.status === WalletSubmissionStatus.PENDING ? (
                          <>
                            <AlertDialog
                              onAgree={() => handleApprove(submission._id)}
                              title="Approve submission"
                              description="Make sure about that because after successful approval it can not be undone"
                            >
                              <Tooltip title="Approve">
                                <button className="text-2xl hover:text-secondary mr-2 hover:cursor-pointer">
                                  <LuCheck />
                                </button>
                              </Tooltip>
                            </AlertDialog>

                            <WalletAddBalanceSubmissionDeclineModal submission={submission} />
                          </>
                        ) : null}
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

export default WalletAddBalanceSubmissionsTable;
