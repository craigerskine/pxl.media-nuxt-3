<template>
  <form @submit.prevent class="ml-auto flex items-center">
    <fieldset class="mr-4 ml-auto w-64 flex justify-end items-center relative z-30">
      <label for="site-search" class="sr-only">Search</label>
      <input v-model="query" type="search" id="site-search" name="keywords" @keyup.esc="searchClose(), $event.target.blur()" placeholder="Search..." class="input-search border(& transparent) p-2 w-8 text-sm bg-transparent text-transparent cursor-pointer outline-none relative appearance-none z-10 opacity-0 motion-safe:transition-all focus:(w-full bg-gray-700 text-white opacity-100)" title="Search" autocomplete="off" />
      <i class="absolute right-0 z-0 fa-light fa-fw fa-lg fa-search opacity-40 motion-safe:transition"></i>
    </fieldset>
    <div v-if="results.length" @click.prevent="searchClose()" class="bg(gray-900 opacity-60) backdrop-blur-sm fixed inset-0 z-20"></div>
    <transition name="page">
      <div v-if="results.length" class="w-[40rem] max-w-full max-h-[75vh] bg(gray-800) overflow-y-scroll absolute right-0 top-full z-50 ring(1 black opacity-30) shadow-2xl lg:(mx-4)">
        <heading :subtext="results.length">Games</heading>
        <ul class="list-game flex(& wrap)">
          <game v-for="result in results"
            :key="$slug(result.title)"
            :title="result.title"
            :slug="$slug(result.title)"
            :note="result.note"
            :platform="result.platform"
            :genre="result.genre"
            :physical="result.physical"
            :digital="result.digital"
            :guide="result.guide"
            :pending="result.pending"
            :posted="result.posted"
          />
        </ul>
      </div>
    </transition>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        query: '',
        results: [],
      }
    },
    methods: {
      searchClose: function() {
        this.query = '';
        this.results = [];
      },
    },
    watch: {
      async query(query) {
        if(!query) {
          this.results = []
          return
        } else {
          this.results = await queryContent('games')
            .where({ _path: { $contains: query.toString()
              .toLowerCase()
              .trim()
              .replace(/\&+/g, ' and ')    // &
              .replace(/\s+/g, '-')        // space to -
              .normalize('NFKD')           // unicode normalization
              .replace(/[^\w\-]+/g, '_')   // remove other crazy chars
              .replace(/\-\-+/g, '-')      // multiple - to single -
              .replace(/^-+/, '')          // remove - from start
              .replace(/-+$/, '') } })
            .sort({ title: -1 })
            .limit(96)
            .find();
        }
      }
    },
  }
</script>