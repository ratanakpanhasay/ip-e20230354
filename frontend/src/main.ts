
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import { useAvailabilityStore } from './stores/availability'
import './style.css'

import { useAppointmentsStore } from './stores/appointments'


// Create our Vue application
const app = createApp(App)

// Create and install Pinia
const pinia = createPinia()
app.use(pinia)
app.use(router)

// Access the availability store
const availabilityStore = useAvailabilityStore(pinia)

const storageKey = 'medibook-availability'

// Restore saved availability when the application starts
try {
  const saved = localStorage.getItem(storageKey)

  if (saved) {
    const schedules: unknown = JSON.parse(saved)

    if (Array.isArray(schedules)) {
      availabilityStore.$patch({ schedules })
    }
  }
} catch (error) {
  console.warn('Could not restore doctor availability:', error)
}

// Automatically save whenever availability changes
availabilityStore.$subscribe((_mutation, state) => {
  try {
    localStorage.setItem(
      storageKey,
      JSON.stringify(state.schedules)
    )
  } catch (error) {
    console.warn('Could not save doctor availability:', error)
  }
})


// Access the appointments store
const appointmentsStore = useAppointmentsStore(pinia)

const appointmentsStorageKey = 'medibook-appointments'

// Restore previously saved appointments
try {
  const saved = localStorage.getItem(appointmentsStorageKey)

  if (saved) {
    const appointments: unknown = JSON.parse(saved)

    if (Array.isArray(appointments)) {
      appointmentsStore.$patch({ appointments })
    }
  }
} catch (error) {
  console.warn('Could not restore appointments:', error)
}

// Save appointments whenever the store changes
appointmentsStore.$subscribe((_mutation, state) => {
  try {
    localStorage.setItem(
      appointmentsStorageKey,
      JSON.stringify(state.appointments)
    )
  } catch (error) {
    console.warn('Could not save appointments:', error)
  }
})


// Display the application
app.mount('#app')
