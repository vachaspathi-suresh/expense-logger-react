import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  useScrollTrigger,
  Button,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../../firebase.js";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const NavBar = (props) => {
  const [user] = useAuthState(auth);

  const handleClick = () => {
    try {
      signOut(auth).catch((err) => {
        console.log(err.code);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ElevationScroll {...props}>
        <AppBar sx={{ bgcolor: "#572207" }}>
          <Toolbar>
            <MenuBookIcon
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Expense Logger
            </Typography>
            {user && (
              <Button color="inherit" onClick={handleClick}>
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>

      <Toolbar />
    </Box>
  );
};

export default NavBar;
