import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Web3Context } from "../../context/Web3Context";
import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  TextField,
  Stack,
  Grid,
} from "@mui/material";

import { useFormik, Form, FormikProvider } from "formik";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function LendingHeader() {
  const navigate = useNavigate();
  const web3Context = React.useContext(Web3Context);
  const {
    connectWallet,
    shortAddress,
    disconnectWallet,
    update,
    loginWithTrustified,
    aLoading,
  } = web3Context;
  const [user, setUser] = React.useState("");
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async (values) => {
      await connectWallet(values.name);
      setOpen(false);
    },
  });

  const { handleSubmit } = formik;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleNavigate = (e) => {
    navigate(`${e}`);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    const user = window.localStorage.getItem("address");
    setUser(user);
  }, [update]);

  return (
    <AppBar position="static" color="transparent">
      <Container
        sx={{
          maxWidth: { md: "lg", lg: "xl", xl: "xl", xxl: "xxl" },
          padding: { md: "0 4%", lg: "0 4%", xl: "0 4%", xxl: "0 4%" },
        }}
      >
        <Toolbar disableGutters>
          {/* <Logo /> */} Logo
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            {user != null ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Jaydip Patel" src="" />
                </IconButton>
              </Tooltip>
            ) : (
              <>
                <Button variant="contained" onClick={loginWithTrustified}>
                  Login with Trustified
                </Button>{" "}
                &nbsp;&nbsp;
                <Button variant="contained" onClick={handleOpen}>
                  Connect
                </Button>
              </>
            )}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                {user != null && (
                  <p className="text-dark m-0">{shortAddress(user)}</p>
                )}
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => handleNavigate("/dashboard/profile")}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleNavigate("/dashboard/templates")}>
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
              <MenuItem onClick={disconnectWallet}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle
          style={{
            textAlign: "center",
          }}
        >
          Create Id
        </DialogTitle>

        <DialogContent style={{ overflowX: "hidden" }}>
          <Container maxWidth="sm">
            <form
              onSubmit={handleSubmit}
              style={{
                justifyContent: "center",
                marginLeft: "auto",
                marginRight: "auto",
                // marginTop: "100px",
              }}
            >
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Enter name"
                  name="name"
                  id="name"
                  type="text"
                  required
                  {...formik.getFieldProps("name")}
                />
              </Stack>

              <DialogActions>
                <Grid container justifyContent="center">
                  <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={aLoading}
                  >
                    {aLoading ? "Connecting..." : "Connect"}
                  </Button>
                </Grid>
              </DialogActions>
            </form>
          </Container>
        </DialogContent>
      </Dialog>
    </AppBar>
  );
}
