<template>
  <nav>
    <ul class="navbar">
      <div class="nav-items">
      <div class="left-link">
        <div class="nav-left">
          <li>
            <router-link to="/">
              <img src="/images/logo1.png" alt="UW Social Logo" class="logo">
            </router-link>
          </li>
          <li><router-link to="/">🏠 Home</router-link></li>
          <li><router-link to="/events">🎪 Events</router-link></li>
          <li><router-link to="/publish">🚀 Publish New</router-link></li>
        </div>
        </div>

        <div class="right-link">
        <div class="user-profile">
          <template v-if="userStore.isLoggedIn && userStore.userProfile?.displayName">
            <router-link to="/profile">👨‍🎓 Profile</router-link>
            <span class="welcome-text">Welcome, {{ userStore.userProfile.displayName }}!</span>
            <a href="#" @click.prevent="handleLogout" class="logout-link">Logout</a>
          </template>
          <template v-else>
            <router-link to="/login" class="login-btn">Login</router-link>
          </template>
        </div>
        </div>
      </div>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const handleLogout = async () => {
  try {
    await userStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #b388eb;
  padding: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}


.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  padding: 0 20px;
  height: 80px;
  width: 100%;
  max-width: 1400px;
  margin: auto;
  overflow: hidden;
}

.nav-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.nav-items .left-link a {
  font-size: 1.1rem;
  margin: 0 15px;
  white-space: nowrap;
}

.nav-items .right-link a {
  font-size: 1rem;
  white-space: nowrap;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: auto;
}

.logo {
  height: 60px;
  width: auto;
  margin: 0 10px;
}

a, .welcome-text {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  color: #f0f0f0;
}

.logout-link {
  color: #ffeb3b;
  text-decoration: none;
  font-weight: bold;
}

.logout-link:hover {
  color: #ffd700;
}

.login-btn {
  background-color: #ffeb3b;
  color: #333 !important;
  padding: 8px 20px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.login-btn:hover {
  background-color: #ffd700;
  color: #000 !important;
}
</style> 