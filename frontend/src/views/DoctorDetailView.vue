
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useDoctorsStore } from '../stores/doctors'

import BookingForm from '../components/BookingForm.vue'


// Get the current URL information
const route = useRoute()

// Access the shared doctors store
const doctorsStore = useDoctorsStore()

// Find the doctor using the ID in the URL
const doctor = computed(() => {
  const id = Number(route.params.id)

  return doctorsStore.doctors.find(
    (doctor) => doctor.id === id
  )
})

// Load doctors if they haven't been loaded yet
onMounted(() => {
  if (doctorsStore.status === 'idle') {
    doctorsStore.fetchDoctors()
  }
})
</script>

<template>
  <main>
    <RouterLink to="/">← Back to Doctors</RouterLink>

    <p v-if="doctorsStore.status === 'loading'">
      Loading doctor information...
    </p>

    <div v-else-if="doctorsStore.status === 'error'">
      <p>{{ doctorsStore.error }}</p>
      <button @click="doctorsStore.fetchDoctors()">
        Try Again
      </button>
    </div>

    <section v-else-if="doctor">
      <h1>{{ doctor.name }}</h1>
      <p>Specialty: {{ doctor.specialty }}</p>

      <BookingForm :doctor-id="doctor.id" />

      <p>
        <RouterLink to="/my-appointments">
          View My Appointments
        </RouterLink>
      </p>
    </section>

    <p v-else-if="doctorsStore.status === 'success'">
      Doctor not found.
    </p>
  </main>
</template>
