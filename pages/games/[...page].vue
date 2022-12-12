<template>
  <div>
    <heading :subtext="games.length">
      Games
      <template v-slot:nav>
        <pagination v-if="games.length > pagePer" class="ml-auto" paginatePath="/games/" :paginateTotal="games.length" />
      </template>
    </heading>
    <ul class="list-game pb-4 flex flex-wrap">
      <content-query path="/games/" :sort="{ title: 1 }" :limit="pagePer" :skip="pageSkip()" v-slot="{ data }">
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
      </content-query>
    </ul>
    <pagination v-if="games.length > pagePer" class="pb-10" paginatePath="/games/" :paginateTotal="games.length" />
  </div>
</template>

<script setup>
  const route = useRoute();
  const { data: games } = await useAsyncData(() => queryContent('games').sort({ title: 1, $numeric: true }).find());

  // pagination
  const pageCurrent = parseInt(`${route.params.page[1]}`);
  const pagePer = 24;
  const pageLast = Math.ceil(this.games.length / pagePer);
  const pageLastCount = this.games.length % pagePer === 0 ? pagePer : this.games.length % pagePer;
  const pageSkip = () => {
    if (pageCurrent === 1) {return 0;}
    if (pageCurrent === pageLast) { return this.games.length - pageLastCount; }
    return (pageCurrent - 1) * pagePer;
  };

  useHead({
    title: 'All Games'
  });
</script>