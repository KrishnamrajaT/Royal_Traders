import React, { useState, useEffect } from "react";
import {
  Modal,
  Fade,
  Box,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  styled,
  useMediaQuery,
  useTheme,
  TextField,
  FormHelperText,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useFormik } from "formik";
import * as Yup from "yup";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DescriptionIcon from "@mui/icons-material/Description";
import { color } from "framer-motion";
// Form validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Full name is required")
    .min(3, "Name must be at least 3 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
});

// Responsive Styled Components
const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #2563EB 0%, #1E40AF 100%)",
  color: "white",
  fontWeight: "bold",
  padding: theme.spacing(1.5, 3),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1, 2),
    fontSize: "0.875rem",
  },
  "&:hover": {
    background: "linear-gradient(45deg, #1E40AF 0%, #2563EB 100%)",
  },
  "&:disabled": {
    background: "#E5E7EB",
    color: "#9CA3AF",
  },
}));

const ModalContent = styled(Box)(({ theme }) => ({
  position: "relative",
  backgroundColor: "rgba(15, 23, 42, 0.9)",
  padding: theme.spacing(3),
  borderRadius: "16px",
  maxWidth: "500px",
  width: "90%",
  margin: "20px auto",
  maxHeight: "90vh",
  overflowY: "auto",
  outline: "none",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(16px)",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
    maxWidth: "95%",
    maxHeight: "85vh",
  },
}));

const CheckboxItem = styled(FormControlLabel)(({ theme }) => ({
  margin: theme.spacing(0.5, 0),
  alignItems: "center",
  "& .MuiCheckbox-root": {
    color: "#3B82F6",
    paddingTop: 0,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0.25),
      marginTop: -15,
      marginRight: 5,
    },
  },
  "& .MuiTypography-root": {
    color: "#E2E8F0",
    fontSize: "0.95rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.85rem",
      lineHeight: "1.3",
    },
  },
}));
const GoogleCheckboxItem = styled(FormControlLabel)(({ theme }) => ({
  margin: theme.spacing(0.5, 0),
  alignItems: "center",
  "& .MuiCheckbox-root": {
    color: "#3B82F6",
    paddingTop: 0,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0.25),
      marginTop: -15,
      marginRight: 5,
    },
  },
  "& .MuiTypography-root": {
    color: "#E2E8F0",
    fontSize: "0.95rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.85rem",
      lineHeight: "1.3",
      marginBottom: "13px",
    },
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    color: "#3B82F6", // Text color for input value
    "& input": {
      color: "#3B82F6", // Explicitly set input text color
    },
    "& textarea": {
      color: "#3B82F6", // For multiline inputs
    },
    "& fieldset": {
      borderColor: "#3B82F6",
    },
    "&:hover fieldset": {
      borderColor: "#3B82F6",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3B82F6",
    },
    "&.Mui-focused .MuiOutlinedInput-input": {
      color: "#3B82F6", // Focused state text color
    },
  },
  "& .MuiInputLabel-root": {
    color: "#3B82F6",
    "&.Mui-focused": {
      color: "#3B82F6", // Focused label color
    },
  },
  "& .MuiFormHelperText-root": {
    color: "#F87171",
    marginLeft: 0,
  },
  marginBottom: theme.spacing(2),
}));
const OutlineButton = styled(Button)(({ theme }) => ({
  border: "1px solid #3B82F6",
  color: "#3B82F6",
  fontWeight: "bold",
  padding: theme.spacing(1.5, 3),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1, 2),
    fontSize: "0.875rem",
  },
  "&:hover": {
    border: "1px solid #2563EB",
    background: "rgba(59, 130, 246, 0.08)",
  },
  marginBottom: theme.spacing(2),
}));

