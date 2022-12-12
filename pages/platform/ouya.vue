<template>
  <div>
    <mast
      :key="platform.slug"
      :title="platform.title"
      :logo="platform.logo"
    />
    <heading :subtext="systems.length">
      Systems owned
    </heading>
    <ul class="container mx-auto flex flex-wrap">
      <category v-for="system in systems"
        :key="$slug(system.title)"
        :bg_img="'/assets/img/systems/ouya-'+ $slug(system.title) +'.png'"
        :title="system.title"
        :subtext="system.variation + system.accessories"
      />
    </ul>
  </div>
</template>

<script setup>
  const platform = await queryContent('_platform').where({ slug: { $eq: 'ouya' } }).findOne();
  const systems = await queryContent('systems').where({ platform: { $eq: 'ouya' } }).sort({ title: 1, $numeric: true }).find();

  useHead({
    title: 'OUYA',
  });
</script>