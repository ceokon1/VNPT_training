<template>
  <div>
    <div class="container-content-admin">
      <section class="attendance" style="width: 80%;">
        <div class="attendance-list">
          <h1 class="manage-title">Quản lí khóa học</h1>
          <button @click="showFormAddCourse" class="addcourses">Thêm khóa học</button>
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Khóa học</th>
                <th>Hình ảnh</th>
                <th>Mô tả</th>
                <th>Chi tiết</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(course, index) in paginatedCourses" :key="course.id">
                <td>{{ (currentPage - 1) * postsPerPage + index + 1 }}</td>
                <td>{{ course.title }}</td>
                <td>
                  <img class="w-[100px] h-[100px]" :src="course.img" alt="Course Image" />
                </td>
                <td>{{ course.description }}</td>
                <td>
                  <router-link class="button" :to="`/admin/subjectManager/${course.id}`">Chi tiết</router-link>
                </td>
                <td>
                  <button @click="editCourse(course)">Sửa</button>
                  <button @click="deleteCourses(course.id)">Xóa</button>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Phân trang -->
          <div class="w-full p-3 flex justify-end items-center gap-2 mt-4">
            <select
              class="border border-gray-800 p-2 bg-gray-700 text-white"
              v-model="postsPerPage"
            >
              <option value="2">2 bản ghi</option>
              <option value="3">3 bản ghi</option>
              <option value="4">4 bản ghi</option>
              <option value="5">5 bản ghi</option>
            </select>
            <!-- Page Numbers -->
            <div class="flex gap-2">
              <button
                v-for="number in totalPages"
                :key="number"
                class="border border-gray-950 p-1"
                :class="{ 'bg-gray-200 text-black': currentPage === number }"
                @click="paginate(number)"
              >
                {{ number }}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref as vueRef, onMounted, computed } from 'vue';
import Swal from "sweetalert2";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from '../../utils/firebaseConfig';
import { storage } from '../../config/firebse';

const courses = vueRef<any[]>([]);
const selectedCourse = vueRef<any>(null);
const currentPage = vueRef(1);
const postsPerPage = vueRef(2);

// Lấy tất cả khóa học từ Firestore
const fetchCourses = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'courses'));
    courses.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
};

// Phân trang
const totalPages = computed(() => Math.ceil(courses.value.length / postsPerPage.value));
const paginatedCourses = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage.value;
  return courses.value.slice(start, start + postsPerPage.value);
});

onMounted(() => {
  fetchCourses();
});

const paginate = (pageNumber: number) => {
  currentPage.value = pageNumber;
};

const addCourse = async (courseData: any) => {
  try {
    await addDoc(collection(db, 'courses'), courseData);
    await fetchCourses();
    Swal.fire("Thành công!", "Khóa học đã được thêm.", "success");
  } catch (error) {
    Swal.fire("Lỗi!", "Không thể thêm khóa học.", "error");
  }
};

const updateCourse = async (courseData: any) => {
  try {
    const courseRef = doc(db, 'courses', selectedCourse.value.id);
    await updateDoc(courseRef, courseData);
    await fetchCourses();
    Swal.fire("Cập nhật thành công!", "Khóa học đã được cập nhật.", "success");
  } catch (error) {
    Swal.fire("Lỗi!", "Không thể cập nhật khóa học.", "error");
  }
};

const deleteCourses = async (id: string) => {
  const result = await Swal.fire({
    title: "Bạn có chắc chắn muốn xóa?",
    text: "Điều này sẽ xóa tất cả các môn học liên quan.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy",
  });

  if (result.isConfirmed) {
    try {
      await deleteDoc(doc(db, 'courses', id));
      await fetchCourses();
      Swal.fire("Xóa thành công!", "Khóa học đã được xóa.", "success");
    } catch (error) {
      Swal.fire("Lỗi!", "Không thể xóa khóa học.", "error");
    }
  }
};

const showFormAddCourse = () => {
  Swal.fire({
    title: "Thêm khóa học",
    html: `
      <input id="swal-input1" class="swal2-input" placeholder="Tên khóa học">
      <textarea id="swal-input2" class="swal2-textarea" placeholder="Mô tả"></textarea>
      <input type="file" id="swal-input3" class="swal2-file">
    `,
    focusConfirm: false,
    preConfirm: async () => {
      const title = (document.getElementById("swal-input1") as HTMLInputElement).value;
      const description = (document.getElementById("swal-input2") as HTMLTextAreaElement).value;
      const fileInput = document.getElementById("swal-input3") as HTMLInputElement;
      const file = fileInput.files?.[0];

      if (!title || !description) {
        Swal.showValidationMessage("Vui lòng nhập đủ thông tin");
        return false;
      }

      let img = "";
      if (file) {
        const imageRef = storageRef(storage, `courses/${file.name}`);
        await uploadBytes(imageRef, file);
        img = await getDownloadURL(imageRef);
      }

      return { title, description, img };
    },
    confirmButtonText: "Thêm",
  }).then((result) => {
    if (result.isConfirmed) {
      addCourse(result.value);
    }
  });
};

const editCourse = (course: any) => {
  selectedCourse.value = course;
  Swal.fire({
    title: "Sửa khóa học",
    html: `
      <input id="swal-input1" class="swal2-input" value="${course.title}">
      <textarea id="swal-input2" class="swal2-textarea">${course.description}</textarea>
      <input type="file" id="swal-input3" class="swal2-file">
    `,
    focusConfirm: false,
    preConfirm: async () => {
      const title = (document.getElementById("swal-input1") as HTMLInputElement).value;
      const description = (document.getElementById("swal-input2") as HTMLTextAreaElement).value;
      const fileInput = document.getElementById("swal-input3") as HTMLInputElement;
      const file = fileInput.files?.[0];

      if (!title || !description) {
        Swal.showValidationMessage("Vui lòng nhập đủ thông tin");
        return false;
      }

      let img = course.img;
      if (file) {
        const imageRef = storageRef(storage, `courses/${file.name}`);
        await uploadBytes(imageRef, file);
        img = await getDownloadURL(imageRef);
      }

      return { title, description, img };
    },
    confirmButtonText: "Cập nhật",
  }).then((result) => {
    if (result.isConfirmed) {
      updateCourse(result.value);
    }
  });
};
</script>


<style scoped>
.container-content-admin {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.attendance {
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.manage-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.addcourses {
  background-color: #4CAF50; /* Màu xanh lá cây */
  color: white;
  border: none;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.addcourses:hover {
  background-color: #45a049; /* Màu xanh lá cây đậm hơn khi hover */
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.table th {
  background-color: #f2f2f2; /* Màu nền cho tiêu đề bảng */
  color: #333;
}

.table tr:nth-child(even) {
  background-color: #f9f9f9; /* Màu nền cho các dòng chẵn */
}

.table tr:hover {
  background-color: #f1f1f1; /* Màu nền khi hover lên dòng */
}

.table button {
  background-color: #007bff; /* Màu xanh dương cho nút */
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.table .button {
  background-color: #007bff; /* Màu xanh dương cho nút */
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.table button:hover {
  background-color: #0056b3; /* Màu xanh dương đậm hơn khi hover */
}

.table button:last-child {
  background-color: #dc3545; /* Màu đỏ cho nút xóa */
}

.table button:last-child:hover {
  background-color: #c82333; /* Màu đỏ đậm hơn khi hover */
}

</style>
