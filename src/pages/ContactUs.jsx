import React, { useState } from 'react';
import { Container, TextField, Button, Box } from '@mui/material';
import useInput from '../hooks/useInput';
import { isUndefined, isEmptyOrWhiteSpace, isValidEmail } from '../utils/utils';

import 'react-spring-bottom-sheet/dist/style.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

export default () => {
  const { value: email, onChange: onEmailChange } = useInput('');
  const { value: message, onChange: onMessageChange } = useInput('');

  const [inputErrors, setInputErrors] = useState({
    email: undefined,
    password: undefined,
  });
  const [errorMessage, setErrorMessage] = useState(undefined);

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
          return 'Password is required';
        }

        return undefined;
      })(),
    };

    setInputErrors(newInputErrors);

    return isUndefined(newInputErrors.email) && isUndefined(newInputErrors.password);
  };

  const handleSendClick = async () => {
    try {
      // if (!validateInputs()) {
      // }
      // addToast(translate('admin.requests.brands.update.success'), {
      //   appearance: 'success',
      //   autoDismiss: true,
      //   pauseOnHover: false,
      // });
    } catch {
      // addToast(translate('admin.requests.brands.update.failed'), {
      //   appearance: 'error',
      //   autoDismiss: true,
      //   pauseOnHover: false,
      // });
    }
  };

  return (
    <Container>
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
    </Container>
  );
};
