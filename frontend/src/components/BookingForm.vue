
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
  <section>
    <h2>Book an Appointment</h2>

    <form @submit.prevent="submitBooking">
      <div>
        <label for="appointment-date">Select Date:</label>

        <input
          id="appointment-date"
          v-model="appointmentDate"
          type="date"
        />
      </div>

      <div>
        <label for="appointment-time">Select Time:</label>

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

      <p v-if="error" role="alert">{{ error }}</p>
      <p v-if="success" role="status">{{ success }}</p>

      <button type="submit">Book Appointment</button>
    </form>

  <p>
    Appointments in memory:
    {{ appointmentsStore.appointments.length }}
  </p>

  </section>
</template>
