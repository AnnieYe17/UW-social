<template>
  <div class="events-page">
    <div class="events-header">
      <h2>Event List🔥</h2>
      <router-link to="/publish" class="publish-btn">
        <!-- <span class="icon">🚀</span> -->
        🚀 Publish new event
      </router-link>
    </div>
    <!-- 监听 open-card 事件 -->
    <EventList @open-card="openCard" />

    <!-- 弹窗 -->
    <ElDialog v-model="isDialogOpen" title="Event Details" class="custom-dialog">
      <DetailCard v-if="selectedEvent" :event="selectedEvent" />
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import EventList from '../components/EventList.vue';
import DetailCard from '../components/DetailCard.vue';

const isDialogOpen = ref(false);
const selectedEvent = ref(null);

const openCard = (event: null) => {
  console.log('Event received in openCard:', event); // 添加日志以确认事件接收
  selectedEvent.value = event;
  isDialogOpen.value = true;
};

watch(selectedEvent, (newValue) => {
  console.log('Selected Event:', newValue);
});
</script>

<style scoped>
.events-page {
  padding: 0rem;
  margin-top: 0px;
  margin-left: 0px;
  min-height: calc(100vh - 100px);
  background: #f5f5f5;
}

.events-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

h1 {
  color: #333;
  margin: 0;
  font-size: 2rem;
}

.publish-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #b388eb;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
  margin-right: 50px;
}

.publish-btn:hover {
  background: #9c6ad6;
}

.icon {
  font-size: 1.2rem;
}

.custom-dialog {
  max-width: 600px;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>