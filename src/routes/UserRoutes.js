import { lazy } from 'react';
// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AttendanceSystem from 'views/attendanceManagement/AttendanceSystem';
import EmployeeForm from 'views/addemployeeform/EmployeeForm';
import Employeeperformance from 'views/addemployeetable/Employeeperformance';
import Newevent from 'views/dashboard/Default/Newevent';
import EmployeeSelfServices from 'views/employeeselfservices/EmployeeSelfServices';
import NotFound404 from './NotFound404';
import LeaveTrackerForm from 'views/leavemanagement/LeaveTrackerForm';
import CourseOverview from 'views/learninganddevelopment/CourseOverview'
import EmployeeLogin from 'views/employeeselfservices/EmployeeLogin';
// dashboard routing
const DashboardEmployee = Loadable(lazy(() => import('views/dashboard/Employee')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardEmployee />
        }
      ]
    },
    {
      path: '/employeeperformance',
      element: <Employeeperformance />
    },
    {
      path: '/employeeselfservices',
      element: <EmployeeSelfServices />
    },
    {
      path: '/newemployee',
      element: <EmployeeForm />
    },
    {
      path: '*',
      element: <NotFound404 />
    },
  {
    path: '/attendanceManagement',
    element: <AttendanceSystem />
  },
  {
    path: '/requestleave',
    element: <RequestLeave />
  },
    {
      path: '/newevent',
      element: <Newevent />
    },
    {
      path: '/CourseOverview',
      element: <CourseOverview />
    },
    {
      path: '/employeedomain',
      element: <EmployeeLogin />
    },
  ]
};

export default MainRoutes;
