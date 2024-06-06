import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const { token: Token } = useSelector((state) => state.auth);
    let location = useLocation();

    if(!Token) {
        return children
    }
 return children

};

export default ProtectedRoute;