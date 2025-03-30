<template>
  <div>
    <div class="flex justify-center items-center p-5 bg-gray-100">
      <section class="bg-white rounded-lg p-5 shadow-md w-4/5">
        <h1 class="text-2xl font-semibold text-gray-800 mb-4">Quản lí đề thi</h1>
        <button @click="handleAdd" class="bg-green-500 text-white py-2 px-4 rounded-lg text-lg transition duration-300 hover:bg-green-600 mb-4">Thêm đề thi</button>

        <div class="flex gap-4 mb-4 items-center">
          <h4 class="text-lg text-gray-600">Sắp xếp theo:</h4>
          <select v-model="sortType" @change="handleSort" class="p-2 bg-gray-200 rounded-lg">
            <option value="">Lượt thi</option>
            <option value="most">Nhiều nhất</option>
            <option value="least">Ít nhất</option>
          </select>
          <select v-model="sortLevelType" @change="handleSort" class="p-2 bg-gray-200 rounded-lg">
            <option value="">Cấp độ</option>
            <option value="maxLevel">Cao nhất</option>
            <option value="minLevel">Thấp nhất</option>
          </select>
        </div>

        <div class="mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm đề thi"
            v-model="searchTerm"
            @input="handleSearch"
            class="w-full max-w-xs p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-blue-600 text-white">
              <th class="py-3 px-4">Tên</th>
              <th class="py-3 px-4">Cấp độ</th>
              <th class="py-3 px-4">Ảnh</th>
              <th class="py-3 px-4">Mô tả</th>
              <th class="py-3 px-4">Lượt thi</th>
              <th class="py-3 px-4">Chi tiết</th>
              <th class="py-3 px-4">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="exam in filteredExams" :key="exam.id" class="hover:bg-gray-100">
              <td class="py-2 px-4">{{ exam.name }}</td>
              <td class="py-2 px-4">{{ exam.level }}</td>
              <td class="py-2 px-4">
                <img :src="exam.image" :alt="exam.name" class="w-24 h-24 object-cover rounded-lg" />
              </td>
              <td class="py-2 px-4">{{ exam.describe }}</td>
              <td class="py-2 px-4">{{ exam.sequence }}</td>
              <td class="py-2 px-4">
                <router-link :to="`/admin/questionManager/${exam.id}`" class="text-blue-600">Chi tiết</router-link>
              </td>
              <td class="flex py-2 px-4">
                <button @click="handleEdit(exam)" class="bg-blue-500 text-white py-1 px-3 rounded-lg transition duration-300 hover:bg-blue-600">Chỉnh sửa</button>
                <button @click="handleDelete(exam.id)" class="bg-red-500 text-white py-1 px-3 rounded-lg transition duration-300 hover:bg-red-600 ml-2">Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRoute, useRouter } from 'vue-router';
import { storage } from '../../config/firebse';

interface Exam {
  id: string;
  name: string;
  level: number;
  sequence: number;
  idSubject: number;
  image: string;
  describe: string;
}

const exams = ref<Exam[]>([]);
const filteredExams = ref<Exam[]>([]);
const searchTerm = ref<string>('');
const sortType = ref<string>('');
const sortLevelType = ref<string>('');
const router = useRouter();
const route = useRoute()

const idSubject = route.params.id
onMounted(() => {
  fetchExams();
});

// Fetch exams from server
const fetchExams = async () => {
  try {
    const response = await axios.get('http://localhost:8080/examList');
    exams.value = response.data;
    filterExams(response.data);
  } catch (error) {
    console.error('Error fetching exams:', error);
  }
};

const filterExams = (exams: Exam[]) => {
  filteredExams.value = exams.filter(exam => exam.idSubject.toString() == idSubject);
};

// Handle sorting
const handleSort = () => {
  let sortedExams = [...filteredExams.value];
  if (sortType.value === 'most') {
    sortedExams.sort((a, b) => b.sequence - a.sequence);
  } else if (sortType.value === 'least') {
    sortedExams.sort((a, b) => a.sequence - b.sequence);
  }
  if (sortLevelType.value === 'maxLevel') {
    sortedExams.sort((a, b) => b.level - a.level);
  } else if (sortLevelType.value === 'minLevel') {
    sortedExams.sort((a, b) => a.level - b.level);
  }
  filteredExams.value = sortedExams;
};

// Handle search
const handleSearch = () => {
  if (searchTerm.value === '') {
    filterExams(exams.value);
  } else {
    filteredExams.value = exams.value.filter((exam) =>
      exam.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }
};

// Handle delete functionality
const handleDelete = (id: string) => {
  Swal.fire({
    title: 'Bạn có chắc chắn muốn xóa?',
    text: 'Đề thi này sẽ bị xóa vĩnh viễn!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/examList/${id}`);
        fetchExams();
        Swal.fire('Đã xóa!', 'Đề thi đã bị xóa.', 'success');
      } catch (error) {
        console.error('Error deleting exam:', error);
        Swal.fire('Lỗi!', 'Không thể xóa đề thi. Vui lòng thử lại.', 'error');
      }
    }
  });
};

