<template>
  <NuxtLayout>
    <h1 class="m-auto py-8 px-4 text-gray-500 text-[calc(4vw+4vh)] leading-none font-bold text-center md:(py-32)">
      <template v-if="error.statusCode === 404">404</template>
      <template v-else>oops</template>
      <small class="text-lg block opacity-80 md:(text-2xl)">↑ ↑ ↓ ↓ ← → ← → B A</small>
    </h1>
  </NuxtLayout>
</template>

<script setup>
  useHead({
    title: '404',
  });

  defineProps([
    'error',
  ]);
</script>