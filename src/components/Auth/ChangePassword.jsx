import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Grid,
  Link,
  Button,
  Slide,
  Alert,
} from "@mui/material";
import { LockReset, VisibilityOff, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { checkActionCode, confirmPasswordReset } from "firebase/auth";

import useInput from "../../hooks/use-input";
import useHelperText from "../../hooks/use-helper-text";
import { auth } from "../../firebase";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [isAlert, setAlert] = useState(false);
  const [isShowPassword, setShowPassword] = useState(false);
  const [searchparams] = useSearchParams();
  const {
    value: passValue,
    isValid: passIsValid,
    hasError: passHasError,
    valueChangeHandler: passChangeHandler,
    onBlurHandler: passBlurHandler,
  } = useInput((value) => value.length > 7);

  const {
    value: cpassValue,
    isValid: cpassIsValid,
    hasError: cpassHasError,
    valueChangeHandler: cpassChangeHandler,
    onBlurHandler: cpassBlurHandler,
  } = useInput((value) => value === passValue && passIsValid);

  const {
    value: passHelper,
    show: passHelperShow,
    valueChangeHandler: setPassHelper,
    showHelper: setPassHelperShow,
  } = useHelperText();

  useEffect(() => {
    checkActionCode(auth, searchparams.get("oobCode"))
      .then(() => {})
      .catch((err) => {
        navigate("/invalidLink");
        return;
      });
  }, [searchparams, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!passIsValid || !cpassIsValid) {
      passBlurHandler();
      cpassBlurHandler();
      return;
    }
    confirmPasswordReset(auth, searchparams.get("oobCode"), passValue)
      .then(() => {
        setAlert(true);
        setTimeout(() => {
          navigate("/auth");
        }, 15000);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/expired-action-code": {
            setPassHelperShow(true);
            setPassHelper("Password Reset link has been expired!!");
            break;
          }
          case "auth/user-disabled": {
            setPassHelperShow(true);
            setPassHelper("Your account has been Blocked!!");
            break;
          }
          case "auth/user-not-found": {
            setPassHelperShow(true);
            setPassHelper("Your account has been Deleted!!");
            break;
          }
          case "auth/weak-password": {
            setPassHelperShow(true);
            setPassHelper("Password should contain at least 8 characters!!");
            break;
          }
          default: {
            setPassHelperShow(true);
            setPassHelper(error.code);
            break;
          }
        }
      });
  };

  const onPassChange = (event) => {
    cpassChangeHandler(event);
    if (passHelperShow) {
      setPassHelperShow(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
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
          Your Password is Successfully Updated!!
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
            <LockReset />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <input
              type="text"
              name="email"
              autoComplete="username email"
              style={{ display: "none" }}
            />
            <TextField
              label="Password"
              type={isShowPassword ? "text" : "password"}
              required
              fullWidth
              autoComplete="current-password"
              id="password"
              name="password"
              margin="normal"
              value={passValue}
              onChange={passChangeHandler}
              onBlur={passBlurHandler}
              error={passHasError}
              helperText={
                passHasError && "Password should contain at least 8 characters"
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {isShowPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              type="password"
              required
              fullWidth
              autoComplete="current-password"
              id="cnfpassword"
              name="cnfpassword"
              margin="normal"
              value={cpassValue}
              onChange={onPassChange}
              onBlur={cpassBlurHandler}
              error={cpassHasError || passHelperShow}
              helperText={
                (cpassHasError && "Password not matched") ||
                (passHelperShow && passHelper)
              }
            />
            <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
              Reset Password
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

export default ChangePassword;
