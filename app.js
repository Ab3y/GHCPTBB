// ============================================
// GitHub Copilot UBB Calculator — App Logic
// ============================================

// --- Model Pricing Data (per 1M tokens) ---
const MODEL_PRICING = {
  gpt54nano:       { name: 'GPT-5.4 nano',          provider: 'OpenAI',    input: 0.20, output: 1.25,  cached: 0.02,  cacheWrite: null, tier: 'low' },
  gpt54mini:       { name: 'GPT-5.4 mini',          provider: 'OpenAI',    input: 0.75, output: 4.50,  cached: 0.075, cacheWrite: null, tier: 'low' },
  gpt54:           { name: 'GPT-5.4',               provider: 'OpenAI',    input: 2.50, output: 15.00, cached: 0.25,  cacheWrite: null, tier: 'mid' },
  gpt55:           { name: 'GPT-5.5',               provider: 'OpenAI',    input: 5.00, output: 30.00, cached: 0.50,  cacheWrite: null, tier: 'premium' },
  gpt53codex:      { name: 'GPT-5.3 Codex',         provider: 'OpenAI',    input: 1.75, output: 14.00, cached: 0.175, cacheWrite: null, tier: 'mid' },
  gpt52codex:      { name: 'GPT-5.2 Codex',         provider: 'OpenAI',    input: 1.75, output: 14.00, cached: 0.175, cacheWrite: null, tier: 'mid' },
  gpt41:           { name: 'GPT-4.1',               provider: 'OpenAI',    input: 2.00, output: 8.00,  cached: 0.50,  cacheWrite: null, tier: 'mid' },
  claudehaiku:     { name: 'Claude Haiku 4.5',      provider: 'Anthropic', input: 1.00, output: 5.00,  cached: 0.10,  cacheWrite: 1.25,  tier: 'low' },
  claudesonnet45:  { name: 'Claude Sonnet 4.5',     provider: 'Anthropic', input: 3.00, output: 15.00, cached: 0.30,  cacheWrite: 3.75,  tier: 'mid' },
  claudesonnet:    { name: 'Claude Sonnet 4.6',     provider: 'Anthropic', input: 3.00, output: 15.00, cached: 0.30,  cacheWrite: 3.75,  tier: 'mid' },
  claudeopus46:    { name: 'Claude Opus 4.6',       provider: 'Anthropic', input: 5.00, output: 25.00, cached: 0.50,  cacheWrite: 6.25,  tier: 'premium' },
  claudeopus:      { name: 'Claude Opus 4.7',       provider: 'Anthropic', input: 5.00, output: 25.00, cached: 0.50,  cacheWrite: 6.25,  tier: 'premium' },
  geminiflashlite: { name: 'Gemini 2.5 Flash-Lite', provider: 'Google',    input: 0.10, output: 0.40,  cached: null,  cacheWrite: null, tier: 'low' },
  geminiflash:     { name: 'Gemini 2.5 Flash',      provider: 'Google',    input: 0.30, output: 2.50,  cached: null,  cacheWrite: null, tier: 'low' },
  geminipro:       { name: 'Gemini 3.1 Pro',        provider: 'Google',    input: 2.00, output: 12.00, cached: null,  cacheWrite: null, tier: 'mid' },
};

// --- Plan Configuration ---
const PLAN_CONFIG = {
  pro:        { name: 'Pro',        price: 10, credits: 1000, promoCredits: null, pru: 300,  overageRate: 0.04, pooled: false },
  proplus:    { name: 'Pro+',       price: 39, credits: 3900, promoCredits: null, pru: 1500, overageRate: 0.04, pooled: false },
  business:   { name: 'Business',   price: 19, credits: 1900, promoCredits: 3000, pru: 300,  overageRate: 0.04, pooled: true },
  enterprise: { name: 'Enterprise', price: 39, credits: 3900, promoCredits: 7000, pru: 1000, overageRate: 0.04, pooled: true },
};

