import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { remarkShakuCodeAnnotate } from "remark-shaku-code-annotate";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://kanary159357.github.io",
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
