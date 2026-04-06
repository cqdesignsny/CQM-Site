export interface CountyArea {
  slug: string;
  name: string;
  state: string;
  region: string;
  heroTitle: string;
  description: string;
  towns: string[];
  content: {
    intro: string;
    whyLocal: string;
    closing: string;
  };
  keywords: string[];
}

export const countyAreas: CountyArea[] = [
  // ── Hudson Valley ──────────────────────────────────────────────
  {
    slug: "orange-county-ny",
    name: "Orange County, NY",
    state: "New York",
    region: "Hudson Valley",
    heroTitle: "Marketing Agency in Orange County, NY",
    description:
      "Creative Quality Marketing is based in Newburgh, NY. Web design, SEO, paid ads, and full funnel marketing for Orange County businesses.",
    towns: [
      "Newburgh",
      "Middletown",
      "Goshen",
      "Monroe",
      "Warwick",
      "Cornwall",
      "Highland Falls",
      "New Windsor",
      "Woodbury",
      "Chester",
      "Washingtonville",
      "Montgomery",
    ],
    content: {
      intro:
        "This is home. Our office is on Robinson Ave in Newburgh, and we have spent years helping businesses across Orange County build real marketing that actually works. From the shops lining Main Street in Goshen to the restaurants and service companies in Middletown, we know this market because we live in it every single day. We have watched Newburgh transform from an underdog into one of the most exciting small cities in the Hudson Valley, and we have helped local businesses ride that wave.",
      whyLocal:
        "Orange County is not one market. Warwick feels completely different from Middletown, and marketing a business in Monroe requires a different approach than Cornwall. A generic agency plugging in templates from out of state will miss all of that. We know the Route 17 corridor, we know the weekend crowd coming up from the city to hit the wineries, and we know how to make your business show up when locals are searching for exactly what you offer. Whether you are a contractor in New Windsor or a boutique in Woodbury, we build strategies around how people in this county actually find and choose businesses.",
      closing:
        "You do not need a bigger budget to compete in Orange County. You need smarter marketing from people who actually understand this market. That is what we do. Let us show you what a real local marketing strategy looks like.",
    },
    keywords: [
      "marketing agency Orange County NY",
      "digital marketing Newburgh NY",
      "SEO services Middletown NY",
      "web design Orange County New York",
      "advertising agency Goshen NY",
      "social media marketing Warwick NY",
      "marketing company Monroe NY",
      "local SEO Orange County NY",
      "PPC advertising Newburgh",
      "website design Middletown New York",
    ],
  },
  {
    slug: "dutchess-county-ny",
    name: "Dutchess County, NY",
    state: "New York",
    region: "Hudson Valley",
    heroTitle: "Marketing Agency in Dutchess County, NY",
    description:
      "Full funnel marketing for Dutchess County businesses. SEO, web design, paid ads, and social media from a Hudson Valley agency that knows your market.",
    towns: [
      "Poughkeepsie",
      "Beacon",
      "Fishkill",
      "Wappingers Falls",
      "Hyde Park",
      "Rhinebeck",
      "Red Hook",
      "Millbrook",
      "Hopewell Junction",
      "LaGrangeville",
    ],
    content: {
      intro:
        "Just across the Newburgh Beacon Bridge, Dutchess County has some of the most diverse business communities in the Hudson Valley. Beacon has turned into a creative powerhouse with galleries, restaurants, and startups filling up Main Street. Poughkeepsie is building real momentum with new development and a growing tech presence. And towns like Rhinebeck and Millbrook bring in tourism dollars that local businesses need to capture online. We work with Dutchess County businesses every week, and we understand the dynamics that make this market unique.",
      whyLocal:
        "The difference between Beacon and Poughkeepsie from a marketing perspective is massive. Beacon attracts a younger, Brooklyn transplant crowd, so the messaging, platforms, and targeting look completely different than what works in Fishkill or Wappingers Falls. We tailor strategies to each town because we actually know the differences. We know that Rhinebeck weekend visitors are searching on their phones Friday afternoon, and we know how to make sure your business is what they find. That kind of local knowledge is something no out of state agency can replicate.",
      closing:
        "Dutchess County businesses deserve marketing that reflects the energy and diversity of this area. We are right across the river and ready to build something that actually moves the needle for your business.",
    },
    keywords: [
      "marketing agency Dutchess County NY",
      "digital marketing Poughkeepsie NY",
      "SEO services Beacon NY",
      "web design Dutchess County",
      "advertising agency Fishkill NY",
      "social media marketing Rhinebeck NY",
      "marketing company Wappingers Falls",
      "local SEO Dutchess County",
      "PPC advertising Poughkeepsie",
      "website design Beacon New York",
    ],
  },
  {
    slug: "ulster-county-ny",
    name: "Ulster County, NY",
    state: "New York",
    region: "Hudson Valley",
    heroTitle: "Marketing Agency in Ulster County, NY",
    description:
      "Marketing agency serving Ulster County, NY. SEO, web design, paid ads, and social media for businesses in Kingston, New Paltz, Woodstock, and beyond.",
    towns: [
      "Kingston",
      "New Paltz",
      "Saugerties",
      "Woodstock",
      "Ellenville",
      "Highland",
      "Rosendale",
      "Stone Ridge",
      "Marlboro",
      "Plattekill",
    ],
    content: {
      intro:
        "Ulster County has always had its own vibe. Kingston is in the middle of a serious renaissance, with the Rondout waterfront pulling in visitors and new businesses at a pace nobody predicted five years ago. New Paltz brings the college crowd and outdoor adventure seekers. Woodstock still carries its legendary name recognition. And towns like Saugerties and Rosendale have growing local business scenes that punch way above their weight. We work with Ulster County businesses that are ready to grow and need marketing that actually reflects who they are.",
      whyLocal:
        "Marketing a restaurant on the Kingston waterfront is a completely different game than marketing a climbing gym in New Paltz or an artisan shop in Woodstock. Each town in Ulster County has its own audience, its own search patterns, and its own competitive landscape. We know that tourists searching for things to do in the Catskills are a huge opportunity for local businesses, and we know how to capture that traffic. We also know the year round locals who keep these businesses alive, and we build strategies that serve both audiences.",
      closing:
        "Ulster County is growing fast, and the businesses that invest in smart marketing now are the ones that will own their market for years to come. We would love to help you be one of them.",
    },
    keywords: [
      "marketing agency Ulster County NY",
      "digital marketing Kingston NY",
      "SEO services New Paltz NY",
      "web design Ulster County",
      "advertising agency Woodstock NY",
      "social media marketing Saugerties NY",
      "marketing company Kingston New York",
      "local SEO Ulster County",
      "PPC advertising Kingston NY",
      "website design New Paltz",
    ],
  },
  {
    slug: "rockland-county-ny",
    name: "Rockland County, NY",
    state: "New York",
    region: "Hudson Valley",
    heroTitle: "Marketing Agency in Rockland County, NY",
    description:
      "Digital marketing agency serving Rockland County, NY. Web design, SEO, paid ads, and social media for businesses in Nanuet, Nyack, Suffern, and more.",
    towns: [
      "New City",
      "Nanuet",
      "Suffern",
      "Spring Valley",
      "Pearl River",
      "Nyack",
      "Haverstraw",
      "Stony Point",
      "West Nyack",
      "Congers",
    ],
    content: {
      intro:
        "Rockland County sits at the crossroads of the Hudson Valley and the NYC metro area, and that creates a unique marketing landscape. You have got businesses in Nyack competing for both the local crowd and the day trippers crossing the Mario Cuomo Bridge. Nanuet and New City have thriving commercial districts full of service businesses, medical practices, and retail shops that need to stand out online. Pearl River has one of the most tight knit business communities in the county. We understand Rockland because we work with businesses here regularly and we see what moves the needle.",
      whyLocal:
        "Rockland County businesses face a unique challenge: you are close enough to NYC that some of your customers are searching with New York City intent, but you are also deeply local. That means your SEO strategy, your ad targeting, and your messaging all need to walk that line. We know how to geo target Rockland specifically so you are not wasting ad spend on people in Manhattan who will never drive to Suffern. We know the Palisades Center draws regional traffic, and we know how to help businesses near it capture that foot traffic online.",
      closing:
        "Whether you are in Nyack, New City, or anywhere in between, Rockland County businesses can compete with bigger players when they have the right marketing strategy. Let us build yours.",
    },
    keywords: [
      "marketing agency Rockland County NY",
      "digital marketing Nanuet NY",
      "SEO services Nyack NY",
      "web design Rockland County",
      "advertising agency New City NY",
      "social media marketing Suffern NY",
      "marketing company Pearl River NY",
      "local SEO Rockland County",
      "PPC advertising Rockland County",
      "website design Nyack New York",
    ],
  },
  {
    slug: "westchester-county-ny",
    name: "Westchester County, NY",
    state: "New York",
    region: "Hudson Valley",
    heroTitle: "Marketing Agency in Westchester County, NY",
    description:
      "Marketing agency for Westchester County businesses. SEO, web design, paid ads, and full funnel strategy for White Plains, Yonkers, Tarrytown, and more.",
    towns: [
      "White Plains",
      "Yonkers",
      "New Rochelle",
      "Mount Vernon",
      "Tarrytown",
      "Peekskill",
      "Ossining",
      "Croton-on-Hudson",
      "Yorktown Heights",
      "Cortlandt",
    ],
    content: {
      intro:
        "Westchester County is one of the most competitive business markets in New York State, and that is exactly why your marketing needs to be sharp. White Plains is a corporate hub with serious competition in every industry. Yonkers has a booming waterfront development scene. Tarrytown and the rivertowns attract both residents and tourists year round. And northern Westchester towns like Peekskill and Croton on Hudson are experiencing a creative and entrepreneurial surge. We work with Westchester businesses that are tired of generic marketing and want strategies built for their specific market.",
      whyLocal:
        "Westchester is dense, affluent, and hyper competitive. Every industry from law firms to restaurants to home services has dozens of competitors fighting for the same customers. The businesses that win are the ones with tight local SEO, smart ad targeting, and messaging that actually resonates with Westchester buyers. We know that a homeowner in Scarsdale searches differently than a renter in Yonkers. We know the difference between marketing to the I-87 corridor versus the Metro North towns. That granularity is what separates effective marketing from wasted budget.",
      closing:
        "In Westchester, you cannot afford to waste money on marketing that does not convert. We build lean, effective strategies that help you outthink the competition instead of trying to outspend them.",
    },
    keywords: [
      "marketing agency Westchester County NY",
      "digital marketing White Plains NY",
      "SEO services Yonkers NY",
      "web design Westchester County",
      "advertising agency Tarrytown NY",
      "social media marketing Peekskill NY",
      "marketing company New Rochelle NY",
      "local SEO Westchester County",
      "PPC advertising White Plains",
      "website design Westchester New York",
    ],
  },
  {
    slug: "sullivan-county-ny",
    name: "Sullivan County, NY",
    state: "New York",
    region: "Hudson Valley",
    heroTitle: "Marketing Agency in Sullivan County, NY",
    description:
      "Marketing agency serving Sullivan County, NY. Web design, SEO, paid ads, and digital marketing for businesses in Monticello, Liberty, and the Catskills.",
    towns: [
      "Monticello",
      "Liberty",
      "Fallsburg",
      "Thompson",
      "Mamakating",
      "Bethel",
      "Callicoon",
      "Wurtsboro",
      "Livingston Manor",
      "Narrowsburg",
    ],
    content: {
      intro:
        "Sullivan County is in the middle of a comeback story. Resorts World Catskills has brought new energy to Monticello. Bethel Woods keeps the legacy of Woodstock alive and draws concert goers all summer. The Delaware River towns like Callicoon and Narrowsburg have become destinations for Brooklyn weekenders looking for that small town feel. And Livingston Manor has transformed into a fly fishing and farm to table hotspot. The businesses here are growing, and they need marketing that matches the momentum.",
      whyLocal:
        "Sullivan County has a seasonal rhythm that most agencies do not understand. Summer and fall bring a flood of tourists, but the locals keep things running year round. Your marketing strategy needs to account for both. We know that vacation rental searches spike in April, that restaurant searches explode on holiday weekends, and that service businesses need to stay visible through the quieter winter months. We build marketing calendars around Sullivan County reality, not generic templates that ignore how business actually works up here.",
      closing:
        "Sullivan County businesses are competing for attention in one of the fastest changing markets in upstate New York. We are here to make sure your business gets found by the people who matter, whether they live here full time or just discovered the Catskills last weekend.",
    },
    keywords: [
      "marketing agency Sullivan County NY",
      "digital marketing Monticello NY",
      "SEO services Liberty NY",
      "web design Sullivan County",
      "advertising agency Catskills NY",
      "social media marketing Bethel NY",
      "marketing company Callicoon NY",
      "local SEO Sullivan County",
      "PPC advertising Sullivan County",
      "website design Monticello New York",
    ],
  },

  // ── NYC Metro ──────────────────────────────────────────────────
  {
    slug: "new-york-city",
    name: "New York City",
    state: "New York",
    region: "NYC Metro",
    heroTitle: "Marketing Agency for New York City Businesses",
    description:
      "NYC marketing agency offering web design, SEO, paid ads, and full funnel marketing. Serving Manhattan, Brooklyn, Queens, Bronx, and Staten Island.",
    towns: [
      "Manhattan",
      "Brooklyn",
      "Queens",
      "Bronx",
      "Staten Island",
    ],
    content: {
      intro:
        "New York City is the most competitive market on the planet, and that is not an exaggeration. Whether you are running a restaurant in SoHo, a tech startup in Williamsburg, a law firm in Midtown, a barbershop in Astoria, or a retail shop in Harlem, you are competing against thousands of businesses fighting for the same eyeballs. We work with NYC businesses that are tired of overpaying big city agencies for underwhelming results. Our overhead is lower because we are based in the Hudson Valley, but our strategy and execution are built for the intensity of the New York market.",
      whyLocal:
        "Here is the thing about marketing in NYC: neighborhood matters more than borough. What works in the West Village does not work in Bushwick. The keywords someone searches in the Financial District are different from Jackson Heights. We build hyper local strategies that target the specific neighborhoods where your customers are. We run geo fenced ad campaigns, neighborhood level SEO, and content strategies that speak to the culture of your specific area. And because our costs are not inflated by a Manhattan office lease, you get better results for less money.",
      closing:
        "You do not need a fancy agency with a SoHo address to win in New York City. You need smart strategy, relentless execution, and a team that treats your budget like it is their own. That is exactly what we deliver.",
    },
    keywords: [
      "marketing agency NYC",
      "digital marketing New York City",
      "SEO services Manhattan",
      "web design Brooklyn NY",
      "advertising agency Queens NY",
      "social media marketing NYC",
      "marketing company Bronx NY",
      "local SEO New York City",
      "PPC advertising Manhattan",
      "website design NYC",
    ],
  },
  {
    slug: "northern-new-jersey",
    name: "Northern New Jersey",
    state: "New Jersey",
    region: "NYC Metro",
    heroTitle: "Marketing Agency for Northern New Jersey Businesses",
    description:
      "Digital marketing agency serving Northern NJ. SEO, web design, paid ads for businesses in Bergen County, Passaic County, and Hudson County.",
    towns: [
      "Hackensack",
      "Fort Lee",
      "Paramus",
      "Paterson",
      "Wayne",
      "Clifton",
      "Jersey City",
      "Hoboken",
      "Bayonne",
    ],
    content: {
      intro:
        "Northern New Jersey is one of the most densely packed business markets in the country, and it takes a specific approach to stand out. Bergen County alone has more retail and service businesses per square mile than most states. Paramus is a retail powerhouse. Jersey City and Hoboken have exploded with startups and restaurants. Paterson and Clifton have deep rooted business communities that have been serving their neighborhoods for generations. We work with NJ businesses across Bergen, Passaic, and Hudson counties who need marketing that actually produces results, not vanity metrics.",
      whyLocal:
        "Northern NJ businesses deal with a unique challenge: you are competing with both local businesses and the gravitational pull of Manhattan. When someone in Fort Lee searches for a service, Google might show them NYC results. We know how to structure your local SEO so you dominate the NJ side of the Hudson. We know that Paramus shoppers behave differently than Hoboken residents. We understand that a business in Wayne needs different targeting than one on the Jersey City waterfront. That granular, market specific approach is what makes our strategies work.",
      closing:
        "Northern New Jersey businesses do not need to settle for cookie cutter marketing from agencies that treat the whole tri state area like one market. We build campaigns specific to your county, your town, and your customers.",
    },
    keywords: [
      "marketing agency Northern New Jersey",
      "digital marketing Bergen County NJ",
      "SEO services Jersey City NJ",
      "web design Hoboken NJ",
      "advertising agency Paramus NJ",
      "social media marketing Passaic County",
      "marketing company Hudson County NJ",
      "local SEO Northern NJ",
      "PPC advertising Fort Lee NJ",
      "website design Hackensack NJ",
    ],
  },
  {
    slug: "fairfield-county-ct",
    name: "Fairfield County, CT",
    state: "Connecticut",
    region: "NYC Metro",
    heroTitle: "Marketing Agency in Fairfield County, CT",
    description:
      "Marketing agency serving Fairfield County, CT. Web design, SEO, paid ads for businesses in Stamford, Danbury, Norwalk, Greenwich, and Westport.",
    towns: [
      "Danbury",
      "Stamford",
      "Norwalk",
      "Bridgeport",
      "Fairfield",
      "Westport",
      "Ridgefield",
      "New Canaan",
      "Greenwich",
      "Shelton",
    ],
    content: {
      intro:
        "Fairfield County is where New England meets New York, and the business landscape reflects that blend. Stamford has become a legitimate corporate hub with Fortune 500 companies and a growing startup scene. Greenwich and Westport attract an affluent clientele that expects premium everything, including their digital experiences. Danbury and Norwalk have thriving small business communities serving both locals and commuters. Bridgeport is one of the most underrated markets in CT, with real opportunity for businesses willing to invest in their online presence. We help Fairfield County businesses compete and win in this sophisticated market.",
      whyLocal:
        "The Fairfield County market is affluent, educated, and digitally savvy. Your customers are comparing you to competitors before they ever pick up the phone. That means your website needs to be flawless, your Google presence needs to be dominant, and your ads need to be targeted precisely. We know that a homeowner in Greenwich has different expectations than a family in Shelton. We know that Stamford professionals search differently than Ridgefield residents. And we build strategies that account for those differences instead of treating all of Fairfield County like one homogeneous market.",
      closing:
        "Fairfield County businesses operate in one of the most demanding markets in the Northeast. We deliver marketing that meets those high standards without the inflated price tag of a Stamford or Greenwich agency.",
    },
    keywords: [
      "marketing agency Fairfield County CT",
      "digital marketing Stamford CT",
      "SEO services Danbury CT",
      "web design Fairfield County Connecticut",
      "advertising agency Greenwich CT",
      "social media marketing Norwalk CT",
      "marketing company Westport CT",
      "local SEO Fairfield County",
      "PPC advertising Stamford Connecticut",
      "website design Bridgeport CT",
    ],
  },

  // ── South Florida ──────────────────────────────────────────────
  {
    slug: "broward-county-fl",
    name: "Broward County, FL",
    state: "Florida",
    region: "South Florida",
    heroTitle: "Marketing Agency in Broward County, FL",
    description:
      "Marketing agency serving Broward County, FL. Web design, SEO, paid ads for businesses in Fort Lauderdale, Hollywood, Coral Springs, and beyond.",
    towns: [
      "Fort Lauderdale",
      "Hollywood",
      "Pompano Beach",
      "Coral Springs",
      "Plantation",
      "Davie",
      "Sunrise",
      "Weston",
      "Deerfield Beach",
      "Margate",
    ],
    content: {
      intro:
        "Broward County is one of the fastest growing business markets in Florida, and the competition reflects it. Fort Lauderdale has evolved way beyond spring break into a serious business hub with a booming tech and marine industry. Hollywood has the Broadwalk, a growing arts scene, and a restaurant market that keeps expanding. Coral Springs and Weston attract families and the professional service businesses that serve them. We work with Broward County businesses that want real marketing results, not the flashy promises and empty deliverables that too many South Florida agencies are known for.",
      whyLocal:
        "South Florida marketing is its own animal. The population is incredibly diverse, bilingual in many areas, and the seasonal tourist traffic creates opportunities that most agencies completely ignore. We know that Fort Lauderdale Beach businesses need different strategies than those on Commercial Boulevard. We know that Weston families search for services differently than Pompano Beach residents. And we understand the snowbird cycle and how to adjust your marketing budget and messaging throughout the year to maximize every dollar.",
      closing:
        "Broward County businesses are competing in one of the hottest markets in the country. We bring Hudson Valley grit and South Florida hustle together to build marketing that actually moves your business forward.",
    },
    keywords: [
      "marketing agency Broward County FL",
      "digital marketing Fort Lauderdale FL",
      "SEO services Coral Springs FL",
      "web design Broward County Florida",
      "advertising agency Hollywood FL",
      "social media marketing Plantation FL",
      "marketing company Weston FL",
      "local SEO Broward County",
      "PPC advertising Fort Lauderdale",
      "website design Pompano Beach FL",
    ],
  },
  {
    slug: "miami-dade-county-fl",
    name: "Miami Dade County, FL",
    state: "Florida",
    region: "South Florida",
    heroTitle: "Marketing Agency in Miami Dade County, FL",
    description:
      "Marketing agency for Miami Dade County businesses. SEO, web design, paid ads, and social media for Miami, Coral Gables, Doral, Brickell, and more.",
    towns: [
      "Miami",
      "Miami Beach",
      "Coral Gables",
      "Doral",
      "Hialeah",
      "Aventura",
      "Brickell",
      "Wynwood",
      "Kendall",
      "Homestead",
    ],
    content: {
      intro:
        "Miami is not just a city, it is a brand. And marketing in Miami Dade County means understanding how to cut through an insane amount of noise. Brickell is packed with finance and tech companies all fighting for visibility. Wynwood has become an international arts and culture destination. Coral Gables attracts luxury brands and high end service businesses. Doral is the business gateway to Latin America. And Hialeah has one of the most entrepreneurial communities in the entire country. We help Miami Dade businesses build marketing strategies that are as ambitious and dynamic as the market itself.",
      whyLocal:
        "Miami Dade is the most multicultural market in the United States, and your marketing needs to reflect that. Bilingual campaigns are not optional here, they are table stakes. We build strategies that account for the Spanish speaking market in Hialeah, the luxury buyer in Coral Gables, the tech crowd in Brickell, and the tourist traffic on South Beach. We know that Wynwood businesses thrive on Instagram while a law firm in Kendall needs to dominate Google. That is the level of nuance you need, and it is what we deliver.",
      closing:
        "Miami does not reward generic marketing. The businesses that win here are the ones with strategies built specifically for this market. We are ready to build yours.",
    },
    keywords: [
      "marketing agency Miami FL",
      "digital marketing Miami Dade County",
      "SEO services Miami Beach FL",
      "web design Coral Gables FL",
      "advertising agency Brickell Miami",
      "social media marketing Wynwood FL",
      "marketing company Doral FL",
      "local SEO Miami Dade County",
      "PPC advertising Miami Florida",
      "website design Hialeah FL",
    ],
  },
  {
    slug: "palm-beach-county-fl",
    name: "Palm Beach County, FL",
    state: "Florida",
    region: "South Florida",
    heroTitle: "Marketing Agency in Palm Beach County, FL",
    description:
      "Marketing agency serving Palm Beach County, FL. SEO, web design, paid ads for businesses in West Palm Beach, Boca Raton, Delray Beach, and Jupiter.",
    towns: [
      "West Palm Beach",
      "Boca Raton",
      "Delray Beach",
      "Boynton Beach",
      "Jupiter",
      "Palm Beach Gardens",
      "Lake Worth",
      "Royal Palm Beach",
      "Wellington",
      "Riviera Beach",
    ],
    content: {
      intro:
        "Palm Beach County stretches from Jupiter all the way down to Boca Raton, and every market along that corridor has its own personality. West Palm Beach has transformed its downtown into one of the most vibrant business districts in South Florida with Clematis Street and the waterfront driving foot traffic. Boca Raton is a hub for tech companies, corporate offices, and upscale retail. Delray Beach has Atlantic Avenue, one of the best Main Streets in America. Jupiter attracts sports and outdoor lifestyle brands. We work with Palm Beach County businesses that understand their market is special and want marketing that reflects it.",
      whyLocal:
        "Palm Beach County buyers have high expectations. They are used to premium experiences, and your online presence needs to match. We know that a medical practice in Boca Raton needs a completely different web presence than a surf shop in Jupiter. We know that Wellington equestrian businesses have a global audience during season. We know that Delray Beach restaurants live and die by their weekend visibility. And we build marketing strategies that account for all of it, from the snowbird influx in November to the slower summer months when locals become your bread and butter.",
      closing:
        "Palm Beach County is full of opportunity for businesses that market themselves the right way. We bring strategy, execution, and a no nonsense approach that helps you win without burning through your budget.",
    },
    keywords: [
      "marketing agency Palm Beach County FL",
      "digital marketing West Palm Beach FL",
      "SEO services Boca Raton FL",
      "web design Palm Beach County Florida",
      "advertising agency Delray Beach FL",
      "social media marketing Jupiter FL",
      "marketing company Palm Beach Gardens FL",
      "local SEO Palm Beach County",
      "PPC advertising Boca Raton",
      "website design West Palm Beach Florida",
    ],
  },
];

export function getCountyBySlug(slug: string): CountyArea | undefined {
  return countyAreas.find((county) => county.slug === slug);
}

export function getAllCountySlugs(): string[] {
  return countyAreas.map((county) => county.slug);
}
