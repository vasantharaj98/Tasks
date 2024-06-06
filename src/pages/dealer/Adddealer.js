import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  TextField,
  Divider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Autocomplete,
  Card,
} from "@mui/material";
import CustomTable from "../../components/table/Table";
import Adddealer from "./Adddealer";
import { useDispatch, useSelector } from "react-redux";
import SearchButton from "../../components/search/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUpload from "../../components/button/Cloudupload";
import { Link, useNavigate } from "react-router-dom";
import { createdealer } from "../../slices/dealer";
import { getregion, getstate } from "../../slices/setting";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

const AddDealer = ({ setLoader, show }) => {

  const user = JSON.parse(localStorage.getItem('user'));

  const [moreno, setMoreno] = React.useState(1);

  const [file, setFile] = useState(null);

  const [file1, setFile1] = useState(null);

  const [doc, setDoc] = useState([]);

  const [zones, setZones] = useState([]);

  const moreData = {
    field_id: 0,
    salutation: "",
    name: "",
    designation: "",
    email: "",
    phone_number: ""
  }

  const [dealerdata, setDealerdata] = useState({
    user_type:"Dealer",
    oem_id:user?.oem_id,
    first_name:"",
    last_name:"",
    organization_name:"",
    display_name:"",
    gst_no:"",
    email:"",
    region:"",
    zone:"",
    logo_url:file,
    contact:"",
    billing_address:"",
    shipping_address:"",
    bank_details:"",
    password:"",
    documents:"",
    contact_person:[moreData]
  })

  const [billing, setBilling] = useState({
    country:"India",
    state:"",
    address:"",
    city:"",
    pincode:""
  })

  const [shipping, setShipping] = useState({
    country:"India",
    state:"",
    address:"",
    city:"",
    pincode:""
  })

  const [bank, setBank] = useState({
    account_type:"Saving",
    benef_name:"",
    bank_name:"",
    acc_no:"",
    racc_no:"",
    ifsc:""
  })

  useEffect(()=>{
    if(file){
      setDealerdata({...dealerdata, logo_url: file})
    }
  },[file])

  useEffect(()=>{
    if(file1){
      doc.push(file1)
    }
    setFile1(null)
  },[file1])

  const handleDoc = (ab) =>{
    const filDoc = doc.filter((tz)=> tz !== ab );
    setDoc(filDoc);
  }

  const copyAddress =()=>{
    setShipping(billing)
  }

  const handleFieldChange = (name, field_id, event) => {
    const newValue = event.target.value;
    setDealerdata({ ...dealerdata, contact_person: dealerdata.contact_person.map(item1=>{
            if (item1.field_id === field_id) {
              return { ...item1, [name]: newValue };
            }
            return item1;
          })
  })
}

  const addMoreDetails = () => {
    dealerdata.contact_person.push({...moreData, field_id:moreno}) 
    setMoreno(moreno+1);
  }

  const removeField = ( field_id) =>{
    setMoreno(moreno-1);
    setDealerdata( { ...dealerdata, contact_person: dealerdata.contact_person.filter(item1=>{
              return (item1.field_id !== field_id) ;
          })
      });
    };

  const settingData = useSelector((state) => state.setting) || [];

  const regionData = settingData.region?.map((va)=>{return va.name});

  console.log(settingData.state);

  const handleRegion = (e) => {
                      setDealerdata({
                        ...dealerdata,
                        region: e.target.value,
                      })
                      const zoneData = settingData.region?.filter((va)=>{return va.name === e.target.value});
                      setZones(JSON.parse(zoneData[0].zones));
  }


  const dispatch = useDispatch();

  const navigate = useNavigate();


  const arrowBack = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoader(true)

    dispatch(createdealer({...dealerdata, billing_address: JSON.stringify(billing), shipping_address:JSON.stringify(shipping), bank_details:JSON.stringify(bank), documents: JSON.stringify(doc), contact_person: JSON.stringify(dealerdata.contact_person)}))
    .then(() => {
      navigate("/dealer");
      setLoader(false);
    })
    .catch(()=>{
      setLoader(false);
    })
  };

  return (
    <div className="content" style={{ marginLeft: show ? "220px" : "10px" }}>
      <Box  component="form"
    noValidate
    autoComplete="off"
    onSubmit={handleSubmit}>
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
            <Typography variant="h5"  sx={{fontWeight:'bold'}}>Add New Dealer</Typography>
          </Grid>
          <Grid item xs={6} sx={{ paddingTop: 3 }}>
            <Grid container spacing={2} sx={{alignItems:'center'}}>
                <Grid item xs={4}>
                <Typography >User Type *</Typography>
                </Grid>
                <Grid item xs={8}>
                <FormControl fullWidth>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={dealerdata.user_type}
                onChange={(e) =>
                      setDealerdata({
                        ...dealerdata,
                        user_type: e.target.value,
                      })
                    }
                >
                  <FormControlLabel
                    value="Dealer"
                    control={<Radio />}
                    label="Dealer"
                  />
                  <FormControlLabel
                    value="Distributor"
                    control={<Radio />}
                    label="Distributor"
                  />
                </RadioGroup>
              </FormControl>
                </Grid>
                <Grid item xs={4}>
                <Typography >Dealer Name *</Typography>
                </Grid>
                <Grid item xs={8}>
                <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 1
                }}
              >
                <FormControl size="small"  sx={{ minWidth: 80 }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value="Mr"
                    // onChange={handleChange}
                  >
                    <MenuItem selected value="Mr">
                      Mr
                    </MenuItem>
                    <MenuItem value="Miss">Miss</MenuItem>
                    <MenuItem value="Mrs">Mrs</MenuItem>
                  </Select>
                </FormControl>{" "}
                <TextField
                   size="small"
                  fullWidth
                  id="outlined-basic"
                  placeholder="First Name"
                  variant="outlined"
                  value={dealerdata.first_name}
                onChange={(e) =>
                      setDealerdata({
                        ...dealerdata,
                        first_name: e.target.value,
                      })
                    }
                />
                <TextField
                   size="small"
                  fullWidth
                  id="outlined-basic"
                  placeholder="Last Name"
                  variant="outlined"
                  value={dealerdata.last_name}
                  onChange={(e) =>
                      setDealerdata({
                        ...dealerdata,
                        last_name: e.target.value,
                      })
                    }
                />
              </Box>
                </Grid>
                <Grid item xs={4}>
                <Typography>Organization *</Typography>
                </Grid>
                <Grid item xs={8}>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                placeholder="Enter Organization Name"
                variant="outlined"
                value={dealerdata.organization_name}
                onChange={(e) =>
                      setDealerdata({
                        ...dealerdata,
                        organization_name: e.target.value,
                      })
                    }
              />
                </Grid>
                <Grid item xs={4}>
                <Typography >Org Display Name *</Typography>
                </Grid>
                <Grid item xs={8}>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                placeholder="Enter Org Display Name"
                variant="outlined"
                value={dealerdata.display_name}
                onChange={(e) =>
                      setDealerdata({
                        ...dealerdata,
                        display_name: e.target.value,
                      })
                    }
              />
                </Grid>
                <Grid item xs={4}>
                <Typography >GST No *</Typography>
                </Grid>
                <Grid item xs={8}>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                placeholder="GST988767567"
                variant="outlined"
                value={dealerdata.gst_no}
                onChange={(e) =>
                      setDealerdata({
                        ...dealerdata,
                        gst_no: e.target.value,
                      })
                    }
              />
                </Grid>
                <Grid item xs={4}>
                <Typography >Org Email ID *</Typography>
                </Grid>
                <Grid item xs={8}>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                placeholder="test@gmail.com"
                variant="outlined"
                value={dealerdata.email}
                onChange={(e) =>
                      setDealerdata({
                        ...dealerdata,
                        email: e.target.value,
                      })
                    }
              />
                </Grid>
                <Grid item xs={4}>
                <Typography >Org Contact *</Typography>
                </Grid>
                <Grid item xs={8}>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                placeholder="Enter Contact Number"
                variant="outlined"
                value={dealerdata.contact}
                onChange={(e) =>
                      setDealerdata({
                        ...dealerdata,
                        contact: e.target.value,
                      })
                    }
              />
                </Grid>
                <Grid item xs={4}>
                <Typography >Select Region *</Typography>
                </Grid>
                <Grid item xs={8}>
                <FormControl size="small" fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dealerdata.region}
                onChange={handleRegion}
        >
        {regionData.map((va, index)=>{
          return(
            <MenuItem key={index} value={va}>{va}</MenuItem>
          )
        })}
        </Select>
      </FormControl>
                </Grid>
                <Grid item xs={4}>
                <Typography >Select Zone *</Typography>
                </Grid>
                <Grid item xs={8}>
                <FormControl size="small" fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dealerdata.zone}
                onChange={(e) =>
                      setDealerdata({
                        ...dealerdata,
                        zone: e.target.value,
                      })
                    }
        >
        {zones.map((va, index)=>{
          return(
            <MenuItem key={index} value={va}>{va}</MenuItem>
          )
        })}        </Select>
      </FormControl>
                </Grid>
                <Grid item xs={4}>
                <Typography >Password *</Typography>
                </Grid>
                <Grid item xs={8}>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                placeholder="Enter Password"
                variant="outlined"
                value={dealerdata.password}
                onChange={(e) =>
                      setDealerdata({
                        ...dealerdata,
                        password: e.target.value,
                      })
                    }
              />
                </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
          <Box>
          <Typography variant="h6">Organization Logo</Typography>
          <CloudUpload setLoader={setLoader} file={dealerdata?.logo_url} setFile={setFile}/>
          <Typography sx={{my: 2}}>This logo will be displayed in transaction PDFs and email notifications.</Typography>
          <Typography color='light' sx={{my: 2}}>Preferred Image Dimensions: 240 x 240 pixels @ 72 DPI Maximum File Size: 1MB</Typography>
          </Box>
          <Box>
          <Typography variant="h6">Documents</Typography>
          <CloudUpload setLoader={setLoader} file={file1} setFile={setFile1}/>
          <Box sx={{mt: 2, display:'flex', alignItems:'center', gap: 2}}>
          {doc.map((ab, index)=>{
            return(
              <Box sx={{position:'relative'}}>
              <HighlightOffOutlinedIcon onClick={()=> handleDoc(ab)} sx={{position:'absolute', right: 0, top: 0, fontSize: 20, color: 'red'}}/>
              <img key={index} src={ab} width={100}/>
              </Box>
            )
          })}
          </Box>
          </Box>
          </Grid>
        </Grid>
        <Grid container columnSpacing={5} sx={{mt: 2}}>
                  <Grid item xs={6}>
                  <Grid container spacing={2} sx={{ alignItems:'center'}}>
                  <Grid item xs={12}>
                <Typography variant="h6">Billing Address</Typography>
                </Grid>
                <Grid item xs={4}>
                <Typography >Country/Region *</Typography>
                </Grid>
                <Grid item xs={8}>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                value={billing.country}
                onChange={(e) =>
                      setBilling({
                        ...billing,
                        country: e.target.value,
                      })
                    }
                InputProps={{
            readOnly: true,
          }}
              />
                </Grid>
                <Grid item xs={4}>
                <Typography >State *</Typography>
                </Grid>
                <Grid item xs={8}>
                <Autocomplete size="small"
  disablePortal
  id="combo-box-demo"
  options={settingData?.state || []}
  value={billing?.state}
                onChange={(e, value) =>
                      setBilling({
                        ...billing,
                        state: value,
                      })
                    }
  renderInput={(params) => <TextField placeholder="Select State" {...params}  />}
