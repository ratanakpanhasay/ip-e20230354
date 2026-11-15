
<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  id: number
  name: string
  specialty: string
}>()
</script>

<template>
  <article class="doctor-card">

    <div class="doctor-avatar" aria-hidden="true">
      MD
    </div>

    <div class="doctor-info">
      <h3>{{ name }}</h3>
      <p>{{ specialty }}</p>
    </div>

    <RouterLink
      :to="`/doctors/${id}`"
      class="profile-button"
    >
      View Profile
    </RouterLink>

  </article>
</template>

<style scoped>

.doctor-card {
  background: #ffffff;
  border: 1px solid #e2e5ef;
  border-radius: 14px;
  padding: 24px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  /* Soft shadow that makes the card stand out */
  box-shadow: 0 4px 18px rgba(11, 23, 82, 0.12);

  /* Smooth animation */
  transition:
    box-shadow 0.25s ease,
    transform 0.25s ease;
}

.doctor-card:hover {
  /* Stronger shadow when hovering */
  box-shadow: 0 12px 32px rgba(11, 23, 82, 0.22);

  /* Lift the card slightly */
  transform: translateY(-5px);
}

.doctor-avatar {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: #f0f2fa;
  color: #0b1752;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;
  font-weight: 700;
}

.doctor-info {
  flex: 1;
}

.doctor-info h3 {
  color: #17213c;
  font-size: 20px;
  margin: 0 0 8px;
}

.doctor-info p {
  color: #64748b;
  font-size: 15px;
  margin: 0;
}

.profile-button {
  display: block;
  background: #0b1752;
  color: #ffffff;
  padding: 12px 20px;
  border-radius: 8px;

  text-align: center;
  font-weight: 600;
}

.profile-button:hover {
  background: #16266b;
  text-decoration: none;
}

.profile-button:focus-visible {
  outline: 3px solid #8094ff;
  outline-offset: 3px;
}
</style>
