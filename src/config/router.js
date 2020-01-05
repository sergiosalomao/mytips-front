import Vue from 'vue';
import VueRouter from 'vue-router';
import ListaTips from '@/pages/tips/Lista'
import CadastroTip from '@/pages/tips/Cadastro'
import ListaCategoria from '@/pages/categoria/Lista'
import CadastroCategoria from '@/pages/categoria/Cadastro'


Vue.use(VueRouter);


const routes = [
    {
        path: '/',
        component: ListaTips,
        
    },
    {
        path: '/lista',
        component: ListaTips,
        
    },
    {
        name: 'Add tip',
        path: '/tips/cadastro',
        component: CadastroTip
    },
    {
        name: 'Editar tip',
        path: '/tips/editar/:id',
        component: CadastroTip,
        
    },
    {
        path: '/categorias',
        component: ListaCategoria,
        
    },
    {
        name: 'Add categoria',
        path: '/categorias/cadastro',
        component: CadastroCategoria
    },
    {
        name: 'Editar Categoria',
        path: '/categorias/editar/:id',
        component: CadastroCategoria,
        
    },
  
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router