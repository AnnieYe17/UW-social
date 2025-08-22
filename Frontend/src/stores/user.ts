import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { setPersistence, browserLocalPersistence } from 'firebase/auth';
import type { UserProfile } from '../types/user';

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false);
  const userProfile = ref<UserProfile | null>(null);
  const auth = getAuth();

  let hasInitialized = false;

  // Promise to ensure components can await user loading
  const loadUser = async (): Promise<void> => {
    if (hasInitialized) return;
    hasInitialized = true;

    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user: User | null) => {
        isLoggedIn.value = !!user;

        if (user) {
          try {
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);

            const lastSignInTime = user.metadata?.lastSignInTime || new Date().toISOString();

            if (userDoc.exists()) {
              // 更新 lastSignInTime
              await updateDoc(userRef, {
                'metadata.lastSignInTime': lastSignInTime
              });
              userProfile.value = userDoc.data() as UserProfile;
              // 手动同步最新 lastSignInTime 到本地
              if (userProfile.value.metadata) {
                userProfile.value.metadata.lastSignInTime = lastSignInTime;
              }
            } else {
              // 文档不存在，创建默认文档
              const plainUser = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified,
                grade: '',
                major: '',
                tags: [],
                metadata: {
                  creationTime: user.metadata?.creationTime || new Date().toISOString(),
                  lastSignInTime: lastSignInTime,
                },
              };
              await setDoc(userRef, plainUser);
              userProfile.value = plainUser as UserProfile;
            }
          } catch (err) {
            console.error('[UserStore] Failed to load user document:', err);
          }
        } else {
          userProfile.value = null;
        }

        resolve();
      });
    });
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      
      // Add these settings to help with popup issues
      provider.setCustomParameters({
        prompt: 'select_account'
      });

      // Force local persistence before login
      await setPersistence(auth, browserLocalPersistence);

      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      console.error('登录失败:', error);
      throw error;
    }
  };

  // 退出登录
  const logout = async () => {
    try {
      await signOut(auth);
      userProfile.value = null;
      isLoggedIn.value = false;
    } catch (error) {
      console.error('退出失败:', error);
      throw error;
    }
  };

  // 更新用户资料
  const updateUserProfile = async (profile: Partial<UserProfile>) => {
    if (!userProfile.value?.uid) return;

    try {
      const userRef = doc(db, 'users', userProfile.value.uid);
      await updateDoc(userRef, profile);

      userProfile.value = {
        ...userProfile.value,
        ...profile
      };
    } catch (error) {
      console.error('更新用户资料失败:', error);
      throw error;
    }
  };

  // 判断是否为当前用户
  const isOwner = (uid: string) => {
    return userProfile.value?.uid === uid;
  };

  // 设置默认用户数据
  const setDefaultUserData = async () => {
    if (!userProfile.value?.uid) return;

    try {
      const userRef = doc(db, 'users', userProfile.value.uid);
      await setDoc(userRef, {
        email: userProfile.value.email,
        displayName: userProfile.value.displayName,
        grade: 'freshman',
        major: '',
        tags: [],
        // ...其他字段
      }, { merge: true });
    } catch (error) {
      console.error('设置默认用户数据失败:', error);
      throw error;
    }
  };

  return {
    isLoggedIn,
    userProfile,
    loginWithGoogle,
    logout,
    updateUserProfile,
    loadUser,
    isOwner,
    setDefaultUserData
  };
});
