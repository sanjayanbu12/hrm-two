import { IconKey } from '@tabler/icons';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AllOutIcon from '@mui/icons-material/AllOut';
import PaidIcon from '@mui/icons-material/Paid';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CameraFrontIcon from '@mui/icons-material/CameraFront';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import DvrIcon from '@mui/icons-material/Dvr';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const icons = {
  IconKey,
  BadgeOutlinedIcon,
  AssignmentOutlinedIcon,
  PermIdentityOutlinedIcon,
  AccountTreeOutlinedIcon,
  AutoStoriesIcon,
  EventNoteIcon,
  AllOutIcon,
  PaidIcon,
  EmojiEmotionsIcon,
  CameraFrontIcon,
  PersonSearchIcon,
  DvrIcon
};

const pages = {
  type: 'group',
  children: [
    {
      id: 'recruitment',
      title: 'Recruitment',
      type: 'collapse',
      url: '/recruitment',
      icon: icons.AccountTreeOutlinedIcon,
      children: [
        {
          id: 'jobform',
          title: 'Job Posting',
          type: 'item',
          url: '/jobform'
        },
        {
          id: 'jobtable',
          title: 'Position Details',
          type: 'item',
          url: '/jobtable'
        },
        {
          id: 'applicationtracker',
          title: 'Interview Process ',
          type: 'item',
          url: '/ApplicationTrackTab'
        }
      ]
    },
    {
      id: 'employees',
      title: 'Employee Self Service',
      type: 'collapse',
      icon: icons.BadgeOutlinedIcon,

      children: [
        {
          id: 'Organisation Chart',
          title: 'Organisation Chart',
          type: 'item',
          url: '/payroll'
        },
        {
          id: 'basictable',
          title: 'Employee Information Management',
          type: 'item',
          url: '/basictable'
        },
        {
          id: 'leave',
          title: 'Leave & Attendance',
          type: 'item',
          url: '/leave'
        },
        {
          id: 'Leave Approval',
          title: 'Leave Approval',
          type: 'item',
          url: '/leaveapprove'
        },
        {
          id: 'event',
          title: 'Event Calendar',
          type: 'item',
          url: '/newevent'
        }
      ]
    },
    {
      id: 'Learning & Development',
      title: 'Learning & Development',
      type: 'collapse',
      icon: icons.AutoStoriesIcon,

      children: [
        {
          id: '/course upload',
          title: 'Course Upload',
          type: 'item',
          url: '/courseupload'
        },
        {
          id: 'Course Review',
          title: 'Course Review',
          type: 'item',
          url: '/coursereview'
        },
        {
          id: '/Course Catalog',
          title: 'Course Catalog',
          type: 'item',
          url: '/coursecatalog'
        }
      ]
    },
    {
      id: 'Procurement',
      title: 'procurement',
      type: 'collapse',
      icon: ShoppingCartIcon, 
      children: [
        {
          id: 'travel',
          title: 'Procurement Table',
          type: 'item',
          url:'/Procruitment'
        },
        {
          id: 'travel',
          title: 'Approval card',
          type: 'item',
          url:'/ApproovalCard'
        }
      ]
    },
   
  ]
};

export default pages;