/>
                </Grid>
                <Grid item xs={4}>
                <Typography >Address *</Typography>
                </Grid>
                <Grid item xs={8}>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                value={billing.address}
                onChange={(e) =>
                      setBilling({
                        ...billing,
                        address: e.target.value,
                      })
                    }
              />
                </Grid>
                <Grid item xs={4}>
                <Typography >City *</Typography>
                </Grid>
                <Grid item xs={8}>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                value={billing.city}
                onChange={(e) =>
                      setBilling({
                        ...billing,
                        city: e.target.value,
                      })
                    }
              />
                </Grid>
                <Grid item xs={4}>
                <Typography >Pincode *</Typography>
                </Grid>
                <Grid item xs={8}>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                value={billing.pincode}
                onChange={(e) =>
                      setBilling({
                        ...billing,
                        pincode: e.target.value,
                      })
                    }
              />
                </Grid>
                  </Grid>
            </Grid>
            <Grid item xs={6}>
                  <Grid container spacing={2} sx={{ alignItems:'center'}}>
                  <Grid item xs={12}>
                <Typography variant="h6">Shipping Address, <span onClick={copyAddress} style={{fontSize: '14px', color:'red', cursor:'pointer'}}>Copy Billing address here</span></Typography>
                </Grid>
                <Grid item xs={4}>
                <Typography >Country/Region *</Typography>
                </Grid>
                <Grid item xs={8}>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                value={shipping.country}
                onChange={(e) =>
                      setShipping({
                        ...shipping,
                        country: e.target.value,
                      })
                    }
                InputProps={{
            readOnly: true,
          }}
              />
                </Grid>
                <Grid item xs={4}>
                <Typography >State *</Typography>
                </Grid>
                <Grid item xs={8}>
                <Autocomplete size="small"
  disablePortal
  id="combo-box-demo"
  options={settingData?.state || []}
  value={shipping?.state}
                onChange={(e, value) =>
                      setShipping({
                        ...shipping,
                        state: value,
                      })
                    }
  renderInput={(params) => <TextField placeholder="Select State" {...params}  />}
