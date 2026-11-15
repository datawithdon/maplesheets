// Grade 2 (English). Content for the worksheet engine in assets/hw-core.js.
'use strict';
HW.register('en-2', function (H) {
  var has = H.has, ri = H.ri, pick = H.pick, shuffle = H.shuffle, sample = H.sample, esc = H.esc, circ = H.circ, Q = H.Q, an = H.an, pad2 = H.pad2;
  var BL = H.BL, BLS = H.BLS, BLL = H.BLL, BLM = H.BLM, TIME = H.TIME, BOX = H.BOX;
  var coinsSvg = H.coinsSvg, clockSvg = H.clockSvg, groupsSvg = H.groupsSvg, fracSvg = H.fracSvg, patternSvg = H.patternSvg;
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  var STORIES = /*STORIES*/{
"easy": [
{"title": "The Red Kite", "text": "Ana has a red kite. She takes it to the park with her dad. The wind is strong. The kite goes up, up, up! It flies over the trees. Then the wind stops. The kite comes down in the grass. Ana runs to get it. “Let’s try again,” says Dad. The kite flies high once more. Ana smiles.", "q": ["T|Ana has a red kite.", "F|Ana goes to the park with her mom.", "T|The wind is strong.", "F|The kite flies over a lake.", "T|The kite comes down in the grass.", "F|Dad runs to get the kite.", "T|The kite flies high again.", "F|Ana is sad at the end.", "T|Ana goes to the park.", "C|What colour is the kite?|blue|red*|green", "C|Who goes with Ana?|her dad*|her mom|her friend", "C|Where do they go?|the beach|the zoo|the park*", "C|What makes the kite go up?|the wind*|the rain|the sun", "C|What does the kite fly over?|the trees*|the houses|the cars", "C|Where does the kite come down?|in a pond|in the grass*|on a roof", "C|Who runs to get the kite?|Dad|a dog|Ana*", "C|What does Dad say?|Let’s go home|Let’s try again*|Let’s eat", "C|How does Ana feel at the end?|happy*|sad|angry", "B|Ana has a red ____.|kite", "B|The ____ is strong.|wind", "B|The kite goes up, up, ____!|up", "B|The kite comes down in the ____.|grass", "B|Ana ____ to get it.|runs", "B|The kite flies ____ once more.|high", "B|At the end, Ana ____.|smiles"]},
{"title": "Milo’s Snow Day", "text": "It is a snow day in Sudbury. Milo puts on his hat and mitts. He goes outside with his sister, Lin. They roll three big balls of snow. They make a snowman! Lin gives it a carrot nose. Milo gives it two black buttons for eyes. Then they go inside and drink hot cocoa.", "q": ["T|It is a snow day.", "F|Milo goes outside with his brother.", "T|They roll three balls of snow.", "F|They make a sandcastle.", "T|Lin gives the snowman a carrot nose.", "F|The buttons are red.", "T|They drink hot cocoa.", "F|Milo puts on his swimsuit.", "T|Milo wears mitts.", "C|What city is it in?|Sudbury*|Ottawa|Calgary", "C|What does Milo put on?|a hat and mitts*|a cap and shorts|a coat and boots", "C|Who is Lin?|his friend|his sister*|his mom", "C|How many balls of snow do they roll?|two|four|three*", "C|What do they make?|a fort|a snowman*|a sled", "C|What is the nose?|a carrot*|a stick|a rock", "C|What are the eyes?|stones|buttons*|grapes", "C|What colour are the buttons?|black*|white|blue", "C|What do they drink?|milk|juice|hot cocoa*", "B|It is a ____ day in Sudbury.|snow", "B|Milo puts on his hat and ____.|mitts", "B|They roll three big ____ of snow.|balls", "B|Lin gives it a carrot ____.|nose", "B|Milo gives it two black ____.|buttons", "B|Then they go ____.|inside", "B|They drink hot ____.|cocoa"]},
{"title": "Priya’s Garden", "text": "Priya has a small garden behind her house. In May, she plants seeds with her grandma. She waters them every day. Soon, little green plants pop up. In July, the plants have red tomatoes and yellow beans. Priya picks a big tomato. Grandma makes a salad. “Our garden is yummy!” says Priya.", "q": ["T|Priya has a garden.", "F|The garden is in front of a school.", "T|Priya plants seeds with her grandma.", "F|She waters the seeds once a week.", "T|The little plants are green.", "F|The tomatoes are yellow.", "T|Grandma makes a salad.", "F|Priya picks a small carrot.", "T|The plants have beans.", "C|Where is the garden?|behind her house*|at the park|at school", "C|Who helps Priya plant?|her dad|her grandma*|her teacher", "C|When does she plant seeds?|in May*|in June|in March", "C|How often does she water them?|every day*|every week|never", "C|What colour are the beans?|green|red|yellow*", "C|What does Priya pick?|a bean|a big tomato*|a flower", "C|What does Grandma make?|a pie|soup|a salad*", "C|When do the plants have tomatoes?|in July*|in May|in April", "C|What does Priya say the garden is?|big|yummy*|messy", "B|Priya has a small ____.|garden", "B|She plants ____ with her grandma.|seeds", "B|She ____ them every day.|waters", "B|Soon, little green ____ pop up.|plants", "B|The plants have red ____.|tomatoes", "B|Priya picks a big ____.|tomato", "B|Grandma makes a ____.|salad"]}
],
"medium": [
{"title": "The Lost Mitten", "text": "On a cold morning in Winnipeg, Kwame walked to school with his friend Sara. When he got to class, he saw that one red mitten was missing. Kwame felt worried because his grandma had knit the mittens for him. At recess, Sara helped him look. They checked the snowbank by the fence and the path by the slide. Then Sara spotted something red under the bench. It was the mitten! It was wet, so the teacher put it on the heater to dry. After lunch, Kwame’s mitten was warm and dry again.", "q": ["T|Kwame walked to school with Sara.", "F|Kwame lost a blue mitten.", "T|Grandma knit the mittens.", "F|Sara laughed at Kwame.", "T|They looked at recess.", "F|The mitten was in the classroom.", "T|The mitten was wet.", "F|The mitten was still wet after lunch.", "C|What city is the story in?|Winnipeg*|Halifax|Toronto", "C|What colour was the mitten?|blue|red*|green", "C|How did Kwame feel?|worried*|silly|sleepy", "C|Who knit the mittens?|his mom|his grandma*|his aunt", "C|When did they look?|at recess*|at night|before school", "C|Where was the mitten?|under the bench*|by the slide|in a tree", "C|Who found the mitten?|Kwame|the teacher|Sara*", "C|Where did the teacher put it?|on the heater*|in a bag|on a hook", "C|What was the weather like?|hot|rainy|cold*", "C|How was the mitten after lunch?|lost|warm and dry*|torn", "B|One red ____ was missing.|mitten", "B|Sara helped him ____.|look", "B|They checked the ____ by the fence.|snowbank", "B|Sara spotted something red under the ____.|bench", "B|The teacher put it on the ____ to dry.|heater", "B|Find a word in the story that rhymes with “bold”: ____|cold", "B|After ____, the mitten was warm and dry.|lunch"]},
{"title": "A Trip to the Library", "text": "Every Saturday, Mateo and his mom take the bus to the library in Ottawa. Mateo loves books about animals. This week, he found a book about beavers. He learned that beavers build dams with sticks and mud. He also learned that a beaver’s teeth never stop growing! The librarian, Ms. Chen, showed him a book about owls too. Mateo took both books home. That night, he read the beaver book to his little sister, Luz. She liked the picture of the baby beavers best.", "q": ["T|Mateo goes to the library on Saturday.", "F|Mateo walks to the library.", "T|Mateo loves books about animals.", "F|Mateo found a book about bears.", "T|Beavers build dams with sticks and mud.", "F|A beaver’s teeth stop growing.", "T|Ms. Chen is the librarian.", "F|Mateo took one book home.", "C|Who goes with Mateo?|his dad|his mom*|his friend", "C|How do they get there?|by car|by bike|by bus*", "C|What city is the library in?|Ottawa*|Regina|Victoria", "C|What kind of books does Mateo love?|animal books*|joke books|car books", "C|What do beavers build?|nests|dams*|caves", "C|What never stops growing?|a beaver’s tail|a beaver’s teeth*|a beaver’s fur", "C|Ms. Chen showed him a book about …|owls*|fish|trains", "C|Who is Luz?|his cousin|his sister*|his friend", "C|When did Mateo read to Luz?|that night*|that morning|at school", "C|What did Luz like best?|the baby beavers*|the owls|the dam", "B|Mateo loves books about ____.|animals", "B|Beavers build dams with sticks and ____.|mud", "B|The ____ showed him a book about owls.|librarian", "B|Mateo took both ____ home.|books", "B|He read the beaver book to his little ____.|sister", "B|Find a word in the story that rhymes with “hat”: ____|that", "B|She liked the ____ of the baby beavers best.|picture"]},
{"title": "The Class Pumpkin", "text": "In October, Ms. Okafor’s class in Moncton grew a pumpkin on the windowsill. First, they planted a seed in a pot of soil. Each day, Hana checked if it needed water. After two weeks, a green vine curled out of the pot. Soon a little yellow flower opened. The flower turned into a tiny green pumpkin. The class measured it every Friday. By the end of the month, the pumpkin was orange and as big as a baseball. The class named it Pip.", "q": ["T|The class grew a pumpkin.", "F|The pumpkin grew outside.", "T|They planted a seed in soil.", "F|Leo checked the water each day.", "T|A green vine curled out of the pot.", "F|The flower was red.", "T|They measured it every Friday.", "F|The pumpkin got as big as a car.", "C|When did the class grow the pumpkin?|in October*|in June|in March", "C|Whose class is it?|Ms. Okafor’s*|Mr. Lee’s|Ms. Roy’s", "C|Where did the pumpkin grow?|on the windowsill*|in the gym|in a field", "C|Who checked the water?|Hana*|Ms. Okafor|Pip", "C|What came out after two weeks?|a vine*|a bug|a leaf", "C|What colour was the flower?|white|pink|yellow*", "C|What did the flower turn into?|a seed|a tiny pumpkin*|an apple", "C|How often did they measure it?|every Friday*|every hour|once", "C|How big did it get?|like a baseball*|like a house|like a bean", "C|What did they name the pumpkin?|Pip*|Pat|Pom", "B|They planted a seed in a pot of ____.|soil", "B|Each day, Hana checked if it needed ____.|water", "B|A green ____ curled out of the pot.|vine", "B|Soon a little yellow ____ opened.|flower", "B|By the end of the month, the pumpkin was ____.|orange", "B|Find a word in the story that rhymes with “say”: ____|day", "B|The class ____ it Pip.|named"]}
],
"hard": [
{"title": "The Canoe Trip", "text": "Last summer, Amara and her uncle Dev paddled a red canoe across a quiet lake in Algonquin Park. They left early, when mist still floated over the water. Amara sat in the front and Uncle Dev steered from the back. Halfway across, Uncle Dev whispered, “Look to your left.” A moose was standing in the shallow water, eating plants. Its long legs dripped as it lifted its huge head. Amara held her breath so she would not scare it. After a while, the moose waded into the forest. When they reached the campsite, they set up a green tent and cooked noodles on a small stove. That night, Amara heard loons calling across the lake. She wrote in her journal, “Best day ever. I saw a moose!”", "q": ["T|Amara and Uncle Dev paddled a canoe.", "F|The canoe was blue.", "T|Mist floated over the water.", "F|Amara steered from the back.", "T|The moose was eating plants.", "F|Amara shouted at the moose.", "T|They cooked noodles.", "F|Amara heard wolves at night.", "C|Where were they?|Algonquin Park*|Banff|Stanley Park", "C|When did they leave?|early*|at noon|at night", "C|Who steered the canoe?|Amara|Uncle Dev*|a guide", "C|What animal did they see?|a bear|a beaver|a moose*", "C|Where was the moose standing?|in shallow water*|on a rock|on the road", "C|Why did Amara hold her breath?|to swim|to not scare it*|she was cold", "C|Where did the moose go?|into the lake|into the forest*|to the camp", "C|What colour was the tent?|green*|orange|red", "C|What did they cook on?|a fire|a small stove*|a grill", "C|What did Amara write in?|a letter|a book|her journal*", "B|They paddled across a quiet ____.|lake", "B|Amara sat in the ____ of the canoe.|front", "B|The moose had long ____.|legs", "B|They set up a green ____.|tent", "B|That night, Amara heard ____ calling.|loons", "B|Find a word in the story that rhymes with “goose”: ____|moose", "B|She wrote, “Best day ____.”|ever"]},
{"title": "The Backyard Rink", "text": "Every winter in Saskatoon, Jamal’s dad floods the backyard to make an ice rink. On Saturday, the neighbours came over for a big hockey game. Jamal played on a team with his cousin Noor and two friends from school. The other team had Jamal’s older brother, Idris, who was a very fast skater. Snow started to fall during the second period, so everyone had to stop and shovel the ice. By the third period, the score was tied three to three. Then Noor passed the puck to Jamal. He shot it low, and it slid between the goalie’s boots. The kids cheered so loudly that the dog started barking. Afterward, Jamal’s mom brought out hot apple cider and a plate of warm cookies for both teams.", "q": ["T|Jamal’s dad makes a rink in the backyard.", "F|The game was on Sunday.", "T|Noor was on Jamal’s team.", "F|Idris was a slow skater.", "T|Snow fell during the game.", "F|The score was tied two to two.", "T|The dog started barking.", "F|Mom brought out hot chocolate.", "C|Where does Jamal live?|Saskatoon*|Halifax|Kelowna", "C|Who floods the backyard?|Jamal’s mom|Jamal’s dad*|Idris", "C|Who is Noor?|Jamal’s cousin*|Jamal’s sister|a goalie", "C|Who is Idris?|a neighbour|Jamal’s older brother*|the coach", "C|Why did they stop the game?|to eat|to shovel the ice*|it got dark", "C|When was the score tied?|in the first period|by the third period*|at the start", "C|Who passed the puck to Jamal?|Idris|Noor*|the goalie", "C|Where did the puck go?|over the net|between the goalie’s boots*|into the snow", "C|What did the kids do after the goal?|They cried.|They cheered.*|They left.", "C|Who got cookies?|only Jamal|both teams*|the dog", "B|On Saturday, the ____ came over for a game.|neighbours", "B|Idris was a very fast ____.|skater", "B|Everyone had to stop and ____ the ice.|shovel", "B|Noor passed the ____ to Jamal.|puck", "B|The kids cheered so ____ that the dog barked.|loudly", "B|Find a word in the story that rhymes with “bake”: ____|make", "B|Mom brought out hot apple ____.|cider"]},
{"title": "The Lighthouse Visit", "text": "During the summer, Élodie visited her grandpa in Nova Scotia. One windy afternoon, they drove to Peggy’s Cove to see the famous lighthouse. The lighthouse was white with a red top, and it stood on huge grey rocks beside the ocean. Grandpa told Élodie to stay far away from the dark, wet rocks because big waves can splash up without warning. They watched the waves crash and mailed a postcard to her mom from a little post office. Grandpa explained that long ago, the light helped fishing boats find their way home in the fog. On the drive back, they stopped at a small shop and shared a bowl of fish chowder. Élodie decided that someday she wanted to sail a boat of her own.", "q": ["T|Élodie visited her grandpa in Nova Scotia.", "F|It was a calm, still day.", "T|The lighthouse had a red top.", "F|The rocks beside the ocean were small.", "T|Big waves can splash up without warning.", "F|They sent a postcard to her dad.", "T|The light helped boats find their way home.", "F|They shared a plate of pancakes.", "C|When did Élodie visit?|in the winter|in the summer*|in the spring", "C|What did they go to see?|a lighthouse*|a castle|a farm", "C|What colour was the lighthouse?|white with a red top*|all blue|yellow", "C|What did the lighthouse stand on?|sand|grass|huge grey rocks*", "C|Why stay away from the wet rocks?|they are hot|waves can splash*|birds nest there", "C|Where did they mail a postcard?|a post office*|a bank|a school", "C|What did the light help long ago?|cars|planes|fishing boats*", "C|When was it hard for boats to see?|in the fog*|at lunch|in the sun", "C|What did they eat?|fish chowder*|pizza|tacos", "C|What does Élodie want to do someday?|fly a plane|sail a boat*|drive a bus", "B|They drove to Peggy’s ____ to see the lighthouse.|Cove", "B|The lighthouse stood beside the ____.|ocean", "B|They watched the waves ____.|crash", "B|Long ago, the light helped fishing ____ find their way.|boats", "B|They stopped at a small ____ on the drive back.|shop", "B|Find a word in the story that rhymes with “frog”: ____|fog", "B|Élodie wanted to ____ a boat of her own.|sail"]},
{"title": "The Science Fair", "text": "Arjun’s school in Calgary had a science fair in March. Arjun wanted to find out which paper towel was the strongest. He tested three brands. For each one, he wet a sheet, held it over a bowl, and added pennies one at a time until it tore. He wrote every number in a chart. The blue brand held forty-two pennies, the white brand held thirty, and the brand with flowers held only nineteen. Arjun made a poster with a bar graph so people could see the results quickly. At the fair, a judge asked him why he used the same amount of water each time. Arjun explained that it made the test fair. He did not win first place, but he got a ribbon for the best graph.", "q": ["T|The science fair was in March.", "F|Arjun tested five brands.", "T|He added pennies one at a time.", "F|The white brand was the strongest.", "T|Arjun made a bar graph.", "F|A teacher asked him about the water.", "T|He used the same amount of water each time.", "F|Arjun won first place.", "C|Where is Arjun’s school?|Calgary*|Montreal|Iqaluit", "C|What did Arjun test?|paper towels*|paper plates|tissues", "C|What did he hold the towel over?|a sink|a bowl*|a cup", "C|What did he add to the towel?|rocks|marbles|pennies*", "C|Where did he write the numbers?|in a chart*|on his hand|on the board", "C|How many pennies did the blue one hold?|thirty|forty-two*|nineteen", "C|Which brand held only nineteen?|the blue one|the white one|the one with flowers*", "C|What was on his poster?|a bar graph*|a map|a photo", "C|Why did he use the same water?|to be fair*|to save water|to be fast", "C|What did Arjun get?|a trophy|a ribbon*|a medal", "B|Arjun wanted to find the ____ paper towel.|strongest", "B|He added pennies until the towel ____.|tore", "B|He made a ____ with a bar graph.|poster", "B|A ____ asked him a question at the fair.|judge", "B|Using the same water made the test ____.|fair", "B|Find a word in the story that rhymes with “goal”: ____|bowl", "B|He got a ribbon for the best ____.|graph"]},
{"title": "Baking Bannock with Kokum", "text": "Every fall, Kai helps his kokum make bannock at her house near Thunder Bay. Kokum is the Cree word for grandmother. First, they wash their hands. Then Kai measures the flour, baking powder, and a pinch of salt into a big bowl. Kokum adds water and lets Kai mix the dough with a wooden spoon until it is soft. They pat the dough into a round shape and bake it in the oven until the top is golden brown. While they wait, Kokum tells stories about picking blueberries when she was a girl. When the bannock is ready, they break it into warm pieces. Kai spreads blueberry jam on his piece. He says it tastes even better because they made it together.", "q": ["T|Kai makes bannock with his kokum.", "F|Kokum lives near Vancouver.", "T|They wash their hands first.", "F|Kai mixes the dough with a fork.", "T|They bake it in the oven.", "F|Kokum tells stories about picking apples.", "T|Kai spreads jam on his bannock.", "F|Kai says it tastes worse.", "C|What does kokum mean?|grandmother*|aunt|teacher", "C|Where does Kokum live?|near Thunder Bay*|in Halifax|in Yukon", "C|When does Kai help make bannock?|every fall*|every spring|every night", "C|What does Kai measure?|the flour*|the jam|the oven", "C|What do they mix with?|a wooden spoon*|a whisk|their hands", "C|How should the dough feel?|hard|soft*|wet", "C|What shape is the bannock?|square|round*|long", "C|What colour is the top when done?|black|white|golden brown*", "C|What jam does Kai use?|strawberry|blueberry*|grape", "C|Why does it taste even better?|they made it together*|it is hot|it is big", "B|Kai measures the flour into a big ____.|bowl", "B|Kokum adds ____ to the bowl.|water", "B|They pat the dough into a ____ shape.|round", "B|They bake it until the top is golden ____.|brown", "B|Kokum tells ____ while they wait.|stories", "B|Find a word in the story that rhymes with “cake”: ____|bake", "B|They break it into warm ____.|pieces"]},
{"title": "Hiro Learns to Ride", "text": "Hiro was seven when he finally learned to ride a two-wheel bike. His older sister, Yumi, took him to the flat path beside the river in Fredericton. She held the back of his seat while he pedalled. “Look ahead, not down,” Yumi reminded him. Hiro wobbled and fell twice, but his helmet and knee pads kept him safe. Each time, he got up, brushed off the dirt, and tried again. On the third try, Yumi let go without telling him. Hiro rode all the way to the big maple tree by himself! When he turned around and saw Yumi far behind him, he was so surprised that he laughed out loud. That evening, they rode together to the ice cream stand, and Hiro chose maple walnut.", "q": ["T|Hiro learned to ride a two-wheel bike.", "F|Yumi is Hiro’s younger sister.", "T|The path was beside a river.", "F|Hiro fell four times.", "T|Hiro wore a helmet.", "F|Yumi told Hiro when she let go.", "T|Hiro laughed out loud.", "F|Hiro chose chocolate ice cream.", "C|How old was Hiro?|six|seven*|eight", "C|Who took Hiro to the path?|his dad|his sister*|his friend", "C|What city were they in?|Fredericton*|Kingston|Regina", "C|What did Yumi hold?|his hand|the back of his seat*|the handlebars", "C|What did Yumi tell him?|Look down|Look ahead*|Go fast", "C|What kept Hiro safe?|his helmet and knee pads*|his boots|his coat", "C|When did Yumi let go?|on the first try|on the third try*|never", "C|Where did Hiro ride by himself?|to the big maple tree*|to the store|to school", "C|Where did they ride that evening?|to the park|to the ice cream stand*|to the pool", "C|Which flavour did Hiro choose?|vanilla|maple walnut*|mint", "B|The path was flat and beside the ____.|river", "B|Yumi held his seat while he ____.|pedalled", "B|Hiro ____ and fell twice.|wobbled", "B|He brushed off the ____ and tried again.|dirt", "B|Hiro rode to the big ____ tree.|maple", "B|Find a word in the story that rhymes with “bride”: ____|ride", "B|Hiro was so ____ that he laughed.|surprised"]},
{"title": "The Food Drive", "text": "In November, Grace’s class in Hamilton held a food drive for the local food bank. Their teacher, Mr. Singh, put a big cardboard box by the classroom door. Each morning, students brought cans of soup, boxes of pasta, and jars of peanut butter. Grace made a chart on the wall to count everything. By Friday, the class had collected eighty-seven items, which was more than any other class! Mr. Singh explained that the food would help families who did not have enough to eat. On the last day, a volunteer named Ruth came with a van to pick up the box. She thanked the students and showed them a photo of the shelves at the food bank. Grace felt proud that her class had helped so many people.", "q": ["T|The food drive was in November.", "F|The box was by the gym door.", "T|Students brought jars of peanut butter.", "F|Mr. Singh made the chart.", "T|The class collected eighty-seven items.", "F|Another class collected more food.", "T|Ruth came with a van.", "F|Grace felt sad at the end.", "C|Where is Grace’s school?|Hamilton*|Moncton|Nanaimo", "C|Who is Mr. Singh?|the principal|the teacher*|a volunteer", "C|What was the box made of?|wood|cardboard*|plastic", "C|When did students bring food?|each morning*|each night|at lunch", "C|What did Grace make?|a poster|a chart*|a card", "C|When did they count the total?|by Friday*|by Monday|in June", "C|Who was the food for?|the teachers|families in need*|the class", "C|Who picked up the box?|a volunteer*|a bus driver|Grace’s mom", "C|What did Ruth show the class?|a map|a photo*|a video", "C|How did Grace feel?|proud*|bored|tired", "B|The class held a food ____.|drive", "B|Students brought cans of ____.|soup", "B|Grace made a ____ on the wall.|chart", "B|The food would help ____.|families", "B|A ____ named Ruth came with a van.|volunteer", "B|Find a word in the story that rhymes with “tan”: ____|van", "B|Ruth ____ the students.|thanked"]},
{"title": "The Northern Lights", "text": "Nia lives in Yellowknife, where winter nights are long and very cold. One evening in January, her mom woke her up and said, “Put on your parka, quick!” They stepped outside onto the crunchy snow. Above them, wavy ribbons of green light were dancing across the sky. Some edges looked pink and purple. Nia’s mom explained that the northern lights happen when tiny bits from the sun hit the air high above the Earth. Nia thought the lights looked like a giant curtain blowing in the wind. They stood still and watched for twenty minutes until Nia’s toes felt frozen. Back inside, they drank warm milk with honey. Nia drew the lights in her sketchbook with green and purple pencil crayons before she fell asleep.", "q": ["T|Nia lives in Yellowknife.", "F|The story happens in July.", "T|Nia put on her parka.", "F|The snow was soft and quiet.", "T|The lights were green.", "F|Nia’s dad explained the northern lights.", "T|They watched for twenty minutes.", "F|They drank hot apple juice.", "C|What are winters like there?|short and warm|long and very cold*|rainy", "C|Who woke Nia up?|her mom*|her dad|her dog", "C|What did the lights look like?|ribbons*|stars|clouds", "C|What colours were the edges?|blue and gold|pink and purple*|red and white", "C|What makes the lights?|rain|bits from the sun*|snowflakes", "C|What did the lights look like to Nia?|a curtain*|a river|a rainbow", "C|Why did they go back in?|it rained|her toes felt frozen*|she was hungry", "C|What was in the warm milk?|honey*|sugar|cocoa", "C|Where did Nia draw the lights?|on the wall|in her sketchbook*|on a napkin", "C|What did Nia draw with?|markers|paint|pencil crayons*", "B|They stepped outside onto the crunchy ____.|snow", "B|Ribbons of green light were ____ across the sky.|dancing", "B|The lights happen when bits from the ____ hit the air.|sun", "B|Nia thought the lights looked like a giant ____.|curtain", "B|They stood ____ and watched.|still", "B|Find a word in the story that rhymes with “bite”: ____|light", "B|Nia drew the lights before she fell ____.|asleep"]},
{"title": "Biscuit Finds Home", "text": "One rainy morning in Victoria, Diego found a small brown puppy shivering under the bus shelter near his home. The puppy had a blue collar but no tag. Diego wrapped it in his jacket and carried it home. His dad helped him dry the puppy with a towel and gave it a little water. Then they took it to the animal clinic down the street. The vet used a special scanner to read a tiny chip under the puppy’s skin. The chip showed the owner’s phone number! An hour later, a girl named Lucy rushed in. “Biscuit!” she cried, and the puppy wagged its tail wildly. Lucy thanked Diego again and again. The next week, she brought him a card with a drawing of Biscuit on the front.", "q": ["T|It was a rainy morning.", "F|The puppy was black and white.", "T|The collar was blue.", "F|The puppy had a name tag.", "T|Diego’s dad helped dry the puppy.", "F|They took the puppy to a school.", "T|The puppy had a chip under its skin.", "F|Lucy came the next day.", "C|Where does Diego live?|Victoria*|Sudbury|Charlottetown", "C|Where was the puppy?|under a bus shelter*|in a tree|in a box", "C|How did Diego carry it home?|in a bag|in his jacket*|on a leash", "C|What did they dry the puppy with?|a towel*|a blanket|a hair dryer", "C|Where did they take the puppy?|a pet store|an animal clinic*|the police", "C|What did the vet use?|a scanner*|a camera|a ruler", "C|What did the chip show?|a phone number*|an address|a name", "C|What is the puppy’s name?|Buddy|Biscuit*|Bean", "C|What did the puppy do when Lucy came?|barked|slept|wagged its tail*", "C|What did Lucy bring Diego?|a toy|a card*|a cake", "B|The puppy was ____ under the bus shelter.|shivering", "B|Diego wrapped it in his ____.|jacket", "B|They gave the puppy a little ____.|water", "B|The chip was under the puppy’s ____.|skin", "B|An hour later, a girl named ____ rushed in.|Lucy", "B|Find a word in the story that rhymes with “sweet”: ____|street", "B|The card had a ____ of Biscuit on it.|drawing"]},
{"title": "Maple Syrup Time", "text": "In early spring, Lucas and his family visited a sugar shack near Quebec City. The farmer, Madame Roy, showed them how sap drips from maple trees into metal buckets when the days are warm and the nights are still cold. She explained that it takes about forty buckets of sap to make one bucket of syrup! Inside the shack, a big pan of sap was boiling, and steam filled the room with a sweet smell. Outside, Madame Roy poured hot syrup onto clean snow. Lucas waited a moment, then rolled the soft taffy onto a wooden stick. It was sticky and delicious. Before they left, the family ate pancakes, beans, and ham, all with plenty of syrup. Lucas’s little brother fell asleep on the drive home.", "q": ["T|They visited a sugar shack.", "F|They went in the fall.", "T|Sap drips into metal buckets.", "F|The nights must be warm.", "T|Steam filled the room.", "F|Madame Roy poured syrup onto grass.", "T|Lucas rolled taffy onto a stick.", "F|Lucas fell asleep on the drive home.", "C|Where was the sugar shack?|near Quebec City*|near Toronto|near Whitehorse", "C|Who is Madame Roy?|a teacher|the farmer*|Lucas’s aunt", "C|What trees give the sap?|pine trees|maple trees*|birch trees", "C|How much sap makes a bucket of syrup?|two buckets|about forty buckets*|one bucket", "C|What was boiling?|a pan of sap*|a pot of soup|the kettle", "C|What did the room smell like?|sweet*|smoky|sour", "C|What was the syrup poured onto?|ice|bread|clean snow*", "C|What was the taffy like?|sticky*|crunchy|salty", "C|What did they eat before leaving?|pizza|pancakes*|soup", "C|Who fell asleep?|Lucas|his little brother*|Madame Roy", "B|They visited a sugar ____.|shack", "B|Sap drips when the days are ____.|warm", "B|Steam filled the room with a sweet ____.|smell", "B|Madame Roy poured hot ____ onto snow.|syrup", "B|Lucas rolled the soft ____ onto a stick.|taffy", "B|Find a word in the story that rhymes with “brick”: ____|stick", "B|The family ate pancakes, beans, and ____.|ham"]},
{"title": "The New Student", "text": "On the first day of October, a new student named Ayesha joined Room 12 at Parkview School in Edmonton. Her family had just moved from Pakistan, and she was still learning English. At first, Ayesha was very quiet and sat alone at lunch. Ravi remembered how nervous he felt when he moved from Toronto last year, so he asked her to play tag at recess. Ayesha did not know all the rules, but she was a super-fast runner. Soon, everyone wanted her on their team. The next week, Ayesha taught the class how to say hello in Urdu. She also brought a picture of the mountains near her old home. By the end of the month, Ayesha and Ravi were good friends, and she was not quiet anymore.", "q": ["T|Ayesha joined Room 12.", "F|Ayesha’s family moved from Japan.", "T|Ayesha sat alone at lunch at first.", "F|Ravi moved from Halifax.", "T|Ravi asked her to play tag.", "F|Ayesha was a slow runner.", "T|Ayesha taught the class a word in Urdu.", "F|Ayesha and Ravi never became friends.", "C|What is the school’s name?|Parkview*|Hillside|Lakeview", "C|What city is the school in?|Edmonton*|Toronto|Victoria", "C|When did Ayesha join the class?|in October*|in June|in January", "C|What was Ayesha still learning?|French|English*|math", "C|How did Ayesha act at first?|loud|quiet*|silly", "C|Why did Ravi ask her to play?|he was bored|he remembered being new*|the teacher told him", "C|What game did they play?|tag*|soccer|hopscotch", "C|What was Ayesha great at?|singing|running*|drawing", "C|What did Ayesha bring to class?|a picture*|a toy|a snack", "C|What was in the picture?|a beach|mountains*|a city", "B|At first, Ayesha was very ____.|quiet", "B|Ravi felt ____ when he moved last year.|nervous", "B|Ayesha did not know all the ____.|rules", "B|Soon, everyone wanted her on their ____.|team", "B|Ayesha taught the class how to say ____ in Urdu.|hello", "B|Find a word in the story that rhymes with “bag”: ____|tag", "B|By the end of the ____, they were good friends.|month"]},
{"title": "The Fall Fair", "text": "Every September, Sipho and his grandpa go to the fall fair in Charlottetown. This year, Sipho entered the biggest potato he had grown in their backyard. It was lumpy and weighed almost as much as a bag of flour! Before the judging, they walked through the barn to see the animals. Sipho patted a soft sheep and watched a baby goat jump onto a bale of hay. Next, they rode the Ferris wheel and could see the whole town and the red fields beyond it. At three o’clock, they rushed back to the vegetable tent. A blue ribbon was hanging on Sipho’s potato! The judge said it was the heaviest potato at the fair. Grandpa took a photo, and they celebrated with fresh lemonade.", "q": ["T|The fair is in September.", "F|Sipho went with his aunt.", "T|The potato was lumpy.", "F|Sipho patted a horse.", "T|A baby goat jumped onto hay.", "F|The fields were green.", "T|Sipho’s potato won a blue ribbon.", "F|They celebrated with ice cream.", "C|Where is the fair?|Charlottetown*|Calgary|Guelph", "C|What did Sipho enter?|a pumpkin|a potato*|a carrot", "C|Where did he grow it?|at school|in the backyard*|on a farm", "C|How heavy was it?|like a bag of flour*|like a pencil|like a car", "C|What did they see in the barn?|cars|animals*|paintings", "C|What did they ride?|a roller coaster|the Ferris wheel*|a pony", "C|What colour were the fields?|red*|blue|yellow", "C|When did they go back to the tent?|at noon|at three o’clock*|at night", "C|Why did the potato win?|it was the heaviest*|it was the cleanest|it was purple", "C|Who took a photo?|Sipho|the judge|Grandpa*", "B|Sipho patted a soft ____.|sheep", "B|A baby goat jumped onto a bale of ____.|hay", "B|They rode the Ferris ____.|wheel", "B|They rushed back to the vegetable ____.|tent", "B|A blue ____ was hanging on the potato.|ribbon", "B|Find a word in the story that rhymes with “clown”: ____|town", "B|They celebrated with fresh ____.|lemonade"]},
{"title": "The Robot Club", "text": "After school on Tuesdays, Sofia goes to the robot club at the library in Waterloo. Her team built a small robot from a kit with wheels, a motor, and a sensor that can see light. Their goal was to make the robot follow a black line on the floor. At first, the robot kept rolling off the line and bumping into chairs. Sofia and her teammates, Ben and Mei, changed the code many times. They tested it, found the mistake, and tried again. Finally, Mei noticed that one number in the code was too big, so the robot turned too sharply. After they fixed it, the robot followed the whole line without stopping. The club leader clapped and gave each of them a sticker shaped like a gear.", "q": ["T|The robot club meets on Tuesdays.", "F|The club meets at a museum.", "T|The robot had a light sensor.", "F|The robot followed a red line.", "T|The robot bumped into chairs at first.", "F|Ben found the mistake.", "T|They changed the code many times.", "F|The leader gave them medals.", "C|Where does Sofia’s club meet?|the library*|the gym|a park", "C|What city is it in?|Waterloo*|Saint John|Red Deer", "C|What did the robot come from?|a kit*|a store|a box of toys", "C|What can the sensor see?|light*|sound|heat", "C|What was the goal?|follow a line*|climb stairs|pick up toys", "C|Who are Sofia’s teammates?|Ben and Mei*|Ana and Kai|Leo and Nia", "C|What was wrong with the code?|a number was too big*|it was too short|it was missing", "C|How did the robot turn?|too slowly|too sharply*|not at all", "C|What did the leader do?|laughed|clapped*|left", "C|What shape was the sticker?|a star|a gear*|a heart", "B|The robot had wheels and a ____.|motor", "B|The robot kept rolling off the ____.|line", "B|They tested it, found the ____, and tried again.|mistake", "B|Mei noticed that one ____ was too big.|number", "B|After they ____ it, the robot followed the line.|fixed", "B|Find a word in the story that rhymes with “stairs”: ____|chairs", "B|Each of them got a ____ shaped like a gear.|sticker"]},
{"title": "Whale Watching", "text": "In July, Leila and her mom took a boat tour from Witless Bay in Newfoundland. The captain told everyone to watch the water for spouts, which are puffs of mist that whales blow when they breathe. Soon someone shouted, “Over there!” A humpback whale rose out of the sea and slapped its giant tail on the waves. The splash was so big that some drops landed on Leila’s jacket. The captain explained that humpbacks come here in summer to eat tiny fish called capelin. Next, the boat passed an island covered with puffins. The little birds had bright orange beaks and flapped their wings very fast. Leila took twelve pictures, but she said the best moment was the one she saw with her own eyes.", "q": ["T|They took a boat tour in July.", "F|Leila went with her dad.", "T|A spout is a puff of mist.", "F|The whale slapped its fin on a rock.", "T|Drops landed on Leila’s jacket.", "F|Humpbacks come there in winter.", "T|The island was covered with puffins.", "F|Leila took two pictures.", "C|Where did the tour start?|Witless Bay*|Halifax|Tofino", "C|Who said to watch for spouts?|the captain*|a kid|Leila’s mom", "C|What kind of whale did they see?|a blue whale|a humpback*|an orca", "C|What did the whale slap?|its tail*|its head|the boat", "C|What do humpbacks eat there?|seaweed|capelin*|crabs", "C|What did the boat pass next?|a lighthouse|an island*|a ship", "C|What birds were on the island?|puffins*|gulls|ducks", "C|What colour were the beaks?|black|bright orange*|green", "C|How many pictures did Leila take?|five|twelve*|twenty", "C|What was the best moment?|lunch|seeing it with her eyes*|the ride home", "B|Whales blow spouts when they ____.|breathe", "B|A humpback whale rose out of the ____.|sea", "B|The ____ was so big that drops landed on her.|splash", "B|Humpbacks eat tiny ____ called capelin.|fish", "B|The puffins flapped their ____ very fast.|wings", "B|Find a word in the story that rhymes with “sail”: ____|tail", "B|The whale slapped its giant tail on the ____.|waves"]},
{"title": "Moving Day", "text": "Mei’s family moved from a busy apartment in Vancouver to a small house in Kingston. On moving day, the truck was so full that the couch barely fit through the door. Mei had packed her own box with her books, her stuffed panda, and a jar of shells from the beach. She wrote “MEI’S ROOM” on the box in big letters so nobody would lose it. When they arrived, the house felt empty and echoey. Mei missed her old friends already. Then a boy from next door, Owen, knocked with a plate of muffins from his dad. He showed Mei the creek behind the houses, where frogs were croaking. That night, Mei unpacked her panda first and put the jar of shells on her new windowsill.", "q": ["T|Mei’s family moved to Kingston.", "F|They used to live in a house.", "T|The couch barely fit through the door.", "F|Mei packed a stuffed bear.", "T|Mei wrote on her box in big letters.", "F|Owen brought cookies.", "T|Frogs were croaking by the creek.", "F|Mei unpacked her books first.", "C|Where did Mei live before?|Vancouver*|Ottawa|Regina", "C|What did they live in before?|a farm|an apartment*|a boat", "C|What barely fit through the door?|the bed|the couch*|the fridge", "C|What was in the jar?|marbles|shells*|buttons", "C|Why did Mei label her box?|so it would not get lost*|for fun|to sell it", "C|How did the new house feel?|crowded|empty*|hot", "C|Who is Owen?|her cousin|a boy next door*|the driver", "C|Who made the muffins?|Owen’s dad*|Owen’s mom|Mei", "C|What was behind the houses?|a creek*|a mall|a farm", "C|Where did Mei put the shells?|in a drawer|on the windowsill*|under the bed", "B|The moving ____ was very full.|truck", "B|Mei packed her books and her stuffed ____.|panda", "B|Mei missed her old ____ already.|friends", "B|Owen ____ on the door with muffins.|knocked", "B|Frogs were ____ by the creek.|croaking", "B|Find a word in the story that rhymes with “seek”: ____|creek", "B|Mei put the jar on her new ____.|windowsill"]},
{"title": "Snowshoe Adventure", "text": "On a bright Saturday in February, Aaliyah went snowshoeing with her Girl Guide group near Prince George. The snowshoes looked like big tennis rackets strapped to her boots. Walking in them felt strange at first, so she lifted her feet high like a duck. Their leader, Ms. Grant, taught them to look for animal tracks. Aaliyah spotted tiny prints with long back feet. “Those belong to a snowshoe hare,” said Ms. Grant. Later, the group found holes in a tree where a woodpecker had been pecking. At the top of a hill, they stopped for a snack of trail mix and warm tea from a thermos. Going down was the best part, because Aaliyah slid most of the way on her bottom!", "q": ["T|They went snowshoeing in February.", "F|Aaliyah went with her family.", "T|The snowshoes looked like tennis rackets.", "F|Aaliyah lifted her feet like a horse.", "T|Ms. Grant taught them to look for tracks.", "F|The tiny prints belonged to a fox.", "T|A woodpecker made holes in a tree.", "F|Aaliyah walked carefully all the way down.", "C|What group did Aaliyah go with?|her hockey team|her Girl Guide group*|her class", "C|Where did they go?|near Prince George*|near Moncton|near London", "C|What day was it?|Saturday*|Monday|Friday", "C|How did walking feel at first?|easy|strange*|warm", "C|Who is Ms. Grant?|the leader*|a farmer|a ranger", "C|What animal made the tiny prints?|a mouse|a snowshoe hare*|a deer", "C|What had a woodpecker done?|built a nest|pecked holes*|eaten seeds", "C|What did they eat on the hill?|trail mix*|apples|sandwiches", "C|What did they drink?|juice|warm tea*|water", "C|What was the best part?|the snack|going down*|the tracks", "B|The snowshoes were strapped to her ____.|boots", "B|The snowshoes looked like big tennis ____.|rackets", "B|The prints had long back ____.|feet", "B|At the top of a ____, they had a snack.|hill", "B|The tea was in a ____.|thermos", "B|Find a word in the story that rhymes with “truck”: ____|duck", "B|Aaliyah ____ most of the way down.|slid"]},
{"title": "The Power Outage", "text": "During a big thunderstorm in London, Ontario, the lights in Ethan’s house suddenly went out. The fridge stopped humming and the whole house went quiet. Ethan’s little sister, Zoe, was scared of the dark, so Ethan found two flashlights in the kitchen drawer. Their mom lit a candle on the table, far away from anything that could burn. With no TV or tablets, the family played card games and told jokes. Dad made shadow puppets on the wall with his hands, and Zoe giggled at the rabbit. They counted the seconds between each flash of lightning and boom of thunder to see if the storm was moving away. After two hours, the power came back on with a click. Zoe said, “Can we turn it off again tomorrow?”", "q": ["T|There was a thunderstorm.", "F|The lights went out at Ethan’s school.", "T|Zoe was scared of the dark.", "F|Ethan found the flashlights in the garage.", "T|Mom lit a candle.", "F|The family watched TV.", "T|Dad made shadow puppets.", "F|The power came back after five hours.", "C|What city is Ethan in?|London, Ontario*|Kamloops|Brandon", "C|What stopped humming?|the fridge*|the fan|the dog", "C|Who is Zoe?|Ethan’s friend|Ethan’s little sister*|Ethan’s cousin", "C|How many flashlights did Ethan find?|one|two*|four", "C|Where did Mom put the candle?|on the floor|on the table*|by the curtains", "C|What games did they play?|card games*|video games|tag", "C|What shadow made Zoe giggle?|a dog|a bird|a rabbit*", "C|Why did they count the seconds?|to see if the storm moved*|to learn math|to fall asleep", "C|How long was the power out?|two hours*|ten minutes|all night", "C|What did Zoe want to do again?|turn the power off*|go to bed|eat cake", "B|The whole house went ____.|quiet", "B|Ethan found two ____ in the kitchen drawer.|flashlights", "B|The family played cards and told ____.|jokes", "B|Dad made shadow ____ on the wall.|puppets", "B|They counted the seconds after each ____ of lightning.|flash", "B|Find a word in the story that rhymes with “room”: ____|boom", "B|The power came back on with a ____.|click"]},
{"title": "The Bake Sale", "text": "Fatima and her best friend Isla wanted to raise money for new books for their school library in Regina. They decided to hold a bake sale at lunch on Thursday. On Wednesday night, Fatima and her dad baked chocolate chip cookies, while Isla and her mom made lemon squares. They also made a sign with bright markers that said, “Every treat helps!” On the day of the sale, the line went all the way down the hall. Cookies cost fifty cents and lemon squares cost one dollar. Fatima kept the money in a metal box and counted the change carefully. By the end of lunch, every treat was gone. They raised sixty-four dollars, which was enough for eight new books about space.", "q": ["T|Fatima and Isla are best friends.", "F|The bake sale was on Friday.", "T|Fatima baked with her dad.", "F|Isla made banana bread.", "T|The line went down the hall.", "F|Cookies cost one dollar.", "T|Fatima counted the change carefully.", "F|Some treats were left at the end.", "C|What did they raise money for?|library books*|a field trip|a party", "C|What city is their school in?|Regina*|Halifax|Barrie", "C|When was the bake sale?|at lunch*|after school|at recess", "C|What did Isla and her mom make?|lemon squares*|muffins|pies", "C|What did the sign say?|Buy now|Every treat helps*|Yum", "C|What did they use to make the sign?|crayons|paint|bright markers*", "C|How much did a lemon square cost?|fifty cents|one dollar*|two dollars", "C|Where did Fatima keep the money?|a metal box*|her pocket|a jar", "C|How much money did they raise?|forty dollars|sixty-four dollars*|ten dollars", "C|What were the new books about?|space*|dinosaurs|sports", "B|They decided to hold a bake ____.|sale", "B|Fatima and her dad baked chocolate chip ____.|cookies", "B|They made a ____ with bright markers.|sign", "B|Cookies cost fifty ____.|cents", "B|By the end of lunch, every ____ was gone.|treat", "B|Find a word in the story that rhymes with “ball”: ____|hall", "B|The money bought eight new ____ about space.|books"]},
{"title": "Tide Pools in Tofino", "text": "Kenji and his grandmother, Obaachan, walked along the beach in Tofino when the tide was low. The water had pulled back, leaving rocky pools full of sea life. Kenji crouched down slowly so he would not scare anything. In one pool, he saw purple sea stars clinging to the rocks. In another, a tiny crab scuttled sideways under a strand of seaweed. Obaachan pointed to a green sea anemone and told Kenji not to poke it, because it uses sticky arms to catch food. They also found smooth, round stones and a broken shell shaped like a fan. Obaachan reminded him that the creatures need to stay in their homes, so Kenji only took pictures. When the tide started to come back in, they walked home for lunch.", "q": ["T|Kenji walked with his grandmother.", "F|The tide was high.", "T|The sea stars were purple.", "F|The crab walked forward.", "T|The sea anemone was green.", "F|Kenji poked the sea anemone.", "T|They found a shell shaped like a fan.", "F|Kenji took the crab home.", "C|Where was the beach?|Tofino*|Wasaga Beach|Peggy’s Cove", "C|What does Kenji call his grandma?|Nana|Obaachan*|Granny", "C|Why did Kenji crouch slowly?|to not scare anything*|he was tired|to find coins", "C|What were the sea stars doing?|swimming|clinging to rocks*|sleeping on sand", "C|Where did the crab hide?|under seaweed*|in a bucket|in a shell", "C|How does the anemone catch food?|with sticky arms*|with teeth|with a net", "C|What stones did they find?|sharp and black|smooth and round*|big and red", "C|Why did Kenji only take pictures?|creatures need their homes*|his bag was full|it was raining", "C|When did they go home?|when the tide came in*|at night|after dinner", "C|What did they go home for?|lunch*|a nap|a bath", "B|The water left rocky ____ full of sea life.|pools", "B|A tiny crab scuttled ____.|sideways", "B|The crab went under a strand of ____.|seaweed", "B|Obaachan told Kenji not to ____ the anemone.|poke", "B|They found a broken ____ shaped like a fan.|shell", "B|Find a word in the story that rhymes with “wide”: ____|tide", "B|Kenji only took ____.|pictures"]},
{"title": "The Spelling Bee", "text": "Malik had practised spelling words every night for three weeks for the school spelling bee in Brampton. His mom quizzed him at dinner, and his grandpa made flash cards with funny drawings. On the day of the bee, Malik stood on the stage in the gym with nine other students. His knees felt wobbly, but he took a deep breath like his teacher had shown him. He spelled “garden,” “thunder,” and “neighbour” correctly. Then he got the word “Wednesday.” Malik remembered his grandpa’s trick: say it as “Wed-nes-day” in your head. He spelled it slowly and carefully. In the last round, a girl named Hannah spelled “calendar” right, and Malik made one mistake. He came in second place and gave Hannah a high five.", "q": ["T|Malik practised every night.", "F|Malik practised for one week.", "T|Grandpa made flash cards.", "F|The bee was in the library.", "T|Malik took a deep breath.", "F|Malik spelled “thunder” wrong.", "T|Hannah spelled “calendar” right.", "F|Malik came in first place.", "C|Where is Malik’s school?|Brampton*|Yarmouth|Kelowna", "C|Who quizzed Malik at dinner?|his mom*|his sister|his coach", "C|What was on the flash cards?|stickers|funny drawings*|photos", "C|How many other kids were on stage?|five|nine*|twelve", "C|How did Malik’s knees feel?|wobbly*|strong|cold", "C|Who taught him the deep breath?|his teacher*|his grandpa|Hannah", "C|What hard word did Malik get?|Wednesday*|February|library", "C|What was Grandpa’s trick?|say it in parts*|write it down|sing it", "C|Who won the spelling bee?|Malik|Hannah*|a boy", "C|What did Malik give Hannah?|a hug|a high five*|a card", "B|Malik practised for the spelling ____.|bee", "B|His ____ quizzed him at dinner.|mom", "B|Malik stood on the ____ in the gym.|stage", "B|He spelled “neighbour” ____.|correctly", "B|He spelled “Wednesday” slowly and ____.|carefully", "B|Find a word in the story that rhymes with “stick”: ____|trick", "B|Malik made one ____ in the last round.|mistake"]},
{"title": "The Ferry Ride", "text": "Ana and her twin brother, Leo, rode the big ferry from Vancouver to Nanaimo to visit their aunt. Their car drove right into the bottom of the ship, and then the family climbed the stairs to the top deck. The wind blew Ana’s hair everywhere, so she tucked it under her hood. Leo used binoculars to look for seals and spotted three of them resting on a rock. A bald eagle flew in a slow circle above the water. Inside, they bought a bowl of clam chowder and shared it at a table by the window. The ride took about two hours. When the ferry blew its loud horn near the harbour, Leo covered his ears. Aunt Rosa was waiting at the dock with a sign that said “Welcome!”", "q": ["T|Ana and Leo are twins.", "F|They took a plane to Nanaimo.", "T|The car drove into the bottom of the ship.", "F|Ana took off her hood.", "T|Leo used binoculars.", "F|Leo spotted a whale.", "T|The ride took about two hours.", "F|Aunt Rosa waited at the airport.", "C|Where did the ferry go?|to Nanaimo*|to Halifax|to Toronto", "C|Why were they going?|to visit their aunt*|to go to school|to fish", "C|Where did the family go on the ship?|the top deck*|the engine room|the kitchen", "C|What did Ana do with her hair?|cut it|tucked it under her hood*|braided it", "C|How many seals did Leo see?|one|three*|six", "C|Where were the seals?|on a rock*|in a boat|on the beach", "C|What bird flew above?|a gull|a bald eagle*|a crow", "C|What did they eat?|clam chowder*|fish and chips|pizza", "C|Why did Leo cover his ears?|the horn was loud*|it was cold|Ana yelled", "C|What did Aunt Rosa’s sign say?|Hello|Welcome*|Hi Ana", "B|The family climbed the ____ to the top deck.|stairs", "B|The ____ blew Ana’s hair everywhere.|wind", "B|A bald eagle flew in a slow ____.|circle", "B|They shared it at a table by the ____.|window", "B|The ferry blew its loud ____.|horn", "B|Find a word in the story that rhymes with “meals”: ____|seals", "B|Aunt Rosa was waiting at the ____.|dock"]},
{"title": "The Community Mural", "text": "This spring, Zara’s neighbourhood in Scarborough painted a mural on the wall of the community centre. An artist named Mr. Okoye drew the outline, and families signed up to help fill in the colours. Zara and her mom painted a bright yellow sun, while her neighbour Mr. Tran painted a row of tall trees. The mural showed people from many countries holding hands around a giant maple leaf. Zara noticed that each person was wearing different clothes, just like the people on her street. It took four weekends to finish. On the last day, everyone wrote their names in tiny letters along the bottom edge. The city held a party with music, samosas, dumplings, and empanadas. Zara’s name is right beside the sun she painted.", "q": ["T|The mural was painted this spring.", "F|The mural was on a school.", "T|Mr. Okoye drew the outline.", "F|Zara painted a row of trees.", "T|The mural showed a giant maple leaf.", "F|It took one weekend to finish.", "T|Everyone wrote their names on it.", "F|Zara’s name is beside the trees.", "C|Where does Zara live?|Scarborough*|Lethbridge|Gander", "C|Who is Mr. Okoye?|a teacher|an artist*|a mayor", "C|Who painted with Zara?|her mom*|her brother|her coach", "C|What did Zara paint?|a moon|a yellow sun*|a dog", "C|Who is Mr. Tran?|her neighbour*|her uncle|a firefighter", "C|What were the people in the mural doing?|holding hands*|running|singing", "C|What was different about each person?|their clothes*|their size|their pets", "C|How long did it take?|one day|four weekends*|a year", "C|Where did people write their names?|along the bottom*|on the sun|on the door", "C|What was at the party?|music and food*|a parade|fireworks", "B|An artist drew the ____.|outline", "B|Families signed up to fill in the ____.|colours", "B|Mr. Tran painted a row of tall ____.|trees", "B|People held hands around a giant maple ____.|leaf", "B|Each person wore different ____.|clothes", "B|Find a word in the story that rhymes with “fun”: ____|sun", "B|The city held a ____ with music.|party"]},
{"title": "The Apple Orchard", "text": "On a cool morning in September, Noah’s class took a bus to an apple orchard near Kelowna. The farmer, Mrs. Patel, gave each student a paper bag and showed them how to twist an apple gently so the branch would not break. Noah climbed a short ladder to reach the shiny red apples near the top. His friend Amira found one with a worm hole and laughed. Next, Mrs. Patel took them to the barn, where a machine pressed apples into fresh juice. The juice was cold and tasted sweet and a little sour. Before leaving, they each chose a small pumpkin from the field. On the bus ride home, Noah counted his apples. He had eleven, enough to make a pie with his dad.", "q": ["T|The class went to an orchard.", "F|The trip was in June.", "T|Students got paper bags.", "F|Mrs. Patel told them to pull hard.", "T|Noah climbed a short ladder.", "F|Amira found a golden apple.", "T|A machine made apple juice.", "F|Noah had twenty apples.", "C|Where was the orchard?|near Kelowna*|near Iqaluit|near Moose Jaw", "C|How did they get there?|by bus*|by train|by bike", "C|Who is Mrs. Patel?|the farmer*|the teacher|the bus driver", "C|How should you pick an apple?|twist it gently*|shake the tree|use a stick", "C|Why did Noah use a ladder?|to reach the top*|to play|to rest", "C|What did Amira find?|a bee|an apple with a worm hole*|a nest", "C|Where was the juice machine?|in the barn*|in the house|on the bus", "C|How did the juice taste?|salty|sweet and a little sour*|bitter", "C|What did they each choose?|a pumpkin*|a flower|a pear", "C|What will Noah make with his dad?|juice|a pie*|a cake", "B|They should not let the ____ break.|branch", "B|Noah reached the shiny red ____.|apples", "B|Amira found one with a worm hole and ____.|laughed", "B|A machine ____ apples into juice.|pressed", "B|The juice was cold and tasted ____.|sweet", "B|Find a word in the story that rhymes with “school”: ____|cool", "B|Noah ____ his apples on the bus.|counted"]}
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
    return Q('as:' + a + (plus ? '+' : '-') + b, a + (plus ? ' + ' : ' − ') + b + ' = ' + BL);
  }
  function mMissing(R, L) {
    var c = ri(R, L === 'easy' ? 5 : 10, MAXN[L]), a = ri(R, 1, c - 1);
    if (R() < 0.5) return Q('mi:' + a + '+?=' + c, a + ' + ' + BLS + ' = ' + c);
    return Q('mi:' + c + '-?=' + a, c + ' − ' + BLS + ' = ' + a);
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
    return Q('wp:' + t + ':' + a + ':' + b, esc(text) + ' ' + BLS);
  }
  function mTensOnes(R, L) {
    var n = ri(R, 10, L === 'easy' ? 20 : L === 'medium' ? 50 : 99), t = Math.floor(n / 10), o = n % 10;
    if (R() < 0.5) return Q('n:' + n, n + ' = ' + BLS + ' tens ' + BLS + ' ones');
    return Q('n:' + n, t + ' tens ' + o + ' ones = ' + BL);
  }
  function mCompare(R, L) {
    var max = MAXN[L], a, b;
    if (L === 'hard' && R() < 0.3) {
      var x, y;
      do { x = ri(R, 1, 9); y = ri(R, 1, 9); } while (x === y);
      a = 10 * x + y; b = 10 * y + x;
    } else if (R() < 0.12) { a = b = ri(R, 1, max); }
    else { a = ri(R, 0, max); do { b = ri(R, 0, max); } while (b === a); }
    return Q('cmp:' + a + ':' + b, 'Write &lt;, &gt; or =: &nbsp;' + a + ' ' + BOX + ' ' + b);
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
    return Q('sk:' + step + ':' + seq[0] + ':' + (back ? 'b' : 'f'), 'Count ' + (back ? 'back ' : '') + 'by ' + step + 's:<br>' + shown);
  }
  function mBeforeAfter(R, L) {
    var max = MAXN[L], t = pick(R, ['before', 'after', 'between']), n;
    if (t === 'before') { n = ri(R, 1, max); return Q('n:' + n, 'What number comes just before ' + n + '? ' + BLS); }
    if (t === 'after') { n = ri(R, 0, max - 1); return Q('n:' + n, 'What number comes just after ' + n + '? ' + BLS); }
    n = ri(R, 1, max - 1);
    return Q('n:' + n, 'What number is between ' + (n - 1) + ' and ' + (n + 1) + '? ' + BLS);
  }
  function mOrder(R, L) {
    var max = MAXN[L], k = L === 'hard' ? 4 : 3, desc = L === 'hard' && R() < 0.4, nums = [];
    while (nums.length < k) { var v = ri(R, 0, max); if (nums.indexOf(v) < 0) nums.push(v); }
    var sorted = nums.slice().sort(function (x, y) { return x - y; });
    var target = desc ? sorted.slice().reverse() : sorted;
    if (nums.join() === target.join()) { var tmp = nums[0]; nums[0] = nums[1]; nums[1] = tmp; }
    var blanks = []; for (var i = 0; i < k; i++) blanks.push(BLS);
    return Q('ord:' + sorted.join(',') + ':' + (desc ? 'd' : 'a'),
      'Put in order, ' + (desc ? 'greatest to least' : 'least to greatest') + ': <b>' + nums.join(', ') + '</b><br>' + blanks.join(', '));
  }
  function mEvenOdd(R, L) {
    var n = ri(R, 1, MAXN[L]);
    return Q('n:' + n, 'Is ' + n + ' even or odd?' + circ(['even', 'odd']));
  }
  function mCoins(R, L) {
    var list = [], i, total;
    if (L === 'hard' && R() < 0.4) {
      var k = ri(R, 2, 5);
      for (i = 0; i < k; i++) list.push(pick(R, [100, 200]));
      list.sort(function (x, y) { return y - x; });
      return Q('coin:' + list.join('-'), '<div class="row">' + coinsSvg(list) + '<span>How many dollars?<br>$' + BLS + '</span></div>');
    }
    var kinds = L === 'easy' ? [5, 10] : [5, 10, 25], maxC = L === 'easy' ? 4 : L === 'medium' ? 5 : 6, cap = L === 'easy' ? 40 : 100;
    do {
      var cnt = ri(R, 2, maxC); list = []; total = 0;
      for (i = 0; i < cnt; i++) { var c = pick(R, kinds); list.push(c); total += c; }
    } while (total > cap);
    list.sort(function (x, y) { return y - x; });
    return Q('coin:' + list.join('-'), '<div class="row">' + coinsSvg(list) + '<span>How much money?<br>' + BLS + '¢</span></div>');
  }
  function mShop(R, L) {
    var it = sample(R, SHOP, 2);
    if (L === 'hard' && R() < 0.5) {
      var p = 5 * ri(R, 1, 19);
      return Q('shop:c:' + p, 'You have $1. You buy ' + an(it[0]) + ' for ' + p + '¢. How much change? ' + BLS + '¢');
    }
    var cap = MAXN[L], p1 = ri(R, 1, cap - 1), p2 = ri(R, 1, cap - p1);
    return Q('shop:t:' + Math.min(p1, p2) + ':' + Math.max(p1, p2),
      esc(an(it[0]).replace(/^./, function (c) { return c.toUpperCase(); })) + ' costs ' + p1 + '¢. ' + esc(an(it[1]).replace(/^./, function (c) { return c.toUpperCase(); })) + ' costs ' + p2 + '¢. How much for both? ' + BLS + '¢');
  }
  function mClock(R, L) {
    var h = ri(R, 1, 12), m = pick(R, L === 'easy' ? [0, 30] : [0, 15, 30, 45]), t = h + ':' + pad2(m);
    if (R() < 0.5) return Q('t:' + t, '<div class="row">' + clockSvg(h, m, true) + '<span>What time is it?<br>' + TIME + '</span></div>');
    return Q('t:' + t, '<div class="row">' + clockSvg(h, m, false) + '<span>Draw the hands to show <b>' + t + '</b>.</span></div>');
  }
  function mLater(R) {
    var h = ri(R, 1, 12), m = pick(R, [0, 15, 30, 45]), d = pick(R, [30, 60]);
    return Q('lt:' + h + ':' + m + ':' + d, 'It is <b>' + h + ':' + pad2(m) + '</b>. What time will it be in ' + (d === 30 ? 'half an hour' : '1 hour') + '? ' + TIME);
  }
  function mCalendar(R, L) {
    var isDay = R() < 0.5, list = isDay ? WEEK : MONTHS, i = ri(R, 0, list.length - 1), after = R() < 0.5;
    var dist = L === 'hard' && R() < 0.5 ? 2 : 1, unit = isDay ? 'day' : 'month', text;
    if (dist === 1) text = 'What ' + unit + ' comes just ' + (after ? 'after ' : 'before ') + list[i] + '?';
    else text = 'What ' + unit + ' is 2 ' + unit + 's ' + (after ? 'after ' : 'before ') + list[i] + '?';
    return Q('cal:' + unit + ':' + i + ':' + after + ':' + dist, text + '<br>' + BLM);
  }
  var GR = { easy: [2, 4, 2, 5], medium: [2, 5, 2, 5], hard: [2, 5, 2, 6] };
  function mEqGroups(R, L) {
    var g = ri(R, GR[L][0], GR[L][1]), n = ri(R, GR[L][2], GR[L][3]);
    return Q('mul:' + g + 'x' + n, '<div class="row">' + groupsSvg(g, n) + '<span><span class="nw">' + BLS + ' groups of ' + BLS + '</span><br>= ' + BLS + ' in all</span></div>');
  }
  function mRepAdd(R, L) {
    var g = ri(R, GR[L][0], GR[L][1]), n = ri(R, GR[L][2], GR[L][3]);
    if (L === 'hard' && R() < 0.5) return Q('mul:' + g + 'x' + n, g + ' groups of ' + n + ' = ' + BL + ' in all');
    var parts = []; for (var i = 0; i < g; i++) parts.push(n);
    return Q('mul:' + g + 'x' + n, parts.join(' + ') + ' = ' + BL);
  }
  function mShare(R, L) {
    var f = ri(R, 2, L === 'easy' ? 4 : 5), each = ri(R, 2, L === 'easy' ? 5 : L === 'medium' ? 6 : 10);
    var total = f * each, it = pick(R, ITEMS);
    return Q('sh:' + total + '/' + f, total + ' ' + it + ' are shared equally by ' + f + ' friends. How many does each get? ' + BLS);
  }
  var FR_WORDS = { 2: 'one half', 3: 'one third', 4: 'one fourth' };
  function mFraction(R, L) {
    var shape = pick(R, ['circle', 'bar', 'square']);
    if (L !== 'hard') {
      var n = pick(R, [2, 3, 4]);
      return Q('fr:' + shape + ':' + n, '<div class="row">' + fracSvg(shape, n, [ri(R, 0, n - 1)]) + '<span>What fraction is shaded?<br>' + circ([FR_WORDS[2], FR_WORDS[3], FR_WORDS[4]]) + '</span></div>');
    }
    var parts = pick(R, [2, 3, 4, 6, 8]), k = ri(R, 1, parts - 1), idx = [];
    for (var i = 0; i < parts; i++) idx.push(i);
    return Q('fr:' + shape + ':' + k + '/' + parts, '<div class="row">' + fracSvg(shape, parts, sample(R, idx, k)) + '<span>' + BLS + ' out of ' + BLS + ' equal parts are shaded.</span></div>');
  }
  var SHAPE_KINDS = ['circle', 'square', 'triangle', 'star', 'diamond'];
  var PATTERNS = { easy: ['AB', 'AAB', 'ABB'], medium: ['AB', 'AAB', 'ABB', 'ABC'], hard: ['AB', 'AAB', 'ABB', 'ABC', 'AABB', 'ABCB'] };
  function mShapePattern(R, L) {
    var p = pick(R, PATTERNS[L]), letters = [];
    p.split('').forEach(function (ch) { if (letters.indexOf(ch) < 0) letters.push(ch); });
    var shapes = sample(R, SHAPE_KINDS, letters.length), len = p.length >= 4 ? 8 : 6, seq = [];
    for (var i = 0; i < len; i++) seq.push(shapes[letters.indexOf(p[i % p.length])]);
    return Q('sp:' + p + ':' + shapes.join(','), '<div class="row">' + patternSvg(seq) + '<span>Draw what comes next.</span></div>');
  }
  var NUM_STEPS = { easy: [1, 2, 3, 5], medium: [2, 3, 5, 10], hard: [2, 3, 4, 5, 10, 25] };
  function mNumberPattern(R, L) {
    var max = MAXN[L], step = pick(R, NUM_STEPS[L]), down = L !== 'easy' && R() < 0.3, start;
    if (down) start = ri(R, 4 * step, max); else start = ri(R, 0, max - 4 * step);
    var seq = [0, 1, 2, 3].map(function (i) { return down ? start - i * step : start + i * step; });
    if (L === 'hard' && R() < 0.5) {
      return Q('np:' + seq[0] + ':' + step + ':' + down + ':r', 'Find the rule: <b>' + seq.join(', ') + '</b><br>Rule: ' + circ(['add', 'subtract']) + ' ' + BLS);
    }
    return Q('np:' + seq[0] + ':' + step + ':' + down, 'What comes next?<br><b>' + seq.join(', ') + ',</b> ' + BLS);
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
    hard: ['because|becuz|becaus', 'beautiful|beutiful|beautifull', 'favourite|favourit|faverite', 'neighbour|nabour|neighbur', 'colour|culour|colur',
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
    hard: ['we drove to ottawa on friday', 'my aunt lives in halifax, nova scotia', 'in august we camped near lake louise', 'my family flew to vancouver in july',
      'we saw the cn tower in toronto', 'grandpa grew up in winnipeg', 'on canada day we went to niagara falls', 'amira visited quebec city in may',
      'the rocky mountains are in alberta', 'we took a ferry to prince edward island', 'my friend moved to regina in september', 'the yukon river is very long',
      'in march we skated on the rideau canal', 'my uncle lives in st. john’s', 'we ate pancakes in montreal on sunday']
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
    return Q('w:' + p[0].toLowerCase(), 'Circle the right spelling:' + circ(shuffle(R, p)));
  }
  function wFix(R, L) {
    var p = pick(R, SPELL[L]).split('|'), wrong = p[1 + ri(R, 0, 1)];
    return Q('w:' + p[0].toLowerCase(), 'Fix the spelling: <b>' + esc(wrong) + '</b> → ' + BLM);
  }
  function wCaps(R, L) {
    var s = pick(R, CAPS[L]);
    return Q('cap:' + s, 'Fix the capitals. Add a period.<br><i>' + esc(s) + '</i>' + BLL);
  }
  function wEnd(R, L) {
    var p = pick(R, L === 'easy' ? ENDS.easy : upTo(L, ENDS)).split('|');
    return Q('em:' + p[0], 'Add the end mark: ' + esc(p[0]) + ' ' + BOX + '<br><span class="hint">Use ' + (L === 'easy' ? '. or ?' : '. ? or !') + '</span>');
  }
  function wHomophone(R, L) {
    var p = pick(R, upTo(L, HOMO)).split('|');
    return Q('hp:' + p[0], 'Circle the right word:<br>' + esc(p[0]).replace('___', BLS) + circ(shuffle(R, [p[1], p[2]])));
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
    return Q('abc:' + sorted.join(','), 'Write in ABC order: <b>' + words.join(', ') + '</b><br>' + blanks.join(' '));
  }
  function wPlural(R, L) {
    var w = pick(R, PLURALS[L]);
    return Q('w:' + w, 'Write the plural: one ' + w + ', two ' + BLM);
  }
  function wCompound(R) {
    var p = pick(R, COMPOUND).split('|');
    return Q('cp:' + p.join(''), 'Make a compound word:<br>' + p[0] + ' + ' + p[1] + ' = ' + BLM);
  }
  function wOpposite(R, L) {
    var p = pick(R, upTo(L, OPPOSITES)).split('|');
    if (R() < 0.5) p.reverse();
    return Q('w:' + p[0], 'The opposite of <b>' + p[0] + '</b> is ' + BL + '.');
  }
  function wRhyme(R, L) {
    var w = pick(R, upTo(L, RHYME));
    return Q('w:' + w, 'Write a word that rhymes with <b>' + w + '</b>: ' + BL);
  }
  function wContraction(R) {
    var p = pick(R, CONTRACTIONS).split('|');
    if (R() < 0.5) return Q('ct:' + p[1], 'Write the short form: ' + esc(p[0]) + ' = ' + BL);
    return Q('ct:' + p[1], 'Write the two words: <b>' + esc(p[1]) + '</b> = ' + BLS + ' ' + BLS);
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
    return Q('fr:' + w.fr, 'Circle the French word for <b>' + esc(w.en) + '</b>:<br>' + circ(shuffle(R, ch)));
  }
  function fMeaning(R, L) {
    var v = vocab(L), w = pick(R, v), same = v.filter(function (x) { return x.topic === w.topic; });
    var ch = others(R, same, w, 2).map(function (x) { return x.en; }).concat([w.en]);
    return Q('fr:' + w.fr, 'What does <b>' + esc(w.fr) + '</b> mean?<br>' + circ(shuffle(R, ch)));
  }
  function fWrite(R, L) {
    var w = pick(R, vocab(L));
    return Q('fr:' + w.fr, 'Write it in English: <b>' + esc(w.fr) + '</b> → ' + BLM);
  }
  function fNumber(R, L) {
    var top = L === 'easy' ? 10 : 20, n = ri(R, 1, top);
    if (R() < 0.5) return Q('num:' + n, 'Write the number: <b>' + NUMS[n - 1] + '</b> = ' + BLS);
    var pool = []; for (var i = 1; i <= top; i++) if (i !== n) pool.push(i);
    var ch = sample(R, pool, 2).map(function (x) { return NUMS[x - 1]; }).concat([NUMS[n - 1]]);
    return Q('num:' + n, 'Circle the French word for <b>' + n + '</b>:<br>' + circ(shuffle(R, ch)));
  }
  function fColour(R) {
    var p = pick(R, COLOUR_THINGS).split('|');
    var all = VOCAB.colours.map(function (s) { return s.split('|')[0]; });
    var ch = others(R, all, p[1], 2).concat([p[1]]);
    return Q('obj:' + p[0], 'What colour is ' + esc(p[0]) + '?<br>' + circ(shuffle(R, ch)));
  }
  function fSay(R) {
    var p = pick(R, SAY).split('|');
    var ch = others(R, SAY_CHOICES, p[1], 2).concat([p[1]]);
    return Q('fr:' + p[1], 'What do you say? ' + esc(p[0]) + '<br>' + circ(shuffle(R, ch)));
  }
  function frNames(key) { return VOCAB[key].map(function (s) { return s.split('|')[0]; }); }
  function fDay(R, L) {
    var d = frNames('days'), i = ri(R, 0, 6), next = d[(i + 1) % 7];
    if (L === 'hard' && R() < 0.4) return Q('fr:' + d[i], 'Write the day that comes after <b>' + d[i] + '</b>: ' + BLM);
    var ch = others(R, d.filter(function (x) { return x !== d[i]; }), next, 2).concat([next]);
    return Q('fr:' + d[i], 'Which day comes after <b>' + d[i] + '</b>?<br>' + circ(shuffle(R, ch)));
  }
  function fMonth(R) {
    var m = frNames('months'), i = ri(R, 0, 11), next = m[(i + 1) % 12];
    var ch = others(R, m.filter(function (x) { return x !== m[i]; }), next, 2).concat([next]);
    return Q('fr:' + m[i], 'Which month comes after <b>' + esc(m[i]) + '</b>?<br>' + circ(shuffle(R, ch)));
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
      { id: 'french', name: 'French', kinds: frenchKinds }
    ]
  };
});
