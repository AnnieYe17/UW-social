import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Event } from '../types/event';

export const useEventDialogStore = defineStore('eventDialog', () => {
  const isDialogOpen = ref(false);
  const selectedEvent = ref<Event | null>(null);

  const openDialog = (event: Event) => {
    selectedEvent.value = event;
    isDialogOpen.value = true;
  };

  const closeDialog = () => {
    selectedEvent.value = null;
    isDialogOpen.value = false;
  };

  return {
    isDialogOpen,
    selectedEvent,
    openDialog,
    closeDialog,
  };
});