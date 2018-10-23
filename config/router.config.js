export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        hideChildrenInMenu: true,
        component: './Dashboard/MainPage',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
          },
        ],
      },
      // car
      {
        path: '/car',
        name: 'car',
        icon: 'car',
        routes: [
          {
            path: '/car/basic',
            name: 'basic',
            component: './Car/BaseInfo',
            icon: 'database',
          },
          {
            path: '/car/obd',
            name: 'obd',
            component: './Car/Obd',
            icon: 'gateway',
          },
          {
            path: '/car/user',
            name: 'buser',
            authority: ['admin'],
            component: './Car/BindUser',
            icon: 'team',
          },
          {
            path: '/car/insur',
            name: 'insur',
            component: './Car/CarInsur',
            icon: 'insurance',
          },
          {
            path: '/car/mot',
            name: 'mot',
            component: './Car/CarMot',
            icon: 'safety-certificate',
          },
          {
            path: '/car/mot/:eidParam',
            name: 'mot',
            component: './Car/CarMot',
            icon: 'safety-certificate',
            hideInMenu: true,
          },
        ],
      },
      // equip
      {
        path: '/equip',
        name: 'equip',
        icon: 'fork',
        routes: [
          {
            path: '/equip/list',
            name: 'listview',
            component: './Equip/ListView',
            icon: 'deployment-unit',
          },
          {
            path: '/equip/lic',
            name: 'license',
            authority: ['admin'],
            component: './Equip/LicAuth',
            icon: 'usb',
          },
          {
            path: '/equip/consum',
            name: 'consum',
            authority: ['admin'],
            component: './Equip/Consum',
            icon: 'gold',
          },
          {
            path: '/equip/warning',
            name: 'warning',
            authority: ['admin'],
            component: './Equip/Warning',
            icon: 'warning',
          },
        ],
      },
      // sales
      {
        path: '/sales',
        name: 'sales',
        icon: 'shop',
        authority: ['admin'],
        routes: [
          {
            path: '/sales/score',
            name: 'score',
            component: './Sales/Score',
            icon: 'shopping-cart',
          },
          {
            path: '/sales/record',
            name: 'record',
            component: './Sales/Record',
            icon: 'tool',
          },
        ],
      },
      // system
      {
        path: '/sys',
        name: 'sys',
        icon: 'setting',
        component: './Sys/Index',
        routes: [],
      },
      // forms
      {
        path: '/form',
        icon: 'form',
        name: 'form',
        authority: ['admin'],
        hideInMenu: true,
        routes: [
          {
            path: '/form/basic-form',
            name: 'basicform',
            component: './Forms/BasicForm',
          },
          {
            path: '/form/step-form',
            name: 'stepform',
            component: './Forms/StepForm',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/form/step-form',
                name: 'stepform',
                redirect: '/form/step-form/info',
              },
              {
                path: '/form/step-form/info',
                name: 'info',
                component: './Forms/StepForm/Step1',
              },
              {
                path: '/form/step-form/confirm',
                name: 'confirm',
                component: './Forms/StepForm/Step2',
              },
              {
                path: '/form/step-form/result',
                name: 'result',
                component: './Forms/StepForm/Step3',
              },
            ],
          },
          {
            path: '/form/advanced-form',
            name: 'advancedform',
            authority: ['admin'],
            component: './Forms/AdvancedForm',
          },
        ],
      },
      // list
      {
        path: '/list',
        icon: 'table',
        name: 'list',
        authority: ['admin'],
        hideInMenu: true,
        routes: [
          {
            path: '/list/table-list',
            name: 'searchtable',
            component: './List/TableList',
          },
          {
            path: '/list/basic-list',
            name: 'basiclist',
            component: './List/BasicList',
          },
          {
            path: '/list/card-list',
            name: 'cardlist',
            component: './List/CardList',
          },
          {
            path: '/list/search',
            name: 'searchlist',
            component: './List/List',
            routes: [
              {
                path: '/list/search',
                redirect: '/list/search/articles',
              },
              {
                path: '/list/search/articles',
                name: 'articles',
                component: './List/Articles',
              },
              {
                path: '/list/search/projects',
                name: 'projects',
                component: './List/Projects',
              },
              {
                path: '/list/search/applications',
                name: 'applications',
                component: './List/Applications',
              },
            ],
          },
        ],
      },
      {
        path: '/profile',
        name: 'profile',
        icon: 'profile',
        authority: ['admin'],
        hideInMenu: true,
        routes: [
          // profile
          {
            path: '/profile/basic',
            name: 'basic',
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/advanced',
            name: 'advanced',
            authority: ['admin'],
            component: './Profile/AdvancedProfile',
          },
        ],
      },
      {
        name: 'result',
        icon: 'check-circle-o',
        path: '/result',
        authority: ['admin'],
        hideInMenu: true,
        routes: [
          // result
          {
            path: '/result/success',
            name: 'success',
            component: './Result/Success',
          },
          { path: '/result/fail', name: 'fail', component: './Result/Error' },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        hideInMenu: true,
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
