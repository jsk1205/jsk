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
            title: '整体页面布局'
        },
        redirect: '/Home', // 重定向到首页
        children: [
            {
                path: '/Home',
                component: () => import('@/views/Home.vue'),
                meta: {
                    title: '首页'
                }
            },
            {
                path: '/FormGenerator',
                component: () => import('@/views/FormGenerator/index.vue'),
                meta: {
                    title: '一级菜单1'
                },
                redirect: '/FormGenerator/FormGenerator-1', // 该配置是若点击选择一级菜单时，默认选中并跳转到该一级菜单下的第一个二级菜单
                children: [
                    {
                        path: 'FormGenerator-1',
                        component: () => import('@/views/FormGenerator/test1.vue'),
                        meta: {
                            title: '二级菜单1-1'
                        },
                    },
                    {
                        path: 'FormGenerator-2',
                        component: () => import('@/views/FormGenerator/test2.vue'),
                        meta: {
                            title: '二级菜单1-2'
                        },
                    },
                ]
            },
            {
                path: '/EchartsTable',
                component: () => import('@/views/EchartsTable/index.vue'),
                meta: {
                    title: '一级菜单2'
                },
                redirect: '/EchartsTable/EchartsTable-1', // 该配置是若点击选择父目录时，默认选中该父目录下的子路径页面
                children: [
                    {
                        path: 'EchartsTable-1',
                        component: () => import('@/views/EchartsTable/test1.vue'),
                        meta: {
                            title: '二级菜单2-1'
                        },
                    },
                    {
                        path: 'EchartsTable-2',
                        component: () => import('@/views/EchartsTable/test2.vue'),
                        meta: {
                            title: '二级菜单2-2'
                        },
                    },
                ]
            },
            {
                path: '/EchartsRela',
                component: () => import('@/views/EchartsRela/index.vue'),
                meta: {
                    title: '一级菜单3'
                },
                redirect: '/EchartsRela/EchartsRela-1',
                children: [
                    {
                        path: 'EchartsRela-1',
                        component: () => import('@/views/EchartsRela/test1.vue'),
                        meta: {
                            title: '二级菜单3-1'
                        }
                    },
                    {
                        path: 'EchartsRela-2',
                        component: () => import('@/views/EchartsRela/test2.vue'),
                        meta: {
                            title: '二级菜单3-2'
                        }
                    },
                ]
            },
            {
                path: '/ThreeMode',
                component: () => import('@/views/ThreeMode/index.vue'),
                meta: {
                    title: '国际化'
                },
                redirect: '/ThreeMode/ThreeMode-1',
                children: [
                    {
                        path: 'ThreeMode-1',
                        component: () => import('@/views/ThreeMode/test1.vue'),
                        meta: {
                            title: '二级菜单4-1'
                        }
                    },
                    {
                        path: 'ThreeMode-2',
                        component: () => import('@/views/ThreeMode/test2.vue'),
                        meta: {
                            title: '二级菜单4-2'
                        }
                    },
                ]
            },
            {
                path: '/permission', // 权限页面
                component: () => import('@/views/Permission.vue'),
                meta: {
                    title: '权限测试',
                    permission: true
                },
                
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
    // {
    //     path: '*',
    //     redirect: '/404'
    // }
]
export default new VueRouter({
    mode: 'history',
    base: '/',
    routes
})