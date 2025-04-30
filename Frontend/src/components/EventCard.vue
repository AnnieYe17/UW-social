<template>
  <div class="card event-card">
    <img :src="event.imageUrl ? event.imageUrl : 'public/images/default-event.jpg'" alt="event.title" />
    <h3>{{ event.title }}</h3>
    <p>📅 Date: {{ formatDate(event.date) }}</p>
    <p>📍 Location: {{ event.location }}</p>
    <p>{{ event.description }}</p>
    <div class="card-buttons">
      <button 
        class="join-btn" 
        @click="handleJoin"
        :disabled="isFull || isParticipant"
      >
        {{ getButtonText }}
      </button>
      <button class="review-btn" @click="goToReview(event.id)">Review</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '../stores/user'
import type { Event } from '../types/event'

const props = defineProps<{
  event: Event
}>();

const userStore = useUserStore()

const isParticipant = computed(() => {
  return Array.isArray(props.event?.participants) &&
         props.event.participants.includes(userStore.userProfile?.uid || '');
})

const isFull = computed(() => {
  return props.event.maxParticipants !== undefined &&
         props.event.maxParticipants !== null &&
         Array.isArray(props.event.participants) &&
         props.event.participants.length >= props.event.maxParticipants;
});

const getButtonText = computed(() => {
  if (isFull.value) return 'Full'
  if (isParticipant.value) return 'Joined'
  return 'Quickly Join in'
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleJoin = async () => {
  if (isFull.value) return
  console.log('Joining event...')
  // TODO: 执行加入活动逻辑
}

const goToReview = (eventId: string) => {
  // TODO: 实现查看详情的逻辑
}
</script>

<style scoped>
.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 15px;
  width: 300px;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.event-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.event-card h3 {
  margin: 10px 0;
  color: #333;
  font-size: 1.2em;
}

.event-card p {
  color: #666;
  margin: 8px 0;
  font-size: 0.9em;
}

.card-buttons {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.join-btn, .review-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.join-btn {
  background-color: #b388eb;
  color: white;
}

.join-btn:hover {
  background-color: #9c6ad6;
}

.join-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.review-btn {
  background-color: #f0f0f0;
  color: #333;
}

.review-btn:hover {
  background-color: #e0e0e0;
}
</style>