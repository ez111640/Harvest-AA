from app.models import db, Pin, environment, SCHEMA


def seed_pins():
    pin1 = Pin(
        url='https://i.pinimg.com/564x/84/89/e6/8489e694ff1e28053ad49deab53e917a.jpg',
        link='https://livelovefruit.com/perennial-vegetables-plant-once-harvest-forever/',
        description="Perennial vegetables - crops you can plant once, and harvest year after year - are relatively rare in the plant food world, but save you tonnes of money!",
        title='Plant Once, Pick Forever! 12 Perennial Vegetables You Need To Plant This Summer',
        creatorId="1"
    )

    pin2 = Pin(
        url='https://i.pinimg.com/564x/1d/f6/54/1df65436fc1f83e4a887615956c2df96.jpg',
        link="https://simplelivingcountrygal.com/how-to-grow-pumpkins-for-beginners/",
        description="How to grow pumpkins for beginners. A step-by-step guide that will walk you through how to plant, weeding, pest control, and harvest.",
        title='How to Grow Huge Pumpkins Step-By-Step',
        creatorId="1"
    )
    pin3 = Pin(
        url="https://i.pinimg.com/236x/ac/ba/69/acba69c2f76b56588d160267523f5318.jpg",
        link="https://www.milorganite.com/blog/fruits-vegetables/growing-your-own-food?utm_source=pinterest&utm_medium=paid-social&utm_campaign=GrowingOwnFood&pp=0&epik=dj0yJnU9b1BhZnllSzg1bEVGY3NfYjRBelJ1a1NnU0JudDRiNGYmcD0xJm49d0xxSENoMU1zOFhhRHlVWE9MZmNpdyZ0PUFBQUFBR1Q0NFVr",
        description="The many benefits of edible gardening, including the enhanced flavor, increased nutrient density of the food, and the sustainability factor provide a compelling argument to “get growing!” There/’s always room to grow.",
        title='How to Start Growing your own Food',
        creatorId="1"
    )
    pin4 = Pin(
        url='https://i.pinimg.com/564x/33/11/fc/3311fcdb34c75d76aa39912a75e0def7.jpg',
        link="https://homesteadsurvivalsite.com/one-tree-every-homesteader-should-plant/",
        description="Trees are a homesteader\'s best friend. They provide shelter from the sun, wind, and rain. And they often have medicinal properties",
        title='The One Tree That Every Homesteader Should Plant',
        creatorId="1"
    )
    pin5 = Pin(
        url="https://i.pinimg.com/564x/98/e0/b8/98e0b8efac14d900fe1170a2a58968d1.jpg",
        link="https://www.lavenderhomefront.com/how-to-dry-and-preserve-herbs/",
        description="Learn how to dry and preserve herbs with this great guide. Enjoy dried herbs with the best flavor when preserved fresh from the garden.",
        title="How to Dry and Preserve Herbs",
        creatorId="2"
    )
    pin6 = Pin(
        url="https://i.pinimg.com/564x/24/4b/7d/244b7d7bb21aca387849901493fa35d8.jpg",
        link="https://ourstoneyacres.com/7-vegetables-that-can-survive-freezing",
        description="Plant these 7 veggies in your backyard garden and they will survive the freezing temperatures that are sure to come this fall and winter.",
        title="7 Vegetables that can Survive Freezing",
        creatorId="2"
    )
    pin7 = Pin(
        url="https://i.pinimg.com/564x/c4/1a/b5/c41ab5dc63c0c7cd75a2dbd6ac32125f.jpg",
        link="https://thehomesteadinghippy.com/how-to-build-a-food-forest/",
        description="Permaculture food forests are autopilot gardens that need little human intervention except in the beginning. Here's how to build one.",
        title="How to Build a Food Forest Step by Step",
        creatorId="2"
    )
    pin8 = Pin(
        url="https://i.pinimg.com/564x/b2/9f/2a/b29f2aea3401e0e44036149006c9e703.jpg",
        link="https://brownthumbmama.com/vegetables-plant-october/",
        description="Learn which vegetables to plant in October, plus the best varieties, planting tips, and recipes for your harvest. ",
        title="14 Veggies to Plant in October",
        creatorId="2"
    )
    pin9= Pin (
        url="https://i.pinimg.com/564x/49/68/3a/49683a5bbf0ea72f84efa2568b95842a.jpg",
        link="https://bakernine.com/off-grid-solar-greenhouse/?pp=1",
        description="Build your own off grid solar greenhouse. Start being self sufficient by growing year round. ",
        title="Build Your Own Solar Off Grid Greenhouse",
        creatorId="3"
    )
    pin10= Pin (

        url="https://i.pinimg.com/564x/26/5b/4e/265b4edbe7897d177426f2b3ab8b4901.jpg",
        link="http://diytotry.com/backyard-pallet-projects-for-todays-homestead/",
        description="Here are a few of our favorite pallet projects to make for the homestead.",
        title="12 Backyard Pallet Projects",
        creatorId="3"
    )
    pin11= Pin (

        url="https://i.pinimg.com/564x/91/ed/1c/91ed1c169771ddff8536a36f01d49bcd.jpg",
        link="https://www.anikasdiylife.com/woodworking-plans/",
        description="Simple step-by-step woodworking plans perfect for beginners. Plans have accompanying picture tutorials, and some have videos.",
        title="Beginner Friendly Woodworking Plans",
        creatorId="3"
    )
    pin12= Pin (

        url="https://i.pinimg.com/564x/a0/ef/98/a0ef984a4928a507f6594a03706a2d1a.jpg",
        link="https://hillsborough-homesteading.com/different-types-of-wood-and-their-uses/?utm_medium=social&utm_source=pinterest&utm_campaign=tailwind_tribes&utm_content=tribes&utm_term=442400526_12228820_357695",
        description="Do you know what type of wood to use for your project? Some woods make better fences, while others are better for building your barn.",
        title="Different Types of Wood and their Uses",
        creatorId="3"
    )
    pin13= Pin (

        url="https://i.pinimg.com/564x/61/97/20/61972080d65b8cd62bac76ea55843b2b.jpg",
        link="https://www.beenatreewood.com/sawdust-and-wood-shavings/",
        description="It may be possible that someone is willing to pay you some money for your sawdust or wood shavings, read on to find out more!",
        title="What to do with Sawdust and Wood Shavings",
        creatorId="4"
    )
    pin14= Pin (

        url="https://i.pinimg.com/564x/9c/a5/05/9ca505c6d6deac77f6dc18f06b759454.jpg",
        link="https://rootsy.org/how-to-make-money-on-your-homestead-cottage-food-laws/?utm_medium=social&utm_source=pinterest&utm_campaign=tailwind_tribes&utm_content=tribes&utm_term=1050328566_49298046_258197",
        description="Ever wonder just how to make money from your homestead? Cottage Food Laws might just be your answer.",
        title="What beginners need to know about Cottage Laws",
        creatorId="4"
    )
    pin15= Pin (

        url="https://i.pinimg.com/564x/35/7a/cf/357acf42f2ff1ab29b693e36290c7855.jpg",
        link="https://www.trialandeater.com/wp-content/uploads/2014/02/Rosemary-bread-1.jpg.webp",
        description="Fresh rosemary bread. Not only delicious but will make your kitchen smell wonderful while your herb dough is baking in the oven. Especially great to bake if you have a bunch of fresh rosemary sprigs.",
        title="Fresh Rosemary Bread Recipe",
        creatorId="4"
    )
    pin16= Pin (

        url="https://i.pinimg.com/564x/25/32/b9/2532b94757d224ee22acc9ef78a657c3.jpg",
        link="https://homestead-honey.com/garden-inspired-meal-planning/?utm_medium=social&utm_source=pinterest&utm_campaign=tailwind_tribes&utm_content=tribes",
        description="When produce is fresh, we like to simplify our meals and let the garden's bounty shine through with garden-inspired meal planning.",
        title="Garden-Inspired Meal Planning",
        creatorId="4"
    )
    pin17= Pin (

        url="https://i.pinimg.com/564x/12/08/05/120805c0ff34e29e12c76c31c6dcdcf5.jpg",
        link="https://simpleisgourmet.com/how-to-make-a-sourdough-starter-from-scratch/",
        description="How to make your own Sourdough Starter from scratch. An easy day by day guide that will help you successfully create your own sourdough starter",
        title="How to Make a Sourdough Starter from Scratch",
        creatorId="4"
    )
    pin18= Pin (

        url="https://i.pinimg.com/564x/1a/3e/10/1a3e100726303b377ed778b8ec4be8ad.jpg",
        link="https://ourhomeandheritage.com/staple-homestead-kitchen-items/",
        description="Every homestead kitchen needs these staple items for easier from-scratch cooking. I could not do without them when I'm preparing meals for my family.",
        title="Staple Homestead Kitchen Items fr rfrom Scratch Cooking",
        creatorId="4"
    )
    pin19= Pin (

        url="https://i.pinimg.com/564x/96/1d/f7/961df7e73074e44cb0da84b0b9d5aa92.jpg",
        link="https://oldworldgardenfarms.com/2019/07/18/install-off-grid-solar-power/",
        description="How To Install Solar Power to a shed, barn or cabin with ease",
        title="How To Install Off-Grid Solar Power To A Cabin, Shed Or Barn With Ease",
        creatorId="4"
    )
    pin20= Pin (

        url="https://i.pinimg.com/564x/70/d1/8a/70d18a3e0d8f0da05ec0d147183d4f68.jpg",
        link="https://www.epicurious.com/recipes/food/views/homemade-ginger-ale-358033?epik=dj0yJnU9U2kzTHo4UUxPd1BlMWlTZl93ckZ0NHE2Z05rWllxXzcmcD0wJm49SkZqMF9HZGdNNk5KenJ1VkxyQ2c3ZyZ0PUFBQUFBR1VXUTFr",
        description="Carefully simmering fresh ginger in water for a good, long while is the key to deep, rounded flavor. ",
        title="Homemade Ginger Ale",
        creatorId="4"
    )
    pin21= Pin (

        url="https://i.pinimg.com/564x/d4/62/e1/d462e10489c1a3c44c45720d60b700b8.jpg",
        link="https://www.yourbeautyblog.com/2015/06/amish-drawing-salve-with-activated.html",
        description="Use this Amish black drawing salve on cuts, scrapes, splinters, and boils to naturally pull toxins and debris from the skin.",
        title="Amish Black Drawing Salve",
        creatorId="2"
    )
    pin22= Pin (

        url="https://i.pinimg.com/564x/06/ba/aa/06baaa9c3b17c510ad5aca71b400018f.jpg",
        link="https://www.motherearthnews.com/sustainable-living/renewable-energy/solar-air-heater-zmaz06djzraw/",
        description="This low-cost solar air heater plan lets you turn any south wall into a source of free heat. ",
        title="Build a Simple Solar Air Heater",
        creatorId="2"
    )


    pin23= Pin (

        url="https://i.pinimg.com/564x/2b/f4/1f/2bf41fae0725b16ada80cb5c58f8bd12.jpg",
        link="https://www.farmhouseonboone.com/diy-laundry-soap",
        description="Learn how to make homemade laundry soap with all natural ingredients for under 5 dollars. This DIY Laundry Detergent is an effective way to clean clothes and fight stains.",
        title="Homemade Laundry Soap Orange Scented",
        creatorId="2"
    )
    pin24= Pin (

        url="https://i.pinimg.com/564x/42/9d/3f/429d3fe4c19a58ea308dc9bf9efb7bde.jpg",
        link="https://www.newlifeonahomestead.com/how-to-light-your-home-without-electricity/",
        description="In todays world, it is hard to imagine living without electricity. One of the biggest advantages you'd lose is electric lighting, something most of us take for granted.",
        title="How To Light Your Home Without Electricity",
        creatorId="2"
    )
    pin25= Pin (

        url="https://i.pinimg.com/564x/6d/25/27/6d2527ed40ee761ace891753346dd008.jpg",
        link="https://brownthumbmama.com/make-soap-without-lye/?utm_medium=social&utm_source=pinterest&utm_campaign=tailwind_tribes&utm_content=tribes&utm_term=1082350260_51794048_196824&ssp_iabi=1677431479649",
        description="This is a fantastic, easy way to make soap without using lye-and it's safe to do with kids around. Customize your homemade soap with any scents or colors you like!",
        title="Make Soap Without Using Lye",
        creatorId="1"
    )
    pin26= Pin (

        url="https://i.pinimg.com/564x/99/78/19/997819d213f13afe03b9202b08c9c492.jpg",
        link="https://www.marthastewart.com/1536685/lever-knitting-method-explained?utm_source=pinterest.com&utm_medium=social&utm_campaign=marthastewartliving_8471977&utm_content=textoverlay_toppinterest_powerpin_diy&utm_term=knittingandcrochetprojects_202201",
        description="The lever knitting method, also known as the Irish cottage style, has the reputation of being the 'fastest knitting method in the world.' We share why this easy knitting method is quick, efficient, and is painless for those who suffer from hand problems but still want to knit. #marthastewart #crafts #hobby #knitting #diyideas #knittingprojects",
        title="Lever Knitting Is the Fastest Knitting Technique in the World",
        creatorId="2"
    )
    pin27= Pin (

        url="https://i.pinimg.com/564x/27/8d/f5/278df5a4d14d117494c6ebb27e999a78.jpg",
        link="https://premeditatedleftovers.com/naturally-frugal-living/homemade-lavender-rosemary-shampoo/",
        description="Learn how to make homemade Lavender Rosemary Shampoo with this easy recipe and tutorial.",
        title="How to Make Homemade Lavender Rosemary Shampoo",
        creatorId="3"
    )
    pin28= Pin (

        url="https://i.pinimg.com/564x/6c/85/ac/6c85ac74287b0d2efe1b13c6e1c35d11.jpg",
        link="https://reusegrowenjoy.com/how-to-heat-greenhouse-in-winter-without-electricity/",
        description="Have a small greenhouse or larger greenhouses that do not have power and wondering if you can heat greenhouse in winter without electricity?",
        title="How To Heat Greenhouse In Winter Without Electricity",
        creatorId="2"
    )
    pin29= Pin (

        url="https://i.pinimg.com/564x/4e/d6/6a/4ed66a35d9a78502cb7c51e655903d45.jpg",
        link="https://www.butterforall.com/traditional-cooking-traditional-living/whitening-remineralizing-detoxifying-coconut-oil-toothpaste/",
        description="This is the best Coconut Oil Toothpaste! It is great for whitening and remineralizing teeth while it works to detoxify the entire mouth! ",
        title="Whitening, Remineralizing, and Detoxifying Coconut Oil Toothpaste",
        creatorId="2"
    )
    pin30= Pin (

        url="https://i.pinimg.com/564x/cf/7c/4a/cf7c4a9f5850da6866a6ce769dc87dfc.jpg",
        link="https://homesteadandchill.com/homemade-lemon-vinegar-cleaning-spray/?utm_medium=social&utm_source=pinterest&utm_campaign=tailwind_tribes&utm_content=tribes&utm_term=818088892_34108348_346935",
        description="Don't throw out those lemon rinds or citrus scraps! Instead, turn them into a refreshing, natural, effective vinegar cleaning spray!",
        title="How to Make Homemade Lemon Vinegar Cleaning Spray",
        creatorId="1"
    )
    pin31= Pin (

        url="https://i.pinimg.com/564x/ff/2a/bf/ff2abf31cb0c6a32c9535607bdb27f76.jpg",
        link="https://homesteadsurvivalsite.com/how-to-make-homemade-neosporin-with-pics/",
        description="This “natural Neosporin” is perfect for cuts, scrapes, and burns. ",
        title="How To Make Homemade Neosporin",
        creatorId="1"
    )
    pin31= Pin (

        url="https://i.pinimg.com/564x/78/e3/70/78e3707e6249464e2a88e909e7b278f6.jpg",
        link="https://www.crystalized-designs.com/lucet-fork-tutorial/",
        description="The purpose of a Lucet Fork is easy. Cords and braiding.",
        title="How to Use a Lucet Fork ~ A Tutorial",
        creatorId="1"
    )
    pin32= Pin (

        url="https://i.pinimg.com/564x/60/9f/3a/609f3a0a5b0bba7079b9ce1b47865996.jpg",
        link="https://hillsborough-homesteading.com/homesteaders-guide-to-sewing-the-tools-of-the-trade/?utm_medium=social&utm_source=pinterest&utm_campaign=tailwind_tribes&utm_content=tribes&utm_term=372374598_12059926_204380",
        description="One of the most essential homesteading skills is sewing. This beginner's post starts with the details on what tools you'll need to get started sewing on your homestead",
        title="Homesteader's Guide to Sewing: The Tools of the Trade",
        creatorId="1"
    )
    pin33= Pin (

        url="https://i.pinimg.com/564x/8b/40/7b/8b407b8be1fc3bbba1c4c8b77839d75f.jpg",
        link="https://www.littleyellowwheelbarrow.com/free-diy-basket-pattern/",
        description="A quick and easy DIY basket you can knit up no time flat. These small baskets are soft and flexible and can be folded down for storage",
        title="Free DIY Basket Pattern",
        creatorId="2"
    )
    pin34= Pin (

        url="https://i.pinimg.com/564x/8a/ff/ca/8affcadba984e61d2fecf45520369d5a.jpg",
        link="https://foodcrumbles.com/the-scientific-guide-to-choosing-pectin/",
        description="An in-depth article about pectin! Learn everything you need to know. What is it? Types of pectin. How and when to use it?",
        title="The (Scientific) Guide to Choosing Pectin",
        creatorId="2"
    )
    pin35= Pin (

        url="https://i.pinimg.com/564x/86/bd/0c/86bd0cf6241ead22873662c842acadb8.jpg",
        link="https://www.thepurposefulpantry.com/how-to-dehydrate-caramelized-onions/",
        description="These easy instructions will help you learn how to dehydrate your own onions, and make your own onion powder. Bonus recipe for making French Onion Dip powder for snacking anytime!",
        title="How to Dehydrate Caramelized Onions + Onion Powder",
        creatorId="2"
    )
    pin36= Pin (

        url="https://i.pinimg.com/564x/3d/73/be/3d73be59f17398a91f444c7c7e9f30a3.jpg",
        link="https://homesteadersofamerica.com/homestead-cold-room/?ml_subscriber=1618115185426306128&ml_subscriber_hash=a6y4",
        description="Supercharge your root cellar and turn it into a homestead cold room instead! ",
        title="Homestead Cold Room: 9 Reasons to Go Beyond a Root Cellar",
        creatorId="2"
    )
    pin37= Pin (

        url="https://i.pinimg.com/564x/20/45/4c/20454c05e94e933f690226b159c3a47c.jpg",
        link="https://designlifehacks.com/2016/04/20/types-of-sewing-stitches/",
        description="Although I do enjoy using a sewing machine to stitch together projects,",
        title="Hand Sewn Repairs",
        creatorId="2"
    )
    pin38=Pin(
        url="https://i.pinimg.com/564x/46/9c/e9/469ce9f90af674645e3f109ab316fb48.jpg",
        link="https://www.homestead-acres.com/planting-potatoes-in-the-fall/",
        description="Planting potatoes in the fall is a great way to get a head start on the growing season. Learn everything you need to know about fall planting potatoes",
        title="Planting Potatoes: How To Plant Potatoes In The Fall",
        creatorId="4"
    )
    pin39=Pin(
        url="https://i.pinimg.com/564x/30/59/3d/30593de2657943ab48e04837a35bc402.jpg",
        link="https://www.imperfectlyhappy.com/plant-in-september/",
        description="Are you wondering what you can plant in September? Depending on your zone, you might be surprised at all that you'll be able to grow this fall.",
        title="What to Plant in September",
        creatorId="4"
    )


    db.session.add(pin1)
    db.session.add(pin2)
    db.session.add(pin3)
    db.session.add(pin4)
    db.session.add(pin5)
    db.session.add(pin6)
    db.session.add(pin7)
    db.session.add(pin8)
    db.session.add(pin9)
    db.session.add(pin10)
    db.session.add(pin11)
    db.session.add(pin12)
    db.session.add(pin13)
    db.session.add(pin14)
    db.session.add(pin15)
    db.session.add(pin16)
    db.session.add(pin17)
    db.session.add(pin18)
    db.session.add(pin19)
    db.session.add(pin20)
    db.session.add(pin21)
    db.session.add(pin22)
    db.session.add(pin23)
    db.session.add(pin24)
    db.session.add(pin25)
    db.session.add(pin26)
    db.session.add(pin27)
    db.session.add(pin28)
    db.session.add(pin29)
    db.session.add(pin30)
    db.session.add(pin31)
    db.session.add(pin32)
    db.session.add(pin33)
    db.session.add(pin34)
    db.session.add(pin35)
    db.session.add(pin36)
    db.session.add(pin37)
    db.session.add(pin38)
    db.session.add(pin39)

def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM pins")

    db.session.commit()
