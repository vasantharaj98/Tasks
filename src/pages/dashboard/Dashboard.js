import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import Popup from '../../components/popup/Popup';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import ElectricMopedOutlinedIcon from '@mui/icons-material/ElectricMopedOutlined';
import Chart from "react-apexcharts";

const options = {
  chart: {
    height: 350,
    type: 'area'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    type: 'month',
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    },
  },
}

const options1 = {
              labels:['Pending', 'Approved', 'Paid'],
              chart: {
                type: 'donut',
              },
              plotOptions: {
                pie: {
                  startAngle: -90,
                  endAngle: 270
                }
              },
              dataLabels: {
                enabled: false
              },
              fill: {
                type: 'gradient',
              },
              legend: {
                formatter: function(val, opts) {
                  return val + " - " + opts.w.globals.series[opts.seriesIndex]
                }
              },
              title: {
                text: 'Invoices'
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            }

            const options2 = {
              labels:['Verification', 'Inspection', 'Replacement', 'Return Transit', 'Delivered'],
              chart: {
                type: 'donut',
              },
              plotOptions: {
                pie: {
                  startAngle: -90,
                  endAngle: 270
                }
              },
              dataLabels: {
                enabled: false
              },
              fill: {
                type: 'gradient',
              },
              legend: {
                formatter: function(val, opts) {
                  return val + " - " + opts.w.globals.series[opts.seriesIndex]
                }
              },
              title: {
                text: 'Warranty Status'
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            }


const Dashboard = ({setLoader, show}) => {

const [series, setSeries]= useState([{
  name: 'Service',
  data: [1, 2, 33, 4, 5, 45, 87, 66, 300]
}, {
  name: 'Warranty',
  data: [4, 8, 30, 43, 22, 90, 70, 50, 100]
}])

const [series1, setSeries1] = useState([10, 20, 40])

const [series2, setSeries2] = useState([10, 35, 40,60, 100])


  const [open, setOpen] = React.useState(false);
  const [modalte, setModalte] = React.useState(null);

  return (
    <div className='content' style={{marginLeft: show ? '220px' : '10px'}}>
          <Popup open={open} modalte={modalte} setOpen={setOpen}/>
      <Box>
        <Grid container sx={{ paddingBottom: 2, alignItems:'center' }}>
          <Grid item xs={6} sx={{paddingTop: 0}}>
            <Typography variant='h5' sx={{fontWeight:'bold'}}>
             Dashboard
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{textAlign: 'end', paddingTop: 0}}>

          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={3} sx={{mb: 2}}>
          <Grid item xs={12} md={2.4}>
            <Card className='dashCard dashCard1' sx={{boxShadow:'none', p: 3, border:'1px solid #cacaca'}}>
            <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <Box>
              <Typography variant='h4' sx={{fontWeight:'bold'}}>30</Typography>
                <Typography variant='h6' sx={{mt: 1}}>No of Dealers</Typography>
            </Box>
            <Box sx={{background:'#eef8ff', p: 1.5, borderRadius: 2}}>
              <PeopleAltOutlinedIcon sx={{fontSize: 30, color:'#0b4c7c'}}/>
              </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={2.4}>
            <Card className='dashCard dashCard2' sx={{boxShadow:'none', p: 3, border:'1px solid #cacaca'}}>
            <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <Box>
              <Typography variant='h4' sx={{fontWeight:'bold'}}>45</Typography>
                <Typography variant='h6' sx={{mt: 1}}>Vehicle Sold</Typography>
            </Box>
            <Box sx={{background:'#f0fff6', p: 1.5, borderRadius: 2}}>
              <ElectricMopedOutlinedIcon sx={{fontSize: 30, color:'#02bb4c'}}/>
              </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={2.4}>
            <Card className='dashCard dashCard3' sx={{boxShadow:'none', p: 3, border:'1px solid #cacaca'}}>
            <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <Box>
              <Typography variant='h4' sx={{fontWeight:'bold'}}>07</Typography>
                <Typography variant='h6' sx={{mt: 1}}>Vehicle Stock</Typography>
            </Box>
            <Box sx={{background:'#d9efff', p: 1.5, borderRadius: 2}}>
              <InventoryOutlinedIcon sx={{fontSize: 30, color:'#0093ff'}}/>
              </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={2.4}>
            <Card className='dashCard dashCard4' sx={{boxShadow:'none', p: 3, border:'1px solid #cacaca'}}>
            <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <Box>
              <Typography variant='h4' sx={{fontWeight:'bold'}}>180</Typography>
                <Typography variant='h6' sx={{mt: 1}}>No of Invoice</Typography>
            </Box>
            <Box sx={{background:'#fef1ff', p: 1.5, borderRadius: 2}}>
              <ShoppingCartOutlinedIcon sx={{fontSize: 30, color:'#ec00ff'}}/>
              </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={2.4}>
            <Card className='dashCard dashCard4' sx={{boxShadow:'none', p: 3, border:'1px solid #cacaca'}}>
            <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <Box>
              <Typography variant='h4' sx={{fontWeight:'bold'}}>20</Typography>
                <Typography variant='h6' sx={{mt: 1}}>No of Warranty</Typography>
            </Box>
            <Box sx={{background:'#fef1ff', p: 1.5, borderRadius: 2}}>
              <ShoppingCartOutlinedIcon sx={{fontSize: 30, color:'#ec00ff'}}/>
              </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={7}>
            <Card sx={{boxShadow:'none', p: 3, border:'1px solid #cacaca'}}>
            <div className="app">
        <div className="row">
          <div className="chart">
            <Chart
              options={options}
              series={series}
              type="area"
              height='300'
            />
          </div>
        </div>
      </div>
            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
          <Card sx={{boxShadow:'none', p: 3, border:'1px solid #cacaca'}}>
            <div className="app">
        <div className="row">
          <div className="chart">
            <Chart
              options={options2}
              series={series2}
              type="donut"
              height='310'
            />
          </div>
        </div>
      </div>
            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
          <Card sx={{boxShadow:'none', p: 3, border:'1px solid #cacaca'}}>
            <div className="app">
        <div className="row">
          <div className="chart">
            <Chart
              options={options1}
              series={series1}
              type="donut"
              height='310'
            />
          </div>
        </div>
      </div>
            </Card>
          </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;