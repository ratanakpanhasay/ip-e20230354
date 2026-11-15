
<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAppointmentsStore } from '../stores/appointments'
import { useDoctorsStore } from '../stores/doctors'

// Access our existing Pinia stores
const appointmentsStore = useAppointmentsStore()
const doctorsStore = useDoctorsStore()

// Find a doctor's name using their ID
function getDoctorName(doctorId: number): string {
  const doctor = doctorsStore.doctors.find(
    (doctor) => doctor.id === doctorId
  )

  return doctor?.name ?? `Doctor #${doctorId}`
}

// Load doctor information if necessary
onMounted(() => {
  if (doctorsStore.status === 'idle') {
    doctorsStore.fetchDoctors()
  }
})
</script>

<template>
  <main>
    <h1>My Appointments</h1>
    <p>View and manage your medical appointments.</p>

    <RouterLink to="/">
      ← Back to Home
    </RouterLink>

    <h2>
      Total Appointments:
      {{ appointmentsStore.appointments.length }}
    </h2>

    <!-- Empty state -->
    <div v-if="appointmentsStore.appointments.length === 0">
      <p>You have no appointments yet.</p>

      <RouterLink to="/">
        Find a Doctor
      </RouterLink>
    </div>

    <!-- Appointment list -->
    <div v-else>
      <article
        v-for="appointment in appointmentsStore.appointments"
        :key="appointment.id"
        class="appointment-card"
      >
        <h3>{{ getDoctorName(appointment.doctorId) }}</h3>

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
