(() => {
  'use strict';
  const config = window.GRADPIXEL;
  const grid = document.getElementById('game-grid');
  const dialog = document.getElementById('game-dialog');
  const dialogBody = document.getElementById('dialog-body');
  const safeUrl = value => {
    if (typeof value !== 'string' || !value.trim()) return '';
    try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) ? u.href : ''; }
    catch { return ''; }
  };
  const text = (tag, value, className) => { const el = document.createElement(tag); el.textContent = value; if (className) el.className = className; return el; };
  const action = (label, url) => {
    const link = document.createElement('a'); link.href = url; link.textContent = label; link.target = '_blank'; link.rel = 'noopener noreferrer'; return link;
  };
  const statusLabel = status => ({ available: 'Available now', testing: 'In playtesting', 'coming-soon': 'Coming soon' }[status] || 'Coming soon');
  function openGame(game) {
    dialogBody.replaceChildren();
    dialogBody.append(text('div', game.genre, 'game-label'), text('h2', game.title), text('p', game.details || game.description));
    const store = safeUrl(game.storeUrl);
    const test = safeUrl(game.playtestUrl);
    if (store) dialogBody.append(action('View on Google Play ↗', store));
    dialogBody.append(text('span', 'iOS · Coming soon', 'ios-coming-soon'));
    if (game.status === 'testing' && test) dialogBody.append(action('Join this playtest ↗', test));
    if (!store && !test) dialogBody.append(text('p', 'Store and playtest links will appear here when available.', 'no-link'));
    dialog.showModal();
  }
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  config.games.forEach(game => {
    const card = document.createElement('article'); card.className = 'game-card';
    const visual = document.createElement('div'); visual.className = `game-visual ${game.theme === 'symath' ? 'symath' : 'fruitpop'}`;
    const img = document.createElement('img'); img.src = game.image; img.alt = `${game.title} gameplay screenshot`; img.loading = 'lazy'; visual.append(img);
    if (game.status === 'testing') visual.append(text('span', 'PLAYTESTERS WANTED', 'game-badge'));
    const meta = document.createElement('div'); meta.className = 'game-meta';
    meta.append(text('div', `${game.genre} · ${statusLabel(game.status)}`, 'game-label'), text('h3', game.title), text('p', game.description));
    const actions = document.createElement('div'); actions.className = 'game-actions';
    const more = document.createElement('button'); more.type = 'button'; more.textContent = 'Explore game ↗'; more.addEventListener('click', () => openGame(game)); actions.append(more);
    const store = safeUrl(game.storeUrl); const test = safeUrl(game.playtestUrl);
    if (store) actions.append(action('Google Play ↗', store));
    actions.append(text('span', 'iOS · Coming soon', 'ios-coming-soon'));
    if (game.status === 'testing' && test) actions.append(action('Join playtest ↗', test));
    meta.append(actions); card.append(visual, meta); grid.append(card);
  });
  const active = config.games.filter(game => game.status === 'testing' && safeUrl(game.playtestUrl));
  const status = document.getElementById('test-status');
  if (active.length) {
    const notice = text('div', 'Playtesting is open for: ' + active.map(g => g.title).join(', '), 'notice'); status.append(notice);
    document.getElementById('playtesting').classList.add('is-active');
  } else status.textContent = 'No open playtests right now. Check back for upcoming opportunities.';
  const contacts = document.getElementById('contact-actions');
  if (config.contactEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.contactEmail)) {
    const mail = document.createElement('a'); mail.href = `mailto:${config.contactEmail}?subject=GradPixel%20Inquiry`; mail.textContent = 'Email us ↗'; contacts.append(mail);
  }
  (config.socialLinks || []).forEach(item => { const url = safeUrl(item.url); if (url) contacts.append(action(item.label + ' ↗', url)); });
  if (!contacts.children.length) contacts.append(text('span', 'Contact details coming soon.', 'no-link'));
  document.getElementById('year').textContent = new Date().getFullYear();
})();
