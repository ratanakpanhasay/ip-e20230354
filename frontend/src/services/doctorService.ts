
export interface Doctor {
  id: number
  name: string
  specialty: string
}

export async function getDoctors(): Promise<Doctor[]> {
  const response = await fetch('/doctors.json')

  if (!response.ok) {
    throw new Error('Failed to load doctors')
  }

  const doctors: Doctor[] = await response.json()

  return doctors
}
