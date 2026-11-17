// English language arts for Grades 4 to 12: spelling, grammar, punctuation, vocabulary and literary terms.
// Lists are grouped by the grade they start at; a sheet uses the lists from its grade and the few grades below.
'use strict';
window.HWLIB = window.HWLIB || {};
window.HWLIB.E = function (H) {
  var Q = H.Q, pick = H.pick, shuffle = H.shuffle, sample = H.sample, esc = H.esc, circ = H.circ, ri = H.ri, BL = H.BL, BLS = H.BLS, BLM = H.BLM, BLL = H.BLL;

  var SPELL = {
    4: ['separate|seperate|separete', 'necessary|neccessary|necesary', 'beginning|begining|beggining', 'business|buisness|busness', 'calendar|calender|calandar',
      'environment|enviroment|envirnment', 'government|goverment|govermint', 'interesting|intresting|interisting', 'knowledge|knowlege|nowledge', 'opposite|oposite|opposit',
      'temperature|temprature|temperture', 'vegetable|vegtable|vegetible', 'weird|wierd|weerd', 'height|heighth|hight', 'island|iland|islend', 'guard|gaurd|gard'],
    6: ['accommodate|accomodate|acommodate', 'definitely|definately|definitly', 'embarrass|embarass|embaras', 'occurred|occured|ocurred', 'rhythm|rythm|rhythym',
      'privilege|priviledge|privelege', 'conscience|concience|consciance', 'parallel|paralell|parralel', 'recommend|reccomend|recomend', 'restaurant|restaraunt|resturant',
      'schedule|schedual|skedule', 'tomorrow|tommorow|tommorrow', 'disappear|dissapear|disapear', 'exaggerate|exagerate|exxagerate'],
    8: ['conscientious|consciencious|conscientous', 'millennium|millenium|milennium', 'occasionally|occasionaly|ocasionally', 'perseverance|perseverence|perserverance',
      'questionnaire|questionaire|questionnair', 'maintenance|maintainance|maintenence', 'liaison|liason|liasion', 'mischievous|mischievious|mischevous',
      'pronunciation|pronounciation|pronunciaton', 'acquaintance|aquaintance|acquaintence', 'bureaucracy|beaurocracy|bureacracy', 'entrepreneur|entrepeneur|entreprenur'],
    10: ['onomatopoeia|onomatopeia|onamatopoeia', 'connoisseur|conoisseur|connoiseur', 'idiosyncrasy|idiosyncracy|idiosincrasy', 'supersede|supercede|superseed',
      'inoculate|innoculate|inocculate', 'minuscule|miniscule|minniscule', 'harass|harrass|harras', 'accidentally|accidently|accidentaly', 'fluorescent|florescent|flourescent',
      'unnecessary|unneccessary|unecessary', 'liquefy|liquify|liqufy', 'dilemma|dilemna|dilema']
  };
  var CONFUSED = {
    4: ['___ going to the park.|They’re|There|Their', 'The dog wagged ___ tail.|its|it’s', '___ the best day ever!|It’s|Its', 'Is this ___ coat?|your|you’re',
      '___ welcome to join us.|You’re|Your', 'I ate ___ much cake.|too|to', 'We need ___ chairs.|two|too', 'Turn ___ at the light.|right|write', 'I ___ the race.|won|one',
      'The ___ of the story is happy.|end|and', 'Please be ___.|quiet|quite', 'The test was ___ easy.|quite|quiet', 'I ___ my keys.|lost|loss', 'She ran ___ the house.|through|threw'],
    6: ['The rain will ___ the game.|affect|effect', 'The ___ was amazing.|effect|affect', 'I would rather run ___ walk.|than|then', 'First we eat, ___ we play.|then|than',
      'Don’t ___ your wallet.|lose|loose', 'My shoelace is ___.|loose|lose', 'I ___ you were coming.|knew|new', 'Everyone came ___ Sam.|except|accept', 'Please ___ this gift.|accept|except',
      'We ___ the bus stop.|passed|past', 'In the ___, people walked.|past|passed', 'The ___ of the school spoke.|principal|principle', 'Honesty is my ___.|principle|principal',
      '___ bag is this?|Whose|Who’s'],
    8: ['___ items, please (express lane).|Fewer|Less', 'I have ___ time than you.|less|fewer', 'She did ___ on the test.|well|good', 'That is a ___ idea.|good|well',
      'Please ___ down for a nap.|lie|lay', '___ the book on the table.|Lay|Lie', 'Between you and ___.|me|I', 'Sam and ___ went to the game.|I|me',
      'To ___ it may concern.|whom|who', '___ is at the door?|Who|Whom', 'He gave good ___.|advice|advise', 'I ___ you to study.|advise|advice', 'The ___ is located downtown.|stationery store|stationary store'],
    10: ['Neither of the answers ___ correct.|is|are', 'Each of the students ___ a book.|has|have',
      'If I ___ you, I would apologize.|were|was', 'She ___ the novel before the film came out.|had read|has read',
      'The news ___ surprising.|was|were', 'He ___ to the store yesterday.|went|gone',
      'Please ___ the rules.|comply with|comply to', 'The noise was ___.|incessant|incessive', 'Her remarks were ___ to the topic.|irrelevant|irrevelant']
  };
  var POS = {
    4: ['noun|The <u>puppy</u> <u>barked</u> <u>loudly</u>.|puppy|barked|loudly', 'verb|My sister <u>painted</u> a <u>bright</u> <u>picture</u>.|painted|bright|picture',
      'adjective|The <u>enormous</u> <u>whale</u> <u>swam</u>.|enormous|whale|swam', 'adverb|She <u>sang</u> <u>softly</u> to the <u>baby</u>.|softly|sang|baby',
      'pronoun|<u>They</u> <u>ran</u> to the <u>bus</u>.|They|ran|bus', 'noun|Our <u>teacher</u> <u>smiled</u> <u>warmly</u>.|teacher|smiled|warmly',
      'adjective|We climbed a <u>steep</u> <u>hill</u> <u>slowly</u>.|steep|hill|slowly', 'adverb|The turtle <u>moved</u> <u>very</u> <u>slowly</u>.|slowly|moved|turtle',
      'verb|The <u>children</u> <u>giggled</u> <u>happily</u>.|giggled|children|happily', 'pronoun|Mia gave <u>her</u> <u>friend</u> a <u>gift</u>.|her|friend|gift'],
    6: ['preposition|The cat hid <u>under</u> the <u>porch</u> <u>quietly</u>.|under|porch|quietly', 'conjunction|I wanted to go, <u>but</u> it <u>was</u> <u>raining</u>.|but|was|raining',
      'interjection|<u>Wow</u>, that <u>was</u> <u>amazing</u>!|Wow|was|amazing', 'preposition|We walked <u>across</u> the <u>bridge</u> <u>together</u>.|across|bridge|together',
      'conjunction|You can have juice <u>or</u> <u>milk</u> <u>today</u>.|or|milk|today', 'adverb|The storm ended <u>suddenly</u> <u>last</u> <u>night</u>.|suddenly|last|night',
      'adjective|<u>Several</u> <u>geese</u> <u>flew</u> south.|Several|geese|flew', 'pronoun|<u>Everyone</u> <u>cheered</u> <u>loudly</u>.|Everyone|cheered|loudly'],
    8: ['gerund|<u>Swimming</u> <u>is</u> my <u>favourite</u> sport.|Swimming|is|favourite', 'infinitive|She hopes <u>to travel</u> <u>soon</u> <u>abroad</u>.|to travel|soon|abroad',
      'participle|The <u>broken</u> <u>vase</u> <u>fell</u>.|broken|vase|fell', 'linking verb|The soup <u>smells</u> <u>delicious</u> <u>today</u>.|smells|delicious|today',
      'helping verb|We <u>have</u> <u>finished</u> the <u>project</u>.|have|finished|project', 'relative pronoun|The book <u>that</u> I <u>read</u> was <u>long</u>.|that|read|long']
  };
  var PUNCT = {
    4: ['we need eggs flour and sugar|We need eggs, flour and sugar.', 'mr ito lives in kelowna british columbia|Mr. Ito lives in Kelowna, British Columbia.', 'on july 1 2026 we watched fireworks|On July 1, 2026, we watched fireworks.', 'wow what a great goal|Wow, what a great goal!', 'yes i can come to your party|Yes, I can come to your party.',
      'the dogs bowl is empty|The dog’s bowl is empty.', 'my brothers bike is red|My brother’s bike is red.', 'can you help me carry this|Can you help me carry this?', 'dear grandma thank you for the gift|Dear Grandma, thank you for the gift.'],
    6: ['“Where are you going” asked Mom.|“Where are you going?” asked Mom.', 'Ella said “I love this song”|Ella said, “I love this song.”', 'the students projects were on display|The students’ projects were on display.', 'its time to go said the coach|“It’s time to go,” said the coach.',
      'however we decided to stay home|However, we decided to stay home.', 'after the game we went for pizza|After the game, we went for pizza.', 'my aunt who lives in Moncton is a nurse|My aunt, who lives in Moncton, is a nurse.', 'Ottawa Ontario is Canada’s capital|Ottawa, Ontario, is Canada’s capital.'],
    8: ['I have three goals learn French run a 5K and read more|I have three goals: learn French, run a 5K and read more.', 'The weather was cold nevertheless we went skating|The weather was cold; nevertheless, we went skating.', 'She packed the following a map a flashlight and water|She packed the following: a map, a flashlight and water.',
      'My favourite cities are Victoria BC Halifax NS and Quebec City QC|My favourite cities are Victoria, BC; Halifax, NS; and Quebec City, QC.', 'The movie which was long was worth it|The movie, which was long, was worth it.', 'It was late we went home|It was late; we went home.',
      'Its tail wagged its happy to see you|Its tail wagged; it’s happy to see you.'],
    10: ['The committee’s decision—though unpopular—was final|The committee’s decision—though unpopular—was final.', 'There are two options stay or leave|There are two options: stay or leave.', 'The author writes “Hope is the thing with feathers”|The author writes, “Hope is the thing with feathers.”',
      'She checked the stove locked the door and left|She checked the stove, locked the door and left.', 'The results were clear the experiment had failed|The results were clear: the experiment had failed.', 'Whose idea was it the teachers or the students|Whose idea was it: the teacher’s or the students’?']
  };
  var SENT_TYPE = ['Close the door, please.|imperative', 'Where is the library?|interrogative', 'What a beautiful sunset!|exclamatory', 'The lake froze last night.|declarative',
    'Please pass the salt.|imperative', 'Did you finish your homework?|interrogative', 'I can’t believe we won!|exclamatory', 'Canada has ten provinces.|declarative',
    'Wash your hands before dinner.|imperative', 'Are geese flying south yet?|interrogative', 'That was so scary!|exclamatory', 'Beavers build dams.|declarative'];
  var STRUCT = ['I ran, and she walked.|compound', 'Because it rained, we stayed inside.|complex', 'The dog barked.|simple', 'We ate lunch, but Ali was still hungry.|compound',
    'When the bell rang, students left.|complex', 'My cousin plays the violin.|simple', 'I studied hard, so I passed.|compound', 'Although it was late, we kept reading.|complex',
    'The geese flew south for the winter.|simple', 'She smiled because she won.|complex', 'You can walk, or you can take the bus.|compound', 'Sam and Lee built a fort.|simple'];
  var FRAG = ['Running down the hallway.|fragment', 'The game was fun we played until dark.|run-on', 'We went to the park after school.|complete', 'Because I was tired.|fragment',
    'It snowed all night the roads were icy.|run-on', 'The class planted trees in May.|complete', 'After the movie ended.|fragment', 'I like hockey my brother likes soccer.|run-on',
    'Our team won the final game.|complete', 'Under the big maple tree.|fragment', 'She studied hard she passed the test.|run-on', 'Leila wrote a poem about winter.|complete'];
  var FIG = {
    4: ['The snow was as white as a sheet.|simile|metaphor|hyperbole', 'The wind whispered through the trees.|personification|simile|alliteration',
      'Sally sells seashells by the seashore.|alliteration|simile|metaphor', 'I’m so hungry I could eat a horse.|hyperbole|simile|personification',
      'The bees buzzed in the garden.|onomatopoeia|metaphor|hyperbole', 'My brother is a couch potato.|metaphor|simile|alliteration',
      'She runs like the wind.|simile|metaphor|personification', 'The sun smiled down on us.|personification|hyperbole|simile'],
    7: ['It’s raining cats and dogs.|idiom|simile|personification', 'Time is a thief.|metaphor|simile|onomatopoeia', 'The classroom was a zoo.|metaphor|simile|idiom',
      'I’ve told you a million times!|hyperbole|metaphor|alliteration', 'The fire station burned down. How ironic!|irony|simile|hyperbole',
      'Busy as a bee.|simile|metaphor|irony', 'The car coughed and sputtered.|personification|simile|idiom', 'Break a leg tonight!|idiom|hyperbole|metaphor'],
    10: ['“Jumbo shrimp”|oxymoron|metaphor|simile', '“I came, I saw, I conquered.”|parallelism|oxymoron|euphemism', '“He passed away” instead of “he died”|euphemism|irony|hyperbole',
      '“The pen is mightier than the sword.”|metonymy|simile|oxymoron', '“All hands on deck.”|synecdoche|hyperbole|irony', '“Sweet sorrow”|oxymoron|euphemism|allusion',
      'Calling a strong person “a real Hercules”|allusion|metaphor|oxymoron', '“Never, never, never give up.”|repetition|irony|euphemism']
  };
  var TERMS = {
    6: ['The main character of a story|protagonist|antagonist|narrator', 'The time and place of a story|setting|plot|theme', 'The most exciting turning point|climax|resolution|setting',
      'The problem in a story|conflict|theme|setting', 'Who tells the story|narrator|author|protagonist', 'The lesson or message of a story|theme|plot|conflict',
      'Story told using “I”|first person|third person|second person', 'Character who opposes the hero|antagonist|protagonist|narrator'],
    9: ['Hints about what will happen later|foreshadowing|flashback|irony', 'A scene from the past|flashback|foreshadowing|symbol', 'An object that stands for an idea|symbol|motif|theme',
      'Opposite of what is expected|irony|symbol|tone', 'The author’s attitude toward the subject|tone|mood|theme', 'The feeling a reader gets|mood|tone|plot',
      'A character who does not change|static character|dynamic character|foil', 'A character who contrasts with another|foil|antagonist|narrator',
      'Narrator who knows all thoughts|third person omniscient|third person limited|first person'],
    11: ['A long speech by one character alone on stage|soliloquy|aside|monologue', 'A remark heard by the audience only|aside|soliloquy|dialogue',
      'The hero’s fatal flaw in a tragedy|hamartia|catharsis|hubris', 'Excessive pride|hubris|hamartia|pathos', 'An appeal to emotion|pathos|logos|ethos',
      'An appeal to logic|logos|pathos|ethos', 'An appeal to credibility|ethos|logos|pathos', 'Unrhymed lines in iambic pentameter|blank verse|free verse|sonnet',
      'A 14-line poem|sonnet|haiku|limerick', 'The audience knows more than a character|dramatic irony|verbal irony|situational irony']
  };
  var ROOTS = {
    5: ['bio = ?|life|water|star', 'geo = ?|earth|sound|light', 'tele = ?|far|small|heat', 'micro = ?|small|large|many', 'port = ?|carry|see|write', 'graph = ?|write|hear|fear',
      'aqua = ?|water|air|sun', 'phon = ?|sound|light|life', 'pre- = ?|before|after|again', 're- = ?|again|before|not', 'un- = ?|not|very|under', '-less = ?|without|full of|more'],
    8: ['chron = ?|time|place|heat', 'dict = ?|say|see|go', 'spect = ?|look|carry|hear', 'struct = ?|build|break|write', 'vid / vis = ?|see|speak|give', 'mal- = ?|bad|good|many',
      'bene- = ?|good|bad|across', 'auto- = ?|self|many|half', 'anti- = ?|against|before|with', 'trans- = ?|across|under|again', 'poly- = ?|many|one|half', '-ology = ?|study of|fear of|full of'],
    10: ['philo = ?|love|fear|sound', 'mis / mit = ?|send|see|say', 'cred = ?|believe|carry|heat', 'path = ?|feeling|path|light', 'ambi- = ?|both|neither|before',
      'circum- = ?|around|under|after', 'omni- = ?|all|none|one', 'pseudo- = ?|false|new|many', 'magn = ?|great|small|middle', 'loqu / locu = ?|speak|hear|walk']
  };
  var SYN = {
    4: ['brave|courageous', 'tiny|minuscule', 'angry|furious', 'happy|cheerful', 'begin|commence', 'shout|holler', 'smart|intelligent', 'quick|rapid', 'tired|exhausted', 'fix|repair'],
    7: ['abundant|plentiful', 'reluctant|hesitant', 'ancient|antique', 'gloomy|dismal', 'generous|charitable', 'vivid|bright', 'fragile|delicate', 'meticulous|careful',
      'obstinate|stubborn', 'candid|frank', 'hostile|unfriendly', 'tranquil|calm'],
    10: ['ubiquitous|everywhere', 'ephemeral|short-lived', 'benevolent|kind', 'pragmatic|practical', 'gregarious|sociable', 'lucid|clear', 'tenacious|persistent',
      'ambiguous|unclear', 'diligent|hard-working', 'candour|honesty', 'verbose|wordy', 'frugal|thrifty', 'cynical|distrustful', 'eloquent|well-spoken']
  };
  var ANT = {
    4: ['ancient|modern', 'generous|selfish', 'shallow|deep', 'expand|shrink', 'victory|defeat', 'arrive|depart', 'include|exclude', 'rough|smooth', 'polite|rude', 'temporary|permanent'],
    7: ['abundant|scarce', 'humble|arrogant', 'transparent|opaque', 'optimist|pessimist', 'maximum|minimum', 'reveal|conceal', 'praise|criticize', 'novice|expert', 'vague|precise'],
    10: ['benevolent|malevolent', 'frugal|extravagant', 'candid|evasive', 'ephemeral|enduring', 'verbose|concise', 'diligent|lazy', 'lucid|confusing', 'tenacious|yielding']
  };
  var VOICE = ['The ball was thrown by Ali.|passive', 'Ali threw the ball.|active', 'The cake was baked by Grandma.|passive', 'Grandma baked the cake.|active',
    'The window was broken.|passive', 'The storm broke the window.|active', 'The novel was written in 1908.|passive', 'Lucy Maud Montgomery wrote the novel.|active',
    'The vote was counted by volunteers.|passive', 'Volunteers counted the vote.|active', 'Mistakes were made.|passive', 'The committee approved the plan.|active'];
  var TO_ACTIVE = ['The game was won by our team.|Our team won the game.', 'The letter was written by Priya.|Priya wrote the letter.', 'The trees were planted by the students.|The students planted the trees.', 'The song was sung by the choir.|The choir sang the song.',
    'The bridge was built by engineers.|Engineers built the bridge.', 'The meal was cooked by my uncle.|My uncle cooked the meal.', 'The race was won by a rookie.|A rookie won the race.', 'The mural was painted by local artists.|Local artists painted the mural.'];
  var FACT = ['Ottawa is the capital of Canada.|fact', 'Hockey is the most exciting sport.|opinion', 'Water freezes at 0 °C.|fact', 'Summer is the best season.|opinion',
    'The Bay of Fundy has very high tides.|fact', 'Cats are better pets than dogs.|opinion', 'Canada has three oceans on its coasts.|fact', 'Broccoli tastes awful.|opinion',
    'Maple syrup comes from maple sap.|fact', 'Everyone should learn to skate.|opinion', 'The Rocky Mountains are in western Canada.|fact', 'Math is more fun than art.|opinion'];
  var COMBINE = ['The dog was tired. The dog lay down.|The tired dog lay down.', 'It was raining. We played inside.|It was raining, so we played inside.', 'Mia likes soccer. Mia likes hockey.|Mia likes soccer and hockey.', 'The bus was late. We missed the movie.|The bus was late, so we missed the movie.',
    'I studied. I passed the test.|I studied, so I passed the test.', 'The lake is deep. The lake is cold.|The lake is deep and cold.', 'Omar finished his work. Omar went outside.|Omar finished his work and went outside.', 'The museum opened. Crowds rushed in.|When the museum opened, crowds rushed in.'];

  // pick lists for a grade: bands from grade-4 up to this grade (easy leans on the lower bands)
  function bands(obj, g, L) {
    var keys = Object.keys(obj).map(Number).filter(function (b) { return b <= g && b >= g - 5; });
    if (!keys.length) keys = [Math.min.apply(null, Object.keys(obj).map(Number))];
    if (L === 'easy' && keys.length > 1) keys = keys.slice(0, -1);
    var out = [];
    keys.forEach(function (b) { out = out.concat(obj[b]); });
    return out;
  }
  function kinds(grade) {
    var g = Number(grade);
    return function (L) {
      var spell = bands(SPELL, g, L), conf = bands(CONFUSED, g, L), pos = bands(POS, g, L), punct = bands(PUNCT, g, L), syn = bands(SYN, g, L), ant = bands(ANT, g, L);
      var k = [
        function (R) { var p = pick(R, spell).split('|'); return Q('sp:' + p[0], 'Circle the correct spelling:' + circ(shuffle(R, p.map(function (w) { return w.replace('?', ''); }))), esc(p[0].replace('?', ''))); },
        function (R) { var p = pick(R, conf).split('|'); return Q('cf:' + p[0], esc(p[0]).replace('___', BLS) + circ(shuffle(R, p.slice(1))), esc(p[1])); },
        function (R) { var p = pick(R, pos).split('|'); return Q('ps:' + p[1], 'Circle the <b>' + p[0] + '</b>: ' + p[1].replace(/<u>|<\/u>/g, '') + circ(shuffle(R, p.slice(2))), esc(p[2])); },
        function (R) { var p = pick(R, punct).split('|'); return Q('pu:' + p[0], 'Fix the capitals and punctuation: <i>' + esc(p[0]) + '</i>' + BLL, esc(p[1])); },
        function (R) { var p = pick(R, syn).split('|'); return Q('sy:' + p[0], 'Synonym for <b>' + esc(p[0]) + '</b>: ' + BLM, 'e.g. ' + esc(p[1])); },
        function (R) { var p = pick(R, ant).split('|'); return Q('an:' + p[0], 'Antonym for <b>' + esc(p[0]) + '</b>: ' + BLM, esc(p[1])); }
      ];
      if (g >= 4) k.push(function (R) { var p = pick(R, bands(FIG, g, L)).split('|'); return Q('fg:' + p[0], esc(p[0]) + circ(shuffle(R, p.slice(1))), esc(p[1])); });
      if (g >= 5) k.push(function (R) { var p = pick(R, bands(ROOTS, g, L)).split('|'); return Q('rt:' + p[0], 'Meaning of <b>' + esc(p[0].replace(' = ?', '')) + '</b>:' + circ(shuffle(R, p.slice(1))), esc(p[1])); });
      if (g <= 6) k.push(function (R) { var p = pick(R, SENT_TYPE).split('|'); return Q('st:' + p[0], esc(p[0]) + circ(shuffle(R, ['declarative', 'interrogative', 'imperative', 'exclamatory'])), esc(p[1])); });
      if (g >= 5 && g <= 9) k.push(function (R) { var p = pick(R, FRAG).split('|'); return Q('fr:' + p[0], esc(p[0]) + circ(['complete', 'fragment', 'run-on']), esc(p[1])); });
      if (g >= 6) k.push(function (R) { var p = pick(R, STRUCT).split('|'); return Q('ss:' + p[0], esc(p[0]) + circ(['simple', 'compound', 'complex']), esc(p[1])); });
      if (g >= 6) k.push(function (R) { var p = pick(R, bands(TERMS, g, L)).split('|'); return Q('lt:' + p[0], esc(p[0]) + ':' + circ(shuffle(R, p.slice(1))), esc(p[1])); });
      if (g >= 4 && g <= 8) k.push(function (R) { var p = pick(R, FACT).split('|'); return Q('fo:' + p[0], esc(p[0]) + circ(['fact', 'opinion']), esc(p[1])); });
      if (g >= 4 && g <= 9 && L !== 'easy') k.push(function (R) { var p = pick(R, COMBINE).split('|'); return Q('cb:' + p[0], 'Combine into one sentence: <i>' + esc(p[0]) + '</i>' + BLL, 'e.g. ' + esc(p[1])); });
      if (g >= 8) k.push(function (R) { var p = pick(R, VOICE).split('|'); return Q('vo:' + p[0], esc(p[0]) + circ(['active', 'passive']), esc(p[1])); });
      if (g >= 8 && L !== 'easy') k.push(function (R) { var p = pick(R, TO_ACTIVE).split('|'); return Q('ta:' + p[0], 'Rewrite in the active voice: <i>' + esc(p[0]) + '</i>' + BLL, esc(p[1])); });
      if (g <= 6) k.push(H.W.enPastKind(Object.keys(H.W.EN_IRR)));
      if (g >= 7 && g <= 9) k.push(H.W.enPastKind(Object.keys(H.W.EN_IRR), true));
      return k;
    };
  }
  return { kinds: kinds };
};
