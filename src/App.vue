<script setup lang="ts">
import { onMounted } from "vue";
import type { RootState } from "./store/store";
import { useStore } from "vuex";


const store = useStore<RootState>();
</script>

<template>
  <div>
    <router-view/>
  </div>
</template>
