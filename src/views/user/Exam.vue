<template>
  <div>
    <Header />
    <br /><br /><br /><br />
    <main class="bg-gray-100 p-5">
      <div class="bg-white rounded-lg shadow-lg p-5">
        <h1 class="text-2xl font-semibold mb-5">Thông tin đề thi</h1>
        <div class="flex bg-gray-200 p-5 rounded-lg items-center mb-5">
          <div class="font-bold text-lg bg-gray-300 p-2 rounded-lg mr-5">{{ exam?.id }}</div>
          <div class="flex-grow flex">
            <img :src="exam?.image || '#'" alt="Exam Name" class="w-72 h-48 rounded-lg mr-5" />
            <div>
              <h2 class="text-xl font-semibold">{{ exam?.name }}</h2>
              <div class="space-y-2 mt-2">
                <div class="flex items-center space-x-2 text-gray-600">
                  <font-awesome-icon icon="calendar-days" />
                  <span>Số lượt thi: {{ exam?.sequence }}</span>
                </div>
                <div class="flex items-center space-x-2 text-gray-600">
                  <font-awesome-icon icon="circle-question" />
                  <span>Số câu hỏi: 20 câu hỏi</span>
                </div>
                <div class="flex items-center space-x-2 text-gray-600">
                  <font-awesome-icon icon="clock" />
                  <span>Thời gian làm bài: 30 phút</span>
                </div>
              </div>
              <div class="text-yellow-500 mt-2">
                <font-awesome-icon icon="star" v-for="star in 5" :key="star" />
              </div>
              <button @click="startExam"
                class="inline-flex items-center bg-blue-600 text-white px-4 py-2 mt-3 rounded-lg hover:bg-blue-800">
                <font-awesome-icon icon="user-clock" class="mr-2" />
                <b>Bắt Đầu Làm Bài</b>
              </button>
            </div>
          </div>
        </div>

        <!-- Đề Thi Tham Khảo -->
        <section class="mt-8">
          <h2 class="text-xl font-semibold mb-5">Đề Thi Tham Khảo</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div v-for="item in referenceExams" :key="item.id" class="bg-white rounded-lg shadow-lg p-5 text-center">
              <img :src="item.image || '#'" alt="Reference Exam" class="w-full h-48 rounded-lg mb-3" />
              <h3 class="text-lg font-medium">{{ item.name }}</h3>
              <p>Số câu hỏi: 20 câu hỏi</p>
              <p>Số lượt thi: {{ item.sequence }}</p>
              <RouterLink :to="`/exam/${item.id}`"
                class="inline-block bg-blue-600 text-white px-4 py-2 mt-3 rounded-lg hover:bg-blue-800">
                Xem Chi Tiết
              </RouterLink>
            </div>
          </div>
        </section>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "../../components/user/Header.vue";
import Footer from "../../components/user/Footer.vue";
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from '@/utils/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default {
  components: { Header, Footer },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const examList = ref([]);
    const exam = ref(null);
    const referenceExams = ref([]);
    const isLoggedIn = ref(false);

    const idExam = computed(() => +route.params.id);

    onMounted(async () => {
      await fetchExams();
      const userLogin = JSON.parse(localStorage.getItem("keyLogin") || "{}");
      isLoggedIn.value = !!userLogin;
    });

    watch(idExam, () => {
      if (examList.value.length > 0) {
        filterExam(examList.value);
      }
    });

    const fetchExams = async () => {
      try {
        const snapshot = await getDocs(collection(db, "exams"));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        examList.value = data;
        filterExam(data);
      } catch (error) {
        console.error("Error fetching exam data:", error);
      }
    };

    const filterExam = (exams) => {
      exam.value = exams.find(item => +item.id === idExam.value);
      referenceExams.value = exams.filter(
        item => item.idSubject === exam.value?.idSubject && +item.id !== idExam.value
      );
    };

    const startExam = () => {
      if (!exam.value || !exam.value.id) {
        alert("Đề thi chưa sẵn sàng, vui lòng chờ...");
        return;
      }

      if (isLoggedIn.value) {
        router.push(`/test/${exam.value.id}`);
      } else {
        alert("Bạn cần đăng nhập để làm bài thi!");
      }
    };

    return {
      exam,
      referenceExams,
      startExam
    };
  }
};
</script>

<style scoped></style>
