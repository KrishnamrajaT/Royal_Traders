import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Divider,
  IconButton,
  Chip,
  useMediaQuery,
  useTheme,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import QRCode from "react-qr-code";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AlertProof from "./AlertProof";

const PaymentModal = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState("payment");
  const [selectedPlan, setSelectedPlan] = useState("12months");

  // Plan amounts
  const planAmounts = {
    "12months": "17999",
    "3months": "5999",
  };

  const amount = planAmounts[selectedPlan];

  // UPI Details
  const upiId = "royal82975669@barodampay";
  const paymentLink = `upi://pay?pa=${upiId}&am=${amount}&tn=PremiumGroupPayment`;

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "85%", sm: 400 },
          maxWidth: "calc(100vw - 24px)",
          maxHeight: "calc(100vh - 24px)",
          overflow: "auto",
          bgcolor: "rgba(15, 23, 42, 0.9)",
          boxShadow:
            "0 0 0 1px rgba(148, 163, 184, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.4)",
          p: isMobile ? 1.5 : 3,
          borderRadius: "16px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(16px)",
          outline: "none",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: "4px",
          },
        }}
      >
        {/* Glow Effect */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100%",
            width: "100%",
            background:
              "radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.15), transparent 50%)",
            zIndex: -1,
          }}
        />

        <IconButton
          onClick={() => {
            onClose();
            setStep("payment");
          }}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#E2E8F0",
            [theme.breakpoints.down("sm")]: { top: 6, right: 6 },
          }}
          size={isMobile ? "small" : "medium"}
        >
          <CloseIcon fontSize={isMobile ? "small" : "medium"} />
        </IconButton>

        {step === "payment" && (
          <>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              color="#FFFFFF"
              gutterBottom
              textAlign="center"
              sx={{
                pt: isMobile ? 0.5 : 0,
                fontSize: isMobile ? "1.1rem" : null,
              }}
            >
              Pay ₹{amount} to Join Premium
            </Typography>

            {/* Plan Selection Radio Buttons */}
            <FormControl
              component="fieldset"
              sx={{ mt: 1, mb: 2, width: "100%" }}
            >
              <FormControl
                component="fieldset"
                sx={{ mt: 1, mb: 2, width: "100%" }}
              >
                <RadioGroup
                  row
                  aria-label="plan"
                  name="plan"
                  value={selectedPlan}
                  onChange={handlePlanChange}
                  sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "center",
                    gap: isMobile ? 1 : 2,
                    marginLeft: isMobile ? 5 : 2,
                    "& .MuiTypography-root": {
                      color: "#E2E8F0",
                      fontSize: isMobile ? "0.8rem" : "0.9rem",
                    },
                  }}
                >
                  <FormControlLabel
                    value="12months"
                    control={
                      <Radio
                        sx={{
                          color: "#3B82F6",
                          "&.Mui-checked": { color: "#3B82F6" },
                        }}
                      />
                    }
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          flexWrap: isMobile ? "wrap" : "nowrap",
                        }}
                      >
                        <span>12 Months (₹17,999)</span>
                        <Chip
                          label={isMobile ? "25% OFF" : "25% OFF on 24,000"}
                          size="small"
                          sx={{
                            bgcolor: "#10B981",
                            color: "white",
                            fontSize: isMobile ? "0.55rem" : "0.6rem",
                            height: "20px",
                            "& .MuiChip-label": {
                              px: 0.5,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            },
                          }}
                        />
                      </Box>
                    }
                    sx={{
                      marginRight: 0,
                      marginLeft: isMobile ? "-9px" : 0,
                    }}
                  />
                  <FormControlLabel
                    value="3months"
                    control={
                      <Radio
                        sx={{
                          color: "#3B82F6",
                          "&.Mui-checked": { color: "#3B82F6" },
                        }}
                      />
                    }
                    label="3 Months (₹5,999)"
                    sx={{
                      marginRight: isMobile ? 0 : 13.5,
                      marginLeft:isMobile?"-8px":"-11px"
                    }}
                  />
                </RadioGroup>
              </FormControl>
            </FormControl>

            <Box sx={{ textAlign: "center", my: isMobile ? 1.5 : 3 }}>
              <Box
                sx={{
                  p: isMobile ? 1 : 2,
                  bgcolor: "white",
                  display: "inline-block",
                  borderRadius: "8px",
                }}
              >
                <QRCode
                  value={paymentLink}
                  size={isMobile ? 130 : 160}
                  fgColor="#1E40AF"
                />
              </Box>
              <Typography
                variant="body2"
                color="#94A3B8"
                mt={1}
                sx={{ fontSize: isMobile ? "0.8rem" : "1rem" }}
              >
                Scan with any UPI app
              </Typography>
            </Box>

            <Divider
              sx={{
                borderColor: "rgba(255,255,255,0.1)",
                my: isMobile ? 1.5 : 2,
                mx: isMobile ? -1.5 : -3,
              }}
            />

            <Box sx={{ mb: isMobile ? 1.5 : 3 }}>
              <Typography
                variant="subtitle2"
                color="#E2E8F0"
                gutterBottom
                sx={{ fontSize: isMobile ? "0.8rem" : "1rem" }}
              >
                Or send payment to:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "rgba(30, 41, 59, 0.5)",
                  p: isMobile ? 1 : 1.5,
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <Typography
                  sx={{
                    flexGrow: 1,
                    fontFamily: "monospace",
                    color: "#E2E8F0",
                    fontSize: isMobile ? "0.75rem" : "1rem",
                    wordBreak: "break-all",
                  }}
                >
                  {upiId}
                </Typography>
                <IconButton
                  onClick={handleCopy}
                  size={isMobile ? "small" : "medium"}
                  sx={{ color: "#3B82F6", ml: 0.5 }}
                >
                  <ContentCopyIcon fontSize={isMobile ? "small" : "medium"} />
                </IconButton>
              </Box>
              {copied && (
                <Chip
                  label="Copied!"
                  size="small"
                  sx={{
                    mt: 0.5,
                    bgcolor: "#3B82F6",
                    color: "white",
                    fontSize: "0.7rem",
                    height: "24px",
                  }}
                />
              )}
            </Box>

            <AlertProof />
          </>
        )}
      </Box>
    </Modal>
  );
};

export default PaymentModal;
