<template>
  <div class="event-form">
    <div class="form-container">
      <div class="step-indicator">
        <div class="step" :class="{ active: currentStep >= 1 }" @click="currentStep = 1">
          <span class="step-number">1</span>
          <span class="step-title">Basic Info</span>
        </div>
        <div class="step" :class="{ active: currentStep >= 2 }" @click="currentStep = 2">
          <span class="step-number">2</span>
          <span class="step-title">Schedule</span>
        </div>
        <div class="step" :class="{ active: currentStep >= 3 }" @click="currentStep = 3">
          <span class="step-number">3</span>
          <span class="step-title">Details</span>
        </div>
        <div class="step" :class="{ active: currentStep >= 4 }" @click="currentStep = 4">
          <span class="step-number">4</span>
          <span class="step-title">Preview</span>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="form-content">
        
        <!-- Step 1: Basic Information -->
        <div v-show="currentStep === 1" class="step-content">
          <div class="bento-grid">
            <div class="bento-card large">
              <div class="card-header">
                <h3>📝 Basic Information</h3>
                <p>Let's start with the essentials</p>
              </div>
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
                  type="text"
                  required
                  :placeholder="descriptionPlaceholder"
                  rows="3"
                ></textarea>
              </div>
            </div>
            
            <div class="bento-card small">
              <div class="card-header">
                <h3>📍 Location</h3>
              </div>
              <div class="form-group">
                <input
                  id="location"
                  v-model="formData.location"
                  type="text"
                  required
                  placeholder="Where will it happen?"
                >
              </div>
            </div>
            
            <div class="bento-card small">
              <div class="card-header">
                <h3>🏷️ Category</h3>
              </div>
              <div class="form-group">
                <select id="category" v-model="formData.category" required>
                  <option value="">Select category</option>
                  <option value="Academic">Academic</option>
                  <option value="Club">Club</option>
                  <option value="Sports">Sports</option>
                  <option value="Games">Games</option>
                  <option value="Culture">Culture</option>
                  <option value="Interest">Interest</option>
                  <option value="HFS">HFS</option>
                </select>
              </div>
            </div>
          </div>
          
          <div class="step-navigation">
            <button type="button" class="nav-btn next" @click="currentStep = 2">Next Step →</button>
          </div>
        </div>
        
        <!-- Step 2: Schedule -->
        <div v-show="currentStep === 2" class="step-content">
          <div class="bento-grid">
            <div class="bento-card large">
              <div class="card-header">
                <h3>📅 Schedule Details</h3>
                <p>When should people join?</p>
              </div>
              <div class="form-group">
                <label for="recurrenceType">Recurrence Type</label>
                <select id="recurrenceType" v-model="formData.recurrenceType" required>
                  <option :value="RecurrenceType.ONE_TIME">One-time</option>
                  <option :value="RecurrenceType.DAILY">Daily</option>
                  <option :value="RecurrenceType.WEEKLY">Weekly</option>
                  <option :value="RecurrenceType.MONTHLY">Monthly</option>
                </select>
              </div>

              <!-- One-time event fields -->
              <div v-if="formData.recurrenceType === RecurrenceType.ONE_TIME" class="schedule-fields">
                <div class="form-row">
                  <div class="form-group">
                    <label for="startDate">Start Date</label>
                    <input id="startDate" v-model="formData.startDate" type="date" required>
                  </div>
                  <div class="form-group">
                    <label for="startTime">Start Time</label>
                    <input id="startTime" v-model="formData.startTime" type="time" required>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="endDate">End Date</label>
                    <input id="endDate" v-model="formData.endDate" type="date" required>
                  </div>
                  <div class="form-group">
                    <label for="endTime">End Time</label>
                    <input id="endTime" v-model="formData.endTime" type="time" required>
                  </div>
                </div>
              </div>

              <!-- Daily recurring event fields -->
              <div v-if="formData.recurrenceType === RecurrenceType.DAILY" class="schedule-fields">
                <div class="form-row">
                  <div class="form-group">
                    <label for="dailyStartDate">Start Date</label>
                    <input id="dailyStartDate" v-model="formData.startDate" type="date" required>
                  </div>
                  <div class="form-group">
                    <label for="dailyEndDate">End Date (optional)</label>
                    <input id="dailyEndDate" v-model="formData.endDate" type="date">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="dailyStartTime">Start Time</label>
                    <input id="dailyStartTime" v-model="formData.startTime" type="time" required>
                  </div>
                  <div class="form-group">
                    <label for="dailyEndTime">End Time</label>
                    <input id="dailyEndTime" v-model="formData.endTime" type="time" required>
                  </div>
                </div>
              </div>

              <!-- Weekly recurring event fields -->
              <div v-if="formData.recurrenceType === RecurrenceType.WEEKLY" class="schedule-fields">
                <div class="form-row">
                  <div class="form-group">
                    <label for="weeklyStartDate">Start Date</label>
                    <input id="weeklyStartDate" v-model="formData.startDate" type="date" required>
                  </div>
                  <div class="form-group">
                    <label for="weeklyEndDate">End Date (optional)</label>
                    <input id="weeklyEndDate" v-model="formData.endDate" type="date">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="weeklyStartTime">Start Time</label>
                    <input id="weeklyStartTime" v-model="formData.startTime" type="time" required>
                  </div>
                  <div class="form-group">
                    <label for="weeklyEndTime">End Time</label>
                    <input id="weeklyEndTime" v-model="formData.endTime" type="time" required>
                  </div>
                </div>
                <div class="form-group">
                  <label>Days of Week</label>
                  <div class="checkbox-group">
                    <label v-for="(day, idx) in weekDays" :key="idx" class="day-checkbox">
                      <input type="checkbox" :value="idx" v-model="formData.daysOfWeek"> 
                      <span>{{ day }}</span>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Monthly recurring event fields -->
              <div v-if="formData.recurrenceType === RecurrenceType.MONTHLY" class="schedule-fields">
                <div class="form-row">
                  <div class="form-group">
                    <label for="monthlyStartDate">Start Date</label>
                    <input id="monthlyStartDate" v-model="formData.startDate" type="date" required>
                  </div>
                  <div class="form-group">
                    <label for="monthlyEndDate">End Date (optional)</label>
                    <input id="monthlyEndDate" v-model="formData.endDate" type="date">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="monthlyStartTime">Start Time</label>
                    <input id="monthlyStartTime" v-model="formData.startTime" type="time" required>
                  </div>
                  <div class="form-group">
                    <label for="monthlyEndTime">End Time</label>
                    <input id="monthlyEndTime" v-model="formData.endTime" type="time" required>
                  </div>
                </div>
                <div class="form-group">
                  <label>Days of Month</label>
                  <input type="text" v-model="formData.daysOfMonthInput" placeholder="e.g., 1, 15, 31">
                  <small>Enter days separated by commas (1-31)</small>
                </div>
              </div>
            </div>
          </div>
          
          <div class="step-navigation">
            <button type="button" class="nav-btn prev" @click="currentStep = 1">← Previous</button>
            <button type="button" class="nav-btn next" @click="currentStep = 3">Next Step →</button>
          </div>
        </div>
        
        <!-- Step 3: Additional Details -->
        <div v-show="currentStep === 3" class="step-content">
          <div class="bento-grid">
            <div class="bento-card medium">
              <div class="card-header">
                <h3>👥 Participation</h3>
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
            </div>
            
            <div class="bento-card medium">
              <div class="card-header">
                <h3>🏷️ Tags</h3>
              </div>
              <div class="form-group">
                <input
                  id="tags"
                  v-model="tagsInput"
                  type="text"
                  placeholder="e.g., study, social, sports"
                >
              </div>
            </div>
            
            <div class="bento-card large">
              <div class="card-header">
                <h3>📸 Media & Links</h3>
              </div>
              <div class="form-group">
                <label for="image">Event Image (Optional)</label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                  class="file-input"
                >
              </div>

              <div class="form-group">
                <label for="link">Event Link (Optional)</label>
                <input
                  id="link"
                  v-model="formData.link"
                  type="url"
                  placeholder="e.g., https://meeting.com/your-event"
                >
              </div>
            </div>
          </div>
          
          <div class="step-navigation">
            <button type="button" class="nav-btn prev" @click="currentStep = 2">← Previous</button>
            <button type="button" class="nav-btn next" @click="currentStep = 4">Preview →</button>
          </div>
        </div>
        
        <!-- Step 4: Preview & Submit -->
        <div v-show="currentStep === 4" class="step-content">
          <div class="preview-card">
            <div class="card-header">
              <h3>🎉 Ready to Publish?</h3>
              <p>Review your event details</p>
            </div>
            
            <div class="preview-content">
              <div class="preview-item">
                <strong>{{ formData.title }}</strong>
              </div>
              <div class="preview-item">
                {{ formData.description }}
              </div>
              <div class="preview-details">
                <span class="detail-chip">📍 {{ formData.location }}</span>
                <span class="detail-chip">🏷️ {{ formData.category }}</span>
                <span v-if="formData.maxParticipants" class="detail-chip">👥 Max {{ formData.maxParticipants }}</span>
              </div>
              <div v-if="formData.tags.length" class="preview-tags">
                <span v-for="tag in formData.tags" :key="tag" class="tag-chip">#{{ tag }}</span>
              </div>
            </div>
          </div>
          
          <div class="step-navigation">
            <button type="button" class="nav-btn prev" @click="currentStep = 3">← Edit Details</button>
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              {{ isSubmitting ? 'Publishing...' : '🚀 Publish Event!' }}
            </button>
          </div>
        </div>
        
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';
import { useEventStore } from '../stores/event';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { Event } from '../types/event';
import { RecurrenceType } from '../types/event';

