
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useAppointmentsStore } from '../stores/appointments'
import { useAvailabilityStore } from '../stores/availability'

// Receive the selected doctor's ID
const props = defineProps<{
  doctorId: number
}>()

// Form data
const appointmentDate = ref('')
const appointmentTime = ref('')

// Validation and feedback messages
const error = ref('')
const success = ref('')

// Pinia stores
const appointmentsStore = useAppointmentsStore()
const availabilityStore = useAvailabilityStore()

// Days of the week
const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

// Find the selected doctor's availability
const doctorAvailability = computed(() => {
  return availabilityStore.schedules.find(
    (schedule) => schedule.doctorId === props.doctorId
  )
})

// Convert HH:mm into minutes since midnight
function toMinutes(time: string): number {
  const [hours = 0, minutes = 0] = time.split(':').map(Number)
  return hours * 60 + minutes
}

// Automatically generate available appointment times
const availableTimes = computed(() => {
  const schedule = doctorAvailability.value

  // No schedule or date selected
  if (!schedule || !appointmentDate.value) {
    return []
  }

  // Use noon to determine the selected day reliably
  const selectedDate = new Date(
    `${appointmentDate.value}T12:00:00`
  )

  const selectedDay = daysOfWeek[selectedDate.getDay()]

  // Doctor is not working on the selected day
  if (
    !selectedDay ||
    !schedule.workingDays.includes(selectedDay)
  ) {
    return []
  }

  // Doctor's start and end times in minutes
  const start = toMinutes(schedule.startTime)
  const end = toMinutes(schedule.endTime)

  const slots: string[] = []

  // Generate appointments lasting 60 minutes
  for (
    let minutes = start;
    minutes + 60 <= end;
    minutes += 60
  ) {
    const hours = String(
      Math.floor(minutes / 60)
    ).padStart(2, '0')

    const mins = String(
      minutes % 60
    ).padStart(2, '0')

    const time = `${hours}:${mins}`

    const selectedDateTime = new Date(
      `${appointmentDate.value}T${time}`
    )

    // Only show future appointment slots

    // Check whether another patient has booked this slot
    const isBooked = appointmentsStore.appointments.some(
      (appointment) =>
        appointment.doctorId === props.doctorId &&
        appointment.date === appointmentDate.value &&
        appointment.time === time &&
        appointment.status !== 'cancelled'
    )

    // Show only future and unbooked appointment slots
    if (selectedDateTime > new Date() && !isBooked) {
      slots.push(time)
    }

  }

  return slots
})

// Clear the selected time when date or schedule changes
watch([appointmentDate, doctorAvailability], () => {
  appointmentTime.value = ''
  error.value = ''
  success.value = ''
})

// Handle appointment booking
function submitBooking() {
  // Clear previous feedback
  error.value = ''
  success.value = ''

  // Validate required fields
  if (!appointmentDate.value || !appointmentTime.value) {
    error.value = 'Please select a date and time.'
    return
  }

  // Combine the selected date and time
  const selectedDateTime = new Date(
    `${appointmentDate.value}T${appointmentTime.value}`
  )

  // Prevent appointments in the past
  if (
    Number.isNaN(selectedDateTime.getTime()) ||
    selectedDateTime <= new Date()
  ) {
    error.value = 'Please select a future date and time.'
    return
  }

  // Retrieve the doctor's schedule
  const schedule = doctorAvailability.value

  if (!schedule) {
    error.value = 'This doctor has not set availability yet.'
    return
  }

  // Check whether the doctor works on the selected day
  const selectedDay = daysOfWeek[selectedDateTime.getDay()]

  if (
    !selectedDay ||
    !schedule.workingDays.includes(selectedDay)
  ) {
    error.value = 'The doctor is not available on this day.'
    return
  }

  // Ensure the selected time is a valid 60-minute slot
  if (!availableTimes.value.includes(appointmentTime.value)) {
    error.value = 'This appointment time is not available.'
    return
  }

  // Save the appointment to Pinia
  appointmentsStore.addAppointment(
    props.doctorId,
    appointmentDate.value,
    appointmentTime.value
  )

  // Show booking confirmation
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
          :disabled="availableTimes.length === 0"
        >
          <option value="">
            Choose a time
          </option>

          <option
            v-for="time in availableTimes"
            :key="time"
            :value="time"
          >
            {{ time }}
          </option>
        </select>

        <!-- No available appointment slots -->
        <p
          v-if="appointmentDate && availableTimes.length === 0"
          class="error-message"
        >
          No available appointment times for this date.
        </p>
      </div>

      <!-- Validation Feedback -->
      <p
        v-if="error"
        class="error-message"
        role="alert"
      >
        {{ error }}
      </p>

      <!-- Success Feedback -->
      <p
        v-if="success"
        class="success-message"
        role="status"
      >
        {{ success }}
      </p>

      <!-- Submit Button -->
      <button
        type="submit"
        class="submit-button"
      >
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
