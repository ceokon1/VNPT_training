<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <div class="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
            <h2 class="text-2xl font-semibold mb-4">Danh sách tài khoản chờ duyệt</h2>
            <table class="min-w-full border border-gray-300">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="py-2 px-4 border">Tên</th>
                        <th class="py-2 px-4 border">Email</th>
                        <th class="py-2 px-4 border">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in pendingUsers" :key="user.id" class="hover:bg-gray-50">
                        <td class="py-2 px-4 border">{{ user.nameAccount }}</td>
                        <td class="py-2 px-4 border">{{ user.email }}</td>
                        <td class="py-2 px-4 border">
                            <button class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                @click="approveUser(user.id)">
                                Duyệt
                            </button>
                        </td>
                    </tr>
                    <tr v-if="pendingUsers.length === 0">
                        <td colspan="3" class="text-center py-4 text-gray-500">Không có tài khoản chờ duyệt</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { db } from "../../utils/firebaseConfig";
import { collection, getDocs, doc, updateDoc, query, where } from "firebase/firestore";
import Swal from "sweetalert2";

const pendingUsers = ref<any[]>([]);

const fetchPendingUsers = async () => {
    const q = query(collection(db, "users"), where("approved", "==", false));
    const snapshot = await getDocs(q);
    pendingUsers.value = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

const approveUser = async (id: string) => {
    try {
        await updateDoc(doc(db, "users", id), { approved: true });
        Swal.fire("Thành công", "Tài khoản đã được duyệt", "success");
        fetchPendingUsers(); // refresh
    } catch (error) {
        console.error(error);
        Swal.fire("Lỗi", "Không thể duyệt tài khoản", "error");
    }
};

onMounted(fetchPendingUsers);
</script>
