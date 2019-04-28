import Vue from 'vue'
import Router from 'vue-router'
import Index from "@/components/Index";
import Register from "@/components/Register";
import Login from "@/components/Login";
import Bloger from "../components/Bloger";
import Vister from "../components/Vister";
import Admin from "../components/Admin";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            hidden: true,
            component:Index
        },
        {
            path: '/Login',
            name: 'Login',
            hidden: true,
            component: Login
        },
        {
            path:'/register',
            name:'Register',
            hidden:true,
            component:Register
        },
        {
            path:'/bloger',
            name:'Bloger',
            hidden:true,
            component:Bloger
        },
        {
            path:'/vister',
            name:'Vister',
            hidden:true,
            component:Vister
        },
        {
            path:'/admin',
            name:'Admin',
            hidden:true,
            component:Admin
        }
    ]
})

