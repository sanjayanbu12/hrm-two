import { useNavigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import { useEffect } from 'react';

// ==============================|| ROUTING RENDER ||============================== //
 function ThemeRoutes() {
  const isLoggedIn = useSelector(state => state.customization.isLoggedIn);
  console.log(isLoggedIn)
  const navigate=useNavigate()
  
useEffect(()=>{
  { !isLoggedIn && navigate('/pages/login/login3') }
},[isLoggedIn])
console.log(isLoggedIn)
  let route=useRoutes(isLoggedIn? [AuthenticationRoutes,MainRoutes] : [AuthenticationRoutes])
  // if(isLoggedIn)
  // {
  //   return useRoutes([MainRoutes])
  // }
  return route
}


export default ThemeRoutes;