import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Addemployeetable from 'views/addemployeetable/Addemployeetable';
import EmployeeForm from 'views/addemployeeform/EmployeeForm';
import Recruitment from 'views/recruitment/Recruitment'
import LeaveTrackerForm from 'views/leavemanagement/LeaveTrackerForm';
import AttendanceTracker from 'views/leavemanagement/AttendanceTracker'
import Performance from 'views/performance/Performance';
import LeaveTrackerList from 'views/leavemanagement/LeaveTrackerList';
import Employeeperformance from 'views/addemployeetable/Employeeperformance';
import ViewCalendar from 'views/leavemanagement/ViewCalendar';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: '/recruitment',
      element: <Recruitment />
    },
    {
      path: '/leavetrackerform',
      element: <LeaveTrackerForm />
    },
    {
      path: '/viewcalendar',
      element: <ViewCalendar />
    },
    {
      path: '/attendancetracker',
      element: <AttendanceTracker />
    },
    {
      path: '/performance',
      element: <Performance />
    },
    {
      path:'/LeaveTrackerList',
      element: <LeaveTrackerList />
    },
    // {
    //   path: '/projectlist',
    //   element: <ProjectList />
    // },
    // {
    //   path: "/newproject",
    //   element: <AddProject />
    // },
    // {
    //   path: "/editproject/:id",
    //   element: <AddProject />
    // },
    // {
    //   path: "/projectdetails/:id",
    //   element: <Projectdetails />
    // },
    // {
    //   path: '/UserList',
    //   element: <UserList />
    // },
    // {
    //   path: '/userform/:id',
    //   element: <UserForm />},
      {
      path: '/Addemployeetable',
      element: <Addemployeetable />
    },
    {
      path: '/employeeperformance',
      element: <Employeeperformance />
    },

    {
      path: '/newemployee',
      element: <EmployeeForm />
    },
    
  ]
};

export default MainRoutes;
