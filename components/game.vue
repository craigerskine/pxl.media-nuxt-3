<template>
  <li class="game mx-auto lg:mx-0 mb-8 px-4 w-full max-w-xs flex relative hover:z-20">
    <div :class="['box w-full flex flex-wrap relative shadow-xl', { 'ring-2 ring-red-500': pending }]">
      <figure class="cover w-full h-16 bg-black/80 flex relative">
        <figcaption class="w-full bg-(cover center) backdrop-opacity-50" :style="'background-image: url(\'/assets/img/games/'+ slug +'.jpg\')'"></figcaption>
        <content-query :path="'/_platform/'+ platform" v-slot="{ data }">
          <figure v-for="item of data" :key="item.title" class="group w-1/2 p-2 flex items-end justify-end absolute inset-y-0 right-0">
            <figcaption class="bg-gradient-to-l from-[#111] via-[#111] to-transparent block absolute inset-0 opacity-90"></figcaption>
            <nuxt-link :to="'/platform/'+ platform +'/'" class="text-gray-200/50 block relative motion-safe:transition-all hover:(text-white opacity-100)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" role="img" class="w-[80px] h-auto fill-current">
                <title>{{ item.title }}</title>
                <g v-html="item.logo"></g>
              </svg>
            </nuxt-link>
          </figure>
        </content-query>
      </figure>
      <b class="h-px bg-white opacity-10 absolute top-0 inset-x-0" aria-hidden="true"></b>
      <div class="details w-full flex">
        <div class="meta p-3 pb-0 w-full min-w-0 flex-1 flex flex-col justify-between motion-safe:transition-all">
          <div class="mast mb-2">
            <b class="name text-(white base) font-black block truncate" :title="title">{{ title }}</b>
            <p>
              <i class="w-full min-w-0 text-gray-400 text-xs block truncate flex-1" :title="note">{{ note }}&nbsp;</i>
            </p>
          </div>
          <ul class="py-2 border-(t dashed gray-500/30) w-full text-base flex items-center">
            <li class="flex-1">
              <ul class="tags flex space-x-4">
                <li v-for="g in genre" :key="g">
                  <content-query :path="('/_genre/'+ g)" v-slot="{ data }">
                    <nuxt-link v-for="item of data" :key="item.slug" :to="'/genre/'+ item.slug +'/'" class="group relative motion-safe:transition hover:(text-white)" :title="g.title">
                      <i :class="['fa-light fa-fw', 'fa-'+ item.icon]"></i>
                      <b class="py-1 px-2 bg-black text-(gray-400 xs) whitespace-nowrap absolute bottom-full left-1/2 invisible opacity-[.0001] rounded transform translate-y-1 -translate-x-1/2 shadow-lg motion-safe:transition-all group-hover:(visible opacity-100 -translate-y-1) group-focus:(visible opacity-100 -translate-y-1)">
                        {{ item.title }}
                      </b>
                    </nuxt-link>
                  </content-query>
                </li>
              </ul>
            </li>
            <li class="ml-auto">
              <ul class="icons flex space-x-2">
                <template v-for="i in 3">
                  <li :key="i" v-if="(i === 1 && physical) || (i === 2 && digital) || (i === 3 && guide)" class="group flex items-center justify-center relative" tabindex="0">
                    <i :class="['fa-fw m-auto opacity-50', i === 1 ? 'fa-light fa-microchip' : (i === 2) ? 'fa-light fa-qrcode' : 'fa-light fa-map']"></i>
                    <b class="py-1 px-2 bg-black text-(gray-400 xs) whitespace-nowrap absolute bottom-full left-1/2 invisible opacity-[.0001] rounded transform translate-y-1 -translate-x-1/2 shadow-lg motion-safe:transition-all group-hover:(visible opacity-100 -translate-y-1) group-focus:(visible opacity-100 -translate-y-1)"
                      v-text="i === 1 ? 'Physical' : (i === 2) ? 'Digital' : 'Guide'"
                    ></b>
                  </li>
                </template>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <nuxt-link v-if="pending" to="/games/pending/" class="w-2 h-2 text-red-500 bg-current cursor-pointer absolute -top-1 -right-1" title="Pending: Pre-Ordered">
        <i class="ring-2 ring-current absolute inset-0 z-10 animate-ping"></i>
      </nuxt-link>
    </div>
  </li>
</template>

<script setup>
  defineProps([
    'title',
    'slug',
    'note',
    'platform',
    'genre',
    'physical',
    'digital',
    'guide',
    'pending',
    'posted',
  ]);
</script>