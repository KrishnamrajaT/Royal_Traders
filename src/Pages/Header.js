import React, { useState } from "react";
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
import PaymentModal from "../Pages/PaymentPage";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [isOpenPaymentModal, setIsOpenPaymentModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Define all possible pages and their default routes
  const allPages = {
    Reviews: {
      defaultPath: "/review",
      homePath: "/review", // When on home page
      reviewPath: "/",     // When on review page (becomes "Home" button)
    }
  };

  // Determine current page configuration based on route
  const getCurrentPageConfig = () => {
    const currentPath = location.pathname;
    
    return Object.entries(allPages).map(([pageName, routes]) => {
      if (currentPath === "/") {
        return {
          name: pageName,
          path: routes.homePath || routes.defaultPath
        };
      } else if (currentPath === routes.defaultPath) {
        return {
          name: "Home", // Change button text to "Home" when on review page
          path: routes.reviewPath || "/" // Return to home
        };
      }
      return {
        name: pageName,
        path: routes.defaultPath
      };
    });
  };

  // Get the current pages to display
  const currentPages = getCurrentPageConfig();

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#1E1E1E" }}>
        <Container maxWidth="xl" sx={{ paddingRight: "38px" }}>
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

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                justifyContent: "start",
                fontSize: "25px",
                letterSpacing: "1px",
                flexGrow: 1,
                fontWeight: 700,
                color: "#F0F0F0",
                textDecoration: "none",
              }}
            >
              Royal Traders
            </Typography>
            
            {/* Mobile View */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                justifyContent: "end",
                marginRight: "-27px",
              }}
            >
              {currentPages.map((page) => (
                <Button
                  key={page.name}
                  component={Link}
                  variant="contained"
                  to={page.path}
                  sx={{
                    color: "white",
                    display: "block",
                    padding: "6px 8px",
                    background: "linear-gradient(45deg, #2563EB 0%, #1E40AF 100%)",
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
            
            {/* Desktop View */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {currentPages.map((page) => (
                <Button
                  key={page.name}
                  component={Link}
                  variant="contained"
                  size="large"
                  to={page.path}
                  sx={{
                    marginLeft: "30px",
                    my: 2,
                    color: "white",
                    display: "block",
                    borderRadius: "15px",
                    fontWeight: "bold",
                    background: "linear-gradient(45deg, #2563EB 0%, #1E40AF 100%)",
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
            
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <JoinNowButton />
            </Box>
          </Toolbar>
        </Container>
        <PaymentModal
          onClose={() => setIsOpenPaymentModal(false)}
          open={isOpenPaymentModal}
        />
      </AppBar>
    </>
  );
}

export default Header;