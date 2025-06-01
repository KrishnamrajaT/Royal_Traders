import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import JoinNowButton from "../components/JoinNowbtn";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
const pages = ["Home", "Reviews"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const pageRoutes = {
    Home: "/",
    Reviews: "/review",
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1E1E1E" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              justifyContent: "center",
              color: "#F0F0F0",
              textDecoration: "none",
              fontSize: "30px",
              letterSpacing: "2px",
            }}
          >
            Royal Traders
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  component={Link}
                  to={pageRoutes[page]}
                  onClick={handleCloseNavMenu}
                  sx={{
                    textDecoration: "none", // Remove underline
                    color: "inherit", // Inherit text color
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
              fontSize: "25px",
              letterSpacing: "3px",
              flexGrow: 1,
              fontWeight: 700,
              color: "#F0F0F0",
              textDecoration: "none",
            }}
          >
            Royal Traders
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={pageRoutes[page]}
                sx={{
                  marginLeft: "30px",
                  my: 2,
                  color: "white",
                  display: "block",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <JoinNowButton />
          </Box>
          {/* <Box
            sx={{
              flexGrow: 0,
              display: { xs: "flex", md: "none" },
              position: "fixed",
              top: "75px",
              left: "249px",
            }}
          >
            <JoinNowButton />
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
