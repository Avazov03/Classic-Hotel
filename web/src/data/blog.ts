const CDN_POST =
  "https://cdn.prod.website-files.com/693106e31a556f4c90b2ff6a";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category?: string;
  author?: string;
  body: string[];
};

const sharedBodyBlocks = [
  "FROM LUXURIOUS ROOMS TO HIDDEN LOCAL GEMS OUR BLOG SHARES STORIES AND INSIGHTS THAT TRANSFORM EVERY HOTEL STAY INTO A LASTING MEMORY",
  "DIVE INTO STORIES INSIGHTS AND TIPS THAT CONNECT STRATEGY INSPIRATION AND EMOTION FOR UNFORGETTABLE EXPERIENCES",
  "DISCOVER STORIES, TIPS, AND INSIGHTS THAT REVEAL THE HEART OF HOSPITALITY AND MAKE EVERY HOTEL STAY TRULY MEMORABLE",
];

export const blogPosts: BlogPost[] = [
  {
    slug: "creating-memorable-stays-through-genuine-hospitality",
    title: "Creating Memorable Stays Through Genuine Hospitality",
    excerpt:
      "Curated stories and insider insights reveal thoughtful design, warm service, refined dining, and local experiences that turn every hotel stay into a lasting memory.",
    image: `${CDN_POST}/695b3bb9394b4ab580c6adae_image-Picsart-AiImageEnhancer%20(7)%201%20(2).webp`,
    date: "January 21, 2026",
    category: "Food menu",
    author: "Lincoln Donin",
    body: [
      "EXPLORE THE STORIES AND INSIGHTS THAT REVEAL WHAT MAKES EVERY HOTEL STAY TRULY UNFORGETTABLE",
      ...sharedBodyBlocks,
    ],
  },
  {
    slug: "making-every-business-event-smooth-and-memorable",
    title: "Making Every Business Event Smooth and Memorable",
    excerpt:
      "Explore behind-the-scenes stories highlighting elegant rooms, attentive service, and local discoveries that transform simple stays into unforgettable experiences.",
    image: `${CDN_POST}/695b3bc626bdde8ccb66ede0_image-Picsart-AiImageEnhancer%20(5)%201%20(2).webp`,
    date: "January 21, 2026",
    category: "Hotel event",
    author: "Aspen Stanton",
    body: [
      "UNCOVER THE STORIES AND INSIGHTS THAT REVEAL WHAT MAKES EVERY HOTEL STAY TRULY UNFORGETTABLE",
      ...sharedBodyBlocks,
    ],
  },
  {
    slug: "indulge-in-luxurious-rooms-with-panoramic-sea-views",
    title: "Indulge in luxurious rooms with panoramic sea views",
    excerpt:
      "Discover inspiring hotel stories that showcase refined comfort, personalized service, and local charm, creating meaningful stays guests remember long after.",
    image: `${CDN_POST}/695b3bd55fed08c9b8eee002_image%20511%20(2).webp`,
    date: "January 21, 2026",
    category: "Travel hotel",
    author: "Alena Lipshutz",
    body: [
      "DISCOVER THE STORIES AND INSIGHTS THAT REVEAL WHAT MAKES EVERY HOTEL STAY TRULY UNFORGETTABLE",
      ...sharedBodyBlocks,
    ],
  },
  {
    slug: "a-taste-journey-through-our-hotels-finest-culinary-creations",
    title: "A taste journey through our hotel’s finest culinary creations",
    excerpt:
      "Insightful stories reveal the details behind exceptional stays, from stylish rooms and fine dining to thoughtful service and authentic local moments.",
    image: `${CDN_POST}/695b3be980836a102f8ce989_image-Picsart-AiImageEnhancer%20(4)%201%20(2).webp`,
    date: "January 21, 2026",
    category: "Tasty food",
    author: "Gustavo Dias",
    body: [
      "EXPLORE THE STORIES AND INSIGHTS THAT REVEAL WHAT MAKES EVERY HOTEL STAY TRULY UNFORGETTABLE",
      "FROM LUXURIOUS ROOMS TO HIDDEN LOCAL GEMS OUR BLOG SHARES STORIES AND INSIGHTS THAT TRANSFORM EVERY HOTEL STAY INTO A LASTING M",
      sharedBodyBlocks[1],
      sharedBodyBlocks[2],
    ],
  },
  {
    slug: "open-the-door-to-roomy-living-made-for-whatever-you-want",
    title: "Open the door to roomy living made for whatever you want",
    excerpt:
      "Step into curated hotel stories that celebrate comfort, creativity, and care, revealing how thoughtful details elevate every stay into a memorable journey.",
    image: `${CDN_POST}/695b3c069765b079b0346bc5_pexels-ahmetcotur-31817153-Picsart-AiImageEnhancer%201%20(2).webp`,
    date: "January 21, 2026",
    category: "Weekend holiday",
    author: "Emerson Dokidis",
    body: [
      "DISCOVER THE STORIES AND INSIGHTS THAT REVEAL WHAT MAKES EVERY HOTEL STAY TRULY UNFORGETTABLE",
      ...sharedBodyBlocks,
    ],
  },
  {
    slug: "enjoy-a-vacation-that-feels-like-a-touch-of-heaven",
    title: "Enjoy a vacation that feels like a touch of heaven",
    excerpt:
      "Uncover hospitality stories that highlight elegant design, inspired dining, and personal service, turning everyday visits into truly unforgettable stays.",
    image: `${CDN_POST}/695b3c1cd763a2a11296bdef_image-Picsart-AiImageEnhancer%20(2)%201%20(2).webp`,
    date: "January 21, 2026",
    author: "Emerson Dokidis",
    body: [
      "EXPLORE THE STORIES AND INSIGHTS THAT REVEAL WHAT MAKES EVERY HOTEL STAY TRULY UNFORGETTABLE",
      ...sharedBodyBlocks,
    ],
  },
  {
    slug: "crafting-special-events-that-turn-into-memories-youll-treasure",
    title: "Crafting special events that turn into memories you’ll treasure",
    excerpt:
      "Journey through hotel stories that blend refined spaces, warm service, and local culture, showing what makes every stay feel special and lasting.",
    image: `${CDN_POST}/695b3c31ae117b4f685d4e3d_image-Picsart-AiImageEnhancer%20(3)%201%20(2).webp`,
    date: "January 21, 2026",
    body: [
      "UNCOVER THE STORIES AND INSIGHTS THAT REVEAL WHAT MAKES EVERY HOTEL STAY TRULY UNFORGETTABLE",
      ...sharedBodyBlocks,
    ],
  },
  {
    slug: "discover-the-latest-menu-updates-coming-this-march",
    title: "Discover the latest menu updates coming this March",
    excerpt:
      "Explore stories that capture the art of hospitality, from beautifully designed rooms to local experiences that leave a lasting impression on every guest.",
    image: `${CDN_POST}/695b3c409f475ee318c50c0d_image-Picsart-AiImageEnhancer%20(1)%201%20(2).webp`,
    date: "January 21, 2026",
    body: [
      "DISCOVER THE STORIES AND INSIGHTS THAT REVEAL WHAT MAKES EVERY HOTEL STAY TRULY UNFORGETTABLE",
      ...sharedBodyBlocks,
    ],
  },
  {
    slug: "the-april-issue-of-travel-magazine-featured-elbergo-hotel",
    title: "The April issue of Travel Magazine featured Classic Hotel",
    excerpt:
      "Behind every stay is a story of comfort, care, and detail—discover insights that reveal how hotels create meaningful and memorable experiences.",
    image: `${CDN_POST}/695b3c537b6f44e4fa4251e6_image-Picsart-AiImageEnhancer%201%20(2).webp`,
    date: "January 21, 2026",
    body: [
      "EXPLORE THE STORIES AND INSIGHTS THAT REVEAL WHAT MAKES EVERY HOTEL STAY TRULY UNFORGETTABLE",
      ...sharedBodyBlocks,
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
