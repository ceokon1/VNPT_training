<template>
  <div>
    <div class="container mx-auto p-4">
      <section class="bg-white shadow-md rounded-lg p-6">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold text-gray-800">Quản lí câu hỏi</h1>
          <button
            @click="handleAdd"
            class="bg-blue-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Thêm câu hỏi
          </button>
        </div>

        <div class="mb-6">
          <input
            type="text"
            placeholder="Tìm kiếm câu hỏi"
            v-model="searchTerm"
            @input="handleSearch"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
          />
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full bg-white">
            <thead>
              <tr class="bg-gray-100">
                <th class="py-3 px-4 text-gray-600 font-medium border-b">STT</th>
                <th class="py-3 px-4 text-gray-600 font-medium border-b">Tên câu hỏi</th>
                <th class="py-3 px-4 text-gray-600 font-medium border-b">Đáp án đúng</th>
                <th class="py-3 px-4 text-gray-600 font-medium border-b">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(question, index) in currentQuestions"
                :key="index"
                class="hover:bg-gray-50 transition duration-200"
              >
                <td class="h-[100px] py-3 px-4 border-b text-gray-800">{{ index + 1 }}</td>
                <td class="h-[100px] py-3 px-4 border-b text-gray-800">{{ question.questionName }}</td>
                <td class="h-[100px] py-3 px-4 border-b text-gray-800">{{ correctAnswer(question) }}</td>
                <td class="h-[100px] flex justify-center items-center py-3 px-4 border-b">
                  <button
                    @click="handleEdit(question)"
                    class="h-[40px] bg-yellow-500 text-white font-medium px-3 py-1 rounded-lg mr-2 hover:bg-yellow-600 transition duration-200"
                  >
                    Sửa
                  </button>
                  <button
                    @click="handleDelete(question.id)"
                    class="h-[40px] bg-red-500 text-white font-medium px-3 py-1 rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex justify-between items-center mt-6">
          <button
            class="bg-gray-200 text-gray-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200 disabled:opacity-50"
            @click="paginate(currentPage - 1)"
            :disabled="currentPage === 1"
          >
            &laquo; Trang trước
          </button>
          <div>
            <button
              v-for="page in totalPages"
              :key="page"
              :class="[ 'font-medium px-4 py-2 rounded-lg mx-1 transition duration-200', { 'bg-blue-500 text-white': page === currentPage, 'bg-gray-200 text-gray-600': page !== currentPage } ]"
              @click="paginate(page)"
            >
              {{ page }}
            </button>
          </div>
          <button
            class="bg-gray-200 text-gray-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200 disabled:opacity-50"
            @click="paginate(currentPage + 1)"
            :disabled="currentPage === totalPages"
          >
            Trang sau &raquo;
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter, useRoute } from 'vue-router';

// Data and refs
const questions = ref([]);
const searchTerm = ref('');
const currentPage = ref(1);
const questionsPerPage = ref(5);
const route = useRoute();
const router = useRouter();

// Exam ID from route params
const examId = +route.params.id;

onMounted(() => {
  fetchQuestions();
});

// Fetch questions from the server
const fetchQuestions = async () => {
  try {
    const response = await axios.get('http://localhost:8080/question');
    questions.value = response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    Swal.fire('Lỗi!', 'Không thể tải danh sách câu hỏi. Vui lòng thử lại sau.', 'error');
  }
};

