// Kindergarten (United States). Made by scripts/make_us_packs.py from en-0.js: edit those, then run the script. Content for the worksheet engine in assets/hw-core.js.
// Many questions are meant to be read aloud by a grown-up.
'use strict';
HW.register('us-0', function (H) {
  var M = H.M, W = H.W, Q = H.Q, pick = H.pick, shuffle = H.shuffle, sample = H.sample, circ = H.circ, ri = H.ri, BL = H.BL, BLS = H.BLS, BLM = H.BLM;
  var UP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), LOW = 'abcdefghijklmnopqrstuvwxyz'.split('');
  var LOOKALIKE = { b: 'dpq', d: 'bpq', p: 'bdq', q: 'pbd', m: 'nw', n: 'mu', u: 'nv', w: 'mv', h: 'nk', i: 'lj', l: 'it', f: 'tk', t: 'fl', c: 'eo', e: 'ca', o: 'ca', a: 'eo', g: 'qy', y: 'gv', v: 'uy', s: 'zc', z: 'sx', x: 'zk', k: 'hx', r: 'nv', j: 'ig' };
  function big(s) { return '<span class="big">' + s + '</span>'; }
  function likeL(R, ch) { var pool = (LOOKALIKE[ch] || 'aeo').split('').filter(function (c) { return c !== ch; }); return sample(R, pool, Math.min(2, pool.length)); }

  // ---------- Letters & sounds ----------
  var START = ['apple|a', 'ball|b', 'cat|c', 'dog|d', 'egg|e', 'fish|f', 'goat|g', 'hat|h', 'igloo|i', 'jam|j', 'kite|k', 'lion|l', 'moon|m', 'nest|n', 'octopus|o',
    'pig|p', 'queen|q', 'rain|r', 'sun|s', 'tiger|t', 'umbrella|u', 'van|v', 'web|w', 'yo-yo|y', 'zebra|z', 'banana|b', 'milk|m', 'sock|s', 'top|t', 'fox|f', 'map|m', 'bus|b'];
  var SIGHT = ['the', 'and', 'a', 'I', 'is', 'it', 'in', 'to', 'can', 'see', 'we', 'me', 'my', 'go', 'up', 'like', 'look', 'you', 'he', 'she', 'at', 'on', 'no', 'yes'];
  var RHY = ['cat|hat|dog', 'sun|run|cup', 'pig|wig|bed', 'bed|red|fan', 'hop|top|bus', 'man|can|fish', 'bug|rug|hen', 'cake|lake|ball', 'king|ring|frog', 'star|car|moon', 'mop|stop|ten', 'goat|boat|tree'];
  var smallFor = function (R) { var i = ri(R, 0, 25), ch = LOW[i]; return Q('sf:' + ch, 'Circle the small letter for ' + big(UP[i]) + circ(shuffle(R, likeL(R, ch).concat([ch]))), ch); };
  var bigFor = function (R) { var i = ri(R, 0, 25); return Q('bf:' + i, 'Write the big letter for ' + big(LOW[i]) + ': ' + BLS, UP[i]); };
  var nextLetter = function (R) { var i = ri(R, 0, 22); return Q('nl:' + i, 'What letter comes next?<br>' + big(UP[i] + ' ' + UP[i + 1] + ' ' + UP[i + 2]) + ' ' + BLS, UP[i + 3]); };
  var firstSound = function (R) {
    var p = pick(R, START).split('|'), others = sample(R, LOW.filter(function (c) { return c !== p[1] && 'qxz'.indexOf(c) < 0; }), 2);
    return Q('fs:' + p[0], 'Say <b>' + p[0] + '</b>. What sound does it start with?' + circ(shuffle(R, others.concat([p[1]]))), p[1]);
  };
  var sight = function (R) {
    var w = pick(R, SIGHT), others = sample(R, SIGHT.filter(function (x) { return x !== w; }), 2);
    return Q('sw:' + w, 'Circle the word ' + big(w) + circ(shuffle(R, others.concat([w]))), w);
  };
  var rhyme = function (R) {
    var p = pick(R, RHY).split('|');
    return Q('rh:' + p[0], 'Which word rhymes with <b>' + p[0] + '</b>?' + circ(shuffle(R, p.slice(1))), p[1]);
  };
  function letters(L) {
    if (L === 'easy') return [smallFor, bigFor, nextLetter, firstSound];
    return [smallFor, bigFor, nextLetter, firstSound, sight, rhyme];
  }

  // ---------- Printing ----------
  var COPY = ['cat', 'dog', 'sun', 'mom', 'dad', 'red', 'big', 'hat', 'pig', 'bus', 'fun', 'yes', 'run', 'map', 'box', 'cup', 'bed', 'hen', 'jam', 'zip'];
  var writeLetter = function (R) { var i = ri(R, 0, 25); return Q('wl:' + i, 'Print ' + big(UP[i] + ' ' + LOW[i]) + ' : ' + BLS + ' ' + BLS + ' ' + BLS, H.open()); };
  var copyWord = function (R) { var w = pick(R, COPY); return Q('cw:' + w, 'Copy the word ' + big(w) + ': ' + BLM, w); };
  var missingLetter = function (R) { var w = pick(R, COPY), k = ri(R, 0, 2); return Q('ml:' + w + k, 'Fill in the missing letter: ' + big(w.slice(0, k) + '_' + w.slice(k + 1)).replace('_', BLS) + ' (' + w + ')', w.charAt(k)); };
  var writeName = function (R) { var n = ri(R, 1, 3); return Q('nm:' + n, (n === 1 ? 'Print your first name:' : n === 2 ? 'Print your name again, neatly:' : 'Print your name in big letters:') + '<br>' + H.BLL, H.open()); };
  function printing(L) {
    if (L === 'easy') return [writeLetter, copyWord, missingLetter, writeName];
    return [writeLetter, copyWord, missingLetter, writeName];
  }

  return {
    subjects: [
      H.C.math(0),
      { id: 'letters', name: 'Letters & Sounds', kinds: letters },
      { id: 'printing', name: 'Printing', kinds: printing },
      H.C.second(0)
    ]
  };
});
