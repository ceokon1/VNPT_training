<template>
    <div class="form-container">
      <h2>Chỉnh sửa môn học</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="subjectName">Tên môn</label>
          <input v-model="subjectName" type="text" id="subjectName" placeholder="Nhập tên môn học" />
        </div>
  
        <div class="form-group">
          <label for="subjectImage">Ảnh môn học</label>
          <input v-model="subjectImage" type="text" id="subjectImage" placeholder="Nhập URL ảnh môn học" />
        </div>
  
        <button type="submit" class="btn-submit">Lưu chỉnh sửa</button>
        <button type="button" class="btn-cancel" @click="$emit('close')">Hủy</button>
      </form>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const props = defineProps({
  subject: {
    type: Object,
    required: true,
  }
});

const subjectName = ref('');
const subjectImage = ref('');
const store = useStore();
const router = useRouter();

watch(() => props.subject, (newSubject) => {
  if (newSubject) {
    subjectName.value = newSubject.subject;
    subjectImage.value = newSubject.img;
  }
}, { immediate: true });

const submitForm = () => {
  if (subjectName.value && subjectImage.value) {
    const updatedSubject = {
      ...props.subject,
      subject: subjectName.value,
      img: subjectImage.value,
    };

    // Dispatch action to update subject
    store.dispatch('editSubject', updatedSubject)
      .then(() => {
        // Optionally navigate or show success message
        router.push('/subjects');
      })
      .catch((err) => alert(err));
  } else {
    alert('Vui lòng nhập đầy đủ thông tin.');
  }
};

  </script>
  
  <style scoped>
  .form-container {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    max-width: 400px;
    margin: auto;
    position: fixed;
    left: 500px;
  }
  .form-group {
    margin-bottom: 15px;
  }
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  .form-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  .btn-submit {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  .btn-cancel {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    margin-left: 10px;
  }
  </style>
  