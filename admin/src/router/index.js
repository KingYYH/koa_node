const routers = [
  {
    path: '/login',
    meta: {
      title: "登录",
      noAuth: true
    },
    component: (resolve) => require(['../views/login.vue'], resolve),
  },
  {
    path: '/',
    component(resolve) {
      require(['../views/layout.vue'], resolve);
    },
    children: [
      {
        path: '/',
        name: 'index',
        meta: {module: "/", title: '首页'},
        component(resolve) {
          require(['../views/index.vue'], resolve);
        }
      },
      {
        path: 'admin',
        name: 'admin',
        meta: {module: "/admin", group: "set", title: '管理员 - 列表'},
        component: (resolve) => require(['../views/admin/index.vue'], resolve),
      },
      {
        path: 'lover',
        name: 'lover',
        meta: {module: "/lover", group: "lover", title: '恋人 - 列表'},
        component: (resolve) => require(['../views/lover/index.vue'], resolve),
      },
      {
        path: 'auth',
        name: 'auth',
        meta: {module: "/auth", group: "auth", title: '权限 - 列表'},
        component: (resolve) => require(['../views/auth/index.vue'], resolve),
      },
      {
        path: '/403',
        name: '403',
        meta: {module: "/", title: '403 - 权限不足'},
        component(resolve) {
          require(['../views/403.vue'], resolve);
        }
      },
      {
        path: '*',
        name: '404',
        meta: {module: "/", title: '404 - 页面不存在'},
        component(resolve) {
          require(['../views/404.vue'], resolve);
        }
      }
    ]
  }
];

export default routers;
