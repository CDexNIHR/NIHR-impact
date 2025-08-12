<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6">
            <v-card class="elevation-12 rounded-xl">
              <v-card-title class="text-h4 font-weight-bold text-center py-6" :style="{ backgroundColor: themeColors.primary, color: 'white' }">
                <v-icon left>mdi-seed-outline</v-icon>
                Welcome to NIHR-Impact
              </v-card-title>

              <!-- Authentication Form -->
              <v-card-text v-if="!user" class="pa-8 text-center" :style="{ backgroundColor: themeColors.surface }">
                <p class="mb-4 text-lg-body-1">
                  Please sign in to continue.
                </p>
                <v-form @submit.prevent="signInWithGoogle">
                  <v-btn
                    color="nihrBlue100"
                    class="text-white"
                    type="submit"
                    block
                  >
                    <v-icon left>mdi-google</v-icon>
                    Sign In with Google
                  </v-btn>
                </v-form>
              </v-card-text>

              <!-- Main App Content (after sign-in) -->
              <v-card-text v-else class="pa-8 text-center text-lg-body-1 text-md-body-2" :style="{ backgroundColor: themeColors.surface }">
                <p v-if="loading" class="text-center text-sm-body-1">
                  Loading message from Firestore...
                  <v-progress-linear indeterminate color="primary"></v-progress-linear>
                </p>
                <div v-else>
                  <p class="mb-4">
                    {{ firestoreMessage.text }}
                  </p>
                  <v-divider class="my-4" :color="themeColors.secondary"></v-divider>
                  <p class="font-italic text-sm-body-2">
                    - From Firestore
                  </p>
                  <v-btn
                    color="nihrCoral100"
                    class="text-white mt-4"
                    @click="signOutUser"
                    block
                  >
                    <v-icon left>mdi-logout</v-icon>
                    Sign Out
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useTheme } from 'vuetify';

// Import Firebase App, Firestore, and Auth functions
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, onSnapshot, collection, query, limit } from "firebase/firestore";

const theme = useTheme();

const loading = ref(true);
const firestoreMessage = ref({ text: "No message loaded." });
const user = ref(null);

// Create a computed property to safely access the theme colors
const themeColors = computed(() => {
  return theme.current.value.colors;
});

// **IMPORTANT**: Keep your firebaseConfig here
const firebaseConfig = {
    apiKey: "AIzaSyAO7-x1JjNyy22NluuY0eJwabqtrhdOz0o",
    authDomain: "nihr-impact.firebaseapp.com",
    projectId: "nihr-impact",
    storageBucket: "nihr-impact.firebasestorage.app",
    messagingSenderId: "282958109685",
    appId: "1:282958109685:web:0d7acf68b20860e3191ebc",
    measurementId: "G-SDCZ8YTNH8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const fetchFirestoreMessage = () => {
  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, limit(1));

  onSnapshot(q, snapshot => {
      loading.value = false;
      if (snapshot.docs.length > 0) {
          firestoreMessage.value = snapshot.docs[0].data();
      } else {
          firestoreMessage.value.text = "No messages found in Firestore.";
      }
  }, error => {
      console.error("Error fetching data: ", error);
      loading.value = false;
      firestoreMessage.value.text = "Error loading message from Firestore.";
  });
};

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Google Sign-In error: ", error);
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign-out error: ", error);
  }
};

onMounted(() => {
  onAuthStateChanged(auth, (authUser) => {
    user.value = authUser;
    if (authUser) {
      fetchFirestoreMessage();
    } else {
      loading.value = false;
      firestoreMessage.value.text = "Sign in to see your message.";
    }
  });
});
</script>
