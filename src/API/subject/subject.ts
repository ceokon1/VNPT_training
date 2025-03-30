// services/subjectAPI.ts
import { db } from "../../utils/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

// Lấy tất cả subject
export const getAllSubject = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "subjectList"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    alert(err);
    return [];
  }
};

// Thêm mới subject
export const addSubjectToBackend = async (newSubject: any) => {
  try {
    const docRef = await addDoc(collection(db, "subjectList"), newSubject);
    return { id: docRef.id, ...newSubject };
  } catch (err) {
    alert(err);
  }
};

// Cập nhật subject
export const editSubjectInBackend = async (updatedSubject: any) => {
  try {
    const docRef = doc(db, "subjectList", updatedSubject.id);
    await updateDoc(docRef, updatedSubject);
    return updatedSubject;
  } catch (err) {
    alert(err);
  }
};
