<template>
  <div>
    <div class="container-content-admin">
      <section class="attendance" style="width: 80%;">
        <div class="attendance-list">
          <h1 class="manage-title">Quản lí môn thi</h1>
          <button @click="handleAdd" class="btn-add">Thêm môn học</button>
          <div class="sort-items">
            <h4>Sắp xếp theo:</h4>
            <select @change="handleSort($event.target.value)" style="padding: 6px 16px; background-color: lightgrey; border-radius: 6px;">
              <option value="subDefault">Theo mã môn</option>
              <option value="AZ">A-Z</option>
              <option value="ZA">Z-A</option>
            </select>
            <div class="search-box">
              <input type="text" placeholder="Tìm kiếm môn học" v-model="searchTerm" @input="handleSearch" />
            </div>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>Mã môn</th>
                <th>Môn học</th>
                <th>Chi tiết</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="subject in filteredSubjects" :key="subject.id">
                <td>{{ subject.id }}</td>
                <td>{{ subject.subject }}</td>
                <td>
                  <router-link :to="`/admin/examManager/${subject.id}`">Chi tiết</router-link>
                </td>
                <td>
                  <button @click="handleEdit(subject)" class="btn-edit">Sửa</button>
                  <button @click="handleDelete(subject.id)" class="btn-delete">Xóa</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import { ref as firebaseRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebse";

interface Subject {
  id: string;
  idCourese: number;
  subject: string;
  img?: string;
}

const subjects = ref<Subject[]>([]);
const filteredSubjects = ref<Subject[]>([]);
const searchTerm = ref<string>("");

const route = useRoute()
const courseId = String(route.params.id)

onMounted(() => {
  fetchSubjects();
});

const fetchSubjects = async () => {
  try {
    const response = await fetch("http://localhost:8080/subjectList");
    const data = await response.json();
    subjects.value = data;
    filterSubjects(data, courseId);
  } catch (error) {
    console.error("Error fetching subjects:", error);
  }
};

const filterSubjects = (subjects: Subject[], courseId: string) => {
  const filtered = subjects.filter(
    (subject) => subject.idCourese === parseInt(courseId)
  );
  filteredSubjects.value = filtered;
};

const handleSort = (type: string) => {
  const sortedSubjects = [...filteredSubjects.value];
  if (type === "subSmallBig") {
    sortedSubjects.sort((a, b) => a.id.localeCompare(b.id));
  } else if (type === "subBigSmall") {
    sortedSubjects.sort((a, b) => b.id.localeCompare(a.id));
  } else if (type === "AZ") {
    sortedSubjects.sort((a, b) => a.subject.localeCompare(b.subject));
  } else if (type === "ZA") {
    sortedSubjects.sort((a, b) => b.subject.localeCompare(a.subject));
  }
  filteredSubjects.value = sortedSubjects;
};

const handleSearch = (event: Event) => {
  const term = (event.target as HTMLInputElement).value;
  searchTerm.value = term;
  if (term === "") {
    filterSubjects(subjects.value, courseId);
  } else {
    const searchedSubjects = subjects.value.filter((subject) =>
      subject.subject.toLowerCase().includes(term.toLowerCase())
    );
    filteredSubjects.value = searchedSubjects;
  }
};

const handleDelete = (id: string) => {
  Swal.fire({
    title: "Bạn có chắc chắn muốn xóa?",
    text: "Môn học này sẽ bị xóa vĩnh viễn!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy",
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`http://localhost:8080/subjectList/${id}`)
        .then(() => {
          fetchSubjects();
          Swal.fire("Đã xóa!", "Môn học đã bị xóa.", "success");
        })
        .catch((error) => {
          console.error("Error deleting subject:", error);
          Swal.fire("Lỗi!", "Không thể xóa môn học. Vui lòng thử lại.", "error");
        });
    }
  });
};

const handleAdd = () => {
  Swal.fire({
    title: "Thêm môn học mới",
    html: `
      <input type="text" id="subjectName" class="swal2-input" placeholder="Tên môn học">
      <input type="file" id="subjectImage" class="swal2-input">
    `,
    showCancelButton: true,
    confirmButtonText: "Thêm",
    cancelButtonText: "Hủy",
    preConfirm: () => {
      const subjectNameInput = Swal.getPopup()?.querySelector("#subjectName") as HTMLInputElement;
      const subjectImageInput = Swal.getPopup()?.querySelector("#subjectImage") as HTMLInputElement;
      if (!subjectNameInput?.value) {
        Swal.showValidationMessage("Vui lòng nhập tên môn học");
      }
      const subjectName = subjectNameInput.value;
      const subjectImageFile = subjectImageInput?.files?.[0];
      return { subjectName, subjectImageFile };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const { subjectName, subjectImageFile } = result.value;
      if (subjectImageFile) {
        const storageRef = firebaseRef(storage, `subjects/${subjectImageFile.name}`);
        uploadBytes(storageRef, subjectImageFile).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            const newSubject = {
              idCourese: parseInt(courseId),
              subject: subjectName,
              img: downloadURL,
            };
            axios.post("http://localhost:8080/subjectList", newSubject)
              .then(() => {
                fetchSubjects();
                Swal.fire("Thành công!", "Môn học mới đã được thêm.", "success");
              })
              .catch((error) => {
                console.error("Error adding subject:", error);
                Swal.fire("Lỗi!", "Không thể thêm môn học. Vui lòng thử lại.", "error");
              });
          });
        });
      }
    }
  });
};