/>
                </Grid>
                <Grid item xs={4}>
                <Typography >Address *</Typography>
                </Grid>
                <Grid item xs={8}>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                value={shipping.address}
                onChange={(e) =>
                      setShipping({
                        ...shipping,
                        address: e.target.value,
                      })
                    }
              />
                </Grid>
                <Grid item xs={4}>
                <Typography >City *</Typography>
                </Grid>
                <Grid item xs={8}>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                value={shipping.city}
                onChange={(e) =>
                      setShipping({
                        ...shipping,
                        city: e.target.value,
                      })
                    }
              />
                </Grid>
                <Grid item xs={4}>
                <Typography >Pincode *</Typography>
                </Grid>
                <Grid item xs={8}>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                value={shipping.pincode}
                onChange={(e) =>
                      setShipping({
                        ...shipping,
                        pincode: e.target.value,
                      })
                    }
              />
                </Grid>
                  </Grid>
            </Grid>
            </Grid>
            <Grid container columnSpacing={5} sx={{mt: 2}}>
                  <Grid item xs={12}>
                  <Grid container spacing={2} sx={{ alignItems:'center'}}>
                  <Grid item xs={6}>
                <Typography variant="h6">Contact Person</Typography>
                </Grid>
                <Grid item xs={6}>
                <Box sx={{display:'flex', justifyContent:'end', alignItems:'start'}}>
                <Button variant='text' onClick={()=>addMoreDetails()}>+ Add Contact Person</Button>
                </Box>
                </Grid>
                <Grid item xs={12}>
                {dealerdata?.contact_person?.map((ev, index)=>{
                  return(
                    <Card key={index} sx={{ boxShadow: "none", border: "1px solid #bababa", p: 2, mb: 2}}>
                    <Grid key={index} container spacing={2} sx={{alignItems:'center'}}>
                    <Grid item xs={2}>
                    <Typography sx={{mb: 1}}>Salutation</Typography>
                    <FormControl size="small" fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ev?.salutation}
          onChange={(e) => handleFieldChange('salutation', ev.field_id, e)}        >
                        <MenuItem key={index} value='Mr'>Mr</MenuItem>
                        <MenuItem key={index} value='Miss'>Miss</MenuItem>
        </Select>
        </FormControl>
                </Grid>
                <Grid item xs={2}>
                <Typography sx={{mb: 1}}>Name</Typography>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                value={ev?.name}
                onChange={(e) => handleFieldChange('name', ev.field_id, e)}
              />
                </Grid>
                <Grid item xs={2}>
                <Typography sx={{mb: 1}}>Designation</Typography>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                value={ev?.designation}
                onChange={(e) => handleFieldChange('designation', ev.field_id, e)}
              />
                </Grid>
                <Grid item xs={2.5}>
                <Typography sx={{mb: 1}}>Email</Typography>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                value={ev?.email}
                onChange={(e) => handleFieldChange('email', ev.field_id, e)}
              />
                </Grid>
                <Grid item xs={2.5}>
                <Typography sx={{mb: 1}}>Phone Number</Typography>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                value={ev?.phone_number}
                onChange={(e) => handleFieldChange('phone_number', ev.field_id, e)}
              />
                </Grid>
                <Grid item xs={1} sx={{textAlign:'end'}}>
                <Button onClick={()=> removeField( ev.field_id)}>x</Button>
                    </Grid>
                </Grid>
                </Card>
                  )
                })}
                </Grid>
                  </Grid>
            </Grid>
            </Grid>
            <Grid container columnSpacing={5} sx={{mt: 2}}>
                  <Grid item xs={6}>
                  <Grid container spacing={2} sx={{ alignItems:'center'}}>
                  <Grid item xs={12}>
                <Typography variant="h6">Bank Details</Typography>
                </Grid>
                <Grid item xs={4}>
                <Typography >Account Type *</Typography>
                </Grid>
                <Grid item xs={8}>
                <FormControl fullWidth>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={bank.account_type}
                onChange={(e) =>
                      setBank({
                        ...bank,
                        account_type: e.target.value,
                      })
                    }
                >
                  <FormControlLabel
                    value="Current"
                    control={<Radio />}
                    label="Current"
                  />
                  <FormControlLabel
                    value="Saving"
                    control={<Radio />}
                    label="Saving"
                  />
                </RadioGroup>
              </FormControl>
                </Grid>
                <Grid item xs={4}>
                <Typography >Beneficiary Name *</Typography>
                </Grid>
                <Grid item xs={8}>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                value={bank.benef_name}
                onChange={(e) =>
                      setBank({
                        ...bank,
                        benef_name: e.target.value,
                      })
                    }
              />
                </Grid>
                <Grid item xs={4}>
                <Typography >Bank Name *</Typography>
                </Grid>
                <Grid item xs={8}>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                value={bank.bank_name}
                onChange={(e) =>
                      setBank({
                        ...bank,
                        bank_name: e.target.value,
                      })
                    }
              />
                </Grid>
                <Grid item xs={4}>
                <Typography >Account Number *</Typography>
                </Grid>
                <Grid item xs={8}>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                value={bank.acc_no}
                onChange={(e) =>
                      setBank({
                        ...bank,
                        acc_no: e.target.value,
                      })
                    }
              />
                </Grid>
                <Grid item xs={4}>
                <Typography >Re-enter Account Number *</Typography>
                </Grid>
                <Grid item xs={8}>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                value={bank.racc_no}
                onChange={(e) =>
                      setBank({
                        ...bank,
                        racc_no: e.target.value,
                      })
                    }
              />
                </Grid>
                <Grid item xs={4}>
                <Typography >IFSC *</Typography>
                </Grid>
                <Grid item xs={8}>
                <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                value={bank.ifsc}
                onChange={(e) =>
                      setBank({
                        ...bank,
                        ifsc: e.target.value,
                      })
                    }
              />
                </Grid>
                  </Grid>
            </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{textAlign:'end'}}>
                  <Button sx={{mr: 2}} onClick={arrowBack} variant="outlined">Cancel</Button>
                  <Button type="submit" variant="contained">Create New Dealer</Button>
                </Grid>
            </Grid>
      </Box>
    </div>
  );
};

export default AddDealer;
