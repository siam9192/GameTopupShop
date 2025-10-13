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
} from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { HiOutlineViewfinderCircle } from 'react-icons/hi2';
import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io';
import { LiaUserEditSolid } from 'react-icons/lia';
import {
  deleteAdministratorMutation,
  getAdministratorsQuery,
  updateAdministratorStatusMutation,
} from '@/query/services/administrator';
import { useAdministratorsPageContext } from '@/app/control-dashboard/users/administrators/page';
import { Param } from '@/types/metadata.type';
import DashboardSectionHeading from '@/components/ui/DashboardSectionHeading';
import { AccountStatus } from '@/types/user.type';
import AdministratorDetailsDialog from '@/components/ui/AdministratorDetailsDialog';
import UpdateAdministratorLevelDialog from '@/components/ui/UpdateAdministratorLevelDialog';
import { toast } from 'react-toastify';
import { queryClient } from '@/provider/Provider';

const heads = [
  { name: 'ID', fieldName: '_id', sortable: true },
  { name: 'Name', fieldName: 'fullName', sortable: true },
  { name: 'Level', fieldName: 'level', sortable: false },
  { name: 'Email', fieldName: 'email', sortable: true },

  { name: 'Status', fieldName: '_id', sortable: false },
  { name: 'Join Date', fieldName: 'createdAt', sortable: true },
  { name: 'Actions', fieldName: '_id', sortable: false },
];

function AdministratorsTable() {
  const [sort, setSort] = useState<{ by: string; order: 'asc' | 'desc' }>({
    by: 'createdAt',
    order: 'desc',
  });
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [detailId, setDetailsId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [menuId, setMenuId] = useState<string | null>(null);
  const { filters } = useAdministratorsPageContext();

  const params: Param[] = [
    { name: 'page', value: page },
    ...Object.entries(filters).map(([key, value]) => ({ name: key, value })),
    { name: 'sortBy', value: sort.by },
    { name: 'sortOrder', value: sort.order },
  ];

  const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    setAnchorEl(e.currentTarget);
    setMenuId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuId(null);
  };

  const { data, isLoading, refetch, isPending } = getAdministratorsQuery(params);
  const administrators = data?.data;
  const meta = data?.meta;
  const totalPages = meta ? Math.ceil(meta.totalResults / meta.limit) : 0;

  useEffect(() => {
    if (isPending) return;
    refetch();
  }, [page, sort, filters]);

  const { mutate: updateStatus } = updateAdministratorStatusMutation();
  const { mutate: deleteAdministrator } = deleteAdministratorMutation();

  async function handleUpdateStatus(id: string, status: AccountStatus) {
    updateStatus(
      { id, status },
      {
        onSuccess: () => {
          toast.success(
            status === AccountStatus.ACTIVE ? 'Customer unblocked' : 'Customer blocked',
          );
          handleCloseMenu();
          queryClient.invalidateQueries({ queryKey: ['getAdministrators'] });
        },
        onError: (err: any) => {
          toast.error(err.message);
          handleCloseMenu();
        },
      },
    );
  }

  async function handleDelete(id: string) {
    deleteAdministrator(id, {
      onSuccess: () => {
        toast.success('Administrator deleted successfully');
        handleCloseMenu();
        queryClient.invalidateQueries({ queryKey: ['administrators'] });
      },
      onError: (err: any) => {
        toast.error(err.message);
        handleCloseMenu();
      },
    });
  }

  return (
    <div className="mt-10 p-2 lg:p-5 glass overflow-x-auto ">
      <DashboardSectionHeading title="Administrators Table" />

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
                {administrators?.map(administrator => (
                  <TableRow key={administrator._id}>
                    <TableCell>#{administrator._id}</TableCell>
                    <TableCell style={{ minWidth: '250px' }}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt={administrator.fullName} src={administrator.profilePicture} />
                        <Typography>{administrator.fullName}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{administrator.level}</TableCell>
                    <TableCell>{administrator.email || 'N/A'}</TableCell>

                    <TableCell>{administrator.status}</TableCell>
                    <TableCell>{new Date(administrator.createdAt).toDateString()}</TableCell>
                    <TableCell>
                      <Tooltip title="View Full Details">
                        <button
                          onClick={() => setDetailsId(administrator._id)}
                          className="text-2xl hover:text-primary mr-2 hover:cursor-pointer"
                        >
                          <HiOutlineViewfinderCircle />
                        </button>
                      </Tooltip>

                      <Tooltip title="Edit administrator">
                        <button
                          onClick={e => handleOpenMenu(e, administrator._id)}
                          className="text-2xl hover:text-secondary mr-2 hover:cursor-pointer"
                        >
                          <LiaUserEditSolid />
                        </button>
                      </Tooltip>

                      {administrator._id === editId && (
                        <UpdateAdministratorLevelDialog
                          administrator={administrator}
                          onClose={() => setEditId(null)}
                        />
                      )}
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
            open={Boolean(anchorEl) && Boolean(menuId)}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            {menuId &&
              (() => {
                const administrator = administrators?.find(c => c._id === menuId);
                if (!administrator) return null;

                return [
                  administrator.status === AccountStatus.ACTIVE ? (
                    <MenuItem
                      key={`block-${administrator._id}`}
                      onClick={() => handleUpdateStatus(administrator._id, AccountStatus.BLOCKED)}
                    >
                      Block
                    </MenuItem>
                  ) : (
                    <MenuItem
                      key={`unblock-${administrator._id}`}
                      onClick={() => handleUpdateStatus(administrator._id, AccountStatus.ACTIVE)}
                    >
                      Unblock
                    </MenuItem>
                  ),

                  <MenuItem
                    key={`delete-${administrator._id}`}
                    onClick={() => handleDelete(administrator._id)}
                  >
                    Delete
                  </MenuItem>,

                  <MenuItem
                    key={`update-${administrator._id}`}
                    onClick={() => setEditId(administrator._id)}
                  >
                    Update Level
                  </MenuItem>,
                ];
              })()}
          </Menu>
        </>
      )}

      {detailId && <AdministratorDetailsDialog id={detailId} onClose={() => setDetailsId(null)} />}
    </div>
  );
}

export default AdministratorsTable;
