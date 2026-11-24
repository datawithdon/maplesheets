// Math question makers for every grade, in English and French.
// Each maker takes settings and returns a question kind: function (R, L) → { key, html }.
// Settings can be one value for all levels or { easy: …, medium: …, hard: … }.
'use strict';
window.HWLIB = window.HWLIB || {};
window.HWLIB.M = function (H) {
  var ri = H.ri, pick = H.pick, shuffle = H.shuffle, sample = H.sample, esc = H.esc, circ = H.circ, Q = H.Q, tx = H.tx, num = H.num;
  var BL = H.BL, BLS = H.BLS, BLM = H.BLM, BLL = H.BLL, BOX = H.BOX, TIME = H.TIME, svg = H.svg;
  var fr = H.lang() === 'fr', us = H.country() === 'us';

  function lv(o, L) { return o && typeof o === 'object' && !Array.isArray(o) && ('easy' in o || 'medium' in o || 'hard' in o) ? o[L] : o; }
  function T(en, f) { return fr ? f : en; }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
  function lcm(a, b) { return a / gcd(a, b) * b; }
  function n(x, dp) { return num(x, dp); }
  var PCT = fr ? '\u00a0%' : '%';
  function sn(x) { return x < 0 ? '(' + n(x) + ')' : n(x); }          // signed number inside an expression
  function F(a, b) { return '<span class="frac"><span>' + a + '</span><span>' + b + '</span></span>'; }
  function FB() { return F(BLS, BLS); }                               // blank fraction
  function mixed(w, a, b) { return (w ? w + ' ' : '') + F(a, b); }
  function nz(R, a, b) { var v; do { v = ri(R, a, b); } while (v === 0); return v; }
  function round(x, dp) { var p = Math.pow(10, dp); return Math.round(x * p) / p; }
  function coef(c, v, first) {                                          // 3x, −x, + 2x …
    var s = c < 0 ? (first ? '−' : ' − ') : (first ? '' : ' + '), a = Math.abs(c);
    return s + (a === 1 && v ? '' : a) + (v || '');
  }
  function poly(cs, v) {                                                // [a, b, c] → ax² + bx + c
    var deg = cs.length - 1, out = '', first = true;
    cs.forEach(function (c, i) {
      if (!c) return;
      var p = deg - i, vv = p === 0 ? '' : p === 1 ? v : v + '<sup>' + p + '</sup>';
      out += coef(c, vv, first); first = false;
    });
    return out || '0';
  }
  function lin(m, b, v) { return poly([m, b], v || 'x'); }

  // ---------- helpers for the answer key ----------
  function rf(a, b) { if (b < 0) { a = -a; b = -b; } var g = gcd(a, b) || 1; return [a / g, b / g]; }
  function fop(x, op, y) {
    var a = x[0], b = x[1], c = y[0], d = y[1];
    if (op === '+') return rf(a * d + c * b, b * d);
    if (op === '-') return rf(a * d - c * b, b * d);
    if (op === 'x') return rf(a * c, b * d);
    return rf(a * d, b * c);
  }
  function fshow(f, asMixed) {
    var s = f[0] < 0 ? '−' : '', a = Math.abs(f[0]), b = f[1];
    if (b === 1) return s + a;
    if (asMixed && a > b) return s + Math.floor(a / b) + ' ' + F(a % b, b);
    return s + F(a, b);
  }
  function fterm(f, v, first) {                                        // a fraction times x, inside an expression
    if (f[1] === 1) return coef(f[0], v, first);
    return (f[0] < 0 ? (first ? '−' : ' − ') : (first ? '' : ' + ')) + F(Math.abs(f[0]), f[1]) + (v || '');
  }
  function cmpSign(x, y) { return x < y ? '&lt;' : x > y ? '&gt;' : '='; }
  function both(a, b) { return a + T(' and ', ' et ') + b; }
  function factorsOf(k) { var out = []; for (var i = 1; i <= k; i++) if (k % i === 0) out.push(i); return out; }
  function factorial(k) { var f = 1; for (var i = 2; i <= k; i++) f *= i; return f; }
  function expanded(s, dp) {
    var d = s.length, terms = [];
    for (var i = 0; i < d; i++) {
      var dig = Number(s.charAt(i)), pos = d - 1 - i - dp;
      if (dig) terms.push(n(round(dig * Math.pow(10, pos), 6), pos < 0 ? -pos : undefined));
    }
    return terms.join(' + ');
  }
  function radStr(d) { var g = gcd(d, 180), a = d / g, b = 180 / g; return (a === 1 ? '' : a) + 'π' + (b === 1 ? '' : '/' + b); }
  function median(list) { var s = list.slice().sort(function (x, y) { return x - y; }), m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; }
  function modes(list) {
    var c = {}, best = 0;
    list.forEach(function (v) { c[v] = (c[v] || 0) + 1; best = Math.max(best, c[v]); });
    return Object.keys(c).filter(function (v) { return c[v] === best; }).map(Number).sort(function (x, y) { return x - y; });
  }
  var SHAPE_NAMES = { circle: ['circle', 'cercle'], square: ['square', 'carré'], triangle: ['triangle', 'triangle'], star: ['star', 'étoile'], diamond: ['diamond', 'losange'] };
  function shapeName(k) { return SHAPE_NAMES[k][fr ? 1 : 0]; }

  var NAMES = ['Aiden', 'Priya', 'Mei', 'Omar', 'Zara', 'Liam', 'Amara', 'Kenji', 'Sofia', 'Mateo', 'Fatima', 'Noah', 'Aaliyah', 'Arjun', 'Chloé', 'Kwame',
    'Leila', 'Ethan', 'Nia', 'Hiro', 'Ava', 'Yusuf', 'Isla', 'Tenzin', 'Maya', 'Jamal', 'Élodie', 'Ravi', 'Ana', 'Malik', 'Grace', 'Lucas', 'Félix', 'Rosalie'];
  var ITEMS = fr ? ['pommes', 'autocollants', 'crayons', 'billes', 'livres', 'biscuits', 'coquillages', 'cartes', 'perles', 'glands', 'raisins', 'ballons', 'boutons', 'roches']
    : ['apples', 'stickers', 'crayons', 'marbles', 'books', 'cookies', 'shells', 'cards', 'beads', 'acorns', 'grapes', 'balloons', 'buttons', 'rocks'];
  var BOXES = fr ? ['boîtes', 'sacs', 'paniers', 'rangées', 'équipes'] : ['boxes', 'bags', 'baskets', 'rows', 'teams'];

  // ---------- counting and number sense ----------
  function dotsSvg(k) {
    var s = '', per = 5, r = 4.2, gap = 11;
    for (var i = 0; i < k; i++) {
      var row = Math.floor(i / per), col = i % per, block = Math.floor(row / 2);
      s += '<circle cx="' + (7 + col * gap + (col >= 5 ? 4 : 0)) + '" cy="' + (7 + row * gap + block * 3) + '" r="' + r + '" fill="#111"/>';
    }
    var rows = Math.ceil(k / per);
    return svg(7 + per * gap, 4 + rows * gap + Math.floor((rows - 1) / 2) * 3, s);
  }
  function count(max) {
    return function (R, L) {
      var k = ri(R, 1, lv(max, L));
      return Q('cnt:' + k, '<div class="row">' + dotsSvg(k) + '<span>' + T('How many dots?', 'Combien de points?') + '<br>' + BLS + '</span></div>', n(k));
    };
  }
  var WORDS = {
    en: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
      'seventeen', 'eighteen', 'nineteen', 'twenty'],
    fr: ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize',
      'dix-sept', 'dix-huit', 'dix-neuf', 'vingt']
  };
  function numWord(max) {
    return function (R, L) {
      var k = ri(R, 0, lv(max, L)), w = WORDS[fr ? 'fr' : 'en'];
      if (R() < 0.5) return Q('nw:' + k, T('Write the number:', 'Écris le nombre :') + ' <b>' + w[k] + '</b> = ' + BLS, n(k));
      var pool = []; for (var i = 0; i <= lv(max, L); i++) if (i !== k) pool.push(i);
      return Q('nw:' + k, T('Circle the word for', 'Encercle le mot pour') + ' <b>' + k + '</b>:' + circ(shuffle(R, sample(R, pool, 2).concat([k]).map(function (x) { return w[x]; }))), w[k]);
    };
  }
  function bigger(max) {
    return function (R, L) {
      var a = ri(R, 0, lv(max, L)), b; do { b = ri(R, 0, lv(max, L)); } while (b === a);
      var small = R() < 0.35;
      return Q('bg:' + Math.min(a, b) + ':' + Math.max(a, b) + small, T('Circle the ' + (small ? 'smaller' : 'bigger') + ' number:', 'Encercle le plus ' + (small ? 'petit' : 'grand') + ' nombre :') + circ([a, b]), n(small ? Math.min(a, b) : Math.max(a, b)));
    };
  }
  function compare(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), a, b, sa, sb, dp = c.dp || 0;
      if (c.frac) {
        var d1 = ri(R, 2, c.frac), d2 = ri(R, 2, c.frac), n1 = ri(R, 1, d1 - 1), n2 = ri(R, 1, d2 - 1);
        if (R() < 0.15) { n2 = n1 * 2; d2 = d1 * 2; }
        return Q('cf:' + n1 + '/' + d1 + ':' + n2 + '/' + d2, T('Write &lt;, &gt; or =:', 'Écris &lt;, &gt; ou = :') + ' &nbsp;' + F(n1, d1) + ' ' + BOX + ' ' + F(n2, d2), cmpSign(n1 * d2, n2 * d1));
      }
      var lo = c.neg ? -c.max : 0, p = Math.pow(10, dp);
      a = ri(R, lo * p, c.max * p) / p;
      if (R() < 0.12) b = a; else if (dp && R() < 0.5) b = round(a + nz(R, -9, 9) / p, dp); else { do { b = ri(R, lo * p, c.max * p) / p; } while (b === a); }
      sa = n(a, dp || undefined); sb = n(b, dp || undefined);
      if (dp && R() < 0.4) { sb = n(b, Math.max(1, dp - 1)); b = Number(b.toFixed(Math.max(1, dp - 1))); }
      return Q('cmp:' + a + ':' + b, T('Write &lt;, &gt; or =:', 'Écris &lt;, &gt; ou = :') + ' &nbsp;' + sa + ' ' + BOX + ' ' + sb, cmpSign(a, b));
    };
  }
  function beforeAfter(max) {
    return function (R, L) {
      var m = lv(max, L), t = pick(R, ['before', 'after', 'between']), k;
      if (t === 'before') { k = ri(R, 1, m); return Q('ba:' + t + k, T('What number comes just before ', 'Quel nombre vient juste avant ') + n(k) + '? ' + BLS, n(k - 1)); }
      if (t === 'after') { k = ri(R, 0, m - 1); return Q('ba:' + t + k, T('What number comes just after ', 'Quel nombre vient juste après ') + n(k) + '? ' + BLS, n(k + 1)); }
      k = ri(R, 1, m - 1);
      return Q('ba:' + t + k, T('What number is between ', 'Quel nombre est entre ') + n(k - 1) + T(' and ', ' et ') + n(k + 1) + '? ' + BLS, n(k));
    };
  }
  function skip(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), step = pick(R, c.steps), back = !!c.back && R() < 0.35;
      var start = step * ri(R, 0, Math.max(0, Math.floor((c.max - 4 * step) / step)));
      var seq = [0, 1, 2, 3, 4].map(function (i) { return start + i * step; });
      if (back) seq.reverse();
      var blanks = sample(R, [1, 2, 3, 4], 2);
      return Q('sk:' + step + ':' + seq[0] + back, T('Count ' + (back ? 'back ' : '') + 'by ' + step + 's:', 'Compte ' + (back ? 'à rebours ' : '') + 'par bonds de ' + step + ' :') + '<br>' +
        seq.map(function (v, i) { return blanks.indexOf(i) >= 0 ? BLS : n(v); }).join(', '), blanks.slice().sort().map(function (i) { return n(seq[i]); }).join(', '));
    };
  }
  function order(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), k = c.k || 3, desc = !!c.desc && R() < 0.4, nums = [], dp = c.dp || 0, p = Math.pow(10, dp);
      while (nums.length < k) { var v = ri(R, (c.min || 0) * p, c.max * p) / p; if (nums.indexOf(v) < 0) nums.push(v); }
      var sorted = nums.slice().sort(function (x, y) { return x - y; });
      if (nums.join() === sorted.join()) nums.reverse();
      return Q('ord:' + sorted.join(',') + desc, T('Put in order, ' + (desc ? 'greatest to least' : 'least to greatest') + ':', 'Place en ordre ' + (desc ? 'décroissant' : 'croissant') + ' :') +
        ' <b>' + nums.map(function (x) { return n(x); }).join(' ; ') + '</b><br>' + nums.map(function () { return BLS; }).join(' ; '), (desc ? sorted.slice().reverse() : sorted).map(function (x) { return n(x); }).join(' ; '));
    };
  }
  function evenOdd(max) {
    return function (R, L) {
      var k = ri(R, 1, lv(max, L));
      return Q('eo:' + k, T('Is ' + n(k) + ' even or odd?', n(k) + ' est-il pair ou impair?') + circ(T(['even', 'odd'], ['pair', 'impair'])), k % 2 ? T('odd', 'impair') : T('even', 'pair'));
    };
  }
  function tensOnes(max) {
    return function (R, L) {
      var k = ri(R, 10, lv(max, L)), t = Math.floor(k / 10), o = k % 10;
      if (R() < 0.5) return Q('to:' + k, k + ' = ' + BLS + T(' tens ', ' dizaines ') + BLS + T(' ones', ' unités'), t + T(' tens ', ' dizaines ') + o + T(' ones', ' unités'));
      return Q('to:' + k, t + T(' tens ', ' dizaines ') + o + T(' ones = ', ' unités = ') + BL, n(k));
    };
  }
  var PLACES = { en: ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions'],
    fr: ['unités', 'dizaines', 'centaines', 'unités de mille', 'dizaines de mille', 'centaines de mille', 'millions'] };
  var DEC_PLACES = { en: ['tenths', 'hundredths', 'thousandths'], fr: ['dixièmes', 'centièmes', 'millièmes'] };
  function placeValue(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), d = c.digits, dp = c.dp || 0, k, s, i, t = R();
      do { k = ri(R, Math.pow(10, d - 1), Math.pow(10, d) - 1); s = String(k); } while (/(.).*\1/.test(s));
      var x = k / Math.pow(10, dp), shown = n(x, dp || undefined);
      i = ri(R, 0, d - 1);                                    // position from the left
      var digit = s.charAt(i), pos = d - 1 - i - dp;          // power of ten
      var placeName = pos >= 0 ? PLACES[fr ? 'fr' : 'en'][pos] : DEC_PLACES[fr ? 'fr' : 'en'][-pos - 1];
      if (digit === '0') return Q('pv:' + k + ':' + dp + ':x', T('Write in expanded form:', 'Écris sous forme développée :') + ' <b>' + shown + '</b>' + BLL, expanded(s, dp));
      if (t < 0.4) return Q('pv:' + k + ':' + dp + ':' + i, T('In ', 'Dans ') + '<b>' + shown + '</b>' + T(', what is the value of the digit ', ', quelle est la valeur du chiffre ') + '<b>' + digit + '</b>? ' + BLM, n(round(Number(digit) * Math.pow(10, pos), 6), pos < 0 ? -pos : undefined));
      if (t < 0.7) return Q('pv:' + k + ':' + dp + ':' + i + 'p', T('In ', 'Dans ') + '<b>' + shown + '</b>' + T(', the digit ' + digit + ' is in the', ', le chiffre ' + digit + ' est à la position des') + circ(sample(R, PLACES[fr ? 'fr' : 'en'].slice(0, Math.max(3, d - dp)).concat(dp ? DEC_PLACES[fr ? 'fr' : 'en'].slice(0, dp) : []).filter(function (p) { return p !== placeName; }), 2).concat([placeName])), placeName);
      return Q('pv:' + k + ':' + dp + ':x', T('Write in expanded form:', 'Écris sous forme développée :') + ' <b>' + shown + '</b>' + BLL, expanded(s, dp));
    };
  }
  var ROUND_TO = { en: { 10: 'ten', 100: 'hundred', 1000: 'thousand', 0.1: 'tenth', 0.01: 'hundredth', 1: 'whole number' },
    fr: { 10: 'à la dizaine', 100: 'à la centaine', 1000: 'à l’unité de mille', 0.1: 'au dixième', 0.01: 'au centième', 1: 'à l’unité' } };
  function rounding(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), to = pick(R, c.to), dp = c.dp || 0, p = Math.pow(10, dp), x = ri(R, c.min * p, c.max * p) / p;
      var label = ROUND_TO[fr ? 'fr' : 'en'][to];
      return Q('rd:' + x + ':' + to, fr ? 'Arrondis <b>' + n(x, dp || undefined) + '</b> ' + label + ' : ' + BLM
        : 'Round <b>' + n(x, dp || undefined) + '</b> to the nearest ' + label + ': ' + BLM, n(round(Math.round(x / to) * to, 2), to < 1 ? (to === 0.1 ? 1 : 2) : undefined));
    };
  }

  // ---------- operations ----------
  var OPS = { '+': '+', '-': '−', 'x': '×', '/': '÷' };
  // cfg: { ops: '+-x/', a: [min, max], b: [min, max], dp: 0, neg: false, rem: false, sum: max total for +, vertical: false }
  function arith(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), op = pick(R, c.ops.split('')), dp = c.dp || 0, p = Math.pow(10, dp), a, b;
      function rnd(rg, d) { var q = Math.pow(10, d), v = ri(R, rg[0] * q, rg[1] * q) / q; return c.neg && R() < 0.5 ? -v : v; }
      if (op === '/') {
        b = rnd(c.b, 0) || 1;
        var q = rnd(c.q || [1, 10], dp), r = c.rem && Math.abs(b) > 1 && R() < 0.6 ? ri(R, 1, Math.abs(b) - 1) : 0;
        a = round(q * b + r, dp);
      } else if (op === 'x') {
        a = rnd(c.a, dp); b = rnd(c.b, 0);
      } else {
        a = rnd(c.a, dp); b = rnd(c.b, dp);
        if (op === '-' && !c.neg && b > a) { var t = a; a = b; b = t; }
        if (op === '+' && c.sum && a + b > c.sum) { a = ri(R, 1, c.sum - 1); b = ri(R, 1, c.sum - a); }
      }
      if (op === '-' && !c.neg && a === b) a = round(a + 1, dp);
      var ans = op === '/' ? (c.rem ? n(Math.floor(a / b)) + ' R ' + n(a - Math.floor(a / b) * b) : n(round(a / b, dp + 2)))
        : n(round(op === '+' ? a + b : op === '-' ? a - b : a * b, dp + 2));
      var key = 'ar:' + a + op + b, A = c.neg ? sn(a) : n(a), B = c.neg ? sn(b) : n(b);
      if (c.vertical && !c.neg && op !== '/') return Q(key, '<span class="mono">&nbsp;&nbsp;' + A + '<br>' + OPS[op] + ' ' + B + '</span><br>= ' + BL, ans);
      return Q(key, A + ' ' + OPS[op] + ' ' + B + (op === '/' && c.rem ? ' = ' + BLS + ' R ' + BLS : ' = ' + BL), ans);
    };
  }
  function missing(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), op = pick(R, c.ops.split('')), a, b, res;
      if (op === '+') { res = ri(R, 2, c.max); a = ri(R, 1, res - 1); return Q('mi:' + a + '+?=' + res, n(a) + ' + ' + BLS + ' = ' + n(res), n(res - a)); }
      if (op === '-') { a = ri(R, 2, c.max); b = ri(R, 1, a - 1); return Q('mi:' + a + '-?=' + (a - b), n(a) + ' − ' + BLS + ' = ' + n(a - b), n(b)); }
      if (op === 'x') { a = ri(R, 2, c.f || 10); b = ri(R, 2, c.f || 10); return Q('mi:' + a + 'x?=' + a * b, a + ' × ' + BLS + ' = ' + a * b, n(b)); }
      a = ri(R, 2, c.f || 10); b = ri(R, 2, c.f || 10);
      return Q('mi:' + a * b + '/?=' + b, a * b + ' ÷ ' + BLS + ' = ' + b, n(a));
    };
  }
  // word problems: kinds = 'join','take','compare','groups','share','money','multi'
  function word(cfg) {
    return function (R, L) {
      var ans, c = lv(cfg, L), kind = pick(R, c.kinds), nm = sample(R, NAMES, 2), it = pick(R, ITEMS), bx = pick(R, BOXES), max = c.max || 20, a, b, t;
      if (kind === 'join') { a = ri(R, 2, max - 1); b = ri(R, 1, max - a);
        t = T(nm[0] + ' has ' + n(a) + ' ' + it + '. ' + nm[1] + ' gives ' + nm[0] + ' ' + n(b) + ' more. How many now?', nm[0] + ' a ' + n(a) + ' ' + it + '. ' + nm[1] + ' lui en donne ' + n(b) + ' de plus. Combien en a ' + nm[0] + ' maintenant?'); ans = a + b; }
      else if (kind === 'take') { a = ri(R, 3, max); b = ri(R, 1, a - 1);
        t = T(nm[0] + ' had ' + n(a) + ' ' + it + ' and gave ' + n(b) + ' to ' + nm[1] + '. How many are left?', nm[0] + ' avait ' + n(a) + ' ' + it + ' et en a donné ' + n(b) + ' à ' + nm[1] + '. Combien en reste-t-il?'); ans = a - b; }
      else if (kind === 'compare') { a = ri(R, 3, max); b = ri(R, 1, a - 1);
        t = T(nm[0] + ' has ' + n(a) + ' ' + it + '. ' + nm[1] + ' has ' + n(b) + '. How many more does ' + nm[0] + ' have?', nm[0] + ' a ' + n(a) + ' ' + it + '. ' + nm[1] + ' en a ' + n(b) + '. Combien en a ' + nm[0] + ' de plus?'); ans = a - b; }
      else if (kind === 'groups') { a = ri(R, 2, c.f || 9); b = ri(R, 2, c.f || 9);
        t = T('There are ' + a + ' ' + bx + ' with ' + b + ' ' + it + ' in each. How many ' + it + ' in all?', 'Il y a ' + a + ' ' + bx + ' avec ' + b + ' ' + it + ' dans chacun. Combien de ' + it + ' en tout?'); ans = a * b; }
      else if (kind === 'share') { a = ri(R, 2, c.f || 9); b = ri(R, 2, c.f || 9);
        t = T(n(a * b) + ' ' + it + ' are shared equally among ' + a + ' friends. How many does each friend get?', 'On partage ' + n(a * b) + ' ' + it + ' également entre ' + a + ' amis. Combien chaque ami en reçoit-il?'); ans = b; }
      else if (kind === 'money') { a = 25 * ri(R, 4, 4 * (c.dollars || 10)); b = 25 * ri(R, 1, Math.floor(a / 25) - 1);
        t = T(nm[0] + ' has ' + H.money(a) + ' and spends ' + H.money(b) + '. How much is left?', nm[0] + ' a ' + H.money(a) + ' et dépense ' + H.money(b) + '. Combien lui reste-t-il?'); ans = H.money(a - b); }
      else if (kind === 'rate') { a = ri(R, 3, 12); b = ri(R, 2, 9);
        t = T(nm[0] + ' reads ' + a + ' pages a day. How many pages in ' + b + ' days?', nm[0] + ' lit ' + a + ' pages par jour. Combien de pages en ' + b + ' jours?'); ans = a * b; }
      else { a = ri(R, 3, 9); b = ri(R, 2, 6); var d = ri(R, 1, a * b - 1);
        t = T(nm[0] + ' buys ' + b + ' packs of ' + a + ' ' + it + ' and gives away ' + d + '. How many are left?', nm[0] + ' achète ' + b + ' paquets de ' + a + ' ' + it + ' et en donne ' + d + '. Combien en reste-t-il?'); ans = a * b - d; a = a * 100 + d; }
      return Q('wp:' + kind + ':' + a + ':' + b, esc(t) + ' ' + BLS, typeof ans === 'number' ? n(ans) : ans);
    };
  }
  function orderOps(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), a = ri(R, 2, 12), b = ri(R, 2, 9), d = ri(R, 2, 9), e = ri(R, 1, 5), s, form = ri(R, 0, c.forms - 1);
      if (form === 0) s = a + ' + ' + b + ' × ' + d;
      else if (form === 1) s = '(' + a + ' + ' + b + ') × ' + d;
      else if (form === 2) s = a * d + ' ÷ ' + d + ' + ' + b;
      else if (form === 3) s = b + '<sup>2</sup> − ' + a + ' + ' + e;
      else if (form === 4) s = '(' + (b + d) + ' − ' + b + ')<sup>2</sup> × ' + e;
      else s = sn(-a) + ' + ' + b + ' × ' + sn(-e);
      var val = [a + b * d, (a + b) * d, a + b, b * b - a + e, d * d * e, -a - b * e][form];
      return Q('oo:' + form + ':' + a + ':' + b + ':' + d + ':' + e, s + ' = ' + BL, n(val));
    };
  }
  function powers(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), b = ri(R, 2, c.base), e = ri(R, 2, c.exp), t = R();
      if (t < 0.4) return Q('pw:' + b + '^' + e, b + '<sup>' + e + '</sup> = ' + BL, n(Math.pow(b, e)));
      if (t < 0.7) { var f = []; for (var i = 0; i < e; i++) f.push(b); return Q('pw:' + b + '^' + e + 'w', T('Write as a power:', 'Écris sous forme de puissance :') + ' ' + f.join(' × ') + ' = ' + BL, b + '<sup>' + e + '</sup>'); }
      var s = ri(R, 2, c.sq || 15);
      return Q('sq:' + s, '√' + s * s + ' = ' + BLS, n(s));
    };
  }
  function sqrtEst(max) {
    return function (R, L) {
      var k; do { k = ri(R, 2, lv(max, L)); } while (Math.sqrt(k) % 1 === 0);
      return Q('se:' + k, T('√' + k + ' is between which two whole numbers?', '√' + k + ' est entre quels nombres entiers?') + ' ' + BLS + T(' and ', ' et ') + BLS, both(Math.floor(Math.sqrt(k)), Math.floor(Math.sqrt(k)) + 1));
    };
  }
  function primes(max) {
    function isPrime(k) { if (k < 2) return false; for (var i = 2; i * i <= k; i++) if (k % i === 0) return false; return true; }
    return function (R, L) {
      var m = lv(max, L), t = R(), k = ri(R, 2, m);
      if (t < 0.3) return Q('pr:' + k, T('Is ' + k + ' prime or composite?', k + ' est-il premier ou composé?') + circ(T(['prime', 'composite'], ['premier', 'composé'])), isPrime(k) ? T('prime', 'premier') : T('composite', 'composé'));
      if (t < 0.55) { do { k = ri(R, 6, m); } while (isPrime(k)); return Q('fa:' + k, T('List all the factors of ', 'Écris tous les diviseurs de ') + k + ':' + BLL, factorsOf(k).join(', ')); }
      var a = ri(R, 2, 12), b = ri(R, 2, 12), g = ri(R, 1, 6);
      if (t < 0.8) return Q('gcf:' + a * g + ':' + b * g, T('Greatest common factor of ', 'Plus grand commun diviseur de ') + a * g + T(' and ', ' et ') + b * g + ': ' + BLS, n(g * gcd(a, b)));
      return Q('lcm:' + a + ':' + b, T('Least common multiple of ', 'Plus petit commun multiple de ') + a + T(' and ', ' et ') + b + ': ' + BLS, n(lcm(a, b)));
    };
  }

  // ---------- fractions, decimals, percents ----------
  function fracShade(cfg) {
    return function (R, L) {
      var dens = lv(cfg, L), d = pick(R, dens), k = ri(R, 1, d - 1), shape = pick(R, ['circle', 'bar', 'square']), idx = [];
      for (var i = 0; i < d; i++) idx.push(i);
      return Q('fs:' + shape + ':' + k + '/' + d, '<div class="row">' + H.fracSvg(shape, d, sample(R, idx, k)) + '<span>' + T('What fraction is shaded?', 'Quelle fraction est coloriée?') + '<br>' + FB() + '</span></div>', F(k, d));
    };
  }
  function fracEquiv(maxDen) {
    return function (R, L) {
      var d = ri(R, 2, lv(maxDen, L)), a = ri(R, 1, d - 1), k = ri(R, 2, 6);
      if (R() < 0.5) return Q('fe:' + a + '/' + d + ':' + k, F(a, d) + ' = ' + F(BLS, d * k), n(a * k));
      return Q('fe:' + a + '/' + d + ':' + k + 'n', F(a * k, d * k) + ' = ' + F(a, BLS), n(d));
    };
  }
  function fracSimplify(maxDen) {
    return function (R, L) {
      var d, a, k = ri(R, 2, 6);
      do { d = ri(R, 2, lv(maxDen, L)); a = ri(R, 1, d - 1); } while (gcd(a, d) !== 1);
      return Q('fsi:' + a * k + '/' + d * k, T('Simplify:', 'Simplifie :') + ' ' + F(a * k, d * k) + ' = ' + FB(), F(a, d));
    };
  }
  function fracCompare(maxDen) { return compare({ frac: maxDen }); }
  // op: '+-x/'; mode: 'like' | 'unlike' | 'mixed'
  function fracOp(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), op = pick(R, c.ops.split('')), m = c.max || 12, a, b, d1, d2;
      if (c.mode === 'like') { d1 = d2 = ri(R, 3, m); a = ri(R, 1, d1 - 1); b = ri(R, 1, d1 - 1); if (op === '-' && b > a) { var t = a; a = b; b = t; } if (op === '-' && a === b) a++; if (a >= d1 && op === '-') a = d1 - 1; }
      else { d1 = ri(R, 2, m); d2 = ri(R, 2, m); a = ri(R, 1, d1 - 1); b = ri(R, 1, d2 - 1); if (op === '-' && a / d1 < b / d2) { var s = a; a = b; b = s; s = d1; d1 = d2; d2 = s; } }
      if (op === '-' && a * d2 === b * d1) return Q('fo:x' + a + '/' + d1, F(a, d1) + ' + ' + F(b, d2) + ' = ' + FB(), fshow(fop([a, d1], '+', [b, d2])));
      var ans = fshow(fop([a, d1], op, [b, d2]));
      var left = F(a, d1), right = F(b, d2);
      if (c.mode === 'mixed') { var w1 = ri(R, 1, 4), w2 = ri(R, 1, 3); left = mixed(w1, a, d1); right = mixed(w2, b, d2); var L1 = [w1 * d1 + a, d1], R1 = [w2 * d2 + b, d2], sw = op === '-' && w1 < w2; ans = fshow(fop(sw ? R1 : L1, op, sw ? L1 : R1), true); a += w1 * 10; b += w2 * 10; if (op === '-' && w1 < w2) { var u = left; left = right; right = u; } }
      return Q('fo:' + a + '/' + d1 + op + b + '/' + d2, left + ' ' + OPS[op] + ' ' + right + ' = ' + (c.mode === 'mixed' ? BLM : FB()), ans);
    };
  }
  function fracOf(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), d = ri(R, 2, c.den), a = ri(R, 1, d - 1), k = ri(R, 2, c.k || 10);
      return Q('fof:' + a + '/' + d + ':' + d * k, F(a, d) + T(' of ', ' de ') + d * k + ' = ' + BLS, n(a * k));
    };
  }
  function mixedImproper(maxDen) {
    return function (R, L) {
      var d = ri(R, 2, lv(maxDen, L)), w = ri(R, 1, 5), a = ri(R, 1, d - 1);
      if (R() < 0.5) return Q('mx:' + w + ':' + a + '/' + d, T('Write as an improper fraction:', 'Écris en fraction impropre :') + ' ' + mixed(w, a, d) + ' = ' + FB(), F(w * d + a, d));
      return Q('mx:' + w + ':' + a + '/' + d + 'r', T('Write as a mixed number:', 'Écris en nombre fractionnaire :') + ' ' + F(w * d + a, d) + ' = ' + BLM, w + ' ' + F(a, d));
    };
  }
  function decConvert(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), t = pick(R, c.kinds), d = pick(R, [2, 4, 5, 10, 20, 25, 100]), a = ri(R, 1, d - 1), x = a / d, pct = Math.round(x * 100 * 10) / 10;
      if (t === 'fd') return Q('dc:fd' + a + '/' + d, T('Write as a decimal:', 'Écris en nombre décimal :') + ' ' + F(a, d) + ' = ' + BLM, n(round(a / d, 4)));
      if (t === 'df') { var dd = pick(R, [10, 100]), aa = ri(R, 1, dd - 1); return Q('dc:df' + aa + '/' + dd, T('Write as a fraction:', 'Écris en fraction :') + ' ' + n(aa / dd, dd === 10 ? 1 : 2) + ' = ' + FB(), fshow(rf(aa, dd))); }
      if (t === 'pd') return Q('dc:pd' + pct, T('Write as a decimal:', 'Écris en nombre décimal :') + ' ' + n(pct) + PCT + ' = ' + BLM, n(round(pct / 100, 4)));
      if (t === 'dp') return Q('dc:dp' + pct, T('Write as a percent:', 'Écris en pourcentage :') + ' ' + n(x) + ' = ' + BLS + PCT, n(pct) + PCT);
      return Q('dc:fp' + a + '/' + d, T('Write as a percent:', 'Écris en pourcentage :') + ' ' + F(a, d) + ' = ' + BLS + PCT, n(pct) + PCT);
    };
  }
  function percent(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), t = pick(R, c.kinds), p = pick(R, [5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 80]), base = 20 * ri(R, 1, 20), nm = pick(R, NAMES);
      if (t === 'of') return Q('pc:of' + p + ':' + base, n(p) + PCT + T(' of ', ' de ') + n(base) + ' = ' + BLS, n(p * base / 100));
      if (t === 'what') { var part = p * base / 100; return Q('pc:wh' + part + ':' + base, T('What percent of ' + n(base) + ' is ' + n(part) + '?', 'Quel pourcentage de ' + n(base) + ' est ' + n(part) + '?') + ' ' + BLS + PCT, n(p) + PCT); }
      if (t === 'sale') { var price = 100 * ri(R, 10, 120); return Q('pc:sa' + p + ':' + price, esc(T('A jacket costs ' + H.money(price) + '. It is ' + p + '% off. What is the sale price?', 'Un manteau coûte ' + H.money(price) + '. Il est en solde à ' + p + ' % de rabais. Quel est le prix réduit?')) + ' ' + BLM, H.money(price * (100 - p) / 100)); }
      if (t === 'tax') { var pr = 100 * ri(R, 4, 80), tax = pick(R, us ? [6, 7, 8] : [5, 13, 15]); return Q('pc:tx' + tax + ':' + pr, esc(T('A game costs ' + H.money(pr) + ' plus ' + tax + '% tax. What is the total?', 'Un jeu coûte ' + H.money(pr) + ' plus ' + tax + ' % de taxes. Quel est le total?')) + ' ' + BLM, H.money(Math.round(pr * (100 + tax) / 100))); }
      var old = 10 * ri(R, 2, 40), ch = pick(R, [10, 20, 25, 50]), up = R() < 0.5, nw = old * (100 + (up ? ch : -ch)) / 100;
      return Q('pc:ch' + old + ':' + nw, esc(T('A price changed from ' + H.money(old * 100) + ' to ' + H.money(nw * 100) + '. What is the percent ' + (up ? 'increase' : 'decrease') + '?', 'Un prix passe de ' + H.money(old * 100) + ' à ' + H.money(nw * 100) + '. Quel est le pourcentage ' + (up ? 'd’augmentation' : 'de diminution') + '?')) + ' ' + BLS + PCT, n(ch) + PCT);
    };
  }
  function ratio(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), t = pick(R, c.kinds), a = ri(R, 1, 9), b = ri(R, 1, 9), k = ri(R, 2, 8);
      if (a === b) b++;
      if (t === 'equiv') return Q('ra:e' + a + ':' + b + ':' + k, a + ' : ' + b + ' = ' + BLS + ' : ' + b * k, n(a * k));
      if (t === 'simplify') return Q('ra:s' + a * k + ':' + b * k, T('Simplify the ratio', 'Simplifie le rapport') + ' ' + a * k + ' : ' + b * k + ' = ' + BLS + ' : ' + BLS, (a / gcd(a, b)) + ' : ' + (b / gcd(a, b)));
      if (t === 'prop') return Q('ra:p' + a + ':' + b + ':' + k, F(a, b) + ' = ' + F('<i>x</i>', b * k) + ' &nbsp; <i>x</i> = ' + BLS, n(a * k));
      var cost = ri(R, 2, 15) * 25 * k;
      return Q('ra:u' + cost + ':' + k, esc(T(k + ' muffins cost ' + H.money(cost) + '. What is the cost of 1 muffin?', k + ' muffins coûtent ' + H.money(cost) + '. Combien coûte 1 muffin?')) + ' ' + BLM, H.money(cost / k));
    };
  }

  // ---------- money and time ----------
  function coins(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), list = [], total, i;
      // US: pennies, nickels, dimes and quarters (no $2 coin)
      var kinds = us ? [1].concat(c.kinds.filter(function (k) { return k !== 200; })) : c.kinds;
      do { var cnt = ri(R, 2, c.n); list = []; total = 0; for (i = 0; i < cnt; i++) { var v = pick(R, kinds); list.push(v); total += v; } } while (total > c.cap);
      list.sort(function (x, y) { return y - x; });
      var ask = total >= 100 ? (fr ? 'Combien d’argent?<br>' + BLS + ' $' : 'How much money?<br>$' + BLS) : T('How much money?<br>' + BLS + '¢', 'Combien d’argent?<br>' + BLS + ' ¢');
      return Q('coin:' + list.join('-'), '<div class="row">' + H.coinsSvg(list) + '<span>' + ask + '</span></div>', total >= 100 ? H.money(total) : total + (fr ? '\u00a0¢' : '¢'));
    };
  }
  function change(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), paid = pick(R, c.paid), price = 5 * ri(R, 1, paid / 5 - 1);
      return Q('chg:' + paid + ':' + price, esc(T('You pay ' + H.money(paid) + ' for something that costs ' + H.money(price) + '. How much change?', 'Tu paies ' + H.money(paid) + ' pour un article de ' + H.money(price) + '. Combien de monnaie reçois-tu?')) + ' ' + BLM, H.money(paid - price));
    };
  }
  function clock(cfg) {
    return function (R, L) {
      var mins = lv(cfg, L), h = ri(R, 1, 12), m = pick(R, mins), t = h + ':' + H.pad2(m), draw = R() < 0.5;
      if (!draw) return Q('t:' + t, '<div class="row">' + H.clockSvg(h, m, true) + '<span>' + T('What time is it?', 'Quelle heure est-il?') + '<br>' + TIME + '</span></div>', fr ? h + ' h ' + H.pad2(m) : t);
      return Q('t:' + t, '<div class="row">' + H.clockSvg(h, m, false) + '<span>' + T('Draw the hands to show <b>' + t + '</b>.', 'Dessine les aiguilles pour <b>' + h + ' h ' + H.pad2(m) + '</b>.') + '</span></div>', T('hands at ', 'aiguilles à ') + (fr ? h + ' h ' + H.pad2(m) : t));
    };
  }
  function elapsed(cfg) {
    return function (R, L) {
      var steps = lv(cfg, L), h = ri(R, 7, 17), m = 5 * ri(R, 0, 11), d = pick(R, steps);
      var end = h * 60 + m + d, e = Math.floor(end / 60) + ':' + H.pad2(end % 60);
      function fmt(hh, mm) { return fr ? hh + ' h ' + H.pad2(mm) : ((hh - 1) % 12 + 1) + ':' + H.pad2(mm) + (hh < 12 ? ' a.m.' : ' p.m.'); }
      if (R() < 0.5) return Q('el:' + h + ':' + m + ':' + d, T('A movie starts at ' + fmt(h, m) + ' and lasts ' + d + ' minutes. When does it end?', 'Un film commence à ' + fmt(h, m) + ' et dure ' + d + ' minutes. À quelle heure finit-il?') + ' ' + BLM, fmt(Math.floor(end / 60), end % 60));
      return Q('el:' + h + ':' + m + ':' + d + 'b', T('How many minutes from ' + fmt(h, m) + ' to ' + fmt(Math.floor(end / 60), end % 60) + '?', 'Combien de minutes de ' + fmt(h, m) + ' à ' + fmt(Math.floor(end / 60), end % 60) + '?') + ' ' + BLS + ' min' + (e ? '' : ''), d + ' min');
    };
  }
  function calendar() {
    return function (R) {
      var u = H.ui(), isDay = R() < 0.5, list = isDay ? u.weekdays.slice(1).concat([u.weekdays[0]]) : u.months, i = ri(R, 0, list.length - 1), after = R() < 0.5;
      var t = fr ? 'Quel ' + (isDay ? 'jour' : 'mois') + ' vient juste ' + (after ? 'après ' : 'avant ') + list[i] + '?' : 'What ' + (isDay ? 'day' : 'month') + ' comes just ' + (after ? 'after ' : 'before ') + list[i] + '?';
      return Q('cal:' + isDay + ':' + i + ':' + after, t + '<br>' + BLM, list[(i + (after ? 1 : -1) + list.length) % list.length]);
    };
  }

  // ---------- measurement and geometry ----------
  var UNITS = [['mm', 'cm', 10], ['cm', 'm', 100], ['m', 'km', 1000], ['g', 'kg', 1000], ['mL', 'L', 1000]];
  // US customary units (US sheets use these about two times out of three, like US schools)
  var US_UNITS = [['in', 'ft', 12], ['ft', 'yd', 3], ['oz', 'lb', 16], ['cups', 'qt', 4], ['qt', 'gal', 4], ['pt', 'qt', 2]];
  function units(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), usu = us && R() < 0.67, u = pick(R, usu ? US_UNITS : UNITS), up = R() < 0.5, x;
      if (usu) c = { max: c.max, dec: false };
      if (up) { x = u[2] * ri(R, 1, c.max) + (c.dec ? ri(R, 1, 9) * u[2] / 10 : 0); return Q('un:' + x + u[0], n(x) + ' ' + u[0] + ' = ' + BLM + ' ' + u[1], n(round(x / u[2], 4)) + ' ' + u[1]); }
      x = ri(R, 1, c.max) + (c.dec ? ri(R, 1, 9) / 10 : 0);
      return Q('un:' + x + u[1], n(x) + ' ' + u[1] + ' = ' + BLM + ' ' + u[0], n(round(x * u[2], 4)) + ' ' + u[0]);
    };
  }
  function rectSvg(w, h, lw, lh, unit) {
    var W = 58, Hh = Math.max(16, Math.min(28, Math.round(58 * h / w))), s = '';
    s += '<rect x="6" y="4" width="' + W + '" height="' + Hh + '" fill="#f2f2f2" stroke="#111" stroke-width="1.2"/>';
    s += '<text x="' + (6 + W / 2) + '" y="' + (Hh + 14) + '" font-size="9" text-anchor="middle" font-family="Arial,sans-serif">' + lw + ' ' + unit + '</text>';
    s += '<text x="' + (W + 9) + '" y="' + (4 + Hh / 2 + 3) + '" font-size="9" font-family="Arial,sans-serif">' + lh + ' ' + unit + '</text>';
    return svg(W + 40, Hh + 17, s);
  }
  // kinds: 'perim','area','tri','circleA','circleC','prism','cyl','sa'
  function geo(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), t = pick(R, c.kinds), u = pick(R, us ? ['in', 'ft', 'yd', 'cm', 'm'] : ['cm', 'm']), w = ri(R, 2, c.max || 12), h = ri(R, 2, c.max || 12), d = ri(R, 2, 10);
      if (t === 'perim' || t === 'area') {
        if (w === h && R() < 0.7) h = w + 1;
        var ask = t === 'perim' ? T('Perimeter = ', 'Périmètre = ') + BLS + ' ' + u : T('Area = ', 'Aire = ') + BLS + ' ' + u + '²';
        return Q('g:' + t + w + 'x' + h, '<div class="row">' + rectSvg(w, h, n(w), n(h), u) + '<span>' + ask + '</span></div>', t === 'perim' ? n(2 * (w + h)) + ' ' + u : n(w * h) + ' ' + u + '²');
      }
      if (t === 'tri') return Q('g:tri' + w + 'x' + h, T('A triangle has base ' + w + ' ' + u + ' and height ' + h + ' ' + u + '. Area = ', 'Un triangle a une base de ' + w + ' ' + u + ' et une hauteur de ' + h + ' ' + u + '. Aire = ') + BLS + ' ' + u + '²', n(w * h / 2) + ' ' + u + '²');
      if (t === 'para') return Q('g:par' + w + 'x' + h, T('A parallelogram has base ' + w + ' ' + u + ' and height ' + h + ' ' + u + '. Area = ', 'Un parallélogramme a une base de ' + w + ' ' + u + ' et une hauteur de ' + h + ' ' + u + '. Aire = ') + BLS + ' ' + u + '²', n(w * h) + ' ' + u + '²');
      if (t === 'circleA') return Q('g:ca' + d, T('Circle with radius ' + d + ' ' + u + '. Area (π ≈ 3.14) = ', 'Cercle de rayon ' + d + ' ' + u + '. Aire (π ≈ 3,14) = ') + BLM + ' ' + u + '²', n(round(3.14 * d * d, 2)) + ' ' + u + '²');
      if (t === 'circleC') { var diam = R() < 0.5; return Q('g:cc' + d + diam, T('Circle with ' + (diam ? 'diameter ' : 'radius ') + d + ' ' + u + '. Circumference (π ≈ 3.14) = ', 'Cercle de ' + (diam ? 'diamètre ' : 'rayon ') + d + ' ' + u + '. Circonférence (π ≈ 3,14) = ') + BLM + ' ' + u, n(round(3.14 * (diam ? d : 2 * d), 2)) + ' ' + u); }
      if (t === 'prism') return Q('g:pr' + w + 'x' + h + 'x' + d, T('Box ' + w + ' ' + u + ' by ' + h + ' ' + u + ' by ' + d + ' ' + u + '. Volume = ', 'Prisme de ' + w + ' ' + u + ' sur ' + h + ' ' + u + ' sur ' + d + ' ' + u + '. Volume = ') + BLM + ' ' + u + '³', n(w * h * d) + ' ' + u + '³');
      if (t === 'sa') return Q('g:sa' + w + 'x' + h + 'x' + d, T('Box ' + w + ' ' + u + ' by ' + h + ' ' + u + ' by ' + d + ' ' + u + '. Surface area = ', 'Prisme de ' + w + ' ' + u + ' sur ' + h + ' ' + u + ' sur ' + d + ' ' + u + '. Aire totale = ') + BLM + ' ' + u + '²', n(2 * (w * h + w * d + h * d)) + ' ' + u + '²');
      return Q('g:cy' + d + 'x' + h, T('Cylinder: radius ' + d + ' ' + u + ', height ' + h + ' ' + u + '. Volume (π ≈ 3.14) = ', 'Cylindre : rayon ' + d + ' ' + u + ', hauteur ' + h + ' ' + u + '. Volume (π ≈ 3,14) = ') + BLM + ' ' + u + '³', n(round(3.14 * d * d * h, 2)) + ' ' + u + '³');
    };
  }
  function angleSvg(deg) {
    var r = 26, cx = 8, cy = 30, a = -deg * Math.PI / 180;
    var x2 = cx + r * Math.cos(a), y2 = cy + r * Math.sin(a);
    var s = '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + r + 4) + '" y2="' + cy + '" stroke="#111" stroke-width="1.4"/>' +
      '<line x1="' + cx + '" y1="' + cy + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="#111" stroke-width="1.4"/>';
    var ar = 8, ax = cx + ar * Math.cos(a), ay = cy + ar * Math.sin(a);
    s += deg === 90 ? '<rect x="' + cx + '" y="' + (cy - 7) + '" width="7" height="7" fill="none" stroke="#111" stroke-width=".9"/>'
      : '<path d="M' + (cx + ar) + ',' + cy + ' A' + ar + ',' + ar + ' 0 0 0 ' + ax.toFixed(1) + ',' + ay.toFixed(1) + '" fill="none" stroke="#111" stroke-width=".9"/>';
    var minX = Math.min(0, x2 - 2);
    return '<svg class="pic" width="' + (Math.ceil(r + 14 - minX)) + '" height="34" viewBox="' + minX.toFixed(0) + ' 0 ' + Math.ceil(r + 14 - minX) + ' 34" aria-hidden="true">' + s + '</svg>';
  }
  function angles(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), t = pick(R, c.kinds);
      if (t === 'classify') {
        var deg = pick(R, [20, 35, 45, 60, 75, 90, 90, 110, 130, 150, 170]);
        return Q('an:c' + deg, '<div class="row">' + angleSvg(deg) + '<span>' + T('This angle is', 'Cet angle est') + circ(T(['acute', 'right', 'obtuse'], ['aigu', 'droit', 'obtus'])) + '</span></div>', deg < 90 ? T('acute', 'aigu') : deg === 90 ? T('right', 'droit') : T('obtuse', 'obtus'));
      }
      if (t === 'tri') { var a = ri(R, 25, 100), b = ri(R, 20, 150 - a); return Q('an:t' + a + ':' + b, T('A triangle has angles of ' + a + '° and ' + b + '°. The third angle is', 'Un triangle a des angles de ' + a + '° et ' + b + '°. Le troisième angle mesure') + ' ' + BLS + '°', (180 - a - b) + '°'); }
      if (t === 'supp') { var x = ri(R, 15, 165); return Q('an:s' + x, T('Supplementary to ' + x + '°:', 'Supplémentaire de ' + x + '° :') + ' ' + BLS + '°', (180 - x) + '°'); }
      var y = ri(R, 10, 80);
      return Q('an:m' + y, T('Complementary to ' + y + '°:', 'Complémentaire de ' + y + '° :') + ' ' + BLS + '°', (90 - y) + '°');
    };
  }
  var SHAPES = { en: [[3, 'triangle'], [4, 'quadrilateral'], [5, 'pentagon'], [6, 'hexagon'], [8, 'octagon']],
    fr: [[3, 'triangle'], [4, 'quadrilatère'], [5, 'pentagone'], [6, 'hexagone'], [8, 'octogone']] };
  var SOLIDS = { en: [['cube', 6, 12, 8], ['rectangular prism', 6, 12, 8], ['triangular prism', 5, 9, 6], ['square pyramid', 5, 8, 5], ['triangular pyramid', 4, 6, 4]],
    fr: [['cube', 6, 12, 8], ['prisme rectangulaire', 6, 12, 8], ['prisme triangulaire', 5, 9, 6], ['pyramide à base carrée', 5, 8, 5], ['pyramide à base triangulaire', 4, 6, 4]] };
  function shapes(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), t = pick(R, c.kinds), S = SHAPES[fr ? 'fr' : 'en'];
      if (t === 'sides') { var s = pick(R, S); return Q('sh:s' + s[0], T('How many sides does a ' + s[1] + ' have?', 'Combien de côtés a un ' + s[1] + '?') + ' ' + BLS, n(s[0])); }
      if (t === 'name') { var p = pick(R, S); return Q('sh:n' + p[0], T('A shape with ' + p[0] + ' sides is a', 'Une figure à ' + p[0] + ' côtés est un') + circ(shuffle(R, sample(R, S.filter(function (x) { return x !== p; }), 2).concat([p]).map(function (x) { return x[1]; }))), p[1]); }
      var so = pick(R, SOLIDS[fr ? 'fr' : 'en']), what = ri(R, 1, 3), word = T(['faces', 'edges', 'vertices'][what - 1], ['faces', 'arêtes', 'sommets'][what - 1]);
      return Q('sh:3' + so[0] + what, T('How many ' + word + ' does a ' + so[0] + ' have?', 'Combien de ' + word + ' a un ' + so[0] + '?') + ' ' + BLS, n(so[what]));
    };
  }
  var TRIPLES = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15], [7, 24, 25], [12, 16, 20], [20, 21, 29], [9, 40, 41], [15, 20, 25]];
  function pythag() {
    return function (R) {
      var t = pick(R, TRIPLES), leg = R() < 0.4;
      if (leg) return Q('py:l' + t.join(), T('Right triangle: hypotenuse ' + t[2] + ', one leg ' + t[0] + '. Other leg = ', 'Triangle rectangle : hypoténuse ' + t[2] + ', une cathète ' + t[0] + '. Autre cathète = ') + BLS, n(t[1]));
      return Q('py:h' + t.join(), T('Right triangle with legs ' + t[0] + ' and ' + t[1] + '. Hypotenuse = ', 'Triangle rectangle de cathètes ' + t[0] + ' et ' + t[1] + '. Hypoténuse = ') + BLS, n(t[2]));
    };
  }
  function coords(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), t = pick(R, c.kinds), x = nz(R, -9, 9), y = nz(R, -9, 9);
      if (t === 'quad') return Q('co:q' + x + ',' + y, T('Which quadrant is (' + n(x) + ', ' + n(y) + ') in?', 'Dans quel quadrant est (' + n(x) + ', ' + n(y) + ')?') + circ(['I', 'II', 'III', 'IV']), x > 0 ? (y > 0 ? 'I' : 'IV') : (y > 0 ? 'II' : 'III'));
      var tr = pick(R, TRIPLES.slice(0, 4)), dx = tr[0] * (R() < 0.5 ? 1 : -1), dy = tr[1] * (R() < 0.5 ? 1 : -1);
      if (t === 'dist') return Q('co:d' + x + ',' + y + ',' + dx + ',' + dy, T('Distance from (', 'Distance de (') + n(x) + ', ' + n(y) + T(') to (', ') à (') + n(x + dx) + ', ' + n(y + dy) + ') = ' + BLS, n(tr[2]));
      var x2 = x + 2 * ri(R, -5, 5), y2 = y + 2 * ri(R, -5, 5);
      if (t === 'mid') return Q('co:m' + x + ',' + y + ',' + x2 + ',' + y2, T('Midpoint of (', 'Point milieu de (') + n(x) + ', ' + n(y) + T(') and (', ') et (') + n(x2) + ', ' + n(y2) + ') = (' + BLS + ', ' + BLS + ')', '(' + n((x + x2) / 2) + ', ' + n((y + y2) / 2) + ')');
      if (x2 === x) x2 = x + 2;
      return Q('co:s' + x + ',' + y + ',' + x2 + ',' + y2, T('Slope of the line through (', 'Pente de la droite passant par (') + n(x) + ', ' + n(y) + T(') and (', ') et (') + n(x2) + ', ' + n(y2) + ') = ' + BLM, fshow(rf(y2 - y, x2 - x)));
    };
  }

  // ---------- geometry course: polygons, parallel lines, similarity, circles, solids, transformations ----------
  // kinds: 'poly','parallel','similar','arc','sector','inscribed','cone','sphere','perp','transform'
  function piOf(a, b) { var f = rf(a, b); return (f[1] === 1 ? (f[0] === 1 ? '' : n(f[0])) : F(f[0], f[1])) + 'π'; }
  function pt(x, y) { return '(' + n(x) + ', ' + n(y) + ')'; }
  function geom(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), t = pick(R, c.kinds), u = pick(R, us ? ['in', 'ft', 'cm', 'm'] : ['cm', 'm']), r = ri(R, 2, 12), X = '<i>x</i>';
      if (t === 'poly') {
        var s = pick(R, [5, 6, 8, 9, 10, 12]);
        if (R() < 0.5) return Q('gm:ps' + s, T('The interior angles of a polygon with ' + s + ' sides add up to', 'Les angles intérieurs d’un polygone à ' + s + ' côtés totalisent') + ' ' + BLS + '°', n((s - 2) * 180) + '°');
        return Q('gm:pe' + s, T('Each interior angle of a regular polygon with ' + s + ' sides measures', 'Chaque angle intérieur d’un polygone régulier à ' + s + ' côtés mesure') + ' ' + BLS + '°', n((s - 2) * 180 / s) + '°');
      }
      if (t === 'parallel') {
        var x = pick(R, [35, 40, 50, 55, 65, 70, 75, 110, 115, 125, 130, 140]), k = ri(R, 0, 2);
        var rel = [T('corresponding', 'correspondant'), T('alternate interior', 'alterne-interne'), T('same-side interior', 'interne du même côté')][k];
        return Q('gm:pl' + x + k, T('Two parallel lines are cut by a transversal. One angle is ' + x + '°. The ' + rel + ' angle measures', 'Deux droites parallèles sont coupées par une sécante. Un angle mesure ' + x + '°. L’angle ' + rel + ' mesure') + ' ' + BLS + '°', (k === 2 ? 180 - x : x) + '°');
      }
      if (t === 'similar') {
        var a = 2 * ri(R, 2, 6), b = ri(R, 3, 12), f = pick(R, [1.5, 2, 2.5, 3]);
        return Q('gm:sm' + a + b + f, T('Triangle ABC is similar to triangle DEF. AB = ' + a + ', BC = ' + b + ', and DE = ' + n(f * a) + '. EF =', 'Le triangle ABC est semblable au triangle DEF. AB = ' + a + ', BC = ' + b + ' et DE = ' + n(f * a) + '. EF =') + ' ' + BLS, n(f * b));
      }
      var deg = pick(R, [30, 45, 60, 90, 120, 135, 150, 180, 240, 270]);
      if (t === 'arc') return Q('gm:ar' + deg + r, T('A circle has radius ' + r + ' ' + u + '. The arc length for a ' + deg + '° central angle is (in terms of π)', 'Un cercle a un rayon de ' + r + ' ' + u + '. La longueur de l’arc d’un angle au centre de ' + deg + '° est (en fonction de π)') + ' ' + BLM + ' ' + u, piOf(deg * r, 180) + ' ' + u);
      if (t === 'sector') return Q('gm:se' + deg + r, T('A circle has radius ' + r + ' ' + u + '. The area of a ' + deg + '° sector is (in terms of π)', 'Un cercle a un rayon de ' + r + ' ' + u + '. L’aire d’un secteur de ' + deg + '° est (en fonction de π)') + ' ' + BLM + ' ' + u + '²', piOf(deg * r * r, 360) + ' ' + u + '²');
      if (t === 'inscribed') {
        var arc = 2 * ri(R, 15, 85);
        if (R() < 0.5) return Q('gm:ia' + arc, T('An inscribed angle intercepts an arc of ' + arc + '°. The inscribed angle measures', 'Un angle inscrit intercepte un arc de ' + arc + '°. L’angle inscrit mesure') + ' ' + BLS + '°', n(arc / 2) + '°');
        return Q('gm:ib' + arc, T('An inscribed angle measures ' + n(arc / 2) + '°. Its intercepted arc measures', 'Un angle inscrit mesure ' + n(arc / 2) + '°. L’arc intercepté mesure') + ' ' + BLS + '°', n(arc) + '°');
      }
      if (t === 'cone') { var rc = ri(R, 2, 9), h = 3 * ri(R, 1, 5); return Q('gm:co' + rc + h, T('Cone: radius ' + rc + ' ' + u + ', height ' + h + ' ' + u + '. Volume (in terms of π) =', 'Cône : rayon ' + rc + ' ' + u + ', hauteur ' + h + ' ' + u + '. Volume (en fonction de π) =') + ' ' + BLM + ' ' + u + '³', piOf(rc * rc * h, 3) + ' ' + u + '³'); }
      if (t === 'sphere') {
        if (R() < 0.5) { var rs = pick(R, [3, 6, 9]); return Q('gm:sv' + rs, T('Sphere with radius ' + rs + ' ' + u + '. Volume (in terms of π) =', 'Sphère de rayon ' + rs + ' ' + u + '. Volume (en fonction de π) =') + ' ' + BLM + ' ' + u + '³', piOf(4 * rs * rs * rs, 3) + ' ' + u + '³'); }
        return Q('gm:sa' + r, T('Sphere with radius ' + r + ' ' + u + '. Surface area (in terms of π) =', 'Sphère de rayon ' + r + ' ' + u + '. Aire (en fonction de π) =') + ' ' + BLM + ' ' + u + '²', piOf(4 * r * r, 1) + ' ' + u + '²');
      }
      if (t === 'perp') {
        var m = rf(nz(R, -6, 6), pick(R, [1, 1, 2, 3])), b0 = ri(R, -9, 9), par = R() < 0.35, Y = '<i>y</i>';
        var line = Y + ' = ' + (m[1] === 1 ? lin(m[0], b0, X) : fterm(m, X, true) + (b0 ? (b0 < 0 ? ' − ' + -b0 : ' + ' + b0) : ''));
        return Q('gm:pp' + m.join('/') + b0 + par, T('Slope of a line ' + (par ? 'parallel' : 'perpendicular') + ' to ', 'Pente d’une droite ' + (par ? 'parallèle' : 'perpendiculaire') + ' à ') + line + ': ' + BLM, fshow(par ? m : rf(-m[1], m[0])));
      }
      var px = nz(R, -8, 8), py = nz(R, -8, 8), w = ri(R, 0, 4), dx = nz(R, -6, 6), dy = nz(R, -6, 6);
      var name = [T('reflected over the <i>x</i>-axis', 'réfléchi par rapport à l’axe des <i>x</i>'), T('reflected over the <i>y</i>-axis', 'réfléchi par rapport à l’axe des <i>y</i>'),
        T('rotated 90° counterclockwise about the origin', 'tourné de 90° dans le sens antihoraire autour de l’origine'), T('rotated 180° about the origin', 'tourné de 180° autour de l’origine'),
        T('translated ' + (dx < 0 ? -dx + ' left' : dx + ' right') + ' and ' + (dy < 0 ? -dy + ' down' : dy + ' up'), 'translaté de ' + (dx < 0 ? -dx + ' vers la gauche' : dx + ' vers la droite') + ' et de ' + (dy < 0 ? -dy + ' vers le bas' : dy + ' vers le haut'))][w];
      var img = [[px, -py], [-px, py], [-py, px], [-px, -py], [px + dx, py + dy]][w];
      return Q('gm:tf' + px + ',' + py + w + dx + dy, T('Point ', 'Le point ') + pt(px, py) + T(' is ', ' est ') + name + T('. Its image is ', '. Son image est ') + '(' + BLS + ', ' + BLS + ')', pt(img[0], img[1]));
    };
  }

  // ---------- data and chance ----------
  function stats(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), k = ri(R, c.k[0], c.k[1]), list = [], t = pick(R, c.kinds);
      for (var i = 0; i < k; i++) list.push(ri(R, 1, c.max));
      if (t === 'mean') { var sum = list.reduce(function (a, b) { return a + b; }, 0), r = sum % k; list[0] += (k - r) % k; }
      if (t === 'mode') { list[1] = list[0]; }
      var word = { mean: T('Mean', 'Moyenne'), median: T('Median', 'Médiane'), mode: T('Mode', 'Mode'), range: T('Range', 'Étendue') }[t];
      return Q('st:' + t + list.join(','), T('Data:', 'Données :') + ' ' + list.join(' ; ') + '<br>' + word + ' = ' + BLS, t === 'mean' ? n(list.reduce(function (s, v) { return s + v; }, 0) / k) : t === 'median' ? n(median(list)) : t === 'mode' ? modes(list).join(', ') : n(Math.max.apply(null, list) - Math.min.apply(null, list)));
    };
  }
  var COLOURS = { en: ['red', 'blue', 'green', 'yellow'], fr: ['rouges', 'bleues', 'vertes', 'jaunes'] };
  function prob(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), t = pick(R, c.kinds), cols = COLOURS[fr ? 'fr' : 'en'];
      if (t === 'die') { var k = ri(R, 1, 6), more = R() < 0.5;
        return Q('pb:d' + k + more, T('You roll a die (1 to 6). P(' + (more ? 'greater than ' : 'less than ') + k + ') = ', 'Tu lances un dé (1 à 6). P(' + (more ? 'plus grand que ' : 'plus petit que ') + k + ') = ') + FB(), fshow(rf(more ? 6 - k : k - 1, 6))); }
      var cnt = cols.map(function () { return ri(R, 1, 9); }), i = ri(R, 0, 3), not = t === 'not';
      var bag = cols.map(function (cl, j) { return cnt[j] + ' ' + cl; }).join(', ');
      return Q('pb:b' + cnt.join() + i + not, T('A bag has ' + bag + ' marbles. P(' + (not ? 'not ' : '') + cols[i] + ') = ', 'Un sac contient des billes : ' + bag + '. P(' + (not ? 'pas ' : '') + cols[i].replace(/s$/, '') + ') = ') + FB(), fshow(rf(not ? cnt.reduce(function (s, v) { return s + v; }, 0) - cnt[i] : cnt[i], cnt.reduce(function (s, v) { return s + v; }, 0))));
    };
  }

  // ---------- algebra ----------
  function evalExpr(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), a = nz(R, -c.max, c.max), b = ri(R, -c.max, c.max), x = c.neg ? nz(R, -9, 9) : ri(R, 1, 9), t = R();
      if (!c.neg) { a = Math.abs(a); b = Math.abs(b); }
      if (c.sq && t < 0.35) return Q('ev:q' + a + ':' + b + ':' + x, T('If <i>x</i> = ', 'Si <i>x</i> = ') + n(x) + T(', then ', ', alors ') + poly([1, a, b], '<i>x</i>') + ' = ' + BL, n(x * x + a * x + b));
      return Q('ev:' + a + ':' + b + ':' + x, T('If <i>x</i> = ', 'Si <i>x</i> = ') + n(x) + T(', then ', ', alors ') + lin(a, b, '<i>x</i>') + ' = ' + BL, n(a * x + b));
    };
  }
  function solve(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), form = pick(R, c.forms), x = c.neg ? nz(R, -12, 12) : ri(R, 1, 12), a = ri(R, 2, 9) * (c.neg && R() < 0.3 ? -1 : 1), b = c.neg ? nz(R, -15, 15) : ri(R, 1, 20), d = ri(R, 2, 6), e, s;
      var X = '<i>x</i>';
      if (form === 'add') s = X + (b < 0 ? ' − ' + -b : ' + ' + b) + ' = ' + n(x + b);
      else if (form === 'mul') s = a === 1 ? X + ' = ' + x : (a < 0 ? '−' + -a : a) + X + ' = ' + n(a * x);
      else if (form === 'div') { x = d * (c.neg ? nz(R, -9, 9) : ri(R, 1, 9)); s = F(X, d) + ' = ' + n(x / d); }
      else if (form === 'two') s = lin(a, b, X) + ' = ' + n(a * x + b);
      else if (form === 'brk') s = a + '(' + lin(1, b, X) + ') = ' + n(a * (x + b));
      else { e = a + nz(R, -4, 4); if (e === a) e = a + 1; s = lin(a, b, X) + ' = ' + lin(e, a * x + b - e * x, X); }
      return Q('so:' + form + ':' + s, T('Solve:', 'Résous :') + ' ' + s + ' &nbsp; ' + X + ' = ' + BLS, n(x));
    };
  }
  function likeTerms(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), a = nz(R, -9, 9), b = nz(R, -9, 9), d = nz(R, -9, 9), e = nz(R, -9, 9), X = '<i>x</i>';
      if (!c.neg) { a = Math.abs(a); b = Math.abs(b); d = Math.abs(d); e = Math.abs(e); }
      var s = coef(a, X, true) + coef(b, '', false) + coef(d, X, false) + coef(e, '', false);
      return Q('lt:' + a + ':' + b + ':' + d + ':' + e, T('Simplify:', 'Simplifie :') + ' ' + s + ' = ' + BLM, lin(a + d, b + e, X));
    };
  }
  function expand(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), t = pick(R, c.kinds), a = nz(R, -6, 6), b = nz(R, -9, 9), d = nz(R, -9, 9), X = '<i>x</i>';
      if (t === 'dist') { var m = ri(R, 1, 5); return Q('ex:d' + a + ':' + m + ':' + b, T('Expand:', 'Développe :') + ' ' + n(a) + '(' + lin(m, b, X) + ') = ' + BLM, poly([a * m, a * b], X)); }
      if (t === 'bin') return Q('ex:b' + b + ':' + d, T('Expand:', 'Développe :') + ' (' + lin(1, b, X) + ')(' + lin(1, d, X) + ') = ' + BLL, poly([1, b + d, b * d], X));
      if (t === 'sq') return Q('ex:s' + b, T('Expand:', 'Développe :') + ' (' + lin(1, b, X) + ')<sup>2</sup> = ' + BLL, poly([1, 2 * b, b * b], X));
      var p = ri(R, 2, 4), q = ri(R, 1, 3);
      return Q('ex:g' + p + b + q + d, T('Expand:', 'Développe :') + ' (' + lin(p, b, X) + ')(' + lin(q, d, X) + ') = ' + BLL, poly([p * q, p * d + b * q, b * d], X));
    };
  }
  function factor(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), t = pick(R, c.kinds), X = '<i>x</i>', p = nz(R, -9, 9), q = nz(R, -9, 9);
      if (t === 'gcf') { var g = ri(R, 2, 9), a = ri(R, 1, 9), b = ri(R, 1, 9); if (gcd(a, b) !== 1) b = 1; return Q('fa:g' + g + a + b, T('Factor:', 'Factorise :') + ' ' + poly([g * a, g * b], X) + ' = ' + BLM, g + '(' + poly([a, b], X) + ')'); }
      if (t === 'diff') { var k = ri(R, 1, 12); return Q('fa:d' + k, T('Factor:', 'Factorise :') + ' ' + X + '<sup>2</sup> − ' + k * k + ' = ' + BLM, '(' + lin(1, -k, X) + ')(' + lin(1, k, X) + ')'); }
      if (t === 'tri') { if (p + q === 0) q = q + 1 || 2; return Q('fa:t' + Math.min(p, q) + ':' + Math.max(p, q), T('Factor:', 'Factorise :') + ' ' + poly([1, p + q, p * q], X) + ' = ' + BLM, '(' + lin(1, p, X) + ')(' + lin(1, q, X) + ')'); }
      var m = ri(R, 2, 3); if (gcd(m, Math.abs(p)) !== 1) p = 1;
      return Q('fa:a' + m + p + q, T('Factor:', 'Factorise :') + ' ' + poly([m, m * q + p, p * q], X) + ' = ' + BLL, '(' + lin(m, p, X) + ')(' + lin(1, q, X) + ')');
    };
  }
  function expLaws(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), t = pick(R, c.kinds), a = ri(R, 2, 9), b = ri(R, 2, 9), X = '<i>x</i>';
      if (t === 'mul') return Q('el:m' + a + b, X + '<sup>' + a + '</sup> · ' + X + '<sup>' + b + '</sup> = ' + X + '<sup>' + BLS + '</sup>', n(a + b));
      if (t === 'div') return Q('el:d' + (a + b) + a, X + '<sup>' + (a + b) + '</sup> ÷ ' + X + '<sup>' + a + '</sup> = ' + X + '<sup>' + BLS + '</sup>', n(b));
      if (t === 'pow') return Q('el:p' + a + b, '(' + X + '<sup>' + a + '</sup>)<sup>' + b + '</sup> = ' + X + '<sup>' + BLS + '</sup>', n(a * b));
      if (t === 'zero') { var k = ri(R, 2, 99); return Q('el:z' + k, k + '<sup>0</sup> = ' + BLS, '1'); }
      var base = ri(R, 2, 5), e = ri(R, 1, base === 2 ? 4 : 2);
      return Q('el:n' + base + e, base + '<sup>−' + e + '</sup> = ' + FB(), F(1, Math.pow(base, e)));
    };
  }
  function sciNot(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), m = ri(R, 11, 99) / 10, e = ri(R, 3, 8) * (c.small && R() < 0.5 ? -1 : 1);
      var x = m * Math.pow(10, e), std = e > 0 ? n(Math.round(x)) : n(x, -e + 1);
      if (R() < 0.5) return Q('sc:' + m + 'e' + e, T('Write in scientific notation:', 'Écris en notation scientifique :') + ' ' + std + ' = <span class="nw">' + BLS + ' × 10<sup>' + BLS + '</sup></span>', n(m) + ' × 10<sup>' + (e < 0 ? '−' + -e : e) + '</sup>');
      return Q('sc:' + m + 'e' + e + 's', T('Write in standard form:', 'Écris sous forme usuelle :') + ' ' + n(m) + ' × 10<sup>' + (e < 0 ? '−' + -e : e) + '</sup> = ' + BLM, std);
    };
  }
  function linear(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), t = pick(R, c.kinds), m = nz(R, -6, 6), b = ri(R, -9, 9), Y = '<i>y</i>', X = '<i>x</i>';
      if (t === 'slope') return Q('li:s' + m + b, T('Slope of ', 'Pente de ') + Y + ' = ' + lin(m, b, X) + ': ' + BLS, n(m));
      if (t === 'int') return Q('li:i' + m + b, T('y-intercept of ', 'Ordonnée à l’origine de ') + Y + ' = ' + lin(m, b, X) + ': ' + BLS, n(b));
      if (t === 'xint') { var r = nz(R, -9, 9); return Q('li:x' + m + r, T('x-intercept of ', 'Abscisse à l’origine de ') + Y + ' = ' + lin(m, -m * r, X) + ': ' + BLS, n(r)); }
      if (t === 'pts') { var x1 = ri(R, -5, 5), y1 = ri(R, -5, 5), dx = nz(R, -4, 4); return Q('li:p' + x1 + y1 + dx + m, T('Equation of the line through (', 'Équation de la droite passant par (') + n(x1) + ', ' + n(y1) + T(') and (', ') et (') + n(x1 + dx) + ', ' + n(y1 + m * dx) + '):<br>' + Y + ' = ' + BLS + X + ' + ' + BLS, '<i>y</i> = ' + lin(m, y1 - m * x1, X)); }
      if (t === 'std') { var A = ri(R, 1, 6), B = nz(R, -6, 6), C = A * B * ri(R, -3, 3); return Q('li:f' + A + B + C, T('Write in the form ', 'Écris sous la forme ') + Y + ' = ' + '<i>mx</i> + <i>b</i>: ' + poly([A, 0], X).replace(/^/, '') + (B < 0 ? ' − ' + -B : ' + ' + B) + Y + ' = ' + n(C) + '<br>' + Y + ' = ' + BLM, '<i>y</i> = ' + (fterm(rf(-A, B), X, true) + (C ? fterm(rf(C, B), '', false) : ''))); }
      var x = ri(R, -6, 6);
      return Q('li:v' + m + b + x, T('If ', 'Si ') + Y + ' = ' + lin(m, b, X) + T(' and ', ' et ') + X + ' = ' + n(x) + ', ' + Y + ' = ' + BLS, n(m * x + b));
    };
  }
  function systems() {
    return function (R) {
      var x = ri(R, -6, 6), y = ri(R, -6, 6), a = nz(R, -4, 4), b = nz(R, -4, 4), c = nz(R, -4, 4), d = nz(R, -4, 4);
      if (a * d - b * c === 0) d = d + 1 || 2;
      var X = '<i>x</i>', Y = '<i>y</i>';
      return Q('sy:' + [x, y, a, b, c, d].join(), T('Solve:', 'Résous :') + ' ' + coef(a, X, true) + coef(b, Y, false) + ' = ' + n(a * x + b * y) + ' ; ' + coef(c, X, true) + coef(d, Y, false) + ' = ' + n(c * x + d * y) +
        '<br>' + X + ' = ' + BLS + ', ' + Y + ' = ' + BLS, X + ' = ' + n(x) + ', ' + Y + ' = ' + n(y));
    };
  }
  function quad(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), t = pick(R, c.kinds), X = '<i>x</i>', Y = '<i>y</i>', p = ri(R, -9, 9), q = ri(R, -9, 9), a = nz(R, -3, 3), h = ri(R, -6, 6), k = ri(R, -9, 9);
      if (t === 'roots') { if (p === q) q++; return Q('qu:r' + Math.min(p, q) + Math.max(p, q), T('Solve:', 'Résous :') + ' ' + poly([1, -(p + q), p * q], X) + ' = 0 &nbsp; ' + X + ' = ' + BLS + T(' or ', ' ou ') + BLS, both(n(Math.min(p, q)), n(Math.max(p, q)))); }
      var vf = Y + ' = ' + (a === 1 ? '' : a === -1 ? '−' : n(a)) + '(' + lin(1, -h, X) + ')<sup>2</sup>' + (k ? (k < 0 ? ' − ' + -k : ' + ' + k) : '');
      if (t === 'vertex') return Q('qu:v' + a + h + k, T('Vertex of ', 'Sommet de ') + vf + ': (' + BLS + ', ' + BLS + ')', '(' + n(h) + ', ' + n(k) + ')');
      if (t === 'open') return Q('qu:o' + a + h + k, vf + T(' opens', ' est ouverte vers le') + circ(T(['up', 'down'], ['haut', 'bas'])) + T(' Max/min value: ', ' Valeur max/min : ') + BLS, (a > 0 ? T('up', 'haut') + ', min ' : T('down', 'bas') + ', max ') + n(k));
      var A = nz(R, -4, 4), B = ri(R, -9, 9), C = ri(R, -9, 9);
      return Q('qu:d' + A + B + C, T('How many real roots does ', 'Combien de zéros réels a ') + poly([A, B, C], X) + ' = 0 ' + T('have?', '?') + circ(['0', '1', '2']), (B * B - 4 * A * C > 0 ? '2' : B * B === 4 * A * C ? '1' : '0'));
    };
  }
  function funcs(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), t = pick(R, c.kinds), a = nz(R, -5, 5), b = ri(R, -9, 9), x = ri(R, -5, 5), X = '<i>x</i>', f = '<i>f</i>';
      var cs = [a, b, ri(R, -5, 5)].slice(c.lin ? 1 : 0);
      if (t === 'eval') return Q('fn:e' + a + b + x, T('If ', 'Si ') + f + '(' + X + ') = ' + poly(cs, X) + ', ' + f + '(' + n(x) + ') = ' + BLS, n(cs.reduce(function (s, v) { return s * x + v; }, 0)));
      if (t === 'inv') return Q('fn:i' + a + b, T('Inverse of ', 'Réciproque de ') + f + '(' + X + ') = ' + lin(a, b, X) + ':<br>' + f + '<sup>−1</sup>(' + X + ') = ' + BLM, F(lin(1, -b, X), n(a)));
      var g = ri(R, 1, 4), k = ri(R, -5, 5);
      return Q('fn:c' + a + b + g + k, T('If ', 'Si ') + f + '(' + X + ') = ' + lin(a, b, X) + T(' and ', ' et ') + '<i>g</i>(' + X + ') = ' + lin(g, 0, X) + ', ' + f + '(<i>g</i>(' + n(k) + ')) = ' + BLS, n(a * g * k + b));
    };
  }
  function radicals() {
    return function (R) {
      var sq = pick(R, [4, 9, 16, 25, 36, 49]), r = pick(R, [2, 3, 5, 6, 7, 10]), t = R();
      if (t < 0.6) return Q('rd:' + sq * r, T('Simplify:', 'Simplifie :') + ' √' + sq * r + ' = ' + BLS + '√' + BLS, n(Math.sqrt(sq)) + '√' + r);
      var a = ri(R, 2, 9), b = ri(R, 1, 9);
      return Q('rd:a' + a + b + r, a + '√' + r + ' + ' + b + '√' + r + ' = ' + BLM, n(a + b) + '√' + r);
    };
  }
  function sequences(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), t = pick(R, c.kinds), a = ri(R, -10, 20), d = nz(R, -7, 9), k = ri(R, 8, 30), r = pick(R, [2, 3, -2]), g = ri(R, 1, 5);
      var seq = [0, 1, 2, 3].map(function (i) { return t === 'geo' ? g * Math.pow(r, i) : a + i * d; });
      if (t === 'next') return Q('sq:n' + seq.join(), T('Next two terms:', 'Les deux termes suivants :') + ' ' + seq.map(function (v) { return n(v); }).join(' ; ') + ' ; ' + BLS + ' ; ' + BLS, n(seq[3] + d) + ' ; ' + n(seq[3] + 2 * d));
      if (t === 'geo') { var m = ri(R, 5, 8); return Q('sq:g' + g + r + m, T('Geometric:', 'Suite géométrique :') + ' ' + seq.map(function (v) { return n(v); }).join(' ; ') + ' … ' + T('term ', 'terme ') + m + ' = ' + BLM, n(g * Math.pow(r, m - 1))); }
      return Q('sq:a' + a + d + k, T('Arithmetic:', 'Suite arithmétique :') + ' ' + seq.map(function (v) { return n(v); }).join(' ; ') + ' … <i>t</i><sub>' + k + '</sub> = ' + BLS, n(a + (k - 1) * d));
    };
  }
  var SPECIAL = [['sin', 30, '1/2'], ['cos', 60, '1/2'], ['tan', 45, '1'], ['sin', 90, '1'], ['cos', 0, '1'], ['sin', 0, '0'], ['cos', 90, '0'], ['sin', 150, '1/2'], ['cos', 180, '−1'], ['tan', 135, '−1'], ['sin', 270, '−1'], ['cos', 120, '−1/2']];
  function trig(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), t = pick(R, c.kinds), A = ri(R, 15, 75), h = ri(R, 5, 40);
      if (t === 'side') { var fn = pick(R, ['sin', 'cos', 'tan']), known = fn === 'tan' ? T('adjacent', 'côté adjacent') : T('hypotenuse', 'hypoténuse'), want = fn === 'cos' ? T('adjacent', 'côté adjacent') : T('opposite', 'côté opposé');
        return Q('tr:s' + fn + A + h, T('Right triangle: angle ' + A + '°, ' + known + ' ' + h + ' cm. Find the ' + want + ' (1 decimal):', 'Triangle rectangle : angle de ' + A + '°, ' + known + ' de ' + h + ' cm. Trouve le ' + want + ' (1 décimale) :') + ' ' + BLS + ' cm', n(round(h * Math[fn](A * Math.PI / 180), 1), 1) + ' cm'); }
      if (t === 'angle') { var o = ri(R, 3, 20), hh = o + ri(R, 2, 20); return Q('tr:a' + o + hh, T('Right triangle: opposite ' + o + ', hypotenuse ' + hh + '. Angle (nearest degree) = ', 'Triangle rectangle : opposé ' + o + ', hypoténuse ' + hh + '. Angle (au degré près) = ') + BLS + '°', Math.round(Math.asin(o / hh) * 180 / Math.PI) + '°'); }
      if (t === 'exact') { var s = pick(R, SPECIAL); return Q('tr:e' + s[0] + s[1], T('Exact value:', 'Valeur exacte :') + ' ' + s[0] + ' ' + s[1] + '° = ' + BLS, s[2]); }
      if (t === 'rad') { var d = pick(R, [30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 270, 300, 315, 360]); return Q('tr:r' + d, n(d) + '° = ' + BLS + ' ' + T('radians (in terms of π)', 'radians (en fonction de π)'), radStr(d)); }
      var a = ri(R, 5, 20), b = ri(R, 5, 20), C = pick(R, [40, 50, 60, 70, 80, 100, 110, 120]);
      return Q('tr:c' + a + b + C, T('Triangle: sides ' + a + ' and ' + b + ' with ' + C + '° between them. Third side (1 decimal) = ', 'Triangle : côtés de ' + a + ' et ' + b + ' avec un angle de ' + C + '° entre eux. Troisième côté (1 décimale) = ') + BLS, n(round(Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C * Math.PI / 180)), 1), 1));
    };
  }
  function logs(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), t = pick(R, c.kinds), b = pick(R, [2, 3, 5, 10]), e = ri(R, 1, b === 2 ? 7 : b === 10 ? 5 : 4);
      if (t === 'eval') return Q('lg:v' + b + e, 'log<sub>' + b + '</sub> ' + n(Math.pow(b, e)) + ' = ' + BLS, n(e));
      if (t === 'solve') return Q('lg:s' + b + e, T('Solve:', 'Résous :') + ' ' + b + '<sup><i>x</i></sup> = ' + n(Math.pow(b, e)) + ' &nbsp; <i>x</i> = ' + BLS, n(e));
      if (t === 'form') return Q('lg:f' + b + e, T('Write as a logarithm:', 'Écris sous forme logarithmique :') + ' ' + b + '<sup>' + e + '</sup> = ' + n(Math.pow(b, e)) + '<br>' + BLM, 'log<sub>' + b + '</sub> ' + n(Math.pow(b, e)) + ' = ' + e);
      var p = ri(R, 2, 9), q = ri(R, 2, 9);
      return Q('lg:l' + b + p + q, 'log<sub>' + b + '</sub> ' + p + ' + log<sub>' + b + '</sub> ' + q + ' = log<sub>' + b + '</sub> ' + BLS, n(p * q));
    };
  }
  function counting(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), t = pick(R, c.kinds), nn = ri(R, 4, 9), r = ri(R, 2, Math.min(4, nn - 1));
      if (t === 'fact') return Q('ct:f' + nn, nn + '! = ' + BLM, n(factorial(nn)));
      if (t === 'perm') return Q('ct:p' + nn + r, '<i>P</i>(' + nn + ', ' + r + ') = ' + BLM, n(factorial(nn) / factorial(nn - r)));
      if (t === 'comb') return Q('ct:c' + nn + r, '<i>C</i>(' + nn + ', ' + r + ') = ' + BLM, n(factorial(nn) / (factorial(r) * factorial(nn - r))));
      var s = ri(R, 2, 5), p = ri(R, 2, 5), d = ri(R, 2, 4);
      return Q('ct:o' + s + p + d, T('Outfits from ' + s + ' shirts, ' + p + ' pants and ' + d + ' hats:', 'Tenues avec ' + s + ' chandails, ' + p + ' pantalons et ' + d + ' chapeaux :') + ' ' + BLS, n(s * p * d));
    };
  }
  function interest(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), t = pick(R, c.kinds), P = 100 * ri(R, 5, 50), r = pick(R, [2, 3, 4, 5, 6]), y = ri(R, 2, 6);
      if (t === 'simple') return Q('in:s' + P + r + y, T('Simple interest on ' + H.money(P * 100) + ' at ' + r + '% per year for ' + y + ' years:', 'Intérêt simple sur ' + H.money(P * 100) + ' à ' + r + ' % par an pendant ' + y + ' ans :') + ' ' + BLM, H.money(P * r * y));
      return Q('in:c' + P + r + y, T(H.money(P * 100) + ' at ' + r + '% compounded yearly for ' + y + ' years grows to', H.money(P * 100) + ' à ' + r + ' % composé annuellement pendant ' + y + ' ans devient') + ' ' + BLM, H.money(Math.round(P * 100 * Math.pow(1 + r / 100, y))));
    };
  }
  function calculus(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), t = pick(R, c.kinds), X = '<i>x</i>', cs = [nz(R, -5, 5), ri(R, -9, 9), ri(R, -9, 9)], a = ri(R, -4, 4);
      if (t === 'deriv') { var deg = ri(R, 2, 4), co = [nz(R, -6, 6)]; for (var i = 0; i < deg; i++) co.push(ri(R, -7, 7));
        return Q('cl:d' + co.join(), T('If ', 'Si ') + '<i>f</i>(' + X + ') = ' + poly(co, X) + ', <i>f</i> ′(' + X + ') = ' + BLL, poly(co.slice(0, -1).map(function (v, i) { return v * (co.length - 1 - i); }), X)); }
      if (t === 'slope') return Q('cl:s' + cs.join() + a, T('Slope of the tangent to ', 'Pente de la tangente à ') + '<i>y</i> = ' + poly(cs, X) + T(' at ', ' en ') + X + ' = ' + n(a) + ': ' + BLS, n(2 * cs[0] * a + cs[1]));
      if (t === 'limit') { var k = nz(R, -6, 6); return Q('cl:l' + k, 'lim<sub>' + X + '→' + n(k) + '</sub> ' + F(poly([1, 0, -k * k], X), lin(1, -k, X)) + ' = ' + BLS, n(2 * k)); }
      return Q('cl:p' + cs.join() + a, 'lim<sub>' + X + '→' + n(a) + '</sub> (' + poly(cs, X) + ') = ' + BLS, n(cs[0] * a * a + cs[1] * a + cs[2]));
    };
  }

  // ---------- patterns ----------
  var SHAPE_KINDS = ['circle', 'square', 'triangle', 'star', 'diamond'];
  function shapePattern(pats) {
    return function (R, L) {
      var p = pick(R, lv(pats, L)), letters = [];
      p.split('').forEach(function (ch) { if (letters.indexOf(ch) < 0) letters.push(ch); });
      var sh = sample(R, SHAPE_KINDS, letters.length), len = p.length >= 4 ? 8 : 6, seq = [];
      for (var i = 0; i < len; i++) seq.push(sh[letters.indexOf(p[i % p.length])]);
      return Q('sp:' + p + ':' + sh.join(','), '<div class="row">' + H.patternSvg(seq) + '<span>' + T('Draw what comes next.', 'Dessine ce qui vient ensuite.') + '</span></div>', shapeName(sh[letters.indexOf(p[len % p.length])]));
    };
  }
  function numPattern(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), step = pick(R, c.steps), down = !!c.down && R() < 0.3, mult = !!c.mult && R() < 0.3, start;
      var seq;
      if (mult) { var r = pick(R, [2, 3]); start = ri(R, 1, 5); seq = [0, 1, 2, 3].map(function (i) { return start * Math.pow(r, i); }); step = 'x' + r; }
      else { start = down ? ri(R, 4 * step, c.max) : ri(R, 0, c.max - 4 * step); seq = [0, 1, 2, 3].map(function (i) { return down ? start - i * step : start + i * step; }); }
      if (c.rule && R() < 0.4) return Q('np:' + seq.join() + 'r', T('Find the rule:', 'Trouve la règle :') + ' <b>' + seq.map(function (v) { return n(v); }).join(', ') + '</b><br>' + T('Rule:', 'Règle :') + ' ' + BLM, mult ? T('multiply by ', 'multiplie par ') + String(step).slice(1) : down ? T('subtract ', 'soustrais ') + step : T('add ', 'ajoute ') + step);
      return Q('np:' + seq.join(), T('What comes next?', 'Quel nombre vient ensuite?') + '<br><b>' + seq.map(function (v) { return n(v); }).join(', ') + ',</b> ' + BLS, n(mult ? seq[3] * Number(String(step).slice(1)) : down ? seq[3] - step : seq[3] + step));
    };
  }
  function eqGroups(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), g = ri(R, 2, c[0]), k = ri(R, 2, c[1]);
      return Q('eg:' + g + 'x' + k, '<div class="row">' + H.groupsSvg(g, k) + '<span><span class="nw">' + BLS + T(' groups of ', ' groupes de ') + BLS + '</span><br>= ' + BLS + T(' in all', ' en tout') + '</span></div>', n(g) + T(' groups of ', ' groupes de ') + n(k) + ' = ' + n(g * k));
    };
  }

  return {
    lv: lv, gcd: gcd, lcm: lcm, F: F, poly: poly, lin: lin, NAMES: NAMES, ITEMS: ITEMS,
    count: count, numWord: numWord, bigger: bigger, compare: compare, beforeAfter: beforeAfter, skip: skip, order: order, evenOdd: evenOdd,
    tensOnes: tensOnes, placeValue: placeValue, rounding: rounding, arith: arith, missing: missing, word: word, orderOps: orderOps, powers: powers,
    sqrtEst: sqrtEst, primes: primes, fracShade: fracShade, fracEquiv: fracEquiv, fracSimplify: fracSimplify, fracCompare: fracCompare, fracOp: fracOp,
    fracOf: fracOf, mixedImproper: mixedImproper, decConvert: decConvert, percent: percent, ratio: ratio, coins: coins, change: change, clock: clock,
    elapsed: elapsed, calendar: calendar, units: units, geo: geo, angles: angles, shapes: shapes, pythag: pythag, coords: coords, stats: stats, prob: prob,
    evalExpr: evalExpr, solve: solve, likeTerms: likeTerms, expand: expand, factor: factor, expLaws: expLaws, sciNot: sciNot, linear: linear,
    systems: systems, quad: quad, funcs: funcs, radicals: radicals, sequences: sequences, trig: trig, logs: logs, counting: counting,
    interest: interest, calculus: calculus, geom: geom, shapePattern: shapePattern, numPattern: numPattern, eqGroups: eqGroups
  };
};
