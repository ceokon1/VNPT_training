import { ActionContext } from "vuex";
import { RootState } from "../../store";
import { SubjectState } from ".";
import { addSubjectToBackend, editSubjectInBackend, getAllSubject } from "../../../API/subject/subject";

export const actions = {
  async fetchSubjects({ commit }: ActionContext<SubjectState, RootState>, idCourses: number) {
    commit("setLoading", true);
    try {
      const subjects = await getAllSubject();
      const filteredSubjects = subjects.filter((subject: any) => subject.idCourese === idCourses);
      commit("setSubject", filteredSubjects);
    } catch (error) {
      commit("setErr", error);
    } finally {
      commit("setLoading", false);
    }
  },

  async addSubject({ commit, state }: ActionContext<SubjectState, RootState>, newSubject: any) {
    try {
      // Gọi API thêm môn học vào backend
      await addSubjectToBackend(newSubject);
      
      // Cập nhật state sau khi thêm môn học
      const updatedSubjects = [...state.data, newSubject]; 
      commit('setSubject', updatedSubjects);
      
      alert("Thêm môn học thành công!");
    } catch (error) {
      commit("setErr", error);
    }
  },

  async editSubject({ commit }: any, updatedSubject: any) {
    try {
      await editSubjectInBackend(updatedSubject);
      commit('fetchSubjects'); // Optionally re-fetch the subject list
    } catch (err) {
      commit('setErr', err);
    }
  }
};
