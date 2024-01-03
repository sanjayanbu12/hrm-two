import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import Context from 'views/pages/landing/components/usecontext/Context';
import AccountSettingV2 from 'views/accountsetting/accountSettingV2/AccountSettingV2';

// login option 3 routing
const LandingPage = Loadable(lazy(() => import('views/pages/landing/components/landingpage/Landingpage')));
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const ProductPage = Loadable(lazy(() => import('views/pages/landing/components/product/ProductPage')));
const PricingPage = Loadable(lazy(() => import('views/pages/landing/components/pricing/PricingPage')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: (
        <Context>
          <LandingPage />
        </Context>
      )
    },
    {
      path: '/accountsettingv2',
      element: (
        <AccountSettingV2 />
      )
    },
    {
      path: '/pages/login/login3',
      element: <AuthLogin3 />
    },
    {
      path: '/pages/register/register3',
      element: <AuthRegister3 />
    },
    {
      path: '/product',
      element: (
        <Context>
          <ProductPage />
        </Context>
      )
    },
    {
      path: '/pricing',

      element: (
        <Context>
          <PricingPage />
        </Context>
      )
    }
  ]
};

export default AuthenticationRoutes;
