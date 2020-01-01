import Vue from 'vue';

import Principal from '@/pages/principal/Principal'
import VueRouter from 'vue-router';
Vue.use(VueRouter);



const routes = [

    {
        path: '/home',
        component: Principal
    },

]

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router
