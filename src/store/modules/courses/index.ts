import { mutations} from "./mutations";
import { actions } from "./actions";
import { ApiError } from "../users";

export interface CoursesState {
  data: any[];  // Dữ liệu khóa học
  loading: boolean;  // Trạng thái loading
  err: ApiError | null;  // Trạng thái lỗi (nếu có)
}

export const coursesModule = {
  namespaced: true,
  state: (): CoursesState => ({
    data: [],  // Mảng chứa dữ liệu khóa học
    loading: false,
    err: null,
  }),
  mutations,
  actions,
  getters: {},
};
