# 📍 LocalForge MCP — Autonomous Local SEO & Google Maps Domination

[![MCP](https://img.shields.io/badge/MCP-Server-blue)](https://modelcontextprotocol.io)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-orange)](https://workers.cloudflare.com)
[![Smithery](https://img.shields.io/badge/Smithery-100%2F100-brightgreen)](https://smithery.ai)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**Your business is invisible on Google Maps — and your competitors own the Map Pack.** Local businesses pay agencies **$300–1,500/month** for exactly this playbook: winning the 3-pack, engineering the Google Business Profile, building review velocity honestly, and turning "near me" searches into ringing phones. LocalForge puts the entire discipline inside your AI agent.

**LocalForge** is a 5-tool MCP server covering the full local-search battle: Map Pack diagnosis (proximity · relevance · prominence), Google Business Profile engineering, ethical review & reputation engines, citations/landing pages/local links/GeoGrid tracking, and the conversion layer that turns visibility into booked customers.

🔗 **Live endpoint:** `https://localforge-api.agentweb-hub.workers.dev/mcp`
🏠 **Full 52-server catalog:** [MCP Hub](https://mcp-hub.agentweb-hub.workers.dev)

---

## 🛠️ Tools

| Tool | What it does |
|------|--------------|
| `local.architect` | **Master 1-shot engine** — Map Pack decoder (proximity/relevance/prominence), visibility-stage diagnosis, storefront vs service-area vs appointment playbooks & the 90-day domination roadmap |
| `local.business_profile` | Primary/secondary category strategy, services & attributes architecture, photo/Posts/Q&A engines & the suspension prevention + reinstatement playbook |
| `local.reviews` | **100% ethical** review generation (timing, scripts, friction-kill), reader-first response systems, rating-recovery math & competitive reputation-gap analysis — no fake reviews, no gating, ever |
| `local.rankings` | Citation/NAP systems (aggregator-first, no 300-directory snake oil), local landing pages with schema that rank without doorway spam, the local link engine & GeoGrid rank tracking |
| `local.conversion` | Missed-call text-back, booking ubiquity, the above-the-fold local page formula, LSA/PMax ads honesty & the measurement spine (UTM, NAP-safe call tracking, real KPIs) |

---

## ⚡ Quick Start

Add to your MCP client (Cursor, Claude Code, Windsurf, or any MCP-compatible agent):

```json
{
  "mcpServers": {
    "localforge": {
      "url": "https://localforge-api.agentweb-hub.workers.dev/mcp"
    }
  }
}
```

Then ask your agent things like:

- *"My dental clinic is invisible on Google Maps in Austin — build the battle plan"*
- *"Engineer the perfect Google Business Profile for my plumbing company"*
- *"Design an ethical review system to go from 4.1 to 4.6 stars"*
- *"Which citations actually matter for a restaurant, and how do I clean up my NAP?"*

---

## 🔴 NEW in v1.1 — Live Tool: `local.audit_schema_live`

Fetches any business website live and audits REAL local-SEO signals: LocalBusiness JSON-LD field by field, NAP presence, tel: links, Maps embeds, and prioritized local ranking fixes.

No API key needed — works out of the box.

## 💰 Pricing

**Start free — 10 requests/day, no signup, no card.**

| Tier | Price | What you get |
|------|-------|--------------|
| **Freemium** | $0 | 10 requests/day, all 5 tools |
| **Single Tool Pro** | $7.99 lifetime | Unlimited LocalForge requests |
| **All-Access Suite** | $14.99 lifetime | Unlimited requests across **all 52 MCP servers** |

### 🛒 Gumroad (PayPal & Cards)

👉 **[Get Pro on Gumroad](https://amygraphics.gumroad.com/l/mcp-pro)** — instant license delivery.

### ⚡ Solana USDC (instant, borderless)

Send $7.99 (single) or $14.99 (suite) USDC to:

```
8sDLX3okSV974wdjdeKhN9uWLZDr45DeGCJ28zgTLEdJ
```

Then verify: `POST https://localforge-api.agentweb-hub.workers.dev/verify-solana` with `{"signature":"<tx_signature>"}`.

---

## 🏗️ Architecture

- **Runtime:** Cloudflare Workers (global edge, ~0ms cold starts)
- **Protocol:** MCP via streamable HTTP (`/mcp`), JSON-RPC 2.0
- **Spec:** protocol `2024-11-05`, full `inputSchema` + `outputSchema` + annotations on every tool
- **Health:** `GET /health`

## 🌐 More MCP Servers

LocalForge is part of a 52-server autonomous MCP suite — SEO, databases, security, email deliverability, video, design, courses, agencies and more:

👉 **[Browse the full MCP Hub](https://mcp-hub.agentweb-hub.workers.dev)**

## 📄 License

MIT — build freely.


## Evidence

Live audits include source URL, collection timestamp and confidence notes so observed business data is separated from general recommendations.


## Why this MCP is worth using

Observed local visibility evidence → prioritized Google Business Profile, reputation and local SEO actions.

This outcome is the product value; the tool count is only an implementation detail.
