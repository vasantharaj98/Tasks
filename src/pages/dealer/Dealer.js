import React, { useEffect , useState} from 'react';
import { Box, Grid, Button, Typography, TextField, Divider } from '@mui/material';
import CustomTable from '../../components/table/Table';
import Adddealer from './Adddealer';
import { useDispatch, useSelector } from "react-redux";
import SearchButton from '../../components/search/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { getdealer } from '../../slices/dealer';
import Popup from '../../components/popup/Popup';

const columns = [
    { id: 'dealer_id', label: 'Dealer ID', minWidth: 150, align:'start' },
    { id: 'first_name', label: 'Dealer Name', minWidth: 150, align:'start' },
    { id: 'email', label: 'Email ID', minWidth: 150, align:'center' },
    { id: 'zone', label: 'Location', minWidth: 150, align:'center' },
    { id: 'gst_no', label: 'GST NO', minWidth: 150, align:'center' },
    { id: 'status', label: 'Status', minWidth: 150, align:'center' },
    { id: 'action', label: 'Action', minWidth: 100, align:'end', actionType: [{edit: true, delete: true}] },
  ];

  const rows = [
    { dealer_id : "D000001", first_name:"Ananth", email:"ananath@gmail.com", zone:"Bangalore", gst_no:"GST6778867678", status:"Active" },
    { dealer_id : "D000001", first_name:"Ananth", email:"ananath@gmail.com", zone:"Bangalore", gst_no:"GST6778867678", status:"Active" },
    { dealer_id : "D000001", first_name:"Ananth", email:"ananath@gmail.com", zone:"Bangalore", gst_no:"GST6778867678", status:"Active" },
    { dealer_id : "D000001", first_name:"Ananth", email:"ananath@gmail.com", zone:"Bangalore", gst_no:"GST6778867678", status:"Active" },
    { dealer_id : "D000001", first_name:"Ananth", email:"ananath@gmail.com", zone:"Bangalore", gst_no:"GST6778867678", status:"Active" },
    { dealer_id : "D000001", first_name:"Ananth", email:"ananath@gmail.com", zone:"Bangalore", gst_no:"GST6778867678", status:"Active" },
    { dealer_id : "D000001", first_name:"Ananth", email:"ananath@gmail.com", zone:"Bangalore", gst_no:"GST6778867678", status:"Active" },
  ];

const Dealer = ({setLoader, show}) => {

  const [filteredData, setFilteredData] = useState([]);

  const {dealers: dealer} = useSelector((state) => state.dealer);

  const [open, setOpen] = React.useState(false);
  const [modalte, setModalte] = React.useState(null);

  const dealerData = filteredData?.map((va)=>{
    return{
      ...va,
      bank_details: JSON.parse(va.bank_details),
      billing_address: JSON.parse(va.billing_address),
      shipping_address: JSON.parse(va.shipping_address),
    }
  });


  const {message: message} = useSelector((state) => state.dealer);

  const handleSearch = (query) => {
    const filtered = dealer.filter(item => (item.first_name).toLowerCase().includes(query));
    setFilteredData(filtered);
};

  useEffect(()=>{
    if(message){
          setOpen(true);
          setModalte(message);
    }
  },[message]);

  const dispatch = useDispatch();

  useEffect(()=>{
    setLoader(true)
      dispatch(getdealer())
      .then((response) => {
        setFilteredData(response.payload.dealerdata.data);
        setLoader(false);
      })
      .catch(()=>{
        setLoader(false);
      })
  }, [])

  return (
    <div className='content' style={{marginLeft: show ? '220px' : '10px'}}>
              <Popup open={open} modalte={modalte} setOpen={setOpen}/>
      <Box>
      <Box>
        <Grid container sx={{ paddingBottom: 2, alignItems:'center' }}>
          <Grid item xs={6} sx={{paddingTop: 0}}>
            <Typography variant='h5' sx={{fontWeight:'bold'}}>
            My Dealers
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{textAlign: 'end', paddingTop: 0}}>
          <Box sx={{display:{md:'flex', sm:'none'}, justifyContent:'end', alignItems:'center'}}>
          <SearchButton handleSearch={handleSearch} setFilteredData={setFilteredData} placeholder="Search Dealer Name"/>
          <Link to='/dealer/new'>
          <Button variant='contained' size='large'>+ Add Dealer</Button>
          </Link>
          </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <CustomTable columns={columns} rows={rows} setLoader={setLoader}/>
      </Box>
      </Box>
    </div>
  );
}

export default Dealer;