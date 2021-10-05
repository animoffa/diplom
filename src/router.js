import Vue from 'vue'
import Router from 'vue-router'
import Group from './views/main'
import Login from './views/login'
Vue.use(Router)

export default new Router({
    mode:'history',
    routes:[
        {
            path:'/',
            component:Group
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/registration',
            component:()=>import('./views/registration.vue')
        }
    ]
})