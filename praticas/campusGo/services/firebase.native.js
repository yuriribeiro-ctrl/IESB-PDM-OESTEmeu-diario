import { getAuth, getReactNativePersistence, initializeAuth } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseApp, db } from './firebase-config';

let auth;
try {
  auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  if (error.code !== 'auth/already-initialized') throw error;
  auth = getAuth(firebaseApp);
}

export { auth, db, firebaseApp };
