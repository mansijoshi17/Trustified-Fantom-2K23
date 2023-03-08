import React, { useState } from "react";
import PropTypes from "prop-types";
// material
import { alpha, styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, IconButton, Button, Tooltip, Avatar, Menu, MenuItem, Divider, Typography } from "@mui/material";
import Iconify from "../utils/Iconify";
import { Web3Context } from "../../context/Web3Context";
import { useNavigate } from "react-router-dom";
 

const DRAWER_WIDTH = 200;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 80;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.paper, 1),
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar }) {
  const navigate = useNavigate();
  const web3Context = React.useContext(Web3Context);
  const {   data, shortAddress, disconnectWallet,
    update } = web3Context;
  const [user, setUser] = React.useState("");
  const [anchorElUser, setAnchorElUser] = React.useState(false); 

  const handleOpenUserMenu = () => {
    setAnchorElUser(true);
  };
  const handleNavigate = (e) => {
    navigate(`${e}`);
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(false);
  };


  React.useEffect(() => {
    const user = window.localStorage.getItem("address");
    setUser(user);
  }, [update])

  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton
          onClick={onOpenSidebar}
          sx={{ mr: 1, color: "text.primary", display: { lg: "none" } }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        {/* <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        > 
         <p className="text-dark"> 0x993bdf..u983</p>
        </Stack> */}
        <Box sx={{ flexGrow: 0 }}>
            {
              user != null && <Tooltip title="Profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Jaydip Patel" src={  data ? data.Photo : ""} />
                </IconButton>
              </Tooltip> 
            }

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={anchorElUser}
              onClose={handleCloseUserMenu}
            >
              <MenuItem >
              { user != null && <p className='text-dark m-0'>{shortAddress(user)}</p>}  
              </MenuItem>
              <Divider/>
              <MenuItem onClick={() => handleNavigate('/dashboard/profile')}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleNavigate('/dashboard/collection')} >
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
              <MenuItem onClick={disconnectWallet}  >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box> 
      </ToolbarStyle>
    </RootStyle>
  );
}
