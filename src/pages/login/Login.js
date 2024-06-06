import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import {Navigate, useNavigate } from 'react-router-dom';

import { login, userlogin } from "../../slices/auth";
import { clearMessage } from "../../slices/message";
import login_banner from '../../assets/images/login-banner.png';
import logo from '../../assets/images/logo.png';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import OtpInput from 'react-otp-input';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 3,
  borderRadius: 2
};

const API_URL = process.env.REACT_APP_API_URL;

const Login = ({setLoader}) => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [otpopen, setotpOpen] = React.useState(false);
  const handleotpOpen = () => setotpOpen(true);
  const handleotpClose = () => setotpOpen(false);

  const [resetopen, setresetOpen] = React.useState(false);
  const handleresetOpen = () => setresetOpen(true);
  const handleresetClose = () => setresetOpen(false);

  const [value, setValue] = React.useState('Oem');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [otp, setOtp] = React.useState('');

  const [reset, setReset] = useState({
    type: "oem",
    email: "",
    otp:"",
    password:""

  });

    const navigate = useNavigate();

    const { isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);

    const dispatch = useDispatch();

    // useEffect(() => {
    //   dispatch(clearMessage());
    // }, [dispatch]);

    const [userCredentials, setUserCredentials] = useState({
        oem_id: "",
        password: "",
        user_id:""
      });
    
      const [showpassword, setShowpassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userCredentials.oem_id || !userCredentials.password || (value === "User" && !userCredentials.user_id)){
          window.alert('Please fill out all required fields.');
        } 
        else{
          setLoader(true)
          if(value === "User"){
          dispatch(userlogin(userCredentials))
          .then((response) => {
            console.log(response.data);
            navigate("/", { replace: true })
            setLoader(false);
          })
          .catch(()=>{
            setLoader(false);
          })
        } else{
          const dealerId = {oem_id: userCredentials.oem_id, password: userCredentials.password}
          dispatch(login(dealerId))
          .then((response) => {
          console.log(response.data);
          navigate("/setting", { replace: true })
          setLoader(false);
        })
        .catch(()=>{
          setLoader(false);
        })
        }
        }
      };

      const generateOTP = (e) => {
        e.preventDefault();
        if (!reset.email ){
          window.alert('Please fill out Email ID.');
        }  
        else{
          setLoader(true)
          axios.post(API_URL + 'api/forget-password/generate-otp', reset)
          .then(() => {
            setOpen(false);
            setLoader(false);
            setotpOpen(true);
            setOtp('');
          })
          .catch((error)=>{
            setLoader(false);
            window.alert(error.response.data.error);
          })
        } 
      }

      const verifyOTP = (e) => {
        e.preventDefault();
        if (!otp ){
          window.alert('Please enter OTP.');
        }  
        else{
          setLoader(true)
          axios.post(API_URL + 'api/forget-password/verify-otp', {...reset, otp: otp})
          .then(() => {
            setLoader(false);
            setotpOpen(false);
            setresetOpen(true);
          })
          .catch((error)=>{
            setLoader(false);
            window.alert(error.response.data.message);
          })
        } 
      }

      const handlePassword = (e) => {
        e.preventDefault();
        if (!reset.password ){
          window.alert('Please enter new password.');
        }  
        else{
          setLoader(true)
          axios.post(API_URL + 'api/forget-password/update', reset)
          .then(() => {
            setresetOpen(false);
            setotpOpen(false);
            setLoader(false);
          })
          .catch((error)=>{
            setLoader(false);
            window.alert(error?.response?.data?.message);
          })
        } 
      }
    
      const handleClickShowPassword = () => {
        setShowpassword(!showpassword);
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      if (isLoggedIn) {
        return <Navigate to="/" replace/>;
      }

  return (
    <Grid container sx={{height:'100vh'}}>
  <Grid item xs={6} sx={{bgcolor: `primary.light`, display:'flex', justifyContent:'center', alignItems:'center'}}>
    <img src={login_banner} alt='login_banner' width='100%' style={{objectFit:'cover', height:'100%'}}></img>
  </Grid>
  <Grid item xs={6}     sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
  <Box
    component="form"
    noValidate
    autoComplete="off"
    onSubmit={handleSubmit}>
        <Paper sx={{width: 500, p: 3, boxShadow:'none'}}>
            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', mb: 1}}>
            <img src={logo} alt='logo' width={100}></img>
            </Box>
            <Typography variant='h5' sx={{textAlign: 'center'}}>Nice to see you again</Typography>
            <Typography variant='h6' sx={{textAlign: 'start', marginBottom: 1}}>Login</Typography>
            <FormControl sx={{marginBottom: 1}}>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="Oem" control={<Radio />} label="OEM" />
        <FormControlLabel value="User" control={<Radio />} label="User" />
      </RadioGroup>
    </FormControl>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                    <TextField fullWidth id="outlined-basic" label="OEMID" variant="outlined" 
                    value={userCredentials.oem_id}
                    onChange={(e) =>
                      setUserCredentials({
                        ...userCredentials,
                        oem_id: e.target.value,
                      })
                    }
                    />
                </Grid>
                {value === "User" ?
                <Grid item xs={12}>
                    <TextField fullWidth id="outlined-basic" label="User ID" variant="outlined" 
                    value={userCredentials.user_id}
                    onChange={(e) =>
                      setUserCredentials({
                        ...userCredentials,
                        user_id: e.target.value,
                      })
                    }
                    />
                </Grid>
                : null }
                <Grid item xs={12}>
                <FormControl sx={{ width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showpassword ? "text" : "password"}
                      value={userCredentials.password}
                      onChange={(e) =>
                        setUserCredentials({
                          ...userCredentials,
                          password: e.target.value,
                        })
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showpassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>                </Grid>
                  <Grid item xs={12}>
                  <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <FormGroup>
  <FormControlLabel control={<Checkbox />} label="Remember me" />
  </FormGroup>     
  <Button onClick={handleOpen} variant='text'>Forgot Password?</Button> 
                  </Box>        
                   </Grid>
                <Grid item xs={12}>
                    <Button fullWidth type='submit' variant='contained' sx={{py: 1.5, marginTop: 2}}>Login</Button>
                </Grid>
            </Grid>
            {message && (
          <Box sx={{textAlign:'center', mt: 2}}>
              <Typography variant='p'>{message}
              </Typography>
          </Box>
      )}
        </Paper>
    </Box>
    <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Reset Password
          </Typography>
            </Grid>
            <Grid item xs={6} sx={{textAlign:'end'}}>
            <CloseIcon sx={{ cursor:'pointer'}} onClick={handleClose}/>
            </Grid>
          </Grid>
          <Divider sx={{my: 2}}/>
          <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField fullWidth id="outlined-basic" label="Enter Registered Email ID" variant="outlined" 
                    value={reset.email}
                    onChange={(e) =>
                      setReset({
                        ...reset,
                        email: e.target.value,
                      })
                    }
                    />
                </Grid>
                <Grid item xs={12}>
                   <Button onClick={generateOTP} sx={{py: 1.2}} size='large' fullWidth variant='contained'>Submit</Button>
                </Grid>
                </Grid>
        </Box>
      </Modal>
      <Modal
        open={otpopen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Verify OTP
          </Typography>
            </Grid>
            <Grid item xs={6} sx={{textAlign:'end'}}>
            <CloseIcon sx={{ cursor:'pointer'}} onClick={handleotpClose}/>
            </Grid>
          </Grid>
          <Divider sx={{my: 2}}/>
          <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={verifyOTP}
            >
          <Grid container spacing={2}>
              <Grid item xs={12}>
              <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={4}
      renderSeparator={<span> - </span>}
      renderInput={(props) => <input {...props} className='otpInput'/>}
    />
                <p style={{textAlign:'center'}}>OTP was send to your Registered Email. Please Check your Email account</p>
              </Grid>
                <Grid item xs={12}>
                   <Button type='submit' sx={{py: 1.2}} size='large' fullWidth variant='contained'>Submit</Button>
                </Grid>
                </Grid>
                </Box>
        </Box>
      </Modal>
      <Modal
        open={resetopen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Change Password
          </Typography>
            </Grid>
            <Grid item xs={6} sx={{textAlign:'end'}}>
            <CloseIcon sx={{ cursor:'pointer'}} onClick={handleresetClose}/>
            </Grid>
          </Grid>
          <Divider sx={{my: 2}}/>
          <Grid container spacing={2}>
          <Grid item xs={12}>
                    <TextField fullWidth id="outlined-basic" label="Enter New Password" variant="outlined" 
                    value={reset.password}
                    onChange={(e) =>
                      setReset({
                        ...reset,
                        password: e.target.value,
                      })
                    }
                    />
                </Grid>
                <Grid item xs={12}>
                   <Button onClick={handlePassword} sx={{py: 1.2}} size='large' fullWidth variant='contained'>Submit</Button>
                </Grid>
                </Grid>
        </Box>
      </Modal>
  </Grid>
</Grid>
  )
}

export default Login