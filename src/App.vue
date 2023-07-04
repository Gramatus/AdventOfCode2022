<script setup lang="ts">
import SomeComponent from "./SomeComponent.vue";
const props = defineProps<{
  msg: string;
}>();
console.log(props.msg);
</script>

<template>
  <div class="block hidden text-lime-50">
    <h1>App</h1>
    <router-view />
    <SomeComponent />
  </div>
</template>
