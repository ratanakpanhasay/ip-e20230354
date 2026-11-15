
import { defineStore } from 'pinia'
import { ref } from 'vue'

// Define the structure of a doctor's schedule
export interface DoctorAvailability {
  doctorId: number
  workingDays: string[]
  startTime: string
  endTime: string
}

export const useAvailabilityStore = defineStore('availability', () => {
  // State: temporary doctor schedules
  const schedules = ref<DoctorAvailability[]>([
    {
      doctorId: 2,
      workingDays: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],
      startTime: '09:00',
      endTime: '17:00',
    },
  ])

  // Action: save a doctor's schedule
  function saveAvailability(updatedSchedule: DoctorAvailability) {
    const index = schedules.value.findIndex(
      (schedule) => schedule.doctorId === updatedSchedule.doctorId
    )

    if (index === -1) {
      schedules.value.push(updatedSchedule)
    } else {
      schedules.value[index] = updatedSchedule
    }
  }

  return {
    schedules,
    saveAvailability,
  }
})
