<template>
  <div class="p-4">
    <div class="rank-list space-y-6">
      <!-- User Ranking Section -->
      <div class="list1 bg-white rounded-lg shadow-md p-4">
        <div class="row mb-4">
          <h4 class="text-xl font-semibold text-gray-800">Bảng xếp hạng</h4>
        </div>
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b bg-gray-100">
              <th class="p-2">#</th>
              <th class="p-2">Họ và tên</th>
              <th class="p-2">Status</th>
              <th class="p-2">Số bài hoàn thành</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, index) in topUsers"
              :key="user.id"
              class="border-b hover:bg-gray-50"
            >
              <td class="p-2">{{ index + 1 }}</td>
              <td class="p-2">{{ user.nameAccount }}</td>
              <td class="p-2">
                <span
                  :class="user.lock === true ? 'text-green-600' : 'text-red-600'"
                >
                  {{ user.lock === true ? 'On' : 'Off' }}
                </span>
              </td>
              <td class="p-2">{{ user.result?.length || 0 }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Exam Section -->
      <div class="list2 bg-white rounded-lg shadow-md p-4">
        <div class="row mb-4">
          <h4 class="text-xl font-semibold text-gray-800">Đề thi tiêu biểu</h4>
        </div>
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b bg-gray-100">
              <th class="p-2">#</th>
              <th class="p-2">Lượt thi</th>
              <th class="p-2">Tiêu đề</th>
              <th class="p-2">Độ khó</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(exam, index) in exams"
              :key="index"
              class="border-b hover:bg-gray-50"
            >
              <td class="p-2">{{ index + 1 }}</td>
              <td class="p-2">{{ exam.sequence }}</td>
              <td class="p-2">{{ exam.name }}</td>
              <td class="p-2">{{ exam.level }}</td>
            </tr>
          </tbody>  
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { db } from '../../utils/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const users = ref([]);
const exams = ref([]);

// Lấy top 4 người dùng có số bài hoàn thành nhiều nhất
const topUsers = computed(() => {
  return users.value
    .sort((a, b) => (b.result?.length || 0) - (a.result?.length || 0))
    .slice(0, 4);
});

onMounted(async () => {
  try {
    // Lấy danh sách người dùng
    const userSnap = await getDocs(collection(db, 'users'));
    users.value = userSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Lấy danh sách đề thi
    const examSnap = await getDocs(collection(db, 'exams'));
    const examData = examSnap.docs.map(doc => {
      const data = doc.data();
      return {
        name: data.name,
        level: data.level,
        sequence: data.sequence,
      };
    });

    // Top 4 đề thi theo lượt thi (sequence)
    exams.value = examData.sort((a, b) => b.sequence - a.sequence).slice(0, 4);
  } catch (error) {
    console.error('Lỗi khi truy xuất dữ liệu từ Firestore:', error);
  }
});
</script>

<style scoped>

</style>
