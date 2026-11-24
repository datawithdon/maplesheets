// Grade 2 (United States). Made by scripts/make_us_packs.py from en-2.js: edit those, then run the script. Content for the worksheet engine in assets/hw-core.js.
'use strict';
HW.register('us-2', function (H) {
  var has = H.has, ri = H.ri, pick = H.pick, shuffle = H.shuffle, sample = H.sample, esc = H.esc, circ = H.circ, Q = H.Q, an = H.an, pad2 = H.pad2;
  var BL = H.BL, BLS = H.BLS, BLL = H.BLL, BLM = H.BLM, TIME = H.TIME, BOX = H.BOX;
  var coinsSvg = H.coinsSvg, clockSvg = H.clockSvg, groupsSvg = H.groupsSvg, fracSvg = H.fracSvg, patternSvg = H.patternSvg;
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  var STORIES = /*STORIES*/{
"easy": [
{"title": "The Red Kite", "text": "Ana has a red kite. She takes it to the park with her dad. The wind is strong. The kite goes up, up, up! It flies over the trees. Then the wind stops. The kite comes down in the grass. Ana runs to get it. “Let’s try again,” says Dad. The kite flies high once more. Ana smiles.", "q": ["T|Ana has a red kite.", "F|Ana goes to the park with her mom.", "T|The wind is strong.", "F|The kite flies over a lake.", "T|The kite comes down in the grass.", "F|Dad runs to get the kite.", "T|The kite flies high again.", "F|Ana is sad at the end.", "T|Ana goes to the park.", "C|What color is the kite?|blue|red*|green", "C|Who goes with Ana?|her dad*|her mom|her friend", "C|Where do they go?|the beach|the zoo|the park*", "C|What makes the kite go up?|the wind*|the rain|the sun", "C|What does the kite fly over?|the trees*|the houses|the cars", "C|Where does the kite come down?|in a pond|in the grass*|on a roof", "C|Who runs to get the kite?|Dad|a dog|Ana*", "C|What does Dad say?|Let’s go home|Let’s try again*|Let’s eat", "C|How does Ana feel at the end?|happy*|sad|angry", "B|Ana has a red ____.|kite", "B|The ____ is strong.|wind", "B|The kite goes up, up, ____!|up", "B|The kite comes down in the ____.|grass", "B|Ana ____ to get it.|runs", "B|The kite flies ____ once more.|high", "B|At the end, Ana ____.|smiles"]},
{"title": "Priya’s Garden", "text": "Priya has a small garden behind her house. In May, she plants seeds with her grandma. She waters them every day. Soon, little green plants pop up. In July, the plants have red tomatoes and yellow beans. Priya picks a big tomato. Grandma makes a salad. “Our garden is yummy!” says Priya.", "q": ["T|Priya has a garden.", "F|The garden is in front of a school.", "T|Priya plants seeds with her grandma.", "F|She waters the seeds once a week.", "T|The little plants are green.", "F|The tomatoes are yellow.", "T|Grandma makes a salad.", "F|Priya picks a small carrot.", "T|The plants have beans.", "C|Where is the garden?|behind her house*|at the park|at school", "C|Who helps Priya plant?|her dad|her grandma*|her teacher", "C|When does she plant seeds?|in May*|in June|in March", "C|How often does she water them?|every day*|every week|never", "C|What color are the beans?|green|red|yellow*", "C|What does Priya pick?|a bean|a big tomato*|a flower", "C|What does Grandma make?|a pie|soup|a salad*", "C|When do the plants have tomatoes?|in July*|in May|in April", "C|What does Priya say the garden is?|big|yummy*|messy", "B|Priya has a small ____.|garden", "B|She plants ____ with her grandma.|seeds", "B|She ____ them every day.|waters", "B|Soon, little green ____ pop up.|plants", "B|The plants have red ____.|tomatoes", "B|Priya picks a big ____.|tomato", "B|Grandma makes a ____.|salad"]},
{"title": "Ben’s Kite Day", "text": "Ben has a green kite. He goes to the hill with his sister Amy. The wind blows hard. The kite flies up high. Amy holds the string for a turn. Then the kite gets stuck in a tree. Dad helps them get it down. They fly it again until dinner.", "q": ["T|Ben has a green kite.", "F|Ben goes to the beach.", "T|The wind blows hard.", "F|Amy is Ben’s brother.", "T|Amy holds the string.", "F|The kite gets stuck on a roof.", "T|Dad helps them.", "F|They stop flying right away.", "T|They fly it until dinner.", "C|What color is the kite?|green*|red|blue", "C|Where do they go?|the hill*|the beach|the store", "C|Who is Amy?|Ben’s sister*|Ben’s mom|Ben’s friend", "C|What does Amy hold?|the string*|a ball|a cup", "C|Where does the kite get stuck?|in a tree*|on a car|in a pond", "C|Who helps them?|Dad*|Mom|Grandma", "C|How does the wind blow?|hard*|softly|not at all", "C|How high does the kite fly?|up high*|very low|on the ground", "C|When do they stop?|at dinner*|at lunch|at breakfast", "B|Ben has a green ____.|kite", "B|The wind blows ____.|hard", "B|Amy holds the ____.|string", "B|The kite gets stuck in a ____.|tree", "B|Dad helps them get it ____.|down", "B|They fly it until ____.|dinner", "B|Ben goes with his sister ____.|Amy"]},
{"title": "The Sleepy Cat", "text": "Mimi is a sleepy cat. She sleeps on the couch in the morning. She sleeps in the sun at lunch. She sleeps on Tara’s bed at night. But when Tara opens a can of fish, Mimi wakes up fast! She runs to the kitchen. Then she eats and goes back to sleep.", "q": ["T|Mimi is a cat.", "F|Mimi is a busy cat.", "T|Mimi sleeps on the couch.", "F|Mimi sleeps in the rain.", "T|Mimi sleeps on Tara’s bed.", "F|Tara opens a can of beans.", "T|Mimi wakes up fast.", "F|Mimi runs to the garden.", "T|Mimi goes back to sleep.", "C|Where does Mimi sleep in the morning?|on the couch*|on the roof|in a box", "C|Where does Mimi sleep at lunch?|in the sun*|in the bath|in the car", "C|Where does Mimi sleep at night?|on Tara’s bed*|on the floor|outside", "C|What wakes Mimi up?|a can of fish*|a loud bell|a dog", "C|Where does Mimi run?|the kitchen*|the yard|the school", "C|What does Mimi do after she eats?|sleeps*|plays|sings", "C|What kind of cat is Mimi?|sleepy*|grumpy|fast", "C|Who opens the can?|Tara*|Mom|Mimi", "C|How fast does Mimi wake up?|fast*|slowly|not at all", "B|Mimi is a sleepy ____.|cat", "B|She sleeps on the ____ in the morning.|couch", "B|She sleeps in the ____ at lunch.|sun", "B|Tara opens a can of ____.|fish", "B|Mimi wakes up ____!|fast", "B|She runs to the ____.|kitchen", "B|She goes back to ____.|sleep"]},
{"title": "The New Boots", "text": "Ali gets new boots. They are yellow and shiny. It rains all day on Saturday. Ali puts on his boots and goes outside. He jumps in every puddle. Splash! His pants get wet, but his feet stay dry. Ali loves his new boots.", "q": ["T|Ali gets new boots.", "F|The boots are red.", "T|It rains on Saturday.", "F|Ali stays inside.", "T|Ali jumps in puddles.", "F|Ali’s feet get wet.", "T|Ali’s pants get wet.", "F|Ali does not like his boots.", "T|The boots are shiny.", "C|What color are the boots?|yellow*|red|green", "C|When does it rain?|on Saturday*|on Monday|on Friday", "C|What does Ali jump in?|puddles*|leaves|snow", "C|What gets wet?|his pants*|his feet|his hat", "C|How do his feet stay?|dry*|wet|cold", "C|How does Ali feel about his boots?|he loves them*|he hates them|he lost them", "C|What sound does the water make?|Splash!*|Bang!|Moo!", "C|How long does it rain?|all day*|one minute|all week", "C|What does Ali put on?|his boots*|his skates|his mittens", "B|Ali gets new ____.|boots", "B|They are yellow and ____.|shiny", "B|It ____ all day.|rains", "B|He jumps in every ____.|puddle", "B|His pants get ____.|wet", "B|His feet stay ____.|dry", "B|Ali loves his new ____.|boots"]},
{"title": "Grandma’s Garden", "text": "Kim helps Grandma in the garden. They pull weeds and water the plants. Grandma grows peas, carrots and big red tomatoes. Kim picks a pea pod and opens it. There are six little peas inside! She eats them. They taste sweet. Grandma smiles and gives Kim a basket.", "q": ["T|Kim helps Grandma.", "F|They work in the kitchen.", "T|They pull weeds.", "F|Grandma grows apples.", "T|The tomatoes are red.", "F|Kim opens a carrot.", "T|There are six peas.", "F|The peas taste sour.", "T|Grandma gives Kim a basket.", "C|Who does Kim help?|Grandma*|Dad|her teacher", "C|What do they pull?|weeds*|carrots|flowers", "C|What color are the tomatoes?|red*|green|yellow", "C|What does Kim open?|a pea pod*|a box|a door", "C|How many peas are inside?|six*|two|ten", "C|How do the peas taste?|sweet*|salty|bad", "C|What does Grandma give Kim?|a basket*|a hat|a shovel", "C|What do they water?|the plants*|the dog|the car", "C|How does Grandma feel?|happy*|sad|angry", "B|Kim helps Grandma in the ____.|garden", "B|They pull ____.|weeds", "B|Grandma grows peas and ____.|carrots", "B|Kim picks a pea ____.|pod", "B|There are six little ____ inside.|peas", "B|They taste ____.|sweet", "B|Grandma gives Kim a ____.|basket"]},
{"title": "Fish Tank Day", "text": "Our class has a fish tank. Today it is my turn to feed the fish. I shake a tiny bit of food into the water. The orange fish swim up to eat. One fish is named Bubbles. He is the fastest. The teacher says not to give too much food. I do a good job!", "q": ["T|The class has a fish tank.", "F|It is my turn to clean the tank.", "T|I shake food into the water.", "F|The fish are blue.", "T|One fish is named Bubbles.", "F|Bubbles is the slowest.", "T|The teacher gives a tip.", "F|I give lots of food.", "T|I do a good job.", "C|What does the class have?|a fish tank*|a hamster|a bird", "C|Whose turn is it?|my turn*|the teacher’s|my friend’s", "C|What color are the fish?|orange*|blue|green", "C|What is one fish named?|Bubbles*|Spot|Goldie", "C|Which fish is fastest?|Bubbles*|the big one|the new one", "C|How much food should I give?|a tiny bit*|a lot|none", "C|Who gives the tip?|the teacher*|my mom|the principal", "C|Where do the fish swim?|up to eat*|down to sleep|out of the tank", "C|How did I do?|a good job*|a bad job|I forgot", "B|Our class has a fish ____.|tank", "B|It is my turn to ____ the fish.|feed", "B|I shake food into the ____.|water", "B|One fish is named ____.|Bubbles", "B|He is the ____.|fastest", "B|Do not give too much ____.|food", "B|I do a good ____!|job"]},
{"title": "Hide and Seek", "text": "Liam and his friends play hide and seek. Maya counts to twenty. Liam hides behind a big tree. Sam hides under the slide. Maya finds Sam first. Liam stays very still and quiet. Maya looks and looks. At last, Liam laughs and Maya finds him. Now it is Liam’s turn to count.", "q": ["T|They play hide and seek.", "F|Maya counts to ten.", "T|Liam hides behind a tree.", "F|Sam hides in a box.", "T|Maya finds Sam first.", "F|Liam is loud.", "T|Liam laughs.", "F|Maya never finds Liam.", "T|Liam counts next.", "C|Who counts first?|Maya*|Liam|Sam", "C|What number does Maya count to?|twenty*|ten|fifty", "C|Where does Liam hide?|behind a tree*|under the slide|in a car", "C|Where does Sam hide?|under the slide*|behind a tree|in a house", "C|Who is found first?|Sam*|Liam|Maya", "C|How does Liam stay?|still and quiet*|loud|jumpy", "C|How is Liam found?|he laughs*|he sneezes|he runs", "C|What game do they play?|hide and seek*|tag|soccer", "C|Whose turn is next?|Liam’s*|Sam’s|Maya’s", "B|Maya counts to ____.|twenty", "B|Liam hides behind a big ____.|tree", "B|Sam hides under the ____.|slide", "B|Liam stays very still and ____.|quiet", "B|Maya looks and ____.|looks", "B|At last, Liam ____.|laughs", "B|Now it is Liam’s turn to ____.|count"]},
{"title": "The Birthday Card", "text": "It is Mom’s birthday. Eli wants to make her a card. He folds a blue paper in half. He draws a big heart and three flowers. Inside he writes, “I love you, Mom.” He adds gold stickers. At breakfast, he gives Mom the card. She hugs him and puts it on the fridge.", "q": ["T|It is Mom’s birthday.", "F|Eli buys a card at the store.", "T|The paper is blue.", "F|Eli draws a big star.", "T|Eli draws three flowers.", "F|Eli adds silver stickers.", "T|Eli gives the card at breakfast.", "F|Mom puts the card in a drawer.", "T|Mom hugs Eli.", "C|Whose birthday is it?|Mom’s*|Dad’s|Eli’s", "C|What color is the paper?|blue*|red|green", "C|What big shape does Eli draw?|a heart*|a sun|a house", "C|How many flowers does he draw?|three*|two|five", "C|What does he write?|I love you, Mom*|Happy day|Thank you", "C|What color are the stickers?|gold*|pink|black", "C|When does he give the card?|at breakfast*|at bedtime|at lunch", "C|Where does Mom put the card?|on the fridge*|in her bag|on the floor", "C|What does Mom do?|hugs him*|laughs at him|goes to work", "B|Eli wants to make her a ____.|card", "B|He folds the paper in ____.|half", "B|He draws a big ____.|heart", "B|Inside he ____ a message.|writes", "B|He adds gold ____.|stickers", "B|He gives Mom the ____.|card", "B|She puts it on the ____.|fridge"]},
{"title": "Snow Angels", "text": "It snowed a lot last night. Priya and her dad go outside. The snow is soft and deep. Priya lies down on her back. She moves her arms and legs up and down. When she stands up, there is a snow angel! Dad makes one too. His angel is much bigger.", "q": ["T|It snowed last night.", "F|Priya goes out with her mom.", "T|The snow is soft.", "F|Priya lies on her tummy.", "T|Priya moves her arms and legs.", "F|They make a snowman.", "T|Dad makes an angel too.", "F|Dad’s angel is smaller.", "T|The snow is deep.", "C|When did it snow?|last night*|this morning|last week", "C|Who goes outside with Priya?|her dad*|her mom|her friend", "C|How is the snow?|soft and deep*|hard and icy|wet and thin", "C|How does Priya lie down?|on her back*|on her side|on her tummy", "C|What does she move?|her arms and legs*|her head|her hat", "C|What does she make?|a snow angel*|a fort|a snowball", "C|Whose angel is bigger?|Dad’s*|Priya’s|the same", "C|What does Dad do?|makes one too*|goes inside|shovels", "C|What is a snow angel made with?|arms and legs*|a stick|a bucket", "B|It snowed a ____ last night.|lot", "B|The snow is soft and ____.|deep", "B|Priya lies down on her ____.|back", "B|She moves her arms and ____.|legs", "B|There is a snow ____!|angel", "B|Dad makes one ____.|too", "B|His angel is much ____.|bigger"]},
{"title": "The Big Bus", "text": "Every morning, Tom rides the big yellow bus to school. The driver is Ms. Rose. She waves to every kid. Tom sits with his friend Raj. They look out the window. They count red cars. Today they count nine! When the bus stops, Tom says, “Thank you, Ms. Rose.”", "q": ["T|Tom rides the bus every morning.", "F|The bus is blue.", "T|The driver is Ms. Rose.", "F|Ms. Rose is grumpy.", "T|Tom sits with Raj.", "F|They count blue cars.", "T|They count nine cars today.", "F|Tom forgets to say thank you.", "T|They look out the window.", "C|What color is the bus?|yellow*|blue|white", "C|Who drives the bus?|Ms. Rose*|Mr. Lee|Raj", "C|What does Ms. Rose do?|waves to every kid*|sings|honks", "C|Who sits with Tom?|Raj*|his sister|Ms. Rose", "C|What do they count?|red cars*|trees|dogs", "C|How many do they count today?|nine*|five|ten", "C|Where does the bus go?|to school*|to the zoo|to the store", "C|When does Tom ride the bus?|every morning*|at night|on Sunday", "C|What does Tom say at the end?|Thank you*|Goodbye|Hello", "B|Tom rides the big yellow ____.|bus", "B|The driver is Ms. ____.|Rose", "B|She ____ to every kid.|waves", "B|Tom sits with his friend ____.|Raj", "B|They look out the ____.|window", "B|They count red ____.|cars", "B|Today they count ____!|nine"]},
{"title": "Making Lemonade", "text": "It is a hot day. Ava and her mom make lemonade. They squeeze six lemons into a big jug. They add water and some sugar. Ava stirs it with a long spoon. Mom adds lots of ice. Ava pours a glass for everyone. It is cold and a little sour. Yum!", "q": ["T|It is a hot day.", "F|Ava makes lemonade with her dad.", "T|They squeeze six lemons.", "F|They add salt.", "T|Ava stirs with a long spoon.", "F|Mom adds hot water.", "T|Mom adds ice.", "F|The lemonade is warm.", "T|The lemonade is a little sour.", "C|What do they make?|lemonade*|soup|cake", "C|How many lemons do they use?|six*|two|ten", "C|What do they put it in?|a big jug*|a small cup|a bowl", "C|What do they add?|water and sugar*|milk and salt|juice and tea", "C|What does Ava stir with?|a long spoon*|a fork|a stick", "C|What does Mom add?|ice*|lemons|honey", "C|Who gets a glass?|everyone*|only Ava|only Mom", "C|How does it taste?|cold and a little sour*|hot and sweet|salty", "C|What kind of day is it?|hot*|snowy|rainy", "B|They make ____.|lemonade", "B|They squeeze six ____.|lemons", "B|They add water and some ____.|sugar", "B|Ava stirs it with a long ____.|spoon", "B|Mom adds lots of ____.|ice", "B|Ava pours a ____ for everyone.|glass", "B|It is cold and a little ____.|sour"]},
{"title": "The Paper Boat", "text": "Jamal folds a paper boat with his big sister. He colors it blue and writes his name on it. After the rain, they put the boat in a puddle. It floats! Jamal blows on it, and it moves across the water. Then the paper gets wet and soft. They make a new boat with wax paper.", "q": ["T|Jamal folds a paper boat.", "F|Jamal works with his brother.", "T|The boat is blue.", "F|Jamal writes a poem on it.", "T|They put the boat in a puddle.", "F|The boat sinks right away.", "T|Jamal blows on the boat.", "F|The paper stays dry.", "T|They make a new boat.", "C|Who helps Jamal?|his big sister*|his dad|his teacher", "C|What color is the boat?|blue*|red|green", "C|What does he write on it?|his name*|a number|a joke", "C|When do they float the boat?|after the rain*|at night|in winter", "C|Where do they put it?|in a puddle*|in a bath|in a lake", "C|How does the boat move?|Jamal blows on it*|a motor|the wind only", "C|What happens to the paper?|it gets wet and soft*|it burns|it flies away", "C|What is the new boat made of?|wax paper*|wood|plastic", "C|What does the boat do first?|it floats*|it sinks|it tears", "B|Jamal folds a paper ____.|boat", "B|He colors it ____.|blue", "B|He writes his ____ on it.|name", "B|They put the boat in a ____.|puddle", "B|It ____!|floats", "B|Jamal ____ on it.|blows", "B|They make a new boat with wax ____.|paper"]},
{"title": "Library Day", "text": "On Thursday, Rosa’s class goes to the library. The librarian, Mr. Diaz, reads a funny story about a pig who wants to fly. Everyone laughs. Then each child picks a book to take home. Rosa picks a book about bugs. She has to bring it back next Thursday. She keeps it in her backpack.", "q": ["T|The class goes on Thursday.", "F|The librarian is Ms. Diaz.", "T|The story is funny.", "F|The pig wants to swim.", "T|Everyone laughs.", "F|Rosa picks a book about cats.", "T|Each child takes a book home.", "F|Rosa must bring it back tomorrow.", "T|Rosa keeps it in her backpack.", "C|What day is library day?|Thursday*|Monday|Friday", "C|Who is the librarian?|Mr. Diaz*|Rosa|Ms. Rose", "C|What does the pig want?|to fly*|to dance|to cook", "C|What does everyone do?|laugh*|cry|sleep", "C|What is Rosa’s book about?|bugs*|cars|space", "C|When must she bring it back?|next Thursday*|tomorrow|in a year", "C|Where does she keep it?|in her backpack*|on the bus|under her bed", "C|What does each child pick?|a book*|a toy|a snack", "C|What kind of story is it?|funny*|scary|sad", "B|The class goes to the ____.|library", "B|The librarian is Mr. ____.|Diaz", "B|The story is about a ____.|pig", "B|Everyone ____.|laughs", "B|Rosa picks a book about ____.|bugs", "B|She has to bring it ____.|back", "B|She keeps it in her ____.|backpack"]},
{"title": "The Pumpkin Patch", "text": "In October, Owen goes to a pumpkin patch with his class. There are pumpkins everywhere! Some are small and some are huge. Owen finds a round orange pumpkin with a long stem. It is too heavy, so his teacher helps him carry it. At home, Owen and Dad carve a happy face on it.", "q": ["T|Owen goes in October.", "F|Owen goes with his family.", "T|Some pumpkins are huge.", "F|Owen’s pumpkin is green.", "T|The pumpkin has a long stem.", "F|Owen carries it alone.", "T|The teacher helps him.", "F|They carve a scary face.", "T|Owen carves it with Dad.", "C|When does Owen go?|in October*|in June|in March", "C|Who goes with Owen?|his class*|his cousin|his dog", "C|What shape is his pumpkin?|round*|flat|square", "C|What color is it?|orange*|white|yellow", "C|Why does he need help?|it is too heavy*|it is too small|it is wet", "C|Who helps carry it?|his teacher*|his friend|the farmer", "C|Who carves it with Owen?|Dad*|Mom|Grandpa", "C|What face do they carve?|a happy face*|a sad face|a cat face", "C|Where are the pumpkins?|everywhere*|in a box|on a truck", "B|Owen goes to a pumpkin ____.|patch", "B|Some are small and some are ____.|huge", "B|His pumpkin has a long ____.|stem", "B|It is too ____.|heavy", "B|His teacher helps him ____ it.|carry", "B|Owen and Dad ____ a face.|carve", "B|They carve a ____ face.|happy"]},
{"title": "Max the Helper Dog", "text": "Max is a helper dog. He lives with Mr. Brown, who cannot see. Max wears a special harness. He walks Mr. Brown to the store. He stops at every curb. When the light is green, they cross the street. People should not pet Max while he is working. At home, Max can play.", "q": ["T|Max is a helper dog.", "F|Mr. Brown can see well.", "T|Max wears a harness.", "F|Max walks to the beach.", "T|Max stops at every curb.", "F|They cross when the light is red.", "T|Max can play at home.", "F|People should pet Max at work.", "T|Max lives with Mr. Brown.", "C|What kind of dog is Max?|a helper dog*|a sled dog|a puppy", "C|Who does Max live with?|Mr. Brown*|a family|a farmer", "C|What does Max wear?|a harness*|a coat|a hat", "C|Where do they walk?|to the store*|to the zoo|to school", "C|Where does Max stop?|at every curb*|at every tree|at every door", "C|When do they cross?|when the light is green*|when it rains|at night", "C|Why not pet Max at work?|he is working*|he bites|he is sleepy", "C|Where can Max play?|at home*|in the store|on the street", "C|Why does Mr. Brown need Max?|he cannot see*|he is lonely|he is lost", "B|Max is a helper ____.|dog", "B|Max wears a special ____.|harness", "B|He walks Mr. Brown to the ____.|store", "B|He stops at every ____.|curb", "B|They cross the ____.|street", "B|People should not ____ Max.|pet", "B|At home, Max can ____.|play"]},
{"title": "The Ice Cream Truck", "text": "On a hot afternoon, Nina hears music on her street. It is the ice cream truck! She runs to ask Mom for money. Mom gives her two dollars. Nina picks a strawberry cone. It starts to melt fast in the sun. Nina licks it quickly. Pink drips land on her shirt, but she does not mind.", "q": ["T|It is a hot afternoon.", "F|Nina hears a bell.", "T|Nina asks Mom for money.", "F|Mom gives her five dollars.", "T|Nina picks strawberry.", "F|The cone stays cold and hard.", "T|Pink drips land on her shirt.", "F|Nina is upset about her shirt.", "T|The ice cream truck plays music.", "C|What does Nina hear?|music*|thunder|a dog", "C|How much money does Mom give?|two dollars*|one dollar|ten dollars", "C|What flavor does Nina pick?|strawberry*|chocolate|vanilla", "C|What does the ice cream do?|melts fast*|freezes|falls down", "C|How does Nina lick it?|quickly*|slowly|not at all", "C|Where do the drips land?|on her shirt*|on her shoes|on the dog", "C|What color are the drips?|pink*|brown|white", "C|Who gives Nina money?|Mom*|Dad|a friend", "C|How does Nina feel about the drips?|she does not mind*|she cries|she is angry", "B|Nina hears ____ on her street.|music", "B|It is the ice cream ____!|truck", "B|Mom gives her two ____.|dollars", "B|Nina picks a strawberry ____.|cone", "B|It starts to ____ fast.|melt", "B|Nina licks it ____.|quickly", "B|Drips land on her ____.|shirt"]},
{"title": "The Class Hamster", "text": "Our class has a hamster named Peanut. He is small and brown. Peanut runs on his wheel all night. In the day, he sleeps in a pile of paper. On Friday, Lucas takes Peanut home for the weekend. He gives him fresh water and seeds. On Monday, Peanut comes back to class, safe and happy.", "q": ["T|The hamster is named Peanut.", "F|Peanut is big and white.", "T|Peanut runs on his wheel.", "F|Peanut runs all day.", "T|Peanut sleeps in paper.", "F|Lucas takes Peanut home on Monday.", "T|Lucas gives him seeds.", "F|Peanut stays at Lucas’s house.", "T|Peanut comes back on Monday.", "C|What is the hamster’s name?|Peanut*|Coco|Max", "C|What color is Peanut?|brown*|white|black", "C|When does Peanut run?|all night*|all day|never", "C|Where does he sleep?|in a pile of paper*|in a box|on a bed", "C|Who takes him home?|Lucas*|the teacher|Maya", "C|When does Lucas take him?|on Friday*|on Monday|on Tuesday", "C|What does Lucas give him?|water and seeds*|milk and bread|candy", "C|How is Peanut on Monday?|safe and happy*|sick|lost", "C|How big is Peanut?|small*|huge|tall", "B|Our class has a ____.|hamster", "B|He is small and ____.|brown", "B|Peanut runs on his ____.|wheel", "B|In the day, he ____.|sleeps", "B|Lucas takes him home for the ____.|weekend", "B|He gives him fresh ____.|water", "B|On ____, Peanut comes back.|Monday"]},
{"title": "Rainbow After Rain", "text": "The rain stops and the sun comes out. Eva looks at the sky. She sees a rainbow! It has red, orange, yellow, green, blue and purple. Eva calls her little brother to come and see. They count the colors together. Soon the rainbow fades away. Eva draws it so she can keep it forever.", "q": ["T|The rain stops.", "F|Eva sees a cloud shaped like a cat.", "T|Eva sees a rainbow.", "F|The rainbow has no green.", "T|Eva calls her little brother.", "F|They count trees.", "T|The rainbow fades away.", "F|Eva takes a photo.", "T|Eva draws the rainbow.", "C|What comes out after the rain?|the sun*|the moon|the stars", "C|What does Eva see?|a rainbow*|a bird|a plane", "C|Who does Eva call?|her little brother*|her mom|her friend", "C|What do they count?|the colors*|the clouds|the cars", "C|What happens to the rainbow?|it fades away*|it gets bigger|it falls", "C|How does Eva keep it?|she draws it*|she paints the sky|she catches it", "C|Which color is in the rainbow?|purple*|pink|brown", "C|Where does Eva look?|at the sky*|at the ground|at a book", "C|How long will Eva keep it?|forever*|one day|one hour", "B|The rain ____.|stops", "B|The sun comes ____.|out", "B|She sees a ____!|rainbow", "B|They count the ____ together.|colors", "B|Soon the rainbow fades ____.|away", "B|Eva ____ it.|draws", "B|She can keep it ____.|forever"]}
],
"medium": [
{"title": "The Missing Library Book", "text": "Aisha could not find her library book, The Lost Moose. It was due back on Friday. She looked under her bed, in her desk, and in the car. Then she remembered reading it to her little brother at bedtime. She checked his room and found the book under his pillow! Aisha returned it to the library just in time.", "q": ["T|The book is called The Lost Moose.", "F|The book was due on Monday.", "T|Aisha looked under her bed.", "F|Aisha looked in the garage.", "T|Aisha read to her brother.", "F|The book was in the fridge.", "T|The book was under a pillow.", "F|Aisha returned the book late.", "C|What was the book called?|The Lost Moose*|The Big Bear|The Red Fox", "C|When was it due?|on Friday*|on Sunday|on Tuesday", "C|Where did Aisha look first?|under her bed*|in the yard|at school", "C|What did she remember?|reading to her brother*|lending it to a friend|leaving it at school", "C|When did she read to him?|at bedtime*|at breakfast|at lunch", "C|Whose room did she check?|her brother’s*|her mom’s|her own", "C|Where was the book?|under his pillow*|on a shelf|in a bag", "C|When did she return it?|just in time*|a week late|never", "C|Who is younger?|her brother*|Aisha|her mom", "C|What did Aisha feel at first?|worried*|bored|silly", "B|Aisha could not find her library ____.|book", "B|It was due back on ____.|Friday", "B|She looked in her ____.|desk", "B|She read it at ____.|bedtime", "B|She found the book under his ____.|pillow", "B|She ____ it to the library.|returned", "B|She checked his ____.|room"]},
{"title": "The Butterfly Garden", "text": "In May, Mr. Patel’s class got five tiny caterpillars in a net home. The students fed them milkweed leaves. The caterpillars ate and grew bigger every day. Then each one made a hard shell called a chrysalis. After two weeks, beautiful monarch butterflies came out. On a sunny day, the class let them go in the school garden.", "q": ["T|The class got five caterpillars.", "F|They fed them lettuce.", "T|The caterpillars grew every day.", "F|The shell is called a cocoon in the story.", "T|Monarch butterflies came out.", "F|The butterflies came out after two days.", "T|The class let them go.", "F|They let them go on a rainy day.", "C|Who is the teacher?|Mr. Patel*|Ms. Lee|Mr. Brown", "C|When did they get the caterpillars?|in May*|in October|in January", "C|How many caterpillars?|five*|two|ten", "C|What did they eat?|milkweed leaves*|grass|apples", "C|What did each make?|a chrysalis*|a nest|a web", "C|How long until butterflies came out?|two weeks*|two days|two months", "C|What kind of butterflies?|monarch*|white|blue", "C|Where did they let them go?|the school garden*|the gym|the bus", "C|What was the weather?|sunny*|rainy|snowy", "C|Where did the caterpillars live?|in a net home*|in a fish tank|in a box", "B|They got tiny ____.|caterpillars", "B|The students fed them milkweed ____.|leaves", "B|They grew ____ every day.|bigger", "B|Each made a hard shell called a ____.|chrysalis", "B|Beautiful ____ butterflies came out.|monarch", "B|The class let them ____.|go", "B|They let them go in the school ____.|garden"]},
{"title": "The School Concert", "text": "Every December, Hill Street School holds a winter concert. This year, Sana’s class sang a song about snowflakes. Sana played the triangle at the end of each verse. She practiced every night so she would not miss a beat. On the big night, the gym was full of parents. When the song ended, Sana’s grandpa clapped the loudest of all.", "q": ["T|The concert is in December.", "F|The concert is in the library.", "T|The song was about snowflakes.", "F|Sana played the drum.", "T|Sana practiced every night.", "F|The gym was empty.", "T|Parents came to the concert.", "F|Sana’s aunt clapped the loudest.", "C|When is the concert?|December*|June|April", "C|What is the school called?|Hill Street School*|Lake School|Pine School", "C|What was the song about?|snowflakes*|rain|birds", "C|What did Sana play?|the triangle*|the piano|the flute", "C|When did she play it?|at the end of each verse*|at the start|the whole time", "C|Why did she practice?|so she would not miss a beat*|to get candy|to sing louder", "C|Where was the concert?|in the gym*|outside|at a church", "C|Who filled the gym?|parents*|dogs|teachers only", "C|Who clapped the loudest?|her grandpa*|her mom|her teacher", "C|What season is the concert?|winter*|summer|spring", "B|The school holds a winter ____.|concert", "B|The song was about ____.|snowflakes", "B|Sana played the ____.|triangle", "B|She practiced every ____.|night", "B|The gym was full of ____.|parents", "B|Her grandpa clapped the ____.|loudest", "B|She did not want to miss a ____.|beat"]},
{"title": "The Bird Feeder", "text": "Mateo and his mom made a bird feeder from an old milk carton. They cut a window in the side and filled it with seeds. Then they hung it from a branch outside the kitchen window. The next morning, a bright red cardinal came to eat. Later, three chickadees and a blue jay visited. Mateo kept a list of every bird he saw.", "q": ["T|They used an old milk carton.", "F|They used a tin can.", "T|They filled it with seeds.", "F|They hung it on the porch.", "T|A cardinal came first.", "F|The cardinal was yellow.", "T|A blue jay visited.", "F|Mateo took photos of every bird.", "C|Who helped Mateo?|his mom*|his dad|his sister", "C|What was the feeder made from?|a milk carton*|a shoe box|a bucket", "C|What did they cut?|a window*|a door|a hole in the roof", "C|What did they fill it with?|seeds*|bread|fruit", "C|Where did they hang it?|from a branch*|on a fence|in the garage", "C|Which bird came first?|a cardinal*|a robin|a crow", "C|What color was the cardinal?|red*|blue|brown", "C|How many chickadees came?|three*|one|five", "C|What did Mateo keep?|a list of birds*|a feather|a nest", "C|When did the first bird come?|the next morning*|that night|a week later", "B|They made a bird ____.|feeder", "B|They filled it with ____.|seeds", "B|They hung it from a ____.|branch", "B|A bright red ____ came.|cardinal", "B|Three ____ visited.|chickadees", "B|A blue ____ visited.|jay", "B|Mateo kept a ____ of birds.|list"]},
{"title": "Camping Under the Stars", "text": "In August, Hana’s family went camping at a lake. They set up a green tent and gathered sticks for a fire. Dad showed Hana how to roast a marshmallow without burning it. At night, they lay on a blanket and looked up at the sky. Hana saw a shooting star and made a wish. She did not tell anyone what she wished for.", "q": ["T|They went camping in August.", "F|They camped by the ocean.", "T|The tent was green.", "F|They gathered rocks for a fire.", "T|Dad showed Hana how to roast a marshmallow.", "F|Hana burned her marshmallow.", "T|Hana saw a shooting star.", "F|Hana told everyone her wish.", "C|When did they go?|in August*|in January|in April", "C|Where did they camp?|at a lake*|on a mountain|in a city", "C|What color was the tent?|green*|red|yellow", "C|What did they gather?|sticks*|leaves|shells", "C|What did they roast?|marshmallows*|hot dogs|corn", "C|Who showed Hana?|Dad*|Mom|her brother", "C|What did they lie on?|a blanket*|the grass|a boat", "C|What did Hana see?|a shooting star*|an owl|a plane", "C|What did Hana do?|made a wish*|fell asleep|ran inside", "C|What did Hana keep secret?|her wish*|her snack|her name", "B|They set up a green ____.|tent", "B|They gathered ____ for a fire.|sticks", "B|Dad showed her how to roast a ____.|marshmallow", "B|They lay on a ____.|blanket", "B|They looked up at the ____.|sky", "B|Hana saw a shooting ____.|star", "B|She made a ____.|wish"]},
{"title": "The Soccer Team", "text": "Grace joined the Tigers soccer team this spring. At first, she was not very fast, and she missed the ball a lot. Her coach told her to practice passing with a wall at home. Grace practiced every day after school. By June, she could pass the ball right to her teammates. In the last game, she helped the Tigers score the winning goal.", "q": ["T|Grace joined the Tigers.", "F|Grace joined in the fall.", "T|At first, Grace missed the ball a lot.", "F|The coach told her to run laps.", "T|Grace practiced with a wall.", "F|Grace practiced once a week.", "T|Grace improved by June.", "F|The Tigers lost the last game.", "C|What is the team called?|the Tigers*|the Bears|the Hawks", "C|When did Grace join?|this spring*|last winter|this fall", "C|What was hard at first?|she missed the ball*|she got lost|she was sick", "C|What did the coach tell her?|practice passing*|quit|buy new shoes", "C|What did she use at home?|a wall*|a net|a tree", "C|How often did she practice?|every day*|once a month|never", "C|When could she pass well?|by June*|by May|by winter", "C|What happened in the last game?|she helped score the winning goal*|she sat out|it rained", "C|Who did she pass to?|her teammates*|the coach|the other team", "C|What sport does Grace play?|soccer*|hockey|baseball", "B|Grace joined the ____ soccer team.|Tigers", "B|At first, she was not very ____.|fast", "B|She practiced passing with a ____.|wall", "B|She practiced every day after ____.|school", "B|She could pass to her ____.|teammates", "B|They scored the winning ____.|goal", "B|Her ____ gave her advice.|coach"]},
{"title": "The Food Bank Visit", "text": "Before Thanksgiving, Ms. Choi’s class collected cans for the food bank. Students brought soup, beans, and tuna. They counted 212 cans! Then the class visited the food bank to drop them off. A volunteer named Mr. Grant showed them the shelves and explained how families get food. The students felt proud that they could help their neighbors.", "q": ["T|They collected cans before Thanksgiving.", "F|Ms. Choi’s class collected toys.", "T|Students brought tuna.", "F|They counted 100 cans.", "T|The class visited the food bank.", "F|Mr. Grant is the principal.", "T|Mr. Grant showed them the shelves.", "F|The students felt sad.", "C|When did they collect cans?|before Thanksgiving*|after Christmas|in summer", "C|Who is the teacher?|Ms. Choi*|Ms. Grant|Mr. Lee", "C|What did they collect?|cans*|clothes|books", "C|How many cans did they count?|212*|21|2000", "C|Who showed them around?|Mr. Grant*|Ms. Choi|a farmer", "C|What is Mr. Grant?|a volunteer*|a doctor|a bus driver", "C|What did he explain?|how families get food*|how to cook|how to count", "C|How did the students feel?|proud*|tired|angry", "C|Who did they help?|their neighbors*|their pets|their teachers", "C|Which food was brought?|soup*|ice cream|cake", "B|They collected cans for the food ____.|bank", "B|Students brought soup, beans, and ____.|tuna", "B|They counted 212 ____!|cans", "B|A ____ named Mr. Grant helped.|volunteer", "B|He showed them the ____.|shelves", "B|The students felt ____.|proud", "B|They helped their ____.|neighbors"]},
{"title": "The Robot Kit", "text": "For his birthday, Arjun got a robot kit. The box had wheels, wires, a small motor, and a booklet of steps. Arjun and his big sister followed the steps one by one. When they finished, the robot did not move. They checked every wire and found one that was loose. After they fixed it, the robot rolled across the kitchen floor!", "q": ["T|Arjun got a robot kit.", "F|The kit was for Christmas.", "T|The box had a small motor.", "F|Arjun built it alone.", "T|They followed the steps.", "F|The robot moved right away.", "T|One wire was loose.", "F|The robot rolled across the yard.", "C|When did Arjun get the kit?|his birthday*|Christmas|the first day of school", "C|What was in the box?|wheels and wires*|paint and paper|blocks only", "C|Who helped Arjun?|his big sister*|his dad|his friend", "C|How did they follow the steps?|one by one*|all at once|backwards", "C|What happened first?|the robot did not move*|the robot flew|the robot talked", "C|What did they check?|every wire*|the batteries only|the box", "C|What was the problem?|a loose wire*|a broken wheel|no motor", "C|What did they do?|fixed the wire*|threw it away|bought a new one", "C|Where did the robot roll?|across the kitchen floor*|out the door|up the stairs", "C|What did the booklet have?|steps*|stickers|games", "B|Arjun got a robot ____.|kit", "B|The box had a small ____.|motor", "B|They followed the ____ one by one.|steps", "B|The robot did not ____.|move", "B|They checked every ____.|wire", "B|One wire was ____.|loose", "B|The robot rolled across the kitchen ____.|floor"]},
{"title": "The Kindness Jar", "text": "Mrs. Okafor put an empty jar on her desk. She said, “Every time you see someone being kind, add a marble.” When Omar helped Mia pick up her crayons, a marble went in. When Lucy shared her snack, another went in. In three weeks, the jar was full. The class had a pajama party to celebrate their kindness.", "q": ["T|The jar started empty.", "F|The jar was on the window.", "T|Kind acts earned marbles.", "F|Omar spilled Mia’s crayons.", "T|Lucy shared her snack.", "F|The jar was full in three days.", "T|The class had a party.", "F|It was a pizza party.", "C|Who is the teacher?|Mrs. Okafor*|Mrs. Lee|Mr. Patel", "C|Where was the jar?|on her desk*|on the floor|in the hall", "C|What went in the jar?|marbles*|coins|stickers", "C|When did a marble go in?|when someone was kind*|when someone was late|every hour", "C|What did Omar do?|helped pick up crayons*|shared his lunch|read a book", "C|What did Lucy share?|her snack*|her toy|her pencil", "C|How long until the jar was full?|three weeks*|three days|three months", "C|What kind of party was it?|a pajama party*|a pizza party|a dance", "C|Why did they have a party?|to celebrate kindness*|for a birthday|for winter", "C|Whose crayons fell?|Mia’s*|Omar’s|Lucy’s", "B|She put an empty ____ on her desk.|jar", "B|Add a ____ for kindness.|marble", "B|Omar helped Mia pick up her ____.|crayons", "B|Lucy shared her ____.|snack", "B|In three weeks, the jar was ____.|full", "B|The class had a pajama ____.|party", "B|They celebrated their ____.|kindness"]}
],
"hard": [
{"title": "The Lost Kite at Kitty Hawk", "text": "Every summer, Maya and her grandpa visit the beach at Kitty Hawk in North Carolina. Grandpa told her that the Wright brothers flew the first airplane there in 1903. Maya wanted to fly something too, so they brought a purple kite shaped like a dragon. The wind off the ocean was strong. The kite zoomed up high over the sand dunes. Then a big gust snapped the string! The kite floated away and landed on top of a tall dune. Maya and Grandpa climbed the hill of sand, slipping and laughing. At the top, a boy was holding the kite for them. His name was Jamal, and he had a kite of his own. The two kids flew their kites side by side until the sun went down.", "q": ["T|Maya visits Kitty Hawk every summer.", "F|The Wright brothers flew there in 1993.", "T|The kite looked like a dragon.", "F|The wind was very weak.", "T|A gust snapped the string.", "F|The kite landed in the ocean.", "T|A boy held the kite for them.", "F|Maya flew her kite alone.", "C|What state is Kitty Hawk in?|North Carolina*|Florida|Maine", "C|Who flew the first airplane there?|the Wright brothers*|Maya’s grandpa|a pilot named Jamal", "C|What color was the kite?|red|purple*|green", "C|What shape was the kite?|a bird|a fish|a dragon*", "C|What snapped the string?|a big gust*|a sharp rock|a bird", "C|Where did the kite land?|on a tall dune*|in a tree|on a boat", "C|How did they get up the dune?|they climbed*|they drove|they flew", "C|Who held the kite?|Grandpa|Jamal*|a lifeguard", "C|What did Jamal have?|a dog|a kite of his own*|a bucket", "C|When did they stop flying kites?|at lunch|when it rained|when the sun went down*", "B|They brought a ____ kite.|purple", "B|The wind off the ____ was strong.|ocean", "B|The kite zoomed up high over the sand ____.|dunes", "B|Then a big ____ snapped the string!|gust", "B|They climbed the hill of ____.|sand", "B|Find a word in the story that rhymes with “bite”: ____|kite", "B|The two kids flew their kites side by ____.|side"]},
{"title": "Pancakes in the Snow", "text": "On a cold morning in Vermont, Ethan and his mom went to a sugarhouse. A sugarhouse is a small barn where people boil sap from maple trees. The farmer, Mrs. Hall, showed them metal buckets hanging on the trees. Clear sap dripped into each bucket, drop by drop. Inside the sugarhouse, a big pan bubbled and steamed. Mrs. Hall said it takes forty buckets of sap to make one bucket of syrup! Next, she poured hot syrup onto clean snow. It turned into a chewy candy, and Ethan rolled it onto a stick. Then they ate warm pancakes covered in fresh syrup. Ethan said it was the sweetest field trip of his life, and his mom bought a jar to take home.", "q": ["T|The story happens in Vermont.", "F|They went to a bakery.", "T|Sap comes from maple trees.", "F|The buckets were made of wood.", "T|The pan bubbled and steamed.", "F|It takes four buckets of sap to make one bucket of syrup.", "T|Syrup on snow turned into candy.", "F|Mom bought a cake to take home.", "C|Who went with Ethan?|his dad|his mom*|his class", "C|What is a sugarhouse?|a candy store|a small barn for boiling sap*|a school", "C|What was the farmer’s name?|Mrs. Hall*|Mrs. Lee|Mr. Green", "C|What hung on the trees?|lights|metal buckets*|bird feeders", "C|What color was the sap?|brown|clear*|red", "C|How many buckets of sap make one of syrup?|ten|forty*|one hundred", "C|Where did she pour the hot syrup?|on clean snow*|in a cup|on bread", "C|What did Ethan roll the candy onto?|a stick*|a plate|a leaf", "C|What did they eat?|waffles|warm pancakes*|toast", "C|What did Mom buy?|a jar*|a bucket|a hat", "B|Clear sap ____ into each bucket.|dripped", "B|Inside, a big ____ bubbled and steamed.|pan", "B|She poured hot ____ onto clean snow.|syrup", "B|It turned into a ____ candy.|chewy", "B|Ethan rolled it onto a ____.|stick", "B|Find a word in the story that rhymes with “bean”: ____|clean", "B|It was the sweetest field ____ of his life.|trip"]},
{"title": "The Desert Garden", "text": "Sofia lives in Tucson, Arizona, where it hardly ever rains. Her class wanted to plant a garden, but their teacher, Mr. Ruiz, warned that most plants would dry up in the desert heat. So the students did some research. They learned that some plants, like cactus and agave, store water inside their thick leaves and stems. Sofia found a plant called desert marigold that grows bright yellow flowers. The class planted their garden in the spring and put rocks around each plant to keep the soil cool. They watered it only once a week. By the end of May, the garden was full of color. Hummingbirds and bees came to visit every day. Mr. Ruiz said the students were real desert scientists.", "q": ["T|Sofia lives in Tucson.", "F|It rains a lot in Tucson.", "T|Mr. Ruiz is the teacher.", "F|The students did not do research.", "T|Cactus stores water in its stems.", "F|Desert marigold has blue flowers.", "T|They put rocks around each plant.", "F|They watered the garden every day.", "C|What state does Sofia live in?|Arizona*|Oregon|Ohio", "C|What did Mr. Ruiz warn about?|plants would dry up*|bugs would eat them|it would snow", "C|Where do cactus plants store water?|in their roots only|in thick leaves and stems*|in their flowers", "C|What plant did Sofia find?|a rose|desert marigold*|a pine tree", "C|What color are its flowers?|yellow*|purple|white", "C|When did they plant the garden?|in the fall|in the spring*|in the winter", "C|Why did they use rocks?|to keep the soil cool*|to make it pretty|to scare birds", "C|How often did they water it?|once a week*|twice a day|never", "C|What birds came to visit?|crows|hummingbirds*|owls", "C|What did Mr. Ruiz call the students?|desert scientists*|great artists|fast runners", "B|It hardly ever ____ in Tucson.|rains", "B|Most plants would dry up in the desert ____.|heat", "B|Some plants store ____ inside their leaves.|water", "B|They put ____ around each plant.|rocks", "B|By the end of May, the garden was full of ____.|color", "B|Find a word in the story that rhymes with “trees”: ____|bees", "B|Hummingbirds came to ____ every day.|visit"]},
{"title": "Grandma’s Quilt Square", "text": "Grandma Ruth lives in a small town in Kentucky, and she has made a quilt for every grandchild. When Noah turned eight, she asked him to help with his own quilt. First, they picked fabrics from her big basket. Noah chose a blue square with baseballs, a green square with frogs, and a red one with tiny stars. Grandma showed him how to cut each square with careful, straight lines. Then they pinned the squares together in rows. Grandma sewed them on her old sewing machine, which hummed like a bee. It took them three weekends to finish. When the quilt was done, Grandma stitched Noah’s name and the year in one corner. Noah sleeps under it every night and says it feels like a hug.", "q": ["T|Grandma Ruth lives in Kentucky.", "F|Noah turned ten.", "T|They picked fabrics from a basket.", "F|Noah chose a square with cats.", "T|They pinned the squares in rows.", "F|Grandma sewed by hand.", "T|It took three weekends.", "F|Grandma stitched a flower in the corner.", "C|What has Grandma made for every grandchild?|a quilt*|a sweater|a cake", "C|How old did Noah turn?|six|eight*|ten", "C|What was on the blue square?|baseballs*|frogs|stars", "C|What was on the green square?|stars|frogs*|baseballs", "C|How did they cut the squares?|with straight lines*|with wavy lines|with no lines", "C|What did the sewing machine sound like?|a bee*|a dog|a drum", "C|How long did it take?|one day|three weekends*|a whole year", "C|What did Grandma stitch in the corner?|a heart|Noah’s name and the year*|a tree", "C|When does Noah sleep under it?|only on weekends|every night*|never", "C|What does Noah say it feels like?|a hug*|a cloud|a blanket of snow", "B|They picked fabrics from her big ____.|basket", "B|Noah chose a red one with tiny ____.|stars", "B|Then they ____ the squares together in rows.|pinned", "B|The machine ____ like a bee.|hummed", "B|Grandma stitched Noah’s ____ in one corner.|name", "B|Find a word in the story that rhymes with “bug”: ____|hug", "B|It took them three ____ to finish.|weekends"]},
{"title": "The Lighthouse in Maine", "text": "Last summer, Chloe visited her cousin Ben in Maine. On the first morning, they rode bikes to a white lighthouse on a rocky point. A guide named Mr. Fox told them that, long ago, a keeper lived inside the lighthouse. Every night, the keeper climbed the winding stairs to light the lamp, so ships would not crash on the rocks. Chloe counted the steps as she climbed. There were eighty-five! At the top, she could see boats, islands, and even a seal swimming in the waves. Mr. Fox said the light now turns on by itself. On the way home, the kids stopped for lobster rolls. Chloe drew a picture of the lighthouse and hung it above her bed.", "q": ["T|Chloe visited her cousin Ben.", "F|They walked to the lighthouse.", "T|The lighthouse was white.", "F|The guide was named Mr. Wolf.", "T|A keeper once lived inside.", "F|There were fifteen steps.", "T|Chloe saw a seal.", "F|The keeper still lights the lamp.", "C|What state did Chloe visit?|Maine*|Texas|Kansas", "C|How did the kids get to the lighthouse?|by car|by bike*|by boat", "C|Where was the lighthouse?|in a city|on a rocky point*|in a forest", "C|What did the keeper do every night?|light the lamp*|cook dinner|go fishing", "C|Why was the lamp lit?|so ships would not crash*|to read books|to scare birds", "C|How many steps were there?|eighty-five*|fifty|one hundred", "C|What animal did Chloe see?|a whale|a seal*|a shark", "C|How does the light turn on now?|by itself*|a keeper lights it|it never turns on", "C|What did the kids eat?|pizza|lobster rolls*|tacos", "C|Where did Chloe hang her picture?|above her bed*|on the fridge|at school", "B|The lighthouse stood on a ____ point.|rocky", "B|The keeper climbed the winding ____.|stairs", "B|Chloe ____ the steps as she climbed.|counted", "B|She saw boats, islands, and a ____.|seal", "B|On the way home, they stopped for lobster ____.|rolls", "B|Find a word in the story that rhymes with “night”: ____|light", "B|Chloe drew a ____ of the lighthouse.|picture"]},
{"title": "The Big Rodeo", "text": "Every March, Houston, Texas, has a huge rodeo, and this year Diego went for the first time with his older sister, Rosa. The first thing they saw was a parade of horses with shiny saddles. Then they watched calf scramble, where kids try to catch a calf in a big dirt arena. Rosa explained that kids who catch one get money for a calf of their own to raise. Next, they walked through barns full of goats, sheep, and giant cows. Diego petted a baby goat with soft brown ears. For lunch, they shared a turkey leg that was bigger than Diego’s hand. At night, a famous singer played music while everyone danced. Diego fell asleep in the car, still wearing his new cowboy hat.", "q": ["T|The rodeo is in Houston.", "F|Diego went with his brother.", "T|The horses had shiny saddles.", "F|Kids try to catch a pig.", "T|The barns had goats and sheep.", "F|The baby goat had white ears.", "T|They shared a turkey leg.", "F|Diego stayed awake in the car.", "C|When is the rodeo?|every March*|every June|every December", "C|Who is Rosa?|Diego’s mom|Diego’s older sister*|a cowgirl", "C|What did they see first?|a parade of horses*|a singer|a goat", "C|What do kids try to catch in calf scramble?|a calf*|a horse|a chicken", "C|What do kids get if they catch one?|a trophy|money for a calf*|a hat", "C|What did Diego pet?|a baby goat*|a puppy|a pony", "C|What did they eat for lunch?|a hamburger|a turkey leg*|a hot dog", "C|What happened at night?|fireworks|a singer played music*|a race", "C|Where did Diego fall asleep?|in the barn|in the car*|on the bus", "C|What was Diego wearing?|a new cowboy hat*|a helmet|a crown", "B|They saw a parade of ____.|horses", "B|Kids catch a calf in a big dirt ____.|arena", "B|The barns were full of goats, sheep, and giant ____.|cows", "B|The baby goat had soft brown ____.|ears", "B|At night, everyone ____.|danced", "B|Find a word in the story that rhymes with “cat”: ____|hat", "B|The turkey leg was bigger than Diego’s ____.|hand"]},
{"title": "The Underground Railroad Quilt", "text": "In February, Miss Carter’s second grade class in Ohio learned about Black History Month. She read them a book about Harriet Tubman. Harriet escaped slavery and then went back many times to help other people find freedom. She led them along secret paths called the Underground Railroad. It was not a real railroad. It was a group of brave people who hid travelers in their homes and barns. Ohio had many of these safe houses. After the story, the class made a paper quilt. Each student drew a square showing courage, like a lantern, a star, or two hands holding. Jada drew the North Star, because travelers followed it at night. The quilt now hangs in the school hallway for everyone to see.", "q": ["T|The class learned about Black History Month.", "F|Miss Carter teaches fourth grade.", "T|Harriet Tubman helped people find freedom.", "F|The Underground Railroad was a real train.", "T|Ohio had many safe houses.", "F|The class made a cloth quilt.", "T|Jada drew the North Star.", "F|The quilt hangs in the gym.", "C|When did the class learn about it?|in February*|in July|in October", "C|Who was the book about?|Harriet Tubman*|Abraham Lincoln|George Washington", "C|What did Harriet do many times?|go back to help others*|ride a train|write books", "C|What was the Underground Railroad?|a train under the ground|brave people who hid travelers*|a subway", "C|Where did helpers hide travelers?|in caves|in their homes and barns*|in boats", "C|What did the class make?|a paper quilt*|a model train|a poster", "C|What did each square show?|courage*|food|animals", "C|What did Jada draw?|a lantern|the North Star*|a house", "C|Why did travelers follow that star?|it showed the way north*|it was the biggest|it was red", "C|Where is the quilt now?|in the school hallway*|at a museum|in Jada’s room", "B|She led them along secret ____.|paths", "B|It was a group of ____ people.|brave", "B|Each student drew a ____.|square", "B|Squares showed a lantern, a star, or two ____ holding.|hands", "B|Travelers followed the star at ____.|night", "B|Find a word in the story that rhymes with “car”: ____|star", "B|The quilt hangs in the school ____.|hallway"]},
{"title": "Bison in Yellowstone", "text": "Liam and his family drove to Yellowstone National Park, the first national park in the whole world. On the second day, a herd of bison crossed the road right in front of their car. Dad stopped and turned off the engine. The bison were huge and shaggy, with dark brown fur and curved horns. A baby bison trotted next to its mother. A ranger in a green truck reminded everyone to stay inside their cars and give the animals space. After the herd passed, the family went to see Old Faithful. They waited about an hour, and then the geyser shot hot water high into the air with a loud whoosh. Liam’s little sister cheered. Liam wrote about the bison in his travel journal that night.", "q": ["T|Yellowstone was the first national park.", "F|The bison crossed on the first day.", "T|Dad turned off the engine.", "F|The bison had white fur.", "T|A baby bison walked with its mother.", "F|The ranger drove a red truck.", "T|They waited about an hour for the geyser.", "F|Liam wrote about the geyser in his journal.", "C|What crossed the road?|a herd of bison*|a family of bears|some deer", "C|What did Dad do?|honked the horn|stopped the car*|drove faster", "C|What color was the bison fur?|dark brown*|gray|black and white", "C|What did the bison have?|curved horns*|long tails|spots", "C|What did the ranger remind everyone?|to stay in their cars*|to feed the bison|to take photos", "C|What is Old Faithful?|a geyser*|a mountain|a lake", "C|What does a geyser shoot?|hot water*|rocks|smoke only", "C|What sound did it make?|a loud whoosh*|a soft beep|a moo", "C|Who cheered?|Liam’s little sister*|the ranger|Dad", "C|Where did Liam write about the bison?|in his travel journal*|on a postcard|on a map", "B|The bison were huge and ____.|shaggy", "B|A baby bison ____ next to its mother.|trotted", "B|Give the animals ____.|space", "B|After the ____ passed, they saw Old Faithful.|herd", "B|The geyser shot hot water high into the ____.|air", "B|Find a word in the story that rhymes with “sky”: ____|high", "B|Liam wrote in his travel ____.|journal"]},
{"title": "The Lemonade Stand", "text": "On a hot Saturday in Atlanta, Georgia, twins Ava and Isaac opened a lemonade stand at the end of their street. They wanted to raise money for the animal shelter where they got their dog, Biscuit. Dad helped them squeeze twenty lemons. Ava stirred in sugar and ice water, and Isaac painted a sign that said “Fifty Cents a Cup!” At first, nobody came. Then the mail carrier stopped and bought two cups. Soon, neighbors were lining up. A man walking his poodle gave them a whole dollar and said to keep the change. By the afternoon, the pitcher was empty. The twins counted eighteen dollars and fifty cents. On Monday, they brought the money to the shelter, and Biscuit came along to say thank you.", "q": ["T|The story happens in Atlanta.", "F|Ava and Isaac are cousins.", "T|They wanted to help the animal shelter.", "F|Their dog is named Cookie.", "T|Isaac painted a sign.", "F|Lots of people came right away.", "T|The mail carrier bought two cups.", "F|They raised ten dollars.", "C|What day was it?|Saturday*|Sunday|Friday", "C|Where was the stand?|at the end of their street*|at school|at the park", "C|Who helped squeeze the lemons?|Mom|Dad*|a neighbor", "C|How many lemons did they squeeze?|five|twenty*|fifty", "C|How much was one cup?|a dollar|fifty cents*|ten cents", "C|Who stopped first?|the mail carrier*|a firefighter|their teacher", "C|What kind of dog did the man walk?|a poodle*|a beagle|a husky", "C|How much did they raise?|$18.50*|$5.00|$100.00", "C|When did they bring the money?|on Monday*|that night|next year", "C|Who came along to say thank you?|Biscuit*|Dad|the poodle", "B|They opened a ____ stand.|lemonade", "B|Ava stirred in sugar and ice ____.|water", "B|At first, ____ came.|nobody", "B|Soon, ____ were lining up.|neighbors", "B|By the afternoon, the ____ was empty.|pitcher", "B|Find a word in the story that rhymes with “range”: ____|change", "B|They brought the money to the ____.|shelter"]},
{"title": "The Spelling Bee in Ohio", "text": "Priya practiced for the school spelling bee in Columbus, Ohio, for three whole weeks. Every night after dinner, her big brother Arjun read words from a list, and Priya spelled them out loud. Some words were easy, like garden and pencil. Others were tricky, like Wednesday and knowledge. On the day of the bee, Priya’s hands felt shaky. She stood on the stage and looked out at the crowd. Then she saw her grandmother waving from the third row. Priya took a deep breath and spelled each word slowly. After eight rounds, only Priya and a boy named Lucas were left. Lucas missed the word rhythm, and Priya spelled it right. She won a blue ribbon and a new dictionary.", "q": ["T|Priya practiced for three weeks.", "F|Her sister read the words.", "T|She practiced after dinner.", "F|Wednesday was an easy word.", "T|Her hands felt shaky.", "F|Her grandmother sat in the first row.", "T|There were eight rounds.", "F|Lucas spelled rhythm right.", "C|What city is the story in?|Columbus*|Dayton|Toledo", "C|Who read the words to Priya?|her brother Arjun*|her mom|her teacher", "C|Which word was easy?|garden*|knowledge|rhythm", "C|Which word was tricky?|pencil|Wednesday*|garden", "C|How did Priya feel on the stage?|shaky*|sleepy|silly", "C|Who did she see in the crowd?|her grandmother*|her coach|her dog", "C|What did Priya do before spelling?|took a deep breath*|sang a song|ate a snack", "C|Who was the last other speller?|Arjun|Lucas*|her teacher", "C|Which word did Lucas miss?|rhythm*|garden|pencil", "C|What did Priya win?|a ribbon and a dictionary*|a trophy and a hat|a medal and a book bag", "B|Priya spelled the words out ____.|loud", "B|Some words were easy, like garden and ____.|pencil", "B|She stood on the ____.|stage", "B|Priya spelled each word ____.|slowly", "B|After eight ____, two spellers were left.|rounds", "B|Find a word in the story that rhymes with “bow”: ____|row", "B|She won a blue ____.|ribbon"]}
]
}/*END*/;

  var MAXN = { easy: 20, medium: 50, hard: 100 };
  var NAMES = ['Aiden', 'Priya', 'Mei', 'Omar', 'Zara', 'Liam', 'Amara', 'Kenji', 'Sofia', 'Mateo', 'Fatima', 'Noah', 'Aaliyah', 'Arjun', 'Chloé', 'Kwame', 'Leila', 'Ethan', 'Nia', 'Hiro', 'Ava', 'Yusuf', 'Isla', 'Tenzin', 'Maya', 'Jamal', 'Élodie', 'Ravi', 'Ana', 'Sipho', 'Malik', 'Grace', 'Lucas', 'Ayesha', 'Diego', 'Hana', 'Kai', 'Nadia'];
  var ITEMS = ['apples', 'stickers', 'crayons', 'marbles', 'books', 'cookies', 'shells', 'pencils', 'toy cars', 'beads', 'acorns', 'grapes', 'leaves', 'balloons', 'buttons', 'rocks'];
  var SHOP = ['pencil', 'eraser', 'apple', 'sticker', 'ruler', 'juice box', 'cookie', 'toy car', 'marker', 'notebook', 'ball', 'muffin', 'banana', 'glue stick', 'bookmark', 'orange'];

  function mAddSub(R, L) {
    var max = MAXN[L], plus = R() < 0.5, a, b;
    if (L === 'hard') {
      if (plus) { do { a = ri(R, 11, 89); b = ri(R, 11, 89); } while (a + b > 100 || (a % 10) + (b % 10) < 10); }
      else { do { a = ri(R, 21, 99); b = ri(R, 11, a - 1); } while ((a % 10) >= (b % 10)); }
    } else if (plus) { a = ri(R, 1, max - 1); b = ri(R, 1, max - a); }
    else { a = ri(R, 2, max); b = ri(R, 1, a - 1); }
    return Q('as:' + a + (plus ? '+' : '-') + b, a + (plus ? ' + ' : ' − ') + b + ' = ' + BL, String(plus ? a + b : a - b));
  }
  function mMissing(R, L) {
    var c = ri(R, L === 'easy' ? 5 : 10, MAXN[L]), a = ri(R, 1, c - 1);
    if (R() < 0.5) return Q('mi:' + a + '+?=' + c, a + ' + ' + BLS + ' = ' + c, String(c - a));
    return Q('mi:' + c + '-?=' + a, c + ' − ' + BLS + ' = ' + a, String(c - a));
  }
  function mWord(R, L) {
    var max = MAXN[L], types = L === 'easy' ? ['join', 'take'] : ['join', 'take', 'compare'];
    var t = pick(R, types), nm = sample(R, NAMES, 2), it = pick(R, ITEMS), a, b, text;
    if (t === 'join') {
      a = ri(R, 2, max - 1); b = ri(R, 1, max - a);
      text = nm[0] + ' has ' + a + ' ' + it + '. ' + nm[1] + ' gives ' + nm[0] + ' ' + b + ' more. How many now?';
    } else if (t === 'take') {
      a = ri(R, 3, max); b = ri(R, 1, a - 1);
      text = nm[0] + ' had ' + a + ' ' + it + ' and gave ' + b + ' to ' + nm[1] + '. How many are left?';
    } else {
      a = ri(R, 3, max); b = ri(R, 1, a - 1);
      text = nm[0] + ' has ' + a + ' ' + it + '. ' + nm[1] + ' has ' + b + '. How many more does ' + nm[0] + ' have?';
    }
    return Q('wp:' + t + ':' + a + ':' + b, esc(text) + ' ' + BLS, String(t === 'join' ? a + b : a - b));
  }
  function mTensOnes(R, L) {
    var n = ri(R, 10, L === 'easy' ? 20 : L === 'medium' ? 50 : 99), t = Math.floor(n / 10), o = n % 10;
    if (R() < 0.5) return Q('n:' + n, n + ' = ' + BLS + ' tens ' + BLS + ' ones', t + ' tens ' + o + ' ones');
    return Q('n:' + n, t + ' tens ' + o + ' ones = ' + BL, String(n));
  }
  function mCompare(R, L) {
    var max = MAXN[L], a, b;
    if (L === 'hard' && R() < 0.3) {
      var x, y;
      do { x = ri(R, 1, 9); y = ri(R, 1, 9); } while (x === y);
      a = 10 * x + y; b = 10 * y + x;
    } else if (R() < 0.12) { a = b = ri(R, 1, max); }
    else { a = ri(R, 0, max); do { b = ri(R, 0, max); } while (b === a); }
    return Q('cmp:' + a + ':' + b, 'Write &lt;, &gt; or =: &nbsp;' + a + ' ' + BOX + ' ' + b, a < b ? '&lt;' : a > b ? '&gt;' : '=');
  }
  var SKIP_LIMIT = { easy: { 2: 20, 5: 50, 10: 100 }, medium: { 2: 50, 5: 100, 10: 100 }, hard: { 2: 100, 5: 100, 10: 100, 25: 200 } };
  function mSkip(R, L) {
    var steps = L === 'hard' ? [2, 5, 10, 25] : [2, 5, 10], step = pick(R, steps);
    var back = L === 'hard' && R() < 0.35, lim = SKIP_LIMIT[L][step];
    var start = step * ri(R, 0, Math.floor((lim - 4 * step) / step));
    var seq = [0, 1, 2, 3, 4].map(function (i) { return start + i * step; });
    if (back) seq.reverse();
    var blanks = sample(R, [1, 2, 3, 4], 2);
    var shown = seq.map(function (v, i) { return blanks.indexOf(i) >= 0 ? BLS : String(v); }).join(', ');
    return Q('sk:' + step + ':' + seq[0] + ':' + (back ? 'b' : 'f'), 'Count ' + (back ? 'back ' : '') + 'by ' + step + 's:<br>' + shown, blanks.slice().sort().map(function (i) { return seq[i]; }).join(', '));
  }
  function mBeforeAfter(R, L) {
    var max = MAXN[L], t = pick(R, ['before', 'after', 'between']), n;
    if (t === 'before') { n = ri(R, 1, max); return Q('n:' + n, 'What number comes just before ' + n + '? ' + BLS, String(n - 1)); }
    if (t === 'after') { n = ri(R, 0, max - 1); return Q('n:' + n, 'What number comes just after ' + n + '? ' + BLS, String(n + 1)); }
    n = ri(R, 1, max - 1);
    return Q('n:' + n, 'What number is between ' + (n - 1) + ' and ' + (n + 1) + '? ' + BLS, String(n));
  }
  function mOrder(R, L) {
    var max = MAXN[L], k = L === 'hard' ? 4 : 3, desc = L === 'hard' && R() < 0.4, nums = [];
    while (nums.length < k) { var v = ri(R, 0, max); if (nums.indexOf(v) < 0) nums.push(v); }
    var sorted = nums.slice().sort(function (x, y) { return x - y; });
    var target = desc ? sorted.slice().reverse() : sorted;
    if (nums.join() === target.join()) { var tmp = nums[0]; nums[0] = nums[1]; nums[1] = tmp; }
    var blanks = []; for (var i = 0; i < k; i++) blanks.push(BLS);
    return Q('ord:' + sorted.join(',') + ':' + (desc ? 'd' : 'a'),
      'Put in order, ' + (desc ? 'greatest to least' : 'least to greatest') + ': <b>' + nums.join(', ') + '</b><br>' + blanks.join(', '), target.join(', '));
  }
  function mEvenOdd(R, L) {
    var n = ri(R, 1, MAXN[L]);
    return Q('n:' + n, 'Is ' + n + ' even or odd?' + circ(['even', 'odd']), n % 2 ? 'odd' : 'even');
  }
  function mCoins(R, L) {
    var list = [], i, total;
    var kinds = L === 'easy' ? [1, 5, 10] : [1, 5, 10, 25], maxC = L === 'easy' ? 4 : L === 'medium' ? 5 : 6, cap = L === 'easy' ? 40 : 100;
    do {
      var cnt = ri(R, 2, maxC); list = []; total = 0;
      for (i = 0; i < cnt; i++) { var c = pick(R, kinds); list.push(c); total += c; }
    } while (total > cap);
    list.sort(function (x, y) { return y - x; });
    return Q('coin:' + list.join('-'), '<div class="row">' + coinsSvg(list) + '<span>How much money?<br>' + BLS + '¢</span></div>', total + '¢');
  }
  function mShop(R, L) {
    var it = sample(R, SHOP, 2);
    if (L === 'hard' && R() < 0.5) {
      var p = 5 * ri(R, 1, 19);
      return Q('shop:c:' + p, 'You have $1. You buy ' + an(it[0]) + ' for ' + p + '¢. How much change? ' + BLS + '¢', (100 - p) + '¢');
    }
    var cap = MAXN[L], p1 = ri(R, 1, cap - 1), p2 = ri(R, 1, cap - p1);
    return Q('shop:t:' + Math.min(p1, p2) + ':' + Math.max(p1, p2),
      esc(an(it[0]).replace(/^./, function (c) { return c.toUpperCase(); })) + ' costs ' + p1 + '¢. ' + esc(an(it[1]).replace(/^./, function (c) { return c.toUpperCase(); })) + ' costs ' + p2 + '¢. How much for both? ' + BLS + '¢', (p1 + p2) + '¢');
  }
  function mClock(R, L) {
    var h = ri(R, 1, 12), m = pick(R, L === 'easy' ? [0, 30] : [0, 15, 30, 45]), t = h + ':' + pad2(m);
    if (R() < 0.5) return Q('t:' + t, '<div class="row">' + clockSvg(h, m, true) + '<span>What time is it?<br>' + TIME + '</span></div>', t);
    return Q('t:' + t, '<div class="row">' + clockSvg(h, m, false) + '<span>Draw the hands to show <b>' + t + '</b>.</span></div>', 'hands at ' + t);
  }
  function mLater(R) {
    var h = ri(R, 1, 12), m = pick(R, [0, 15, 30, 45]), d = pick(R, [30, 60]);
    return Q('lt:' + h + ':' + m + ':' + d, 'It is <b>' + h + ':' + pad2(m) + '</b>. What time will it be in ' + (d === 30 ? 'half an hour' : '1 hour') + '? ' + TIME, (function () { var tot = (h % 12) * 60 + m + d, hh = Math.floor(tot / 60) % 12 || 12; return hh + ':' + pad2(tot % 60); })());
  }
  function mCalendar(R, L) {
    var isDay = R() < 0.5, list = isDay ? WEEK : MONTHS, i = ri(R, 0, list.length - 1), after = R() < 0.5;
    var dist = L === 'hard' && R() < 0.5 ? 2 : 1, unit = isDay ? 'day' : 'month', text;
    if (dist === 1) text = 'What ' + unit + ' comes just ' + (after ? 'after ' : 'before ') + list[i] + '?';
    else text = 'What ' + unit + ' is 2 ' + unit + 's ' + (after ? 'after ' : 'before ') + list[i] + '?';
    return Q('cal:' + unit + ':' + i + ':' + after + ':' + dist, text + '<br>' + BLM, list[(i + (after ? dist : -dist) + list.length) % list.length]);
  }
  var GR = { easy: [2, 4, 2, 5], medium: [2, 5, 2, 5], hard: [2, 5, 2, 6] };
  function mEqGroups(R, L) {
    var g = ri(R, GR[L][0], GR[L][1]), n = ri(R, GR[L][2], GR[L][3]);
    return Q('mul:' + g + 'x' + n, '<div class="row">' + groupsSvg(g, n) + '<span><span class="nw">' + BLS + ' groups of ' + BLS + '</span><br>= ' + BLS + ' in all</span></div>', g + ' groups of ' + n + ' = ' + g * n);
  }
  function mRepAdd(R, L) {
    var g = ri(R, GR[L][0], GR[L][1]), n = ri(R, GR[L][2], GR[L][3]);
    if (L === 'hard' && R() < 0.5) return Q('mul:' + g + 'x' + n, g + ' groups of ' + n + ' = ' + BL + ' in all', String(g * n));
    var parts = []; for (var i = 0; i < g; i++) parts.push(n);
    return Q('mul:' + g + 'x' + n, parts.join(' + ') + ' = ' + BL, String(g * n));
  }
  function mShare(R, L) {
    var f = ri(R, 2, L === 'easy' ? 4 : 5), each = ri(R, 2, L === 'easy' ? 5 : L === 'medium' ? 6 : 10);
    var total = f * each, it = pick(R, ITEMS);
    return Q('sh:' + total + '/' + f, total + ' ' + it + ' are shared equally by ' + f + ' friends. How many does each get? ' + BLS, String(total / f));
  }
  var FR_WORDS = { 2: 'one half', 3: 'one third', 4: 'one fourth' };
  function mFraction(R, L) {
    var shape = pick(R, ['circle', 'bar', 'square']);
    if (L !== 'hard') {
      var n = pick(R, [2, 3, 4]);
      return Q('fr:' + shape + ':' + n, '<div class="row">' + fracSvg(shape, n, [ri(R, 0, n - 1)]) + '<span>What fraction is shaded?<br>' + circ([FR_WORDS[2], FR_WORDS[3], FR_WORDS[4]]) + '</span></div>', FR_WORDS[n]);
    }
    var parts = pick(R, [2, 3, 4, 6, 8]), k = ri(R, 1, parts - 1), idx = [];
    for (var i = 0; i < parts; i++) idx.push(i);
    return Q('fr:' + shape + ':' + k + '/' + parts, '<div class="row">' + fracSvg(shape, parts, sample(R, idx, k)) + '<span>' + BLS + ' out of ' + BLS + ' equal parts are shaded.</span></div>', k + ' out of ' + parts);
  }
  var SHAPE_KINDS = ['circle', 'square', 'triangle', 'star', 'diamond'];
  var PATTERNS = { easy: ['AB', 'AAB', 'ABB'], medium: ['AB', 'AAB', 'ABB', 'ABC'], hard: ['AB', 'AAB', 'ABB', 'ABC', 'AABB', 'ABCB'] };
  function mShapePattern(R, L) {
    var p = pick(R, PATTERNS[L]), letters = [];
    p.split('').forEach(function (ch) { if (letters.indexOf(ch) < 0) letters.push(ch); });
    var shapes = sample(R, SHAPE_KINDS, letters.length), len = p.length >= 4 ? 8 : 6, seq = [];
    for (var i = 0; i < len; i++) seq.push(shapes[letters.indexOf(p[i % p.length])]);
    return Q('sp:' + p + ':' + shapes.join(','), '<div class="row">' + patternSvg(seq) + '<span>Draw what comes next.</span></div>', shapes[letters.indexOf(p[len % p.length])]);
  }
  var NUM_STEPS = { easy: [1, 2, 3, 5], medium: [2, 3, 5, 10], hard: [2, 3, 4, 5, 10, 25] };
  function mNumberPattern(R, L) {
    var max = MAXN[L], step = pick(R, NUM_STEPS[L]), down = L !== 'easy' && R() < 0.3, start;
    if (down) start = ri(R, 4 * step, max); else start = ri(R, 0, max - 4 * step);
    var seq = [0, 1, 2, 3].map(function (i) { return down ? start - i * step : start + i * step; });
    if (L === 'hard' && R() < 0.5) {
      return Q('np:' + seq[0] + ':' + step + ':' + down + ':r', 'Find the rule: <b>' + seq.join(', ') + '</b><br>Rule: ' + circ(['add', 'subtract']) + ' ' + BLS, (down ? 'subtract ' : 'add ') + step);
    }
    return Q('np:' + seq[0] + ':' + step + ':' + down, 'What comes next?<br><b>' + seq.join(', ') + ',</b> ' + BLS, String(down ? seq[3] - step : seq[3] + step));
  }
  function mathGroups(L, topics) {
    var all = {
      add: [mAddSub, mMissing, mWord],
      place: [mTensOnes, mCompare, mSkip, mBeforeAfter, mOrder, mEvenOdd],
      money: L === 'hard' ? [mCoins, mShop, mClock, mLater, mCalendar] : [mCoins, mShop, mClock, mCalendar],
      groups: [mEqGroups, mRepAdd, mShare, mFraction, mShapePattern, mNumberPattern]
    };
    return topics.map(function (t) { return all[t]; });
  }

  // ===================== Writing & Spelling =====================
  var SPELL = {
    easy: ['said|sed|siad', 'come|cum|kome', 'went|wint|whent', 'they|thay|tey', 'have|hav|haev', 'was|wuz|wos', 'what|wat|whut', 'when|wen|whin',
      'look|luk|lok', 'jump|jumb|jupm', 'play|pley|plai', 'like|liek|lik', 'little|littel|litle', 'help|halp|hepl', 'make|mak|maik', 'blue|bloo|blu',
      'green|grean|gren', 'yellow|yelow|yello', 'with|wiht|wif', 'down|doun|dwon', 'good|gud|goud', 'your|yor|yuor', 'want|wunt|whant', 'here|heer|hir', 'some|som|soem'],
    medium: ['friend|freind|frend', 'school|skool|scool', 'water|watter|wotter', 'house|hous|howse', 'people|peple|peeple', 'could|cood|culd', 'would|wud|whould',
      'again|agen|agin', 'about|abowt|abuot', 'after|aftr|affter', 'every|evry|evrey', 'many|meny|manny', 'night|nite|nihgt', 'light|lite|ligt', 'where|whare|wher',
      'which|wich|whitch', 'story|stori|storry', 'happy|hapy|happey', 'funny|funy|funney', 'around|arond|arownd', 'before|befor|beefore', 'animal|aminal|animel',
      'family|famly|fammily', 'sister|sistor|sistr', 'garden|gardin|gardon', 'winter|wintir|wintr', 'pretty|prity|pritty'],
    hard: ['because|becuz|becaus', 'beautiful|beutiful|beautifull', 'favorite|favrite|faverite', 'neighbor|nabor|naybor', 'color|culor|colur',
      'through|thru|throgh', 'thought|thot|thougt', 'enough|enuff|enogh', 'different|diffrent|differant', 'important|importent|inportant',
      'Wednesday|Wensday|Wednsday', 'February|Febuary|Febrary', 'together|togather|tugether', 'laughed|laffed|laughd', 'special|speshal|specal',
      'surprise|suprise|surprize', 'answer|anser|ansewr', 'believe|beleive|belive', 'library|libary|liberry', 'minute|minit|minnute', 'piece|peice|pice',
      'breakfast|brekfast|breakfest', 'probably|probly|probaly', 'caught|cought|cawt', 'remember|rember|remembor', 'sometimes|sumtimes|somtimes', 'between|betwen|beetween']
  };
  var CAPS = {
    easy: ['my dog likes to run', 'i see a big red bus', 'sam and i went to the park', 'we play in the snow', 'mia has a pet fish', 'the sun is hot today',
      'my mom bakes bread', 'ben likes to read books', 'i have two cats', 'the bird sang a song', 'we went to the zoo', 'ali can ride a bike', 'my hat is blue',
      'the frog jumps in the pond', 'tess and i like to draw'],
    medium: ['on monday we went to the library', 'my friend lena lives on maple street', 'in july we swim at the beach', 'dad and i fixed my bike',
      'our class has a fish named sunny', 'kofi read a book about whales', 'on saturday i visited my grandma', 'my cousin rosa has a new puppy',
      'we sang songs in december', 'jun and i built a snow fort', 'the bus stopped on oak road', 'every friday we have gym class', 'last june we had a picnic',
      'my brother sami likes hockey'],
    hard: ['we drove to boston on friday', 'my aunt lives in austin, texas', 'in august we camped near lake tahoe', 'my family flew to seattle in july',
      'we saw the statue of liberty', 'grandpa grew up in chicago', 'on the fourth of july we went to yellowstone', 'amira visited washington in may',
      'the rocky mountains are in colorado', 'we took a ferry to staten island', 'my friend moved to denver in september', 'the mississippi river is very long',
      'in march we visited the grand canyon', 'my uncle lives in st. louis', 'we ate pancakes in miami on sunday']
  };
  var ENDS = {
    easy: ['Where is my red hat|?', 'I like to swim|.', 'Can you help me|?', 'The cat is on the mat|.', 'Do you like pizza|?', 'We go to school|.', 'Is it raining|?',
      'My dog is brown|.', 'What is your name|?', 'I have a blue kite|.', 'Who wants a snack|?', 'The bus is late|.', 'How old are you|?', 'Tom has a toy boat|.'],
    medium: ['Look out for the ball|!', 'Wow, that is a huge dog|!', 'We won the game|!', 'Stop, the light is red|!', 'Hooray, it is snowing|!', 'Ouch, that hurts|!',
      'When does the movie start|?', 'My sister plays hockey|.', 'Why is the sky blue|?', 'The library opens at nine|.', 'Can we bake cookies|?', 'Our cat sleeps all day|.'],
    hard: ['What a great idea|!', 'Watch out for the ice|!', 'Which bus goes to the park|?', 'The geese fly south in the fall|.', 'Help, my kite is stuck|!',
      'Have you ever seen a moose|?', 'We packed lunch for the trip|.', 'That was the best day ever|!', 'Where did you put the map|?', 'The lake froze last night|.']
  };
  var HOMO = {
    easy: ['I have ___ cats.|two|to', 'We walk ___ school.|to|two', 'I can ___ the moon.|see|sea', 'Fish swim in the ___.|sea|see', 'Come over ___.|here|hear',
      'I ___ a bird sing.|hear|here', 'The sky is ___.|blue|blew', 'I ate ___ cookie.|one|won', 'Our team ___ the game.|won|one', 'The ___ is hot today.|sun|son'],
    medium: ['Put the box over ___.|there|their', 'They lost ___ hats.|their|there', 'I want to ___ a toy.|buy|by', 'We walked ___ the lake.|by|buy',
      'I ___ the answer.|know|no', 'Please ___ your name.|write|right', 'Turn ___ at the corner.|right|write', 'The wind ___ hard.|blew|blue',
      'I ate a juicy ___.|pear|pair', 'I have a new ___ of socks.|pair|pear', 'We will ___ at the park.|meet|meat'],
    hard: ['This is ___ house.|our|hour', 'The movie is one ___ long.|hour|our', 'I ___ two apples.|ate|eight', 'She has ___ pencils.|eight|ate',
      'I ___ the bell ring.|heard|herd', 'A ___ of cows ran by.|herd|heard', 'The baker uses ___.|flour|flower', 'A red ___ grew.|flower|flour',
      'There are seven days in a ___.|week|weak', 'We ___ our bikes home.|rode|road', 'The ___ was bumpy.|road|rode', 'This gift is ___ you.|for|four',
      'I ___ it was you.|knew|new', 'I have ___ shoes.|new|knew']
  };
  var ABC = {
    easy: ['cat', 'dog', 'sun', 'hat', 'bed', 'pig', 'run', 'map', 'fox', 'egg', 'jam', 'kit', 'leg', 'net', 'owl', 'ant', 'bus', 'cup', 'van', 'web', 'zoo', 'yak', 'ice'],
    medium: ['apple', 'bread', 'cloud', 'daisy', 'eagle', 'frog', 'grape', 'house', 'igloo', 'juice', 'kite', 'lemon', 'mouse', 'nest', 'ocean', 'pizza', 'queen',
      'river', 'snake', 'tiger', 'umbrella', 'violin', 'whale', 'yarn', 'zebra'],
    hardSame: [['sand', 'snow', 'sun', 'ship'], ['bat', 'bell', 'book', 'bird'], ['cake', 'cold', 'cup', 'clock'], ['tree', 'toy', 'tent', 'top'],
      ['plum', 'park', 'pen', 'pot'], ['milk', 'moon', 'map', 'mitten'], ['fish', 'fox', 'farm', 'fence']]
  };
  var PLURALS = {
    easy: ['cat', 'dog', 'book', 'tree', 'hat', 'car', 'bike', 'cup', 'frog', 'pig', 'bird', 'ball', 'shoe', 'cake', 'kite', 'sock', 'egg', 'star'],
    medium: ['box', 'fox', 'bus', 'dish', 'brush', 'lunch', 'bench', 'glass', 'watch', 'dress', 'wish', 'beach', 'peach', 'bush', 'inch', 'class'],
    hard: ['child', 'mouse', 'leaf', 'man', 'woman', 'foot', 'tooth', 'goose', 'wolf', 'knife', 'sheep', 'half', 'person', 'baby', 'puppy', 'berry', 'loaf', 'shelf', 'city', 'story']
  };
  var COMPOUND = ['sun|flower', 'rain|bow', 'foot|ball', 'snow|man', 'cup|cake', 'bed|room', 'butter|fly', 'play|ground', 'back|pack', 'pan|cake', 'star|fish',
    'sand|box', 'fire|fly', 'gold|fish', 'rain|coat', 'sun|set', 'tooth|brush', 'home|work', 'lady|bug', 'pop|corn', 'snow|flake', 'mail|box', 'bath|tub', 'door|bell'];
  var OPPOSITES = {
    easy: ['hot|cold', 'big|small', 'up|down', 'happy|sad', 'fast|slow', 'day|night', 'wet|dry', 'in|out', 'yes|no', 'on|off', 'stop|go', 'open|closed'],
    medium: ['full|empty', 'hard|soft', 'loud|quiet', 'light|dark', 'push|pull', 'top|bottom', 'short|tall', 'win|lose', 'sweet|sour', 'inside|outside'],
    hard: ['early|late', 'first|last', 'before|after', 'never|always', 'laugh|cry', 'float|sink', 'remember|forget', 'asleep|awake', 'arrive|leave', 'heavy|light', 'shallow|deep']
  };
  var RHYME = {
    easy: ['cat', 'hen', 'pig', 'sun', 'bed', 'hop', 'man', 'top', 'bug', 'fan', 'log', 'pin'],
    medium: ['cake', 'bell', 'king', 'boat', 'star', 'rain', 'day', 'moon', 'tree', 'ring', 'coat', 'sock'],
    hard: ['train', 'light', 'snow', 'chair', 'spoon', 'sleep', 'clock', 'play', 'night', 'bear', 'cloud', 'skate']
  };
  var CONTRACTIONS = ['do not|don’t', 'can not|can’t', 'I am|I’m', 'it is|it’s', 'we are|we’re', 'they are|they’re', 'you are|you’re', 'is not|isn’t',
    'did not|didn’t', 'I will|I’ll', 'she is|she’s', 'he is|he’s', 'was not|wasn’t', 'let us|let’s', 'we will|we’ll', 'I have|I’ve', 'could not|couldn’t', 'would not|wouldn’t'];

  function upTo(L, obj) {
    var out = obj.easy.slice();
    if (L !== 'easy' && obj.medium) out = out.concat(obj.medium);
    if (L === 'hard' && obj.hard) out = out.concat(obj.hard);
    return out;
  }
  function wCircle(R, L) {
    var p = pick(R, SPELL[L]).split('|');
    return Q('w:' + p[0].toLowerCase(), 'Circle the right spelling:' + circ(shuffle(R, p)), esc(p[0]));
  }
  function wFix(R, L) {
    var p = pick(R, SPELL[L]).split('|'), wrong = p[1 + ri(R, 0, 1)];
    return Q('w:' + p[0].toLowerCase(), 'Fix the spelling: <b>' + esc(wrong) + '</b> → ' + BLM, esc(p[0]));
  }
  var PROPER = { i: 'I', sam: 'Sam', mia: 'Mia', ben: 'Ben', ali: 'Ali', tess: 'Tess', monday: 'Monday', lena: 'Lena', maple: 'Maple', street: 'Street',
    july: 'July', sunny: 'Sunny', kofi: 'Kofi', saturday: 'Saturday', rosa: 'Rosa', december: 'December', jun: 'Jun', oak: 'Oak', road: 'Road', friday: 'Friday',
    june: 'June', sami: 'Sami', ottawa: 'Ottawa', halifax: 'Halifax', 'halifax,': 'Halifax,', nova: 'Nova', scotia: 'Scotia', august: 'August', lake: 'Lake', louise: 'Louise',
    vancouver: 'Vancouver', cn: 'CN', tower: 'Tower', toronto: 'Toronto', grandpa: 'grandpa', winnipeg: 'Winnipeg', canada: 'Canada', day: 'Day', niagara: 'Niagara',
    falls: 'Falls', amira: 'Amira', quebec: 'Quebec', city: 'City', may: 'May', rocky: 'Rocky', mountains: 'Mountains', alberta: 'Alberta', prince: 'Prince',
    edward: 'Edward', island: 'Island', regina: 'Regina', september: 'September', yukon: 'Yukon', river: 'River', march: 'March', rideau: 'Rideau', canal: 'Canal',
    'st.': 'St.', 'john’s': 'John’s', montreal: 'Montreal', sunday: 'Sunday', boston: 'Boston', austin: 'Austin', 'austin,': 'Austin,',
    texas: 'Texas', tahoe: 'Tahoe', seattle: 'Seattle', statue: 'Statue', liberty: 'Liberty', chicago: 'Chicago', fourth: 'Fourth', yellowstone: 'Yellowstone',
    washington: 'Washington', colorado: 'Colorado', staten: 'Staten', denver: 'Denver', mississippi: 'Mississippi', grand: 'Grand', canyon: 'Canyon',
    louis: 'Louis', miami: 'Miami' };
  function capFix(s) {
    var out = s.split(' ').map(function (w) { return has(PROPER, w) ? PROPER[w] : w; }).join(' ');
    return out.charAt(0).toUpperCase() + out.slice(1) + '.';
  }
  var IRREG = { child: 'children', mouse: 'mice', leaf: 'leaves', man: 'men', woman: 'women', foot: 'feet', tooth: 'teeth', goose: 'geese', wolf: 'wolves',
    knife: 'knives', sheep: 'sheep', half: 'halves', person: 'people', loaf: 'loaves', shelf: 'shelves' };
  function pluralOf(w) {
    if (has(IRREG, w)) return IRREG[w];
    if (/(s|x|ch|sh)$/.test(w)) return w + 'es';
    if (/[^aeiou]y$/.test(w)) return w.slice(0, -1) + 'ies';
    return w + 's';
  }
  function wCaps(R, L) {
    var s = pick(R, CAPS[L]);
    return Q('cap:' + s, 'Fix the capitals. Add a period.<br><i>' + esc(s) + '</i>' + BLL, esc(capFix(s)));
  }
  function wEnd(R, L) {
    var p = pick(R, L === 'easy' ? ENDS.easy : upTo(L, ENDS)).split('|');
    return Q('em:' + p[0], 'Add the end mark: ' + esc(p[0]) + ' ' + BOX + '<br><span class="hint">Use ' + (L === 'easy' ? '. or ?' : '. ? or !') + '</span>', p[1]);
  }
  function wHomophone(R, L) {
    var p = pick(R, upTo(L, HOMO)).split('|');
    return Q('hp:' + p[0], 'Circle the right word:<br>' + esc(p[0]).replace('___', BLS) + circ(shuffle(R, [p[1], p[2]])), esc(p[1]));
  }
  function wAbc(R, L) {
    var words;
    if (L === 'easy') words = sample(R, ABC.easy, 3);
    else if (L === 'medium') words = sample(R, ABC.medium, 3);
    else if (R() < 0.6) {
      var grp = pick(R, ABC.hardSame), two = sample(R, grp, 2), letter = grp[0][0];
      var others = ABC.medium.filter(function (w) { return w[0] !== letter; });
      words = two.concat(sample(R, others, 2));
    } else words = sample(R, ABC.medium, 4);
    var sorted = words.slice().sort();
    words = shuffle(R, words);
    if (words.join() === sorted.join()) words.reverse();
    var blanks = words.map(function () { return BLS; });
    return Q('abc:' + sorted.join(','), 'Write in ABC order: <b>' + words.join(', ') + '</b><br>' + blanks.join(' '), sorted.join(', '));
  }
  function wPlural(R, L) {
    var w = pick(R, PLURALS[L]);
    return Q('w:' + w, 'Write the plural: one ' + w + ', two ' + BLM, pluralOf(w));
  }
  function wCompound(R) {
    var p = pick(R, COMPOUND).split('|');
    return Q('cp:' + p.join(''), 'Make a compound word:<br>' + p[0] + ' + ' + p[1] + ' = ' + BLM, p.join(''));
  }
  function wOpposite(R, L) {
    var p = pick(R, upTo(L, OPPOSITES)).split('|');
    if (R() < 0.5) p.reverse();
    return Q('w:' + p[0], 'The opposite of <b>' + p[0] + '</b> is ' + BL + '.', p[1]);
  }
  function wRhyme(R, L) {
    var w = pick(R, upTo(L, RHYME));
    return Q('w:' + w, 'Write a word that rhymes with <b>' + w + '</b>: ' + BL, H.open());
  }
  function wContraction(R) {
    var p = pick(R, CONTRACTIONS).split('|');
    if (R() < 0.5) return Q('ct:' + p[1], 'Write the short form: ' + esc(p[0]) + ' = ' + BL, esc(p[1]));
    return Q('ct:' + p[1], 'Write the two words: <b>' + esc(p[1]) + '</b> = ' + BLS + ' ' + BLS, esc(p[0]));
  }
  function writingKinds(L) {
    if (L === 'easy') return [wCircle, wCaps, wEnd, wHomophone, wAbc, wPlural, wOpposite, wRhyme];
    if (L === 'medium') return [wCircle, wFix, wCaps, wEnd, wHomophone, wAbc, wPlural, wCompound, wOpposite, wRhyme];
    return [wCircle, wFix, wCaps, wEnd, wHomophone, wAbc, wPlural, wCompound, wOpposite, wRhyme, wContraction];
  }

  // ===================== French =====================
  var VOCAB = {
    colours: ['rouge|red', 'bleu|blue', 'vert|green', 'jaune|yellow', 'orange|orange', 'rose|pink', 'violet|purple', 'noir|black', 'blanc|white', 'brun|brown', 'gris|grey'],
    greetings: ['bonjour|hello', 'au revoir|goodbye', 'merci|thank you', 'bonne nuit|good night', 's’il vous plaît|please', 'salut|hi', 'oui|yes', 'non|no',
      'bonsoir|good evening', 'de rien|you’re welcome'],
    animals: ['chat|cat', 'chien|dog', 'oiseau|bird', 'poisson|fish', 'lapin|rabbit', 'cheval|horse', 'vache|cow', 'cochon|pig', 'mouton|sheep', 'canard|duck',
      'souris|mouse', 'ours|bear', 'lion|lion', 'grenouille|frog', 'tortue|turtle'],
    family: ['mère|mother', 'père|father', 'sœur|sister', 'frère|brother', 'grand-mère|grandmother', 'grand-père|grandfather', 'bébé|baby', 'tante|aunt',
      'oncle|uncle', 'famille|family'],
    days: ['lundi|Monday', 'mardi|Tuesday', 'mercredi|Wednesday', 'jeudi|Thursday', 'vendredi|Friday', 'samedi|Saturday', 'dimanche|Sunday'],
    body: ['tête|head', 'main|hand', 'pied|foot', 'nez|nose', 'bouche|mouth', 'œil|eye', 'oreille|ear', 'bras|arm', 'jambe|leg', 'dos|back'],
    food: ['pomme|apple', 'pain|bread', 'lait|milk', 'fromage|cheese', 'eau|water', 'gâteau|cake', 'œuf|egg', 'banane|banana', 'carotte|carrot', 'poulet|chicken'],
    school: ['livre|book', 'crayon|pencil', 'gomme|eraser', 'école|school', 'sac à dos|backpack', 'règle|ruler', 'papier|paper', 'chaise|chair', 'table|table', 'ciseaux|scissors'],
    months: ['janvier|January', 'février|February', 'mars|March', 'avril|April', 'mai|May', 'juin|June', 'juillet|July', 'août|August', 'septembre|September',
      'octobre|October', 'novembre|November', 'décembre|December']
  };
  var FR_TOPICS = {
    easy: ['colours', 'greetings', 'animals'],
    medium: ['colours', 'greetings', 'animals', 'family', 'days'],
    hard: ['colours', 'greetings', 'animals', 'family', 'days', 'body', 'food', 'school', 'months']
  };
  var NUMS = ['un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize',
    'dix-sept', 'dix-huit', 'dix-neuf', 'vingt'];
  var COLOUR_THINGS = ['a banana|jaune', 'a lemon|jaune', 'the sun|jaune', 'grass|vert', 'a frog|vert', 'a cucumber|vert', 'the sky|bleu', 'a blueberry|bleu',
    'snow|blanc', 'milk|blanc', 'a polar bear|blanc', 'a strawberry|rouge', 'a tomato|rouge', 'a ladybug|rouge', 'a carrot|orange', 'a pumpkin|orange',
    'coal|noir', 'a crow|noir', 'a pig|rose', 'a flamingo|rose', 'an elephant|gris', 'chocolate|brun', 'an eggplant|violet'];
  var SAY = ['You meet a friend in the morning.|bonjour', 'You leave a friend’s house.|au revoir', 'A friend gives you a gift.|merci',
    'You go to bed at night.|bonne nuit', 'You ask for more juice nicely.|s’il vous plaît', 'You see your teacher before class.|bonjour',
    'Grandma hugs you at bedtime.|bonne nuit', 'Your friend shares a snack.|merci', 'You wave as the bus leaves.|au revoir', 'You ask to borrow a crayon.|s’il vous plaît'];
  var SAY_CHOICES = ['bonjour', 'au revoir', 'merci', 'bonne nuit', 's’il vous plaît'];

  function vocab(L) {
    var out = [];
    FR_TOPICS[L].forEach(function (t) {
      VOCAB[t].forEach(function (s) { var p = s.split('|'); out.push({ fr: p[0], en: p[1], topic: t }); });
    });
    return out;
  }
  function others(R, list, item, n) {
    return sample(R, list.filter(function (x) { return x !== item; }), n);
  }
  function fCircle(R, L) {
    var v = vocab(L), w = pick(R, v), same = v.filter(function (x) { return x.topic === w.topic; });
    var ch = others(R, same, w, 2).map(function (x) { return x.fr; }).concat([w.fr]);
    return Q('fr:' + w.fr, 'Circle the French word for <b>' + esc(w.en) + '</b>:<br>' + circ(shuffle(R, ch)), esc(w.fr));
  }
  function fMeaning(R, L) {
    var v = vocab(L), w = pick(R, v), same = v.filter(function (x) { return x.topic === w.topic; });
    var ch = others(R, same, w, 2).map(function (x) { return x.en; }).concat([w.en]);
    return Q('fr:' + w.fr, 'What does <b>' + esc(w.fr) + '</b> mean?<br>' + circ(shuffle(R, ch)), esc(w.en));
  }
  function fWrite(R, L) {
    var w = pick(R, vocab(L));
    return Q('fr:' + w.fr, 'Write it in English: <b>' + esc(w.fr) + '</b> → ' + BLM, esc(w.en));
  }
  function fNumber(R, L) {
    var top = L === 'easy' ? 10 : 20, n = ri(R, 1, top);
    if (R() < 0.5) return Q('num:' + n, 'Write the number: <b>' + NUMS[n - 1] + '</b> = ' + BLS, String(n));
    var pool = []; for (var i = 1; i <= top; i++) if (i !== n) pool.push(i);
    var ch = sample(R, pool, 2).map(function (x) { return NUMS[x - 1]; }).concat([NUMS[n - 1]]);
    return Q('num:' + n, 'Circle the French word for <b>' + n + '</b>:<br>' + circ(shuffle(R, ch)), NUMS[n - 1]);
  }
  function fColour(R) {
    var p = pick(R, COLOUR_THINGS).split('|');
    var all = VOCAB.colours.map(function (s) { return s.split('|')[0]; });
    var ch = others(R, all, p[1], 2).concat([p[1]]);
    return Q('obj:' + p[0], 'What colour is ' + esc(p[0]) + '?<br>' + circ(shuffle(R, ch)), p[1]);
  }
  function fSay(R) {
    var p = pick(R, SAY).split('|');
    var ch = others(R, SAY_CHOICES, p[1], 2).concat([p[1]]);
    return Q('fr:' + p[1], 'What do you say? ' + esc(p[0]) + '<br>' + circ(shuffle(R, ch)), esc(p[1]));
  }
  function frNames(key) { return VOCAB[key].map(function (s) { return s.split('|')[0]; }); }
  function fDay(R, L) {
    var d = frNames('days'), i = ri(R, 0, 6), next = d[(i + 1) % 7];
    if (L === 'hard' && R() < 0.4) return Q('fr:' + d[i], 'Write the day that comes after <b>' + d[i] + '</b>: ' + BLM, next);
    var ch = others(R, d.filter(function (x) { return x !== d[i]; }), next, 2).concat([next]);
    return Q('fr:' + d[i], 'Which day comes after <b>' + d[i] + '</b>?<br>' + circ(shuffle(R, ch)), next);
  }
  function fMonth(R) {
    var m = frNames('months'), i = ri(R, 0, 11), next = m[(i + 1) % 12];
    var ch = others(R, m.filter(function (x) { return x !== m[i]; }), next, 2).concat([next]);
    return Q('fr:' + m[i], 'Which month comes after <b>' + esc(m[i]) + '</b>?<br>' + circ(shuffle(R, ch)), next);
  }
  function frenchKinds(L) {
    if (L === 'easy') return [fCircle, fMeaning, fNumber, fColour, fSay];
    if (L === 'medium') return [fCircle, fMeaning, fWrite, fNumber, fColour, fSay, fDay];
    return [fCircle, fMeaning, fWrite, fNumber, fColour, fSay, fDay, fMonth];
  }

  return {
    subjects: [
      { id: 'math', name: 'Math', topics: [
        { id: 'add', name: 'Add & subtract', kinds: function (L) { return mathGroups(L, ['add'])[0]; } },
        { id: 'place', name: 'Place value & counting', kinds: function (L) { return mathGroups(L, ['place'])[0]; } },
        { id: 'money', name: 'Money & time', kinds: function (L) { return mathGroups(L, ['money'])[0]; } },
        { id: 'groups', name: 'Groups, fractions & patterns', kinds: function (L) { return mathGroups(L, ['groups'])[0]; } }
      ] },
      { id: 'reading', name: 'Reading', stories: STORIES },
      { id: 'writing', name: 'Writing & Spelling', kinds: writingKinds },
      H.C.second(2)
    ]
  };
});
