import { ActionContext } from "vuex";
import { AddCourses, deleteCourses, getAllCourses, getCourseById, updateCourse } from "../../../API/courses/getAll";
import { CoursesState } from ".";
import { RootState } from "../../store";

export const actions = {
  async fetchCourses({ commit }: ActionContext<CoursesState, RootState>) {
    commit("setLoading", true);
    try {
      const courses = await getAllCourses();  // Gọi API để lấy danh sách khóa học
      commit("setCourses", courses);  // Lưu danh sách vào state
    } catch (error) {
      commit("setErr", error);  // Xử lý lỗi
    } finally {
      commit("setLoading", false);
    }
  },
  
  async addCourse({ commit, dispatch }: ActionContext<CoursesState, RootState>, courseData: any) {
    try {
      await AddCourses(courseData);  // Gọi API thêm khóa học
      dispatch("fetchCourses");  // Lấy lại danh sách khóa học sau khi thêm mới
    } catch (error) {
      commit("setErr", error);  // Xử lý lỗi nếu có
    }
  },

  async updateCourse({ commit, dispatch }: ActionContext<CoursesState, RootState>, courseData: any) {
    try {
      const { id, ...updatedData } = courseData;
      await updateCourse(id, updatedData);  // Update the course
      dispatch("fetchCourses");  // Fetch updated courses
    } catch (error) {
      commit("setErr", error);  // Handle error
    }
  },

  async getCourseById({ commit }: ActionContext<CoursesState, RootState>, id: number) {
    try {
      const course = await getCourseById(id);  // Get course by ID
      return course;
    } catch (error) {
      commit("setErr", error);  // Handle error
    }
  },

  async daleteCourses({ commit }: ActionContext<CoursesState, RootState>, id: number) {
    try {
      const course = await deleteCourses(id);  // Get course by ID
      return course;
    } catch (error) {
      commit("setErr", error);  // Handle error
    }
  },
};
