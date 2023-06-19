import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ProjectList from 'views/projects/ProjectList';
import AddProject from 'views/projects/AddProject';
import Projectdetails from 'views/projects/Projectdetails';
import SampleList from 'views/sample/SampleList';
import SampleForm from 'views/sample/SampleForm';
import UserList from 'views/User/UserList';
import UserForm from 'views/User/UserForm';
import Addemployeetable from 'views/addemployeetable/Addemployeetable';
import EmployeeForm from 'views/addemployeeform/EmployeeForm';
import TaskList from 'views/task/TaskList';
import AddTaskForm from 'views/task/AddTaskForm';
import Recyclebin from 'views/task/Recyclebin';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
// const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
// const SamplePage = Loadable(lazy(() => import('views/sample-page')));

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
      path: '/samplelist',
      element: <SampleList />
    },
    {
      path: '/tasklist',
      element: <TaskList />
    },
    {
      path: '/newsample',
      element: <SampleForm />
    },
    {
      path: '/projectlist',
      element: <ProjectList />
    },
    {
      path: "/newproject",
      element: <AddProject />
    },
    {
      path: "/editproject/:id",
      element: <AddProject />
    },
    {
      path: "/projectdetails/:id",
      element: <Projectdetails />
    },
    {
      path: '/UserList',
      element: <UserList />
    },
    {
      path: '/userform/:id',
      element: <UserForm />},
      {
      path: '/Addemployeetable',
      element: <Addemployeetable />
    },
    {
      path: '/newemployee',
      element: <EmployeeForm />
    },
    {
      path: '/editemployee/:id',
      element: <EmployeeForm />
    },
   {
      path: '/addtask',
      element: <AddTaskForm/>
    },
    {
      path: "/edittask/:id",
      element: <AddTaskForm/>
    },
    {
      path: '/recyclebin',
      element: <Recyclebin />,
    }
    
  ]
};

export default MainRoutes;
