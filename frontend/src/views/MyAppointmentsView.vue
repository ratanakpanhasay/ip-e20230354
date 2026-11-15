
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
  <main class="appointments-page">
    <div class="page-heading">
      <div>
        <h1>My Appointments</h1>
        <p>View and manage your medical appointments.</p>
      </div>

      <RouterLink to="/" class="new-booking-button">
        + Book New Appointment
      </RouterLink>
    </div>

    <!-- Appointment Summary -->
    <section class="summary-card">
      <p>Total Appointments</p>
      <h2>{{ appointmentsStore.appointments.length }}</h2>
    </section>

    <!-- Empty State -->
    <section
      v-if="appointmentsStore.appointments.length === 0"
      class="empty-state"
    >
      <h2>No Appointments Yet</h2>
      <p>
        You haven't booked any appointments.
        Find a doctor to get started.
      </p>

      <RouterLink to="/" class="new-booking-button">
        Find a Doctor
      </RouterLink>
    </section>

    <!-- Appointment List -->
    <section v-else class="appointments-grid">
      <article
        v-for="appointment in appointmentsStore.appointments"
        :key="appointment.id"
        class="appointment-card"
      >
        <div class="card-header">
          <div>
            <h3>{{ getDoctorName(appointment.doctorId) }}</h3>
            <p>Doctor Appointment</p>
          </div>

          <span
            class="status-badge"
            :class="appointment.status"
          >
            {{ appointment.status }}
          </span>
        </div>

        <div class="appointment-details">
          <p>📅 Date: {{ appointment.date }}</p>
          <p>🕒 Time: {{ appointment.time }}</p>
        </div>

        <RouterLink
          :to="`/doctors/${appointment.doctorId}`"
          class="view-button"
        >
          View Doctor Profile
        </RouterLink>
      </article>
    </section>
  </main>
</template>


<style scoped>
.appointments-page {
  color: #17213c;
}

/* Page Heading */
.page-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.page-heading h1 {
  font-size: 36px;
  margin: 0 0 8px;
}

.page-heading p {
  color: #64748b;
  margin: 0;
}

/* Primary Buttons */
.new-booking-button,
.view-button {
  display: inline-block;
  background: #0b1752;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
}

.new-booking-button:hover,
.view-button:hover {
  background: #172776;
  text-decoration: none;
}

/* Summary */
.summary-card {
  background: #ffffff;
  border: 1px solid #e2e5ef;
  border-radius: 14px;
  padding: 24px;
  margin-bottom: 28px;
  box-shadow: 0 4px 18px rgba(11, 23, 82, 0.1);
}

.summary-card p {
  color: #64748b;
  margin: 0;
}

.summary-card h2 {
  color: #0b1752;
  font-size: 36px;
  margin: 8px 0 0;
}

/* Appointment Grid */
.appointments-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.appointment-card {
  background: white;
  border: 1px solid #e2e5ef;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 4px 18px rgba(11, 23, 82, 0.12);

  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.card-header h3 {
  font-size: 21px;
  margin: 0 0 6px;
}

.card-header p {
  color: #64748b;
  margin: 0;
}

/* Appointment Status */
.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: capitalize;
}

.status-badge.upcoming {
  background: #eaf2ff;
  color: #0b1752;
}

.status-badge.completed {
  background: #e8f7ee;
  color: #17603a;
}

.status-badge.cancelled {
  background: #fff1f0;
  color: #b42318;
}

.appointment-details {
  color: #475569;
  border-top: 1px solid #e2e5ef;
  padding-top: 12px;
}

.appointment-details p {
  margin: 10px 0;
}

.view-button {
  margin-top: auto;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 24px;
  background: white;
  border: 1px solid #e2e5ef;
  border-radius: 14px;
  box-shadow: 0 4px 18px rgba(11, 23, 82, 0.1);
}

.empty-state p {
  color: #64748b;
  margin-bottom: 24px;
}

/* Responsive Layout */
@media (max-width: 768px) {
  .appointments-grid {
    grid-template-columns: 1fr;
  }

  .page-heading h1 {
    font-size: 28px;
  }
}
</style>
