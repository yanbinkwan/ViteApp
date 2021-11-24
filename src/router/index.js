// import { createWebHistory, createRouter } from "vue-router";
import { createWebHistory, createRouter } from './grouter'

import Home from '../pages/home.vue'
import About from '../pages/about.vue'
import Login from '../pages/login.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/login', name: 'Login', component: Login, hidden: true }]

const router = createRouter({ history: createWebHistory(), routes })

export default router;