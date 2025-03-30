import { CoursesState } from ".";

export const mutations = {
  setCourses(state: CoursesState, courses: any[]) {
    state.data = courses;  // Set the list of courses
  },
  
  addCourse(state: CoursesState, course: any) {
    state.data.push(course);  // Add a new course
  },
  
  updateCourse(state: CoursesState, updatedCourse: any) {
    const index = state.data.findIndex((course: any) => course.id === updatedCourse.id);
    if (index !== -1) {
      state.data.splice(index, 1, updatedCourse);  // Update the existing course
    }
  },
  
  setLoading(state: CoursesState, loading: boolean) {
    state.loading = loading;  // Update the loading state
  },
  
  setErr(state: CoursesState, error: any) {
    state.err = error;  // Set the error state
  },
};
