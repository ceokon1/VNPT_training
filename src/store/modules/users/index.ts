import { mutations, type MutationsModuleAType } from "./mutations";
import { actions } from "./actions";

export interface UsersState {
  data: any[];  // Dữ liệu người dùng
  totalPages: number;
  loading: boolean;  // Trạng thái loading
  err: ApiError | null;  // Trạng thái lỗi (nếu có)
}

// Định nghĩa kiểu lỗi
export interface ApiError {
  message: string;
  code?: number;
}

export const usersModule = {
  namespaced: true,
  state: (): UsersState => ({
    data: [],  // Mảng chứa dữ liệu người dùng
    totalPages: 1,
    loading: false,
    err: null,
  }),
  mutations: mutations,
  actions: actions,
  getters: {},
};
