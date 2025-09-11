
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'studio-746085157-ebe5b',
  appId: '1:19672273879:web:674edc0f16ff02a86fb192',
  storageBucket: 'studio-746085157-ebe5b.firebasestorage.app',
  apiKey: 'AIzaSyAQf2vAKwQDh6coL3Ehs3NUJS-a80RZCXw',
  authDomain: 'studio-746085157-ebe5b.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '19672273879',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