// --- DOM Elements ---
const els = {
  billingToggle: document.getElementById('billingToggle'),
  labelSeat: document.getElementById('label-seat'),
  labelToken: document.getElementById('label-token'),
  planType: document.getElementById('planType'),
  userCount: document.getElementById('userCount'),
  userCountInput: document.getElementById('userCountInput'),
  primaryModel: document.getElementById('primaryModel'),
  interactions: document.getElementById('interactions'),
  interactionsValue: document.getElementById('interactionsValue'),
  tokensPerInteraction: document.getElementById('tokensPerInteraction'),
  tokensPerInteractionValue: document.getElementById('tokensPerInteractionValue'),
  ioRatio: document.getElementById('ioRatio'),
  ioRatioValue: document.getElementById('ioRatioValue'),
  workDays: document.getElementById('workDays'),
  workDaysValue: document.getElementById('workDaysValue'),
  activeUsers: document.getElementById('activeUsers'),
  activeUsersValue: document.getElementById('activeUsersValue'),
  resultSeatCost: document.getElementById('resultSeatCost'),
  resultTotalTokens: document.getElementById('resultTotalTokens'),
  resultCreditsIncluded: document.getElementById('resultCreditsIncluded'),
  resultCreditsUsed: document.getElementById('resultCreditsUsed'),
  resultOverage: document.getElementById('resultOverage'),
  overageRow: document.getElementById('overageRow'),
  resultTotal: document.getElementById('resultTotal'),
  resultPerUser: document.getElementById('resultPerUser'),
  insightText: document.getElementById('insightText'),
  seatTotalCost: document.getElementById('seatTotalCost'),
  tokenTotalCost: document.getElementById('tokenTotalCost'),
  seatBreakdown: document.getElementById('seatBreakdown'),
  tokenBreakdown: document.getElementById('tokenBreakdown'),
  savingsIndicator: document.getElementById('savingsIndicator'),
  resetBtn: document.getElementById('resetBtn'),
};

