
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
  <main class="profile-page">
    <RouterLink to="/" class="back-link">
      ← Back to Doctors
    </RouterLink>

    <p v-if="doctorsStore.status === 'loading'">
      Loading doctor information...
    </p>

    <div v-else-if="doctorsStore.status === 'error'">
      <p role="alert">{{ doctorsStore.error }}</p>
      <button @click="doctorsStore.fetchDoctors()">
        Try Again
      </button>
    </div>

    <section v-else-if="doctor" class="profile-layout">
      <!-- Doctor Information -->
      <div class="profile-card">
        <div class="doctor-avatar">MD</div>

        <p class="profile-label">DOCTOR PROFILE</p>

        <h1>{{ doctor.name }}</h1>
        <p class="specialty">{{ doctor.specialty }}</p>

        <p class="description">
          Select your preferred appointment date
          and time using the booking form.
        </p>
      </div>

      <!-- Booking Form -->
      <div class="booking-panel">
        <BookingForm :doctor-id="doctor.id" />

        <RouterLink
          to="/my-appointments"
          class="appointments-link"
        >
          View My Appointments →
        </RouterLink>
      </div>
    </section>

    <p v-else-if="doctorsStore.status === 'success'">
      Doctor not found.
    </p>
  </main>
</template>


<style scoped>
.back-link {
  display: inline-block;
  color: #0b1752;
  font-weight: 600;
  margin-bottom: 28px;
}

.profile-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 28px;
  align-items: start;
}

.profile-card,
.booking-panel {
  background: #ffffff;
  border: 1px solid #e2e5ef;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 18px rgba(11, 23, 82, 0.12);
}

.doctor-avatar {
  width: 80px;
  height: 80px;
  background: #f0f2fa;
  color: #0b1752;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  font-weight: 700;
}

.profile-label {
  color: #0b1752;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-top: 28px;
}

.profile-card h1 {
  color: #17213c;
  font-size: 36px;
  margin: 12px 0;
}

.specialty {
  color: #64748b;
  font-size: 18px;
}

.description {
  color: #64748b;
  line-height: 1.7;
  margin-top: 24px;
}

.appointments-link {
  display: inline-block;
  color: #0b1752;
  font-weight: 600;
  margin-top: 24px;
}

@media (max-width: 768px) {
  .profile-layout {
    grid-template-columns: 1fr;
  }

  .profile-card,
  .booking-panel {
    padding: 24px;
  }
}
</style>
