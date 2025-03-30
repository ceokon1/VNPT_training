import { mutations} from "./mutations";
import { actions } from "./actions";
import { ApiError } from "../users";

export interface SubjectState {
  data: any[];  // Dữ liệu khóa học
  loading: boolean;  // Trạng thái loading
  err: ApiError | null;  // Trạng thái lỗi (nếu có)
}

export const subjectModules = {
  namespaced: true,
  state: (): SubjectState => ({
    data: [],  // Mảng chứa dữ liệu khóa học
    loading: false,
    err: null,
  }),
  mutations,
  actions,
  getters: {},
};
