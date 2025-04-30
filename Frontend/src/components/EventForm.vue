<template>
  <div class="event-form">
    <h2>Publish New Event</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Event Title</label>
        <input
          id="title"
          v-model="formData.title"
          type="text"
          required
          placeholder="Enter event title"
        >
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="formData.description"
          required
          placeholder="Describe your event in detail"
          rows="4"
        ></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="date">Date</label>
          <input
            id="date"
            v-model="formData.date"
            type="date"
            required
          >
        </div>

        <div class="form-group">
          <label for="time">Time</label>
          <input
            id="time"
            v-model="formData.time"
            type="time"
            required
          >
        </div>
      </div>

      <div class="form-group">
        <label for="location">Location</label>
        <input
          id="location"
          v-model="formData.location"
          type="text"
          required
          placeholder="Event location"
        >
      </div>

      <div class="form-group">
        <label for="category">Category</label>
        <select id="category" v-model="formData.category" required>
          <option value="">Select category</option>
          <option value="academic">Academic</option>
          <option value="club">Club</option>
          <option value="HFS">HFS</option>
          <option value="interest">Interest</option>
          <option value="culture">Culture</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="form-group">
        <label for="maxParticipants">Max Participants (Optional)</label>
        <input
          id="maxParticipants"
          v-model="formData.maxParticipants"
          type="number"
          min="1"
          placeholder="No limit if not set"
        >
      </div>

      <div class="form-group">
        <label for="tags">Tags (comma separated)</label>
        <input
          id="tags"
          v-model="tagsInput"
          type="text"
          placeholder="e.g., study, social, sports"
        >
      </div>

      <button type="submit" class="submit-btn" :disabled="isSubmitting">
        {{ isSubmitting ? 'Publishing...' : 'Publish Event' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';
import { useEventStore } from '../stores/event';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Event } from '../types/event';

const router = useRouter();
const userStore = useUserStore();
const eventStore = useEventStore();
const isSubmitting = ref(false);

const formData = ref({
  title: '',
  description: '',
  date: '',
  time: '',
  location: '',
  category: '',
  maxParticipants: null as number | null, // 默认值为 null
  tags: [] as string[]
});

const tagsInput = computed({
  get: () => formData.value.tags.join(', '),
  set: (value) => {
    formData.value.tags = value.split(',').map(tag => tag.trim()).filter(Boolean);
  }
});

const handleSubmit = async () => {
  if (!userStore.userProfile) {
    alert('Please log in to publish an event!');
    return;
  }

  isSubmitting.value = true;
  try {
    const eventData: Omit<Event, 'id'> = {
      ...formData.value,
      organizerId: userStore.userProfile.uid,
      organizerName: userStore.userProfile.displayName || 'Anonymous',
      organizerAvatar: userStore.userProfile.photoURL || '',
      createdAt: new Date().toISOString(),
      participants: []
    };

    // 如果 maxParticipants 为 null，则移除该字段
    if (eventData.maxParticipants === null) {
      delete eventData.maxParticipants;
    }

    await addDoc(collection(db, 'events'), eventData);
    alert('Successfully published!');

    // 更新全局事件列表
    await eventStore.fetchEvents();

    router.push('/events');
  } catch (error) {
    console.error('Failed to publish event:', error);
    alert('Failed to publish event.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.event-form {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
  font-weight: 500;
}

input,
textarea,
select {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: #b388eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background: #9c6ad6;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>