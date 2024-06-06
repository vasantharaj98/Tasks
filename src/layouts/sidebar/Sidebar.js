import React, { useEffect, useState } from 'react';
import './Sidebar.css'
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {Home} from '@mui/icons-material';
import classNames from 'classnames';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const Sidebar = ({show, setShow, mindev}) => {

  const user = JSON.parse(localStorage.getItem('user'));

  const module = user?.modules;

const [selectmenu, setSelectmenu] = useState('')

const side_menus = [
        {
        menuName: 'Dashboard',
        icon: HomeOutlinedIcon,
        route: '/'
        },
        {
            menuName: 'Overview',
            icon: PeopleAltOutlinedIcon,
            route: '/dealer'
        },
        {
          menuName: 'Reports',
          icon: ArticleOutlinedIcon,
          route: '/report'
      },
          {
              menuName: 'Analytics',
              icon: LocalPoliceOutlinedIcon,
              route: '/analytics'
          },
            {
                menuName: 'Settings',
                icon: SettingsOutlinedIcon,
                route: '/setting'
            },
]

const handleMenu = (val) =>{
if(!mindev){
  setSelectmenu(val);
  setShow(false);
}
else{
  setSelectmenu(val);
}
}

useEffect(()=>{
  const val = window.location.pathname;
  const pathArray = val.split('/');
  console.log(`/${pathArray[1]}`);
  for(let i=0; i<side_menus.length; i++){
   if(`/${pathArray[1]}` === side_menus[i].route){
       setSelectmenu(side_menus[i].menuName)
   }
  }
}, [])

  return (
    <div className='sidebar' style={{left : show ? 0 : '-250px'}}>
        <Box>
            <div>
                {
                    side_menus.map((val, index)=>{
                        return (
                          module ? (module?.some(obj => obj.name === val.menuName && obj.checked) && 
                          <Link key={index} to={val.route} onClick={()=> handleMenu(val.menuName)} style={{textDecoration:'none'}}>
                            <Box className={classNames("sidemenu", `${selectmenu === val.menuName && "active"}`)} sx={{ py: 2, px: 2 }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <val.icon sx={{ marginRight: 1, color: "#000" }} />
                                <Typography sx={{ color: "#000", fontSize: 12 }}>
                                  {val.menuName}
                                </Typography>
                              </div>
                            </Box>
                          </Link>
                          )
                          :
                          <Link key={index} to={val.route} onClick={()=> handleMenu(val.menuName)} style={{textDecoration:'none'}}>
                            <Box className={classNames("sidemenu", `${selectmenu === val.menuName && "active"}`)} sx={{ py: 2, px: 2 }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <val.icon sx={{ marginRight: 1, color: "#000" }} />
                                <Typography sx={{ color: "#000", fontSize: 12 }}>
                                  {val.menuName}
                                </Typography>
                              </div>
                            </Box>
                          </Link>
                        );
                    })
                }
            </div>
        </Box>
    </div>
  )
}

export default Sidebar