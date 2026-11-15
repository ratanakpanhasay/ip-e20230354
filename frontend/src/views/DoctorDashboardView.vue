
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useDoctorsStore } from '../stores/doctors'
import { useAppointmentsStore } from '../stores/appointments'

// Access our existing stores
const doctorsStore = useDoctorsStore()
const appointmentsStore = useAppointmentsStore()

// Temporary doctor ID for our prototype
const demoDoctorId = 2

// Find this doctor's information
const doctor = computed(() => {
  return doctorsStore.doctors.find(
    (doctor) => doctor.id === demoDoctorId
  )
})

// Show only this doctor's upcoming appointments
const myAppointments = computed(() => {
  return appointmentsStore.appointments.filter(
    (appointment) =>
      appointment.doctorId === demoDoctorId &&
      appointment.status === 'upcoming'
  )
})

// Load doctor information when the dashboard opens
onMounted(() => {
  if (doctorsStore.status === 'idle') {
    doctorsStore.fetchDoctors()
  }
})
</script>

<template>
  <main>
    <h1>Doctor Dashboard</h1>

    <h2>Welcome, {{ doctor?.name ?? 'Doctor' }}</h2>
    <p>Manage your scheduled appointments.</p>

    <h2>Upcoming Appointments: {{ myAppointments.length }}</h2>

    <p v-if="myAppointments.length === 0">
      You have no upcoming appointments.
    </p>

    <div v-else>
      <article
        v-for="appointment in myAppointments"
        :key="appointment.id"
        class="appointment-card"
      >
        <h3>Appointment</h3>
        <p>Date: {{ appointment.date }}</p>
        <p>Time: {{ appointment.time }}</p>
        <p>Status: {{ appointment.status }}</p>
      </article>
    </div>
  </main>
</template>

<style scoped>
.appointment-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
}
</style>
