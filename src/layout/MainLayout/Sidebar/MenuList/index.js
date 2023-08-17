// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import MenuItems from '../../../../menu-items/index'
// import pages from 'menu-items/pages';
// import userPages from 'menu-items/userpages';
// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const itemsData = MenuItems();
  const navItems = itemsData.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
