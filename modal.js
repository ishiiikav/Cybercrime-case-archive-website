/* ============================================================
   js/modal.js — Modal Open/Close & Tab Rendering
   ============================================================ */

let currentCase = null;

/* ── Open / Close ─────────────────────────────────────────── */

/**
 * Opens the detail modal for a given case ID.
 * @param {string} id
 */
function openCase(id) {
  currentCase = CASES.find(c => c.id === id);
  if (!currentCase) return;

  document.getElementById('modalCaseId').textContent =
    `${currentCase.id} // ${currentCase.status}`;
  document.getElementById('modalTitle').textContent = currentCase.title;

  // Reset tabs to Overview
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.tab-btn').classList.add('active');

  renderTab('overview');
  document.getElementById('modalOverlay').classList.add('open');
}

/**
 * Closes the modal when the backdrop is clicked.
 * @param {MouseEvent} e
 */
function closeModal(e) {
  if (e.target === document.getElementById('modalOverlay')) {
    document.getElementById('modalOverlay').classList.remove('open');
  }
}

/**
 * Switches the active tab.
 * @param {string} tab
 * @param {HTMLElement} btn
 */
function switchTab(tab, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderTab(tab);
}

/* ── Tab Renderers ────────────────────────────────────────── */

function renderTab(tab) {
  const c    = currentCase;
  const body = document.getElementById('modalBody');

  switch (tab) {
    case 'overview':  body.innerHTML = buildOverview(c);  break;
    case 'timeline':  body.innerHTML = buildTimeline(c);  break;
    case 'evidence':  body.innerHTML = buildEvidence(c);  break;
    case 'suspects':  body.innerHTML = buildSuspects(c);  break;
    case 'logs':      body.innerHTML = buildLogs(c);      break;
  }
}

/* ── Tab Builders ─────────────────────────────────────────── */

function buildOverview(c) {
  return `
    <div class="overview-grid">
      <div class="info-block">
        <div class="info-block-label">Case Description</div>
        <div class="info-block-value" style="font-size:0.7rem;line-height:1.7">${c.desc}</div>
      </div>
      <div class="info-block">
        <div class="info-block-label">Severity Assessment</div>
        <div class="info-block-value">${c.severity} / 100</div>
        <div class="severity-bar">
          <div class="severity-fill" style="width:${c.severity}%"></div>
        </div>
      </div>
      <div class="info-block">
        <div class="info-block-label">Category</div>
        <div class="info-block-value">${c.category}</div>
      </div>
      <div class="info-block">
        <div class="info-block-label">Lead Investigator</div>
        <div class="info-block-value">${c.lead}</div>
      </div>
      <div class="info-block">
        <div class="info-block-label">Date Opened</div>
        <div class="info-block-value">${c.date}</div>
      </div>
      <div class="info-block">
        <div class="info-block-label">Status</div>
        <div class="info-block-value">
          <span class="case-badge badge-${c.status.toLowerCase()}">${c.status}</span>
        </div>
      </div>
    </div>
    <div class="info-block">
      <div class="info-block-label">Classification Tags</div>
      <div class="card-tags" style="margin-top:0.5rem">
        ${c.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </div>
  `;
}

function buildTimeline(c) {
  return `
    <div class="timeline">
      ${c.timeline.map((t, i) => `
        <div class="timeline-item" style="animation-delay:${i * 0.07}s">
          <div class="timeline-time">${t.time}</div>
          <div class="timeline-event">${t.event}</div>
          <div class="timeline-detail">${t.detail}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function buildEvidence(c) {
  return `
    <div class="evidence-list">
      ${c.evidence.map((e, i) => `
        <div class="evidence-item" style="animation:fadeSlide 0.3s ${i * 0.07}s ease both">
          <div class="evidence-icon">${e.icon}</div>
          <div class="evidence-info">
            <div class="evidence-name">${e.name}</div>
            <div class="evidence-desc">${e.desc}</div>
            <div class="evidence-meta">${e.meta}</div>
          </div>
          <div class="evidence-status ${e.status}">
            ${e.status.replace('ev-', '')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function buildSuspects(c) {
  return `
    <div class="suspects-grid">
      ${c.suspects.map((s, i) => `
        <div class="suspect-card" style="animation:fadeSlide 0.3s ${i * 0.1}s ease both">
          <div class="suspect-header">
            <div class="suspect-avatar">${s.avatar}</div>
            <div>
              <div class="suspect-alias">${s.alias}</div>
              <div class="suspect-handle">${s.handle}</div>
            </div>
          </div>
          <div class="suspect-detail">${s.detail}</div>
          <div class="suspect-threat ${s.threat}">
            ${s.threat.replace('threat-', '').toUpperCase()} THREAT
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function buildLogs(c) {
  return `
    <div class="log-terminal">
      ${c.logs.map(l => `
        <span class="log-line">
          <span class="log-ts">[${l.ts}]</span>
          <span class="log-level-${l.level}">[${l.level.toUpperCase()}]</span>
          <span class="log-msg"> ${l.msg}</span>
        </span>
      `).join('')}
    </div>
  `;
}
