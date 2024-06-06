import React from 'react'
import Header from '../src/layouts/header/Header.js';
import { Outlet } from 'react-router-dom';
import Sidebar from './layouts/sidebar/Sidebar.js';

const Layout = ({show, setShow, mindev}) => {


  return (
    <div>
        <Header show={show} setShow={setShow}/>
        <Outlet show={show} />
        <Sidebar show={show} mindev={mindev} setShow={setShow}/>
    </div>
  )
}

export default Layout;