const router = useRouter();
const userStore = useUserStore();
const eventStore = useEventStore();
const isSubmitting = ref(false);
const db = getFirestore();
const storage = getStorage();
const currentStep = ref(1);

const formData = ref({
  title: '',
  description: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  location: '',
  category: '',
  maxParticipants: null as number | null,
  tags: [] as string[],
  link: '',
  recurrenceType: RecurrenceType.ONE_TIME,
  daysOfWeek: [] as number[],
  daysOfMonthInput: '',
  imageUrl: '',
});

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const tagsInput = computed({
  get: () => formData.value.tags.join(', '),
  set: (value) => {
    formData.value.tags = value.split(',').map(tag => tag.trim()).filter(Boolean);
  }
});

const descriptionPlaceholder = computed(() =>
  formData.value.title
    ? `Come and enjoy ${formData.value.title}!`
    : 'Describe your event here...'
);

const handleImageUpload = async (event: InputEvent) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const storagePath = `events/${Date.now()}_${file.name}`;
  const storageReference = storageRef(storage, storagePath);

  try {
    const snapshot = await uploadBytes(storageReference, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    formData.value.imageUrl = downloadURL;
    alert('Image uploaded successfully!');
  } catch (error) {
    console.error('Failed to upload image:', error);
    alert('Failed to upload image.');
  }
};

