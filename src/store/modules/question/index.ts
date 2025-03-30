import { mutations} from "./mutations";
import { actions } from "./actions";
import { ApiError } from "../users";

export interface QuestionState {
  data: any[];  
  loading: boolean;  
  err: ApiError | null;  
}

export const questionModules = {
  namespaced: true,
  state: (): QuestionState => ({
    data: [],  
    loading: false,
    err: null,
  }),
  mutations,
  actions,
  getters: {},
};
