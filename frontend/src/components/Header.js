import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useSelector,useDispatch } from "react-redux";
import { setUserToken } from '../store/authSlice';


const Header = () => {
  const isAuthenticated = useSelector(
    (state) => state.auth.token
  );
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogout = ()=>{
     // logout Handler
    dispatch(setUserToken(null))
    navigate('/');
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/">
         Goal Tracker
        </Typography>
        <div style={{ flexGrow: 1 }}></div>
       
          <>
            <Button color="inherit" component={Link} to="/dailyGoals">
            DailyGoals
            </Button>
            <Button color="inherit" component={Link} to="/monthlyGoals">
            MonthlyGoals
            </Button>
           {isAuthenticated && <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>}
          </>
        
      </Toolbar>
    </AppBar>
  );
};

export default Header;