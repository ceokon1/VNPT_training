import { ActionContext } from "vuex";
import { RootState } from "../../store";
import { ExamState } from ".";
import { getAllExams } from "../../../API/exam/exam";

export const actions = {
  async fetchExams({ commit }: ActionContext<ExamState, RootState>, idSubject: number) {
    commit("setLoading", true);
    try {
      const exam = await getAllExams();
      const filteredExam = exam.filter((exam: any) => exam.idSubject === idSubject);
      commit("setSubject", filteredExam);
    } catch (error) {
      commit("setErr", error);
    } finally {
      commit("setLoading", false);
    }
  },
// };

  // async addSubject({ commit, state }: ActionContext<ExamState, RootState>, newSubject: any) {
  //   try {
  //     // Gọi API thêm môn học vào backend
  //     await addSubjectToBackend(newSubject);
      
  //     // Cập nhật state sau khi thêm môn học
  //     const updatedSubjects = [...state.data, newSubject]; 
  //     commit('setSubject', updatedSubjects);
      
  //     alert("Thêm môn học thành công!");
  //   } catch (error) {
  //     commit("setErr", error);
  //   }
  // },

  // async editSubject({ commit }: any, updatedSubject: any) {
  //   try {
  //     await editSubjectInBackend(updatedSubject);
  //     commit('fetchSubjects'); // Optionally re-fetch the subject list
  //   } catch (err) {
  //     commit('setErr', err);
  //   }
  // }
};
