import dashboard from './dashboard';
import pages from './pages';
// import utilities from './utilities';
// import other from './other';
import userPages from './userpages';
import { useSelector } from 'react-redux';
// ==============================|| MENU ITEMS ||============================== //
const MenuItems = () => {
  const isAdmin = useSelector(state => state.customization.isAuthAdmin);
  const items = isAdmin ? [dashboard, pages] : [dashboard, userPages];
  return items;
};
export default MenuItems;
