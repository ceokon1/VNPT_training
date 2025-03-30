<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import Header from "../../components/user/Header.vue";
import Footer from "../../components/user/Footer.vue";
import { useRouter } from "vue-router";
import { storage } from "../../config/firebse";

interface Account {
  id: number;
  nameAccount: string;
  email: string;
  address: string;
  phone: string;
  img: string;
  password: string;
  status: number;
}

const yourProfile = ref<Account | null>(null);
const router = useRouter();

const userLogin:any= JSON.parse(localStorage.getItem('keyLogin') || '{}');

// Fetch user data from the backend based on keyLogin
onMounted(async () => {
  if (userLogin) {
    try {
      yourProfile.value = userLogin;
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  }
});

const confirmProfile = () => {
  Swal.fire({
    title: "Cập nhật thông tin",
    html: `
      <label>Tên người dùng:</label>
      <input id="nameAccount" class="swal2-input" value="${yourProfile.value?.nameAccount || ""}"> <br />
      <label>Địa chỉ bây giờ:</label>
      <input id="address" class="swal2-input" value="${yourProfile.value?.address || ""}"><br />
      <label>Số điện thoại:</label>
      <input id="phone" class="swal2-input" value="${yourProfile.value?.phone || ""}">
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Lưu",
    preConfirm: () => {
      const nameAccount = (document.getElementById("nameAccount") as HTMLInputElement).value;
      const address = (document.getElementById("address") as HTMLInputElement).value;
      const phone = (document.getElementById("phone") as HTMLInputElement).value;

      const phoneRegex = /^\d{10,15}$/;
      if (!phoneRegex.test(phone)) {
        Swal.showValidationMessage("Số điện thoại không hợp lệ! Vui lòng nhập từ 10 đến 15 chữ số.");
        return;
      }

      const updatedProfile = {
        ...yourProfile.value,
        nameAccount,
        address,
        phone,
      } as Account;

      yourProfile.value = updatedProfile;
      localStorage.setItem("keyLogin", JSON.stringify(updatedProfile)); // Update localStorage
      return updatedProfile;
    },
  }).then((result) => {
    if (result.isConfirmed && yourProfile.value) {
      saveAccountToBackend(result.value);
      Swal.fire("Thành công!", "Thông tin cá nhân đã được cập nhật.", "success");
    }
  });
};

const changePass = () => {
  Swal.fire({
    title: "Đổi mật khẩu",
    html: `
      <label>Mật khẩu cũ:</label>
      <input type="password" id="oldPassword" class="swal2-input"> <br />
      <label>Mật khẩu mới:</label>
      <input type="password" id="newPassword" class="swal2-input"> <br />
      <label>Xác nhận mật khẩu mới:</label>
      <input type="password" id="confirmPassword" class="swal2-input">
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Đổi mật khẩu",
    preConfirm: () => {
      const oldPassword = (document.getElementById("oldPassword") as HTMLInputElement).value;
      const newPassword = (document.getElementById("newPassword") as HTMLInputElement).value;
      const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement).value;

      if (newPassword !== confirmPassword) {
        Swal.showValidationMessage("Mật khẩu xác nhận không khớp!");
        return;
      }

      if (
        CryptoJS.AES.decrypt(yourProfile.value?.password || "", "your-secret-key").toString(CryptoJS.enc.Utf8) !==
        oldPassword
      ) {
        Swal.showValidationMessage("Mật khẩu cũ không đúng!");
        return;
      }

      const encryptedPassword = CryptoJS.AES.encrypt(newPassword, "your-secret-key").toString();
      return encryptedPassword;
    },
  }).then((result) => {
    if (result.isConfirmed && yourProfile.value) {
      yourProfile.value.password = result.value;
      localStorage.setItem("keyLogin", JSON.stringify(yourProfile.value)); // Update localStorage
      saveAccountToBackend(yourProfile.value);
      Swal.fire("Thành công!", "Mật khẩu đã được đổi.", "success");
    }
  });
};

const changeAvatar = () => {
  Swal.fire({
    title: "Chọn ảnh",
    input: "file",
    inputAttributes: {
      accept: "image/*",
      "aria-label": "Upload your profile picture",
    },
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      const file = result.value as File;
      const storageReference = storageRef(storage, `user/${file.name}`);
      uploadBytes(storageReference, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          if (yourProfile.value) {
            yourProfile.value.img = downloadURL;
            localStorage.setItem("keyLogin", JSON.stringify(yourProfile.value)); // Update localStorage
            saveAccountToBackend(yourProfile.value);
            Swal.fire({
              title: "Ảnh của bạn",
              imageUrl: downloadURL,
              imageAlt: "Ảnh đã tải lên",
            });
          }
        });
      });
    }
  });
};

const saveAccountToBackend = (account: Account) => {
  axios
    .patch(`http://localhost:8080/userList/${account.id}`, account)
    .then(() => {
      Swal.fire("Thành công", "Thông tin cá nhân đã được cập nhật", "success");
    })
    .catch(() => {
      Swal.fire("Lỗi", "Có lỗi xảy ra khi cập nhật thông tin cá nhân", "error");
    });
};
</script>


<template>
  <div>
    <Header />
    <div class="mt-24 p-6 mx-auto max-w-4xl">
      <div class="flex justify-around mb-6">
        <RouterLink to="/profile" class="text-blue-600 hover:text-blue-800">
          <div class="px-5 py-3 rounded-md bg-gray-200 shadow-md font-medium text-center">Thông tin cá nhân</div>
        </RouterLink>
        <RouterLink to="/history" class="text-blue-600 hover:text-blue-800">
          <div class="px-5 py-3 rounded-md bg-gray-200 shadow-md font-medium text-center">Lịch sử làm bài</div>
        </RouterLink>
      </div>
      <div v-if="yourProfile" class="p-6 bg-white rounded-md shadow-lg">
        <div class="text-center mb-6">
          <img :src="yourProfile.img" alt="Profile Picture" class="w-full h-100 rounded-md object-cover" />
          <h3 class="bg-gray-100 p-3 mt-4 text-xl font-semibold">{{ yourProfile.nameAccount }}</h3>
          <div class="flex gap-2 justify-center items-center">
            <button @click="changeAvatar" class="bg-lime-300 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded mt-4 transition transform hover:scale-105 focus:outline-none">Thay đổi ảnh</button>
            <button @click="confirmProfile" class="bg-green-300 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mt-2 transition">Đổi thông tin</button>
            <button @click="changePass" class="bg-green-300 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mt-2 transition">Đổi mật khẩu</button>
          </div>
        </div>
        <div class="space-y-4">
          <div class="flex justify-between">
            <h5 class="font-semibold text-gray-700">Email:</h5><p class="text-gray-600">{{ yourProfile.email }}</p>
          </div>
          <div class="flex justify-between">
            <h5 class="font-semibold text-gray-700">Địa chỉ:</h5><p class="text-gray-600">{{ yourProfile.address }}</p>
          </div>
          <div class="flex justify-between">
            <h5 class="font-semibold text-gray-700">Số điện thoại:</h5><p class="text-gray-600">{{ yourProfile.phone }}</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>

</style>
