import { useNavigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
// routes
import MainRoutes from './MainRoutes';
import UserRoutes from './UserRoutes'
import AuthenticationRoutes from './AuthenticationRoutes';
import { useEffect } from 'react';

// ==============================|| ROUTING RENDER ||============================== //
function ThemeRoutes() {
  const isLoggedIn = useSelector(state => state.customization.isLoggedIn);
  const isAdmin = useSelector(state=>state.customization.isAuthAdmin)
  const navigate = useNavigate()
  useEffect(() => {
    { !isLoggedIn && navigate('/pages/login/login3') }
  }, [isLoggedIn])
  let route = useRoutes(isLoggedIn && isAdmin ? [AuthenticationRoutes, MainRoutes] : [AuthenticationRoutes,UserRoutes])
  return route
}


export default ThemeRoutes;