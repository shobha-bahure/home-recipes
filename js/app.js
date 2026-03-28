// ============================================================
// Shobha Tai's Kitchen — app.js
// ============================================================

// ---- CONFIGURATION ----------------------------------------
// Change the password below, then re-deploy to GitHub Pages.
const CONFIG = {
  password:    'shobhatai',
  name_en:     "Shobha Tai's Kitchen",
  name_mr:     'शोभा ताईचे स्वयंपाकघर',
  author_en:   'The Recipe Collection of Shobha Bahure',
  author_mr:   'शोभा बहुरे यांचा रेसिपी संग्रह',
  footer_en:   "Shobha Bahure\u2019s recipes, preserved with love \u00b7 76 recipes",
  footer_mr:   '\u0936\u094b\u092d\u093e \u092c\u0939\u0941\u0930\u0947 \u092f\u093e\u0902\u091a\u094d\u092f\u093e \u0930\u0947\u0938\u093f\u092a\u0940, \u092a\u094d\u0930\u0947\u092e\u093e\u0928\u0947 \u091c\u092a\u0932\u0947\u0932\u094d\u092f\u093e \u00b7 \u0037\u0036 \u0930\u0947\u0938\u093f\u092a\u0940',
};

const CATEGORIES = [
  { id: 'masalas',      icon: '\uD83C\uDF36\uFE0F', en: 'Masalas & Spice Mixes',    mr: '\u092e\u0938\u093e\u0932\u0947 \u0935 \u0938\u094d\u092a\u093e\u0907\u0938 \u092e\u093f\u0915\u094d\u0938',       match: 'Masalas & Spice Mixes' },
  { id: 'chutneys',     icon: '\uD83E\uDD6D', en: 'Chutneys & Condiments',     mr: '\u091a\u091f\u0923\u094d\u092f\u093e \u0935 \u0915\u094b\u0902\u0921\u093f\u092e\u0947\u0902\u091f\u094d\u0938',        match: 'Chutneys & Condiments' },
  { id: 'rice',         icon: '\uD83C\uDF5A', en: 'Rice Dishes',                mr: '\u092d\u093e\u0924\u093e\u091a\u0947 \u092a\u0926\u093e\u0930\u094d\u0925',               match: 'Rice Dishes' },
  { id: 'batters',      icon: '\uD83E\uDD5E', en: 'Batters & Dosas',            mr: '\u0921\u094b\u0938\u093e \u0935 \u092a\u093f\u0920\u0947',                 match: 'Batters & Dosas' },
  { id: 'snacks',       icon: '\uD83E\uDD68', en: 'Snacks & Street Food',       mr: '\u0928\u093e\u0937\u094d\u091f\u093e \u0935 \u0938\u094d\u091f\u094d\u0930\u0940\u091f \u092b\u0942\u0921',          match: 'Snacks & Street Food' },
  { id: 'breads',       icon: '\uD83E\uDED3', en: 'Breads & Rotis',             mr: '\u092d\u093e\u0915\u0930\u0940 \u0935 \u092a\u094b\u0933\u0940',                match: 'Breads & Rotis' },
  { id: 'south-indian', icon: '\uD83C\uDF5B', en: 'South Indian Specialties',  mr: '\u0926\u0915\u094d\u0937\u093f\u0923 \u092d\u093e\u0930\u0924\u0940\u092f \u0935\u093f\u0936\u0947\u0937',         match: 'South Indian Specialties' },
  { id: 'health',       icon: '\uD83C\uDF3E', en: 'Health Mixes & Diet Plans', mr: '\u0906\u0930\u094b\u0917\u094d\u092f\u0926\u093e\u092f\u0940 \u092e\u093f\u0936\u094d\u0930\u0923\u0947 \u0935 \u0906\u0939\u093e\u0930', match: 'Health Mixes & Diet Plans' },
  { id: 'sweets',       icon: '\uD83C\uDF70', en: 'Sweets & Desserts',         mr: '\u0917\u094b\u0921 \u092a\u0926\u093e\u0930\u094d\u0925',                  match: 'Sweets & Desserts' },
  { id: 'curries',      icon: '\uD83C\uDF72', en: 'Curries & Gravies',         mr: '\u092d\u093e\u091c\u094d\u092f\u093e \u0935 \u0917\u094d\u0930\u0947\u0935\u094d\u0939\u0940',               match: 'Curries & Gravies' },
];

