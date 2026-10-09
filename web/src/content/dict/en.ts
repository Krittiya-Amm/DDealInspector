import { prices } from "@/lib/site";
import type { Dict } from "./th";

/* ข้อความภาษาอังกฤษ — โครงต้องตรงกับ th.ts ทุกคีย์ (type Dict บังคับไว้)
 *
 * TODO: CLIENT-REVIEW — ชื่อบริการภาษาอังกฤษเป็นฉบับร่างของทีม รอลูกค้าตรวจก่อนขึ้นเว็บจริง
 * (คำถามรอลูกค้า ข้อ 13) · ราคาและเวลาใช้ตัวเลขชุดเดียวกับภาษาไทย (ข้อ 47)
 * TODO: CLIENT-DATA — แอดมิน LINE ตอบภาษาอังกฤษได้หรือไม่ ยังรอคำตอบ (ข้อ 51)
 * จึงแสดงอีเมลคู่กับปุ่ม LINE ในหน้า contact ของฉบับอังกฤษไว้ก่อน */

export const en: Dict = {
  lang: "en",
  locale: "en_US",

  meta: {
    siteTitle: "D Deal Inspector & Interior",
    tagline: "Pre-transfer house & condo inspection by licensed civil engineers",
    description:
      "Pre-transfer house and condo inspection in Bangkok by civil engineers licensed by the Council of Engineers. 3,500+ homes inspected, report within 3 days, plus 9 interior services.",
  },

  nav: {
    skip: "Skip to main content",
    home: "Home",
    services: "Services",
    servicesAll: "All services",
    inspection: "Home & Condo Inspection",
    interior: "Interior",
    articles: "Articles",
    contact: "Contact",
    menu: "Open menu",
    close: "Close menu",
    switchTo: "เปลี่ยนเป็นภาษาไทย",
    inspectionGroup: "Inspection services",
    interiorGroup: "Interior services",
  },

  cta: {
    lineBook: "Book via LINE",
    linePrice: "Ask price on LINE",
    lineReport: "Request a sample report on LINE",
    lineAsk: "Ask on LINE",
    linePackage: "Ask about packages",
    lineInterior: "Request an on-site quote",
    call: "Call",
    callUs: "Call us",
    facebook: "Facebook page",
    seeStartPrice: "See starting prices",
    seeServices: "See all services",
    seeDetail: "View details",
    seeAll: "See all",
    readArticle: "Read article",
    openMap: "Open in Google Maps",
    verify: "Verify with the Council of Engineers",
  },

  common: {
    from: "From",
    baht: "THB",
    onsiteAssess: "Quoted after on-site survey",
    serviceArea:
      "Serving Bangkok and vicinity (Nonthaburi, Pathum Thani) and nearby areas",
    travelFee: "Travel fee applies outside the service area, always informed before booking",
    priceBySize: "Final price depends on floor area",
    reportIn: "Report within 3 days",
    licenceBadge: "Licensed civil engineers",
    licenceBody: "Professional engineering licence certified by the Council of Engineers",
    coe: "Council of Engineers",
    reviewSource: "Review on Facebook",
    imageZoom: "View larger image",
    prev: "Previous",
    next: "Next",
    closeDialog: "Close",
  },

  contactInfo: {
    hours: "9:00 - 17:00 (daily)",
    address:
      "K.Riz Town Chatuchot-Ramintra No.237/69, Thai Raman Road, Sam Wa Tawan Tok, Khlong Sam Wa, Bangkok 10510",
    addressLabel: "Address",
    hoursLabel: "Opening hours",
    phoneLabel: "Phone",
    emailLabel: "Email",
    lineLabel: "LINE OA",
    areaLabel: "Service area",
    socialLabel: "Follow us",
    facebookInspector: "Facebook (Inspection)",
    facebookInterior: "Facebook (Interior)",
  },

  stats: ["Homes inspected", "Years of experience", "Projects served", "Would recommend us"],

  inspection: {
    house: {
      name: "Pre-transfer House Inspection",
      short: "Detached houses and townhomes, from structure to roof",
      time: "From 3.5 hours, depending on house size",
      timeShort: "House from 3.5 hrs",
      price: prices.house,
      bullets: [
        "Structure: columns, beams and cracks",
        "Roof, eaves and leak-prone spots",
        "Plumbing, drains and grease traps",
        "Electrical system, panel and grounding",
        "Paint, tiles, doors and windows",
      ],
    },
    condo: {
      name: "Pre-transfer Condo Inspection",
      short: "Condo units of every size, checked before you sign",
      time: "From 1.5 hours, depending on unit size",
      timeShort: "Condo from 1.5 hrs",
      price: prices.condo,
      bullets: [
        "Floor and wall levels, door frames",
        "Drainage and bathroom floor slope",
        "Leaks and moisture in walls",
        "Electrical sockets and grounding",
        "Doors, windows and developer built-ins",
      ],
    },
    construction: {
      name: "Renovation & Construction Inspection",
      short: "Check your contractor's work before each payment instalment",
      time: "",
      timeShort: "",
      price: null,
      bullets: [],
    },
    secondhand: {
      name: "Second-hand Home Inspection",
      short: "Same scope as our pre-transfer inspection, so you know the real condition before buying",
      time: "",
      timeShort: "",
      price: null,
      bullets: [],
    },
    recheck: {
      name: "Defect Re-inspection",
      short: "Re-checked to the same standard as the first visit; number of rounds depends on your package",
      time: "",
      timeShort: "",
      price: null,
      bullets: [],
    },
    repair: {
      name: "Pre-repair Inspection",
      short: "Ask our admin on LINE about scope and details",
      time: "",
      timeShort: "",
      price: null,
      bullets: [],
    },
  },

  interior: {
    curtain: {
      name: "Curtains, Blinds, Partitions, Carpets & Mosquito Nets",
      short: "Measured on site, tailored and installed by one team",
    },
    wallpaper: {
      name: "Wallpaper",
      short: "Walls prepared smooth first for a seamless pattern",
    },
    "spc-floor": {
      name: "SPC Flooring",
      short: "Glue Down and Click Lock, straight or herringbone",
    },
    "window-film": {
      name: "Window Film",
      short: "Cuts heat and glare coming into your home",
    },
    "bird-net": {
      name: "Bird Netting",
      short: "Keeps birds off balconies and roof gaps",
    },
    extension: {
      name: "Home Extensions",
      short: "Kitchens, terraces, carports, foundations planned from day one",
    },
    "glass-partition": {
      name: "Glass Partitions & Shower Screens",
      short: "Measured on site, installed with full hardware",
    },
    "drying-rack": {
      name: "Drying Racks & Dish Racks",
      short: "Fixed to structure that can really carry the load",
    },
    "built-in": {
      name: "Interior Design & Built-in",
      short: "Space planning and custom built-in furniture",
    },
  },

  scope: [
    { title: "Structure", body: "Columns, beams, slabs, cracks, settlement", tools: ["Laser level"] },
    {
      title: "Architecture",
      body: "Floor and wall levels, frames, doors, windows, paint, tiles",
      tools: ["Laser level"],
    },
    { title: "Electrical", body: "Panel, every socket, grounding, reversed polarity", tools: ["Grounding tester"] },
    {
      title: "Plumbing",
      body: "Water pressure, leaks, bathroom slope, drain pipes",
      tools: ["Thermal camera", "Pipe camera"],
    },
  ],

  equipment: [
    { name: "Thermal camera", use: "Finds moisture and leaks invisible to the eye" },
    { name: "Moisture meter", use: "Confirms whether a wall is really damp" },
    { name: "Pipe inspection camera", use: "Looks inside drain and vent pipes" },
    { name: "Laser level", use: "Measures floor, wall and frame levels" },
    { name: "Socket & grounding tester", use: "Checks grounding and reversed polarity" },
    { name: "Laser measure & spirit level", use: "Measures distances and slopes" },
  ],

  steps: [
    {
      title: "Book on LINE",
      body: "Tell us the property type, floor area and preferred date. Our admin confirms the price and slot.",
      badges: ["Replies 9:00 - 17:00"],
    },
    {
      title: "On-site inspection",
      body: "A licensed civil engineer inspects with full equipment. Follow along and ask anything.",
      badges: ["Condo from 1.5 hrs", "House from 3.5 hrs"],
    },
    {
      title: "Get your report",
      body: "Every issue located and photographed, ready to hand to the developer.",
      badges: ["Within 3 days"],
    },
    {
      title: "Re-inspection",
      body: "Re-checked to the same standard as the first visit, as included in your package.",
      badges: ["Per package"],
    },
  ],

  reportPoints: [
    "Photos for every issue",
    "Exact location and defect description",
    "Priorities to fix before transfer",
    "PDF sent via LINE or email",
  ],

  whyUs: [
    { title: "Licensed civil engineers", body: "Certified by the Council of Engineers, verifiable by you" },
    { title: "Our own equipment", body: "Thermal camera, moisture meter and more on every job" },
    { title: "Report within 3 days", body: "Photos for every point, clear enough to send to the developer" },
    { title: "Inspect, then decorate", body: "9 interior services from the same team" },
  ],

  home: {
    hero: {
      title: "Pre-transfer House & Condo Inspection",
      titleAccent: "by Licensed Civil Engineers",
      lead: "Find defects before you sign, get them fixed before transfer, with a photo report within 3 days.",
      imageAlt: "Civil engineer inspecting a site with construction drawings",
      condoFrom: "Condo",
      houseFrom: "House",
    },
    services: {
      title: "House & condo inspection services",
      lead: "New home, second-hand purchase, renovation or repair, pick the service that fits.",
      specialTitle: "Special inspections",
    },
    why: {
      title: "Why D Deal",
      lead: "Inspected by genuinely licensed engineers using our own equipment.",
      licenceTitle: "Verify our licence with the Council of Engineers",
      licenceBody: "Ask us for the licence number and look it up in the Council's public registry.",
    },
    steps: {
      title: "How it works",
      lead: "One LINE message, and we take care of everything up to your report.",
    },
    report: {
      title: "The report you will receive",
      lead: "Every point has a photo and location, ready to discuss with the developer.",
    },
    reviews: {
      title: "What our clients say",
      lead: "Real reviews from our Facebook page (most are in Thai).",
      more: "Read all reviews on Facebook",
    },
    interior: {
      title: "Interior work",
      lead: "Move straight from inspection to decoration with a team that knows your home.",
    },
    articles: {
      title: "Articles",
      lead: "Inspection know-how and interior ideas",
    },
  },

  finalCta: {
    title: "Ready to book your inspection?",
    lead: "Send us your property type, size and preferred date on LINE and we will confirm your slot.",
  },

  servicesPage: {
    metaTitle: "All Services",
    metaDescription:
      "6 house and condo inspection services by licensed civil engineers and 9 interior services, 15 services in total.",
    title: "Inspect it properly, then make it beautiful",
    lead: "15 services across inspection and interior, all from one team.",
    count: (n: number) => `${n} services`,
    inspectionLead: "Licensed civil engineers, full equipment, report within 3 days.",
    interiorLead: "From curtains and SPC floors to built-ins and extensions, quoted on site.",
    directory: "Full service list",
  },

  inspectionPage: {
    metaTitle: "House & Condo Inspection",
    metaDescription:
      "House inspection from 5,000 THB, condo inspection from 3,000 THB, by licensed civil engineers. Report within 3 days.",
    title: "Find it now, before it becomes your repair bill",
    lead: "Licensed civil engineers check every system and send a photo report within 3 days.",
    imageAlt: "Engineers inspecting the systems inside a house",
    servicesTitle: "Choose your inspection",
    servicesLead: "Two main services and four special-case inspections.",
    scopeLabel: "What we check",
    scopeTitle: "Every system in your home",
    scopeLead: "Starting with the structure, the most expensive thing to fix later.",
    toolsTitle: "Our inspection equipment",
    toolsLead: "The eye can't see everything. Every tool is owned by our team.",
    galleryTitle: "On-site inspections",
    galleryLead: "Moments from our house and condo inspections",
    pricingTitle: "Inspection from 3,000 THB",
    pricingLead: "Final price depends on floor area. Send us the size on LINE for a quote.",
    includesTitle: "Included",
    includes: [
      { term: "Inspector", detail: "Civil engineer licensed by the Council of Engineers" },
      { term: "On-site time", detail: "Condo from 1.5 hrs · House from 3.5 hrs, depending on size" },
      { term: "Report", detail: "PDF with locations and photos for every point, within 3 days" },
      { term: "Re-inspection", detail: "As per your chosen package. Ask our admin on LINE for package details" },
    ],
    specialNote: "Special inspections: ask for a price on LINE",
  },

  galleryCats: { all: "All", condo: "Condo", house: "House", onsite: "During inspection" },

  gallery: [
    { image: "hero.jpg", cat: "house", caption: "Walking the house with the owner" },
    { image: "article-condo.jpg", cat: "condo", caption: "Checking frames and glass doors" },
    { image: "inspection-hero.jpg", cat: "onsite", caption: "Checking systems inside the house" },
    { image: "article-crack.jpg", cat: "house", caption: "Assessing a wall crack" },
    { image: "built-in.jpg", cat: "condo", caption: "Checking condo built-ins" },
    { image: "article-defect.jpg", cat: "onsite", caption: "Explaining findings to the client" },
    { image: "spc-floor.jpg", cat: "house", caption: "Checking floor level before handover" },
    { image: "hero-inspector.jpg", cat: "onsite", caption: "Reviewing drawings on site" },
  ],

  interiorPage: {
    metaTitle: "Interior Services",
    metaDescription:
      "Curtains, wallpaper, SPC flooring, window film, bird netting, extensions, glass partitions, drying racks and built-ins: 9 services, quoted on site.",
    title: "Make your home ready to live in, with one team",
    lead: "9 interior services from the same team that inspected your home.",
    imageAlt: "A finished, decorated living room",
    servicesTitle: "9 interior services",
    servicesLead: "Every job is quoted on site. Send us photos of your room on LINE.",
    processTitle: "How an interior job starts",
    process: [
      { title: "Send room photos on LINE", body: "Tell us the service and the area size" },
      { title: "On-site measurement", body: "We measure and recommend materials" },
      { title: "Quotation", body: "Priced from the actual site" },
      { title: "Installation", body: "Installed by our own team" },
    ],
  },

  contactPage: {
    metaTitle: "Contact",
    metaDescription:
      "Contact D Deal Inspector & Interior via LINE, phone or email. Open 9:00 - 17:00 daily.",
    title: "Contact us",
    lead: "LINE is fastest. Send your property type, size and preferred inspection date.",
    lineCardTitle: "Chat on LINE, fastest reply",
    lineCardBody: "Message us anytime; our admin replies during opening hours. You can also email us.",
    mapTitle: "Map",
    mapIframeTitle: "Map of D Deal Inspector & Interior",
  },

  articlesPage: {
    metaTitle: "Articles",
    metaDescription: "Pre-transfer inspection guides and interior style ideas from the D Deal team.",
    title: "Articles",
    lead: "Inspection know-how and interior ideas to read before you decide.",
    all: "All",
    related: "More articles",
    published: "Published",
    ctaTitle: "Want an engineer to check your home?",
  },

  footer: {
    about: "Pre-transfer house and condo inspection by licensed civil engineers, plus full interior services.",
    services: "Services",
    company: "Website",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    rights: "All rights reserved",
  },

  fab: {
    line: "LINE",
    call: "Call",
    page: "Page",
  },

  notFound: {
    metaTitle: "Page not found",
    title: "Page not found",
    lead: "The link may have changed or the page has moved.",
    home: "Back to home",
  },
};
