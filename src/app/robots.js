// app/robots.js — Allow AI crawlers for maximum AI search visibility
export default function robots() {
  return {
    rules: [
      // Default rule — allow everything public
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // === AI CRAWLERS — Explicitly allowed for AI search visibility ===
      // ChatGPT / OpenAI
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Google Gemini / Bard
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      // Anthropic / Claude
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      // Perplexity AI
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      // Common Crawl — major AI training data source
      {
        userAgent: "CCBot",
        allow: "/",
      },
      // Meta AI
      {
        userAgent: "FacebookBot",
        allow: "/",
      },
      {
        userAgent: "meta-externalagent",
        allow: "/",
      },
      // Microsoft Copilot (via Bing)
      {
        userAgent: "Bingbot",
        allow: "/",
      },
      // ByteDance / TikTok AI
      {
        userAgent: "Bytespider",
        allow: "/",
      },
      // Apple AI / Siri
      {
        userAgent: "Applebot",
        allow: "/",
      },
      // Cohere AI
      {
        userAgent: "cohere-ai",
        allow: "/",
      },
      // You.com AI
      {
        userAgent: "YouBot",
        allow: "/",
      },
    ],
    sitemap: "https://www.godavaii.com/sitemap.xml",
    host: "https://www.godavaii.com",
  };
}
