// File: src/pages/Permissions.js
import React, { useEffect, useState } from "react";
import { fetchRoles, updateRole } from "../mockApi";
import {Table,TableHead,TableRow,TableCell,TableBody,Checkbox,Button,TablePagination } from "@mui/material";

const allPermissions = ["Read", "Write", "Delete"];

const Permissions = () => {
  const [roles, setRoles] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchRoles().then(setRoles);
  }, []);

  const togglePermission = (roleId, permission) => {
    setRoles((prev) =>
      prev.map((role) =>
        role.id === roleId
          ? {
              ...role,
              permissions: role.permissions.includes(permission)
                ? role.permissions.filter((perm) => perm !== permission)
                : [...role.permissions, permission],
            }
          : role
      )
    );
  };

  const savePermissions = (role) => {
    updateRole(role).then((updatedRole) => {
      setRoles((prev) =>
        prev.map((r) => (r.id === updatedRole.id ? updatedRole : r))
      );
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <h2>Permissions Management</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Role</TableCell>
            {allPermissions.map((perm) => (
              <TableCell key={perm}>{perm}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                {allPermissions.map((perm) => (
                  <TableCell key={perm}>
                    <Checkbox
                      checked={role.permissions.includes(perm)}
                      onChange={() => togglePermission(role.id, perm)}
                    />
                  </TableCell>
                ))}
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => savePermissions(role)}
                  >
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={roles.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Permissions;
