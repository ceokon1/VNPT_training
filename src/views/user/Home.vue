<template>
  <div>
    <Header />
    <br /><br /><br />
    <Banner />
    <section class="attend-exam">
      <h1 class="text-center text-2xl font-semibold mb-6">Đề thi tiêu biểu</h1>
      <div id="attendSubject" class="attend-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <router-link v-for="exam in topExams" :key="exam.id" :to="`/exam/${exam.id}`"
          class="card border rounded-lg shadow-lg p-4" style="width: 18rem;">
          <img :src="exam.image" class="card-img-top w-full h-60 object-cover rounded-t-lg" :alt="exam.name" />
          <div class="card-body p-4">
            <h4 class="text-lg font-semibold">{{ exam.name }}</h4>
            <span id="sequence" class="text-gray-600">Lượt thi: {{ exam.sequence }}</span>
          </div>
        </router-link>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebaseConfig';
import Header from '../../components/user/Header.vue';
import Footer from '../../components/user/Footer.vue';
import Banner from '../../components/user/Banner.vue';

export default {
  components: { Header, Footer, Banner },
  setup() {
    const topExams = ref([]);

    const fetchExams = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'examList'));
        const sortedExams = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => b.sequence - a.sequence);
        topExams.value = sortedExams.slice(0, 4);
      } catch (error) {
        console.error('Error fetching exam data:', error);
      }
    };

    onMounted(fetchExams);

    return { topExams };
  }
};
</script>

<style scoped>
/* CSS giữ nguyên từ phiên bản trước */
</style>
