import type { ActionContext } from "vuex";
import type { UsersState } from ".";
import { blockUser, fetchUsersWithPagination, getAllUser, searchUsers, sortUsersByName, unBlockUser } from "../../../API/users/getAll";
import { RootState } from "../../store";

export const actions = {
  // Action lấy danh sách người dùng
  async fetchUsers({ commit }: ActionContext<UsersState, RootState>) {
    commit("setLoading", true);
    try {
      const users = await getAllUser();  // Gọi API để lấy danh sách users
      commit("setUsers", users);  // Lưu danh sách vào state
    } catch (error) {
      commit("setErr", error);  // Xử lý lỗi
    } finally {
      commit("setLoading", false);
    }
  },
  async blockUser({ commit }: ActionContext<UsersState, RootState>, userId: number) {
    try {
      const updatedUser = await blockUser(userId);
      commit("updateUser", updatedUser); // Cập nhật state với thông tin người dùng đã khóa
    } catch (error) {
      commit("setErr", error); // Xử lý lỗi
    }
  },

  async unBlockUser({ commit }: ActionContext<UsersState, RootState>, userId: number) {
    try {
      const updatedUser = await unBlockUser(userId);
      commit("updateUser", updatedUser); // Cập nhật state với thông tin người dùng đã mở khóa
    } catch (error) {
      commit("setErr", error); // Xử lý lỗi
    }
  },
  async fetchUsersWithPagination({ commit }: ActionContext<UsersState, RootState>, limit: number, page: number) {
    try {
      const data = await fetchUsersWithPagination(limit, page);
      commit('setUsers', data.users); // Cập nhật state với danh sách người dùng
      commit('setTotalPages', data.totalPages); // Cập nhật tổng số trang nếu cần
    } catch (error) {
      commit('setErr', error); // Xử lý lỗi
    }
  },

  async fetchUsersSortedByName({ commit }: ActionContext<UsersState, RootState>, order: string) {
    try {
      const data = await sortUsersByName(order);
      commit('setUsers', data); // Cập nhật state với danh sách người dùng đã được sắp xếp
    } catch (error) {
      commit('setErr', error); // Xử lý lỗi
    }
  },

  async searchUsers({ commit }: ActionContext<UsersState, RootState>, searchTerm: string) {
    try {
      const data = await searchUsers(searchTerm);
      commit('setUsers', data); // Cập nhật state với danh sách người dùng tìm kiếm được
    } catch (error) {
      commit('setErr', error); // Xử lý lỗi
    }
  },
};