// ---- TAGS -------------------------------------------------
// Add recipe IDs here to tag them. No JSON files need changing.
const TAGS = [
  {
    id: 'breakfast', icon: '\uD83C\uDF05', en: 'Breakfast', mr: '\u0928\u093e\u0937\u094d\u091f\u093e',
    ids: ['015','050','051','052','053','054','055','056','061','064','058','059','060','066']
  },
  {
    id: 'dinner', icon: '\uD83C\uDF19', en: 'Dinner', mr: '\u0930\u093e\u0924\u094d\u0930\u0940\u091a\u0947 \u091c\u0947\u0935\u0923',
    ids: ['038','039','040','041','042','043','044','045','046','047','057','063','073','074','075','076']
  },
  {
    id: 'kids', icon: '\u2B50', en: 'Kids Favourites', mr: '\u092e\u0941\u0932\u093e\u0902\u091a\u0947 \u0906\u0935\u0921\u0924\u0947',
    ids: ['011','019','067','068','069','070','071','072']
  },
  {
    id: 'easy', icon: '\u26A1', en: 'Quick & Easy', mr: '\u0938\u094b\u092a\u0947 \u0935 \u091c\u0932\u0926',
    ids: ['057','064','065','072','014','017','020','021','023']
  },
];

// ---- STATE ------------------------------------------------
let lang = localStorage.getItem('lang') || 'en';

// ---- BOOT -------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('auth') === '1') {
    launchApp();
  } else {
    showGate();
  }
});

// ---- GATE -------------------------------------------------
function showGate() {
  document.getElementById('gate').style.display = 'flex';
  document.getElementById('app').style.display  = 'none';
  setTimeout(() => document.getElementById('gate-pwd').focus(), 50);

  document.getElementById('gate-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const pwd = document.getElementById('gate-pwd').value;
    if (pwd === CONFIG.password) {
      sessionStorage.setItem('auth', '1');
      document.getElementById('gate').style.display = 'none';
      launchApp();
    } else {
      document.getElementById('gate-err').textContent = 'Incorrect password. Please try again.';
      document.getElementById('gate-pwd').value = '';
      document.getElementById('gate-pwd').focus();
    }
  });
}

// ---- APP --------------------------------------------------
function launchApp() {
  document.getElementById('app').style.display = 'block';

  document.getElementById('lang-btn').addEventListener('click', () => {
    lang = lang === 'en' ? 'mr' : 'en';
    localStorage.setItem('lang', lang);
    applyLang();
    route();
  });

  let searchTimer;
  document.getElementById('search-input').addEventListener('input', function () {
    clearTimeout(searchTimer);
    const q = this.value.trim();
    searchTimer = setTimeout(() => {
      if (q.length >= 2) {
        window.location.hash = '#search/' + encodeURIComponent(q);
      } else if (q.length === 0 && window.location.hash.startsWith('#search')) {
        window.location.hash = '#';
      }
    }, 280);
  });

  window.addEventListener('hashchange', route);
  applyLang();
  route();
}

function applyLang() {
  const e = lang === 'en';
  document.documentElement.lang = lang;
  document.getElementById('site-title').textContent  = CONFIG[e ? 'name_en' : 'name_mr'];
  document.getElementById('lang-btn').textContent    = e ? '\u092e\u0930\u093e\u0920\u0940' : 'English';
  document.getElementById('search-input').placeholder = e ? 'Search recipes\u2026' : '\u0930\u0947\u0938\u093f\u092a\u0940 \u0936\u094b\u0927\u093e\u2026';
  document.getElementById('footer-text').textContent  = CONFIG[e ? 'footer_en' : 'footer_mr'];
}

// ---- ROUTING ----------------------------------------------
function route() {
  const h = window.location.hash;
  if      (h.startsWith('#recipe/'))   renderRecipe(h.slice(8));
  else if (h.startsWith('#category/')) renderCategory(h.slice(10));
  else if (h.startsWith('#tag/'))      renderTag(h.slice(5));
  else if (h.startsWith('#search/'))   renderSearch(decodeURIComponent(h.slice(8)));
  else                                  renderHome();
}

