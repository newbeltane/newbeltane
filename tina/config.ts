import { defineConfig } from "tinacms";

const branch =
  process.env.CF_PAGES_BRANCH ||
  process.env.GITHUB_BRANCH ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "aa1218f1-f53a-45fa-9303-b77d7a8b10c8",
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
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
          { type: "datetime", name: "pubDate", label: "Publish Date" },
          { type: "image", name: "heroImage", label: "Hero Image" },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },
      {
        name: "page",
        label: "Site Pages",
        path: "src/content/pages",
        format: "md",
        templates: [
          {
            name: "home",
            label: "Home",
            fields: [
              { type: "string", name: "title", label: "Title (SEO)" },
              { type: "string", name: "description", label: "Description (SEO)" },
              { type: "string", name: "headline", label: "Headline" },
              { type: "string", name: "subheadline", label: "Subheadline", ui: { component: "textarea" } },
              { type: "rich-text", name: "body", label: "Body", isBody: true },
            ],
          },
          {
            name: "pricing",
            label: "Pricing",
            fields: [
              { type: "string", name: "title", label: "Title (SEO)" },
              { type: "string", name: "description", label: "Description (SEO)" },
              { type: "string", name: "headline", label: "Headline (HTML allowed)" },
              { type: "string", name: "intro", label: "Introductory Text", ui: { component: "textarea" } },
              {
                type: "object",
                name: "pricingTiers",
                label: "Pricing Tiers",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.name || "Pricing Tier" }) },
                fields: [
                  { type: "string", name: "name", label: "Tier Name" },
                  { type: "string", name: "price", label: "Price" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  { type: "string", name: "features", label: "Features", list: true },
                  { type: "boolean", name: "highlight", label: "Highlight Tier" },
                  { type: "string", name: "cta", label: "Button Text" },
                ],
              },
              {
                type: "object",
                name: "adHoc",
                label: "Ad-Hoc / Custom Work Block",
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "content", label: "Content (HTML allowed)", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            name: "about",
            label: "About Page",
            fields: [
              { type: "string", name: "seoTitle", label: "Title (SEO)" },
              { type: "string", name: "seoDescription", label: "Description (SEO)" },
              { type: "string", name: "eyebrow", label: "Hero Eyebrow Text" },
              { type: "string", name: "heroTitle", label: "Hero Title (HTML allowed for gradients)" },
              { type: "string", name: "heroLead1", label: "Hero Paragraph 1", ui: { component: "textarea" } },
              { type: "string", name: "heroLead2", label: "Hero Paragraph 2 (HTML allowed for bold)", ui: { component: "textarea" } },
              { type: "image", name: "avatarImage", label: "Avatar Image" },
              { type: "string", name: "avatarName", label: "Avatar Name" },
              { type: "string", name: "avatarRole", label: "Avatar Role" },
              { type: "string", name: "techStack", label: "Tech Stack List", list: true },
              {
                type: "object",
                name: "values",
                label: "Core Values",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.title || "Value" }) },
                fields: [
                  { type: "string", name: "title", label: "Value Title" },
                  { type: "string", name: "body", label: "Value Description", ui: { component: "textarea" } }
                ]
              },
              { type: "string", name: "ctaHeadline", label: "CTA Headline" },
              { type: "string", name: "ctaSubtext", label: "CTA Subtext" }
            ],
          },
        ],
      },
    ],
  },
});
