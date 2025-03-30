<template>
  <div>
    <header class="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div class="flex items-center space-x-2">
        <img
          src="https://static.vecteezy.com/system/resources/previews/009/182/690/original/thi-letter-logo-design-with-polygon-shape-thi-polygon-and-cube-shape-logo-design-thi-hexagon-logo-template-white-and-black-colors-thi-monogram-business-and-real-estate-logo-vector.jpg"
          alt="Logo" class="logo w-12 h-12" />
        <span class="text-lg font-semibold">OnlineTest</span>
      </div>
      <div class="flex items-center space-x-4">
        <button @click="logout" class="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">Sign out</button>
        <router-link to="/" class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">User Button</router-link>
      </div>
    </header>

    <div v-if="loading" class="flex justify-center items-center h-screen">
      <span class="text-xl">Loading...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { db } from "../../utils/firebaseConfig"; // đường dẫn tới firebase.ts
import { doc, getDoc } from "firebase/firestore";

const router = useRouter();

const login = ref(false);
const user = ref<any>(null);
const loading = ref(true);

const logout = () => {
  localStorage.removeItem("keyLogin");
  router.push("/signInUser");
};

const fetchUserData = async () => {
  const local = localStorage.getItem("keyLogin");
  if (!local) {
    login.value = false;
    return;
  }

  const userData = JSON.parse(local);
  const userDocRef = doc(db, "users", userData.id);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userInfo = userDocSnap.data();
    user.value = { ...userInfo, id: userDocSnap.id };
    login.value = true;
  } else {
    login.value = false;
  }
};

onMounted(async () => {
  await fetchUserData();

  if (user.value && user.value.status === 0) {
    router.push("/admin/top");
  } else {
    router.push("/");
  }

  loading.value = false;
});
</script>

<style scoped>
.logo {
  border-radius: 50%;
}
</style>