// ---- HOME -------------------------------------------------
function renderHome() {
  const e = lang === 'en';
  const cats = CATEGORIES.map(cat => {
    const n = RECIPES.filter(r => r.category === cat.match).length;
    return '<a href="#category/' + cat.id + '" class="cat-card">' +
      '<span class="cat-icon">' + cat.icon + '</span>' +
      '<span class="cat-name">' + esc(e ? cat.en : cat.mr) + '</span>' +
      '<span class="cat-count">' + n + ' ' + (e ? 'recipes' : '\u0930\u0947\u0938\u093f\u092a\u0940') + '</span>' +
      '</a>';
  }).join('');

  const tagLabel = e ? 'Browse by' : '\u092b\u093f\u0932\u094d\u091f\u0930';
  const tags = TAGS.map(t =>
    '<a href="#tag/' + t.id + '" class="tag-pill">' +
      t.icon + ' ' + esc(e ? t.en : t.mr) +
    '</a>'
  ).join('');

  setMain(
    '<div class="home">' +
      '<div class="hero">' +
        '<h1>' + esc(CONFIG[e ? 'name_en' : 'name_mr']) + '</h1>' +
        '<p>' + esc(CONFIG[e ? 'author_en' : 'author_mr']) + '</p>' +
      '</div>' +
      '<div class="tag-row"><span class="tag-label">' + tagLabel + ':</span>' + tags + '</div>' +
      '<div class="cat-grid">' + cats + '</div>' +
    '</div>'
  );
}

// ---- CATEGORY ---------------------------------------------
function renderCategory(catId) {
  const cat = CATEGORIES.find(c => c.id === catId);
  if (!cat) return renderHome();
  const e = lang === 'en';
  const recipes = RECIPES.filter(r => r.category === cat.match);
  const cards = recipes.map(r => recipeCard(r, e, cat)).join('');

  setMain(
    '<div class="page">' +
      breadcrumb([
        { href: '#', label: e ? 'Home' : '\u092e\u0941\u0916\u092a\u0943\u0937\u094d\u0920' },
        { label: e ? cat.en : cat.mr }
      ]) +
      '<h2 class="page-title">' + cat.icon + ' ' + esc(e ? cat.en : cat.mr) + '</h2>' +
      '<div class="recipe-grid">' + cards + '</div>' +
    '</div>'
  );
}

// ---- TAG --------------------------------------------------
function renderTag(tagId) {
  const tag = TAGS.find(t => t.id === tagId);
  if (!tag) return renderHome();
  const e = lang === 'en';
  const recipes = RECIPES.filter(r => tag.ids.includes(r.id));
  const cards = recipes.map(r => {
    const cat = CATEGORIES.find(c => c.match === r.category);
    return recipeCard(r, e, cat);
  }).join('');

  setMain(
    '<div class="page">' +
      breadcrumb([
        { href: '#', label: e ? 'Home' : '\u092e\u0941\u0916\u092a\u0943\u0937\u094d\u0920' },
        { label: tag.icon + ' ' + (e ? tag.en : tag.mr) }
      ]) +
      '<h2 class="page-title">' + tag.icon + ' ' + esc(e ? tag.en : tag.mr) + '</h2>' +
      '<div class="recipe-grid">' + cards + '</div>' +
    '</div>'
  );
}

// ---- RECIPE -----------------------------------------------
function renderRecipe(id) {
  const r = RECIPES.find(x => x.id === id);
  if (!r) return renderHome();
  const e = lang === 'en';
  const cat = CATEGORIES.find(c => c.match === r.category);

  const title  = r[e ? 'title_en'  : 'title_mr']  || '';
  const method = r[e ? 'method_en' : 'method_mr'] || '';
  const notes  = r[e ? 'notes_en'  : 'notes_mr']  || '';
  const story  = r[e ? 'story_en'  : 'story_mr']  || '';

  const ingRows = (r.ingredients || []).map(i => {
    const qty = [i.quantity, i.unit].filter(Boolean).join('\u00a0');
    return '<tr><td>' + esc(i[e ? 'item_en' : 'item_mr'] || '') + '</td><td>' + esc(qty) + '</td></tr>';
  }).join('');

  const storyHtml = (story && !story.startsWith('['))
    ? '<blockquote class="recipe-story">' + esc(story) + '</blockquote>' : '';

  const notesHtml = (notes && !notes.startsWith('['))
    ? '<div class="recipe-notes"><strong>' + (e ? 'Notes' : '\u091f\u0940\u092a') + ':</strong> ' + esc(notes) + '</div>' : '';

  setMain(
    '<div class="page recipe-page">' +
      breadcrumb([
        { href: '#', label: e ? 'Home' : '\u092e\u0941\u0916\u092a\u0943\u0937\u094d\u0920' },
        { href: cat ? '#category/' + cat.id : '#', label: cat ? (e ? cat.en : cat.mr) : r.category },
        { label: title }
      ]) +
      storyHtml +
      '<h2 class="recipe-title">' + esc(title) + '</h2>' +
      (r.serves ? '<p class="recipe-serves">' + (e ? 'Makes\u00a0/\u00a0Serves' : '\u092c\u0928\u0924\u0947\u00a0/\u00a0\u091c\u0947\u0935\u0923') + ': ' + esc(r.serves) + '</p>' : '') +
      '<h3>' + (e ? 'Ingredients' : '\u0938\u093e\u0939\u093f\u0924\u094d\u092f') + '</h3>' +
      '<table class="ing-table">' +
        '<thead><tr>' +
          '<th>' + (e ? 'Ingredient' : '\u0938\u093e\u0939\u093f\u0924\u094d\u092f') + '</th>' +
          '<th>' + (e ? 'Quantity'   : '\u092a\u094d\u0930\u092e\u093e\u0923') + '</th>' +
        '</tr></thead>' +
        '<tbody>' + ingRows + '</tbody>' +
      '</table>' +
      '<h3>' + (e ? 'Method' : '\u0915\u0943\u0924\u0940') + '</h3>' +
      '<div class="method">' + formatMethod(method) + '</div>' +
      notesHtml +
      '<p class="recipe-id">Recipe #' + r.id + '</p>' +
    '</div>'
  );

  window.scrollTo(0, 0);
}

