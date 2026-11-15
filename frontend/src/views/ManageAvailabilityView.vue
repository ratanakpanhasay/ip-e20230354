
<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAvailabilityStore } from '../stores/availability'

// Access the availability store
const availabilityStore = useAvailabilityStore()

// Temporary logged-in doctor for our prototype
const doctorId = 2

// All available days
const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

// Get the doctor's existing schedule
const savedSchedule = availabilityStore.schedules.find(
  (schedule) => schedule.doctorId === doctorId
)

// Editable form data
const workingDays = ref<string[]>(
  savedSchedule ? [...savedSchedule.workingDays] : []
)

const startTime = ref(savedSchedule?.startTime ?? '09:00')
const endTime = ref(savedSchedule?.endTime ?? '17:00')

// Feedback messages
const error = ref('')
const success = ref('')

// Save availability after validation
function saveSchedule() {
  error.value = ''
  success.value = ''

  if (workingDays.value.length === 0) {
    error.value = 'Please select at least one working day.'
    return
  }

  if (
    !startTime.value ||
    !endTime.value ||
    startTime.value >= endTime.value
  ) {
    error.value = 'Please select valid working hours.'
    return
  }

  availabilityStore.saveAvailability({
    doctorId,
    workingDays: [...workingDays.value],
    startTime: startTime.value,
    endTime: endTime.value,
  })

  
console.log(
  'Saved schedule:',
  JSON.stringify(availabilityStore.schedules, null, 2)
)
  success.value = 'Availability saved successfully!'
}
</script>

<template>
  <main class="availability-page">
    <RouterLink to="/doctor/dashboard" class="back-link">
      ← Back to Dashboard
    </RouterLink>

    <h1>Manage Availability</h1>
    <p class="page-description">
      Set your working days and consultation hours.
    </p>

    <section class="availability-card">
      <form @submit.prevent="saveSchedule">
        <fieldset>
          <legend>Working Days</legend>

          <div class="days-grid">
            <label
              v-for="day in days"
              :key="day"
              class="day-option"
            >
              <input
                v-model="workingDays"
                type="checkbox"
                :value="day"
              />
              {{ day }}
            </label>
          </div>
        </fieldset>

        <h2>Consultation Hours</h2>

        <div class="time-grid">
          <div class="form-group">
            <label for="start-time">Start Time</label>
            <input
              id="start-time"
              v-model="startTime"
              type="time"
            />
          </div>

          <div class="form-group">
            <label for="end-time">End Time</label>
            <input
              id="end-time"
              v-model="endTime"
              type="time"
            />
          </div>
        </div>

        <p v-if="error" class="error-message" role="alert">
          {{ error }}
        </p>

        <p v-if="success" class="success-message" role="status">
          {{ success }}
        </p>

        <button type="submit" class="save-button">
          Save Availability
        </button>
      </form>
    </section>
  </main>
</template>

<style scoped>
.availability-page {
  color: #17213c;
}

.back-link {
  display: inline-block;
  color: #0b1752;
  font-weight: 600;
  margin-bottom: 24px;
}

h1 {
  font-size: 36px;
  margin: 0 0 8px;
}

.page-description {
  color: #64748b;
  margin-bottom: 28px;
}

.availability-card {
  background: white;
  border: 1px solid #e2e5ef;
  border-radius: 14px;
  padding: 32px;
  box-shadow: 0 4px 18px rgba(11, 23, 82, 0.12);
  max-width: 850px;
}

fieldset {
  border: none;
  padding: 0;
  margin: 0 0 28px;
}

legend,
h2 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.day-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border: 1px solid #e2e5ef;
  border-radius: 8px;
  cursor: pointer;
}

.day-option input {
  accent-color: #0b1752;
}

.time-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group label {
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
}

.save-button {
  width: 100%;
  background: #0b1752;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px;
  font-weight: 600;
}

.save-button:hover {
  background: #172776;
}

.error-message {
  color: #b42318;
}

.success-message {
  color: #17603a;
}

@media (max-width: 600px) {
  .days-grid,
  .time-grid {
    grid-template-columns: 1fr;
  }

  .availability-card {
    padding: 20px;
  }
}
</style>
