import { QuestionState } from ".";

export const mutations = {
  setExam(state: QuestionState, question: any[]) {
    state.data = question;
  },

  setLoading(state: QuestionState, loading: boolean) {
    state.loading = loading;
  },

  setErr(state: QuestionState, error: any) {
    state.err = error;
  },
};
