import React, { useEffect, useState } from 'react';
import { Box, Grid, Button, Typography, TextField, Divider } from '@mui/material';
import BasicTabs from '../../components/tabs/Tabs';

const columns = [
    { id: 'r_id', label: 'Region ID', minWidth: 150, align:'start' },
    { id: 'name', label: 'Region Name', minWidth: 150, align:'start' },
    { id: 'rmanager', label: 'Region Manager', minWidth: 150, align:'center' },
    { id: 'zones', label: 'Zones', minWidth: 150, align:'center' },
    { id: 'dealers', label: 'Dealers', minWidth: 150, align:'center' },
    { id: 'created_at', label: 'Created On', minWidth: 150, align:'center' },
    { id: 'status', label: 'Status', minWidth: 150, align:'center' },
    // { id: 'action', label: 'Action', minWidth: 100, align:'end', actionType: [{edit: true, delete: true}] },
  ];

  const columns1 = [
    { id: 'user_id', label: 'User ID', minWidth: 150, align:'start' },
    { id: 'first_name', label: 'User Name', minWidth: 150, align:'start' },
    { id: 'role', label: 'User Role', minWidth: 150, align:'center' },
    { id: 'user_role', label: 'Role Cataegory', minWidth: 150, align:'center' },
    { id: 'contact', label: 'Contact', minWidth: 150, align:'center' },
    { id: 'email', label: 'Email ID', minWidth: 150, align:'center' },
    { id: 'status', label: 'Status', minWidth: 150, align:'center' },
    { id: 'action', label: 'Action', minWidth: 100, align:'end', actionType: [{edit: true, delete: true}] },
  ];
  
  const rows = [
    {rid: '01', rname: 'Cow', rmanager: 'url', zones: 'Coimbatore', dealers: 'Coimbatore', createdon: 'Coimbatore', status:'Active'},
    {rid: '01', rname: 'Cow', rmanager: 'url', zones: 'Coimbatore', dealers: 'Coimbatore', createdon: 'Coimbatore', status:'Active'},
  ];

  const rows1 = [
    {uid: '01', uname: 'Cow', urole: 'url', rolecategory: 'Coimbatore', contact: 'Coimbatore', emailid: 'Coimbatore', status:'Active'},
    {uid: '01', uname: 'Cow', urole: 'url', rolecategory: 'Coimbatore', contact: 'Coimbatore', emailid: 'Coimbatore', status:'Active'},
  ];

const Setting = ({setLoader, show}) => {

  const [user, setUser] = useState([]);

  useEffect(()=>{
    const userData = localStorage.getItem('user');
    if(userData){
      setUser(JSON.parse(userData))
    }
  }, []);

  return (
    <div className='content' style={{marginLeft: show ? '220px' : '10px'}}>
    <Box>
      <Box>
        <Grid container sx={{ paddingBottom: 2, alignItems:'center' }}>
          <Grid item xs={8} sx={{paddingTop: 0}}>
            <Typography variant='h5' sx={{fontWeight:'bold'}}>
             Settings
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box component='div'>
        <BasicTabs setLoader={setLoader} columns={columns} user={user} rows={rows} columns1={columns1} rows1={rows1}/>
      </Box>
      </Box> 
    </div>
  );
}

export default Setting;