const DisclaimerForm = ({ open, onClose, onPaymentInitiated }) => {
  const whatsappNumber = "6281832839";
  const googleFormUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSeS2dqSD7hQNFiRpAH427_NA2v5H8q96vXsoVWEU8U-b_EFhQ/viewform?usp=sharing";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [formValues, setFormValues] = useState(() => {
    const saved = localStorage.getItem("disclaimerFormValues");
    return saved
      ? JSON.parse(saved)
      : {
          name: "",
          email: "",
          mobile: "",
        };
  });
  const [checkedItems, setCheckedItems] = useState(() => {
    const saved = localStorage.getItem("disclaimerFormState");
    return saved
      ? JSON.parse(saved)
      : {
          educational: false,
          noGuarantees: false,
          paperTrading: false,
          acceptRisk: false,
          agreeTerms: false,
          googleForm: false,
        };
  });
  const [step, setStep] = useState("payment");
  const [googleFormSubmitted, setGoogleFormSubmitted] = useState(false);

  const upiId = "charantejjjj77-2@okicici"; // Replace with actual UPI ID
  const amount = "5,999"; // Replace with actual amount
  useEffect(() => {
    localStorage.setItem("disclaimerFormState", JSON.stringify(checkedItems));
    localStorage.setItem("disclaimerFormValues", JSON.stringify(formValues));
  }, [checkedItems, formValues]);
  const formik = useFormik({
    initialValues: formValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (allChecked) {
        setStep("");
        localStorage.removeItem("pageState");

        openWhatsApp(values);
      }
    },
    enableReinitialize: true, // Allow form to reinitialize when initialValues change
  });

  const allChecked = Object.values(checkedItems).every(Boolean);

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  const handleGoogleFormChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      googleForm: event.target.checked,
    });
  };
  const openGoogleForm = () => {
    // Save current state before opening the form
    const formState = {
      formValues: formik.values,
      checkedItems,
      googleFormSubmitted: true,
    };
    localStorage.setItem(
      "disclaimerFormBeforeGoogle",
      JSON.stringify(formState)
    );
    localStorage.setItem("pageState", true);

    window.open(googleFormUrl, "_blank");
    setGoogleFormSubmitted(true);
  };

  const openWhatsApp = (formValues) => {
    // Create the WhatsApp message with form data
    const message =
      `Premium Group Join Request\n\n` +
      `Name: ${formValues.name}\n` +
      `Email: ${formValues.email}\n` +
      `Mobile: ${formValues.mobile}\n\n` +
      `Paid ₹${amount} to ${upiId}\n` +
      `Payment screenshot attached below`;

    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp with the message
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };
  useEffect(() => {
    setFormValues(formik.values);
  }, [formik.values]);
  useEffect(() => {
    const savedState = localStorage.getItem("disclaimerFormBeforeGoogle");
    if (savedState) {
      const { formValues, checkedItems, googleFormSubmitted } =
        JSON.parse(savedState);
      setFormValues(formValues);
      setCheckedItems(checkedItems);
      setGoogleFormSubmitted(googleFormSubmitted);
      localStorage.removeItem("disclaimerFormBeforeGoogle");
    }
  }, []);

  return (
    <Modal
      open={localStorage.getItem("pageState") || open}
      onClose={onClose}
      closeAfterTransition
      BackdropProps={{
        style: {
          backgroundColor: "rgba(2, 6, 23, 0.7)",
          backdropFilter: "blur(4px)",
        },
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: isMobile ? 1 : 2,
      }}
    >
      <Fade in={open}>
        <ModalContent>
          <div>
            {step == "payment" ? (
              <>
                {/* Glow effect */}
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

                {/* Close Button */}
                <Box
                  textAlign="end"
                  position="absolute"
                  top={15}
                  right={15}
                  sx={{ cursor: "pointer" }}
                >
                  <CloseRoundedIcon
                    onClick={onClose}
                    sx={{
                      width: isMobile ? "20px" : "30px",
                      color: "#94A3B8",
                      "&:hover": {
                        color: "#E2E8F0",
                      },
                    }}
                  />
                </Box>

                {/* Title */}
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  gutterBottom
                  fontWeight="bold"
                  color="#FFFFFF"
                  sx={{
                    textAlign: "center",
                    pt: isMobile ? 1 : 0,
                    px: isMobile ? 1 : 0,
                  }}
                >
                  Join Premium Telegram
                </Typography>

                {/* Subtitle */}
                <Typography
                  variant="body1"
                  color="#94A3B8"
                  mb={2}
                  sx={{
                    textAlign: "center",
                    fontSize: isMobile ? "0.875rem" : "1rem",
                    px: isMobile ? 1 : 0,
                  }}
                >
                  Please provide your details and acknowledge the terms
                </Typography>

                {/* Form */}
                <Box
                  component="form"
                  onSubmit={formik.handleSubmit}
                  sx={{
                    mt: 1,
                    p: isMobile ? 1 : 2,
                  }}
                >
                  {/* Name Field */}
                  <StyledTextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Full Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    size={isMobile ? "small" : "medium"}
                  />

                  {/* Email Field */}
                  <StyledTextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    size={isMobile ? "small" : "medium"}
                  />

                  {/* Mobile Field */}
                  <StyledTextField
                    fullWidth
                    id="mobile"
                    name="mobile"
                    label="Mobile Number"
                    type="tel"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.mobile && Boolean(formik.errors.mobile)
                    }
                    helperText={formik.touched.mobile && formik.errors.mobile}
                    size={isMobile ? "small" : "medium"}
                    inputProps={{
                      maxLength: 10,
                      pattern: "[0-9]{10}",
                    }}
                  />

                  {/* Divider */}
                  <Box
                    sx={{
                      my: 3,
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  />

                  {/* Terms Title */}
                  <Typography
                    variant="subtitle1"
                    color="#E2E8F0"
                    fontWeight={500}
                    mb={1}
                    sx={{
                      fontSize: isMobile ? "0.9rem" : "1rem",
                    }}
                  >
                    Terms & Conditions
                  </Typography>

                  {/* Checkbox Form */}
                  {[
                    {
                      name: "educational",
                      label:
                        "I clearly understand this program is strictly for educational purposes only",
                    },
                    {
                      name: "noGuarantees",
                      label:
                        "I will not expect guaranteed profits or signals or account handling.",
                    },
                    {
                      name: "paperTrading",
                      label:
                        "I will conduct simulated paper trading exercises for the first month",
                    },
                    {
                      name: "acceptRisk",
                      label:
                        "I accept that trading involves risk and I take full responsibility.",
                    },
                    {
                      name: "agreeTerms",
                      label:
                        "I fully agree to all the terms and disclaimers mentioned above.",
                    },
                  ].map((item) => (
                    <CheckboxItem
                      sx={{ padding: "7px 0px" }}
                      key={item.name}
                      control={
                        <Checkbox
                          checked={checkedItems[item.name]}
                          onChange={handleChange}
                          name={item.name}
                          size={isMobile ? "small" : "medium"}
                        />
                      }
                      label={item.label}
                    />
                  ))}

                  {/* Submit Button */}
                  <Box
                    sx={{
                      mt: 3,
                      textAlign: "center",
                      // display: "flex",
                      // flexDirection:'column',
                      // justifyContent: "center",
                      pb: isMobile ? 1 : 0,
                    }}
                  >
                    <OutlineButton
                      variant="outlined"
                      onClick={openGoogleForm}
                      fullWidth={isMobile}
                      startIcon={<DescriptionIcon />}
                      sx={{ mb: 2, textTransform: "none" }}
                    >
                      Fill google Form
                    </OutlineButton>
                    <br />
                    <GoogleCheckboxItem
                      sx={{ padding: "7px 0px" }}
                      control={
                        <Checkbox
                          checked={checkedItems[5]}
                          onChange={handleGoogleFormChange}
                          name={"google form"}
                          size={isMobile ? "small" : "medium"}
                        />
                      }
                      label={"I submitted google form"}
                    />
                    <GradientButton
                      type="submit"
                      variant="contained"
                      disabled={
                        !allChecked || !formik.isValid || !googleFormSubmitted
                      }
                      size={isMobile ? "small" : "large"}
                      fullWidth={isMobile}
                      startIcon={
                        <WhatsAppIcon
                          sx={{ fontSize: isMobile ? "1rem" : null }}
                        />
                      }
                      sx={{
                        maxWidth: isMobile ? "100%" : "300px",
                        textTransform: "none",
                      }}
                    >
                      Upload payment screenshot
                    </GradientButton>
                  </Box>
                </Box>
              </>
            ) : (
              <>
                <Box textAlign="center" sx={{ p: isMobile ? 1 : 2 }}>
                  <WhatsAppIcon
                    sx={{
                      fontSize: isMobile ? 40 : 60,
                      color: "#25D366",
                      mb: isMobile ? 1 : 2,
                    }}
                  />
                  <Typography
                    variant={isMobile ? "h6" : "h5"}
                    color="#FFFFFF"
                    gutterBottom
                    sx={{ fontSize: isMobile ? "1.1rem" : null }}
                  >
                    Thanks for your Info!
                  </Typography>
                  <Typography
                    color="#94A3B8"
                    sx={{
                      mb: isMobile ? 2 : 3,
                      fontSize: isMobile ? "0.8rem" : "1rem",
                      lineHeight: 1.5,
                      px: isMobile ? 0.5 : 0,
                    }}
                  >
                    You'll be added to the premium group shortly after
                    verification.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => {
                      onClose();
                      setStep("payment");
                    }}
                    size={isMobile ? "medium" : "large"}
                    sx={{
                      background:
                        "linear-gradient(45deg, #2563EB 0%, #1E40AF 100%)",
                      color: "white",
                      "&:hover": {
                        background:
                          "linear-gradient(45deg, #1E40AF 0%, #2563EB 100%)",
                      },
                      fontSize: isMobile ? "0.8rem" : "1rem",
                      py: isMobile ? 0.8 : 1.5,
                      minHeight: isMobile ? "40px" : "48px",
                    }}
                  >
                    Close
                  </Button>
                </Box>
              </>
            )}
          </div>
        </ModalContent>
      </Fade>
    </Modal>
  );
};

export default DisclaimerForm;
