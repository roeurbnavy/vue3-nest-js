<template>
  <div>
    <h1 class="my-2 text-center">Get customer data from POS</h1>
    <el-form :model="form" ref="formRef">
      <el-form-item label="Limit">
        <ElInputNumber
          v-model="form.limit"
          @change="handleLimitChange"
          :controls="false"
        />
      </el-form-item>
    </el-form>

    <el-table :data="data" border stripe v-loading="loading">
      <el-table-column type="index" width="80" label="No" />
      <el-table-column
        v-for="col in columns"
        :prop="col.prop"
        :key="col._id"
        :label="col.label"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import axios from "axios";
import {
  ElMessage,
  ElTable,
  ElTableColumn,
  ElInputNumber,
  ElForm,
  ElFormItem,
} from "element-plus";
import { computed, onMounted, ref } from "vue";
import { useAuthStore } from "../stores";

const authStore = useAuthStore();
const data = ref([]);
const form = ref({ limit: 50 });
const loading = ref(false);

const columns = ref<any>([
  {
    label: "Name",
    prop: "name",
  },
  {
    label: "RefNo",
    prop: "refNo",
  },
  {
    label: "Telephone",
    prop: "telephone",
  },
  {
    label: "Address",
    prop: "address",
  },
]);

const currentUser = computed(() => {
  return authStore.currentUser;
});

const getCustomers = () => {
  loading.value = true;
  data.value = [];
  axios({
    method: "GET",
    url: `http://127.0.0.1:8080/customers/getAll`,
    params: {
      limit: form.value.limit,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
      Authorization: `Bearer ${authStore.jwt_token}`,
    },
  })
    .then((response) => {
      console.log(response);
      if (response.status != 200) {
        ElMessage({ type: "error", message: "Something went wrong!" });
        return;
      }

      data.value = response.data;
      loading.value = false;
    })
    .catch((error) => {
      if (error?.response?.data) {
        ElMessage({ type: "error", message: error.response.data as string });
        return;
      }
      loading.value = false;
      ElMessage({ type: "error", message: error.message || "Get todo error!" });
    });
};

const handleLimitChange = () => {
  if (!form.value.limit) form.value.limit = 50;
  getCustomers();
};

onMounted(() => {
  getCustomers();
});
</script>
