import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "kanary159357.github.io",
  markdown: {
    remarkPlugins: [
      [
        remarkShakuCodeAnnotate,
        {
          themes: ["github-light", "github-dark"],
        },
      ],
    ],
  },
  integrations: [mdx(), sitemap(), tailwind()],
});
