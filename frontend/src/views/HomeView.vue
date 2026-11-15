
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDoctorsStore } from '../stores/doctors'
import DoctorCard from '../components/DoctorCard.vue'

// Stores the text entered by the patient
const searchQuery = ref('')

// Access our shared Pinia store
const doctorsStore = useDoctorsStore()

// Filter doctors by name or specialty
const filteredDoctors = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()

  return doctorsStore.doctors.filter((doctor) => {
    return (
      doctor.name.toLowerCase().includes(query) ||
      doctor.specialty.toLowerCase().includes(query)
    )
  })
})

// Load doctors when the homepage appears
onMounted(() => {
  doctorsStore.fetchDoctors()
})
</script>

<template>
  <main>
    <h1>Welcome to MediBook</h1>
    <p>Your trusted clinic appointment booking system.</p>

    <h2>Find Your Doctor</h2>

    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search by name or specialty..."
    />

    <!-- Loading state -->
    <p v-if="doctorsStore.status === 'loading'">
      Loading doctors...
    </p>

    <!-- Error state -->
    <div v-else-if="doctorsStore.status === 'error'">
      <p>{{ doctorsStore.error }}</p>
      <button @click="doctorsStore.fetchDoctors()">
        Try Again
      </button>
    </div>

    <!-- Successfully loaded -->
    <div v-else-if="doctorsStore.status === 'success'">
      <p>Found {{ filteredDoctors.length }} doctor(s)</p>

      <div v-if="filteredDoctors.length > 0">
        <DoctorCard
          v-for="doctor in filteredDoctors"
          :key="doctor.id"
          :id="doctor.id"
          :name="doctor.name"
          :specialty="doctor.specialty"
        />
      </div>

      <p v-else>No doctors found. Try another search.</p>
    </div>
  </main>
</template>
