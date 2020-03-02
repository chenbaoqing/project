import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component:() => import( '../views/Home.vue') ,
    children:[
      {
        path: 'nowPlaying',
        component: () => import( '../views/NowPlaying.vue'),
      },{
        path: 'comingSoon',
        component: () => import( '../views/ComingSoon.vue'),
      }
    ],
    redirect:"/home/nowPlaying"
  },
  {
    path: '/about',
    name: 'about',
    component: () => import( '../views/About.vue')
  },
  {
    path: '/city',
    name: 'city',
    component: () => import( '../views/City.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import( '../views/Detail.vue')
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
