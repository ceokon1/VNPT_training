import { db } from "../../utils/firebaseConfig";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  limit as limitDoc,
  startAt,
} from "firebase/firestore";

// Lấy tất cả user
export const getAllUser = async () => {
  try {
    const snapshot = await getDocs(collection(db, "users"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    alert("Lỗi khi lấy danh sách người dùng: " + err);
  }
};

// Khoá tài khoản (lock: false)
export const blockUser = async (id: string) => {
  try {
    await updateDoc(doc(db, "users", id), { lock: false });
    return true;
  } catch (err) {
    alert("Lỗi khi khoá người dùng: " + err);
  }
};

// Mở khoá tài khoản (lock: true)
export const unBlockUser = async (id: string) => {
  try {
    await updateDoc(doc(db, "users", id), { lock: true });
    return true;
  } catch (err) {
    alert("Lỗi khi mở khoá người dùng: " + err);
  }
};

// Sắp xếp theo name (asc / desc)
export const sortUsersByName = async (direction: "asc" | "desc") => {
  try {
    const q = query(collection(db, "users"), orderBy("nameAccount", direction));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    alert("Lỗi khi sắp xếp người dùng: " + err);
  }
};

// Tìm kiếm user theo name (chứa chuỗi)
export const searchUsers = async (searchTerm: string) => {
  try {
    const allUsers = await getAllUser();
    return allUsers?.filter((user: any) =>
      user.nameAccount?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (err) {
    alert("Lỗi khi tìm kiếm: " + err);
  }
};

// Phân trang thủ công (bằng cách cắt từ danh sách)
export const fetchUsersWithPagination = async (limit: number, page: number) => {
  try {
    const allUsers = await getAllUser();
    const start = (page - 1) * limit;
    return allUsers?.slice(start, start + limit);
  } catch (err) {
    alert("Lỗi phân trang: " + err);
  }
};
