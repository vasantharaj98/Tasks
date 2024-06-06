import React, { useEffect, useState } from 'react';
import { Box, Grid, Button, Typography, TextField, Divider } from '@mui/material';
import CustomTable from '../../components/table/Table';
import { useDispatch, useSelector } from "react-redux";
import SearchButton from '../../components/search/Search';
import BasicTabs from '../../components/tabs/Tabs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClearIcon from '@mui/icons-material/Clear';
import { createregion, getstate } from '../../slices/setting';
import { Navigate, useNavigate } from 'react-router-dom';

const Createregion = ({setLoader, show}) => {

    const [regionData, setRegiondata] = useState({
        name:""
    });

    const [zoneData, setZonedata] = useState({})

  const [zone, setZone] = useState(1);

  const dispatch = useDispatch();

  const navigate = useNavigate();



  // useEffect(()=>{
  //   setLoader(true)
  //   dispatch(getstate())
  //   .then(() => {
  //     setLoader(false);
  //   })
  //   .catch(()=>{
  //     setLoader(false);
  //   })
  // }, [])

  const arrowBack = () => {
        navigate(-1);
  };

  const addZone = () => {
      setZone(zone+1);
  }

  const removeZone = () => {
    setZone(zone-1);
}

const handleRegion = (e) => {
    e.preventDefault();
    const data = {...regionData, zones: JSON.stringify(Object.values(zoneData))};
    setLoader(true)
    dispatch(createregion(data))
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
    onSubmit={handleRegion}>
        <Grid container sx={{ paddingBottom: 2, alignItems:'center' }}>
          <Grid item xs={12} sx={{paddingTop: 0, display:'flex', alignItems:'center', gap: 2}}>
            <ArrowBackIcon onClick={arrowBack}/>
            <Typography variant='h5' sx={{fontWeight:'bold'}}>
             Create Region & Zone
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ paddingTop: 3}}>
          <TextField fullWidth id="outlined-basic" label="Region Name *" variant="outlined"
            value={regionData.name}
            onChange={(e) =>
                      setRegiondata({
                        ...regionData,
                        name: e.target.value,
                      })
                    }
           />
          <Divider  sx={{my: 2}}/>
          <Box sx={{display:'flex', flexDirection:'column', gap: 2}}>
          {Array.from(Array(zone)).map((_, index)=>{
            return(
              <Box key={index} sx={{display:'flex', alignItems:'center', gap: 2}}>
          <TextField  onChange={(e) =>
                        setZonedata({
                        ...zoneData,
                        [index] : e.target.value,
                      })} fullWidth id="outlined-basic" label={`Zone - ${index+1} *`} variant="outlined" />
          <ClearIcon onClick={removeZone} sx={{cursor:'pointer'}}/>
          </Box>
            )
          })}        
          <Button variant='text' onClick={addZone}>+ One More Zone</Button>
          <Button type='submit' size='large' variant='contained'>Create</Button>
          </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Createregion;