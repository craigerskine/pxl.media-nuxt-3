<template>
  <div>
    <ul class="lg:(flex justify-center space-x-8)">
      <li class="stat mx-auto py-1 w-full max-w-sm lg:(my-10 max-w-none)">
        <mast
          url="/games/"
          label="Games"
          :data_1="homeGamesPhysicalCount.length"
          data_1_label="Physical"
          :data_2="homeGamesDigitalCount.length"
          data_2_label="Digital"
          :data_3="homeGamesPendingCount.length"
          data_3_label="Pending"
          hr="true"
          home="true">{{ homeGamesCount.length.toLocaleString() }}</mast>
      </li>
      <li class="stat mx-auto py-1 w-full max-w-sm lg:(my-10 max-w-none)">
        <mast
          url="/systems/"
          label="Systems"
          :data_1="homeSystemsConsoleCount.length"
          data_1_label="Consoles"
          :data_2="homeSystemsHandheldCount.length"
          data_2_label="Handhelds"
          :data_3="homeSystemsMiniCount.length"
          data_3_label="Mini/Classic"
          hr="true"
          home="true">{{ homeSystemsCount.length.toLocaleString() }}</mast>
      </li>
      <li class="stat mx-auto py-1 w-full max-w-sm lg:(my-10 max-w-none)">
        <mast
          url="/controllers/"
          label="Controllers"
          :data_1="homeControllersWirelessCount.length"
          data_1_label="Wireless"
          :data_2="homeControllersUsbCount.length"
          data_2_label="USB"
          :data_3="homeControllersAdaptersCount.length"
          data_3_label="Adapters"
          hr="true"
          home="true">{{ homeControllersCount.length.toLocaleString() }}</mast>
      </li>
    </ul>
    <heading>Recently Added</heading>
    <ul class="list-game pb-4 flex flex-wrap">
      <game v-for="game in homeGamesRecently"
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
    <heading :subtext="homeGamesPending.length" :url="homeGamesPending.length > 6 ? '/games/pending/' : '/'">Pending</heading>
    <ul class="list-game pb-4 flex flex-wrap">
      <template v-for="(game, index) in homeGamesPending">
        <game v-if="index <= 5"
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
      </template>
    </ul>
  </div>
</template>

<script setup>
  const { data: homeGamesCount } = await useAsyncData(() => { 
    return queryContent('games').only(['title']).find()
  });
  const { data: homeGamesPhysicalCount } = await useAsyncData(() => { 
    return queryContent('games').only(['title']).where({physical: true,}).find()
  });
  const { data: homeGamesDigitalCount } = await useAsyncData(() => { 
    return queryContent('games').only(['title']).where({digital: true,}).find()
  });
  const { data: homeGamesPendingCount } = await useAsyncData(() => { 
    return queryContent('games').only(['title']).where({pending: true,}).find()
  });
  const { data: homeSystemsCount } = await useAsyncData(() => { 
    return queryContent('systems').only(['title']).find()
  });
  const { data: homeSystemsConsoleCount } = await useAsyncData(() => { 
    return queryContent('systems').only(['title']).where({system_type: { $containsAny: ['console', 'hybrid']}}).find()
  });
  const { data: homeSystemsHandheldCount } = await useAsyncData(() => { 
    return queryContent('systems').only(['title']).where({system_type: { $containsAny: ['handheld', 'hybrid']}}).find()
  });
  const { data: homeSystemsMiniCount } = await useAsyncData(() => { 
    return queryContent('systems').only(['title']).where({system_type: { $eq: 'mini'}}).find()
  });
  const { data: homeControllersCount } = await useAsyncData(() => { 
    return queryContent('controllers').only(['title']).find()
  });
  const { data: homeControllersWirelessCount } = await useAsyncData(() => { 
    return queryContent('controllers').only(['title']).where({connection: { $containsAny: ['2.4Ghz', 'Bluetooth']}}).find()
  });
  const { data: homeControllersUsbCount } = await useAsyncData(() => { 
    return queryContent('controllers').only(['title']).where({connection: { $containsAny: ['USB']}}).find()
  });
  const { data: homeControllersAdaptersCount } = await useAsyncData(() => { 
    return queryContent('controllers').only(['title']).where({variation: { $containsAny: ['Adapter']}}).find()
  });
  const { data: homeGamesPending } = await useAsyncData(() => { 
    return queryContent('games')
    .sort({ posted: -1 })
    .where({ pending: { $eq: true } })
    .find()
  });
  const { data: homeGamesRecently } = await useAsyncData(() => { 
    return queryContent('games')
    .sort({ posted: -1 })
    .where({ pending: { $eq: false } })
    .limit(6)
    .find()
  });
</script>