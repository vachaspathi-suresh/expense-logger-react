import React, { useState } from "react";
import {
  Container,
  Paper,
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Link,
  Avatar,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  LoginRounded,
  LockOutlined,
  VisibilityOff,
  Visibility,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { set, ref } from "firebase/database";

import useInput from "../../hooks/use-input";
import { auth, db } from "../../firebase";

const Login = () => {
  const navigate = useNavigate();
  const [isSignin, setIsSignin] = useState(true);
  const [isShowPassword, setShowPassword] = useState(false);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    onBlurHandler: emailBlurHandler,
  } = useInput((value) => value.includes("@") && value.includes("."));

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
    value: fnValue,
    isValid: fnIsValid,
    hasError: fnHasError,
    valueChangeHandler: fnChangeHandler,
    onBlurHandler: fnBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: lnValue,
    isValid: lnIsValid,
    hasError: lnHasError,
    valueChangeHandler: lnChangeHandler,
    onBlurHandler: lnBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isSignin && (!cpassIsValid || !fnIsValid || !lnIsValid)) {
      emailBlurHandler();
      passBlurHandler();
      cpassBlurHandler();
      fnBlurHandler();
      lnBlurHandler();
      return;
    }

    if (!emailIsValid || !passIsValid) {
      emailBlurHandler();
      passBlurHandler();
      return;
    }

    const data = new FormData(event.currentTarget);
    if (isSignin) {
      try {
        signInWithEmailAndPassword(
          auth,
          data.get("email"),
          data.get("password")
        )
          .then(() => {
            navigate("/expenses");
          })
          .catch((error) => {
            console.log(error.code + " --- " + error.message);
          });
      } catch (error) {
        console.log(error.code);
      }
    } else {
      createUserWithEmailAndPassword(
        auth,
        data.get("email"),
        data.get("password")
      )
        .then(() => {
          set(ref(db, `/${auth.currentUser.uid}/userData`), {
            fname: data.get("firstname"),
            lname: data.get("lastname"),
          });
          navigate("/expenses");
        })
        .catch((error) => {
          console.log(error.code);
        });
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
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
          {isSignin ? <LoginRounded /> : <LockOutlined />}
        </Avatar>
        <Typography component="h1" variant="h5">
          {`Sign ${isSignin ? "In" : "Up"}`}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {!isSignin && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  required
                  autoComplete="given-name"
                  id="firstname"
                  name="firstname"
                  margin="normal"
                  value={fnValue}
                  onChange={fnChangeHandler}
                  onBlur={fnBlurHandler}
                  error={fnHasError}
                  helperText={fnHasError && "Field can't be empty"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  required
                  autoComplete="family-name"
                  id="lastname"
                  name="lastname"
                  margin="normal"
                  value={lnValue}
                  onChange={lnChangeHandler}
                  onBlur={lnBlurHandler}
                  error={lnHasError}
                  helperText={lnHasError && "Field can't be empty"}
                />
              </Grid>
            </Grid>
          )}
          <TextField
            label="Email Address"
            required
            fullWidth
            autoComplete="email"
            id="email"
            name="email"
            margin="normal"
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            error={emailHasError}
            helperText={emailHasError && "Enter Valid Email Address"}
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
          {!isSignin && (
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
              onChange={cpassChangeHandler}
              onBlur={cpassBlurHandler}
              error={cpassHasError}
              helperText={cpassHasError && "Password not matched"}
            />
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
            {`Sign ${isSignin ? "In" : "Up"}`}
          </Button>
          {isSignin ? (
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forget Password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component="button"
                  onClick={() => {
                    setIsSignin(false);
                  }}
                  variant="body2"
                >
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          ) : (
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  component="button"
                  onClick={() => {
                    setIsSignin(true);
                  }}
                  variant="body2"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
