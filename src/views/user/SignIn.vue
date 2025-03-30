<template>
  <section class="h-screen mt-[-16px]">
    <div class="container mx-auto h-full">
      <div class="flex justify-center items-center h-full">
        <div class="flex flex-col md:flex-row w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
          <div class="w-full md:w-1/2 flex flex-col items-center bg-gray-100 p-6">
            <h1 class="text-4xl font-semibold text-gray-800 mb-4">ĐĂNG NHẬP</h1>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="w-3/4 mb-4"
              alt="Sample image"
            />
          </div>
          <div class="w-full md:w-1/2 p-8">
            <form id="loginForm" @submit.prevent="handleSubmit">
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2" for="email">Email</label>
                <input
                  type="email"
                  v-model="email"
                  id="email"
                  class="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                  placeholder="Nhập email"
                />
                <div v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</div>
              </div>

              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2" for="password">Mật khẩu</label>
                <input
                  type="password"
                  v-model="password"
                  id="password"
                  class="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                  placeholder="Nhập mật khẩu"
                />
                <div v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</div>
              </div>

              <div class="flex justify-between items-center mb-6">
                <div class="flex items-center">
                  <input class="mr-2" type="checkbox" id="form2Example3" />
                  <label class="text-sm" for="form2Example3">Lưu mật khẩu</label>
                </div>
                <a href="#!" class="text-sm text-blue-500 hover:underline">Quên mật khẩu?</a>
              </div>

              <div class="text-center">
                <button
                  type="submit"
                  class="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Đăng nhập
                </button>
                <p class="mt-4 text-sm">
                  Bạn chưa có tài khoản? 
                  <router-link to="/signUpUser" class="text-red-500 hover:underline">Đăng kí</router-link> tại đây
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { db } from '../../utils/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import CryptoJS from 'crypto-js';

const email = ref('');
const password = ref('');
const errors = ref({ email: '', password: '' });
const router = useRouter();

const handleSubmit = async () => {
  errors.value = { email: '', password: '' };

  if (!email.value) errors.value.email = 'Email không được để trống';
  if (!password.value) errors.value.password = 'Mật khẩu không được để trống';
  if (errors.value.email || errors.value.password) return;

  try {
    const q = query(collection(db, 'users'), where('email', '==', email.value));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      Swal.fire({ icon: 'error', title: 'Đăng nhập thất bại', text: 'Tài khoản không tồn tại!' });
      return;
    }

    const doc = snapshot.docs[0];
    const currentUser = doc.data();

    const decryptedPassword = CryptoJS.AES.decrypt(currentUser.password, 'your-secret-key').toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== password.value) {
      Swal.fire({ icon: 'error', title: 'Đăng nhập thất bại', text: 'Tài khoản hoặc mật khẩu không đúng!' });
      return;
    }

    if (!currentUser.approved) {
      Swal.fire({
        icon: 'warning',
        title: 'Tài khoản đang chờ duyệt',
        text: 'Tài khoản của bạn chưa được admin duyệt.',
      });
      return;
    }


    if (currentUser.lock === false) {
      Swal.fire({ icon: 'error', title: 'Tài khoản bị khóa', text: 'Tài khoản này đã bị khóa!' });
      return;
    }

    localStorage.setItem('keyLogin', JSON.stringify({ ...currentUser, id: doc.id }));

    Swal.fire({
      icon: 'success',
      title: 'Đăng nhập thành công',
      text: 'Bạn đã đăng nhập thành công!',
    }).then(() => {
      if (currentUser.status == '0') router.push('/admin/top');
      else router.push('/');
    });

  } catch (error) {
    console.error('Error during login:', error);
    Swal.fire({
      icon: 'error',
      title: 'Lỗi',
      text: 'Có lỗi xảy ra trong quá trình đăng nhập!',
    });
  }
};
</script>

