import { mutations} from "./mutations";
import { actions } from "./actions";
import { ApiError } from "../users";

export interface ExamState {
  data: any[];  // Dữ liệu khóa học
  loading: boolean;  // Trạng thái loading
  err: ApiError | null;  // Trạng thái lỗi (nếu có)
}

export const examModules = {
  namespaced: true,
  state: (): ExamState => ({
    data: [],  // Mảng chứa dữ liệu khóa học
    loading: false,
    err: null,
  }),
  mutations,
  actions,
  getters: {},
};
