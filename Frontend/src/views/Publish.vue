<template>
  <div class="publish-page">
    <!-- 背景 SVG -->
    <div class="background-container">
      <img src="../../public/svg/background4.svg" class="background-svg" />
    </div>
    
    <div class="page-header">
      <h1>Create Your Event</h1>
      <p>Bring people together and make connections happen</p>
    </div>
    
    <EventForm />
  </div>
</template>

<script setup lang="ts">
import EventForm from '../components/EventForm.vue';
</script>

<style scoped>
.publish-page {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding-top: 120px;
  padding-bottom: 4rem;
}

.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.background-svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
}

.page-header {
  position: relative;
  z-index: 1;
  text-align: center;
  margin-bottom: 3rem;
  padding: 0 1rem;
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.page-header p {
  font-size: 1.1rem;
  color: #666;
  max-width: 500px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .publish-page {
    padding-top: 100px;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .page-header p {
    font-size: 1rem;
  }
}
</style> 