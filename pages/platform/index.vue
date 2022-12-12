<template>
  <div>
    <heading>Games by platform</heading>
    <ul class="container mx-auto flex flex-wrap justify-center">
      <content-query path="/_platform/" :sort="{ order: 1, $numeric: true }" v-slot="{ data }">
        <category v-for="platform in data"
          :key="platform.slug"
          :svg_title="platform.title"
          :url="'/platform/'+ platform.slug +'/'"
          :fg_img="platform.logo"
          :subtext="gamesFiltered(platform.slug).length +' <b class=\'font-normal uppercase\'>Games</b> <i class=\'fa-solid fa-fw fa-slash-forward text-[8px] inline-block opacity-50\' aria-hidden=\'true\'></i> '+ systemsFiltered(platform.slug).length +' <b class=\'font-normal uppercase\'>Systems</b>'"
        />
      </content-query>
      <category
        url="/platform/mini/"
        fg_ico="fa-thin fa-fw text-5xl fa-compress-arrows-alt"
        :subtext="systemsMinis.length +' <b class=\'font-normal uppercase\'>Systems</b>'"
      />
    </ul>
  </div>
</template>

<script setup>
  const games = await queryContent('games').only(['platform']).find();
  const systems = await queryContent('systems').where({ system_type: { $ne: 'mini' } }).only(['platform']).find();
  const systemsMinis = await queryContent('systems').where({ system_type: { $eq: 'mini' } }).only(['title']).find();

  function gamesFiltered(platform) {
    return games.filter((item) => item.platform === platform)
  };

  function systemsFiltered(platform) {
    return systems.filter((item) => item.platform === platform)
  };

  useHead({
    title: 'Platforms'
  });
</script>