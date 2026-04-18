/* ============================================================
   js/render.js — Card Rendering & Filter Logic
   ============================================================ */

let currentFilter = 'all';

/**
 * Renders case cards to the grid based on the active filter.
 * @param {string} filter - 'all' | 'OPEN' | 'CLOSED' | 'CLASSIFIED'
 */
function renderCases(filter) {
  const grid = document.getElementById('casesGrid');
  const filtered = filter === 'all'
    ? CASES
    : CASES.filter(c => c.status === filter);

  document.getElementById('visibleCount').textContent = filtered.length;

  grid.innerHTML = filtered.map((c, i) => `
    <div
      class="case-card"
      style="animation: fadeSlide 0.4s ${i * 0.08}s ease both"
      onclick="openCase('${c.id}')"
    >
      <div class="card-header">
        <div>
          <div class="case-id">${c.id} // ${c.category.toUpperCase()}</div>
          <div class="case-title">${c.title}</div>
        </div>
        <div class="case-badge badge-${c.status.toLowerCase()}">${c.status}</div>
      </div>

      <div class="card-body">
        <div class="case-desc">${c.desc}</div>
        <div class="case-meta">
          <div class="meta-item">
            <span class="meta-label">DATE OPENED</span>
            <span class="meta-value">${c.date}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">LEAD AGENT</span>
            <span class="meta-value">${c.lead}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">SEVERITY</span>
            <span class="meta-value">${c.severity}/100</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">SUSPECTS</span>
            <span class="meta-value">${c.suspects.length} IDENTIFIED</span>
          </div>
        </div>
        <div class="card-tags">
          ${c.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>

      <div class="card-footer">
        <div class="evidence-pills">
          <span class="pill">📁 ${c.evidence.length} FILES</span>
          <span class="pill">📋 ${c.timeline.length} EVENTS</span>
        </div>
        <button class="view-btn">VIEW FILE →</button>
      </div>
    </div>
  `).join('');
}

/**
 * Filters the case grid and updates active filter button.
 * @param {string} filter
 * @param {HTMLElement} btn
 */
function filterCases(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCases(filter);
}
