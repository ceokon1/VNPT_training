import { ExamState } from ".";

export const mutations = {
  setSubject(state: ExamState, exam: any[]) {
    state.data = exam;
  },

  setLoading(state: ExamState, loading: boolean) {
    state.loading = loading;
  },

  setErr(state: ExamState, error: any) {
    state.err = error;
  },
};
