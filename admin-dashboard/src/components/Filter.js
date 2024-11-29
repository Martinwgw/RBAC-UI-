// File: src/components/Filter.js
import React from "react";
import { TextField, MenuItem, Box } from "@mui/material";

const Filter = ({ filters, onFilterChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
      <TextField
        label="Search by Name"
        name="name"
        value={filters.name || ""}
        onChange={handleInputChange}
        variant="outlined"
        size="small"
        fullWidth
      />
      <TextField
        select
        label="Filter by Role"
        name="role"
        value={filters.role || ""}
        onChange={handleInputChange}
        variant="outlined"
        size="small"
        fullWidth
      >
        <MenuItem value="">All Roles</MenuItem>
        <MenuItem value="Admin">Admin</MenuItem>
        <MenuItem value="Editor">Editor</MenuItem>
        <MenuItem value="Viewer">Viewer</MenuItem>
      </TextField>
      <TextField
        select
        label="Filter by Status"
        name="status"
        value={filters.status || ""}
        onChange={handleInputChange}
        variant="outlined"
        size="small"
        fullWidth
      >
        <MenuItem value="">All Status</MenuItem>
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Inactive">Inactive</MenuItem>
      </TextField>
    </Box>
  );
};

export default Filter;
