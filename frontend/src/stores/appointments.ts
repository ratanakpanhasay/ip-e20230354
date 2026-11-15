
import { defineStore } from 'pinia'
import { ref } from 'vue'

// Define what an appointment looks like
export interface Appointment {
  id: string
  doctorId: number
  date: string
  time: string
  status: 'upcoming' | 'completed' | 'cancelled'
}

// Create the appointment store
export const useAppointmentsStore = defineStore('appointments', () => {

  // State: list of patient appointments
  const appointments = ref<Appointment[]>([])

  // Action: add a new appointment
  function addAppointment(
    doctorId: number,
    date: string,
    time: string
  ) {
    const newAppointment: Appointment = {
      id: crypto.randomUUID(),
      doctorId,
      date,
      time,
      status: 'upcoming',
    }

    appointments.value.push(newAppointment)
  }

  // Make state and actions available
  return {
    appointments,
    addAppointment,
  }
})
