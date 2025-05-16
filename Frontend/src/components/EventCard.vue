<template>
  <div class="card event-card" @click="handleCardClick">
    <img :src="event.imageUrl ? event.imageUrl : '/images/default-event.jpg'" alt="event.title" />
    <h3>{{ event.title }}</h3>
    <p>📅 {{ formatDate(event.date) }}</p>
    <p>📍 {{ event.location }}</p>
    <p class="description">{{ event.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { useEventDialogStore } from '../stores/eventDialog';
import type { Event } from '../types/event';

const props = defineProps<{
  event: Event;
}>();

const eventDialogStore = useEventDialogStore();

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const handleCardClick = () => {
  console.log('Card clicked:', props.event);
  eventDialogStore.openDialog(props.event);
};
</script>

<style scoped>
.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 15px;
  width: 300px;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
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

.event-card .description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  -webkit-box-orient: vertical;
  height: 4.5em; /* Adjust based on font size and line height */
}
</style>