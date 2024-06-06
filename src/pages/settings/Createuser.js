import React, { useEffect, useState } from 'react';
import { Box, Grid, Button, Typography, TextField, Divider, FormControl, Select, MenuItem, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import CustomTable from '../../components/table/Table';
import { useDispatch, useSelector } from "react-redux";
import SearchButton from '../../components/search/Search';
import BasicTabs from '../../components/tabs/Tabs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClearIcon from '@mui/icons-material/Clear';
import { createregion, createuser, getstate } from '../../slices/setting';
import { Navigate, useNavigate } from 'react-router-dom';

const Createuser = ({setLoader, show}) => {

  const [modules, setModules] = useState([
    {name:'Dashboard', checked: true}, 
    {name:'My Dealers', checked: true},
    {name:'Invoices', checked: true}, 
    {name:'Warranty', checked: true},
    {name:'Delivery Challan', checked: true},
    {name:'Support', checked: true},
  ])

    const [userData, setUserdata] = useState({
      role:"Sales",
      user_role:"Sales Head",
      first_name:"",
      last_name:"",
      email:"",
      contact:"",
      password:"",
      confirm_password:""
    });

  const dispatch = useDispatch();

  const navigate = useNavigate();


  const arrowBack = () => {
        navigate(-1);
  };

  const handleModule = (event, name) =>{
    const val = modules.map(va => {
      if(va.name === name){
        return {...va, checked: event.target.checked}
      }
      return va
    })
    setModules(val);
}

const handleUser = (e) => {
    e.preventDefault();
    const data = {...userData, modules: modules};
    setLoader(true)
    dispatch(createuser(data))
    .then(() => {
      navigate("/setting");
      setLoader(false);
    })
    .catch((error)=>{
      setLoader(false);
    })
  };

  return (
    <div className='content' style={{marginLeft: show ? '220px' : '10px'}}>
      <Box component="form"
    noValidate
    autoComplete="off"
    onSubmit={handleUser}>
                <Grid container spacing={3} sx={{ paddingBottom: 2, alignItems: "center" }}>
          <Grid
            item
            xs={12}
            sx={{
              paddingTop: 0,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >

            <ArrowBackIcon onClick={arrowBack} sx={{ cursor: "pointer" }} />
            <Typography variant="h5">Add User</Typography>
          </Grid>
          <Grid item xs={12} sx={{ paddingTop: 3 }}>
            <Grid container spacing={2} sx={{alignItems:'center'}}>
                <Grid item xs={2}>
                <Typography >Select Role *</Typography>
                </Grid>
                <Grid item xs={4}>
                <FormControl fullWidth size="small"  sx={{ minWidth: 80 }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userData.role}
                onChange={(e) =>
                      setUserdata({
                        ...userData,
                        role: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="Sales">
                      Sales
                    </MenuItem>
                    <MenuItem value="Accounts">Accounts</MenuItem>
                    <MenuItem value="Finance">Finance</MenuItem>
                    <MenuItem selected value="Production">
                      Production
                    </MenuItem>
                    <MenuItem value="Dispatch">Dispatch</MenuItem>
                    <MenuItem value="Service">Service</MenuItem>
                  </Select>
                </FormControl>
                </Grid>
                <Grid item xs={2}>
                <Typography >User Role *</Typography>
                </Grid>
                <Grid item xs={4}>
                <FormControl fullWidth size="small"  sx={{ minWidth: 80 }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userData.user_role}
                onChange={(e) =>
                      setUserdata({
                        ...userData,
                        user_role: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="Sales Head">
                      Sales Head
                    </MenuItem>
                    <MenuItem value="Regional Head">Regional Head</MenuItem>
                    <MenuItem value="Zonal Head">Zonal Head</MenuItem>
                  </Select>
                </FormControl>
                </Grid>
                <Grid item xs={2}>
                <Typography>First Name *</Typography>
                </Grid>
                <Grid item xs={4}>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                value={userData.first_name}
                onChange={(e) =>
                      setUserdata({
                        ...userData,
                        first_name: e.target.value,
                      })
                    }
              />
                </Grid>
                <Grid item xs={2}>
                <Typography >Last Name *</Typography>
                </Grid>
                <Grid item xs={4}>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                value={userData.last_name}
                onChange={(e) =>
                      setUserdata({
                        ...userData,
                        last_name: e.target.value,
                      })
                    }
              />
                </Grid>
                <Grid item xs={2}>
                <Typography >Email ID *</Typography>
                </Grid>
                <Grid item xs={4}>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                value={userData.email}
                onChange={(e) =>
                      setUserdata({
                        ...userData,
                        email: e.target.value,
                      })
                    }
              />
                </Grid>
                <Grid item xs={2}>
                <Typography >Contact *</Typography>
                </Grid>
                <Grid item xs={4}>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                value={userData.contact}
                onChange={(e) =>
                      setUserdata({
                        ...userData,
                        contact: e.target.value,
                      })
                    }
              />
                </Grid>
                <Grid item xs={2}>
                <Typography >Password *</Typography>
                </Grid>
                <Grid item xs={4}>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                value={userData.password}
                onChange={(e) =>
                      setUserdata({
                        ...userData,
                        password: e.target.value,
                      })
                    }
              />
                </Grid>
                <Grid item xs={2}>
                <Typography >Confirm Password *</Typography>
                </Grid>
                <Grid item xs={4}>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                value={userData.confirm_password}
                onChange={(e) =>
                      setUserdata({
                        ...userData,
                        confirm_password: e.target.value,
                      })
                    }
              />
                </Grid>
                <Grid item xs={12}>
                <Typography variant='h6'>Modules</Typography>
                <FormGroup sx={{mt: 2}}>
                {modules.map((va, index)=>{
                  return(
                    <FormControlLabel onChange={(event)=>handleModule(event, va.name)} key={index} control={<Checkbox checked={va.checked} />} label={va.name} />    
                  )
                })}
                </FormGroup>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{mt: 2}}>
                <Grid item xs={12} sx={{textAlign:'end'}}>
                  <Button sx={{mr: 2}} variant="outlined">Cancel</Button>
                  <Button type="submit" variant="contained">Create New User</Button>
                </Grid>
            </Grid>
      </Box>
    </div>
  );
}

export default Createuser;