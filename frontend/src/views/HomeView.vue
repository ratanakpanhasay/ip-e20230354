
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
    <!-- Hero Section -->
    <section class="hero">
      <span class="hero-label">
        YOUR HEALTH, OUR PRIORITY
      </span>

      <h1>Find the Right Doctor for You</h1>

      <p>
        Explore our medical specialists and book
        appointments at your convenience.
      </p>

      <a href="#doctors" class="hero-button">
        Explore Doctors
      </a>
    </section>

    <!-- Search Section -->
    <section id="doctors" class="doctors-section">
      <div class="section-heading">
        <div>
          <h2>Our Doctors</h2>
          <p>Find a specialist for your healthcare needs.</p>
        </div>
      </div>

      <div class="search-box">
        <label for="doctor-search">Search Doctors</label>

        <input
          id="doctor-search"
          v-model="searchQuery"
          type="search"
          placeholder="Search by name or specialty..."
        />
      </div>

      <!-- Loading State -->
      <p v-if="doctorsStore.status === 'loading'">
        Loading doctors...
      </p>

      <!-- Error State -->
      <div v-else-if="doctorsStore.status === 'error'">
        <p role="alert">{{ doctorsStore.error }}</p>

        <button @click="doctorsStore.fetchDoctors()">
          Try Again
        </button>
      </div>

      <!-- Successfully Loaded -->
      <div v-else-if="doctorsStore.status === 'success'">
        <p class="results-count">
          Found {{ filteredDoctors.length }} doctor(s)
        </p>

        <div
          v-if="filteredDoctors.length > 0"
          class="doctors-grid"
        >
          <DoctorCard
            v-for="doctor in filteredDoctors"
            :key="doctor.id"
            :id="doctor.id"
            :name="doctor.name"
            :specialty="doctor.specialty"
          />
        </div>

        <p v-else>
          No doctors found. Try another search.
        </p>
      </div>
    </section>
  </main>
</template>


<style scoped>
/* Hero Section */

/* Hero Banner */

.hero {
  background: #0B1752;
  padding: 52px 32px;
  border-radius: 16px;
  text-align: center;
}

.hero-label {
  color: #CDD5F4;
}

.hero h1 {
  color: #FFFFFF;
}

.hero p {
  color: #FFFFFF;
}

.hero-button {
  display: inline-block;
  background: #FFFFFF;
  color: #0B1752;
  padding: 12px 26px;
  border-radius: 8px;
  font-weight: 600;
}


.hero-button:hover {
  background: #e8f1fa;
  text-decoration: none;
}

/* Doctor Section */
.doctors-section {
  padding-top: 36px;
}
.section-heading h2 {
  font-size: 30px;
  margin-bottom: 8px;
}

.section-heading p {
  color: #64748b;
}

.search-box {
  margin-top: 28px;
}

.search-box label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
}

.search-box input {
  width: 100%;
  max-width: 500px;
  padding: 14px 18px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
}

.results-count {
  color: #64748b;
  margin: 24px 0 16px;
}

/* Responsive Doctor Grid */
.doctors-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

@media (max-width: 900px) {
  .doctors-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .hero {
    padding: 48px 20px;
  }

  .doctors-grid {
    grid-template-columns: 1fr;
  }
}
</style>
