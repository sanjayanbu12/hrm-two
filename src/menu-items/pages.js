// assets
import { IconKey } from '@tabler/icons';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import PersonIcon from '@mui/icons-material/Person';
// constant
const icons = {
  IconKey,
  BadgeOutlinedIcon,
  AssignmentOutlinedIcon,
  PermIdentityOutlinedIcon,
  AccountTreeOutlinedIcon,
  PersonIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  // id: '',
  // title: '',
  // caption: '',
  type: 'group',
  children: [
    // {
    //   id: 'authentication',
    //   title: 'Authentication',
    //   type: 'collapse',
    //   icon: icons.IconKey,
    //   children: [
    //     {
    //       id: 'login3',
    //       title: 'Login',
    //       type: 'item',
    //       url: '/pages/login/login3',
    //       target: true
    //     },
    //     {
    //       id: 'register3',
    //       title: 'Register',
    //       type: 'item',
    //       url: '/pages/register/register3',
    //       target: true
    //     }
    //   ]
    // },

    {
      id: 'recruitment',
      title: 'Recruitment',
      type: 'collapse',
      icon: icons.AccountTreeOutlinedIcon,

      children: [
        {
          id: 'RecruitmentTable',
          title: 'Recruitment Table',
          type: 'item',
          url: '/RecruitmentTable'
        },
        {
          id: 'RecruitmentForm',
          title: 'Recruitment Form',
          type: 'item',
          url: '/RecruitmentForm'
        }
      ]
    },
    // {
    //   id: 'Jobs',
    //   title: 'Jobs',
    //   type: 'item',
    //   icon: icons.PersonIcon,
    //   url: '/Jobs'
    // },

    //   children: [
    //     {
    //       id: 'sampleslist',
    //       title: 'Sample List',
    //       type: 'item',
    //       url: '/samplelist'

    //     {
    //       id: 'newsample',
    //       title: 'Add Sample',
    //       type: 'item',
    //       url: '/newsample'
    //     }
    //   ]
    // },
    //    {
    //       id: 'projects',
    //       title: 'Projects',
    //       type: 'collapse',
    //       icon: icons.AccountTreeOutlinedIcon,
    // },

    //   children: [
    //     {
    //       id: 'projectlist',
    //       title: 'Project List',
    //       type: 'item',
    //       url: '/projectlist'
    //     },
    //     {
    //       id: 'newproject',
    //       title: 'Add Project',
    //       type: 'item',
    //       url: '/newproject'
    //     }
    //   ]
    // {
    //   id: 'tasks',
    //   title: 'Tasks',
    //   type: 'collapse',
    //   icon: icons.AssignmentOutlinedIcon,

    //   children: [
    //     {
    //       id: 'tasklist',
    //       title: 'Task List',
    //       type: 'item',
    //       url: '/tasklist'
    //     },
    //     {
    //       id: 'addtask',
    //       title: 'Add Task',
    //       type: 'item',
    //       url: '/addtask'
    //     }
    //   ]
    // },
    {
      id: 'employees',
      title: 'Employees',
      type: 'collapse',
      icon: icons.BadgeOutlinedIcon,

      children: [
        // {
        //   id: 'newemployee',
        //   title: 'Employee Self Services',
        //   type: 'item',
        //   url: '/newemployee'
        // },
        {
          id: 'employeelist',
          title: 'Employee Information Management',
          type: 'item',
          url: '/addemployeetable'
        },
        {
          id: 'employeeperformance',
          title: 'Employee Performance',
          type: 'item',
          url: '/employeeperformance'
        },
      ]
    },
    {
      id: 'leavemanagement',
      title: 'Leave Management',
      type: 'collapse',
      icon: icons.PermIdentityOutlinedIcon,

      children: [
        {
          id: 'leavetracker',
          title: 'Leave Tracker',
          type: 'item',
          url: '/leavetracker'
        },
        {
          id: 'attendancetracker',
          title: 'Attendance Tracker',
          type: 'item',
          url: '/attendancetracker'
        },
        {
          id: 'wfhtracker',
          title: 'WFH Tracker',
          type: 'item',
          url: '/wfhtracker'
        },
      ]
    },
    {
      id: 'performance',
      title: 'Performance',
      type: 'item',
      icon: icons.IconKey,
      url: '/performance'
    }
  ]
};

export default pages;
