import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { setUserToken } from '../store/authSlice';

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logout handler
    dispatch(setUserToken(null));
    navigate('/');
  };

  const activeLinkStyle = {
    color: 'yellow',
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#075b51" }}>
      <Toolbar>
        <Typography color="inherit" component={NavLink} to="/" activeClassName="active-link">
          <h2>GOAL TRACKER</h2>
        </Typography>
        <div style={{ flexGrow: 1 }}></div>
        <Button color="inherit" component={NavLink} to="/dailyGoals" activeClassName="active-link">
          DailyGoals
        </Button>
        <Button color="inherit" component={NavLink} to="/monthlyGoals" activeClassName="active-link">
          MonthlyGoals
        </Button>
        {isAuthenticated && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
