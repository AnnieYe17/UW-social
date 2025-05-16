<template>
  <div class="event-list">
    <div v-if="eventStore.events.length === 0" class="loading">Loading events...</div>
    <div v-else class="events-grid">
      <EventCard
        v-for="event in eventStore.events"
        :key="event.id"
        :event="event"
        @open-card="$emit('open-card', event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useEventStore } from '@/stores/event';
import EventCard from './EventCard.vue';

const eventStore = useEventStore();

onMounted(() => {
  if (eventStore.events.length === 0) {
    eventStore.fetchEvents();
  }
});
</script>

<style scoped>
.event-list {
  padding: 2rem;
}

.loading,
.no-events {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
}

.events-grid {
  display: grid;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .events-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .events-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>