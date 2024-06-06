import React, {useEffect, useState} from 'react';
import Dashboard from './pages/dashboard/Dashboard.js';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Login from './pages/login/Login.js';
import Dealer from './pages/dealer/Dealer.js';
import Report from './pages/report/Report.js';
import Setting from './pages/settings/Setting.js';
import ProtectedRoute from './utils/ProtectedRoute.js';
import AddDealer from './pages/dealer/Adddealer.js';
import Createregion from './pages/settings/Createregion.js';
import Createuser from './pages/settings/Createuser.js';
import UpdateDealer from './pages/dealer/Updatedealer.js';
import Updateuser from './pages/settings/Updateuser.js';

const RouteRoute = ({setLoader}) => {

  const [show, setShow] = useState(true);

  const [mindev, setMindev] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShow(window.innerWidth <= 500 ? false : true);
      setMindev(window.innerWidth <= 500 ? false : true);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
    <Routes>
        <Route path='/login' element={<Login setLoader={setLoader}/>}></Route> 
      <Route path='/' element={<Layout show={show} setShow={setShow} mindev={mindev}/>}>
        <Route path='/' element={<ProtectedRoute><Dashboard show={show} setLoader={setLoader}/></ProtectedRoute>}></Route>
        <Route path='/dealer'>
              <Route index={true} element={<ProtectedRoute><Dealer show={show} setLoader={setLoader}/></ProtectedRoute>}/>
              <Route path='new' element={<ProtectedRoute><AddDealer show={show} setLoader={setLoader}/></ProtectedRoute>}></Route>
              <Route path='update/:dealerId' element={<ProtectedRoute><UpdateDealer show={show} setLoader={setLoader}/></ProtectedRoute>}></Route>
        </Route>
        <Route path='/report' element={<ProtectedRoute><Report show={show} setLoader={setLoader}/></ProtectedRoute>}></Route>
        <Route path='/analytics' element={<ProtectedRoute><Report show={show} setLoader={setLoader}/></ProtectedRoute>}></Route>
        <Route path='/setting' >
            <Route index={true} element={<ProtectedRoute><Setting show={show} setLoader={setLoader}/></ProtectedRoute>}></Route>
            <Route path='createregion' element={<ProtectedRoute><Createregion show={show} setLoader={setLoader}/></ProtectedRoute>}></Route>
            <Route path='createuser' element={<ProtectedRoute><Createuser show={show} setLoader={setLoader}/></ProtectedRoute>}></Route>
            <Route path='edituser/:userId' element={<ProtectedRoute><Updateuser show={show} setLoader={setLoader}/></ProtectedRoute>}></Route>
        </Route>
      </Route>
    </Routes>
    </>
  )
}

export default RouteRoute;