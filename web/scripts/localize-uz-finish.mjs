/**
 * Yakuniy o‘zbekcha pass — qolgan EN matnlar, buzilgan yarim-tarjimalar, kontaktlar.
 * Run: node scripts/localize-uz-finish.mjs
 */
import fs from "fs";
import path from "path";

const root = path.resolve("src");

const CONTACT_FIXES = [
  [
    "50 Raffles Place, #32-01, Singapore 048623",
    "Toshkent shahri, Sayilgoh ko‘chasi, 35-uy, TDYU 4-o‘quv binosi, Kovorking markazi",
  ],
  [
    "123 Green Avenue, New York, NY 10001, United States",
    "Huquqiy texnologiyalar va sun’iy intellekt laboratoriyasi MChJ",
  ],
  [
    "410 Sandtown, California 94001,USA",
    "Toshkent shahri, Sayilgoh ko‘chasi, 35-uy, TDYU 4-o‘quv binosi, Kovorking markazi",
  ],
  [
    "410 Sandtown, California 94001, USA",
    "Toshkent shahri, Sayilgoh ko‘chasi, 35-uy, TDYU 4-o‘quv binosi, Kovorking markazi",
  ],
];

/** Buzilgan yarim-tarjimalar va qolgan EN — uzunroq birinchi. */
const PHRASES = [
  // Broken hybrids
  [
    "Sizning qulayligingiz — bizning maqsadimiz and every moment is crafted to make you feel truly at home",
    "Sizning qulayligingiz — bizning maqsadimiz; har bir lahza o‘zingizni uyda his qilishingiz uchun yaratilgan",
  ],
  [
    "Have questions or need assistance? Aloqa our team for prompt support with bookings, amenities, dining, or special requests",
    "Savollaringiz bormi? Bron, qulayliklar, ovqatlanish yoki maxsus so‘rovlar bo‘yicha jamoamizga murojaat qiling",
  ],
  [
    "Need more information before planning your stay or event? Yuborish a request and our dedicated team will provide clear details and personalized guidance",
    "Dam olish yoki tadbirni rejalashtirishdan oldin ko‘proq ma’lumot kerakmi? So‘rov yuboring — jamoamiz aniq javob beradi",
  ],
  [
    "Exceptional Qulayliklar for Every Guest",
    "Har bir mehmon uchun a’lo qulayliklar",
  ],
  ["About Qulayliklar", "Qulayliklar haqida"],
  ["Hotel Qulayliklar :", "Mehmonxona qulayliklari :"],
  ["Our Xonalar", "Bizning xonalar"],
  ["Our Imkoniyatlar", "Bizning imkoniyatlar"],
  ["Our related blog maqola", "Tegishli blog maqolalari"],
  ["Customizable Menyu Options", "Moslashtiriladigan menyu"],
  [
    "A refined ovqatlanish tajribasi shaped by exceptional flavor and taste",
    "Ajoyib ta’m va nafislik bilan shakllangan ovqatlanish tajribasi",
  ],
  [
    "Enjoy an elevated ovqatlanish tajribasi defined by exceptional flavor, quality ingredients, and expert craftsmanship. Our chefs craft each dish with passion, ensuring every bite is memorable, sophisticated, and uniquely delicious for every guest",
    "Yuqori sifatli mahsulotlar, ajoyib ta’m va ustalik bilan yaratilgan ovqatlanish tajribasi. Oshpazlarimiz har bir taomni ishtiyoq bilan tayyorlaydi — har bir luqma unutilmas bo‘ladi",
  ],
  [
    "Experience the luxury of our Ijrochi lyuks, designed for guests who appreciate space, style, and comfort. Enjoy elegant interiors, premium furnishings, and modern amenities that elevate your stay. With a relaxing living area and refined ambiance, it’s the perfect retreat for business travelers or anyone seeking an exceptional getaway",
    "Ijrochi lyuksimiz — kenglik, uslub va qulaylikni qadrlaydigan mehmonlar uchun. Nafis interyer, premium jihozlar va zamonaviy qulayliklar dam olishingizni yuksaltiradi. Biznes yoki maxsus dam olish uchun ideal tanlov",
  ],
  [
    "Discover the elegance of our Ijrochi lyuks, designed to offer generous space, refined décor, and premium amenities. With a stylish living area and calming atmosphere, it’s ideal for business travelers or anyone seeking a sophisticated and memorable stay",
    "Ijrochi lyuks — keng maydon, nafis bezak va premium qulayliklar. Zamonaviy yashash zonasi va osoyishta muhit biznes mehmonlari yoki nafis dam olish izlovchilar uchun mos",
  ],
  [
    "Kirish starts at 2 PM, and check-out is by 12 PM. Early or late options are subject to availability.",
    "Kirish soat 14:00 dan, chiqish soat 12:00 gacha. Erta/kech variantlar mavjudlikka bog‘liq.",
  ],
  [
    "Jamoamiz anticipates your needs, delivering personalized service for a smooth, enjoyable stay",
    "Jamoamiz ehtiyojlaringizni oldindan bilib, silliq va yoqimli dam olish uchun shaxsiy xizmat ko‘rsatadi",
  ],
  [
    "Step into our curated stories and insider insights that highlight chinakam mehmondo‘stlik. O‘ylab bezatilgan xonalar va ilhomli ovqatlanishdan e’tiborli xizmat va mahalliy tajribalargacha kashf eting: what makes every stay not only relaxing, but unforgettable, turning moments into experiences you’ll remember forever",
    "Tanlangan hikoyalar va ichki ma’lumotlar orqali chinakam mehmondo‘stlikni his eting. O‘ylab bezatilgan xonalar, ilhomli ovqatlanish, e’tiborli xizmat va mahalliy tajribalar — har bir dam olishni unutilmas qiladi",
  ],

  // Form / FAQ / contact
  ["Rahmat! Your submission has been received!", "Rahmat! So‘rovingiz qabul qilindi!"],
  [
    "Xato! Something went wrong while submitting the form.",
    "Xato! Formani yuborishda muammo yuz berdi.",
  ],
  ["Book Now", "Hozir bron qiling"],
  ["submit now", "Hozir yuborish"],
  ["Answers to Common Questions About Your Stay", "Dam olish bo‘yicha tez-tez so‘raladigan savollar"],
  [
    "01.  How do I make or modify a reservation?",
    "01.  Bronni qanday qilaman yoki o‘zgartiraman?",
  ],
  [
    "You can book or update reservations online through our website or contact our support team for quick assistance anytime.",
    "Bronni saytimiz orqali onlayn qilishingiz yoki yangilashingiz mumkin — qo‘llab-quvvatlash jamoasi har doim yordam beradi.",
  ],
  ["03.  Can I cancel or change my booking?", "03.  Bronni bekor qilish yoki o‘zgartirish mumkinmi?"],
  [
    "Yes, bookings can be canceled or modified based on the selected rate plan and cancellation policy.",
    "Ha, tanlangan tarif va bekor qilish qoidalariga qarab bronni o‘zgartirish yoki bekor qilish mumkin.",
  ],
  ["04.  What are the check-in and check-out times?", "04.  Kirish va chiqish vaqtlari qanday?"],
  ["05.  What room types are available?", "05.  Qanday xona turlari mavjud?"],
  [
    "We offer a range of rooms including standard, deluxe, and suites designed for comfort and convenience.",
    "Standart, deluxe va lyuks xonalar — qulaylik va qulay joylashuv uchun mo‘ljallangan.",
  ],
  ["07.  Is housekeeping available daily?", "07.  Kunlik xona tozalash bormi?"],
  [
    "Yes, daily housekeeping is provided to maintain cleanliness and ensure a pleasant stay throughout.",
    "Ha, kunlik xona tozalash xizmati mavjud — tozalik va yoqimli dam olish uchun.",
  ],
  ["08.  Is Wi-Fi available and is it complimentary?", "08.  Wi-Fi bormi va bepulmi?"],
  [
    "Complimentary high-speed Wi-Fi is available in all rooms and public areas for guest convenience.",
    "Barcha xonalar va umumiy joylarda bepul yuqori tezlikdagi Wi-Fi mavjud.",
  ],
  [
    "We accept major credit cards, debit cards, and select digital payments to ensure a smooth and secure transaction.",
    "Asosiy kredit/debit kartalar va ba’zi raqamli to‘lovlar qabul qilinadi.",
  ],
  [
    "Extra beds or cribs are available on request and may incur additional charges depending on availability.",
    "Qo‘shimcha karavot yoki bolalar karavoti so‘rov bo‘yicha — mavjudlikka qarab qo‘shimcha to‘lov bo‘lishi mumkin.",
  ],
  [
    "I accept all terms and conditions for this booking.",
    "Ushbu bron uchun barcha shart va qoidalarga roziman.",
  ],
  ["I accept all terms and conditions for this booking.", "Ushbu bron uchun barcha shart va qoidalarga roziman."],
  ["Check in time :", "Kirish vaqti :"],
  ["Check out time :", "Chiqish vaqti :"],
  ["at check-in for all guests", "barcha mehmonlar uchun kirishda"],
  ["Room details", "Xona tafsilotlari"],
  ["Reviews and ratings", "Sharhlar va baholar"],
  ["parking area :", "Avtoturargoh :"],

  // Chrome / menu
  ["2025 Best hospitality of the year", "2025-yilning eng yaxshi mehmondo‘stligi"],
  [
    "Our support team is available 24/7 to assist with bookings, inquiries, and special requests anytime you need help",
    "Qo‘llab-quvvatlash jamoamiz 24/7 bron, savol va maxsus so‘rovlar bo‘yicha yordam beradi",
  ],

  // About
  [
    "We are dedicated to delivering honest, reliable, and high-quality service that puts our customers first. With years of experience, we focus on building trust through transparency, professionalism, and genuine care in every interaction",
    "Halol, ishonchli va yuqori sifatli xizmat — mijozlarimiz birinchi o‘rinda. Ko‘p yillik tajriba bilan ishonch, shaffoflik va chinakam g‘amxo‘rlikni har bir muloqotda yaratamiz",
  ],
  ["Read Our Story", "Hikoyamizni o‘qing"],
  ["Our Values", "Qadriyatlarimiz"],
  [
    "Honesty care and dedication guide every experience we create here",
    "Halollik, g‘amxo‘rlik va fidoyilik — bu yerda yaratilgan har bir tajribaning asosi",
  ],
  ["Service Excellence", "Xizmat mukammalligi"],
  ["A team dedicated to your best stay", "Eng yaxshi dam olishingiz uchun bag‘ishlangan jamoa"],
  ["Warm Hospitality", "Iliq mehmondo‘stlik"],
  ["We welcome every guest with genuine care", "Har bir mehmonni chinakam g‘amxo‘rlik bilan kutib olamiz"],
  ["Quality &amp; Comfort", "Sifat va qulaylik"],
  ["Modern spaces built for comfort", "Qulaylik uchun yaratilgan zamonaviy maydonlar"],
  ["View Our Hotel", "Mehmonxonamizni ko‘ring"],
  ["Secure Parking for Guest Comfort", "Mehmonlar uchun xavfsiz avtoturargoh"],
  ["Affordable luxury", "Hamyonbop hashamat"],
  ["Happy Guests", "Baxtli mehmonlar"],
  [
    "Guests prefer us for our reliable comfort, thoughtful service, and truly caring hospitality",
    "Mehmonlar ishonchli qulaylik, e’tiborli xizmat va chinakam mehmondo‘stlik uchun bizni tanlaydi",
  ],
  [
    "Offering warm, dependable, memorable stays with steady comfort and quality guests can trust each year",
    "Har yili ishonch bildiradigan iliq, barqaror va unutilmas dam olish",
  ],
  [
    "Experience thoughtful facilities built for comfort and relaxation",
    "Qulaylik va dam olish uchun o‘ylab yaratilgan imkoniyatlar",
  ],
  [
    "Enjoy stylish comfort and premium amenities at an affordable price luxury made accessible",
    "Uslubli qulaylik va premium qulayliklar — hamyonbop narxda",
  ],
  ["Years of Hospitality", "Mehmondo‘stlik yillari"],
  ["Find Out More", "Batafsil"],
  ["Start Relaxing", "Dam olishni boshlang"],

  // Amenities
  [
    "Luxury at its peak Enjoy world class spas and exquisite dining",
    "Hashamat cho‘qqisida — jahon darajasidagi SPA va nafis ovqatlanish",
  ],
  [
    "A calm space for yoga and mindful meditation to refresh body and soul.",
    "Tana va ruhni yangilash uchun yoga va meditatsiya makoni.",
  ],
  ["Car Rental Service", "Avtomobil ijarasi"],
  [
    "Hassle-free car rental service for smooth and comfortable travel.",
    "Silliq va qulay sayohat uchun muammosiz avtomobil ijarasi.",
  ],
  ["Ironing Service", "Dazmollash xizmati"],
  [
    "Professional ironing service to keep your clothes crisp and ready anytime",
    "Kiyimlaringiz doimo tekis va tayyor bo‘lishi uchun professional dazmollash",
  ],
  [
    "Host memorable events in our stylish halls with modern facilities and support",
    "Zamonaviy imkoniyatli uslubli zallarimizda unutilmas tadbirlar o‘tkazing",
  ],
  [
    "24/7 doctor on call service to ensure your health and peace of mind",
    "Sog‘ligingiz uchun 24/7 shifokor chaqirish xizmati",
  ],
  [
    "A perfect place to relax and play with friends and family indoors",
    "Do‘stlar va oila bilan dam olish va o‘ynash uchun ideal ichki makon",
  ],
  [
    "Dive into pure luxury Experience serenity at our iconic infinity pool",
    "Sof hashamat — mashhur cheksiz basseynimizda osoyishtalikni his eting",
  ],
  [
    "Unwind where the water meets the sky. Enjoy breathtaking views, heated waters, and signature poolside service in a sanctuary of calm",
    "Suv osmon bilan uchrashadigan joyda dam oling. Manzara, isitilgan suv va basseyn yonidagi maxsus xizmat",
  ],
  ["Late-night dining", "Kechki ovqatlanish"],
  [
    "Enjoy delicious meals and snacks served late into the night, perfect for midnight cravings or after a long day out.",
    "Kechga qadar mazali taom va gazaklar — tungi ishtaha yoki uzoq kundagi dam olishdan keyin.",
  ],
  [
    "Explore elegant spaces with carefully curated amenities that offer effortless comfort and timeless style",
    "Oson qulaylik va zamonaviy uslub beradigan nafis maydonlarni kashf eting",
  ],
  [
    "Where little guests feel at home and big smiles are guaranteed",
    "Kichik mehmonlar o‘zini uyda his qiladi — katta tabassum kafolatlangan",
  ],
  [
    "Making every guest’s experience truly unforgettable",
    "Har bir mehmon tajribasini chinakam unutilmas qilish",
  ],
  [
    "Our hotel is designed with families in mind, offering kid-friendly rooms, fun activities, and thoughtful amenities that make little guests feel at home. From playful spaces to engaging experiences, every detail is crafted to ensure smiles, laughter, and unforgettable family memories during your stay",
    "Mehmonxonamiz oilalar uchun: bola-do‘stona xonalar, qiziqarli mashg‘ulotlar va kichik mehmonlar uchun o‘ylab topilgan qulayliklar. Har bir detal tabassum va oilaviy xotiralar uchun",
  ],
  ["Pool Guest Guidelines &amp; Rules :", "Basseyn mehmonlari uchun qoidalar :"],
  ["Open daily from 6:00 AM to 10:00 PM", "Har kuni soat 06:00–22:00 ochiq"],
  [
    "Light snacks and beverages are available at the poolside cafe.",
    "Basseyn yonidagi kafeda yengil gazak va ichimliklar mavjud.",
  ],
  ["Kid friendly", "Bolalar uchun qulay"],
  ["Experience Luxury", "Hashamatni his eting"],
  ["Elite Spa Retreat", "Elite SPA dam olishi"],
  ["Experience serene luxury and wellness in every thoughtfully crafted treatment", "Har bir muolajada osoyishta hashamat va sog‘lomlik"],
  ["Carefully selected amenities designed to deliver a refined and comfortable stay", "Nafis va qulay dam olish uchun tanlangan qulayliklar"],
  [
    "Elegant venues and thoughtful amenities come together to create timeless wedding memories",
    "Nafis maydonlar va o‘ylab topilgan qulayliklar — unutilmas to‘y xotiralari",
  ],
  ["Where exceptional service meets unmatched comfort", "A’lo xizmat va tengsiz qulaylik uyg‘unligi"],
  ["Well-appointed guest rooms", "Yaxshi jihozlangan mehmon xonalari"],
  ["24/7 front desk assistance", "24/7 qabulxona yordami"],
  ["Personalized service", "Shaxsiy xizmat"],

  // Home feature rooms
  ["Perfect for :", "Ideal uchun :"],
  [
    "Indulge in elevated comfort in our Premium Ocean View Room, designed with refined interiors, modern amenities, and sweeping sea vistas.",
    "Premium dengiz manzarali xonada yuqori darajadagi qulaylik — nafis interyer, zamonaviy qulayliklar va keng dengiz manzarasi.",
  ],
  [
    "Relax in our Luxury Coastal View Room, offering elegant décor, upscale features, and stunning panoramic views of the shoreline.",
    "Hashamatli qirg‘oq manzarali xonada dam oling — nafis bezak, premium jihozlar va panoramik manzara.",
  ],
  [
    "Enjoy refined living in our Executive Sea Facing Room, complete with stylish interiors, thoughtful amenities, and calming ocean views.",
    "Ijrochi dengizga qaragan xonada nafis yashash — uslubli interyer, o‘ylab topilgan qulayliklar va osoyishta dengiz manzarasi.",
  ],
  ["PREMIUM OCEAN VIEW ROOM", "PREMIUM DENGIZ MANZARALI XONA"],
  ["LUXURY COASTAL VIEW ROOM", "HASHAMATLI QIRG‘OQ MANZARALI XONA"],
  ["EXECUTIVE SEA FACING ROOM", "IJROCHI DENGIZGA QARAGAN XONA"],
  ["Oceanfront skyline view", "Dengiz bo‘yidagi shahar manzarasi"],
  ["Awards in Hospitality &amp; Dining", "Mehmondo‘stlik va ovqatlanish mukofotlari"],
  [
    "Our versatile business and event spaces are designed to host meetings, conferences, workshops, and celebrations with ease, offering modern amenities and a professional atmosphere for every occasion",
    "Ko‘p funksiyali biznes va tadbir maydonlari — uchrashuv, konferensiya, seminar va bayramlar uchun zamonaviy qulayliklar va professional muhit",
  ],
  ["What you’ll experience", "Nima kutmoqda"],
  [
    "Start your stay effortlessly experience our warm welcome and efficient check-in process we prioritize your comfort from the very first moment",
    "Dam olishingizni oson boshlang — iliq kutib olish va tezkor kirish; qulayligingiz birinchi lahza dan boshlab muhim",
  ],
  ["Fast &amp; Friendly Check-In!", "Tez va do‘stona kirish!"],
  ["Our Gallery", "Galereyamiz"],
  [
    "Experience the difference through their eyes. Genuine feedback on our world-class hospitality",
    "Farqni ularning ko‘zi bilan ko‘ring. Jahon darajasidagi mehmondo‘stlik haqida chinakam fikrlar",
  ],
  [
    "We take immense pride in delivering exceptional results and ensuring every client is thrilled with our work read through their experiences and see why so many trust us and return again",
    "A’lo natija va mijoz mamnuniyati — faxrimiz. Ularning tajribalarini o‘qing: nima uchun ishonishadi va qayta kelishadi",
  ],
  [
    "From the warm welcome to the smallest thoughtful details, every moment felt seamless and sincere. The team anticipated our needs and made the entire stay feel effortless and truly special.",
    "Iliq kutib olishdan eng kichik e’tiborli detallargacha — har bir lahza silliq va chinakam edi. Jamoa ehtiyojlarimizni oldindan bilib, dam olishni oson va maxsus qildi.",
  ],
  [
    "Outstanding from start to finish, every interaction felt genuine, professional, and attentive. The atmosphere, service, and attention to detail exceeded expectations and made the experience unforgettable.",
    "Boshidan oxirigacha a’lo — har bir muloqot chinakam, professional va e’tiborli. Muhit, xizmat va detallarga e’tibor kutganimizdan oshdi.",
  ],
  ["Private Dining Options", "Xususiy ovqatlanish"],
  ["Signature Fine Dining", "Imzo nafis ovqatlanish"],
  ["King bed, balcony views, smart TV, fast WiFi", "King karavot, balkon manzarasi, smart TV, tez Wi‑Fi"],
  ["Queen bed, city views, smart TV, fast WiFi", "Queen karavot, shahar manzarasi, smart TV, tez Wi‑Fi"],
  ["King bed, ocean views, smart TV, fast WiFi", "King karavot, dengiz manzarasi, smart TV, tez Wi‑Fi"],
  [
    "Experience rooms crafted for comfort style and relaxation creating a stay that&#x27;s truly memorable",
    "Qulaylik, uslub va dam olish uchun yaratilgan xonalar — chinakam unutilmas dam olish",
  ],
  [
    "Stay with us for superior comfort warm service and a truly memorable stay",
    "Yuqori qulaylik, iliq xizmat va unutilmas dam olish uchun biz bilan qoling",
  ],
  ["Smooth &amp; Friendly Arrival", "Silliq va do‘stona kelish"],
  ["Leisure guests &amp; honeymooners", "Dam oluvchilar va asal oyi juftlari"],

  // Banquet
  [
    "Celebrate your special day in our elegant wedding banquet venues, thoughtfully designed to host timeless ceremonies and grand receptions. With refined décor, modern amenities, and attentive service, we create unforgettable moments for you and your guests",
    "Maxsus kuningizni nafis to‘y banket maydonlarimizda nishonlang. Nafis bezak, zamonaviy qulayliklar va e’tiborli xizmat — siz va mehmonlaringiz uchun unutilmas lahza",
  ],
  [
    "Celebrate your special day in our beautifully designed wedding banquets, offering elegant décor, modern amenities, and flawless service for ceremonies and receptions that leave lasting impressions",
    "Chiroyli bezatilgan to‘y banketlarida maxsus kuningizni nishonlang — nafis bezak, zamonaviy qulayliklar va mukammal xizmat",
  ],
  [
    "Our professionally designed event spaces offer a refined and functional setting that supports productive meetings, corporate gatherings, and special celebrations with modern technology and attentive service",
    "Professional tadbir maydonlari — samarali uchrashuv, korporativ yig‘ilish va maxsus bayramlar uchun zamonaviy texnika va e’tiborli xizmat",
  ],
  [
    "Our elegant wedding banquet venues provide the perfect setting for timeless ceremonies and grand receptions, enhanced by refined décor, modern amenities, and dedicated event support",
    "Nafis to‘y banket maydonlari — abadiy marosim va katta ziyofatlar uchun mukammal muhit",
  ],
  ["Our happy clients", "Baxtli mijozlarimiz"],
  ["Our Happy clients", "Baxtli mijozlarimiz"],
  [
    "Buying a home felt overwhelming at first, especially with all the paperwork and decisions involved, but their team made the entire process much easier. They kept us informed at every stage, followed up quickly, and handled concerns before they turned into problems. We always felt supported and never rushed, which made a real difference for us.",
    "Jarayon dastlab murakkab tuyulgan edi, ammo jamoa hammasi osonlashtirdi. Har bosqichda xabardor qilishdi, tez javob berishdi va muammolarni oldindan hal qilishdi. Doimo qo‘llab-quvvatlanganlikni his qildik.",
  ],
  [
    "Selling our property was smooth and well-organized from start to finish. They guided us clearly on pricing, handled negotiations with confidence, and kept communication transparent throughout the process. We always knew what was happening and felt comfortable trusting their advice. The final result exceeded our expectations.",
    "Jarayon boshidan oxirigacha silliq va tartibli bo‘ldi. Narx bo‘yicha aniq yo‘l-yo‘riq, ishonchli muzokara va shaffof aloqa. Natija kutganimizdan oshdi.",
  ],
  [
    "From the first call to the day we closed, everything felt straightforward and well managed. They were always available to answer questions and explain things clearly, especially when we felt unsure. The whole process was far less stressful than we expected, and we’re really happy with how everything turned out.",
    "Birinchi qo‘ng‘iroqdan yakungacha hammasi aniq va yaxshi boshqarildi. Savollarga doimo ochiq javob berishdi. Jarayon kutganimizdan ancha oson bo‘ldi.",
  ],
  [
    "Whether for business or celebrations, we shape each event with care to make it lively, memorable, and special",
    "Biznes yoki bayram — har bir tadbirni jonli, unutilmas va maxsus qilamiz",
  ],
  ["Modern conference &amp; event spaces", "Zamonaviy konferensiya va tadbir maydonlari"],
  ["Corporate &amp; Business Events", "Korporativ va biznes tadbirlari"],
  ["Grand &amp; Special Occasions", "Katta va maxsus bayramlar"],
  ["Elegant &amp; Sophisticated", "Nafis va zamonaviy"],
  ["Business &amp; Event Spaces", "Biznes va tadbir maydonlari"],
  ["Culinary &amp; Dining", "Oshxona va ovqatlanish"],
  ["Elegant Banket Spaces", "Nafis banket maydonlari"],
  ["Event &amp; Banket Hall", "Tadbir va banket zali"],
  ["plan your event", "tadbirni rejalashtiring"],
  ["Gala &amp; award nights", "Gala va mukofot kechalari"],

  // Rooms listing / spa names
  [
    "Unwind your mind and body with calming therapies crafted for you",
    "Siz uchun yaratilgan tinchlantiruvchi muolajalar bilan tanani va ruhni dam oldiring",
  ],
  ["Tranquil Haven Spa", "Tinch boshpana SPA"],
  ["Forest Bloom Spa", "O‘rmon gullari SPA"],
  ["Holistic Spa", "Holistik SPA"],
  ["Healing Touch Spa", "Shifo tegishi SPA"],
  ["Calm Space Spa", "Tinch makon SPA"],
  [
    "Create lasting memories in a space designed for comfort and sophistication",
    "Qulaylik va nafislik uchun yaratilgan makonda abadiy xotiralar yarating",
  ],
  [
    "Create unforgettable moments in an elegant, thoughtfully designed space that blends comfort and sophistication for your special celebration",
    "Qulaylik va nafislik uyg‘unlashgan uslubli makonda unutilmas lahza yarating",
  ],
  ["Elegant lighting and décor", "Nafis yoritish va bezak"],
  ["Valet service available", "Valet xizmati mavjud"],
  ["Private dining options", "Xususiy ovqatlanish imkoniyati"],
  ["Deluxe Room", "Deluxe xona"],
  ["Executive Room", "Ijrochi xona"],
  ["room page details", "xona sahifasi tafsilotlari"],
  [
    "The page you are looking for doesn&#x27;t exist or has been moved.",
    "Qidirayotgan sahifa mavjud emas yoki ko‘chirilgan.",
  ],
  ["The template has been released!", "Shablon chiqarildi!"],
  ["Explore Our Blogs", "Bloglarimizni ko‘ring"],

  // Restaurant
  ["Delicious Food Served with Style", "Uslub bilan tortilgan mazali taomlar"],
  ["About the service", "Xizmat haqida"],
  [
    "Enjoy artfully mixed cocktails that balance premium spirits fresh ingredients and elegant presentation",
    "Premium ichimliklar, yangi mahsulotlar va nafis taqdimot uyg‘unlashgan kokteyllardan bahramand bo‘ling",
  ],
  ["Best-selling dishes that showcase the heart of our kitchen", "Oshxonamizning yuragini ko‘rsatadigan eng mashhur taomlar"],
  ["Pan-Seared Sea Bass with Lemon Butter", "Limon-sariyog‘li panada dengiz bassi"],
  ["Sweet and Sour Pork", "Nordon-shirin cho‘chqa go‘shti"],
  ["Hot and Sour Soup", "Achchiq-nordon sho‘rva"],
  ["Our Chef", "Oshpazimiz"],
  [
    "Creating exceptional culinary experiences in every dish we serve",
    "Har bir taomda a’lo oshxona tajribasi",
  ],
  [
    "Our chef curates each dish with premium ingredients, expert techniques, and artistic presentation to deliver a memorable dining experience every time",
    "Oshpazimiz har bir taomni premium mahsulot, ustalik va badiiy taqdimot bilan tayyorlaydi",
  ],
  ["Signature Seafood Tower", "Imzo dengiz mahsulotlari minorasi"],
  [
    "Experience the city’s best views paired with handcrafted cocktails at our exclusive rooftop lounge",
    "Eksklyuziv tom terasi lounge’da shaharning eng yaxshi manzarasi va qo‘lda tayyorlangan kokteyllar",
  ],
  [
    "Savor world-class flavors without leaving the hotel at our award-winning signature restaurant",
    "Mukofotlangan imzo restoranida mehmonxonadan chiqmasdan jahon darajasidagi ta’mlar",
  ],
  [
    "Modern amenities and expertly designed spaces ensure productive meetings and corporate events",
    "Zamonaviy qulayliklar va professional maydonlar — samarali uchrashuv va korporativ tadbirlar",
  ],
  [
    "Located centrally, our hotel offers easy access to attractions, dining, and transport nearby",
    "Markazda joylashgan — diqqatga sazovor joylar, ovqatlanish va transport yaqin",
  ],

  // SPA
  ["Rejuvenate Your Mind Body and Soul", "Aql, tana va ruhni yangilang"],
  [
    "Crafting wellness experiences that restore balance and inner calm",
    "Muvozanat va ichki tinchlikni tiklaydigan sog‘lomlik tajribalari",
  ],
  [
    "Our spa offers treatments that relieve stress, soothe tired muscles, and promote overall relaxation, leaving you fully rejuvenated",
    "SPA muolajalari stressni kamaytiradi, charchagan mushaklarni tinchlantiradi va to‘liq dam olishni beradi",
  ],
  [
    "Our health-focused spa treatments enhance circulation, detoxify the body, and support overall wellness and vitality",
    "Sog‘liqqa yo‘naltirilgan SPA muolajalari qon aylanishini yaxshilaydi, detoks qiladi va hayotiylikni qo‘llab-quvvatlaydi",
  ],
  [
    "Experience rejuvenating therapies that nourish, hydrate and enhance your skin’s health and natural glow",
    "Teri sog‘lig‘i va tabiiy porlashini oshiradigan yangilovchi terapiyalar",
  ],
  ["Signature Spa", "Imzo SPA"],
  [
    "Our Signature Spa offers exclusive treatments crafted to deliver deep relaxation, refined comfort, and lasting rejuvenation",
    "Imzo SPA — chuqur dam olish, nafis qulaylik va uzoq muddatli yangilanish uchun eksklyuziv muolajalar",
  ],
  ["Holistic Healing Spa", "Holistik shifo SPA"],
  [
    "The Holistic Healing Spa provides natural therapies focused on restoring balance, improving wellbeing and enhancing inner harmony",
    "Holistik shifo SPA — muvozanat, farovonlik va ichki uyg‘unlik uchun tabiiy terapiyalar",
  ],
  ["Serenity Spa", "Osoyishtalik SPA"],
  [
    "Serenity Spa offers tranquil treatments and calming spaces designed to restore balance, relaxation, and inner peace",
    "Osoyishtalik SPA — muvozanat, dam olish va ichki tinchlik uchun tinchlantiruvchi muolajalar",
  ],
  ["Rejuvenation Spa", "Yangilanish SPA"],
  ["See what our guests say about their unforgettable stays with us", "Mehmonlarimizning unutilmas dam olish haqidagi fikrlarini o‘qing"],

  // Welcome / room shared
  [
    "Welcome to our hotel, where comfort meets elegance. Enjoy spacious, modern rooms, personalized service, and a range of premium amenities designed to make your stay memorable. From our fine dining options to relaxing lounges and recreational facilities, every detail is crafted for your ultimate convenience and satisfaction",
    "Classic Apartmentga xush kelibsiz — qulaylik va nafislik uyg‘unligi. Keng zamonaviy xonalar, shaxsiy xizmat va premium qulayliklar. Nafis ovqatlanishdan lounge va dam olish zonalarigacha — har bir detal siz uchun",
  ],

  // Blog titles still EN
  [
    "Crafting special events that turn into memories you’ll treasure",
    "Qadrlaydigan xotiralarga aylanadigan maxsus tadbirlar",
  ],
  [
    "A taste journey through our hotel’s finest culinary creations",
    "Mehmonxonamizning eng yaxshi oshxona ijodiyoti bo‘ylab ta’m sayohati",
  ],
  ["Hospitality content editor", "Mehmondo‘stlik kontent muharriri"],
  ["Travel experience blogger", "Sayohat tajribasi blogeri"],
  ["Hotel experience reviewer", "Mehmonxona tajribasi sharhlovchisi"],

  // License
  ["Fotografiya source from", "Fotografiya manbasi"],
  ["The font family used in", "Ishlatilgan shrift oilasi"],
  ["an open-source font from", "ochiq kodli shrift —"],

  // Blog shared headings / paragraphs (common variants)
  [
    "EXPLORE THE STORIES AND INSIGHTS THAT REVEAL WHAT MAKES EVERY HOTEL STAY TRULY UNFORGETTABLE",
    "HAR BIR MEHMONXONA DAM OLISHINI UNUTILMAS QILADIGAN HIKOYA VA MA’LUMOTLARNI KASHF ETING",
  ],
  [
    "DISCOVER THE STORIES AND INSIGHTS THAT REVEAL WHAT MAKES EVERY HOTEL STAY TRULY UNFORGETTABLE",
    "HAR BIR MEHMONXONA DAM OLISHINI UNUTILMAS QILADIGAN HIKOYA VA MA’LUMOTLARNI KASHF ETING",
  ],
  [
    "UNCOVER THE STORIES AND INSIGHTS THAT REVEAL WHAT MAKES EVERY HOTEL STAY TRULY UNFORGETTABLE",
    "HAR BIR MEHMONXONA DAM OLISHINI UNUTILMAS QILADIGAN HIKOYA VA MA’LUMOTLARNI KASHF ETING",
  ],
  [
    "Explore the stories and insights that reveal what makes every hotel stay truly unforgettable",
    "Har bir mehmonxona dam olishini unutilmas qiladigan hikoya va ma’lumotlarni kashf eting",
  ],
  [
    "FROM LUXURIOUS ROOMS TO HIDDEN LOCAL GEMS OUR BLOG SHARES STORIES AND INSIGHTS THAT TRANSFORM EVERY HOTEL STAY INTO A LASTING MEMORY",
    "HASHAMATLI XONALARDAN MAHALLIY JAVOHIRLARGACHA — BLOGIMIZ HAR BIR DAM OLISHNI ABADIY XOTIRAGA AYLANTIRADI",
  ],
  [
    "FROM LUXURIOUS ROOMS TO HIDDEN LOCAL GEMS OUR BLOG SHARES STORIES AND INSIGHTS THAT TRANSFORM EVERY HOTEL STAY INTO A LASTING M",
    "HASHAMATLI XONALARDAN MAHALLIY JAVOHIRLARGACHA — BLOGIMIZ HAR BIR DAM OLISHNI ABADIY XOTIRAGA AYLANTIRADI",
  ],
  [
    "From luxurious rooms to hidden local gems our blog shares stories and insights that transform every hotel stay into a lasting memory",
    "Hashamatli xonalardan mahalliy javohirlargacha — blogimiz har bir dam olishni abadiy xotiraga aylantiradi",
  ],
  [
    "DIVE INTO STORIES INSIGHTS AND TIPS THAT CONNECT STRATEGY INSPIRATION AND EMOTION FOR UNFORGETTABLE EXPERIENCES",
    "UNUTILMAS TAJRIBALAR UCHUN STRATEGIYA, ILHOM VA HISSIYOTNI BOG‘LOVCHI HIKOYA, MASLAHAT VA MA’LUMOTLAR",
  ],
  [
    "DISCOVER STORIES, TIPS, AND INSIGHTS THAT REVEAL THE HEART OF HOSPITALITY AND MAKE EVERY HOTEL STAY TRULY MEMORABLE",
    "MEHMONDO‘STLIK YURAGINI OCHADIGAN VA HAR BIR DAM OLISHNI UNUTILMAS QILADIGAN HIKOYA VA MASLAHATLAR",
  ],
];

