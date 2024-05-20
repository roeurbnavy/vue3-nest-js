<template>
  <div class="w-[1020px] h-screen mx-auto py-5 px-2">
    <div class="flex flex-row justify-between mb-5 text-right">
      <div class="text-lg">
        Hello,<span class="font-bold text-orange-500 pl-2">
          {{ currentUser?.username }}</span
        >
      </div>
      <el-button type="danger" @click="logout">Logout</el-button>
    </div>
    <div class="text-2xl underline mb-5 text-center">TO DO LIST</div>

    <div class="flex flex-row items-start">
      <div
        class="w-[350px] max-w-['350px'] my-0 mx-auto bg-slate-100 rounded py-5 px-5"
      >
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-position="left"
        >
          <el-form-item label="New Task" prop="task">
            <el-input v-model="form.task"></el-input>
          </el-form-item>

          <div class="text-right">
            <el-button type="primary" @click="addTodo"> Add </el-button>
          </div>
        </el-form>
      </div>
      <div class="flex-1 ml-[30px] bg-slate-100 rounded pt-2">
        <div class="text-lg text-center leading-loose">My List</div>

        <ul class="border-0 border-t border-gray-200">
          <li
            v-for="item in list"
            :key="item._id"
            class="py-3 px-3 border-0 border-b border-gray-200"
          >
            <div class="flex flex-row">
              <div class="flex-1 text-sm">{{ item.title }}</div>
              <div class="w-[70px] text-center">
                <el-button
                  type="danger"
                  size="small"
                  @click="deleteTodo(item._id)"
                >
                  Delete
                </el-button>
              </div>
            </div>
          </li>
        </ul>

        <div class="mt-6 mb-3 text-center">
          <el-button type="primary" @click="getTodoList"> Refresh </el-button>
        </div>
      </div>
    </div>
    <hr class="mt-2" />
    <Customer />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useAuthStore } from "../stores";
import { ElMessage, FormRules, FormInstance } from "element-plus";
import Customer from "./Customer.vue";

type TodoItem = {
  _id: string;
  title: string;
  userId: string;
};

const router = useRouter();
const authStore = useAuthStore();

const formRef = ref<FormInstance>();
const form = ref<{ task: string }>({
  task: "",
});
const rules = ref<FormRules>({
  task: [{ required: true }],
});

const list = ref<TodoItem[]>([]);
const currentUser = computed(() => {
  return authStore.currentUser;
});

const getTodoList = () => {
  if (!currentUser.value) return;

  axios({
    method: "GET",
    url: `http://127.0.0.1:8080/todo/findByUser`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
      Authorization: `Bearer ${authStore.jwt_token}`,
    },
  })
    .then((response) => {
      if (response.status != 200) {
        ElMessage({ type: "error", message: "Something went wrong!" });
        return;
      }

      list.value = response.data;
    })
    .catch((error) => {
      if (error?.response?.data) {
        ElMessage({ type: "error", message: error.response.data as string });
        return;
      }

      ElMessage({ type: "error", message: error.message || "Get todo error!" });
    });
};
const addTodo = () => {
  formRef.value?.validate((isValid) => {
    if (isValid) {
      if (!currentUser.value) {
        ElMessage({ type: "error", message: "User Id is required!" });
        return;
      }

      axios({
        method: "POST",
        url: "http://127.0.0.1:8080/todo/create",
        data: {
          title: form.value.task,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
          Authorization: `Bearer ${authStore.jwt_token}`,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.status != 201) {
            ElMessage({ type: "error", message: "Something went wrong!" });
            return;
          }

          getTodoList();
          formRef.value?.resetFields();
          ElMessage({ type: "success", message: "Todo insert successfully" });
        })
        .catch((error) => {
          if (error?.response?.data) {
            ElMessage({
              type: "error",
              message: error.response.data as string,
            });
            return;
          }

          ElMessage({
            type: "error",
            message: error.message || "Insert todo error!",
          });
        });
    }
  });
};

const deleteTodo = (_id: string) => {
  axios({
    method: "DELETE",
    url: "http://127.0.0.1:8080/todo/deleteById",
    params: {
      id: _id,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
      Authorization: `Bearer ${authStore.jwt_token}`,
    },
  })
    .then((response) => {
      if (response.status != 200) {
        ElMessage({ type: "error", message: "Something went wrong!" });
        return;
      }

      getTodoList();
    })
    .catch((error) => {
      if (error?.response?.data) {
        ElMessage({ type: "error", message: error.response.data as string });
        return;
      }

      ElMessage({
        type: "error",
        message: error.message || "Remove todo error!",
      });
    });
};

const logout = () => {
  authStore
    .logout()
    .then(() => {
      router.push("/auth");
      ElMessage({ type: "success", message: `You are logged out!` });
    })
    .catch((error) => {
      ElMessage({
        type: "error",
        message: error.message || "Logout error",
      });
    });
};

onMounted(() => {
  authStore
    .setCurrentUser()
    .then(() => {
      getTodoList();
    })
    .catch(() => {
      ElMessage({
        type: "error",
        message: "Access token is expired!",
      });
      authStore.logout();
      router.push("/auth");
    });
});
</script>
