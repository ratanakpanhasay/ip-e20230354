
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import DoctorDetailView from '../views/DoctorDetailView.vue'
import MyAppointmentsView from '../views/MyAppointmentsView.vue'
import DoctorDashboardView from '../views/DoctorDashboardView.vue'
import ManageAvailabilityView from '../views/ManageAvailabilityView.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/doctors/:id',
      name: 'doctor-detail',
      component: DoctorDetailView,
    },
    {
      path: '/my-appointments',
      name: 'my-appointments',
      component: MyAppointmentsView,
    },
    {
      path: '/doctor/dashboard',
      name: 'doctor-dashboard',
      component: DoctorDashboardView,
    },
    {
      path: '/doctor/availability',
      name: 'doctor-availability',
      component: ManageAvailabilityView,
    },
  ],
})

export default router

