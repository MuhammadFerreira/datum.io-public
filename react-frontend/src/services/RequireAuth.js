import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router";
import React, { useState, useEffect } from 'react';
import AuthService from "./auth.service";
import jwt_decode from 'jwt-decode';


const RequireAuth = ({ allowedRoles }) => {
  const user = AuthService.getCurrentUser();
  const location = useLocation();

  const [validCreds, setValidCreds] = useState(true);

  useEffect(() => {

    
    const getUsers = async () => {
        try {
            console.log(AuthService.getUserInfo());
            let promise = AuthService.getUserInfo();

            //check if promise was rejected
            // eslint-disable-next-line
            if (promise instanceof Promise) {
                promise.then(function(result) {
                    console.log(result);
                    setValidCreds(true);
                }, function(err) {
                    console.log(err);
                    setValidCreds(false);
                });
              }
            }
         catch (err) {
          setValidCreds(false);
        }
    };

    getUsers();
  }, []);
  
  if(user == null || !validCreds) {
    console.log("User is not logged in");
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  const auth   = jwt_decode(user.access_token).roles[0];
  
  return (
        allowedRoles.includes(auth)
            ? <Outlet />
            : (!allowedRoles.includes(auth) && auth != null)
                ? <Navigate to="/error" replace state={{ from: location }}/>
                : <Navigate to="/signin" replace state={{ from: location }}/>
    );
};

export default RequireAuth;