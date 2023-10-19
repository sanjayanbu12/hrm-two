// assets
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
// import InsightsIcon from '@mui/icons-material/Insights';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import DvrIcon from '@mui/icons-material/Dvr';
// import { useSelector,useDispatch } from 'react-redux';
// const isAdmin = (state=>state.customi)
// constant
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
          url: '/ApplicationTrackTab',
        },       
      ]
    },
    {
      id: 'employees',
      title: 'Employee Self Service',
      type: 'collapse',
      icon: icons.BadgeOutlinedIcon,

      children: [
        // {
        //   id: 'employeeform',
        //   title: 'Employee Information',
        //   type: 'item',
        //   url: '/newemployee'
        // },
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
          url: '/leave',
    },
    {
      id: 'Organisation Chart',
      title: 'Organisation Chart',
      type: 'item',
      url: '/payroll'
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
    },
    // {
    //   id: 'employeeselfservices',
    //   title: 'Employee Self Services',
    //   type: 'item',
    //   url: '/employeeselfservices'
    // },
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
        },
      ]
    },
    {
      id: 'performance',
      title: 'Performance Management',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'goals',
          title: 'Goals',
          type: 'item',
          url: '/goals'
        },
        // {
        //   id: 'feedbacks',
        //   title: 'Feedbacks',
        //   type: 'item',
        //   url: '/feedbacks'
        // },
        // {
        //   id: 'skillsetmatrix',
        //   title: 'Skill Matrix',
        //   type: 'item',
        //   url: '/skillsetmatrix'
        // },  
      ]
    },
  ]
};

export default pages;
