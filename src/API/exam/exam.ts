import { db } from "../../utils/firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Lấy tất cả đề thi
export const getAllExams = async () => {
  const snap = await getDocs(collection(db, "exams"));
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Lấy theo ID
export const getExamById = async (id: string) => {
  const ref = doc(db, "exams", id);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

// Thêm mới
export const addExam = async (data: any) => {
  const ref = await addDoc(collection(db, "exams"), data);
  return { id: ref.id, ...data };
};

// Cập nhật
export const updateExam = async (id: string, data: any) => {
  const ref = doc(db, "exams", id);
  await updateDoc(ref, data);
};

// Xoá
export const deleteExam = async (id: string) => {
  const ref = doc(db, "exams", id);
  await deleteDoc(ref);
};
