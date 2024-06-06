import React, { useEffect, useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { Avatar, Button, Divider, IconButton, Typography } from '@mui/material';
import { logout } from '../../slices/auth';
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo_2.png'
import { getoembyid } from '../../slices/oem';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#fff',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1.5, 1.5, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '25ch',
    },
  },
}));


function DrawerAppBar({show, setShow}) {

  const [subshow, setSubshow] = useState(false);

  const {oem: oemData} = useSelector((state) => state.oem);


  const [headermenushow, setHeaderMenushow] = useState(false);

  const menuRef = useRef();

  const user = JSON.parse(localStorage.getItem('user'));

  const dispatch = useDispatch();

  const handleProfile = () =>{
    setSubshow(!subshow);
  }

  const handleLogout = () =>{
    dispatch(logout());
  }

  const handleMenu = () =>{
      setShow(!show)
  };

  const handleHeaderMenu = () =>{
    setHeaderMenushow(true);
  }

  useEffect(() => {
    if(user){
      dispatch(getoembyid());
    }
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setHeaderMenushow(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar component="nav" sx={{bgcolor: 'secondary.main', color: '#000', py: 0.5, boxShadow:'0px 2px 10px #f1f1f1'}}>
      <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', px: 2}} >
      <Box sx={{display:{md: 'flex', xs:'none'}, justifyContent:'space-between', gap: 6, alignItems:'center'}}>
        <img src={logo} alt='logo' width={90}></img>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleMenu}
          >
            <MenuIcon sx={{color:'#fff'}}/>
          </IconButton>
        <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{color:'#fff'}}/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          </Box>
          <Box sx={{display:{md: 'none', xs:'flex'}, justifyContent:'space-between', gap: 6, alignItems:'center'}}>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleMenu}
          >
            <MenuIcon sx={{color:'#fff'}}/>
          </IconButton>
          </Box>
        <Toolbar>
          <Button onClick={handleHeaderMenu} size='large' variant='contained'>+</Button>
          { headermenushow && <Box ref={menuRef} sx={{position:'absolute', bgcolor:'#fff', top: '60px', right: '330px', boxShadow:'0px 0px 10px #cacaca', borderRadius: 2, p: 2, minWidth:'200px'}}>
          <Link to='/dealer/new' style={{textDecoration:'none'}}>
                            <Box sx={{ py: 1, px: 1 }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography sx={{ color: "#000" }}>
                                  + New Dealer
                                </Typography>
                              </div>
                            </Box>
                          </Link>
                          <Link to='/product/addproduct' style={{textDecoration:'none'}}>
                            <Box sx={{ py: 1, px: 1 }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography sx={{ color: "#000" }}>
                                  + New Product
                                </Typography>
                              </div>
                            </Box>
                          </Link>
                          <Link to='/inventory/addproductstock' style={{textDecoration:'none'}}>
                            <Box sx={{ py: 1, px: 1 }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography sx={{ color: "#000" }}>
                                  + Add Stock
                                </Typography>
                              </div>
                            </Box>
                          </Link>
                          <Link to='/setting/createuser' style={{textDecoration:'none'}}>
                            <Box sx={{ py: 1, px: 1 }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography sx={{ color: "#000" }}>
                                  + Add User
                                </Typography>
                              </div>
                            </Box>
                          </Link>
                          <Link to='/setting/createregion' style={{textDecoration:'none'}}>
                            <Box sx={{ py: 1, px: 1 }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography sx={{ color: "#000" }}>
                                  + Add Region & Zone
                                </Typography>
                              </div>
                            </Box>
                          </Link>
          </Box>}
          <Button size='large' color='light' variant='text' sx={{fontWeight:'normal', position:'relative'}} onClick={handleProfile}>{user?.organization}  <Avatar sx={{mx: 2}} alt="Remy Sharp" src={oemData?.logo_url} /> <KeyboardArrowDownIcon />
          { subshow && <Box sx={{position:'absolute', bgcolor:'#fff', top: '60px', right: 0, boxShadow:'0px 0px 10px #cacaca', borderRadius: 2, p: 2}}>
          <Link style={{textDecoration:'none'}}>
                            <Box sx={{ py: 2, px: 2 }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                              <AccountCircleIcon sx={{mr: 2}}/>
                                <Typography sx={{ color: "#000" }}>
                                  Profile
                                </Typography>
                              </div>
                            </Box>
                          </Link>
                          <Link style={{textDecoration:'none'}} onClick={handleLogout}>
                            <Box sx={{ py: 2, px: 2 }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                              <LockIcon sx={{mr: 2}}/>
                                <Typography sx={{ color: "#000" }}>
                                  Signout
                                </Typography>
                              </div>
                            </Box>
                          </Link>
          </Box>}
          </Button>
        </Toolbar>
        </Box>
      </AppBar>
    </Box>
  );
}

export default DrawerAppBar;