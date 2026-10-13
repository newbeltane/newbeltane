import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  
  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "src/content/blog",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "description", label: "Description" },
          { type: "datetime", name: "pubDate", label: "Publish Date", required: true },
          { type: "string", name: "author", label: "Author" },
          { type: "string", list: true, name: "tags", label: "Tags" },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
        ui: {
          router: ({ document }) => {
            return `/blog/${document._sys.filename.toLowerCase()}/`;
          },
        },
      },
      {
        name: "page",
        label: "Pages",
        path: "src/content/pages",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Title (SEO)", isTitle: true, required: true },
          { type: "string", name: "description", label: "Description (SEO)" },
          { type: "string", name: "headline", label: "Headline (HTML allowed for gradients)" },
          { type: "string", name: "intro", label: "Introductory Text", ui: { component: "textarea" } },
          {
            type: "object",
            name: "pricingTiers",
            label: "Pricing Tiers",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.name }
              }
            },
            fields: [
              { type: "string", name: "name", label: "Tier Name" },
              { type: "string", name: "price", label: "Price" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "features", label: "Features", list: true },
              { type: "string", name: "cta", label: "Button Text" },
              { type: "boolean", name: "highlight", label: "Highlight this tier?" }
            ]
          },
          {
            type: "object",
            name: "adHoc",
            label: "Ad-Hoc Box",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "content", label: "Content (HTML allowed)", ui: { component: "textarea" } }
            ]
          },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "home" || document._sys.filename === "index") {
              return "/";
            }
            return `/${document._sys.filename.toLowerCase()}/`;
          },
        },
      }
    ],
  },
});
