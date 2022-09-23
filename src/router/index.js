import Vue from "vue";
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
}
const routes = [
    {
        path: '/',
        component: () => import('@/components/Whole.vue'),
        redirect: 'login', 
        children: [
            {
                path: 'home',
                component: () => import('@/views/home.vue'),
                meta: {
                    title: '首页'
                }
            },
            {
                path: 'dataCollect',
                component: () => import('@/views/DataCollect/index.vue'),
                meta: {
                    title: '数据整理'
                },
                redirect: 'dataColllist',
                children: [
                    {
                        path: 'dataColllist',
                        component: () => import('@/views/DataCollect/test1.vue'),
                        meta: {
                            title: '数据整理'
                        },
                    }
                ]
            },
            {
                path: 'dataSort',
                component: () => import('@/views/DataSort/index.vue'),
                meta: {
                    title: '数据检索'
                },
                redirect: 'dataSortList',
                children: [
                    {
                        path: 'dataSortList',
                        component: () => import('@/views/DataSort/test1.vue'),
                        meta: {
                            title: '数据检索'
                        },
                    }
                ]
            },
            {
                path: 'dataRetrieval',
                component: () => import('@/views/DataRetrieval/index.vue'),
                meta: {
                    title: '数据收集'
                },
                redirect: 'dataRetrievalList',
                children: [
                    {
                        path: 'dataRetrievalList',
                        component: () => import('@/views/DataRetrieval/test1.vue'),
                        meta: {
                            title: '数据收集'
                        }
                    }
                ]
            },
            {
                path: 'disSub',
                component: () => import('@/views/DisSubsystem/index.vue'),
                meta: {
                    title: '显示分系统'
                },
                redirect: 'disSubDisMess',
                children: [
                    {
                        path: 'disSubDisMess',
                        component: () => import('@/views/DisSubsystem/DisMess.vue'),
                        meta: {
                            title: '统计信息'
                        }
                    },
                    {
                        path: 'disSubSysMess',
                        component: () => import('@/views/DisSubsystem/SysMess.vue'),
                        meta: {
                            title: '系统信息'
                        }
                    },
                ]
            },
            {
                path: 'system',
                component: () => import('@/views/System/index.vue'),
                meta: {
                    title: '系统管理',
                },
                redirect: 'systemMana',
                children: [
                    {
                        path: 'systemMana',
                        component: () => import('@/views/System/DataMana.vue'),
                        meta: {
                            title: '数据管理'
                        }
                    },
                    {
                        path: 'systemLogin',
                        component: () => import('@/views/System/LoginMana.vue'),
                        meta: {
                            title: '登陆日志'
                        }
                    },
                    {
                        path: 'systemUser',
                        component: () => import('@/views/System/UserMana.vue'),
                        meta: {
                            title: '用户管理'
                        }
                    },
                    {
                        path: 'systemRole',
                        component: () => import('@/views/System/RoleMana.vue'),
                        meta: {
                            title: '角色管理'
                        }
                    },
                    {
                        path: 'systemMenu',
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
        path: '/login', // 登录页面
        component: () => import('@/views/Login.vue'),
        name:'login',
        meta: {
            title: '登录'
        }
    },
]
export default new VueRouter({
    mode: 'history',
    base: '/',
    routes
})