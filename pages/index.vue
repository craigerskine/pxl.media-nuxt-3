<template>
  <div>
    <textarea class="w-full h-64 bg-(white opacity-5) font-mono">
      {{ homeGamesCount }}
    </textarea>
  </div>
</template>

<script setup>
  const { data: homeGamesCount } = await useAsyncData(() => { 
    return queryContent('games').only(['posted']).find()
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