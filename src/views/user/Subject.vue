<template>
  <div>
    <Header />
    <br><br><br><br>
    <main class="container mx-auto mt-8 p-4">
      <section class="flex flex-col items-center md:flex-row md:gap-8">
        <template v-if="course">
          <img class="w-full h-auto max-w-md rounded-lg" :src="course.img" :alt="course.title" />
          <div class="mt-6 md:mt-0 md:flex-1">
            <h1 class="text-3xl font-semibold text-gray-800">{{ course.title }}</h1>
            <p class="mt-2 text-lg text-gray-600">{{ course.description }}</p>

            <!-- Subjects Section -->
            <section class="mt-8">
              <div class="flex gap-4">
                <div v-for="subject in subjects" :key="subject.id" @click="handleSubjectClick(parseInt(subject.id, 10))"
                  :class="['cursor-pointer p-4 rounded-lg shadow-md hover:shadow-lg transition', { 'bg-gray-100 border-gray-300': selectedSubject === parseInt(subject.id, 10) }]">
                  <img class="w-20 h-20 rounded-md" :src="subject.img" :alt="subject.subject" />
                  <p class="mt-2 text-center text-gray-700">{{ subject.subject }}</p>
                </div>
              </div>
            </section>

            <!-- Level Section -->
            <nav class="mt-8">
              <h2 class="text-lg font-medium text-center text-gray-700">Độ khó</h2>
              <ul class="flex justify-center gap-4 mt-4">
                <li v-for="level in [1, 2, 3, 4, 5]" :key="level" @click="handleLevelClick(level)"
                  :class="['px-4 py-2 rounded-lg cursor-pointer transition', { 'bg-blue-600 text-white': selectedLevel === level, 'bg-gray-200 hover:bg-blue-500 hover:text-white': selectedLevel !== level }]">
                  Level {{ level }}
                </li>
              </ul>
            </nav>
          </div>
        </template>
      </section>

      <!-- Exams Section -->
      <section class="mt-12">
        <h1 class="text-2xl font-semibold text-gray-800">Danh sách các đề thi</h1>
        <div v-if="currentExams.length > 0" class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <router-link v-for="exam in currentExams" :key="exam.id" :to="`/exam/${exam.id}`"
            class="block p-4 border rounded-lg hover:shadow-lg transition">
            <img class="w-full h-48 object-cover rounded-md" :src="exam.image" :alt="exam.name" />
            <div class="mt-4">
              <h2 class="text-xl font-medium text-gray-800">{{ exam.name }}</h2>
              <p class="mt-2 text-sm text-gray-600">{{ exam.describe }}</p>
            </div>
          </router-link>
        </div>
        <p v-else class="text-center text-gray-500 mt-8">No exams available for the selected subject and level.</p>
      </section>

      <!-- Pagination Section -->
      <section class="mt-12 flex justify-center">
        <button
          class="px-4 py-2 mr-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
          @click="handlePageChange(currentPage - 1)" :disabled="currentPage === 1">
          <ion-icon name="chevron-back-outline" class="mr-1" />
          Trang trước
        </button>
        <div class="flex gap-2">
          <button v-for="number in pageNumbers" :key="number" @click="handlePageChange(number)"
            :class="['px-4 py-2 rounded-lg', { 'bg-blue-500 text-white': currentPage === number, 'bg-gray-200 hover:bg-blue-500 hover:text-white': currentPage !== number }]">
            {{ number }}
          </button>
        </div>
        <button
          class="px-4 py-2 ml-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
          @click="handlePageChange(currentPage + 1)" :disabled="currentPage === totalPages">
          Trang sau
          <ion-icon name="chevron-forward-outline" class="ml-1" />
        </button>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Header from "@/components/user/Header.vue";
import Footer from "@/components/user/Footer.vue";
import { useRouter } from "vue-router";
import { db } from '@/utils/firebaseConfig';
import {
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore';

const course = ref(null);
const subjects = ref([]);
const exams = ref([]);
const selectedSubject = ref(null);
const selectedLevel = ref(null);
const currentPage = ref(1);
const totalPages = ref(1);
const examsPerPage = 4;

const router = useRouter();
const courseId = parseInt(router.currentRoute.value.params.id, 10);

const fetchCourse = async () => {
  const snapshot = await getDocs(collection(db, 'courses'));
  course.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).find(c => parseInt(c.id) === courseId) || null;
};

