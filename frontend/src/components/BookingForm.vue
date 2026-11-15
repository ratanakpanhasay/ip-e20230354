
<script setup lang="ts">
import { ref } from 'vue'
import { useAppointmentsStore } from '../stores/appointments'


const props = defineProps<{
  doctorId: number
}>()


// Form data
const appointmentDate = ref('')
const appointmentTime = ref('')

// Validation and feedback messages
const error = ref('')
const success = ref('')
const appointmentsStore = useAppointmentsStore()

function submitBooking() {
  // Clear previous messages
  error.value = ''
  success.value = ''

  // Check required fields
  if (!appointmentDate.value || !appointmentTime.value) {
    error.value = 'Please select a date and time.'
    return
  }

  // Combine the date and time
  const selectedDateTime = new Date(
    `${appointmentDate.value}T${appointmentTime.value}`
  )

  // Prevent booking in the past
  if (
    Number.isNaN(selectedDateTime.getTime()) ||
    selectedDateTime <= new Date()
  ) {
    error.value = 'Please select a future date and time.'
    return
  }


  // Add the validated appointment to Pinia
  appointmentsStore.addAppointment(
    props.doctorId,
    appointmentDate.value,
    appointmentTime.value
  )

  // Show confirmation
  success.value = `Appointment added for Doctor ID ${props.doctorId}!`

}
</script>


<template>
  <section class="booking-form">
    <h2>Book an Appointment</h2>

    <p class="form-description">
      Choose your preferred appointment date and time.
    </p>

    <form @submit.prevent="submitBooking">
      <!-- Appointment Date -->
      <div class="form-group">
        <label for="appointment-date">
          Select Date
        </label>

        <input
          id="appointment-date"
          v-model="appointmentDate"
          type="date"
        />
      </div>

      <!-- Appointment Time -->
      <div class="form-group">
        <label for="appointment-time">
          Select Time
        </label>

        <select
          id="appointment-time"
          v-model="appointmentTime"
        >
          <option value="">Choose a time</option>
          <option value="09:00">09:00 AM</option>
          <option value="10:00">10:00 AM</option>
          <option value="11:00">11:00 AM</option>
          <option value="14:00">02:00 PM</option>
          <option value="15:00">03:00 PM</option>
        </select>
      </div>

      <!-- Validation Feedback -->
      <p v-if="error" class="error-message" role="alert">
        {{ error }}
      </p>

      <p v-if="success" class="success-message" role="status">
        {{ success }}
      </p>

      <!-- Submit Button -->
      <button type="submit" class="submit-button">
        Book Appointment
      </button>
    </form>
  </section>
</template>


<style scoped>
.booking-form {
  width: 100%;
}

.booking-form h2 {
  color: #17213c;
  font-size: 26px;
  margin: 0 0 8px;
}

.form-description {
  color: #64748b;
  font-size: 15px;
  margin-bottom: 28px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 22px;
}

.form-group label {
  font-size: 15px;
  font-weight: 600;
  color: #17213c;
}

.form-group input,
.form-group select {
  width: 100%;
  min-height: 48px;
  padding: 12px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #ffffff;
  color: #17213c;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #0b1752;
  box-shadow: 0 0 0 3px rgba(11, 23, 82, 0.12);
}

.submit-button {
  width: 100%;
  padding: 14px 20px;
  margin-top: 8px;
  background: #0b1752;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.submit-button:hover {
  background: #172776;
}

.error-message {
  color: #b42318;
  background: #fff1f0;
  padding: 12px;
  border-radius: 8px;
}

.success-message {
  color: #17603a;
  background: #edf8f1;
  padding: 12px;
  border-radius: 8px;
}
</style>
