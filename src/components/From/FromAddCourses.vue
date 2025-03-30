<template>
  <div class="add-course-container">
    <h2 class="text-3xl">Thêm Khóa Học Mới</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Tên khóa học:</label>
        <input type="text" v-model="course.title" />
        <p v-if="errorMessages.title" class="error">{{ errorMessages.title }}</p>
      </div>
      <div class="form-group">
        <label for="description">Mô Tả:</label>
        <textarea v-model="course.description"></textarea>
        <p v-if="errorMessages.description" class="error">{{ errorMessages.description }}</p>
      </div>
      <div class="form-group">
        <label for="img">Hình Ảnh:</label>
        <input type="file" @change="handleFileUpload" />
        <img v-if="previewImage" :src="previewImage" alt="Image Preview" class="w-[100px] h-[100px]" />
        <p v-if="errorMessages.img" class="error">{{ errorMessages.img }}</p>
      </div>
      <button type="submit" class="submit-button" :disabled="uploading">
        {{ uploading ? "Đang tải ảnh..." : "Thêm Khóa Học" }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { storage } from "../../config/firebse";

const store = useStore();
const course = ref({
  title: '',
  description: '',
  img: '',
});
const uploading = ref(false);
const previewImage = ref<string | null>(null); // URL for image preview
const errorMessages = ref({
  title: '',
  description: '',
  img: '',
});

const emit = defineEmits(['close']);

const handleFileUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  previewImage.value = URL.createObjectURL(file);

  try {
    uploading.value = true;

    const imageRef = storageRef(storage, `courses/${file.name}`);
    await uploadBytes(imageRef, file);

    const downloadURL = await getDownloadURL(imageRef);
    course.value.img = downloadURL;
  } catch (error) {
    console.error("Lỗi khi tải ảnh lên:", error);
  } finally {
    uploading.value = false;
  }
};

const submitForm = async () => {
  errorMessages.value = { title: '', description: '', img: '' }; // Reset error messages

  // Validate each field
  if (!course.value.title) errorMessages.value.title = 'Vui lòng nhập tên khóa học!';
  if (!course.value.description) errorMessages.value.description = 'Vui lòng nhập mô tả!';
  if (!course.value.img) errorMessages.value.img = 'Vui lòng tải ảnh lên!';

  // Stop submission if there are errors
  if (errorMessages.value.title || errorMessages.value.description || errorMessages.value.img) return;

  try {
    await store.dispatch('courses/addCourse', course.value);

    course.value = { title: '', description: '', img: '' };
    previewImage.value = null; 

    emit('close');
  } catch (error) {
    console.error('Lỗi khi thêm khóa học:', error);
  }
};
</script>

<style scoped>
.add-course-container {
  width: 500px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 100px;
  left: 600px;
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
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  resize: vertical;
}

.error {
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
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
