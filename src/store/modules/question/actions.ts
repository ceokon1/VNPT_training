import { ActionContext } from "vuex";
import { RootState } from "../../store";
import { getAllQuestions } from "../../../API/question/question";
import { QuestionState } from ".";

export const actions = {
  async fetchQuestion({ commit }: ActionContext<QuestionState, RootState>, idExam: number) {
    commit("setLoading", true);
    try {
      const question = await getAllQuestions();
      const filteredQuestion = question.filter((question: any) => question.idExam === idExam);
      commit("setExam", filteredQuestion);
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