const handleSubmit = async () => {
  if (!userStore.userProfile) {
    alert('Please log in to publish an event!');
    return;
  }

  isSubmitting.value = true;
  try {
    let schedule;
    const recurrenceType = formData.value.recurrenceType;
    if (recurrenceType === RecurrenceType.ONE_TIME) {
      const start = new Date(`${formData.value.startDate}T${formData.value.startTime}`);
      const end = new Date(`${formData.value.endDate}T${formData.value.endTime}`);
      if (start.toDateString() !== end.toDateString()) {
        alert('Start and end must be on the same day for a one-time event.');
        isSubmitting.value = false;
        return;
      }
      if (start >= end) {
        alert('End time must be after start time.');
        isSubmitting.value = false;
        return;
      }
      schedule = {
        type: RecurrenceType.ONE_TIME as const,
        startDatetime: start,
        endDatetime: end,
      };
    } else if (recurrenceType === RecurrenceType.DAILY) {
      if (!formData.value.startDate || !formData.value.startTime || !formData.value.endTime) {
        alert('Please fill in all required fields.');
        isSubmitting.value = false;
        return;
      }
      if (formData.value.endDate && new Date(formData.value.endDate) < new Date(formData.value.startDate)) {
        alert('End date must be after start date.');
        isSubmitting.value = false;
        return;
      }
      schedule = {
        type: RecurrenceType.DAILY as const,
        startDate: new Date(formData.value.startDate),
        endDate: formData.value.endDate ? new Date(formData.value.endDate) : undefined,
        startTimeOfDay: formData.value.startTime,
        endTimeOfDay: formData.value.endTime,
      };
    } else if (recurrenceType === RecurrenceType.WEEKLY) {
      if (!formData.value.startDate || !formData.value.startTime || !formData.value.endTime || formData.value.daysOfWeek.length === 0) {
        alert('Please fill in all required fields and select at least one day of week.');
        isSubmitting.value = false;
        return;
      }
      if (formData.value.endDate && new Date(formData.value.endDate) < new Date(formData.value.startDate)) {
        alert('End date must be after start date.');
        isSubmitting.value = false;
        return;
      }
      schedule = {
        type: RecurrenceType.WEEKLY as const,
        startDate: new Date(formData.value.startDate),
        endDate: formData.value.endDate ? new Date(formData.value.endDate) : undefined,
        startTimeOfDay: formData.value.startTime,
        endTimeOfDay: formData.value.endTime,
        daysOfWeek: formData.value.daysOfWeek.map(Number),
      };
    } else if (recurrenceType === RecurrenceType.MONTHLY) {
      if (!formData.value.startDate || !formData.value.startTime || !formData.value.endTime || !formData.value.daysOfMonthInput) {
        alert('Please fill in all required fields and enter days of month.');
        isSubmitting.value = false;
        return;
      }
      if (formData.value.endDate && new Date(formData.value.endDate) < new Date(formData.value.startDate)) {
        alert('End date must be after start date.');
        isSubmitting.value = false;
        return;
      }
      const daysOfMonth = formData.value.daysOfMonthInput.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n) && n >= 1 && n <= 31);
      if (daysOfMonth.length === 0) {
        alert('Please enter valid days of month (1-31).');
        isSubmitting.value = false;
        return;
      }
      schedule = {
        type: RecurrenceType.MONTHLY as const,
        startDate: new Date(formData.value.startDate),
        endDate: formData.value.endDate ? new Date(formData.value.endDate) : undefined,
        startTimeOfDay: formData.value.startTime,
        endTimeOfDay: formData.value.endTime,
        daysOfMonth,
      };
    }

    if (!schedule) {
      alert('Invalid schedule.');
      isSubmitting.value = false;
      return;
    }

    const eventData: Omit<Event, 'id'> = {
      title: formData.value.title,
      description: formData.value.description,
      location: formData.value.location,
      category: formData.value.category,
      tags: formData.value.tags,
      schedule: schedule,
      maxParticipants: formData.value.maxParticipants,
      organizerId: userStore.userProfile.uid,
      organizerName: userStore.userProfile.displayName || 'Anonymous',
      organizerAvatar: userStore.userProfile.photoURL || '',
      createdAt: new Date().toISOString(),
      participants: [],
      link: formData.value.link,
      imageUrl: formData.value.imageUrl,
      startime: '', // These seem to be required by your Event type
      endtime: '',
    };

    await addDoc(collection(db, 'events'), eventData);
    alert('Successfully published!');

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
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
}

