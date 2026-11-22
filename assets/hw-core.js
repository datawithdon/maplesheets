// Worksheet engine: shared by every grade and language.
// Each grade's content lives in site/grades/<lang>-<grade>.js and calls HW.register().
// Shared libraries (hw-math.js, hw-lang.js) load first and add themselves to window.HWLIB.
'use strict';
(function () {
  // Grades that have worksheets, per language. Keep in step with app.js and sender/pdf_maker.py (a test checks).
  var AVAILABLE = { en: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], fr: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'] };

  var UI = {
    en: {
      brand: 'MapleSheets', gradeLbl: 'Grade', subject: 'Subject', level: 'Level', sheet: 'Sheet #', dateOn: 'Date on sheet', newSheet: 'New sheet', print: 'Print',
      topics: 'Math topics', all: 'All 4 subjects (8 pages)', allShort: 'All 4 subjects', account: 'My account',
      levels: { easy: 'Easy', medium: 'Medium', hard: 'Hard' }, name: 'Name', date: 'Date', score: 'Score',
      side: function (a, b) { return 'Side ' + a + ' of ' + b; }, sheetNo: 'Sheet #', country: 'Canada',
      readStory: 'Read the story. Then answer the questions.', tf: ['True', 'False'],
      open: 'Answers will vary', keyTitle: 'Answer key', keyFor: 'For parents', keyBox: 'Answer key (last pages)',
      tips: ['Print on both sides of the paper and choose “flip on long edge”.', 'In the print window, turn off “Headers and footers”.',
        'The same Sheet # always gives the same sheet, so you can print it again later.',
        '“Date on sheet” prints the date in the Date box. For Reading, it also picks that school day’s stories.'],
      badSeed: 'Sheet # must be a whole number from 1 to 99999999.', badDate: 'Please pick a date between 2000 and 2100.',
      oneTopic: 'Keep at least one math topic ticked.', loading: 'Loading…',
      cannot: function (m) { return 'Sorry, this sheet could not be made (' + m + '). Try a different Sheet #.'; },
      notReady: 'Worksheets for this grade are coming soon.',
      tooBig: function (n) { return n + ' part(s) of this sheet do not fit on the page. Click “New sheet” to try another one.'; },
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      longDate: function (wd, d, m, y) { return wd + ', ' + m + ' ' + d + ', ' + y; },
      grade: function (g) { return g === '0' ? 'Kindergarten' : 'Grade ' + g; }
    },
    fr: {
      brand: 'Feuilles d’érable', gradeLbl: 'Année', subject: 'Matière', level: 'Niveau', sheet: 'Feuille no', dateOn: 'Date sur la feuille', newSheet: 'Nouvelle feuille', print: 'Imprimer',
      topics: 'Thèmes de maths', all: 'Les 4 matières (8 pages)', allShort: 'Les 4 matières', account: 'Mon compte',
      levels: { easy: 'Facile', medium: 'Moyen', hard: 'Difficile' }, name: 'Nom', date: 'Date', score: 'Résultat',
      side: function (a, b) { return 'Côté ' + a + ' de ' + b; }, sheetNo: 'Feuille no\u00a0', country: 'Québec',
      readStory: 'Lis le texte. Ensuite, réponds aux questions.', tf: ['Vrai', 'Faux'],
      open: 'Réponses variées', keyTitle: 'Corrigé', keyFor: 'Pour les parents', keyBox: 'Corrigé (dernières pages)',
      tips: ['Imprime des deux côtés de la feuille et choisis « retourner sur le bord long ».', 'Dans la fenêtre d’impression, enlève « En-têtes et pieds de page ».',
        'Le même numéro de feuille donne toujours la même feuille.',
        '« Date sur la feuille » écrit la date dans la case Date. En lecture, elle choisit aussi les textes du jour.'],
      badSeed: 'Le numéro de feuille doit être un nombre entier de 1 à 99999999.', badDate: 'Choisis une date entre 2000 et 2100.',
      oneTopic: 'Garde au moins un thème de maths coché.', loading: 'Chargement…',
      cannot: function (m) { return 'Désolé, cette feuille n’a pas pu être créée (' + m + '). Essaie un autre numéro.'; },
      notReady: 'Les feuilles pour ce niveau arrivent bientôt.',
      tooBig: function (n) { return n + ' partie(s) de cette feuille dépassent la page. Clique sur « Nouvelle feuille ».'; },
      months: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
      weekdays: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
      longDate: function (wd, d, m, y) { return wd + ' ' + (d === 1 ? '1er' : d) + ' ' + m + ' ' + y; },
      grade: function (g) {
        var n = Number(g);
        if (n === 0) return 'Maternelle';
        if (n === 1) return '1re année';
        if (n <= 6) return n + 'e année';
        return 'Secondaire ' + (n - 6);
      }
    }
  };
  var LEVEL_IDS = ['easy', 'medium', 'hard'];
  var PER_SIDE = 25, TOTAL = 50;

  function has(obj, key) { return Object.prototype.hasOwnProperty.call(obj, key); }

  // ===================== random numbers =====================
  function fnv1a(str) {
    var h = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    return h >>> 0;
  }
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function ri(R, a, b) { return a + Math.floor(R() * (b - a + 1)); }
  function pick(R, arr) { return arr[Math.floor(R() * arr.length)]; }
  function shuffle(R, arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(R() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function sample(R, arr, n) { return shuffle(R, arr).slice(0, n); }
  function mod(a, n) { return ((a % n) + n) % n; }

  // ===================== html helpers =====================
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  var BL = '<span class="bl"></span>';
  var BLS = '<span class="bl s"></span>';
  var BLL = '<span class="bl l"></span>';
  var BLM = '<span class="bl m"></span>';
  var TIME = '<span class="nw">' + BLS + ' : ' + BLS + '</span>';
  var BOX = '<span class="box"></span>';
  function circ(list) {
    return '<span class="chs">' + list.map(function (c) { return '<span class="ch">' + esc(c) + '</span>'; }).join('') + '</span>';
  }
  function Q(key, html, ans) { return { key: key, html: html, ans: ans }; }
  function an(word) { return (/^[aeiou]/i.test(word) ? 'an ' : 'a ') + word; }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  // ===================== pictures (inline SVG) =====================
  function svg(w, h, inner) {
    return '<svg class="pic" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" aria-hidden="true">' + inner + '</svg>';
  }
  var COINS = {
    5: { r: 12, label: '5¢', fill: '#e6e6e6' },
    10: { r: 10.5, label: '10¢', fill: '#e6e6e6' },
    25: { r: 13.5, label: '25¢', fill: '#e6e6e6' },
    100: { r: 14.5, label: '$1', fill: '#f0d579', sides: 11 },
    200: { r: 15.5, label: '$2', fill: '#e6e6e6', inner: '#f0d579' }
  };
  function coinsSvg(list) {
    var H = 34, x = 1, parts = [];
    list.forEach(function (c) {
      var k = COINS[c], cx = x + k.r, cy = H / 2, s = '';
      if (k.sides) {
        var pts = [];
        for (var i = 0; i < k.sides; i++) {
          var a = -Math.PI / 2 + 2 * Math.PI * i / k.sides;
          pts.push((cx + k.r * Math.cos(a)).toFixed(1) + ',' + (cy + k.r * Math.sin(a)).toFixed(1));
        }
        s += '<polygon points="' + pts.join(' ') + '" fill="' + k.fill + '" stroke="#111" stroke-width="1"/>';
      } else {
        s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + k.r + '" fill="' + k.fill + '" stroke="#111" stroke-width="1"/>';
        if (k.inner) s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (k.r * 0.62).toFixed(1) + '" fill="' + k.inner + '" stroke="#111" stroke-width=".6"/>';
      }
      s += '<text x="' + cx + '" y="' + (cy + 3) + '" font-size="8" font-weight="700" text-anchor="middle" font-family="Arial,sans-serif">' + k.label + '</text>';
      parts.push(s);
      x += 2 * k.r + 4;
    });
    return svg(Math.ceil(x), H, parts.join(''));
  }
  function clockSvg(h, m, hands) {
    var S = 56, c = 28, r = 26, s = '';
    s += '<circle cx="' + c + '" cy="' + c + '" r="' + r + '" fill="#fff" stroke="#111" stroke-width="1.5"/>';
    for (var i = 1; i <= 12; i++) {
      var a = (i * 30 - 90) * Math.PI / 180;
      s += '<text x="' + (c + 19.5 * Math.cos(a)).toFixed(1) + '" y="' + (c + 19.5 * Math.sin(a) + 2.6).toFixed(1) + '" font-size="7.5" text-anchor="middle" font-family="Arial,sans-serif">' + i + '</text>';
      s += '<line x1="' + (c + 24 * Math.cos(a)).toFixed(1) + '" y1="' + (c + 24 * Math.sin(a)).toFixed(1) + '" x2="' + (c + 26 * Math.cos(a)).toFixed(1) + '" y2="' + (c + 26 * Math.sin(a)).toFixed(1) + '" stroke="#111" stroke-width="1"/>';
    }
    if (hands) {
      var ha = ((h % 12) + m / 60) * 30 - 90, ma = m * 6 - 90;
      var hr = ha * Math.PI / 180, mr = ma * Math.PI / 180;
      s += '<line x1="' + c + '" y1="' + c + '" x2="' + (c + 11 * Math.cos(hr)).toFixed(1) + '" y2="' + (c + 11 * Math.sin(hr)).toFixed(1) + '" stroke="#111" stroke-width="2.6" stroke-linecap="round"/>';
      s += '<line x1="' + c + '" y1="' + c + '" x2="' + (c + 17 * Math.cos(mr)).toFixed(1) + '" y2="' + (c + 17 * Math.sin(mr)).toFixed(1) + '" stroke="#111" stroke-width="1.5" stroke-linecap="round"/>';
    }
    s += '<circle cx="' + c + '" cy="' + c + '" r="1.8" fill="#111"/>';
    return svg(S, S, s);
  }
  var DOTS = {
    1: [[0, 0]], 2: [[-1, 0], [1, 0]], 3: [[-1, 1], [0, -1], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
    5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]]
  };
  function groupsSvg(g, n) {
    var D = 28, s = '';
    for (var i = 0; i < g; i++) {
      var cx = 2 + D / 2 + i * (D + 4), cy = D / 2 + 1;
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (D / 2 - 0.5) + '" fill="none" stroke="#111" stroke-width="1"/>';
      DOTS[n].forEach(function (p) {
        s += '<circle cx="' + (cx + p[0] * 6.5) + '" cy="' + (cy + p[1] * 6.5) + '" r="2.4" fill="#111"/>';
      });
    }
    return svg(g * (D + 4) + 2, D + 2, s);
  }
  function fracSvg(shape, n, shaded) {
    var s = '', on = {};
    shaded.forEach(function (i) { on[i] = true; });
    if (shape === 'circle') {
      var c = 19, r = 17;
      for (var i = 0; i < n; i++) {
        var a0 = (-90 + 360 * i / n) * Math.PI / 180, a1 = (-90 + 360 * (i + 1) / n) * Math.PI / 180;
        var x0 = (c + r * Math.cos(a0)).toFixed(2), y0 = (c + r * Math.sin(a0)).toFixed(2);
        var x1 = (c + r * Math.cos(a1)).toFixed(2), y1 = (c + r * Math.sin(a1)).toFixed(2);
        s += '<path d="M' + c + ',' + c + ' L' + x0 + ',' + y0 + ' A' + r + ',' + r + ' 0 0 1 ' + x1 + ',' + y1 + ' Z" fill="' + (on[i] ? '#9a9a9a' : '#fff') + '" stroke="#111" stroke-width="1"/>';
      }
      return svg(38, 38, s);
    }
    var W = shape === 'bar' ? 72 : 38, H = shape === 'bar' ? 26 : 38;
    var vertical = shape === 'bar';
    for (var j = 0; j < n; j++) {
      var x, y, w, h;
      if (vertical) { w = (W - 2) / n; h = H - 2; x = 1 + j * w; y = 1; }
      else { w = W - 2; h = (H - 2) / n; x = 1; y = 1 + j * h; }
      s += '<rect x="' + x.toFixed(2) + '" y="' + y.toFixed(2) + '" width="' + w.toFixed(2) + '" height="' + h.toFixed(2) + '" fill="' + (on[j] ? '#9a9a9a' : '#fff') + '" stroke="#111" stroke-width="1"/>';
    }
    return svg(W, H, s);
  }
  function shapeAt(kind, x, y) {
    var r = 8;
    if (kind === 'circle') return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#fff" stroke="#111" stroke-width="1.3"/>';
    if (kind === 'square') return '<rect x="' + (x - 7.5) + '" y="' + (y - 7.5) + '" width="15" height="15" fill="#9a9a9a" stroke="#111" stroke-width="1.3"/>';
    if (kind === 'triangle') return '<polygon points="' + x + ',' + (y - 8.5) + ' ' + (x + 8.5) + ',' + (y + 7) + ' ' + (x - 8.5) + ',' + (y + 7) + '" fill="#fff" stroke="#111" stroke-width="1.3"/>';
    if (kind === 'diamond') return '<polygon points="' + x + ',' + (y - 9) + ' ' + (x + 7) + ',' + y + ' ' + x + ',' + (y + 9) + ' ' + (x - 7) + ',' + y + '" fill="#9a9a9a" stroke="#111" stroke-width="1.3"/>';
    var pts = [];
    for (var i = 0; i < 10; i++) {
      var a = -Math.PI / 2 + Math.PI * i / 5, rr = i % 2 ? 3.8 : 9;
      pts.push((x + rr * Math.cos(a)).toFixed(1) + ',' + (y + rr * Math.sin(a)).toFixed(1));
    }
    return '<polygon points="' + pts.join(' ') + '" fill="#fff" stroke="#111" stroke-width="1.2"/>';
  }
  function patternSvg(seq) {
    var step = 21, s = '';
    seq.forEach(function (k, i) { s += shapeAt(k, 11 + i * step, 12); });
    var bx = 11 + seq.length * step - 10;
    s += '<rect x="' + bx + '" y="1" width="22" height="22" fill="none" stroke="#111" stroke-width="1" stroke-dasharray="3 2"/>';
    return svg(bx + 24, 24, s);
  }


  // ===================== language-aware helpers for content files =====================
  var lang = 'en';
  function tx(o) { return has(o, lang) ? o[lang] : o.en; }
  // numbers: French uses a comma for decimals; both languages use a thin space for thousands
  function num(x, dp) {
    var s = typeof dp === 'number' ? Number(x).toFixed(dp) : String(x);
    var neg = s.charAt(0) === '-';
    if (neg) s = s.slice(1);
    var parts = s.split('.'), whole = parts[0];
    if (whole.length > 4) whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, '\u2009');  // Canadian style in both languages: 12 345
    var out = whole + (parts[1] !== undefined ? (lang === 'fr' ? ',' : '.') + parts[1] : '');
    return (neg ? '−' : '') + out;
  }
  function money(cents) {
    var v = num(cents / 100, 2);
    return lang === 'fr' ? v + ' $' : '$' + v;
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function ucFirstHtml(s) { return s.replace(/^./, function (c) { return c.toUpperCase(); }); }
  function itemOf(s) { return s.split('|'); }
  function lim(text, n) { return text.length <= n; }

  // Ready-made question kinds that work from short lists of text ("banks").
  // choice bank items: "prompt|right answer|wrong|wrong"  → circle the answer
  function choiceKind(bank, lead, tag) {
    return function (R) {
      var p = itemOf(pick(R, bank));
      var prompt = p[0].indexOf('___') >= 0 ? esc(p[0]).replace('___', BLS) : esc(p[0]);
      return Q((tag || 'c') + ':' + p[0], (lead ? lead + ' ' : '') + prompt + circ(shuffle(R, p.slice(1))), esc(p[1]));
    };
  }
  // blank bank items: "sentence with ___ (hint)|answer" → write the answer on the line
  function blankKind(bank, lead, tag, wide) {
    return function (R) {
      var p = itemOf(pick(R, bank));
      var html = esc(p[0]);
      html = html.indexOf('___') >= 0 ? html.replace('___', wide ? BLM : BL) : html + ' ' + (wide ? BLM : BL);
      return Q((tag || 'b') + ':' + p[0], (lead ? lead + '<br>' : '') + html, esc(p[1]));
    };
  }
  // rewrite bank items: "sentence to fix|corrected sentence" → line underneath
  function lineKind(bank, lead, tag) {
    return function (R) {
      var p = itemOf(pick(R, bank));
      return Q((tag || 'l') + ':' + p[0], lead + ' <i>' + esc(p[0]) + '</i>' + BLL, p[1] ? esc(p[1]) : UI[lang].open);
    };
  }
  // pair bank items: "a|b" → template(a) and a line, e.g. synonyms or past tense.
  // make() returns the question html (the answer is then b), or { html, ans }.
  function pairKind(bank, make, tag) {
    return function (R) {
      var p = itemOf(pick(R, bank)), m = make(p, R);
      return typeof m === 'string' ? Q((tag || 'p') + ':' + p[0], m, esc(p[1])) : Q((tag || 'p') + ':' + p[0], m.html, m.ans);
    };
  }
  // circle-the-odd-one-out style: "a|b|c|d" where the first word is the answer
  function oddKind(bank, lead, tag) {
    return function (R) {
      var p = itemOf(pick(R, bank));
      return Q((tag || 'o') + ':' + p[0], lead + circ(shuffle(R, p)), esc(p[0]));
    };
  }

  var H = {
    has: has, ri: ri, pick: pick, shuffle: shuffle, sample: sample, mod: mod, esc: esc, BL: BL, BLS: BLS, BLL: BLL, BLM: BLM, TIME: TIME, BOX: BOX,
    circ: circ, Q: Q, an: an, pad2: pad2, svg: svg, coinsSvg: coinsSvg, clockSvg: clockSvg, groupsSvg: groupsSvg, fracSvg: fracSvg,
    patternSvg: patternSvg, shapeAt: shapeAt, tx: tx, num: num, money: money, cap: cap, ucFirstHtml: ucFirstHtml, itemOf: itemOf, lim: lim,
    choiceKind: choiceKind, blankKind: blankKind, lineKind: lineKind, pairKind: pairKind, oddKind: oddKind,
    lang: function () { return lang; }, ui: function () { return UI[lang]; }, open: function () { return UI[lang].open; }
  };
  var HW = window.HW = { H: H, AVAILABLE: AVAILABLE };

  // ===================== question picking (no repeats) =====================
  function fillQuestions(groups, L, R) {
    var used = Object.create(null), out = [], n = groups.length;
    groups.forEach(function (kinds, gi) {
      var count = Math.floor(TOTAL / n) + (gi < TOTAL % n ? 1 : 0);
      for (var i = 0; i < count; i++) {
        var k = i % kinds.length, q = null;
        for (var t = 0; t < 400; t++) {
          // after 150 tries, this kind is used up: try the other kinds in the same group
          var kk = k;
          if (t >= 150 && kinds.length > 1) { kk = (k + 1 + Math.floor(R() * (kinds.length - 1))) % kinds.length; }
          var c = kinds[kk](R, L);
          if (!has(used, c.key)) { q = c; break; }
        }
        if (!q) throw new Error('could not make enough different questions');
        used[q.key] = true;
        out.push(q);
      }
    });
    return out;
  }

  // ===================== Reading =====================
  function schoolDayNumber(d) {
    var t = Date.UTC(d.y, d.m - 1, d.d), base = Date.UTC(2026, 0, 5);
    var days = Math.round((t - base) / 864e5), wd = new Date(t).getUTCDay();
    if (wd === 6) days += 2; else if (wd === 0) days += 1;
    var w = Math.floor(days / 7);
    return w * 5 + (days - 7 * w);
  }
  function storyList(subj, L) { return Array.isArray(subj.stories) ? subj.stories : subj.stories[L]; }
  function pickStories(subj, L, date, R, key, start) {
    var list = storyList(subj, L), n = list.length;
    if (n < 2) throw new Error('not enough stories');
    if (start !== null && start !== undefined) return [list[start % n], list[(start + 1) % n]];  // ?story=N: reprint a chosen story
    if (date) {
      var idx = [];
      for (var i = 0; i < n; i++) idx.push(i);
      var order = shuffle(mulberry32(fnv1a('stories|' + key)), idx), k = schoolDayNumber(date);
      return [list[order[mod(2 * k, n)]], list[order[mod(2 * k + 1, n)]]];
    }
    var a = Math.floor(R() * n), b = Math.floor(R() * (n - 1));
    if (b >= a) b++;
    return [list[a], list[b]];
  }
  function readingQuestion(code, R, blanksAsChoices, story) {
    var p = code.split('|');
    if (p[0] === 'T' || p[0] === 'V' || p[0] === 'F') return esc(p[1]) + circ(UI[lang].tf);  // T or V = true (vrai), F = false (faux)
    if (p[0] === 'C') {
      var ch = shuffle(R, p.slice(2).map(function (c) { return c.replace(/\*$/, ''); }));
      return esc(p[1]) + ' ' + circ(ch);
    }
    if (p[0] === 'B') {
      if (blanksAsChoices) {
        var pool = story.q.filter(function (c) { return c.charAt(0) === 'B' && c.split('|')[2] !== p[2]; }).map(function (c) { return c.split('|')[2]; });
        var uniq = pool.filter(function (w, i) { return pool.indexOf(w) === i; });
        return esc(p[1]).replace('____', BLM) + circ(shuffle(R, sample(R, uniq, 2).concat([p[2]])));
      }
      return esc(p[1]).replace('____', BL);
    }
    if (p[0] === 'W') return esc(p[1]) + BLL;  // short written answer
    throw new Error('unknown story question type');
  }
  function storyAnswer(code) {
    var p = code.split('|');
    if (p[0] === 'T' || p[0] === 'V') return UI[lang].tf[0];
    if (p[0] === 'F') return UI[lang].tf[1];
    if (p[0] === 'C') return esc(p.slice(2).filter(function (c) { return /\*$/.test(c); })[0].replace(/\*$/, ''));
    if (p[0] === 'B') return esc(p[2]);
    return UI[lang].open;
  }
  function storySide(subj, story, side, R, L) {
    var paras = story.text.split('\n').map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('');
    var asChoices = !!subj.easyChoices && L === 'easy';
    var items = story.q.map(function (code, i) {
      return '<div class="q"><span class="n">' + (side * PER_SIDE + i + 1) + '.</span><div class="b">' + readingQuestion(code, R, asChoices, story) + '</div></div>';
    }).join('');
    return '<div class="story"><h2 class="story-title">' + esc(story.title) + '</h2>' + paras + '</div>' +
      '<p class="instr">' + esc(subj.instr || UI[lang].readStory) + '</p><div class="grid">' + items + '</div>';
  }

  // ===================== building the sheet =====================
  function isoDate(d) { return d.y + '-' + pad2(d.m) + '-' + pad2(d.d); }
  function longDate(d) {
    var wd = new Date(Date.UTC(d.y, d.m - 1, d.d)).getUTCDay(), u = UI[lang];
    return u.longDate(u.weekdays[wd], d.d, u.months[d.m - 1], d.y);
  }
  function gridSide(qs, side) {
    return '<div class="grid">' + qs.map(function (q, i) {
      return '<div class="q"><span class="n">' + (side * PER_SIDE + i + 1) + '.</span><div class="b">' + q.html + '</div></div>';
    }).join('') + '</div>';
  }
  function pageHtml(subj, st, side, body) {
    var u = UI[lang];
    var footer = [u.brand, u.grade(st.grade) + ' · ' + u.country, subj.name, u.levels[st.level], u.sheetNo + st.seed];
    if (st.date) footer.push(isoDate(st.date));
    if (subj.topics) footer.push(subj.topics.filter(function (t) { return st.topics.indexOf(t.id) >= 0; }).map(function (t) { return t.name; }).join(', '));
    var dateHtml = st.date ? '<b class="dt">' + esc(longDate(st.date)) + '</b>' : '<span class="ln dl"></span>';
    return '<section class="page">' +
      '<header class="hd"><div class="hd1"><h1>' + esc(subj.name) + '</h1><span class="tag">' + esc(u.levels[st.level]) + '</span>' +
      '<span class="side">' + esc(u.side(side + 1, 2)) + '</span></div>' +
      '<div class="hd2"><span>' + esc(u.name) + '</span><span class="ln' + (st.date ? ' nm-s' : '') + '"></span><span>' + esc(u.date) + '</span>' + dateHtml +
      (side === 0 ? '<span class="sc">' + esc(u.score) + ' <span class="sbox"></span> / ' + TOTAL + '</span>' : '') + '</div></header>' +
      '<div class="body ' + subj.css + ' ' + st.level + ' g' + st.grade + (PACK && PACK.id === 'en-2' ? ' legacy' : '') + '">' + body + '</div>' +
      '<footer class="ft">' + esc(footer.join(' · ')) + '</footer></section>';
  }
  function keyPages(st, keys) {
    var u = UI[lang], html = '';
    for (var i = 0; i < keys.length; i += 2) {
      var blocks = keys.slice(i, i + 2).map(function (k) {
        return '<div class="key-block"><h2>' + esc(k.name) + '</h2><ol class="key-list">' +
          k.answers.map(function (a) { return '<li>' + (a === undefined || a === '' ? '—' : a) + '</li>'; }).join('') + '</ol></div>';
      }).join('');
      html += '<section class="page key"><header class="hd"><div class="hd1"><h1>' + esc(u.keyTitle) + '</h1><span class="tag">' + esc(u.levels[st.level]) +
        '</span><span class="side">' + esc(u.keyFor) + '</span></div></header><div class="body keybody">' + blocks + '</div>' +
        '<footer class="ft">' + esc([u.brand, u.grade(st.grade) + ' · ' + u.country, u.levels[st.level], u.sheetNo + st.seed].concat(st.date ? [isoDate(st.date)] : []).join(' · ')) +
        '</footer></section>';
    }
    return html;
  }
  function buildSheet(pack, st) {
    var subjects = st.subject === 'all' ? pack.subjects : pack.subjects.filter(function (s) { return s.id === st.subject; }), html = '';
    var legacy = pack.id === 'en-2';  // keeps every Grade 2 sheet number exactly as it was before other grades existed
    var keys = [];
    subjects.forEach(function (s) {
      var topicsKey = s.topics ? st.topics.join(',') : '-';
      var R = mulberry32(fnv1a(st.seed + '|' + s.id + '|' + st.level + '|' + topicsKey + (legacy ? '' : '|' + pack.id)));
      var sides;
      if (s.stories) {
        var key = st.level + (legacy ? '' : '|' + pack.id);
        var two = pickStories(s, st.level, st.date, R, key, st.story);
        sides = two.map(function (story, i) { return storySide(s, story, i, R, st.level); });
        keys.push({ name: s.name, answers: two[0].q.concat(two[1].q).map(storyAnswer) });
      } else {
        var groups = s.topics ? s.topics.filter(function (t) { return st.topics.indexOf(t.id) >= 0; }).map(function (t) { return t.kinds(st.level); })
          : [s.kinds(st.level)];
        var qs = fillQuestions(groups, st.level, R);
        sides = [gridSide(qs.slice(0, PER_SIDE), 0), gridSide(qs.slice(PER_SIDE), 1)];
        keys.push({ name: s.name, answers: qs.map(function (q) { return q.ans; }) });
      }
      sides.forEach(function (body, i) { html += pageHtml(s, st, i, body); });
    });
    return st.key ? html + keyPages(st, keys) : html;
  }
  function countOverflow(root) {
    var n = 0;
    root.querySelectorAll('.q, .grid, .page').forEach(function (el) {
      if (el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1) { n++; el.classList.add('too-big'); }
    });
    return n;
  }

  // ===================== settings from the address =====================
  function parseDate(s) {
    if (typeof s !== 'string') return null;
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    if (!m) return null;
    var y = Number(m[1]), mo = Number(m[2]), d = Number(m[3]);
    if (y < 2000 || y > 2100) return null;
    var t = new Date(Date.UTC(y, mo - 1, d));
    if (t.getUTCFullYear() !== y || t.getUTCMonth() !== mo - 1 || t.getUTCDate() !== d) return null;
    return { y: y, m: mo, d: d };
  }
  function parseSeed(s) {
    if (typeof s !== 'string' || !/^[0-9]{1,8}$/.test(s)) return null;
    var v = Number(s);
    return v >= 1 && v <= 99999999 ? v : null;
  }
  function randomSeed() { return 10000 + Math.floor(Math.random() * 90000); }
  function params() {
    try { return new URLSearchParams(window.location.search); } catch (e) { return new URLSearchParams(''); }
  }
  function readBasics() {
    var p = params(), st = { lang: 'en', grade: '2' };
    var v = p.get('lang'); if (v === 'fr') st.lang = 'fr';
    v = p.get('grade'); if (v !== null && /^(0|[1-9]|1[0-2])$/.test(v)) st.grade = v;
    return st;
  }
  function readUrl(pack, st) {
    var p = params(), ids = pack.subjects.map(function (s) { return s.id; }).concat(['all']);
    var topicSubj = pack.subjects.filter(function (s) { return s.topics; })[0];
    var topicIds = topicSubj ? topicSubj.topics.map(function (t) { return t.id; }) : [];
    st.subject = pack.subjects[0].id; st.level = 'medium'; st.seed = null; st.date = null; st.topics = topicIds.slice(); st.key = p.get('key') !== '0';
    v = p.get('story'); st.story = v !== null && /^[0-9]{1,3}$/.test(v) ? Number(v) : null;
    var v = p.get('subject'); if (v !== null && ids.indexOf(v) >= 0) st.subject = v;
    v = p.get('level'); if (v !== null && LEVEL_IDS.indexOf(v) >= 0) st.level = v;
    st.seed = parseSeed(p.get('seed'));
    v = p.get('topics');
    if (v !== null && topicIds.length) {
      var parts = v.split(',');
      if (parts.every(function (x) { return topicIds.indexOf(x) >= 0; })) st.topics = topicIds.filter(function (t) { return parts.indexOf(t) >= 0; });
    }
    st.date = parseDate(p.get('date'));
    if (st.seed === null) st.seed = randomSeed();
    return st;
  }

  // ===================== page wiring =====================
  // GitHub Pages can't send a header that stops other sites framing this page, so refuse to run inside a frame.
  try { if (window.top !== window.self) { document.documentElement.hidden = true; return; } } catch (e) { document.documentElement.hidden = true; return; }
  var $ = function (id) { return document.getElementById(id); };
  var state = readBasics(), PACK = null;
  lang = state.lang;
  function fail(text) {
    document.body.setAttribute('data-overflow', 'error');
    var warn = $('warn');
    warn.hidden = false;
    warn.textContent = text;
  }
  function opt(value, label) {
    var o = document.createElement('option');
    o.value = value; o.textContent = label;
    return o;
  }
  function say(text) { $('msg').textContent = text || ''; }
  function topicBoxes() { return Array.prototype.slice.call(document.querySelectorAll('#topicsBox input')); }
  function hasTopics() { return PACK.subjects.some(function (s) { return s.topics; }); }
  function buildControls() {
    var u = UI[lang];
    document.documentElement.lang = lang;
    document.title = PACK.title;
    $('title').textContent = u.grade(state.grade);
    $('account').textContent = u.account;
    $('account').href = lang === 'fr' ? 'app-fr.html' : 'app.html';
    $('home').href = lang === 'fr' ? 'index-fr.html' : 'index.html';
    $('brandName').textContent = u.brand;
    $('lblGrade').textContent = u.gradeLbl;
    var gsel = $('grade');
    gsel.replaceChildren.apply(gsel, AVAILABLE[state.lang].map(function (g) { return opt(g, u.grade(g)); }));
    gsel.value = state.grade;
    gsel.addEventListener('change', function () {
      if (AVAILABLE[state.lang].indexOf(gsel.value) >= 0) window.location.href = gradeLink(gsel.value, state.lang);
    });
    $('langEn').className = lang === 'en' ? 'on' : '';
    $('langFr').className = lang === 'fr' ? 'on' : '';
    [['lblSubject', 'subject'], ['lblLevel', 'level'], ['lblSeed', 'sheet'], ['lblDate', 'dateOn'], ['newSheet', 'newSheet'], ['print', 'print'], ['topicsLegend', 'topics'], ['lblKey', 'keyBox']]
      .forEach(function (x) { $(x[0]).textContent = u[x[1]]; });
    var subj = $('subject');
    subj.replaceChildren.apply(subj, PACK.subjects.map(function (s) { return opt(s.id, s.name); }).concat([opt('all', u.all)]));
    var lev = $('level');
    lev.replaceChildren.apply(lev, LEVEL_IDS.map(function (l) { return opt(l, u.levels[l]); }));
    var box = $('topicList'), ts = PACK.subjects.filter(function (s) { return s.topics; })[0];
    box.replaceChildren();
    if (ts) ts.topics.forEach(function (t) {
      var lab = document.createElement('label'), cb = document.createElement('input');
      cb.type = 'checkbox'; cb.value = t.id; cb.checked = true;
      cb.addEventListener('change', onChange);
      lab.appendChild(cb); lab.appendChild(document.createTextNode(' ' + t.name));
      box.appendChild(lab);
    });
    var tips = $('tips');
    tips.replaceChildren.apply(tips, u.tips.map(function (t) { var li = document.createElement('li'); li.textContent = t; return li; }));
  }
  // Switching grade or language loads a different worksheet file, so it opens a fresh page (keeping the level).
  function gradeLink(g, l) {
    var q = new URLSearchParams({ grade: g });
    if (l === 'fr') q.set('lang', 'fr');
    q.set('level', state.level || 'medium');
    return 'homework.html?' + q.toString();
  }
  function syncControls() {
    $('langEn').href = gradeLink(state.grade, 'en');
    $('langFr').href = gradeLink(AVAILABLE.fr.indexOf(state.grade) >= 0 ? state.grade : AVAILABLE.fr[AVAILABLE.fr.length - 1], 'fr');
    var topicSubj = PACK.subjects.filter(function (s) { return s.topics; })[0];
    $('subject').value = state.subject;
    $('level').value = state.level;
    $('seed').value = String(state.seed);
    $('date').value = state.date ? isoDate(state.date) : '';
    $('key').checked = !!state.key;
    topicBoxes().forEach(function (b) { b.checked = state.topics.indexOf(b.value) >= 0; });
    $('topicsBox').hidden = !(hasTopics() && (state.subject === 'all' || (topicSubj && state.subject === topicSubj.id)));
  }
  function updateUrl() {
    var q = new URLSearchParams();
    q.set('grade', state.grade);
    if (state.lang !== 'en') q.set('lang', state.lang);
    q.set('subject', state.subject); q.set('level', state.level); q.set('seed', String(state.seed));
    if (hasTopics()) q.set('topics', state.topics.join(','));
    if (state.date) q.set('date', isoDate(state.date));
    if (!state.key) q.set('key', '0');
    try { window.history.replaceState(null, '', '?' + q.toString()); } catch (e) { /* some browsers block this for local files */ }
  }
  function render() {
    var main = $('sheet'), warn = $('warn');
    try {
      main.innerHTML = buildSheet(PACK, state);
    } catch (e) {
      main.textContent = '';
      fail(UI[lang].cannot(e && e.message ? e.message : 'unknown error'));
      return;
    }
    var n = countOverflow(main);
    document.body.setAttribute('data-overflow', String(n));
    warn.hidden = n === 0;
    warn.textContent = n > 0 ? UI[lang].tooBig(n) : '';
  }
  function onChange() {
    var u = UI[lang];
    say('');
    var ids = PACK.subjects.map(function (s) { return s.id; }).concat(['all']);
    if (ids.indexOf($('subject').value) >= 0) state.subject = $('subject').value;
    if (LEVEL_IDS.indexOf($('level').value) >= 0) state.level = $('level').value;
    state.key = $('key').checked;
    var seed = parseSeed($('seed').value.trim());
    if (seed === null) { say(u.badSeed); return; }
    state.seed = seed;
    var raw = $('date').value;
    if (raw === '') state.date = null;
    else { var d = parseDate(raw); if (d) state.date = d; else { say(u.badDate); return; } }
    if (hasTopics()) {
      var picked = topicBoxes().filter(function (b) { return b.checked; }).map(function (b) { return b.value; });
      if (picked.length === 0) { say(u.oneTopic); syncControls(); return; }
      state.topics = picked;
    }
    syncControls();
    render();
    updateUrl();
  }
  function start() {
    buildControls();
    readUrl(PACK, state);
    ['subject', 'level', 'seed', 'date', 'key'].forEach(function (id) { $(id).addEventListener('change', onChange); });
    $('newSheet').addEventListener('click', function () { $('seed').value = String(randomSeed()); onChange(); });
    $('print').addEventListener('click', function () { window.print(); });
    $('controls').hidden = false;
    syncControls();
    render();
  }

  // A content file calls this once it has loaded.
  HW.register = function (id, make) {
    if (id !== state.lang + '-' + state.grade || PACK) return;
    try {
      var libs = window.HWLIB || {};
      Object.keys(libs).forEach(function (k) { if (!has(H, k)) H[k] = libs[k](H); });
      var pack = make(H);
      pack.id = id;
      pack.title = pack.title || UI[lang].brand + ' · ' + UI[lang].grade(state.grade);
      pack.subjects.forEach(function (s) { s.css = s.css || (s.stories ? 'reading' : s.id); });
      PACK = pack;
    } catch (e) {
      fail(UI[lang].cannot(e && e.message ? e.message : 'unknown error'));
      return;
    }
    start();
  };

  if (AVAILABLE[state.lang].indexOf(state.grade) < 0) {
    fail(UI[lang].notReady);
  } else {
    var s = document.createElement('script');
    s.src = 'grades/' + state.lang + '-' + state.grade + '.js';
    s.onerror = function () { fail(UI[lang].cannot('missing file')); };
    document.head.appendChild(s);
  }
})();
