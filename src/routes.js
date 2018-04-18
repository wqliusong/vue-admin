import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import Page7 from './views/nav4/Page7.vue';
import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '登录',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '错误',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '主页,主表',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: '人员' },
            { path: '/form', component: Form, name: '表单' },
            { path: '/user', component: user, name: '人员列表全' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '测试',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: 'vuex' },
            { path: '/page5', component: Page5, name: '空页面' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '单节点测试',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '单节点' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '超大表单弹窗',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page7', component: Page7, name: '超大表单弹窗' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '图表',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts图表' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;