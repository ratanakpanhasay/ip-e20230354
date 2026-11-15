
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getDoctors, type Doctor } from '../services/doctorService'

export const useDoctorsStore = defineStore('doctors', () => {
  // State: shared reactive data
  const doctors = ref<Doctor[]>([])
  const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
  const error = ref<string | null>(null)

  // Action: retrieve doctors from our service
  async function fetchDoctors() {
    status.value = 'loading'
    error.value = null

    try {
      doctors.value = await getDoctors()
      status.value = 'success'
    } catch (err) {
      doctors.value = []
      error.value =
        err instanceof Error ? err.message : 'Failed to load doctors'
      status.value = 'error'
    }
  }

  // Expose state and actions to components
  return {
    doctors,
    status,
    error,
    fetchDoctors,
  }
})
