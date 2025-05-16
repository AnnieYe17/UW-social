<template>
  <div v-if="isHomePage" class="welcome-container">
    <div class="main-content">
      <h1>Welcome to UW Social! 🎓</h1>
      <p>This is your social hub - find events, make friends, and share your ideas.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const isHomePage = route.path === '/';
</script>
  
  <style scoped >
 .welcome-container {
  margin: 0;
  padding: 0;
  text-align: center;
  margin-top: 20px; /* 适当调一下距离，看着舒服点 */
}

  .main-content {
    text-align: center;
    margin-top: 0;
    margin: 20px auto;
  }
  h1 {
    font-size: 2rem;
    margin-bottom: 17px;
  }
  p {
    font-size: 1.2rem;
    color: #666;
  }
  </style>
  