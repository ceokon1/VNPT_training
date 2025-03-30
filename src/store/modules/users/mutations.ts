import type { ApiError, UsersState } from ".";

export interface MutationsModuleAType {
  setUsers: (state: UsersState, users: any) => void;
}

export const mutations = {
  // Cập nhật danh sách người dùng vào state
  setUsers(state: UsersState, users: any) {
    state.data = users;
  },
  updateUser(state: UsersState, updatedUser: any) {
    const index = state.data.findIndex((user: any) => user.id === updatedUser.id);
    if (index !== -1) {
      state.data[index] = updatedUser; // Cập nhật thông tin người dùng
    }
  },
  // Cập nhật dữ liệu phân trang
  setPaginationData(state: UsersState, { users, totalPages }: { users: any[]; totalPages: number }) {
    state.data = users; // Cập nhật danh sách người dùng
    state.totalPages = totalPages; // Cập nhật tổng số trang
  },

  // Cập nhật danh sách người dùng đã được sắp xếp
  setSortedUsers(state: UsersState, sortedUsers: any[]) {
    state.data = sortedUsers; // Cập nhật danh sách người dùng đã được sắp xếp
  },

  // Cập nhật danh sách người dùng theo tìm kiếm
  setSearchedUsers(state: UsersState, searchedUsers: any[]) {
    state.data = searchedUsers; // Cập nhật danh sách người dùng tìm kiếm được
  },
  // Cập nhật trạng thái loading
  setLoading(state: UsersState, isLoading: boolean) {
    state.loading = isLoading;
  },
  // Cập nhật lỗi nếu có
  setErr(state: UsersState, err: ApiError | null) {
    state.err = err;
  },
};
