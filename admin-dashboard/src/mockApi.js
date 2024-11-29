// File: src/mockApi.js

// Mock Data
const mockUsers = [
    { id: 1, name: "Martin", role: "Admin", status: "Active" },
    { id: 2, name: "Harsh", role: "Editor", status: "Inactive" },
    { id: 3, name: "Dishant", role: "Viewer", status: "Inactive" }
  ];
  
  const mockRoles = [
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "Editor", permissions: ["Read", "Write"] },
    { id: 3, name: "Viewer", permissions: ["Read"] }
  ];
  
  // User APIs
  export const fetchUsers = () => Promise.resolve([...mockUsers]);
  
  export const addUser = (user) =>
    new Promise((resolve) => {
      const newUser = { id: Date.now(), ...user };
      mockUsers.push(newUser);
      resolve(newUser);
    });
  
  export const updateUser = (updatedUser) =>
    new Promise((resolve) => {
      const index = mockUsers.findIndex((u) => u.id === updatedUser.id);
      if (index !== -1) {
        mockUsers[index] = updatedUser;
        resolve(updatedUser);
      }
    });
  
  export const deleteUser = (userId) =>
    new Promise((resolve) => {
      const index = mockUsers.findIndex((u) => u.id === userId);
      if (index !== -1) {
        mockUsers.splice(index, 1);
        resolve(userId);
      }
    });
  
  // Role APIs
  export const fetchRoles = () => Promise.resolve([...mockRoles]);
  
  export const addRole = (role) =>
    new Promise((resolve) => {
      const newRole = { id: Date.now(), ...role };
      mockRoles.push(newRole);
      resolve(newRole);
    });
  
  export const updateRole = (updatedRole) =>
    new Promise((resolve) => {
      const index = mockRoles.findIndex((r) => r.id === updatedRole.id);
      if (index !== -1) {
        mockRoles[index] = updatedRole;
        resolve(updatedRole);
      }
    });
  
  export const deleteRole = (roleId) =>
    new Promise((resolve) => {
      const index = mockRoles.findIndex((r) => r.id === roleId);
      if (index !== -1) {
        mockRoles.splice(index, 1);
        resolve(roleId);
      }
    });
  