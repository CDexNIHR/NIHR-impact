<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6">
            <v-card class="elevation-12 rounded-xl">
              <v-card-title class="text-h4 font-weight-bold text-center py-6" :style="{ backgroundColor: theme.colors.primary, color: 'white' }">
                <v-icon left>mdi-seed-outline</v-icon>
                Welcome to NIHR-Impact
              </v-card-title>
              <v-card-text class="pa-8 text-center text-lg-body-1 text-md-body-2" :style="{ backgroundColor: theme.colors.surface }">
                <p v-if="loading" class="text-center text-sm-body-1">
                  Loading message from Firestore...
                  <v-progress-linear indeterminate color="primary"></v-progress-linear>
                </p>
                <div v-else>
                  <p class="mb-4">
                    {{ firestoreMessage.text }}
                  </p>
                  <v-divider class="my-4" :color="theme.colors.secondary"></v-divider>
                  <p class="font-italic text-sm-body-2">
                    - From Firestore
                  </p>
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
import { ref, onMounted } from 'vue';
import { useTheme } from 'vuetify';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const theme = useTheme();

const loading = ref(true);
const firestoreMessage = ref({ text: "No message loaded." });

const initFirebase = () => {
  // **IMPORTANT**: Replace these placeholders with your actual project's config from the Firebase console
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
	const analytics = getAnalytics(app);
  const db = firebaseApp.firestore();

  const messagesRef = db.collection("messages");

  messagesRef.limit(1).onSnapshot(snapshot => {
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

onMounted(() => {
  initFirebase();
});
</script>
