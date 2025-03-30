import { db } from "../../utils/firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore";

// Lấy tất cả câu hỏi
export const getAllQuestions = async () => {
  const snap = await getDocs(collection(db, "questions"));
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Lấy câu hỏi theo đề
export const getQuestionsByExam = async (idExam: string | number) => {
  const q = query(collection(db, "questions"), where("idExam", "==", idExam));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// CRUD tương tự như exam.ts nếu bạn cần thêm/sửa/xoá
