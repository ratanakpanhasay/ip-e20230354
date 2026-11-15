
<script setup lang="ts">
defineProps<{
  id: number
  name: string
  specialty: string
}>()
</script>

<template>
  <article class="doctor-card">
    <h3>{{ name }}</h3>

    <p>Specialty: {{ specialty }}</p>

    <RouterLink :to="`/doctors/${id}`">
      View Doctor Profile
    </RouterLink>
  </article>
</template>

<style scoped>
.doctor-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}
</style>
