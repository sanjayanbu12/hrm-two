import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
// routes
import MainRoutes from './MainRoutes';
import UserRoutes from './UserRoutes'
import AuthenticationRoutes from './AuthenticationRoutes';
import { useEffect } from 'react';
import { LOGGED_OUT, USER_OR_NOT } from 'store/actions';

// ==============================|| ROUTING RENDER ||============================== //
function ThemeRoutes() {
  const isLoggedIn = useSelector(state => state.customization.isLoggedIn);
  const isAdmin = useSelector(state=>state.customization.isAuthAdmin)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const loginRoute=location.pathname.split('/')[3]
  const protectRoute = () =>{
   if(loginRoute==='login3'){
    dispatch({type:LOGGED_OUT})
    dispatch({type:USER_OR_NOT})
   }
  }
  useEffect(() => {
    { !isLoggedIn && navigate('/pages/login/login3') }
  }, [isLoggedIn])
  useEffect(()=>{
    protectRoute()
  },[loginRoute])
  let route = useRoutes(isLoggedIn && isAdmin ? [AuthenticationRoutes, MainRoutes] : [AuthenticationRoutes,UserRoutes])
  return route
}


export default ThemeRoutes;