/** Blog body: any remaining long EN paragraph → bitta o‘zbekcha matn (variantlar bir xil ma’noda). */
const BLOG_UZ = {
  curated:
    "Tanlangan hikoyalar va ichki ma’lumotlar orqali chinakam mehmondo‘stlikni his eting. Nafis xonalar, ilhomli ovqatlanish, e’tiborli xizmat va mahalliy tajribalar — har bir dam olishni unutilmas qiladi.",
  behind:
    "Har bir mehmonxona dam olishining ortidagi hikoya va tafsilotlarni kashf eting. O‘ylab bezatilgan xonalar, gourmet ovqatlanish, shaxsiy xizmat va mahalliy tajribalar oddiy tashrifni unutilmas sayohatga aylantiradi.",
  tips: "Strategiya, ilhom va hissiyotni bog‘laydigan tanlangan hikoyalar, mutaxassis fikrlari va amaliy maslahatlar. Har bir maqola foydali, qiziqarli va unutilmas tajriba yaratishga yordam beradi.",
  gems: "Hashamatli xonalardan yashirin mahalliy javohirlargacha — blogimiz chinakam mehmondo‘stlikni ochib beradigan hikoya, maslahat va ichki ma’lumotlarni ulashadi.",
  heart:
    "Mehmondo‘stlik yuragini ochadigan qiziqarli hikoyalar, mutaxassis maslahatlari va ichki nuqtai nazarlar — nafis interyerlardan madaniy tajribalargacha.",
};

