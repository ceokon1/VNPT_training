<template>
  <div>
    <header class="bg-orange-400 fixed top-0 left-0 w-full h-28 flex items-center justify-between px-8 shadow-md z-50">
      <div class="flex items-center space-x-4">
        <a href="">
          <img
            src="https://static.vecteezy.com/system/resources/previews/009/182/690/original/thi-letter-logo-design-with-polygon-shape-thi-polygon-and-cube-shape-logo-design-thi-hexagon-logo-template-white-and-black-colors-thi-monogram-business-and-real-estate-logo-vector.jpg"
            alt="Logo"
            class="w-12 h-12 rounded-full"
          />
        </a>
        <p class="text-2xl font-semibold text-black">OnlineTest</p>
      </div>
      <div class="flex-1 flex items-center justify-center">
        <form id="form-input" class="relative w-full max-w-lg">
          <input
            type="search"
            placeholder="Tìm kiếm đề"
            v-model="searchQuery"
            @input="handleSearch"
            class="w-full h-10 px-4 rounded border border-transparent focus:border-gray-300 focus:ring focus:ring-gray-300"
          />
          <ul v-if="searchQuery" class="absolute left-0 right-0 bg-white shadow-md z-10">
            <li v-if="filteredExams.length > 0"  class="search-results">
              <div v-for="exam in filteredExams" :key="exam.id">
                <router-link :to="`/exam/${exam.id}`" class="block px-4 py-2 hover:bg-gray-200">{{ exam.name }}</router-link>
              </div>           
            </li>
            <li v-else class="px-4 py-2">Không có kết quả phù hợp</li>
          </ul>
        </form>
      </div>
      <div class="flex items-center space-x-8">
        <nav class="flex space-x-4">
          <router-link to="/" class="text-lg font-medium text-black hover:text-white">Trang chủ</router-link>
          <router-link to="/courses" class="text-lg font-medium text-black hover:text-white">Trang khóa thi</router-link>
          <router-link to="/contact" class="text-lg font-medium text-black hover:text-white">Liên hệ</router-link>
        </nav>
        <div class="flex items-center space-x-4">
          <div v-if="!login || !user" class="flex space-x-2">
            <router-link to="/signInUser" class="text-lg text-black hover:text-white">Đăng nhập</router-link>
            <router-link to="/signUpUser" class="text-lg text-black hover:text-white">Đăng ký</router-link>
          </div>
          <div v-else class="flex items-center space-x-2">
            <img @click="handleClick" :src="user.img || 'https://via.placeholder.com/40'" alt="User Avatar" class="w-10 h-10 rounded-full" />
            <span class="text-black">Hi, {{ user.nameAccount }}</span>
            <button @click="handleLogout" class="bg-black text-white py-1 px-3 rounded hover:bg-gray-800">Đăng xuất</button>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { db } from '../../utils/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const login = ref<boolean>(false);
const user = ref<any>(null);
const examList = ref<any[]>([]);
const filteredExams = ref<any[]>([]);
const searchQuery = ref<string>('');

const router = useRouter();

onMounted(async () => {
  fetchUserData();
  await fetchExamsData();
});

const fetchUserData = () => {
  const userData = localStorage.getItem('keyLogin');
  if (userData) {
    login.value = true;
    user.value = JSON.parse(userData);
  }
};

const fetchExamsData = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'examList'));
    examList.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching exams:', error);
  }
};

const handleLogout = () => {
  Swal.fire({
    title: 'Bạn có chắc muốn đăng xuất?',
    text: 'Bạn sẽ cần phải đăng nhập lại để sử dụng các chức năng khác.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Đăng xuất',
    cancelButtonText: 'Hủy bỏ',
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('keyLogin');
      login.value = false;
      user.value = null;
      router.push('/');
      Swal.fire('Đã đăng xuất!', '', 'success');
    }
  });
};

const handleSearch = () => {
  const filter = searchQuery.value.toUpperCase();
  filteredExams.value = examList.value.filter((exam: any) =>
    exam.name.toUpperCase().includes(filter)
  );
};

const handleClick = () => {
  router.push("/profile");
};
</script>
