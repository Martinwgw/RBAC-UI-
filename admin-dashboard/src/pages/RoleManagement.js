// File: src/pages/RoleManagement.js
import React, { useEffect, useState } from "react";
import { fetchRoles, addRole, updateRole, deleteRole } from "../mockApi";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, 
    FormControlLabel, TablePagination } from "@mui/material";

const allPermissions = ["Read", "Write", "Delete"];

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", permissions: [] });
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchRoles().then(setRoles);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Role name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (formData.id) {
      updateRole(formData).then((updatedRole) => {
        setRoles((prev) =>
          prev.map((role) => (role.id === updatedRole.id ? updatedRole : role))
        );
      });
    } else {
      addRole(formData).then((newRole) => setRoles((prev) => [...prev, newRole]));
    }
    setDialogOpen(false);
    setFormData({ name: "", permissions: [] });
    setErrors({});
  };

  const handleDelete = (id) => {
    deleteRole(id).then(() =>
      setRoles((prev) => prev.filter((role) => role.id !== id))
    );
  };

  const togglePermission = (permission) => {
    setFormData((prev) => {
      const permissions = prev.permissions.includes(permission)
        ? prev.permissions.filter((perm) => perm !== permission)
        : [...prev.permissions, permission];
      return { ...prev, permissions };
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
      <h2>Role Management</h2>
      <Button variant="contained" onClick={() => setDialogOpen(true)}>
        Add Role
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Role Name</TableCell>
            <TableCell>Permissions</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.permissions.join(", ")}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => setFormData(role) || setDialogOpen(true)}
                  >
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(role.id)}>Delete</Button>
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
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{formData.id ? "Edit Role" : "Add Role"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Role Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
          />
          <div>
            <h4>Permissions</h4>
            {allPermissions.map((perm) => (
              <FormControlLabel
                key={perm}
                control={
                  <Checkbox
                    checked={formData.permissions.includes(perm)}
                    onChange={() => togglePermission(perm)}
                  />
                }
                label={perm}
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoleManagement;
