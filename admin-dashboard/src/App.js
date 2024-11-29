import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import UserManagement from "./pages/UserManagement";
import RoleManagement from "./pages/RoleManagement";
import Permissions from "./pages/Permissions";
import { AppBar, Toolbar, Button, Container } from "@mui/material";

const App = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
          <Button color="inherit" component={Link} to="/roles">
            Roles
          </Button>
          <Button color="inherit" component={Link} to="/permissions">
            Permissions
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/users" element={<UserManagement />} />
          <Route path="/roles" element={<RoleManagement />} />
          <Route path="/permissions" element={<Permissions />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
