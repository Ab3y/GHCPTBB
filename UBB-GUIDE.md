# GitHub Copilot Usage-Based Billing (UBB) — Complete Guide

> **Everything you need to know about GitHub Copilot's transition from per-seat to Usage-Based Billing, effective June 1, 2026.**

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [What Is Changing](#what-is-changing)
3. [Timeline](#timeline)
4. [How Usage-Based Billing Works](#how-token-based-billing-works)
5. [Plan Comparison](#plan-comparison)
6. [Model Pricing Reference](#model-pricing-reference)
7. [Credit Pooling & Enterprise Benefits](#credit-pooling--enterprise-benefits)
8. [Budget Controls & Overage Management](#budget-controls--overage-management)
9. [What's Free vs. What Costs Credits](#whats-free-vs-what-costs-credits)
10. [Usage Monitoring & Dashboards](#usage-monitoring--dashboards)
11. [Best Practices to Reduce Token Costs](#best-practices-to-reduce-token-costs)
12. [Competitive Context](#competitive-context)
13. [Frequently Asked Questions](#frequently-asked-questions)
14. [Glossary](#glossary)
15. [Official References](#official-references)

---

## Executive Summary

GitHub Copilot is moving from **flat per-request (PRU) pricing** to **Usage-Based Billing (UBB)** on **June 1, 2026**. The core change:

- **Seat prices stay the same** — $19/user/mo (Business), $39/user/mo (Enterprise)
- **PRUs are replaced by AI credits** — billing now reflects actual compute (tokens consumed), not just request count
- **Code completions remain FREE** — no credits consumed for inline code suggestions
- **Credits are pooled** at the org/enterprise level — light users subsidize heavy users
- **Promotional credits** are available for the first 3 months (Business: 3,000/user, Enterprise: 7,000/user)

**Bottom line:** PRUs were simple but inaccurate. Tokens are accurate but variable. Pricing isn't increasing at the seat level, but **consumption becomes the real cost lever**.

> *"The move from flat request pricing to actual usage pricing keeps seat costs stable while aligning spend with consumption."*

---

## What Is Changing

### The Old Model: PRU (Premium Request Units)
- Each Copilot interaction consumed **1 PRU** regardless of complexity
- A simple "fix this typo" and a complex "architect this microservice" cost the same
- Model multipliers existed but were coarse
- As agentic AI grew, PRUs no longer mapped to real compute cost

### The New Model: Usage-Based Billing (UBB)
- Every interaction consumes tokens based on **actual work done**:
  - **Input tokens** — your prompt, file context, conversation history
  - **Output tokens** — the model's generated response/code
  - **Cached tokens** — reused context (cheaper)
- Cost varies by **model selection** — premium models cost more per token
- **1 AI credit = $0.01 USD**
- Credits are pooled at the organization level

### What Moves to Token Consumption
| Feature | Old Model | New Model (UBB) |
|---------|-----------|-----------------|
| Code Completions | Included | **Still FREE** |
| Next Edit Suggestions | Included | **Still FREE** |
| Copilot Chat | PRU-based | Token-based |
| Agent Mode | PRU-based | Token-based |
| Code Review | PRU-based | Token-based |
| Copilot CLI | PRU-based | Token-based |
| Copilot Spaces | PRU-based | Token-based |
| Third-party Agents | PRU-based | Token-based |

> **📌 Key insight:** Code completions — the most commonly used feature — remain completely free. Only advanced features (chat, agents, review) consume credits.

📎 [GitHub Blog: GitHub Copilot is Moving to Usage-Based Billing](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/)

---

## Timeline

| Milestone | Date | Details |
|-----------|------|---------|
| Internal enablement | April 15–22, 2026 | Tech Downloads, LevelUp sessions, leadership decks |
| Public announcement | April 23–30, 2026 | Blog post, documentation updates |
| Customer communications | April 30, 2026 | Direct outreach, dashboards available |
| **Go-live (GA)** | **June 1, 2026** | All monthly plans transition to UBB |
| Promotional period ends | September 1, 2026 | Credits drop from promo to standard allotments |
| Annual plan conversion | At renewal | Annual PRU plans convert to UBB at next renewal |

📎 [GitHub Docs: Copilot Billing Overview](https://docs.github.com/en/copilot/concepts/billing)

---

## How Usage-Based Billing Works

### The Credit System
```
1 AI Credit = $0.01 USD

Monthly Credits = Plan Price × 100
  Business:   $19 × 100 = 1,900 credits/user/month
  Enterprise: $39 × 100 = 3,900 credits/user/month
```

### How Credits Are Consumed
Each interaction:
1. Your prompt + context → **input tokens**
2. Model generates response → **output tokens**
3. Reused context from previous turns → **cached tokens** (discounted)

```
Credit Cost = (Input Tokens ÷ 1M × Input Rate)
            + (Output Tokens ÷ 1M × Output Rate)
            + (Cached Tokens ÷ 1M × Cache Rate)
            ÷ $0.01 per credit
```

### Example Calculation
A developer using **GPT-5.4** makes a chat request with:
- 1,500 input tokens, 500 output tokens

```
Input cost:  1,500 ÷ 1,000,000 × $2.50  = $0.00375
Output cost: 500   ÷ 1,000,000 × $15.00 = $0.0075
Total:       $0.01125 = ~1.1 credits
```

For comparison with **Gemini 2.5 Flash-Lite** (same interaction):
```
Input cost:  1,500 ÷ 1,000,000 × $0.10  = $0.00015
Output cost: 500   ÷ 1,000,000 × $0.40  = $0.0002
Total:       $0.00035 = ~0.04 credits
```

> **📌 Model selection is the #1 cost lever.** The same interaction can cost 27x more depending on the model.

📎 [GitHub Docs: Models and Pricing](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing)

---

## Plan Comparison

### Standard Credit Allotments (after September 1, 2026)

| Plan | Monthly Price | AI Credits/User/Mo | Total Credits (100 users) | Pooling |
|------|--------------|--------------------|--------------------------:|---------|
| Pro | $10/user | 1,000 | — (individual) | No |
| Pro+ | $39/user | 3,900 | — (individual) | No |
| **Business** | **$19/user** | **1,900** | **190,000** | **✓ Org-wide** |
| **Enterprise** | **$39/user** | **3,900** | **390,000** | **✓ Org-wide** |

### Promotional Credit Allotments (June 1 – September 1, 2026)

| Plan | Standard Credits | Promo Credits | Promo Value |
|------|-----------------|---------------|-------------|
| Business | 1,900/user/mo | **3,000/user/mo** | $30/user |
| Enterprise | 3,900/user/mo | **7,000/user/mo** | $70/user |

### Comparison to Old PRU Model

| Plan | Old PRU/User/Mo | New Credits/User/Mo | Old Overage | New Overage |
|------|----------------|--------------------:|-------------|-------------|
| Pro | 300 | 1,000 | $0.04/request | Per-credit ($0.01) |
| Business | 300 | 1,900 (promo: 3,000) | $0.04/request | Per-credit ($0.01) |
| Enterprise | 1,000 | 3,900 (promo: 7,000) | $0.04/request | Per-credit ($0.01) |

📎 [GitHub Docs: Usage-Based Billing for Organizations](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-organizations-and-enterprises)

---

## Model Pricing Reference

All prices are **per 1 million tokens**. 1 AI credit = $0.01.

### OpenAI GPT Models
| Model | Input | Output | Cached | Cost Tier | Best For |
|-------|------:|-------:|-------:|-----------|----------|
| GPT-5.4 nano | $0.20 | $1.25 | $0.02 | 💚 Budget | Quick completions, simple refactors |
| GPT-5.4 mini | $0.75 | $4.50 | $0.075 | 💚 Budget | Routine code tasks, test generation |
| GPT-5.4 | $2.50 | $15.00 | $0.25 | 🟡 Standard | General-purpose coding, code review |
| GPT-5.5 | $5.00 | $30.00 | $0.50 | 🔴 Premium | Complex reasoning, architecture design |
| GPT-5.2 Codex | $1.75 | $14.00 | $0.175 | 🟡 Standard | Code-specialized tasks, migrations |
| GPT-4.1 | $2.00 | $8.00 | $0.50 | 🟡 Standard | Balanced cost/capability |

### Anthropic Claude Models
| Model | Input | Output | Cached | Cost Tier | Best For |
|-------|------:|-------:|-------:|-----------|----------|
| Claude Haiku 4.5 | $1.00 | $5.00 | $0.10 | 💚 Budget | Fast responses, simple tasks |
| Claude Sonnet 4.6 | $3.00 | $15.00 | $0.30 | 🟡 Standard | General-purpose, good reasoning |
| Claude Opus 4.7 | $5.00 | $25.00 | $0.50 | 🔴 Premium | Deep analysis, complex architecture |

### Google Gemini Models
| Model | Input | Output | Cached | Cost Tier | Best For |
|-------|------:|-------:|-------:|-----------|----------|
| Gemini 2.5 Flash-Lite | $0.10 | $0.40 | — | 💚 Budget | Lightweight, highest volume tasks |
| Gemini 2.5 Flash | $0.30 | $2.50 | — | 💚 Budget | Balanced speed and cost |
| Gemini 3.1 Pro | $2.00 | $12.00 | — | 🟡 Standard | Advanced reasoning, multi-modal |

> **📌 Cost range:** The cheapest model (Gemini Flash-Lite) is **75x cheaper** on output than the most expensive (GPT-5.5). Choose wisely.

📎 [GitHub Docs: Models and Pricing for GitHub Copilot](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing)

---

## Credit Pooling & Enterprise Benefits

### How Pooling Works
- Credits are **shared across all users** in the organization
- A 500-user Business org gets **950,000 pooled credits/month** (500 × 1,900)
- If 200 users are light (using 500 credits each), their unused 280,000 credits are available for the 300 active users
- **This eliminates the "wasted seat" problem** of per-user allocations

### Why Pooling Matters
| Scenario | Per-User Model | Pooled Model |
|----------|---------------|--------------|
| 100 light users (500 credits each) | 140,000 credits wasted | Redistributed to heavy users |
| 50 heavy users (5,000 credits each) | 155,000 credits overage | Absorbed by pool |
| Net impact | $1,550 overage charges | $0 overage (within pool) |

### Enterprise Advantages
1. **Cost efficiency** — no wasted capacity from underutilized seats
2. **Budget predictability** — org-level pool is easier to forecast than per-user
3. **Flexibility** — power users (agent-heavy developers) don't hit limits as fast
4. **Governance** — centralized visibility and control

📎 [GitHub Docs: Usage-Based Billing for Organizations and Enterprises](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-organizations-and-enterprises)

---

## Budget Controls & Overage Management

### Setting Budgets
- Admins can set a **monthly budget** for Copilot spending
- Budgets are **advisory by default** — Copilot continues working and bills for overages
- To enforce a **hard cap**, disable additional credit purchases in settings

### What Happens When Credits Run Out
```
Credits Exhausted + No Overage Budget
  → User drops to CODE COMPLETION ONLY
  → Chat, Agent Mode, Code Review suspended
  → Resets at next billing cycle

Credits Exhausted + Overage Enabled
  → Usage continues at per-credit rate ($0.01/credit)
  → Overage billed on next invoice
```

### Budget Levels
| Level | Scope | Control |
|-------|-------|---------|
| Enterprise | All orgs under enterprise | Global spending limit |
| Organization | Single org | Org-level credit budget |
| Cost Center | Business unit / team | Map usage to cost centers |
| User | Individual developer | Per-user usage tracking |

### Spending Alerts
- Email notifications when approaching budget thresholds
- Usage reports downloadable for compliance and chargeback
- API access for integration with enterprise BI tools

📎 [GitHub Docs: Managing Your Company's Spending on GitHub Copilot](https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/manage-company-spending)

---

## What's Free vs. What Costs Credits

### ✅ FREE (No Credits Consumed)
- **Code completions** — inline suggestions as you type
- **Next Edit Suggestions** — predictive edits
- These are the most commonly used features and remain unlimited on all paid plans

### 💳 Costs Credits (Token-Based)
- **Copilot Chat** — conversations in IDE, browser, or mobile
- **Agent Mode** — multi-step autonomous workflows (highest token consumer)
- **Code Review** — AI-powered PR reviews
- **Copilot CLI** — terminal commands and explanations
- **Copilot Spaces** — collaborative AI workspaces
- **Copilot Spark** — rapid prototyping
- **Third-party agents** — custom agent integrations

> **📌 Agent Mode is the biggest cost driver.** A single agentic workflow can consume 10-100x more tokens than a simple chat interaction because it runs multiple model calls, reads files, and iterates.

📎 [GitHub Docs: Monitoring Your GitHub Copilot Usage](https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/monitor-premium-requests)

---

## Usage Monitoring & Dashboards

### Copilot Usage Metrics Dashboard
- **Who can access:** Enterprise owners, org admins, billing managers, and users with "View Enterprise Copilot Metrics" permission
- **Where:** INSIGHTS tab on your enterprise/organization page on GitHub.com

### Available Metrics
| Metric | Description |
|--------|-------------|
| Active seat utilization | % of licensed users actively using Copilot |
| Feature breakdown | Usage by Chat, Agent, Completion, Review, CLI |
| Model breakdown | Which models are consuming the most credits |
| Language breakdown | Token consumption by programming language |
| Token usage totals | Input, output, cached tokens per period |
| Avg tokens per request | Efficiency metric per interaction type |
| CLI activity | Command-line usage at org level |

### Data Export & Integration
- **NDJSON format** download for raw data
- **REST API** for programmatic access and custom dashboards
- Integration-ready for **Power BI**, **Grafana**, and other BI tools
- 28-day, daily, or custom period views

### Proactive Monitoring Strategy
1. **Weekly review** — Track credit burn rate vs. budget
2. **Identify outliers** — Find users or repos with unusually high consumption
3. **Model usage audit** — Ensure developers aren't defaulting to premium models for simple tasks
4. **Set alerts** — Configure notifications at 50%, 75%, and 90% of budget

📎 [GitHub Docs: Viewing the Copilot Usage Metrics Dashboard](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/view-usage-and-adoption)
📎 [GitHub Changelog: Copilot CLI Activity Metrics](https://github.blog/changelog/2026-03-17-copilot-usage-metrics-now-includes-organization-level-github-copilot-cli-activity/)

---

## Best Practices to Reduce Token Costs

### 1. 🎯 Choose the Right Model for Each Task
**Impact: 10-75x cost reduction**

| Task Type | Recommended Model | Why |
|-----------|------------------|-----|
| Quick code completions | Free (no model needed) | Code completions don't consume credits |
| Simple refactors, renames | GPT-5.4 nano or Gemini Flash-Lite | Cheapest options, sufficient for simple tasks |
| Routine coding, test generation | GPT-5.4 mini or Claude Haiku | Good balance of capability and cost |
| General-purpose development | GPT-5.4 or GPT-4.1 | Standard tier, solid performance |
| Complex architecture, deep analysis | GPT-5.5 or Claude Opus | Premium — use sparingly |

📎 [GitHub Docs: Models and Pricing](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing)

### 2. 📝 Write Precise, Focused Prompts
**Impact: 20-50% token reduction**

- Be specific about what you need — avoid vague requests
- Reference specific functions/files instead of pasting entire files
- Use structured prompts: "In `auth.ts`, refactor the `validateToken` function to use async/await"
- Avoid conversational filler — get straight to the technical ask

📎 [GitHub Docs: Prompt Engineering for GitHub Copilot](https://docs.github.com/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot)

### 3. 🏊 Leverage Credit Pooling (Business/Enterprise)
**Impact: Eliminates wasted capacity**

- Pooled credits mean light users subsidize heavy users automatically
- No need to worry about individual user limits in pooled plans
- Right-size your seat count — remove truly inactive users to avoid paying for unused seats
- Pooling is a **strong differentiator** vs. competitors with per-user limits

📎 [GitHub Blog: Usage-Based Billing](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/)

### 4. 📊 Monitor and Act on Usage Data
**Impact: Continuous cost optimization**

- Review usage dashboards weekly
- Identify developers defaulting to premium models for routine tasks
- Track credit burn rate and project month-end consumption
- Use API exports to build custom alerts and reports

📎 [GitHub Docs: Viewing Copilot Usage Metrics](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/view-usage-and-adoption)

### 5. 🔧 Optimize Agent Workflows
**Impact: 50-80% reduction on agent-heavy workloads**

- Agent mode runs multiple model calls per workflow — each consumes tokens
- Break complex agent tasks into smaller, focused steps
- Use inline completions (free) instead of chat when possible
- Prefer lightweight models for agent sub-steps that don't need premium reasoning

📎 [GitHub Docs: Using Copilot Coding Agent](https://docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent)

### 6. 🏦 Set Budget Guardrails Early
**Impact: Prevents bill shock**

- Configure spending limits before June 1
- Set alerts at 50%, 75%, and 90% of budget
- Decide whether to allow overages or hard-cap spending
- Communicate limits to developers before they hit them

📎 [GitHub Docs: Managing Company Spending](https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/manage-company-spending)

### 7. 📁 Refactor Large Files
**Impact: 10-30% input token reduction**

- Copilot sends file context as input tokens — large files = more tokens
- Break monolithic files into focused modules
- Use `.copilotignore` or settings to exclude irrelevant files from context
- Keep functions small and well-named — Copilot needs less context to understand them

📎 [GitHub Docs: Best Practices for Using GitHub Copilot](https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot)

### 8. 🎓 Train Teams on Token Efficiency
**Impact: 15-40% org-wide reduction**

- Invest in prompt engineering training
- Share model selection guidelines across the engineering org
- Create team-level "Copilot playbooks" with approved patterns
- Run periodic workshops on efficient AI-assisted development

📎 [GitHub: Prompt Engineering Essentials Pathway](https://resources.github.com/learn/pathways/copilot/essentials/essentials-of-prompt-engineering-with-github-copilot/)

---

## Competitive Context

### Why Customers Ask About Alternatives
Customers evaluating UBB often compare against:
- **Claude Code** — Anthropic's usage-based or subscription+token model
- **Cursor** — IDE with built-in AI, different pricing structure
- **Amazon Q Developer** — AWS's competing offering

### GitHub Copilot's Enterprise Advantages
| Capability | GitHub Copilot | Typical Competitor |
|-----------|---------------|-------------------|
| Credit Pooling | ✅ Org-wide pooled | ❌ Per-user limits |
| Model Choice | ✅ 12+ models (GPT, Claude, Gemini) | Limited selection |
| Enterprise Governance | ✅ Budget controls, cost centers, alerts | Basic controls |
| Code Completions | ✅ Unlimited (free) | Often metered |
| GitHub Integration | ✅ Native (PRs, Issues, Actions) | Plugin-based |
| Data Residency | ✅ US and EU | Varies |
| FedRAMP | ✅ Supported | Varies |
| SSO / SCIM | ✅ Enterprise-grade | Varies |

> *"This isn't about 'selling against Claude' — it's about helping customers understand why they choose GitHub Copilot given that Claude Code exists."*
> — Internal field enablement feedback

---

## Frequently Asked Questions

### Billing Basics

**Q: Does the seat price change?**
A: No. Business stays at $19/user/month, Enterprise at $39/user/month. Only the consumption model changes.

**Q: What is 1 AI credit worth?**
A: 1 AI credit = $0.01 USD.

**Q: Do unused credits roll over?**
A: No. Unused credits expire at the end of each monthly billing cycle.

**Q: When do annual plans convert?**
A: Annual plans retain PRU-based pricing until expiration, then convert to UBB at renewal.

### Credit Management

**Q: Can I stop Copilot from going over budget?**
A: By default, budgets are advisory. To enforce a hard cap, disable additional credit purchases in org/enterprise settings.

**Q: Does removing a user reduce my pool immediately?**
A: No. Pool size reductions take effect at the next billing cycle.

**Q: How does pooling work with multiple orgs?**
A: Each organization has its own credit pool. Enterprise-level billing allows visibility across all orgs.

### Usage & Features

**Q: Are code completions still free?**
A: Yes. Code completions and Next Edit Suggestions remain unlimited and free on all paid plans.

**Q: What consumes the most tokens?**
A: Agent Mode and multi-step agentic workflows. A single agent session can consume 10-100x more tokens than a simple chat interaction.

**Q: Can I choose which models my org uses?**
A: Yes. Admins can configure model access policies. Restricting access to budget-tier models is a powerful cost control.

### Migration

**Q: Do I need to do anything before June 1?**
A: Review your current usage, set up budget controls, and communicate the change to developers. No technical migration is needed.

**Q: Will my existing workflows break?**
A: No. The experience is identical — only the billing mechanism changes.

**Q: What about the promotional credits?**
A: Business gets 3,000/user/month and Enterprise gets 7,000/user/month for the first 3 months (June–August 2026). After September 1, standard allotments apply.

---

## Glossary

| Term | Definition |
|------|-----------|
| **UBB** | Usage-Based Billing — the new consumption model replacing PRUs |
| **PRU** | Premium Request Unit — the old billing unit (1 request = 1 PRU) |
| **AI Credit** | New billing unit. 1 credit = $0.01 USD |
| **Input Tokens** | Tokens sent to the model (your prompt, context, files) |
| **Output Tokens** | Tokens generated by the model (response, code) |
| **Cached Tokens** | Reused context from previous turns (discounted rate) |
| **Pooled Credits** | Credits shared across all users in an org (Business/Enterprise) |
| **Overage** | Usage beyond included credits, billed at per-credit rate |
| **Agent Mode** | Multi-step autonomous AI workflows (highest token consumer) |
| **FinOps** | Financial operations — cost management discipline for cloud/AI spend |

---

## Official References

### GitHub Documentation
| Resource | Link |
|----------|------|
| Models and Pricing | [docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing) |
| Copilot Billing Overview | [docs.github.com/en/copilot/concepts/billing](https://docs.github.com/en/copilot/concepts/billing) |
| Usage-Based Billing for Orgs | [docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-organizations-and-enterprises](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-organizations-and-enterprises) |
| Managing Company Spending | [docs.github.com/en/copilot/how-tos/manage-and-track-spending/manage-company-spending](https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/manage-company-spending) |
| Monitoring Usage & Entitlements | [docs.github.com/en/copilot/how-tos/manage-and-track-spending/monitor-premium-requests](https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/monitor-premium-requests) |
| Usage Metrics Dashboard | [docs.github.com/en/enterprise-cloud/copilot/how-tos/administer-copilot/view-usage-and-adoption](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/view-usage-and-adoption) |
| Prompt Engineering | [docs.github.com/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot](https://docs.github.com/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot) |
| Best Practices | [docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot](https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot) |
| Managing Enterprise Plan | [docs.github.com/en/copilot/managing-copilot/managing-copilot-for-your-enterprise](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-for-your-enterprise/managing-the-copilot-plan-for-your-enterprise) |
| Using Copilot Coding Agent | [docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent](https://docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent) |

### GitHub Blog & Changelog
| Resource | Link |
|----------|------|
| Usage-Based Billing Announcement | [github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/) |
| CLI Activity Metrics Changelog | [github.blog/changelog/2026-03-17-copilot-usage-metrics-now-includes-organization-level-github-copilot-cli-activity/](https://github.blog/changelog/2026-03-17-copilot-usage-metrics-now-includes-organization-level-github-copilot-cli-activity/) |
| Prompt Engineering Essentials | [resources.github.com/learn/pathways/copilot/essentials/](https://resources.github.com/learn/pathways/copilot/essentials/essentials-of-prompt-engineering-with-github-copilot/) |

### Industry Analysis
| Resource | Link |
|----------|------|
| ZDNET: Usage-Based Pricing | [zdnet.com/article/github-copilot-shifts-to-usage-based-pricing/](https://www.zdnet.com/article/github-copilot-shifts-to-usage-based-pricing/) |
| The New Stack: Usage Billing | [thenewstack.io/github-copilot-usage-billing/](https://thenewstack.io/github-copilot-usage-billing/) |
| InfoWorld: New Cost Model | [infoworld.com/article/4164236/github-shifts-copilot-to-usage-based-billing](https://www.infoworld.com/article/4164236/github-shifts-copilot-to-usage-based-billing-signaling-new-cost-model-for-enterprise-ai-tools.html) |
| EveryDev: Credit Cost Breakdown | [everydev.ai/p/news-github-copilots-billing-overhaul](https://www.everydev.ai/p/news-github-copilots-billing-overhaul-what-every-credit-actually-costs-you) |

---

*Last updated: April 28, 2026 · Data sourced from public documentation, blog posts, and industry analysis.*
