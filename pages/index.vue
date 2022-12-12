<template>
  <div>
TEST
  </div>
</template>

<script setup>
  const { data: homeGamesCount } = await useAsyncData(() => queryContent('games').only(['title']).find());
  const { data: homeGamesPhysicalCount } = await useAsyncData(() => queryContent('games').only(['title']).where({physical: true,}).find());
  const { data: homeGamesDigitalCount } = await useAsyncData(() => queryContent('games').only(['title']).where({digital: true,}).find());
  const { data: homeGamesPendingCount } = await useAsyncData(() => queryContent('games').only(['title']).where({pending: true,}).find());
  const { data: homeSystemsCount } = await useAsyncData(() => queryContent('systems').only(['title']).find());
  const { data: homeSystemsConsoleCount } = await useAsyncData(() => queryContent('systems').only(['title']).where({system_type: { $containsAny: ['console', 'hybrid']}}).find());
  const { data: homeSystemsHandheldCount } = await useAsyncData(() => queryContent('systems').only(['title']).where({system_type: { $containsAny: ['handheld', 'hybrid']}}).find());
  const { data: homeSystemsMiniCount } = await useAsyncData(() => queryContent('systems').only(['title']).where({system_type: { $eq: 'mini'}}).find());
  const { data: homeControllersCount } = await useAsyncData(() => queryContent('controllers').only(['title']).find());
  const { data: homeControllersWirelessCount } = await useAsyncData(() => queryContent('controllers').only(['title']).where({connection: { $containsAny: ['2.4Ghz', 'Bluetooth']}}).find());
  const { data: homeControllersUsbCount } = await useAsyncData(() => queryContent('controllers').only(['title']).where({connection: { $containsAny: ['USB']}}).find());
  const { data: homeControllersAdaptersCount } = await useAsyncData(() => queryContent('controllers').only(['title']).where({variation: { $containsAny: ['Adapter']}}).find());
  const { data: homeGamesPending } = await useAsyncData(() => queryContent('games')
    .sort({ posted: -1 })
    .where({ pending: { $eq: true } })
    .find());
  const { data: homeGamesRecently } = await useAsyncData(() => queryContent('games')
    .sort({ posted: -1 })
    .where({ pending: { $eq: false } })
    .limit(6)
    .find());
</script>