<template>
  <div>
    <content-query path="/games/" :sort="{ title: 1, $numeric: true }" :where="{ _file: { $contains: $route.params.search } }" :limit="pagePer" :skip="pageSkip()" v-slot="{ data }">
      <heading :subtext="games.length">
        <b class="mr-2" v-text="query"></b> <b>Games</b>
        <template v-slot:nav>
          <pagination v-if="games.length > pagePer" class="ml-auto" :paginatePath="'/search/'+ query +'/'" :paginateTotal="games.length" />
        </template>
      </heading>
      <template v-if="data.length">
        <ul class="list-game flex-(& wrap)">
          <game v-for="game in data"
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
        <pagination v-if="games.length > pagePer" class="pb-10" :paginatePath="'/search/'+ query +'/'" :paginateTotal="games.length" />
      </template>
      <template v-else>
        <h2 class="m-auto py-10 px-4 text-(gray-500 base center) leading-none font-bold uppercase md:(text-[calc(2vw)])">No results</h2>
      </template>
    </content-query>
  </div>
</template>

<script setup>
  const route = useRoute();
  const query = `${route.params.search}`.toString();
  const games = await queryContent('games').where({ _path: { $contains: `${route.params.search}` } }).only(['title']).find();

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
    title: query.split(' ').map(function(word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ') +' Games',
  });
</script>