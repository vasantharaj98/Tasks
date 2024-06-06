import React, { useCallback, useEffect, useState} from 'react'
import {  BrowserRouter as Router } from 'react-router-dom';
import RouteRoute from './Routes';
import Loader from '../src/components/loader/Loader.js';
import './App.css';
import EventBus from "./utils/EventBus.js";
import { useDispatch } from 'react-redux';
import { logout } from './slices/auth.js';


function App() {
  const [loader, setLoader] = useState (false);

  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [logOut]);

  return (
    <>
    <Router>
    {loader && <Loader></Loader>}
    <RouteRoute setLoader={setLoader}/>
    </Router>
  </>
  );
}

export default App;
