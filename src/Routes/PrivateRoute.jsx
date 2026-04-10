import React from 'react';
import UseAuth from '../Hook/UseAuth';
import Loading from '../components/Loading/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {

    const {loading, user} = UseAuth();
    const location = useLocation();

    if(loading){
        return <Loading></Loading>
    }

    if(!user){
        return <Navigate to={'/login'} state={location.pathname}></Navigate>
    }


    return children;
};

export default PrivateRoute;