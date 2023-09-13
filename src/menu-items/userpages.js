// assets
// import { IconKey } from '@tabler/icons';
// import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
// import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
// import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
// import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
// import EventNoteIcon from '@mui/icons-material/EventNote';
// import AllOutIcon from '@mui/icons-material/AllOut';
// import PaidIcon from '@mui/icons-material/Paid';
// import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CameraFrontIcon from '@mui/icons-material/CameraFront';
// import { useSelector,useDispatch } from 'react-redux';
// const isAdmin = (state=>state.customi)
// constant
// const icons = {
//   IconKey,
//   BadgeOutlinedIcon,
//   AssignmentOutlinedIcon,
//   PermIdentityOutlinedIcon,
//   AccountTreeOutlinedIcon,
//   EventNoteIcon,
//   AllOutIcon,
//   PaidIcon,
//  EmojiEmotionsIcon,
//  CameraFrontIcon
// };

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  type: 'group', 
  children: [
    { 
      id: 'employee',
      title: 'Employees Self Services',
      icon: CameraFrontIcon,
      type: 'collapse',

      children: [
        {
          id: 'employeeselfservices',
          title: 'Employee Module',
          type: 'item',
          url: '/employeedomain'
        },
      ]
    }
  ],
};



export default pages;
