<template>
  <div>
    <heading>Games by genre</heading>
    <ul class="container mx-auto flex flex-wrap justify-center">
      <content-query path="/_genre/" :sort="{ title: 1, $numeric: true }" v-slot="{ data }">
        <category v-for="genre in data"
          :key="genre.slug"
          :title="genre.title"
          :url="'/genre/'+ genre.slug +'/'"
          :fg_ico="'text-5xl fa-thin fa-fw fa-'+ genre.icon"
          :subtext="gamesFiltered(genre.slug).length +' <b class=\'font-normal uppercase\'>Games</b>'"
        />
      </content-query>
    </ul>
  </div>
</template>

<script setup>
  const games = await queryContent('games').only(['genre']).find();

  function gamesFiltered(genre) {
    return games.filter((item) => item.genre.includes(genre))
  };

  useHead({
    title: 'Genres'
  });
</script>