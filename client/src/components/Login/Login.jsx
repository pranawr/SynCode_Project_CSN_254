import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom'
import { useSnackbar } from 'notistack';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        SynCode
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  myclass:{
    paddingTop: theme.spacing(8),
    paddingLeft:"0",
    paddingRight:"0"
  },
  paper: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
    const classes = useStyles();

  	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [passwordShown, setPasswordShown] = useState(false);

    const showPassword = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const [user, setUser] = useState({
        userName: "",
        password: ""
    });

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        
        setUser({...user, [name]: value});
    }

    const history = useHistory();

    const postDataLogin = async (e) => {
        e.preventDefault();

        const { userName, password } = user;
        console.log(user);
        console.log(userName);
        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName, password
            })
        })

        console.log("Hello")

        const data = await res.json();
        console.log(res);
        console.log(data);
        if (res.status===422 || res.status===400 || !data) {
          enqueueSnackbar('Invalid Credentials', {
            variant: "error"
          })
            console.log("Invalid Credentials");
        }
        else {
          enqueueSnackbar('Logged in successfully', {
            variant: "success"
          })
            console.log("Logged In Successfull");

            history.push("/");
        }
    }


  return (
    <Container component="main" maxWidth="xs" >
      <div className={`${classes.myclass}`}>
      <div className="mt-2 p-0 px-2 pb-2 bg-light w-100 pt-4" style={{borderRadius:"10px"}}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="userName"
                variant="outlined"
                required
                fullWidth
                value={user.name}
                id="currUsername"
                label="Username"
                onChange={handleInputs}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                value={user.password}
                onChange={handleInputs}
                label="Password"
                type={passwordShown ? "text" : "password"}
                id="currPassword"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" onClick={showPassword}/>}
                label="Show Password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={postDataLogin}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                    Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      </div>
      </div>
    </Container>
  )};