const fetchSubjects = async () => {
  const snapshot = await getDocs(collection(db, 'subjects'));
  subjects.value = snapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(subject => parseInt(subject.idCourese) === courseId);
};

const fetchExams = async () => {
  const snapshot = await getDocs(collection(db, 'exams'));
  const allExams = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  exams.value = allExams.filter(exam => {
    return (
      (!selectedSubject.value || exam.idSubject === selectedSubject.value) &&
      (!selectedLevel.value || exam.level === selectedLevel.value)
    );
  });
  totalPages.value = Math.ceil(exams.value.length / examsPerPage);
};

const handleSubjectClick = (subjectId) => {
  selectedSubject.value = subjectId;
  fetchExams();
};

const handleLevelClick = (level) => {
  selectedLevel.value = level;
  fetchExams();
};

const handlePageChange = (page) => {
  currentPage.value = page;
};

const currentExams = computed(() => {
  const startIndex = (currentPage.value - 1) * examsPerPage;
  return exams.value.slice(startIndex, startIndex + examsPerPage);
});

const pageNumbers = computed(() => Array.from({ length: totalPages.value }, (_, i) => i + 1));

onMounted(() => {
  fetchCourse();
  fetchSubjects();
  fetchExams();
});
</script>


<style scoped>
/* Global Styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

/* Header and Footer Styles */
header,
footer {
  background-color: #333;
  color: #fff;
  padding: 10px 0;
  text-align: center;
}

/* Main Section */
.main {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Course Header */
.course-header {
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 50px;
  margin-bottom: 40px;
}

.course-img {
  width: 600px;
  height: 500px;
  object-fit: cover;
  border-radius: 8px;
}

.course-details {

  flex: 1;
}

.course-details h1 {
  font-size: 40px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.course-details p {
  font-size: 20px;
  color: #666;
}

/* Subjects List */
.content-first {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.subjects-list {
  display: flex;
  align-items: center;
  gap: 30px;
}

.a1 {
  font-size: 40px;
  font-weight: 600;
}

.subject-item {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 300px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.subject-item:hover,
.subject-item.active {
  background: #f1f1f1;
  border-color: #ccc;
}

.subject-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.subject-item p {
  margin: 0;
  font-size: 16px;
}

/* Navigation for Difficulty Levels */
.nav-choice {
  margin: 40px 0;
}

.nav-choice h1 {
  font-size: 20px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.ul-choice {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.ul-choice li {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.ul-choice li:hover,
.ul-choice li.active {
  background-color: #0056b3;
}

/* Exam List */
.list-exam {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}

.exam-item {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  max-width: 800px;
}

.exam-item img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.exam-item div {
  flex: 1;
}

.exam-item h2 {
  font-size: 18px;
  color: #333;
  margin: 0;
}

.exam-item p {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
}

/* Pagination Buttons */
.next-Pages {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  gap: 20px;
}

.btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}

.btn IonIcon {
  margin: 0 5px;
}

/* Pagination Container */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

/* Page Number Button */
.page-number {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

/* Active Page Number */
.page-number.active {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}

/* Page Number Button Hover */
.page-number:hover {
  background-color: #e0e0e0;
}

/* Previous and Next Buttons */
.btn {
  background-color: #007bff;
  border: 1px solid #007bff;
  color: #fff;
  border-radius: 4px;
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s, border-color 0.3s;
}

/* Disabled Button */
.btn:disabled {
  background-color: #d6d6d6;
  border-color: #d6d6d6;
  cursor: not-allowed;
}

/* Button Hover */
.btn:hover {
  background-color: #0056b3;
  border-color: #004080;
}

/* Button Icon */
.btn .ion-icon {
  margin-right: 5px;
}

/* Ensure Button and Page Number Align */
.btn,
.page-number {
  display: inline-flex;
  align-items: center;
}
</style>
