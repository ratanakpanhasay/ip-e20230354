
<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="navbar">
    <RouterLink to="/" class="logo">
      MediBook
    </RouterLink>

    <nav class="nav-links">
      <RouterLink to="/">Find Doctors</RouterLink>

      <RouterLink to="/my-appointments">
        My Appointments
      </RouterLink>

      <RouterLink to="/doctor/dashboard">
        Doctor Dashboard
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  padding: 18px 32px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
}


.logo {
  font-size: 26px;
  font-weight: 700;
  color: #0B1752;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.nav-links a {
  color: #334155;
  font-weight: 500;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #0B1752;
}
</style>
