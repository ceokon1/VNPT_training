<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <div class="container mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <section class="attendance p-6">
        <div class="attendance-list">
          <h1 class="text-2xl font-semibold mb-4">Quản lí tài khoản</h1>
          <div class="flex justify-between mb-4">
            <div class="flex items-center space-x-4">
              <h4 class="text-lg">Sắp xếp theo:</h4>
              <select id="sort-id" v-model="sortOptionId" class="p-2 border border-gray-300 rounded">
                <option value="all">Tất cả</option>
                <option value="unlocked">Mở khóa</option>
                <option value="locked">Đã khóa</option>
              </select>
              <select id="sort-name" v-model="sortOptionName" class="p-2 border border-gray-300 rounded">
                <option value="default">Mặc định - Tên</option>
                <option value="az">Từ A - Z</option>
                <option value="za">Từ Z - A</option>
              </select>
            </div>
            <input type="text" placeholder="Tìm kiếm tài khoản..." v-model="searchTerm"
              class="p-2 border border-gray-300 rounded" />
          </div>
          <table class="min-w-full bg-white border border-gray-300 rounded">
            <thead>
              <tr class="bg-gray-200">
                <th class="py-2 px-4 border">STT</th>
                <th class="py-2 px-4 border">Tên Tài Khoản</th>
                <th class="py-2 px-4 border">Email</th>
                <th class="py-2 px-4 border">Trạng Thái Khóa</th>
                <th class="py-2 px-4 border">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(account, index) in filteredAccounts" :key="account.id" class="hover:bg-gray-100">
                <td class="py-2 px-4 border">{{ index + 1 }}</td>
                <td class="py-2 px-4 border">{{ account.nameAccount }}</td>
                <td class="py-2 px-4 border">{{ account.email }}</td>
                <td class="py-2 px-4 border">
                  <span class="status-icon cursor-pointer" :style="{ color: account.lock ? 'green' : 'red' }"
                    @click="toggleLock(account)">
                    {{ account.lock ? 'Mở khóa' : 'Đã khóa' }}
                  </span>
                </td>
                <td class="py-2 px-4 border">
                  <button @click="viewDetails(account)" class="text-blue-500 hover:underline mr-2">
                    Xem
                  </button>
                  <button @click="toggleLock(account)" class="hover:underline"
                    :style="{ color: account.lock ? 'green' : 'red' }">
                    {{ account.lock ? 'Khóa' : 'Mở khóa' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Swal from 'sweetalert2';
import { collection, getDocs, updateDoc, doc, getFirestore } from 'firebase/firestore';
import { db } from '../../utils/firebaseConfig';

interface Account {
  id: string;
  nameAccount: string;
  email: string;
  password: string;
  lock: boolean;
  status: number;
}

const accounts = ref<Account[]>([]);
const sortOptionId = ref('all');
const sortOptionName = ref('default');
const searchTerm = ref('');

onMounted(async () => {
  const snapshot = await getDocs(collection(db, 'users'));
  accounts.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Account[];
});

const filteredAccounts = computed(() => {
  let result = accounts.value.filter(acc => acc.status !== 0);

  if (sortOptionId.value === 'unlocked') {
    result = result.filter(acc => acc.lock);
  } else if (sortOptionId.value === 'locked') {
    result = result.filter(acc => !acc.lock);
  }

  result = result.filter(acc => acc.nameAccount.toLowerCase().includes(searchTerm.value.toLowerCase()));

  if (sortOptionName.value === 'az') {
    result.sort((a, b) => a.nameAccount.localeCompare(b.nameAccount));
  } else if (sortOptionName.value === 'za') {
    result.sort((a, b) => b.nameAccount.localeCompare(a.nameAccount));
  }

  return result;
});

const toggleLock = async (account: Account) => {
  const confirm = await Swal.fire({
    title: `Bạn có chắc muốn ${account.lock ? 'khóa' : 'mở khóa'} tài khoản này?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Có',
    cancelButtonText: 'Không'
  });

  if (confirm.isConfirmed) {
    const updatedLock = !account.lock;
    await updateDoc(doc(db, 'users', account.id), { lock: updatedLock });
    account.lock = updatedLock;
    Swal.fire({
      title: `Tài khoản đã được ${updatedLock ? 'mở khóa' : 'khóa'}.`,
      icon: 'success'
    });
  }
};

const viewDetails = (account: Account) => {
  Swal.fire({
    title: 'Thông tin tài khoản',
    html: `
      <strong>ID:</strong> ${account.id}<br/>
      <strong>Tên tài khoản:</strong> ${account.nameAccount}<br/>
      <strong>Password:</strong> ${account.password}<br/>
      <strong>Email:</strong> ${account.email}<br/>
      <strong>Trạng thái khóa:</strong> ${account.lock ? 'Mở khóa' : 'Đã khóa'}
    `,
    icon: 'info'
  });
};
</script>

<style scoped>
.status-icon {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}
</style>
