<script setup lang="ts">
  import { install, injectGlobal } from '@twind/core'
  import { config, globalCss } from '../twind.config'

  install(config)
  injectGlobal(globalCss)

  useHead({
    htmlAttrs: {
      lang: 'en',
    },
    bodyAttrs: {
      style: 'display: none',
    },
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} : pxl.media : qrayg\'s game room` : 'pxl.media : qrayg\'s game room';
    },
    meta: [
    { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'qrayg\'s game room' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;900&display=swap' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
      { src: 'https://kit.fontawesome.com/a2bf4ed495.js', body: true },
    ],
  })
</script>

<template>
  <div class="min-h-screen flex-(& col)">
    <header>
      <div class="mx-auto container flex items-center relative">
        <nav>
          <ul class="nav-menu flex items-center">
            <li class="nav-home">
              <nuxt-link to="/" aria-label="Home" class="p-4 block text-white opacity-40 motion-safe:transition hover:(opacity-100)" active-class="" exact-active-class="opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" role="img" class="block fill-current">
                  <title>pxl.media</title>
                  <g fill-rule="evenodd">
                    <rect width="8" height="8" x="8" y="8" opacity=".25" />
                    <rect width="8" height="8" y="8" opacity=".5" />
                    <rect width="8" height="8" x="8" opacity=".75" />
                    <rect width="8" height="8" />
                  </g>
                </svg>
              </nuxt-link>
            </li>
            <li class="nav-item" v-for="nav in ['platform', 'genre']" :key="nav">
              <nuxt-link :to="'/'+ nav +'/'"
                class="group p-4 block text-white relative motion-safe:transition hover:(opacity-100)"
                :class="[$route.path.includes(nav +'/') ? 'active opacity-100' : 'opacity-40']"
                active-class=""
                exact-active-class=""
              >
                <i :class="['fa-fw', nav === 'platform' ? 'fa-duotone fa-layer-group' : 'fa-solid fa-hashtag']"></i>
                <span class="sr-only" v-text="nav === 'platform' ? 'Platform' : 'Genre'"></span>
                <b class="px-1 w-full h-px flex justify-center absolute inset-x-0 bottom-1">
                  <b class="w-0 bg-current opacity-0 motion-safe:transition-all group-hover:(w-full opacity-100)"></b>
                </b>
              </nuxt-link>
            </li>
          </ul>
        </nav>
        <search-inline />
      </div>
    </header>
    <main class="pt-8 flex-1">
      <section class="container mx-auto">
        <slot />
      </section>
    </main>
    <footer class="mt-auto">
      <p class="foot-info m-0 pt-4 pb-8 px-4 font-bold text-center text-xs md:text-sm">
        &copy;{{ new Date().getFullYear() }} <a href="https://qrayg.com/" class="mx-2 text-blue-100 hover:(text-blue-500) motion-safe:transition">qrayg</a>
        - Made with
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-2 text-red-500 inline-block" width="16" height="16" viewBox="0 0 16 16" role="img" aria-labelledby="footer-heart"><title id="footer-heart">Love</title><polygon class="fill-current" fill-rule="evenodd" points="8 6 12 2 16 6 8 14 0 6 4 2" /></svg>
        using
        <a href="https://code.visualstudio.com/" class="mx-2 text-blue-100 motion-safe:transition hover:(text-blue-500)">Code</a>
        +
        <a href="https://nuxt.com/" class="mx-2 text-blue-100 motion-safe:transition hover:(text-blue-500)">Nuxt</a>
        and is powered by a responsive layout.
      </p>
    </footer>
    <div class="bg-grid fixed inset-0 z-[-1]"></div>
    <nuxt-loading-indicator color="#60A5FA" />
  </div>
</template>
