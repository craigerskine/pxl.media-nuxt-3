<template>
  <div>
    <mast
      title="Mini"
      label="Mini / Classic"
      ico="compress-arrows-alt"
    />
    <heading :subtext="systems.length">
      Systems owned
    </heading>
    <ul class="container mx-auto flex flex-wrap">
      <category v-for="system in systems"
        :key="$slug(system.title)"
        :bg_img="'/assets/img/systems/mini-'+ $slug(system.title) +'.png'"
        :title="system.title"
        :subtext="system.variation + system.accessories"
      />
    </ul>
  </div>
</template>

<script setup>
  const systems = await queryContent('systems').where({ system_type: { $eq: 'mini' } }).sort({ title: 1, $numeric: true }).find();

  useHead({
    title: 'Mini Systems',
  });
</script>