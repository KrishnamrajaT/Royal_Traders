import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  IconButton,
  CircularProgress,
  styled
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import QRCode from 'react-qr-code';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// Styled Components with Glow Effect
const ModalContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor: 'rgba(15, 23, 42, 0.9)',
  boxShadow: '0 0 0 1px rgba(148, 163, 184, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.4)',
  padding: theme.spacing(3),
  borderRadius: '16px',
  maxWidth: '500px',
  width: '90%',
  margin: '20px auto',
  outline: 'none',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(16px)',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent)',
    animation: 'rotate 6s linear infinite',
    zIndex: -1,
  },
  '@keyframes rotate': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
}));

const PaymentModal = ({ open, onClose, amount }) => {
  const [copied, setCopied] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // UPI Details
  const upiId = 'yourname@upi';
  const paymentLink = `upi://pay?pa=${upiId}&am=${amount}&tn=PaymentForService`;

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerified(true);
      setIsVerifying(false);
      setTimeout(onClose, 1500); // Close after showing success
    }, 1500);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{
        style: {
          backgroundColor: 'rgba(2, 6, 23, 0.7)',
          backdropFilter: 'blur(4px)',
        },
      }}
    >
      <ModalContent>
        {/* Glow Effect Layer */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            width: '100%',
            background: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.15), transparent 50%)',
            zIndex: -1,
          }}
        />

        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            color: '#E2E8F0',
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Content */}
        <Typography variant="h6" color="#FFFFFF" gutterBottom textAlign="center">
          Pay ₹{amount}
        </Typography>

        <Box sx={{ textAlign: 'center', my: 3 }}>
          <Box sx={{
            p: 2,
            bgcolor: 'white',
            display: 'inline-block',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}>
            {/* <QRCode 
              value={paymentLink} 
              size={160}
              fgColor="#1E40AF" // Dark blue QR code
            /> */}
          </Box>
          <Typography variant="body2" color="#94A3B8" mt={1}>
            Scan with any UPI app
          </Typography>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="#E2E8F0" gutterBottom>
            Or send payment to:
          </Typography>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'rgba(30, 41, 59, 0.5)',
            p: 1.5,
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <Typography 
              sx={{ 
                flexGrow: 1, 
                fontFamily: 'monospace',
                color: '#E2E8F0'
              }}
            >
              {upiId}
            </Typography>
            <IconButton 
              onClick={handleCopy} 
              size="small"
              sx={{ color: '#3B82F6' }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
          {copied && (
            <Typography variant="caption" color="#3B82F6" sx={{ ml: 1 }}>
              Copied to clipboard!
            </Typography>
          )}
        </Box>

        <Box>
          <Typography variant="body2" color="#94A3B8" gutterBottom>
            After payment, enter transaction ID:
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Last 4 digits of UPI transaction ID"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            sx={{ 
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255,255,255,0.2)',
                },
                '&:hover fieldset': {
                  borderColor: '#3B82F6',
                },
              },
              input: { color: '#E2E8F0' }
            }}
            InputLabelProps={{ style: { color: '#94A3B8' } }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleVerify}
            disabled={!transactionId || transactionId.length < 4 || isVerifying}
            startIcon={isVerifying ? <CircularProgress size={20} color="inherit" /> : null}
            sx={{
              background: 'linear-gradient(45deg, #2563EB 0%, #1E40AF 100%)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(45deg, #1E40AF 0%, #2563EB 100%)',
              },
              '&:disabled': {
                background: '#E5E7EB',
                color: '#9CA3AF',
              },
            }}
          >
            {isVerified ? 'Verified!' : 'Confirm Payment'}
          </Button>
        </Box>

        {isVerified && (
          <Typography color="#10B981" sx={{ mt: 2, textAlign: 'center' }}>
            Payment confirmed! You'll receive an email shortly.
          </Typography>
        )}
      </ModalContent>
    </Modal>
  );
};
export default PaymentModal