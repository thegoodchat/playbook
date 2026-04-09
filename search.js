var SEARCH_INDEX = [
  // HOME
  { page:'index.html', id:'', label:'Home', section:'How to use this playbook', text:'wander pull books flip through whatever sparks joy skim borrow annotate remix no correct route follow what feels useful' },
  { page:'index.html', id:'', label:'Home', section:'Open-source, because gatekeeping is boring', text:'free accessible passed around screenshots copy paste climate uprising open source' },
  { page:'index.html', id:'', label:'Home', section:'Rooted in Southeast Asia', text:'Philippines Thailand Indonesia glocal lived experience languages humor community' },
  { page:'index.html', id:'', label:'Home', section:'FAQs', text:'copy remix overwhelmed outside southeast asia contribute open source free questions' },

  // KOL PATH
  { page:'kol-path.html', id:'s1', label:'KOL Path', section:'Level 1 — Why Energy Now', text:'why energy transition matters now basics jargon guilt context grounded' },
  { page:'kol-path.html', id:'s2', label:'KOL Path', section:'Level 2 — Your Entry Point', text:'creator lens community lifestyle pop culture food gaming your world entry point' },
  { page:'kol-path.html', id:'s3', label:'KOL Path', section:'Level 3 — Starting Conversations', text:'tone framing energy real not preachy not overwhelming audience starting conversations' },
  { page:'kol-path.html', id:'s4', label:'KOL Path', section:'Level 4 — Engaging & Mobilizing', text:'awareness action spark engagement mobilizing community southeast asia connect' },
  { page:'kol-path.html', id:'s5', label:'KOL Path', section:'Level 5 — Scaling Impact', text:'scaling impact momentum collaborate sectors sustain voice long haul conversations last' },

  // CSO PATH
  { page:'cso-path.html', id:'s1', label:'CSO Path', section:'Level 1 — Understanding Context', text:'political social cultural context energy transition southeast asia landscape understand' },
  { page:'cso-path.html', id:'s2', label:'CSO Path', section:'Level 2 — Localizing the Narrative', text:'local narrative climate data street lived experience research stories specific translate' },
  { page:'cso-path.html', id:'s3', label:'CSO Path', section:'Level 3 — Campaign Design', text:'campaign design movement objectives framing channels formats people to act message' },
  { page:'cso-path.html', id:'s4', label:'CSO Path', section:'Level 4 — Building Community', text:'community campaigns relationships allies KOLs institutions amplify cultivating lasting' },
  { page:'cso-path.html', id:'s5', label:'CSO Path', section:'Level 5 — Scaling What Works', text:'scaling cross-border learning replicable models grow impact ground-level truth resonates' }
];

function initSearch() {
  var bar = document.getElementById('search-bar');
  var box = document.getElementById('search-box');
  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  if (!bar) return;

  input.addEventListener('input', function() {
    var q = this.value.trim().toLowerCase();
    results.innerHTML = '';
    if (q.length < 2) { box.style.display='none'; return; }
    var hits = SEARCH_INDEX.filter(function(r) {
      return (r.section + ' ' + r.text + ' ' + r.label).toLowerCase().indexOf(q) > -1;
    });
    if (!hits.length) {
      results.innerHTML = '<div class="sr-empty">No results for "' + escHtml(q) + '"</div>';
      box.style.display = 'block';
      return;
    }
    hits.slice(0, 6).forEach(function(r) {
      var href = r.page + (r.id ? '#' + r.id : '');
      var a = document.createElement('a');
      a.className = 'sr-item';
      a.href = href;
      a.innerHTML =
        '<span class="sr-path">' + escHtml(r.label) + '</span>' +
        '<span class="sr-title">' + escHtml(r.section) + '</span>';
      results.appendChild(a);
    });
    box.style.display = 'block';
  });

  document.addEventListener('click', function(e) {
    if (!bar.contains(e.target)) { box.style.display='none'; input.value=''; }
  });

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { box.style.display='none'; input.value=''; input.blur(); }
  });
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Auto-open a level card if page loaded with a hash
window.addEventListener('DOMContentLoaded', function() {
  initSearch();
  var hash = window.location.hash.replace('#','');
  if (hash) {
    var el = document.getElementById(hash);
    if (el) { el.classList.add('open'); el.scrollIntoView({behavior:'smooth', block:'center'}); }
  }
});
