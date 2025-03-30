import { db } from "../../utils/firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

// ✅ Lấy tất cả khóa học
export const getAllCourses = async () => {
  try {
    const snapshot = await getDocs(collection(db, "courses"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    alert("Lỗi khi lấy danh sách khóa học: " + err);
    return [];
  }
};

// ✅ Thêm khóa học
export const AddCourses = async (data: any) => {
  try {
    const docRef = await addDoc(collection(db, "courses"), data);
    return { id: docRef.id, ...data };
  } catch (err) {
    alert("Lỗi khi thêm khóa học: " + err);
  }
};

// ✅ Cập nhật toàn bộ khóa học (sai logic gốc → bỏ)
export const updateCourses = async (data: any) => {
  alert("⚠️ Cập nhật toàn bộ không hỗ trợ trong Firestore. Hãy dùng updateCourse(id, data) thay thế.");
};

// ✅ Lấy khóa học theo ID
export const getCourseById = async (id: string) => {
  try {
    const ref = doc(db, "courses", id);
    const snapshot = await getDoc(ref);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    } else {
      alert("Không tìm thấy khóa học");
      return null;
    }
  } catch (err) {
    alert("Lỗi khi lấy khóa học theo ID: " + err);
  }
};

// ✅ Cập nhật khóa học theo ID
export const updateCourse = async (id: string, updatedData: any) => {
  try {
    const ref = doc(db, "courses", id);
    await updateDoc(ref, updatedData);
    return true;
  } catch (err) {
    alert("Lỗi khi cập nhật khóa học: " + err);
  }
};

// ✅ Xoá khóa học
export const deleteCourses = async (id: string) => {
  try {
    const ref = doc(db, "courses", id);
    await deleteDoc(ref);
    return true;
  } catch (err) {
    alert("Lỗi khi xóa khóa học: " + err);
  }
};
