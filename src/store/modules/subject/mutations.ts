import { SubjectState } from ".";

export const mutations = {
  setSubject(state: SubjectState, subject: any[]) {
    state.data = subject;
  },

  setLoading(state: SubjectState, loading: boolean) {
    state.loading = loading;
  },

  setErr(state: SubjectState, error: any) {
    state.err = error;
  },
};
