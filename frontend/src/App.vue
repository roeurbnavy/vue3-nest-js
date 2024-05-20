<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" >
      <p>Some slotted content</p>
    </component>
  </router-view>
</template>
<script setup lang="ts"></script>