function looksEnglish(s) {
  const ascii = (s.match(/[A-Za-z]/g) || []).join("").length;
  const cyr = (s.match(/[А-Яа-яЁё]/g) || []).length;
  const uz = (s.match(/[o‘g‘‘’ʻ]/gi) || []).length;
  if (ascii < 40) return false;
  // mostly latin english words
  return (
    /\b(the|and|from|with|every|hotel|stay|stories|insights|discover|explore|curated|hospitality|memorable|unforgettable|experience|rooms|dining|service)\b/i.test(
      s,
    ) &&
    cyr === 0 &&
    // allow a bit of apostrophe but reject mostly-uzbek
    !/\b(va|uchun|bilan|qilish|mehmon|xona|dam)\b/i.test(s)
  );
}

function applyBlogHeuristics(html) {
  return html.replace(/>([^<]{80,})</g, (full, inner) => {
    const s = inner.trim();
    if (!looksEnglish(s)) return full;
    let uz = BLOG_UZ.behind;
    if (/curated stories|insider insights|spirit of hospitality|heart of hospitality|art of hospitality|soul of hospitality|essence of hospitality|true hospitality/i.test(s))
      uz = BLOG_UZ.curated;
    else if (/strategy|inspiration|emotion|practical tips|expert/i.test(s))
      uz = BLOG_UZ.tips;
    else if (/hidden local gems|luxurious rooms to/i.test(s))
      uz = BLOG_UZ.gems;
    else if (/heart of hospitality|essence of hospitality/i.test(s))
      uz = BLOG_UZ.heart;
    return `>${uz}<`;
  });
}

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (/\.(ts|tsx|css|mjs)$/.test(name) && !name.includes("node_modules"))
      out.push(p);
  }
  return out;
}

function applyAll(text) {
  let t = text;
  for (const [a, b] of CONTACT_FIXES) t = t.split(a).join(b);
  // longest first
  const sorted = [...PHRASES].sort((x, y) => y[0].length - x[0].length);
  for (const [a, b] of sorted) {
    if (a && t.includes(a)) t = t.split(a).join(b);
  }
  t = applyBlogHeuristics(t);
  return t;
}

// Faqat baseline HTML — React/TSX identifikatorlarini buzmaslik uchun
const files = walk(path.join(root, "baseline", "html"));

let changed = 0;
for (const file of files) {
  const before = fs.readFileSync(file, "utf8");
  const after = applyAll(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
    console.log("updated", path.relative(root, file));
  }
}
console.log("done, files changed:", changed);
