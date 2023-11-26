import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setUserToken } from "../store/authSlice";
import "./Header.css"; // Import the CSS file

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to manage the confirmation dialog
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setOpen(true); // Open the confirmation dialog
  };

  const handleConfirmLogout = () => {
    // Logout handler
    dispatch(setUserToken(null));
    navigate("/");
    setOpen(false); // Close the confirmation dialog after logout
  };

  const handleCancelLogout = () => {
    setOpen(false); // Close the confirmation dialog without logging out
  };



  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#075b51" }}>
        <Toolbar>
          <Typography
            color="inherit"
            component={NavLink}
            to="/"
            activeClassName="active"
            exact
          >
            <h2>GOAL TRACKER</h2>
          </Typography>
          <div style={{ flexGrow: 1 }}></div>

          <NavLink
            to="/dailyGoals"
            exact
            className="nav-link"
            activeClassName="active"
          >
            DailyGoals{" "}
          </NavLink>
          <NavLink
            to="/monthlyGoals"
            exact
            className="nav-link"
            activeClassName="active"
          >
            MonthlyGoals{" "}
          </NavLink>

          {isAuthenticated && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleCancelLogout}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
