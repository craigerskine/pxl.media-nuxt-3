<template>
  <div class="h-hr mt-8 mb-6 pb-2 px-4 text-(gray-400 sm center) font-bold uppercase flex-(& col) items-center relative md:(text-left items-start)">
    <div class="pb-2 w-full flex-(& wrap) items-center">
      <h1 class="flex-(& wrap) items-center relative">
        <b v-if="subtext" class="mr-2 text-xs opacity-75">{{ subtext }}</b>
        <slot />
        <b v-if="subtext_alt" class="ml-4 mr-2 text-xs opacity-75">{{ subtext_alt }}</b>
        <slot name="alt" />
        <nuxt-link :prefetch="false" v-if="url" :to="url" class="absolute inset-0"></nuxt-link>
      </h1>
      <slot name="nav" />
    </div>
    <b class="py-px w-full max-w-xs bg-current opacity-60"></b>
    <b class="w-full h-px bg-current opacity-30"></b>
  </div>
</template>

<script setup>
  defineProps([
    'url',
    'subtext',
    'subtext_alt'
  ])
</script>