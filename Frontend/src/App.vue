<template>
  <div class="app-container">
    <Navbar />
    <div class="content">
      <router-view></router-view>
    </div>

    <!-- 全局弹窗 -->
    <ElDialog v-model="eventDialogStore.isDialogOpen" title="Event Details" class="custom-dialog">
      <DetailCard v-if="eventDialogStore.selectedEvent" :event="eventDialogStore.selectedEvent" />
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import { useEventDialogStore } from './stores/eventDialog.ts';
import DetailCard from '@/components/DetailCard.vue';

const eventDialogStore = useEventDialogStore();

// 动态设置视口高度，解决移动端 100vh 问题
window.addEventListener('resize', () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
</script>

<style scoped>
.custom-dialog {
  max-width: 600px;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
  /* box-sizing: border-box; */
}

body {
  margin: 0;
  font-family: 'Helvetica Neue', sans-serif;
  background-color: #f9f9f9;
  min-height: 100vh;
}

.app-container {
  padding-top: 100px; /* 让出导航栏的空间 */
  min-height: calc(var(--vh, 1vh) * 100); /* 保持全屏 */
  box-sizing: border-box;
}

.content {
  padding: 10px; /* 正文和边缘的距离 */
}
</style>