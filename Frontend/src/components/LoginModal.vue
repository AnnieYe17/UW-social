<template>
  <div class="login-modal">
    <el-button type="primary" @click="handleGoogleLogin" class="google-btn">
      Login with Google
    </el-button>
    <el-button @click="$emit('close')" class="close-btn">Close</el-button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const handleGoogleLogin = async () => {
  try {
    console.log('Attempting to log in...');
    await userStore.loginWithGoogle();
    console.log('Login successful');
    router.push('/');
  } catch (error) {
    console.error('Login failed:', error);
  }
}
</script>