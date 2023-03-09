import { defineConfig } from '@twind/core'
import presetAutoprefix from '@twind/preset-autoprefix'
import presetTailwind from '@twind/preset-tailwind'

const config = defineConfig({
  presets: [presetAutoprefix(), presetTailwind()],
  darkMode: 'class',
  hash: false,
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '960px',
    },
    extend: {
      colors: ({ theme }) => ({
        gray: theme('colors.neutral'),
      }),
      fontFamily: ({ theme }) => ({
        sans: `Roboto,${theme('fontFamily.sans')}`,
      }),
    },
  },
  rules: [
    [ 'box', 'bg-(white opacity-[.05])' ],
    [ 'bg-grid', { 'background-image': 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 4 4\' width=\'4\' height=\'4\'><rect x=\'0\' y=\'0\' width=\'2\' height=\'2\' fill=\'rgba(5,5,5,.33)\'></rect></svg>")', } ],
    [ 'bg-close', { 'background-image': 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 10 10\' width=\'10\' height=\'10\'><g fill=\'rgba(255,255,255,.66)\' fill-rule=\'evenodd\'><polygon points=\'8 0 10 2 7 5 10 8 8 10 5 7 2 10 0 8 3 5 0 2 2 0 5 3\'></polygon></g></svg>")', } ],
  ],
});

const globalCss = {
  // global
  'html': { '@apply': 'bg-gray-900' },
  'body': { '@apply': 'text-(gray-400 sm) font-sans !block' },
  '.nav-menu .active b > b': { '@apply': 'w-full opacity-100' },
  '.input-search:hover + i': { '@apply': 'opacity-100', },
  '.input-search::-webkit-search-cancel-button': { '@apply': 'hidden', },
  // page transitions
  '.page-enter-active,.page-leave-active': { '@apply': 'motion-safe:(transition)', },
  '.page-enter,.page-leave-to': { '@apply': 'transform translate-y-3 opacity-0', },
};

export { config, globalCss };