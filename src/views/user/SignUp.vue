<template>
  <section class="h-screen bg-gray-50">
    <form id="signup" @submit.prevent="handleSubmit" class="flex justify-center items-center h-full">
      <div class="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div class="flex flex-col md:flex-row">
          <!-- Image section -->
          <div class="hidden md:block md:w-1/2">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="w-full h-full object-cover"
              alt="Sample image"
            />
          </div>
          <!-- Form section -->
          <div class="w-full md:w-1/2 p-8 bg-gray-100">
            <h3 class="text-3xl font-semibold text-gray-800 mb-6 text-center">Đăng kí</h3>

            <!-- Input for name -->
            <div class="mb-4">
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Tên đăng kí</label>
              <input
                type="text"
                id="name"
                class="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                placeholder="Nhập tên"
                v-model="nameAccount"
              />
              <div v-if="errors.nameAccount" class="text-red-500 text-sm mt-1">{{ errors.nameAccount }}</div>
            </div>

            <!-- Input for email -->
            <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                class="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                placeholder="Nhập email"
                v-model="email"
              />
              <div v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</div>
            </div>

            <!-- Input for password -->
            <div class="mb-4">
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
              <input
                type="password"
                id="password"
                class="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                placeholder="Nhập mật khẩu"
                v-model="password"
              />
              <div v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</div>
            </div>

            <!-- Input for password confirmation -->
            <div class="mb-4">
              <label for="rePassword" class="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu</label>
              <input
                type="password"
                id="rePassword"
                class="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                placeholder="Nhập lại mật khẩu"
                v-model="rePassword"
              />
              <div v-if="errors.rePassword" class="text-red-500 text-sm mt-1">{{ errors.rePassword }}</div>
            </div>

            <!-- Link to sign-in and submit button -->
            <div class="text-center">
              <p class="text-sm mb-4">Bạn đã có tài khoản? 
                <router-link to="/signInUser" class="text-blue-500 hover:underline">Đăng nhập</router-link>
              </p>
              <button
                type="submit"
                class="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 transition duration-200"
              >
                Đăng kí
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import Swal from 'sweetalert2';
import CryptoJS from 'crypto-js';
import { useRouter } from 'vue-router';
import { db } from '../../utils/firebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import Approved from '../admin/Approved.vue';

const nameAccount = ref('');
const email = ref('');
const password = ref('');
const rePassword = ref('');
const errors = ref<{ [key: string]: string }>({});
const router = useRouter();

const validateEmail = (email: string) => {
  return String(email).toLowerCase().match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const validatePassword = (password: string) => {
  return password.length >= 6 && password.length <= 50;
};

// Kiểm tra email đã tồn tại chưa (trong Firestore)
const checkEmailExists = async (email: string) => {
  const q = query(collection(db, 'users'), where('email', '==', email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

const handleSubmit = async () => {
  let formErrors: { [key: string]: string } = {};

  if (!nameAccount.value) formErrors.nameAccount = 'Tên không được để trống';

  if (!email.value) formErrors.email = 'Email không được để trống';
  else if (!validateEmail(email.value)) formErrors.email = 'Email không đúng định dạng';
  else if (email.value.length > 50) formErrors.email = 'Email quá dài';
  else if (await checkEmailExists(email.value)) formErrors.email = 'Email đã được sử dụng';

  if (!password.value) formErrors.password = 'Mật khẩu không được để trống';
  else if (!validatePassword(password.value)) formErrors.password = 'Mật khẩu phải từ 6 đến 50 ký tự';

  if (password.value !== rePassword.value) formErrors.rePassword = 'Mật khẩu không khớp';

  if (Object.keys(formErrors).length > 0) {
    errors.value = formErrors;
    return;
  }

  const encryptedPassword = CryptoJS.AES.encrypt(password.value, 'your-secret-key').toString();

  const newUser = {
    nameAccount: nameAccount.value,
    email: email.value,
    password: encryptedPassword,
    img: "https://th.bing.com/th/id/OIP._p7dSl1uR5eynQDkJyb1tgAAAA?rs=1&pid=ImgDetMain",
    status: 1,
    lock: true,
    approved: false,
    result: []
  };

  try {
    await addDoc(collection(db, 'users'), newUser);
    Swal.fire({
      icon: 'success',
      title: 'Đăng kí thành công!',
      text: 'Bạn đã đăng kí tài khoản thành công! Chờ admin duyệt tài khoản.',
    }).then(() => {
      router.push('/signInUser');
    });
  } catch (error) {
    console.error('Đăng kí lỗi:', error);
    Swal.fire({
      icon: 'error',
      title: 'Đăng kí thất bại',
      text: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
    });
  }
};
</script>

<style scoped>
/* Add additional styles here if needed */
</style>
