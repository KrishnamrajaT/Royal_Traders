import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { DialogActions, useMediaQuery, useTheme } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PaymentIcon from "@mui/icons-material/Payment";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DisclaimerForm from "../components/DisclaimerModal";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertProof() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
   const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProceed = () => {
    // Add your proceed logic here
    handleClose();
    setIsModalOpen(true)
    // You might want to navigate to another page here
  };
  

  return (
    <Box sx={{ maxWidth: isMobile ? "100%" : "400px", mx: "auto", my: 2 }}>
      <Button
        fullWidth
        variant="contained"
        onClick={handleClickOpen}
        size={isMobile ? "medium" : "large"}
        startIcon={<PaymentIcon />}
        sx={{
          background: "linear-gradient(45deg, #2563EB 0%, #1E40AF 100%)",
          color: "white",
          "&:hover": {
            background: "linear-gradient(45deg, #1E40AF 0%, #2563EB 100%)",
            boxShadow: "0 4px 8px rgba(30, 64, 175, 0.3)",
          },
          fontSize: isMobile ? "0.8rem" : "1rem",
          py: isMobile ? 0.8 : 1.5,
          minHeight: isMobile ? "40px" : "48px",
          borderRadius: "12px",
          textTransform: "none",
          letterSpacing: "0.5px",
          fontWeight: 500,
          transition: "all 0.3s ease",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        Verify your payment details
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullScreen={isMobile}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: isMobile ? 0 : "16px",
            width: isMobile ? "100%" : "auto",
            maxWidth: isMobile ? "100%" : "450px",
            mx: isMobile ? 0 : "auto",
            my: isMobile ? 0 : "auto",
            maxHeight: isMobile ? "100%" : "calc(100% - 64px)",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: theme.palette.grey[50],
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
            py: 2,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <WarningAmberIcon color="warning" fontSize="medium" />
          <Typography variant="h6" component="span" fontWeight={600}>
            Payment Verification
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ py: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 2,
              px: isMobile ? 0 : 2,
            }}
          >
            <PaymentIcon color="primary" sx={{ fontSize: 48 }} />
            <DialogContentText
              id="alert-dialog-slide-description"
              sx={{
                color: theme.palette.text.primary,
                fontSize: isMobile ? "0.9rem" : "1rem",
                lineHeight: 1.6,
              }}
            >
              You're about to access a secure page where you can upload your
              payment screenshot and provide necessary details for verification.
            </DialogContentText>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            py: 2,
            bgcolor: theme.palette.grey[50],
            borderTop: `1px solid ${theme.palette.grey[200]}`,
            justifyContent: "space-between",
            flexDirection: isMobile ? "column-reverse" : "row",
            gap: isMobile ? 2 : 0,
          }}
        >
          <Button
            fullWidth={isMobile}
            variant="outlined"
            onClick={handleClose}
            sx={{
              color: theme.palette.text.secondary,
              borderColor: theme.palette.grey[400],
              "&:hover": {
                borderColor: theme.palette.grey[600],
                backgroundColor: theme.palette.grey[100],
              },
              fontSize: isMobile ? "0.9rem" : "0.95rem",
              py: isMobile ? 1 : 0.8,
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 500,
              transition: "all 0.2s ease",
            }}
          >
            Go back
          </Button>
          <Button
            fullWidth={isMobile}
            variant="contained"
            onClick={handleProceed}
            
            sx={{
              background: "linear-gradient(45deg, #2563EB 0%, #1E40AF 100%)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(45deg, #1E40AF 0%, #2563EB 100%)",
                boxShadow: "0 4px 8px rgba(30, 64, 175, 0.3)",
              },
              fontSize: isMobile ? "0.9rem" : "0.95rem",
              py: isMobile ? 1 : 0.8,
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 500,
              transition: "all 0.2s ease",
              boxShadow: "none",
            }}
          >
            Proceed to upload
          </Button>
        </DialogActions>
      </Dialog>
      <DisclaimerForm
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPaymentInitiated={() => {
          console.log("Payment initiated!");
          setIsModalOpen(false);
        }}
      />
    </Box>
  );
}