// --- Utility ---
function fmt(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fmtExact(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtNum(n) {
  return n.toLocaleString('en-US');
}

function fmtCompact(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return n.toString();
}

// --- Toggle Logic ---
function updateToggle() {
  const isTBB = els.billingToggle.checked;
  if (isTBB) {
    document.body.classList.remove('seat-mode');
    els.labelSeat.classList.remove('active');
    els.labelToken.classList.add('active');
  } else {
    document.body.classList.add('seat-mode');
    els.labelSeat.classList.add('active');
    els.labelToken.classList.remove('active');
  }
}

els.billingToggle.addEventListener('change', updateToggle);

// --- Populate Pricing Table ---
function populatePricingTable() {
  const tbody = document.querySelector('#pricingTable tbody');
  const tierLabels = { low: 'Budget', mid: 'Standard', high: 'High', premium: 'Premium' };

  Object.values(MODEL_PRICING).forEach(m => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${m.name}</strong></td>
      <td>${m.provider}</td>
      <td>${fmtExact(m.input)}</td>
      <td>${fmtExact(m.output)}</td>
      <td>${m.cached !== null ? fmtExact(m.cached) : '—'}</td>
      <td>${m.cacheWrite !== null ? fmtExact(m.cacheWrite) : '—'}</td>
      <td><span class="cost-tier ${m.tier}">${tierLabels[m.tier]}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

// --- Calculator Engine ---
function calculate() {
  const planKey = els.planType.value;
  const plan = PLAN_CONFIG[planKey];
  const model = MODEL_PRICING[els.primaryModel.value];
  const users = parseInt(els.userCountInput.value) || 1;
  const interactionsPerDay = parseInt(els.interactions.value);
  const tokensPerInteraction = parseInt(els.tokensPerInteraction.value);
  const inputRatio = parseInt(els.ioRatio.value) / 100;
  const outputRatio = 1 - inputRatio;
  const workDays = parseInt(els.workDays.value);
  const activeRate = parseInt(els.activeUsers.value) / 100;

  const activeUsers = Math.round(users * activeRate);

  // Total tokens per month across org
  const totalTokensPerMonth = activeUsers * interactionsPerDay * tokensPerInteraction * workDays;
  const inputTokens = totalTokensPerMonth * inputRatio;
  const outputTokens = totalTokensPerMonth * outputRatio;

  // Token cost (per 1M tokens pricing)
  const inputCost = (inputTokens / 1_000_000) * model.input;
  const outputCost = (outputTokens / 1_000_000) * model.output;
  const totalTokenCost = inputCost + outputCost;

  // Credits used (1 credit = $0.01)
  const creditsUsed = Math.round(totalTokenCost / 0.01);

  // Credits included
  const creditsIncluded = plan.credits * users;

  // Seat cost
  const seatCost = plan.price * users;

  // Overage
  const overageCredits = Math.max(0, creditsUsed - creditsIncluded);
  const overageCost = overageCredits * 0.01;

  // Total UBB cost
  const totalTBBCost = seatCost + overageCost;

  // Per-seat model cost (old model)
  const avgPRUsPerUserPerDay = interactionsPerDay;
  const totalPRUsPerMonth = activeUsers * avgPRUsPerUserPerDay * workDays;
  const overagePRUs = Math.max(0, totalPRUsPerMonth - (plan.pru * users));
  const overagePRUCost = overagePRUs * plan.overageRate;
  const totalSeatCost = seatCost + overagePRUCost;

  // Update side panel results
  els.resultSeatCost.textContent = fmt(seatCost);
  els.resultTotalTokens.textContent = fmtCompact(totalTokensPerMonth);
  els.resultCreditsIncluded.textContent = fmtNum(creditsIncluded);
  els.resultCreditsUsed.textContent = fmtNum(creditsUsed);

  if (overageCost > 0) {
    els.resultOverage.textContent = fmt(overageCost);
    els.overageRow.style.display = 'flex';
  } else {
    els.overageRow.style.display = 'none';
  }

  els.resultTotal.textContent = fmt(totalTBBCost);
  els.resultPerUser.textContent = fmtExact(totalTBBCost / users);

  // Update comparison cards
  els.seatTotalCost.textContent = fmt(totalSeatCost);
  els.tokenTotalCost.textContent = fmt(totalTBBCost);

  els.seatBreakdown.innerHTML = `
    <div><span>Seat cost (${users} users × ${fmt(plan.price)})</span><span>${fmt(seatCost)}</span></div>
    <div><span>PRU included (${fmtNum(plan.pru)} × ${users})</span><span>${fmtNum(plan.pru * users)}</span></div>
    <div><span>PRU used (est.)</span><span>${fmtNum(totalPRUsPerMonth)}</span></div>
    <div><span>Overage PRUs</span><span>${fmtNum(overagePRUs)}</span></div>
    <div><span>Overage cost (@ $0.04/req)</span><span>${fmt(overagePRUCost)}</span></div>
  `;

  els.tokenBreakdown.innerHTML = `
    <div><span>Seat cost (${users} users × ${fmt(plan.price)})</span><span>${fmt(seatCost)}</span></div>
    <div><span>Credits included</span><span>${fmtNum(creditsIncluded)}</span></div>
    <div><span>Credits used</span><span>${fmtNum(creditsUsed)}</span></div>
    <div><span>Input tokens (${Math.round(inputRatio*100)}%)</span><span>${fmtCompact(inputTokens)}</span></div>
    <div><span>Output tokens (${Math.round(outputRatio*100)}%)</span><span>${fmtCompact(outputTokens)}</span></div>
    <div><span>Token cost (${model.name})</span><span>${fmtExact(totalTokenCost)}</span></div>
    <div><span>Overage credits</span><span>${fmtNum(overageCredits)}</span></div>
    <div><span>Overage cost</span><span>${fmt(overageCost)}</span></div>
  `;

  // Savings indicator
  const diff = totalTBBCost - totalSeatCost;
  const indicator = els.savingsIndicator;
  if (Math.abs(diff) < seatCost * 0.02) {
    indicator.className = 'savings-indicator neutral';
    indicator.textContent = `≈ Roughly equivalent cost under both models (within 2%)`;
  } else if (diff < 0) {
    const pct = Math.abs(diff / totalSeatCost * 100).toFixed(0);
    indicator.className = 'savings-indicator savings';
    indicator.textContent = `✓ Usage-Based Billing saves ${fmt(Math.abs(diff))}/month (${pct}% less than per-seat)`;
  } else {
    const pct = (diff / totalSeatCost * 100).toFixed(0);
    indicator.className = 'savings-indicator overspend';
    indicator.textContent = `⚠ Usage-Based Billing costs ${fmt(diff)}/month more (${pct}% increase over per-seat)`;
  }

  // Dynamic insight
  updateInsight(plan, model, creditsUsed, creditsIncluded, overageCost, activeRate, totalTokenCost, users);
}

// --- Dynamic Insights ---
function updateInsight(plan, model, creditsUsed, creditsIncluded, overageCost, activeRate, totalTokenCost, users) {
  const utilization = creditsIncluded > 0 ? (creditsUsed / creditsIncluded * 100) : 0;
  let insight = '';

  if (overageCost > 0 && model.tier === 'premium') {
    insight = `⚠️ You're exceeding your included credits by ${fmtNum(creditsUsed - creditsIncluded)} credits/month using ${model.name}. Switching to a lower-tier model like GPT-5.4 or Claude Haiku could reduce token costs by 60-80%.`;
  } else if (overageCost > 0) {
    insight = `⚠️ Your usage exceeds included credits. Consider reducing interactions per user, enabling budget guardrails, or upgrading to Enterprise for more credits (7,000 promo credits vs 3,000).`;
  } else if (utilization < 30) {
    insight = `💰 Your org is only using ${utilization.toFixed(0)}% of included credits. With pooled credits, light users subsidize heavy users — but you may be over-provisioned on seats. Consider right-sizing your license count.`;
  } else if (utilization > 80 && utilization <= 100) {
    insight = `📊 Good utilization at ${utilization.toFixed(0)}% of credits. You're getting strong value from your plan. Monitor trending to avoid hitting the overage threshold next month.`;
  } else if (activeRate < 50) {
    insight = `👥 Only ${(activeRate * 100).toFixed(0)}% of users are active. With UBB's pooled credits, this is actually a strength — unused capacity from inactive users supports your power users.`;
  } else if (model.tier === 'low') {
    insight = `✅ Great choice! ${model.name} is one of the most cost-efficient models. For routine code tasks, budget-tier models deliver excellent results at a fraction of premium model costs.`;
  } else {
    insight = `📈 Your configuration uses ${utilization.toFixed(0)}% of included credits with ${model.name}. Consider model selection as your primary cost lever — the right model for each task type can significantly reduce spend.`;
  }

  els.insightText.textContent = insight;
}

// --- Input Synchronization ---
function syncSliders() {
  // User count
  els.userCount.addEventListener('input', () => {
    els.userCountInput.value = els.userCount.value;
    calculate();
  });
  els.userCountInput.addEventListener('input', () => {
    const val = parseInt(els.userCountInput.value) || 1;
    els.userCount.value = Math.min(val, 100000);
    calculate();
  });

  // Interactions
  els.interactions.addEventListener('input', () => {
    els.interactionsValue.textContent = els.interactions.value;
    calculate();
  });

  // Tokens per interaction
  els.tokensPerInteraction.addEventListener('input', () => {
    els.tokensPerInteractionValue.textContent = parseInt(els.tokensPerInteraction.value).toLocaleString();
    calculate();
  });

  // I/O ratio
  els.ioRatio.addEventListener('input', () => {
    const v = parseInt(els.ioRatio.value);
    els.ioRatioValue.textContent = `${v}% input / ${100 - v}% output`;
    calculate();
  });

  // Work days
  els.workDays.addEventListener('input', () => {
    els.workDaysValue.textContent = els.workDays.value;
    calculate();
  });

  // Active users
  els.activeUsers.addEventListener('input', () => {
    els.activeUsersValue.textContent = els.activeUsers.value + '%';
    calculate();
  });

  // Plan and model selects
  els.planType.addEventListener('change', calculate);
  els.primaryModel.addEventListener('change', calculate);
}

// --- Reset ---
function resetDefaults() {
  els.planType.value = 'business';
  els.userCount.value = 100;
  els.userCountInput.value = 100;
  els.primaryModel.value = 'gpt54';
  els.interactions.value = 15;
  els.interactionsValue.textContent = '15';
  els.tokensPerInteraction.value = 2000;
  els.tokensPerInteractionValue.textContent = '2,000';
  els.ioRatio.value = 70;
  els.ioRatioValue.textContent = '70% input / 30% output';
  els.workDays.value = 22;
  els.workDaysValue.textContent = '22';
  els.activeUsers.value = 70;
  els.activeUsersValue.textContent = '70%';
  els.billingToggle.checked = true;
  updateToggle();
  calculate();
}

els.resetBtn.addEventListener('click', resetDefaults);

// --- Model Comparison ---
function initComparison() {
  const selectA = document.getElementById('compareModelA');
  const selectB = document.getElementById('compareModelB');
  const tokensSlider = document.getElementById('compareTokens');
  const tokensValue = document.getElementById('compareTokensValue');

  // Populate dropdowns
  Object.entries(MODEL_PRICING).forEach(([key, m]) => {
    const optA = new Option(`${m.name} (${m.provider})`, key);
    const optB = new Option(`${m.name} (${m.provider})`, key);
    selectA.add(optA);
    selectB.add(optB);
  });

  selectA.value = 'gpt54';
  selectB.value = 'claudesonnet';

  function renderComparison() {
    const mA = MODEL_PRICING[selectA.value];
    const mB = MODEL_PRICING[selectB.value];
    const tokens = parseInt(tokensSlider.value);
    tokensValue.textContent = tokens.toLocaleString();

    const inputRatio = 0.7;
    const outputRatio = 0.3;
    const inputTokens = tokens * inputRatio;
    const outputTokens = tokens * outputRatio;

    function costPerInteraction(m) {
      return (inputTokens / 1e6) * m.input + (outputTokens / 1e6) * m.output;
    }

    function creditsPerInteraction(m) {
      return costPerInteraction(m) / 0.01;
    }

    // Per-day (15 interactions), per-month (22 days), per-user
    const interactionsPerDay = 15;
    const workDays = 22;

    const costA = costPerInteraction(mA);
    const costB = costPerInteraction(mB);
    const credA = creditsPerInteraction(mA);
    const credB = creditsPerInteraction(mB);
    const dailyA = costA * interactionsPerDay;
    const dailyB = costB * interactionsPerDay;
    const monthlyA = dailyA * workDays;
    const monthlyB = dailyB * workDays;
    const monthlyCreditsA = credA * interactionsPerDay * workDays;
    const monthlyCreditsB = credB * interactionsPerDay * workDays;

    const tierLabels = { low: 'Budget', mid: 'Standard', high: 'High', premium: 'Premium' };

    function renderCol(m, cost, cred, daily, monthly, monthlyCreds) {
      return `
        <h4>${m.name}</h4>
        <div class="compare-provider">${m.provider}</div>
        <div class="compare-tier"><span class="cost-tier ${m.tier}">${tierLabels[m.tier]}</span></div>
        <div class="compare-row"><span>Input (per 1M)</span><strong>${fmtExact(m.input)}</strong></div>
        <div class="compare-row"><span>Output (per 1M)</span><strong>${fmtExact(m.output)}</strong></div>
        <div class="compare-row"><span>Cached (per 1M)</span><strong>${m.cached !== null ? fmtExact(m.cached) : '—'}</strong></div>
        ${m.cacheWrite !== null ? `<div class="compare-row"><span>Cache Write (per 1M)</span><strong>${fmtExact(m.cacheWrite)}</strong></div>` : ''}
        <div class="compare-row" style="margin-top:8px;border-top:1px solid var(--border);padding-top:8px"><span>Cost per interaction</span><strong>${cost < 0.01 ? '$' + cost.toFixed(5) : fmtExact(cost)}</strong></div>
        <div class="compare-row"><span>Credits per interaction</span><strong>${cred.toFixed(2)}</strong></div>
        <div class="compare-row"><span>Daily cost (15 interactions)</span><strong>${fmtExact(daily)}</strong></div>
        <div class="compare-row highlight"><span>Monthly cost / user</span><strong>${fmtExact(monthly)}</strong></div>
        <div class="compare-row"><span>Monthly credits / user</span><strong>${fmtNum(Math.round(monthlyCreds))}</strong></div>
      `;
    }

    const colA = document.getElementById('compareColA');
    const colB = document.getElementById('compareColB');
    colA.innerHTML = renderCol(mA, costA, credA, dailyA, monthlyA, monthlyCreditsA);
    colB.innerHTML = renderCol(mB, costB, credB, dailyB, monthlyB, monthlyCreditsB);

    // Winner styling
    colA.classList.toggle('winner', monthlyA < monthlyB);
    colB.classList.toggle('winner', monthlyB < monthlyA);

    // Verdict
    const verdict = document.getElementById('compareVerdict');
    if (Math.abs(monthlyA - monthlyB) < 0.01) {
      verdict.textContent = `≈ Both models cost roughly the same at this usage level`;
      verdict.style.color = 'var(--accent-orange)';
      verdict.style.borderColor = 'rgba(210,153,34,0.3)';
      verdict.style.background = 'rgba(210,153,34,0.08)';
    } else {
      const cheaper = monthlyA < monthlyB ? mA : mB;
      const pricier = monthlyA < monthlyB ? mB : mA;
      const savings = Math.abs(monthlyA - monthlyB);
      const pct = (savings / Math.max(monthlyA, monthlyB) * 100).toFixed(0);
      const savings100 = savings * 100;
      verdict.innerHTML = `💰 <strong>${cheaper.name}</strong> saves <strong>${fmtExact(savings)}/user/month</strong> (${pct}% less) vs ${pricier.name} — that's <strong>${fmt(savings100)}/month for 100 users</strong>`;
      verdict.style.color = 'var(--accent-green)';
      verdict.style.borderColor = 'rgba(63,185,80,0.2)';
      verdict.style.background = 'rgba(63,185,80,0.08)';
    }
  }

  selectA.addEventListener('change', renderComparison);
  selectB.addEventListener('change', renderComparison);
  tokensSlider.addEventListener('input', renderComparison);
  renderComparison();
}

// --- Initialize ---
populatePricingTable();
syncSliders();
updateToggle();
calculate();
initComparison();
