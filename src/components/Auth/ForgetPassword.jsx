import React, { useState } from "react";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Box,
  TextField,
  Grid,
  Link,
  Button,
  Alert,
  Slide,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useNavigate } from "react-router";
import { sendPasswordResetEmail } from "firebase/auth";

import useInput from "../../hooks/use-input";
import useHelperText from "../../hooks/use-helper-text";
import { auth } from "../../firebase";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [isAlert, setAlert] = useState(false);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    onBlurHandler: emailBlurHandler,
  } = useInput((value) => value.includes("@") && value.includes("."));

  const {
    value: emailHelper,
    show: emailHelperShow,
    valueChangeHandler: setEmailHelper,
    showHelper: setEmailHelperShow,
  } = useHelperText();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!emailIsValid) {
      emailBlurHandler();
      return;
    }
    sendPasswordResetEmail(auth, emailValue)
      .then(() => {
        setAlert(true);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found": {
            setEmailHelperShow(true);
            setEmailHelper("User not found!!");
            break;
          }
          case "auth/invalid-email": {
            setEmailHelperShow(true);
            setEmailHelper("Invalid Email!!");
            break;
          }
          default: {
            setEmailHelperShow(true);
            setEmailHelper(error.code);
            break;
          }
        }
      });
  };

  const onEmailChange = (event) => {
    emailChangeHandler(event);
    if (emailHelperShow) {
      setEmailHelperShow(false);
    }
  };

  return (
    <Box sx={{ margin: 0, padding: 0, position: "relative" }}>
      <Slide in={isAlert} direction="right" mountOnEnter unmountOnExit>
        <Alert
          onClose={() => {
            setAlert(false);
          }}
          variant="filled"
          sx={{ position: "absolute", right: 0, top: -25, zIndex: 100 }}
        >
          Reset Email Sent Successfully - check it out! (check over spam folder)
        </Alert>
      </Slide>
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            marginTop: 8,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#4D4C7D" }}>
            <LockResetIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forget Password
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              label="Email Address"
              required
              fullWidth
              autoComplete="email"
              id="email"
              name="email"
              margin="normal"
              value={emailValue}
              onChange={onEmailChange}
              onBlur={emailBlurHandler}
              error={emailHasError || emailHelperShow}
              helperText={
                (emailHasError && "Enter Valid Email Address") ||
                (emailHelperShow && emailHelper)
              }
            />
            <Typography variant="body2">
              A Password Reset link will be sent to this email address.
            </Typography>
            <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
              Send Rest Link
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  component="button"
                  onClick={() => {
                    navigate("/auth");
                  }}
                  variant="body2"
                >
                  Go to Login page?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgetPassword;
