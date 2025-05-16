<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2>Login</h2>
      <el-button type="primary" @click="handleGoogleLogin" class="google-btn">
        Login with Google
      </el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const handleGoogleLogin = async () => {
  try {
    await userStore.loginWithGoogle()
    router.push('/')
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-card {
  width: 400px;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.google-btn {
  width: 100%;
  margin-top: 20px;
}
</style> 