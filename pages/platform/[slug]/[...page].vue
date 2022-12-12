<template>
  <div>
    <mast
      :key="`${platform.slug}`"
      :logo="`${platform.logo}`"
      :title="`${platform.title}`"
    />
    <heading :subtext="games.length" :subtext_alt="systems.length">
      Games
      <template v-slot:alt>Systems</template>
      <template v-slot:nav>
        <pagination v-if="games.length > pagePer" class="ml-auto" :paginatePath="'/platform/'+ $route.params.slug +'/'" :paginateTotal="games.length" />
      </template>
    </heading>
    <ul class="list-game pb-4 flex flex-wrap">
      <content-query path="/games/" :where="{ platform: { $contains: $route.params.slug } }" :sort="{ title: 1, $numeric: true }" :limit="pagePer" :skip="pageSkip()" v-slot="{ data }">
        <game v-for="game of data"
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
      </content-query>
    </ul>
    <pagination v-if="games.length > pagePer" class="pb-10" :paginatePath="'/platform/'+ $route.params.slug +'/'" :paginateTotal="games.length" />
  </div>
</template>

<script setup>
  const route = useRoute();
  const games = await queryContent('games').where({ 'platform': { $contains: `${route.params.slug}` } }).only(['title']).find();
  const platform = await queryContent('_platform').where({ 'slug': { $eq: `${route.params.slug}` } }).findOne();
  const systems = await queryContent('systems').where({ 'platform': { $eq: `${route.params.slug}` } }).only(['title']).find();

  // pagination
  const pageCurrent = parseInt(`${route.params.page[1]}`);
  const pagePer = 24;
  const pageLast = Math.ceil(games.length / pagePer);
  const pageLastCount = games.length % pagePer === 0 ? pagePer : games.length % pagePer;
  const pageSkip = () => {
    if (pageCurrent === 1) {return 0;}
    if (pageCurrent === pageLast) { return games.length - pageLastCount; }
    return (pageCurrent - 1) * pagePer;
  };

  useHead({
    title: `${platform.title} Games`,
  });
</script>