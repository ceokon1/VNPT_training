<template>
    <div class="update-course-container">
      <h2>Cập Nhật Khóa Học</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="title">Tiêu Đề:</label>
          <input type="text" v-model="updatedCourse.title" />
        </div>
        <div class="form-group">
          <label for="description">Mô Tả:</label>
          <textarea v-model="updatedCourse.description"></textarea>
        </div>
        <div class="form-group">
          <label for="img">URL Hình Ảnh:</label>
          <input type="url" v-model="updatedCourse.img" />
        </div>
        <button type="submit" class="submit-button">Cập Nhật Khóa Học</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useStore } from 'vuex';
  
  // Nhận khóa học từ prop
  const props = defineProps({
    course: {
      type: Object,
      required: true,
    },
  });
  
  const store = useStore();
  const updatedCourse = ref({ ...props.course }); // Tạo bản sao của khóa học để chỉnh sửa
  
  // Watch props để cập nhật khi dữ liệu props thay đổi
  watch(() => props.course, (newCourse) => {
    updatedCourse.value = { ...newCourse };
  });
  
  // Hàm submit form chỉnh sửa khóa học
  const submitForm = async () => {
    try {
      await store.dispatch('courses/updateCourse', updatedCourse.value);
      emit('close'); // Đóng form sau khi cập nhật thành công
    } catch (error) {
      console.error('Lỗi khi cập nhật khóa học:', error);
    }
  };
  
  const emit = defineEmits(['close']);
  </script>
  
  <style scoped>
  .add-course-container {
    margin: 20px auto;
    max-width: 600px;
    padding: 20px;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 100px;
    left: 800px;
  }
  
  h2 {
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="url"],
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  textarea {
    resize: vertical;
  }
  
  .submit-button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .submit-button:hover {
    background-color: #45a049;
  }
  </style>
  
  