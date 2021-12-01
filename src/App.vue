<template>
  <x-application>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </x-application>
</template>

<script setup lang="ts">
  import { XApplication } from '@/components/x-application'
</script>
