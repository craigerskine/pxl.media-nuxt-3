<template>
  <div>
    <heading :subtext="games.length">Pending games</heading>
    <ul class="list-game pb-4 flex flex-wrap">
      <game v-for="game in games"
        :key="$slug(game.title)"
        :title="game.title"
        :slug="$slug(game.title)"
        :note="game.note"
        :platform="game.platform"
        :genre="game.genre"
        :physical="game.physical"
        :digital="game.digital"
        :guide="game.guide"
        :pending="game.pending"
        :posted="game.posted"
      />
    </ul>
  </div>
</template>

<script setup>
  const { data: games } = await useAsyncData(() => queryContent('games').where({ pending: true }).sort({ posted: -1 }).find());

  useHead({
    title: 'Pending / Pre-Ordered Games'
  });
</script>