import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CustomTable from "../table/Table2";
import "./Tabs.css";
import { Button, Card, CardContent, Divider, Grid } from "@mui/material";
import SearchButton from "../search/Search";
import logo from "../../assets/images/logo.png";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import { createstate, getregion, getstate, getuser } from "../../slices/setting";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';

import Modal from '@mui/material/Modal';
import CloudUpload from "../button/Cloudupload";
import { getoembyid, updateoem } from "../../slices/oem";
import Popup from "../popup/Popup";
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import OtpInput from 'react-otp-input';

const API_URL = process.env.REACT_APP_API_URL;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const states =
[
  "All States",
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
]

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ columns, rows, columns1, user, setLoader}) {

  const [profileopen, setProfileOpen] = React.useState(false);
  const handleClose = () => setProfileOpen(false);

  const [open, setOpen] = React.useState(false);
  const [modalte, setModalte] = React.useState(null);

  const [emailopen, setEmailOpen] = React.useState(false);
  const handleemailOpen = () => setEmailOpen(true);
  const handleemailClose = () => setEmailOpen(false);

  const [otpopen, setotpOpen] = React.useState(false);
  const handleotpOpen = () => setotpOpen(true);
  const handleotpClose = () => setotpOpen(false);

  const [resetopen, setresetOpen] = React.useState(false);
  const handleresetOpen = () => setresetOpen(true);
  const handleresetClose = () => setresetOpen(false);

  
  const [otp, setOtp] = React.useState('');

  const [reset, setReset] = React.useState({
    type: "oem",
    email: "",
    otp:"",
    password:""

  });

  const dispatch = useDispatch();

  const settingData = useSelector((state) => state.setting);

  const {message: message} = useSelector((state) => state.setting);

  React.useEffect(()=>{
    if(message){
          setOpen(true);
          setModalte(message);
    }
  },[message]);

  const {oem: oemData} = useSelector((state) => state.oem);

  const [file, setFile] = React.useState(oemData?.logo_url);

  const handleOpen = () =>{
    setProfileOpen(true);
    setFile(oemData?.logo_url)
  }


  const [value, setValue] = React.useState(0);

  const [state, setState] = React.useState([]);

  const [region, setRegion] = React.useState([]);

  const [users, setUsers] = React.useState([]);

   const regionUpData = region?.map((va)=>{
    return{
      ...va,
      zones: (JSON.parse(va.zones)).map(obj => obj).join(', '),
      created_at: `${(new Date(va.created_at)).getDate()} / ${(new Date(va.created_at)).getMonth()+1} / ${(new Date(va.created_at)).getFullYear()}`,
      status:'Active'
    }
  });

  const userUpData = users?.map((va)=>{
    return{
      ...va,
      created_at: `${(new Date(va.created_at)).getDate()} / ${(new Date(va.created_at)).getMonth()+1} / ${(new Date(va.created_at)).getFullYear()}`,
      status:'Active'
    }
  });

  console.log(settingData.message);

  React.useEffect(()=>{
    if(settingData){
          setState(settingData.state);
          setRegion(settingData.region);
          setUsers(settingData.user);
    }
  },[settingData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleStateSubmit = (e) => {
    e.preventDefault();
    setLoader(true)
    dispatch(createstate({"oem_id": user.oem_id, "states": JSON.stringify(state)}))
    .then(() => {
      setLoader(false);
    })
    .catch(()=>{
      setLoader(false);
    })
  };

  const handleProfile = (e) => {
    e.preventDefault();
    const formData = {logo_url: file};
    const oem_id = oemData.oem_id
    setLoader(true)

    dispatch(updateoem({oem_id, formData}))
    .then(() => {
      setLoader(false);
      setProfileOpen(false)
    })
    .catch(()=>{
      setLoader(false);
    })
  };

  const handleSelectAll = (event) => {
    setState(states.filter( va => va !== "All States").map(option => option));
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
        setEmailOpen(false);
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

  return (
    <Box sx={{ width: "100%" }}>
        <Popup open={open} modalte={modalte} setOpen={setOpen}/>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Profile" {...a11yProps(0)} sx={{fontWeight:'bold'}}/>
          <Tab label="Operating STates" {...a11yProps(1)} sx={{fontWeight:'bold'}}/>
          <Tab label="User Management" {...a11yProps(2)} sx={{fontWeight:'bold'}}/>
          <Tab label="Regions & Zones" {...a11yProps(3)} sx={{fontWeight:'bold'}}/>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Card sx={{ boxShadow: "none", border: "1px solid #bababa" }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6">Profile ID : {user.oem_id}</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "end" }}>
                <Typography variant="p" color="primary">
                  *** For edit your details, Please contact DMS Admin ***
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ bgcolor: "#eef8ff", py: 4, px: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <img src={logo} alt="logo" width={100}></img>
                      <Button variant="contained" onClick={handleOpen} sx={{minWidth: 0}}><EditIcon/></Button>
                      <Modal
  open={profileopen}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <CloudUpload setLoader={setLoader} file={file} setFile={setFile}/>
    <Box sx={{display:'flex', justifyContent:'end', alignItems:'center', gap: 1, mt: 2}}>
    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
    <Button variant="contained" onClick={handleProfile} >Confirm</Button>
    </Box>
  </Box>
</Modal>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        Organization
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        GST No
                      </Typography>
                      <Typography variant="body1">Created On</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        sx={{ mb: 2, fontWeight: "bold" }}
                      >
                        Ola
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ mb: 2, fontWeight: "bold" }}
                      >
                        AVHPV76765567
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                       16 Oct 2024
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        color: "success",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ color: "#4caf50", fontWeight: "bold" }}
                      >
                        In Live
                      </Typography>{" "}
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ py: 3 }}>
                  <Grid container columnSpacing={2}>
                    <Grid item xs={2}>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        Country
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        State
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        Location
                      </Typography>
                      <Typography variant="body1">Address</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        variant="body1"
                        sx={{ mb: 2, fontWeight: "bold" }}
                      >
                        India
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ mb: 2, fontWeight: "bold" }}
                      >
                        Karnataka
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ mb: 2, fontWeight: "bold" }}
                      >
                        Bangalore
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Bangalore
                      </Typography>
                    </Grid>
                    <Divider orientation="vertical" variant="middle" flexItem />{" "}
                    <Grid item xs={2}>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        Currency
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        Tax ID (GST)
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        Language
                      </Typography>
                      <Typography variant="body1">Time Zone</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        variant="body1"
                        sx={{ mb: 2, fontWeight: "bold" }}
                      >
                        Rupees
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ mb: 2, fontWeight: "bold" }}
                      >
                        HUG6565656
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ mb: 2, fontWeight: "bold" }}
                      >
                        EN
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Kolakata
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Divider variant="middle" />
                <Box sx={{ pt: 3 }}>
                  <Grid container columnSpacing={2}>
                    <Grid item xs={2}>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        Role:
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        variant="body1"
                        sx={{ mb: 2, fontWeight: "bold" }}
                      >
                        Admin
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        User ID:
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        variant="body1"
                        sx={{ mb: 2, fontWeight: "bold" }}
                      >
                        ola@gmail.com or OEM00001
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                    <Button onClick={handleemailOpen} variant="text">
                    Change Password
                    </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Modal
        open={emailopen}
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
            <CloseIcon sx={{ cursor:'pointer'}} onClick={handleemailClose}/>
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
              <Grid item xs={12} sx={{textAlign:'center'}}>
              <OtpInput 
              style={{justifyContent:'center'}}
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
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Card sx={{ boxShadow: "none", border: "1px solid #bababa" }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6">Operating States:</Typography>
                <Typography variant="body1" sx={{ py: 2 }}>
                  Select states where you are operating on..
                </Typography>
                <Box
    component="form"
    noValidate
    autoComplete="off"
    onSubmit={handleStateSubmit}>
                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={states}
                  disableCloseOnSelect
                  onChange={(e, values)=>{
                    console.log(e.target.value)
                    const lastValue = values[values.length - 1];
                    if(lastValue === "All States"){
                      handleSelectAll(e);
                    }
                    else{
                      setState(values)
                    }
                  }}
                  value={state || []}
                  getOptionLabel={(option) => option}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option}
                    </li>
                  )}
                  style={{ width: 500 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select States"
                      placeholder="States"
                    />
                  )}
                />
                <Button type="submit" size="large" variant="contained" sx={{mt: 2}}>Update States</Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <Box>
          <Grid container sx={{ paddingBottom: 2, alignItems: "center" }}>
          <Grid item xs={6} sx={{ paddingTop: 0 }}>
              <Typography variant="h6">Staff Management</Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "end", paddingTop: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                <SearchButton placeholder="Search Here" />
                <Link to='/setting/createuser'>
                <Button variant="contained">+ Create User</Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
        <CustomTable setLoader={setLoader} columns={columns1} rows={userUpData} />
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Box>
          <Grid container sx={{ paddingBottom: 2, alignItems: "center" }}>
          <Grid item xs={6} sx={{ paddingTop: 0 }}>
              <Typography variant="h6">Operating Region & Zones</Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "end", paddingTop: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                <SearchButton placeholder="Search Here" />
                <Link to='/setting/createregion'>
                <Button variant="contained">Create Region & Zone</Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <CustomTable columns={columns} rows={regionUpData} />
        </Box>
      </CustomTabPanel>
    </Box>
  );
}
