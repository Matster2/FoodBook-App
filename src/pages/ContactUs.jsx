import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import useInput from '../hooks/useInput';
import { isUndefined, isEmptyOrWhiteSpace, isValidEmail } from '../utils/utils';
import useAPI from '../hooks/useAPI';
import Header from '../components/Header';

import 'react-spring-bottom-sheet/dist/style.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

export default () => {
  const navigate = useNavigate();

  const api = useAPI();

  const { value: email, onChange: onEmailChange } = useInput('');
  const { value: message, onChange: onMessageChange } = useInput('');

  const [inputErrors, setInputErrors] = useState({
    email: undefined,
    password: undefined,
  });
  const [errorMessage, setErrorMessage] = useState(undefined);

  const [messageSent, setMessageSent] = useState(false);

  const clearErrors = () => {
    setInputErrors({
      email: undefined,
      message: undefined,
    });
    setErrorMessage(undefined);
  };

  const validateInputs = () => {
    const newInputErrors = {
      email: (() => {
        if (isEmptyOrWhiteSpace(email)) {
          return 'Email is required';
        }

        if (!isValidEmail(email)) {
          return 'Invalid email';
        }

        return undefined;
      })(),
      message: (() => {
        if (isEmptyOrWhiteSpace(message)) {
          return 'Message is required';
        }

        return undefined;
      })(),
    };

    setInputErrors(newInputErrors);

    return isUndefined(newInputErrors.email) && isUndefined(newInputErrors.password);
  };

  const handleSendClick = async () => {
    try {
      if (!validateInputs()) {
        return;
      }

      await api.contactUs(email, message);
      setMessageSent(true);
      toast.success('Message sent');
    } catch {
      toast.error('Unable to send message. \n Please try again later');
    }
  };
  return (
    <Container>
      <Header title="Contact Us" onBackClick={() => navigate(-1)} />

      {messageSent && (
        <Box textAlign="center" sx={{ marginTop: '30%' }}>
          <Typography>Thank you for your message</Typography>

          <Button
            variant="contained"
            sx={{ mt: 4 }}
            onClick={() => {
              navigate('/');
            }}
          >
            Continue Cooking!
          </Button>
        </Box>
      )}

      {!messageSent && (
        <Box>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={onEmailChange}
            error={!isUndefined(inputErrors.email)}
            helperText={inputErrors.email}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="message"
            label="Message"
            multiline
            rows={5}
            maxRows={5}
            value={message}
            onChange={onMessageChange}
            error={!isUndefined(inputErrors.message)}
            helperText={inputErrors.message}
          />
          <Button
            type="button"
            onClick={handleSendClick}
            disabled={isEmptyOrWhiteSpace(email) || isEmptyOrWhiteSpace(message)}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send
          </Button>
        </Box>
      )}
    </Container>
  );
};
