const CDN =
  "https://cdn.prod.website-files.com/6927ddcc377dce6e20188e35";

export type PageIntro = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  intro: string;
  image: string;
  metaDescription: string;
};

export const pageIntros = {
  about: {
    eyebrow: "Years of experience",
    title: "Welcome to Your Perfect Stay",
    subtitle:
      "Your comfort is our mission and every moment is crafted to make you feel truly at home",
    intro:
      "Classic Hotel is built on comfort, care and trust, offering thoughtfully designed stays with genuine hospitality and a commitment to guest satisfaction.",
    image: `${CDN}/69452c5ad14c210fde417f7d_6e8b8f07617e02360fd36671319429eb_about-banner-image.webp`,
    metaDescription:
      "Classic Hotel is built on comfort, care and trust, offering thoughtfully designed stays with genuine hospitality and a commitment to guest satisfaction.",
  },
  rooms: {
    title: "Our Rooms",
    subtitle: "Sleep in Pure Comfort",
    intro:
      "Explore Classic Hotel rooms designed for comfort and style, featuring modern interiors, cozy bedding and essential amenities for a restful stay.",
    image: `${CDN}/694e312f0951a14b785ffd15_e568dbb1f01f309400cbfb4d237ffe6a_room-page-banner-image.webp`,
    metaDescription:
      "Explore Classic Hotel rooms designed for comfort and style, featuring modern interiors, cozy bedding and essential amenities for a restful stay.",
  },
  amenities: {
    eyebrow: "About Amenities",
    title: "Exceptional Amenities for Every Guest",
    intro:
      "Luxury at its peak Enjoy world class spas and exquisite dining. Discover amenities designed for comfort, featuring modern facilities, thoughtful services and convenient features for a relaxed hotel stay.",
    image: `${CDN}/69527b3a5274ffb6de3d0349_image%20447-Picsart-AiImageEnhancer%201%20(1).webp`,
    metaDescription:
      "Discover Classic Hotel amenities designed for comfort, featuring modern facilities, thoughtful services and convenient features for a relaxed hotel stay.",
  },
  banquet: {
    title: "Elegant Banquet Spaces",
    intro:
      "Host memorable events at Classic Hotel Banquet with elegant spaces, modern facilities and attentive service perfect for weddings and gatherings.",
    image: `${CDN}/6954dfb0643940014e8d7c27_image%20453-Picsart-AiImageEnhancer%201%20(1).webp`,
    metaDescription:
      "Host memorable events at Classic Hotel Banquet with elegant spaces, modern facilities and attentive service perfect for weddings and gatherings.",
  },
  spa: {
    title: "Rejuvenate Your Mind Body and Soul",
    subtitle:
      "Crafting wellness experiences that restore balance and inner calm",
    intro:
      "Unwind at the Classic Hotel Spa with soothing treatments, calming spaces and expert care designed to refresh your body and restore inner balance.",
    image: `${CDN}/6953b6cbe9d3fb1df0e77f56_5a6f785dfa85045b71d807cfaff4a76a_spa-banner-image.webp`,
    metaDescription:
      "Unwind at the Classic Hotel Spa with soothing treatments, calming spaces and expert care designed to refresh your body and restore inner balance.",
  },
  restaurant: {
    eyebrow: "About the service",
    title: "Delicious Food Served with Style",
    intro:
      "A refined dining experience shaped by exceptional flavor and taste. Dine at Classic Hotel Restaurant offering flavorful cuisine, fresh ingredients and a warm ambience for relaxed and enjoyable dining experiences.",
    image: `${CDN}/6954e9698b2e3670bc6d4911_image%20490-Picsart-AiImageEnhancer%20(1)%201%20(1).webp`,
    metaDescription:
      "Dine at Classic Hotel Restaurant offering flavorful cuisine, fresh ingredients and a warm ambience for relaxed and enjoyable dining experiences.",
  },
  blog: {
    title: "Explore Our Blogs",
    intro:
      "Explore the Classic Hotel Blog for travel tips, hotel insights and hospitality stories designed to inspire better stays and memorable experiences.",
    image: `${CDN}/695645e0708c845e290a1f9e_image%20508-Picsart-AiImageEnhancer%201%20(1).webp`,
    metaDescription:
      "Explore the Classic Hotel Blog for travel tips, hotel insights and hospitality stories designed to inspire better stays and memorable experiences.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Start the Conversation",
    subtitle: "Contact Us",
    intro:
      "Have questions or need assistance? Contact our team for prompt support with bookings, amenities, dining, or special requests.",
    image: `${CDN}/6954b29b8505845a7463cc60_image%20506-Picsart-AiImageEnhancer%201%20(1).webp`,
    metaDescription:
      "Contact Classic Hotel to connect with our team for reservations, services or general questions. We’re here to assist you with ease.",
  },
} satisfies Record<string, PageIntro>;

export const aboutFeatures = [
  {
    title: "Thoughtful hospitality",
    body: "Every stay is shaped by attentive service, calm spaces, and details that help guests feel genuinely welcome from arrival to departure.",
  },
  {
    title: "Designed for comfort",
    body: "Rooms, lounges, and shared spaces balance refined design with practical comfort so business and leisure travelers feel at ease.",
  },
  {
    title: "Locally rooted",
    body: "From dining to recommendations, we connect guests with the character of the city while keeping the hotel experience effortless.",
  },
];

export const amenityItems = [
  {
    title: "Wellness & Spa",
    body: "Calming treatments and quiet spaces designed to restore energy after travel or a full day in the city.",
  },
  {
    title: "Fitness studio",
    body: "Modern equipment and flexible hours so guests can keep their routine without leaving the hotel.",
  },
  {
    title: "Pool & terrace",
    body: "A place to unwind outdoors with poolside seating and an easy transition between rest and leisure.",
  },
  {
    title: "Concierge support",
    body: "Help with bookings, transfers, dining reservations, and special requests whenever you need it.",
  },
  {
    title: "Business ready",
    body: "High-speed Wi-Fi, meeting-friendly corners, and quiet work spaces for productive stays.",
  },
  {
    title: "Family friendly",
    body: "Flexible room setups and thoughtful extras that make traveling with children smoother.",
  },
];

export const banquetHighlights = [
  "Weddings and receptions",
  "Corporate meetings",
  "Private celebrations",
  "Workshops and retreats",
  "Modern AV support",
  "Custom catering menus",
];

export const spaTreatments = [
  {
    title: "Signature massage",
    body: "A restorative full-body treatment focused on easing tension and deepening relaxation.",
  },
  {
    title: "Facial rituals",
    body: "Skin-renewing facials crafted to refresh, hydrate, and leave you glowing after travel.",
  },
  {
    title: "Couple wellness",
    body: "Shared spa moments designed for connection, calm, and unhurried time together.",
  },
  {
    title: "Body therapies",
    body: "Scrubs and wraps that revive tired muscles and restore a sense of lightness.",
  },
];

export const restaurantHighlights = [
  "Seasonal menus",
  "Fresh local ingredients",
  "Signature fine dining",
  "Breakfast included options",
  "Private dining rooms",
  "Cocktail lounge",
];
