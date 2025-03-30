<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const login = ref(false);
const user = ref<any>(null);
const yourProfile = ref<any>(null);
const shuffledQuestions = ref<any[]>([]);
const currentQuestionIndex = ref(0);
const userAnswers = ref<string[]>([]);
const countdown = ref(1200);
const router = useRouter();
const route = useRoute();
const idExam = route.params.id as string;

const fetchUser = async () => {
  const userLogin = localStorage.getItem("keyLogin");
  if (userLogin) {
    user.value = JSON.parse(userLogin);
    login.value = true;
    yourProfile.value = userLogin;
  } else {
    login.value = false;
    Swal.fire({
      title: "Bạn chưa đăng nhập!",
      text: "Vui lòng thực hiện đăng nhập",
      icon: "error",
    }).then(() => {
      router.push("/signInUser");
    });
  }
};

const fetchQuestions = async () => {
  try {
    const response = await axios.get("http://localhost:8080/question");
    const questions = response.data.filter((question: any) => question.idExam == idExam);
    const shuffled = shuffleArray(questions);
    shuffledQuestions.value = shuffled;
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
};

const shuffleArray = (array: any[]) => {
  return array
    .map((q) => ({
      ...q,
      answerList: q.answerList.sort(() => Math.random() - 0.5),
    }))
    .sort(() => Math.random() - 0.5);
};

const handleAnswerChange = (index: number, answerIndex: number) => {
  userAnswers.value[index] = answerIndex.toString();
  localStorage.setItem("userAnswers", JSON.stringify(userAnswers.value));
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};

watch(countdown, (newCountdown) => {
  if (newCountdown === 0) handleSubmit();
});

const startCountdown = () => {
  const intervalId = setInterval(() => {
    if (countdown.value > 0) countdown.value--;
    else clearInterval(intervalId);
  }, 1000);
};

const handleSubmit = async () => {
  Swal.fire({
    title: "Bạn có chắc chắn nộp bài không?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then(async (result) => {
    if (result.isConfirmed) {
      let score = 0;
      const totalQuestions = shuffledQuestions.value.length;
      const correctAnswersCount = shuffledQuestions.value.reduce((count, question, index) => {
        if (
          userAnswers.value[index] &&
          question.answerList[userAnswers.value[index]].status === 1
        ) {
          return count + 1;
        }
        return count;
      }, 0);

      score = (correctAnswersCount / totalQuestions) * 10;
      const formattedTime = formatTime(1200 - countdown.value);
      const examResult = {
        id: Math.floor(Math.random() * 10000),
        idExam: +idExam,
        idUser: user.value.id,
        score,
        time: formattedTime,
        date: new Date().toLocaleString(),
        answers: shuffledQuestions.value.map((question, index) => ({
          questionId: question.id,
          selectedAnswer: userAnswers.value[index] ?? null,
          isCorrect:
            userAnswers.value[index] !== undefined &&
            question.answerList[userAnswers.value[index]].status === 1,
        })),
      };

      try {
        await axios.post("http://localhost:8080/userAnswer", examResult);
        const updatedUser = {
          ...user.value,
          result: [
            ...user.value.result,
            {
              idTest: +idExam,
              score,
              time: formattedTime,
              date: new Date().toLocaleString(),
            },
          ],
        };
        await axios.patch(`http://localhost:8080/userList/${user.value.id}`, updatedUser);
        localStorage.setItem("keyLogin", JSON.stringify(updatedUser));
        Swal.fire({
          title: "Nộp bài thành công!",
          text: `Điểm của bạn là ${score.toFixed(2)}. Thời gian làm bài: ${formattedTime}`,
          icon: "success",
        });
        router.push(`/result/${examResult.id}`);
      } catch (error) {
        console.error("Error submitting exam:", error);
        Swal.fire({
          title: "Có lỗi xảy ra!",
          text: "Không thể nộp bài. Vui lòng thử lại.",
          icon: "error",
        });
      }
    }
  });
};

onMounted(() => {
  fetchUser();
  fetchQuestions();
  startCountdown();
});
</script>

<!-- Template và style giữ nguyên -->
