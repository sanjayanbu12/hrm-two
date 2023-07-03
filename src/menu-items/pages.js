// assets
import { IconKey } from '@tabler/icons';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';

// constant
const icons = {
  IconKey,
  BadgeOutlinedIcon,
  AssignmentOutlinedIcon,
  PermIdentityOutlinedIcon,
  AccountTreeOutlinedIcon
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
    //   icon: icons.IconKey
    // },
    {
      id: 'recruitment',
      title: 'Recruitment',
      type: 'collapse',
      url: '/recruitment',
      icon: icons.AccountTreeOutlinedIcon,
      children: [
        {
          id: 'recruitmentform',
          title: 'Recruitment Form',
          type: 'item',
          url: '/recruitmentform'
        },
        {
          id: 'recruitmenttable',
          title: 'Recruitment Table',
          type: 'item',
          url: '/recruitmenttable'
        },
        {
          id: 'applicationtracker',
          title: 'Application Tracker',
          type: 'item',
          url: '/applicationtracker'
        }
      ]
    },

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
        }
      ]
    },
    {
      id: 'leavemanagement',
      title: 'Leave Management',
      type: 'collapse',
      icon: icons.PermIdentityOutlinedIcon,

      children: [
        {
          id: 'leavetrackerform',
          title: 'Leave Tracker Form',
          type: 'item',
          url: '/leavetrackerform'
        },
        {
          id: 'leavetrackerlist',
          title: 'Leave Tracker List',
          type: 'item',
          url: '/leavetrackerlist'
        },
        {
          id: 'attendancetracker',
          title: 'Attendance Tracker',
          type: 'item',
          url: '/attendancetracker'
        },
        // {
        //   id: 'wfhtracker',
        //   title: 'WFH Tracker',
        //   type: 'item',
        //   url: '/wfhtracker'
        // }
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
