<template>
  <div>
    <NavBar></NavBar>
    <!-- 仅在首页渲染 Welcome -->
    <div v-if="$route.path === '/'" class="welcome-container">
      <Welcome />
    </div>
    <div class="events-section">
      <h2>Latest Events</h2>
      <EventList />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/Navbar.vue'; // 确保路径正确
import Welcome from '@/components/Welcome.vue';
import EventList from '@/components/EventList.vue';
</script>

<style scoped>
.home-page, .welcome-container {
  margin: 0;
  padding: 0;
  }
  
.home-page {
  min-height: calc(100vh - 100px);
}

.events-section {
  padding: 1rem;
  background: #f5f5f5;
}

.events-section h2 {
  text-align: center;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}
</style>