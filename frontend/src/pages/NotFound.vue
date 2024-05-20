<template>
  <h1 @click="goHome">Not Found</h1>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>