const handleEdit = (subject: Subject) => {
  Swal.fire({
    title: "Chỉnh sửa môn học",
    html: `
      <input type="text" id="subjectName" class="swal2-input" value="${subject.subject}">
      <input type="file" id="subjectImage" class="swal2-input">
    `,
    showCancelButton: true,
    confirmButtonText: "Lưu",
    cancelButtonText: "Hủy",
    preConfirm: () => {
      const subjectNameInput = Swal.getPopup()?.querySelector("#subjectName") as HTMLInputElement;
      const subjectImageInput = Swal.getPopup()?.querySelector("#subjectImage") as HTMLInputElement;
      if (!subjectNameInput?.value) {
        Swal.showValidationMessage("Tên môn học không được để trống");
      }
      const newSubjectName = subjectNameInput.value;
      const newSubjectImageFile = subjectImageInput?.files?.[0];
      return { newSubjectName, newSubjectImageFile };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const { newSubjectName, newSubjectImageFile } = result.value;
      if (newSubjectImageFile) {
        const storageRef = firebaseRef(storage, `subjects/${newSubjectImageFile.name}`);
        uploadBytes(storageRef, newSubjectImageFile).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            const updatedSubject = {
              ...subject,
              subject: newSubjectName,
              img: downloadURL,
            };
            axios.put(`http://localhost:8080/subjectList/${subject.id}`, updatedSubject)
              .then(() => {
                fetchSubjects();
                Swal.fire("Thành công!", "Môn học đã được cập nhật.", "success");
              })
              .catch((error) => {
                console.error("Error updating subject:", error);
                Swal.fire("Lỗi!", "Không thể cập nhật môn học. Vui lòng thử lại.", "error");
              });
          });
        });
      } else {
        const updatedSubject = {
          ...subject,
          subject: newSubjectName,
        };
        axios.put(`http://localhost:8080/subjectList/${subject.id}`, updatedSubject)
          .then(() => {
            fetchSubjects();
            Swal.fire("Thành công!", "Môn học đã được cập nhật.", "success");
          })
          .catch((error) => {
            console.error("Error updating subject:", error);
            Swal.fire("Lỗi!", "Không thể cập nhật môn học. Vui lòng thử lại.", "error");
          });
      }
    }
  });
};

</script>

<style scoped>
/*Attendance List serction  */
.attendance {
  margin-top: 20px;
  width: 65%;
}
.attendance-list {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
}

.attendance .attendance-list .manage-title {
  background-color: black;
  color: aliceblue;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
}

.btn-add, .btn-edit, .btn-delete {
  border: none;
  padding: 10px 15px;
  margin: 5px;
  cursor: pointer;
  border-radius: 4px;
}

.btn-add {
  background-color: #28a745;
  color: white;
}

.attendance .attendance-list .sort-items {
  height: 54px;
  background-color: #f5f5f5;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 8px;
}

.table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 15px;
  min-width: 100%;
  overflow: hidden;
  border-radius: 5px 5px 0 0;
}
table thead tr {
  color: #fff;
  background: goldenrod;
  text-align: left;
  font-weight: bold;
}
.table th,
.table td {
  padding: 12px 15px;
}
.table tbody tr {
  border-bottom: 1px solid #ddd;
}
.table tbody tr:nth-of-type(odd) {
  background: #f3f3f3;
}
.table tbody tr.active {
  font-weight: bold;
  color: gold;
}
.table tbody tr:last-of-type {
  border-bottom: 2px solid gold;
}
.table button {
  padding: 6px 20px;
  border-radius: 10px;
  cursor: pointer;
  background: transparent;
  border: 1px solid gold;
}
.table button:hover {
  background: goldenrod;
  color: #fff;
  transition: 0.5rem;
}


.container-content-admin {
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
  position: relative;
}

/* Side menubar section */

.container-content-admin .side-navbar {
  background: #fff;
  padding: 1px;
  display: flex;
  flex-direction: column;
}
.container-content-admin .side-navbar span {
  color: gray;
  margin: 1rem 3rem;
  font-size: 12px;
}
.container-content-admin .side-navbar a {
  width: 100%;
  padding: 0.8rem 3rem;
  font-weight: 500;
  font-size: 15px;
  color: rgb(100, 100, 100);
  text-decoration: none;
}
</style>
