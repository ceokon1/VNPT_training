<template>
    <div class="form-container">
      <h2>Thêm môn học</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="subjectName">Tên môn</label>
          <input v-model="subjectName" type="text" id="subjectName" required placeholder="Nhập tên môn học" />
        </div>
  
        <div class="form-group">
          <label for="subjectImage">Ảnh môn học</label>
          <input v-model="subjectImage" type="text" id="subjectImage" required placeholder="Nhập URL ảnh môn học" />
        </div>
  
        <button type="submit" class="btn-submit">Thêm môn</button>
      </form>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { store } from '../../store/store';
  import { useRouter, useRoute } from 'vue-router';
  
  const subjectName = ref('');
  const subjectImage = ref('');
  const router = useRouter();
  const route = useRoute(); 
  
  const idCourses = +route.params.id;
  
  
  const submitForm = async () => {
  if (subjectName.value && subjectImage.value && idCourses) {
    const newSubject = {
      idCourese: idCourses,
      subject: subjectName.value,
      img: subjectImage.value,
    };

    await store.dispatch('subject/addSubject', newSubject);

    subjectName.value = '';
    subjectImage.value = '';
  } else {
    alert('Vui lòng nhập đầy đủ thông tin.');
  }
};
  </script>
  
  <style scoped>
  .form-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    position: fixed;
    left: 700px;
  }
  
  .form-group {
    margin-bottom: 16px;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .btn-submit {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  