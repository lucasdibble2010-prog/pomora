// Cloudflare Worker — Notion API proxy for Pomora
// Deploy for free: npx wrangler deploy notion-proxy-worker.js --name pomora-notion
// Then paste your worker URL (e.g. https://pomora-notion.yourname.workers.dev)
// into the Proxy URL field in Pomora's Sync settings.

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response("POST only", { status: 405 });
    }

    const { endpoint, token, body } = await request.json();

    if (!endpoint || !token || !endpoint.startsWith("/v1/")) {
      return new Response("Invalid request", { status: 400 });
    }

    const notionResp = await fetch("https://api.notion.com" + endpoint, {
      method: body ? "POST" : "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await notionResp.text();

    return new Response(data, {
      status: notionResp.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
};