const handleAdd = () => {
  Swal.fire({
    title: 'Thêm đề thi mới',
    html: 
      `<input id="swal-input1" class="swal2-input" placeholder="Tên đề thi">
      <input id="swal-input2" class="swal2-input" placeholder="Cấp độ" type="number">
      <input id="swal-input3" class="swal2-input" type="file" placeholder="Hình ảnh">
      <textarea id="swal-input4" class="swal2-textarea" placeholder="Mô tả"></textarea>`,
    focusConfirm: false,
    preConfirm: async () => {
      const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
      const level = Number((document.getElementById('swal-input2') as HTMLInputElement).value);
      const imageFile = (document.getElementById('swal-input3') as HTMLInputElement).files?.[0];
      const describe = (document.getElementById('swal-input4') as HTMLTextAreaElement).value;

      if (!name || !level || !imageFile || !describe) {
        Swal.showValidationMessage('Vui lòng điền đầy đủ thông tin');
        return;
      }
      if (level < 1 || level > 5) {
        Swal.showValidationMessage('Cấp độ phải từ 1 đến 5');
        return;
      }

      // Upload the image to Firebase Storage
      const storagePath = `exam/${imageFile.name}`;
      const imageRef = storageRef(storage, storagePath);

      try {
        await uploadBytes(imageRef, imageFile);
        const imageUrl = await getDownloadURL(imageRef);

        return { name, level, imageUrl, describe };
      } catch (error) {
        console.error('Error uploading image:', error);
        Swal.showValidationMessage('Không thể tải hình ảnh lên. Vui lòng thử lại.');
      }
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      const newExam = {
        name: result.value.name,
        level: result.value.level,
        status: false,
        sequence: 0, 
        idSubject: Number(idSubject),
        image: result.value.imageUrl,
        describe: result.value.describe,
      };

      try {
        await axios.post('http://localhost:8080/examList', newExam);
        fetchExams();
        Swal.fire('Thành công!', 'Đề thi mới đã được thêm.', 'success');
      } catch (error) {
        console.error('Error adding exam:', error);
        Swal.fire('Lỗi!', 'Không thể thêm đề thi. Vui lòng thử lại.', 'error');
      }
    }
  });
};

const handleEdit = (exam: Exam) => {
  Swal.fire({
    title: 'Chỉnh sửa đề thi',
    html: 
      `<input id="swal-input1" class="swal2-input" value="${exam.name}" placeholder="Tên đề thi">
      <input id="swal-input2" class="swal2-input" value="${exam.level}" placeholder="Cấp độ" type="number">
      <input type="file" id="swal-input3" class="swal2-input" placeholder="Hình ảnh">
      <textarea id="swal-input4" class="swal2-textarea" placeholder="Mô tả">${exam.describe}</textarea>`,
    focusConfirm: false,
    preConfirm: async () => {
      const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
      const level = Number((document.getElementById('swal-input2') as HTMLInputElement).value);
      const imageFile = (document.getElementById('swal-input3') as HTMLInputElement).files?.[0];
      const describe = (document.getElementById('swal-input4') as HTMLTextAreaElement).value;

      if (!name || !level || !describe) {
        Swal.showValidationMessage('Vui lòng điền đầy đủ thông tin');
        return;
      }

      if (level < 1 || level > 5) {
        Swal.showValidationMessage('Cấp độ phải từ 1 đến 5');
        return;
      }

      let imageUrl = exam.image;

      // Check if a new image file is selected
      if (imageFile) {
        const storagePath = `exam/${imageFile.name}`;
        const imageRef = storageRef(storage, storagePath);
        try {
          await uploadBytes(imageRef, imageFile);
          imageUrl = await getDownloadURL(imageRef);
        } catch (error) {
          console.error('Error uploading image:', error);
          Swal.showValidationMessage('Không thể tải hình ảnh lên. Vui lòng thử lại.');
          return;
        }
      }

      return { name, level, imageUrl, describe };
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      const updatedExam = {
        ...exam,
        name: result.value.name,
        level: result.value.level,
        image: result.value.imageUrl,
        describe: result.value.describe,
      };

      try {
        await axios.patch(`http://localhost:8080/examList/${exam.id}`, updatedExam);
        fetchExams();
        Swal.fire('Thành công!', 'Đề thi đã được chỉnh sửa.', 'success');
      } catch (error) {
        console.error('Error updating exam:', error);
        Swal.fire('Lỗi!', 'Không thể chỉnh sửa đề thi. Vui lòng thử lại.', 'error');
      }
    }
  });
};


// Navigation function
const goToDetails = (id: string) => {
  router.push(`/exam/details/${id}`);
};
</script>

  
  <style scoped>
    .container-content-admin {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
}

.attendance {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.manage-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.btn-add {
  background-color: #28a745;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.btn-add:hover {
  background-color: #218838;
}

.sort-items {
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 20px;
}

.sort-items h4 {
  font-size: 18px;
  color: #555;
}

.sort-items select {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f1f1f1;
  cursor: pointer;
}

.search-bar {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
}

.search-bar input {
  width: 100%;
  max-width: 300px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

.exam-table {
  width: 100%;
  border-collapse: collapse;
}

.exam-table thead {
  background-color: #007bff;
  color: #fff;
}

.exam-table th, .exam-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.exam-table img {
  border-radius: 8px;
}

.exam-table tbody tr {
  transition: background-color 0.2s ease;
}

.exam-table tbody tr:hover {
  background-color: #f1f1f1;
}

.exam-table button {
  background-color: #007bff;
  color: #fff;
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.exam-table button:hover {
  background-color: #0056b3;
}

.exam-table button:nth-child(2) {
  background-color: #dc3545;
}

.exam-table button:nth-child(2):hover {
  background-color: #c82333;
}

  </style>
  