// ---- SEARCH -----------------------------------------------
function renderSearch(q) {
  if (!q) return renderHome();
  const e = lang === 'en';
  const ql = q.toLowerCase();

  const results = RECIPES.filter(r =>
    (r.title_en || '').toLowerCase().includes(ql) ||
    (r.title_mr || '').includes(q) ||
    (r.method_en || '').toLowerCase().includes(ql) ||
    (r.ingredients || []).some(i =>
      (i.item_en || '').toLowerCase().includes(ql) ||
      (i.item_mr || '').includes(q)
    )
  );

  const cards = results.length
    ? results.map(r => {
        const cat = CATEGORIES.find(c => c.match === r.category);
        return recipeCard(r, e, cat);
      }).join('')
    : '<p class="empty">' + (e ? 'No recipes found.' : '\u0915\u094b\u0923\u0924\u0940\u0939\u0940 \u0930\u0947\u0938\u093f\u092a\u0940 \u0938\u093e\u092a\u0921\u0932\u0940 \u0928\u093e\u0939\u0940.') + '</p>';

  const countLabel = e
    ? results.length + ' result' + (results.length !== 1 ? 's' : '') + ' for &ldquo;' + esc(q) + '&rdquo;'
    : '&ldquo;' + esc(q) + '&rdquo; \u0938\u093e\u0920\u0940 ' + results.length + ' \u0930\u0947\u0938\u093f\u092a\u0940';

  setMain(
    '<div class="page">' +
      breadcrumb([
        { href: '#', label: e ? 'Home' : '\u092e\u0941\u0916\u092a\u0943\u0937\u094d\u0920' },
        { label: e ? 'Search' : '\u0936\u094b\u0927' }
      ]) +
      '<h2 class="page-title">' + countLabel + '</h2>' +
      '<div class="recipe-grid">' + cards + '</div>' +
    '</div>'
  );
}

// ---- HELPERS ----------------------------------------------
function setMain(html) {
  document.getElementById('main').innerHTML = html;
}

function recipeCard(r, e, cat) {
  const title = r[e ? 'title_en' : 'title_mr'] || '';
  const sub   = cat ? (e ? cat.en : cat.mr) : r.category;
  const n     = (r.ingredients || []).length;
  return '<a href="#recipe/' + r.id + '" class="recipe-card">' +
    '<div class="rc-body">' +
      '<h3>' + esc(title) + '</h3>' +
      '<p class="rc-cat">' + esc(sub) + '</p>' +
      '<p class="rc-meta">' + n + ' ' + (e ? 'ingredients' : '\u0938\u093e\u0939\u093f\u0924\u094d\u092f') + '</p>' +
    '</div>' +
    '</a>';
}

function breadcrumb(items) {
  return '<nav class="breadcrumb">' +
    items.map((item, i) => {
      const last = i === items.length - 1;
      const label = esc(item.label);
      const el = (item.href && !last)
        ? '<a href="' + item.href + '">' + label + '</a>'
        : '<span>' + label + '</span>';
      return (i > 0 ? '<span class="sep">\u203a</span>' : '') + el;
    }).join('') +
    '</nav>';
}

function formatMethod(text) {
  if (!text) return '';
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length > 1) {
    return '<ol>' + lines.map(l => '<li>' + esc(l) + '</li>').join('') + '</ol>';
  }
  return '<p>' + esc(text) + '</p>';
}

function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
