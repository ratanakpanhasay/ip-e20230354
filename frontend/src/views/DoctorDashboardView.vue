
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useDoctorsStore } from '../stores/doctors'
import { useAppointmentsStore } from '../stores/appointments'
import { RouterLink } from 'vue-router'

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
  <main class="dashboard-page">

    <!-- Dashboard Header -->
    <header class="page-heading">
      <span class="page-label">DOCTOR WORKSPACE</span>

      <h1>Doctor Dashboard</h1>

      <p>
        Welcome, {{ doctor?.name ?? 'Doctor' }}.
        Manage your scheduled appointments.
      </p>
    </header>

    <RouterLink
      to="/doctor/availability"
      class="availability-button"
    >
      Manage Availability →
    </RouterLink>

    <!-- Appointment Summary -->
    <section class="summary-card">
      <div>
        <p>Upcoming Appointments</p>
        <h2>{{ myAppointments.length }}</h2>
      </div>

      <div class="summary-icon" aria-hidden="true">
        📅
      </div>
    </section>

    <!-- Appointment Schedule -->
    <section class="schedule-panel">
      <div class="section-heading">
        <h2>Scheduled Appointments</h2>
        <span>{{ myAppointments.length }} upcoming</span>
      </div>

      <!-- Loading State -->
      <p v-if="doctorsStore.status === 'loading'">
        Loading doctor information...
      </p>

      <!-- Error State -->
      <div v-else-if="doctorsStore.status === 'error'">
        <p role="alert">{{ doctorsStore.error }}</p>

        <button @click="doctorsStore.fetchDoctors()">
          Try Again
        </button>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="myAppointments.length === 0"
        class="empty-state"
      >
        <h3>No Upcoming Appointments</h3>
        <p>
          Your scheduled appointments will appear here.
        </p>
      </div>

      <!-- Appointment List -->
      <div v-else class="appointment-list">
        <article
          v-for="(appointment, index) in myAppointments"
          :key="appointment.id"
          class="appointment-card"
        >
          <div class="card-header">
            <h3>Appointment #{{ index + 1 }}</h3>

            <span class="status-badge">
              Upcoming
            </span>
          </div>

          <div class="appointment-details">
            <p>📅 Date: {{ appointment.date }}</p>
            <p>🕒 Time: {{ appointment.time }}</p>
          </div>
        </article>
      </div>
    </section>

    <p class="demo-note">
      Demo dashboard for Doctor ID 2.
    </p>
  </main>
</template>



<style scoped>
.dashboard-page {
  color: #17213c;
}

/* Page Heading */
.page-heading {
  margin-bottom: 32px;
}

.page-label {
  color: #0b1752;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
}

.page-heading h1 {
  font-size: 36px;
  margin: 12px 0;
}

.page-heading p {
  color: #64748b;
  font-size: 16px;
}

/* Summary Card */
.summary-card {
  background: #ffffff;
  border: 1px solid #e2e5ef;
  border-radius: 14px;
  padding: 28px;
  margin-bottom: 28px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  box-shadow: 0 4px 18px rgba(11, 23, 82, 0.10);
}

.summary-card p {
  color: #64748b;
  margin: 0;
}

.summary-card h2 {
  color: #0b1752;
  font-size: 40px;
  margin: 10px 0 0;
}

.summary-icon {
  background: #f0f2fa;
  padding: 16px;
  border-radius: 12px;
  font-size: 28px;
}

/* Schedule Panel */
.schedule-panel {
  background: white;
  border: 1px solid #e2e5ef;
  border-radius: 14px;
  padding: 28px;

  box-shadow: 0 4px 18px rgba(11, 23, 82, 0.10);
}

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.section-heading h2 {
  font-size: 24px;
  margin: 0;
}

.section-heading span {
  color: #64748b;
}

/* Appointment List */
.appointment-list {
  display: grid;
  gap: 16px;
}

.appointment-card {
  border: 1px solid #e2e5ef;
  border-radius: 12px;
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
}

.status-badge {
  background: #eaf2ff;
  color: #0b1752;
  padding: 7px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
}

.appointment-details {
  color: #64748b;
  margin-top: 16px;
}

.appointment-details p {
  margin: 8px 0;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 50px 20px;
  background: #f8f9fc;
  border-radius: 12px;
}

.empty-state h3 {
  color: #17213c;
}

.empty-state p,
.demo-note {
  color: #64748b;
}

.demo-note {
  margin-top: 20px;
  font-size: 13px;
}

/* Responsive Layout */
@media (max-width: 600px) {
  .page-heading h1 {
    font-size: 28px;
  }

  .summary-card,
  .schedule-panel {
    padding: 20px;
  }

  .section-heading {
    align-items: flex-start;
    flex-direction: column;
  }
}


.availability-button {
  display: inline-block;
  background: #0b1752;
  color: #ffffff;
  padding: 12px 22px;
  border-radius: 8px;
  font-weight: 600;
  margin-bottom: 28px;
  text-decoration: none;
}

.availability-button:hover {
  background: #172776;
  text-decoration: none;
}

</style>
