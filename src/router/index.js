import Vue from "vue";
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
}
const routes = [
    {
        path: '/', // 程序启动默认路由
        component: () => import('@/components/Whole.vue'),
        meta: {
            title: '首页'
        },
        redirect: '/Login', // 重定向到首页
        children: [
            {
                path: '/Home',
                component: () => import('@/views/home.vue'),
                meta: {
                    title: '首页'
                }
            },
            {
                path: '/DataCollect',
                component: () => import('@/views/DataCollect/index.vue'),
                meta: {
                    title: '数据收集'
                },
                redirect: '/DataCollect/DataCollect', // 该配置是若点击选择一级菜单时，默认选中并跳转到该一级菜单下的第一个二级菜单
                children: [
                    {
                        path: 'DataCollect',
                        component: () => import('@/views/DataCollect/test1.vue'),
                        meta: {
                            title: '数据收集'
                        },
                    },
                    // {
                    //     path: 'DataCollect-2',
                    //     component: () => import('@/views/DataCollect/test2.vue'),
                    //     meta: {
                    //         title: '二级菜单1-2'
                    //     },
                    // },
                ]
            },
            {
                path: '/DataSort',
                component: () => import('@/views/DataSort/index.vue'),
                meta: {
                    title: '一级菜单2'
                },
                redirect: '/DataSort/DataSort-1', // 该配置是若点击选择父目录时，默认选中该父目录下的子路径页面
                children: [
                    {
                        path: 'DataSort-1',
                        component: () => import('@/views/DataSort/test1.vue'),
                        meta: {
                            title: '二级菜单2-1'
                        },
                    },
                    {
                        path: 'DataSort-2',
                        component: () => import('@/views/DataSort/test2.vue'),
                        meta: {
                            title: '二级菜单2-2'
                        },
                    },
                ]
            },
            {
                path: '/DataRetrieval',
                component: () => import('@/views/DataRetrieval/index.vue'),
                meta: {
                    title: '一级菜单3'
                },
                redirect: '/DataRetrieval/DataRetrieval-1',
                children: [
                    {
                        path: 'DataRetrieval-1',
                        component: () => import('@/views/DataRetrieval/test1.vue'),
                        meta: {
                            title: '二级菜单3-1'
                        }
                    },
                    {
                        path: 'DataRetrieval-2',
                        component: () => import('@/views/DataRetrieval/test2.vue'),
                        meta: {
                            title: '二级菜单3-2'
                        }
                    },
                ]
            },
            {
                path: '/DisSubsystem',
                component: () => import('@/views/DisSubsystem/index.vue'),
                meta: {
                    title: '显示分系统'
                },
                redirect: '/DisSubsystem/DisMess',
                children: [
                    {
                        path: 'DisMess',
                        component: () => import('@/views/DisSubsystem/DisMess.vue'),
                        meta: {
                            title: '统计信息'
                        }
                    },
                    {
                        path: 'SysMess',
                        component: () => import('@/views/DisSubsystem/SysMess.vue'),
                        meta: {
                            title: '系统信息'
                        }
                    },
                ]
            },
            {
                path: '/System', // 权限页面
                component: () => import('@/views/System/index.vue'),
                meta: {
                    title: '权限测试',
                    permission: true
                },
                redirect: '/System/DataMana',
                children: [
                    {
                        path: 'DataMana',
                        component: () => import('@/views/System/DataMana.vue'),
                        meta: {
                            title: '数据管理'
                        }
                    },
                    {
                        path: 'LoginMana',
                        component: () => import('@/views/System/LoginMana.vue'),
                        meta: {
                            title: '登陆日志'
                        }
                    },
                    {
                        path: 'UserMana',
                        component: () => import('@/views/System/UserMana.vue'),
                        meta: {
                            title: '用户管理'
                        }
                    },
                    {
                        path: 'RoleMana',
                        component: () => import('@/views/System/RoleMana.vue'),
                        meta: {
                            title: '角色管理'
                        }
                    },
                    {
                        path: 'MenuMana',
                        component: () => import('@/views/System/MenuMana.vue'),
                        meta: {
                            title: '菜单管理'
                        }
                    },
                ]
            },
            {
                path: '/404',
                component: () => import('@/views/404.vue'),
                meta: {
                    title: '404'
                }
            },
            {
                path: '/403',
                component: () => import('@/views/403.vue'),
                meta: {
                    title: '403'
                }
            },
        ]
    },
    {
        path: '/Login', // 登录页面
        component: () => import('@/views/Login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/',
        redirect: '/Home'
    }
]
export default new VueRouter({
    mode: 'history',
    base: '/',
    routes
})