import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login'
import Group from './views/main'
import User from './views/user'
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
            path:'/user',
            component:User
        },
        {
            path:'/registration',
            component:()=>import('./views/registration.vue')
        }
    ]
})