// Computed properties for filtering and pagination
const filteredQuestions = computed(() => {
  if (!searchTerm.value) {
    return questions.value.filter((q) => q.idExam === examId);
  }
  return questions.value.filter(
    (q) => q.idExam === examId && q.questionName.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const totalPages = computed(() => Math.ceil(filteredQuestions.value.length / questionsPerPage.value));

const currentQuestions = computed(() => {
  const startIndex = (currentPage.value - 1) * questionsPerPage.value;
  const endIndex = startIndex + questionsPerPage.value;
  return filteredQuestions.value.slice(startIndex, endIndex);
});

// Handle searching
const handleSearch = () => {
  currentPage.value = 1;
};

// Handle deleting a question
const handleDelete = (id) => {
  Swal.fire({
    title: 'Bạn có chắc chắn muốn xóa?',
    text: 'Câu hỏi này sẽ bị xóa vĩnh viễn!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy',
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`http://localhost:8080/question/${id}`)
        .then(() => {
          fetchQuestions();
          Swal.fire('Đã xóa!', 'Câu hỏi đã bị xóa.', 'success');
        })
        .catch((error) => {
          console.error('Error deleting question:', error);
          Swal.fire('Lỗi!', 'Không thể xóa câu hỏi. Vui lòng thử lại.', 'error');
        });
    }
  });
};

const handleAdd = () => {
  Swal.fire({
    title: "Thêm câu hỏi mới",
    html: `
      <input id="swal-input1" class="swal2-input" placeholder="Tên câu hỏi">
      <input id="swal-input2" class="swal2-input" placeholder="Đáp án 1">
      <input id="swal-input3" class="swal2-input" placeholder="Đáp án 2">
      <input id="swal-input4" class="swal2-input" placeholder="Đáp án 3">
      <input id="swal-input5" class="swal2-input" placeholder="Đáp án 4">
      <select id="swal-correct-answer" class="swal2-select">
        <option>Chọn đáp án đúng</option>
        <option value="0">Đáp án 1</option>
        <option value="1">Đáp án 2</option>
        <option value="2">Đáp án 3</option>
        <option value="3">Đáp án 4</option>
      </select>
    `,
    focusConfirm: false,
    preConfirm: () => {
      const questionName = (document.getElementById("swal-input1") as HTMLInputElement).value;
      const answers = [
        (document.getElementById("swal-input2") as HTMLInputElement).value,
        (document.getElementById("swal-input3") as HTMLInputElement).value,
        (document.getElementById("swal-input4") as HTMLInputElement).value,
        (document.getElementById("swal-input5") as HTMLInputElement).value,
      ];
      const correctAnswerIndex = (document.getElementById("swal-correct-answer") as HTMLSelectElement).value;

      if (!questionName || answers.some(answer => !answer)) {
        Swal.showValidationMessage("Vui lòng điền đầy đủ thông tin");
      }

      return {
        questionName,
        answers,
        correctAnswerIndex: Number(correctAnswerIndex)
      };
    }
  }).then(result => {
    if (result.isConfirmed) {
      const newQuestion = {
        questionId: Math.floor(1000 + Math.random() * 9000), // Random 4-digit ID
        questionName: result.value.questionName,
        idExam: examId,
        answerList: result.value.answers.map((answer, index) => ({
          answer,
          status: index === result.value.correctAnswerIndex ? true : false,
        }))
      };

      axios.post("http://localhost:8080/question", newQuestion)
        .then(() => {
          fetchQuestions();
          Swal.fire("Thành công!", "Câu hỏi mới đã được thêm.", "success");
        })
        .catch(error => {
          console.error("Error adding question:", error);
          Swal.fire("Lỗi!", "Không thể thêm câu hỏi. Vui lòng thử lại.", "error");
        });
    }
  });
};

const handleEdit = (question) => {
  Swal.fire({
    title: "Chỉnh sửa câu hỏi",
    html: `
      <input id="swal-input1" class="swal2-input" value="${question.questionName}" placeholder="Tên câu hỏi">
      <input id="swal-input2" class="swal2-input" value="${question.answerList[0].answer}" placeholder="Đáp án 1">
      <input id="swal-input3" class="swal2-input" value="${question.answerList[1]?.answer || ''}" placeholder="Đáp án 2">
      <input id="swal-input4" class="swal2-input" value="${question.answerList[2]?.answer || ''}" placeholder="Đáp án 3">
      <input id="swal-input5" class="swal2-input" value="${question.answerList[3]?.answer || ''}" placeholder="Đáp án 4">
      <select id="swal-correct-answer" class="swal2-select">
        <option value="0" ${question.answerList[0].status ? 'selected' : ''}>Đáp án 1</option>
        <option value="1" ${question.answerList[1]?.status ? 'selected' : ''}>Đáp án 2</option>
        <option value="2" ${question.answerList[2]?.status ? 'selected' : ''}>Đáp án 3</option>
        <option value="3" ${question.answerList[3]?.status ? 'selected' : ''}>Đáp án 4</option>
      </select>
    `,
    focusConfirm: false,
    preConfirm: () => {
      const questionName = (document.getElementById("swal-input1") as HTMLInputElement).value;
      const answers = [
        (document.getElementById("swal-input2") as HTMLInputElement).value,
        (document.getElementById("swal-input3") as HTMLInputElement).value,
        (document.getElementById("swal-input4") as HTMLInputElement).value,
        (document.getElementById("swal-input5") as HTMLInputElement).value,
      ];
      const correctAnswerIndex = (document.getElementById("swal-correct-answer") as HTMLSelectElement).value;

      if (!questionName || answers.some(answer => !answer)) {
        Swal.showValidationMessage("Vui lòng điền đầy đủ thông tin");
      }

      return {
        questionName,
        answers,
        correctAnswerIndex: Number(correctAnswerIndex)
      };
    }
  }).then(result => {
    if (result.isConfirmed) {
      const updatedQuestion = {
        ...question,
        questionName: result.value.questionName,
        answerList: result.value.answers.map((answer, index) => ({
          answer,
          status: index === result.value.correctAnswerIndex ? true : false,
        }))
      };

      axios.patch(`http://localhost:8080/question/${question.questionId}`, updatedQuestion)
        .then(() => {
          fetchQuestions();
          Swal.fire("Thành công!", "Câu hỏi đã được cập nhật.", "success");
        })
        .catch(error => {
          console.error("Error editing question:", error);
          Swal.fire("Lỗi!", "Không thể cập nhật câu hỏi. Vui lòng thử lại.", "error");
        });
    }
  });
};


// Determine the correct answer
const correctAnswer = (question) => {
  const correct = question.answerList.find((a) => a.status === true);
  return correct ? correct.answer : 'Chưa xác định';
};

// Handle pagination
const paginate = (pageNumber) => {
  if (pageNumber >= 1 && pageNumber <= totalPages.value) {
    currentPage.value = pageNumber;
  }
};
</script>

<style scoped>
</style>
