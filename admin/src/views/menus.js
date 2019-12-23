/**
 * 管理员菜单
 * @type {*[]}
 */

  // 查看菜单列表
const menus = [
    {
      name: "首页",
      path: "/",
      icon: "ios-navigate"
    },
    // 权限
    {
      name: "权限管理",
      path: "auth",
      icon: "md-list",
      children: [
        {
          name: "权限",
          path: "/auth",
          icon: "md-list"
        }
      ]
    },
    // 恋人信息
    {
      name: "恋人信息管理",
      path: "lover",
      icon: "md-list-box",
      children: [
        {
          name: "恋人",
          path: "/lover",
          icon: "md-list-box"
        }
      ]
    }
  ];

export {menus};