.form-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.step-indicator {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  gap: 1rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  min-width: 100px;
}

.step:hover {
  background: rgba(179, 136, 235, 0.1);
}

.step.active {
  background: linear-gradient(135deg, #b388eb 0%, #6c63ff 100%);
  color: white;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.step.active .step-number {
  background: rgba(255, 255, 255, 0.3);
}

.step-title {
  font-size: 0.9rem;
  font-weight: 600;
}

.bento-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.bento-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(230, 230, 230, 0.6);
  transition: all 0.3s ease;
}

.bento-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.bento-card.large {
  grid-column: 1 / -1;
}

.bento-card.medium {
  grid-column: span 1;
}

.bento-card.small {
  grid-column: span 1;
}

.card-header {
  margin-bottom: 1.5rem;
}

.card-header h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
}

.card-header p {
  color: #666;
  font-size: 0.95rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group:last-child {
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 0.6rem;
  color: #555;
  font-weight: 600;
  font-size: 0.95rem;
}

input, textarea, select {
  width: 100%;
  padding: 0.9rem;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: all 0.3s ease;
  background: #fafbfc;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #b388eb;
  box-shadow: 0 0 0 3px rgba(179, 136, 235, 0.1);
  background: white;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.schedule-fields {
  margin-top: 1.5rem;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
}

.day-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 2px solid #e1e5e9;
  background: #fafbfc;
}

.day-checkbox:hover {
  background: rgba(179, 136, 235, 0.1);
  border-color: #b388eb;
}

.day-checkbox input[type="checkbox"] {
  width: auto;
  margin: 0;
  padding: 0;
}

.file-input {
  padding: 0.6rem !important;
}

.step-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}

.nav-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-btn.prev {
  background: #f8f9fa;
  color: #666;
  border: 2px solid #e1e5e9;
}

.nav-btn.prev:hover {
  background: #e9ecef;
  border-color: #ced4da;
}

.nav-btn.next {
  background: linear-gradient(135deg, #b388eb 0%, #6c63ff 100%);
  color: white;
}

.nav-btn.next:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(179, 136, 235, 0.4);
}

.preview-card {
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
  border-radius: 16px;
  padding: 2rem;
  border: 2px solid rgba(179, 136, 235, 0.2);
}

.preview-content {
  margin-top: 1.5rem;
}

.preview-item {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  line-height: 1.6;
}

.preview-item strong {
  color: #333;
  font-size: 1.4rem;
}

.preview-details {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin: 1.5rem 0;
}

.detail-chip {
  background: rgba(179, 136, 235, 0.1);
  color: #6c63ff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.preview-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tag-chip {
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 500;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .form-container {
    padding: 1.5rem;
  }

  .step-indicator {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .step {
    min-width: 80px;
    padding: 0.8rem;
  }

  .step-number {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }

  .step-title {
    font-size: 0.8rem;
  }

  .bento-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .bento-card.large,
  .bento-card.medium,
  .bento-card.small {
    grid-column: span 1;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .checkbox-group {
    gap: 0.5rem;
  }

  .step-navigation {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-btn {
    width: 100%;
  }
}
</style>