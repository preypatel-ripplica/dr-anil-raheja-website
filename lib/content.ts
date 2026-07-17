// -----------------------------------------------------------------------------
// Content collections from the live dranilraheja.com — plain data, CMS-ready.
// -----------------------------------------------------------------------------

export const reviewsSummary = { rating: "EXCELLENT", stars: 5, count: 212 };

export type Review = { name: string; text: string };

export const reviews: Review[] = [
  {
    name: "Coccyx fracture patient",
    text: "I've been undergoing coccyx fracture treatment with Dr. Raheja for the past two months, and I'm already feeling a significant improvement. His diagnosis was spot-on, and the treatment plan has been very effective. Knowledgeable, approachable, and genuinely cares about his patients' recovery.",
  },
  {
    name: "Mrs. Har Devi Bahl",
    text: "The doctor is very polite and has good knowledge of disease and medicines. He treats the patient very nicely.",
  },
  {
    name: "Neelam Khurana",
    text: "Dr Anil Raheja's way of treatment is very good. He listens to the patient's problems carefully and cures well with his vast experience. I have been taking treatment under his prescription for the last 3 months and I am quite satisfied.",
  },
  {
    name: "Verified patient",
    text: "Excellent is the only word that comes to my mind after visiting Dr Anil Raheja. His knowledge towards his work is 10 on 10 — my pain just vanished within 10 days as promised by him. I thank him from the bottom of my heart.",
  },
  {
    name: "Long-term patient",
    text: "Best doctor I have ever met. I have known him for the last 12–13 years and take treatment either for tennis elbow or for my back pain. He always detects the problem related to bones and nerves at once. I highly recommend him.",
  },
  {
    name: "Family patient since 2007",
    text: "The services offered by Dr Anil Raheja and his wife Dr Tripti Raheja are purely professional and very effective. We have been visiting them for our medical well-being since 2007.",
  },
];

// Patient story / talk videos (regular YouTube).
export const featureVideos = ["ejU1rOTSvb0", "ks0_WLzBajQ", "ro_BkyLxWFM"];

// Video gallery — YouTube Shorts (vertical).
export const shorts = [
  "35xkbjm0KjY",
  "6yhxCHJKR3U",
  "7SyZ4-miKX8",
  "DZ84qHoGNlw",
  "EWY8JZh_8Wk",
  "FiGSgkPrjcs",
  "JBHf1DXLwTE",
  "JvvYw65zec0",
  "Q9aTgvJiUY4",
  "eWRtbdqOg2s",
  "fpqQX06EAW8",
  "jUyRvK-kJzA",
  "urmFkaAVF8U",
  "vzAxRkUMiGQ",
];

// Photo gallery images (downloaded from the live site).
export const galleryPhotos = [
  "g1.jpg", "g2.jpg", "g3.jpg", "g4.jpg", "g5.jpg",
  "g6.jpg", "g7.jpg", "g8.jpg", "g9.jpg", "g10.jpg",
  "g11.jpg", "g12.jpg", "g13.jpg", "g14.jpg", "g15.jpg",
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "role-of-a-professional-orthopaedic-surgeon-in-thr",
    title: "Role of a Professional Orthopaedic Surgeon in THR",
    excerpt:
      "What an experienced surgeon actually contributes to a total hip replacement — from implant selection to post-operative recovery.",
    image: "/images/B1-1.png",
    href: "https://www.dranilraheja.com/role-of-a-professional-orthopaedic-surgeon-in-thr/",
  },
  {
    slug: "anterior-cruciate-ligament-injuries",
    title: "Anterior Cruciate Ligament Injuries",
    excerpt:
      "The ACL is the knee's main restraint against forward slide of the tibia — and one of the most commonly injured ligaments in sport. Diagnosis, treatment and rehab explained.",
    image: "/images/B2-1.png",
    href: "https://www.dranilraheja.com/anterior-cruciate-ligament-injuries/",
  },
  {
    slug: "surviving-winters-with-arthritis",
    title: "Surviving Winters with Arthritis",
    excerpt:
      "Cold months make stiff joints stiffer. Practical, doctor-approved ways to keep arthritic joints moving through a Delhi winter.",
    image: "/images/B3-1.png",
    href: "https://www.dranilraheja.com/surviving-winters-with-arthritis/",
  },
];

export type Faq = { q: string; a: string };

// Real FAQs from the hip-replacement page + common patient questions.
export const hipFaqs: Faq[] = [
  {
    q: "Who is the best hip replacement surgeon in Delhi?",
    a: "Dr. Anil Raheja is widely recognized as a leading hip replacement surgeon in Delhi, bringing over 28 years of surgical expertise. As Director of Orthopedics at Apollo Spectra Hospital (Karol Bagh), he specializes in high-success, minimally invasive total hip arthroplasty.",
  },
  {
    q: "What does hip replacement surgery cost in Delhi?",
    a: "Total hip replacement surgery cost in Delhi generally ranges from INR 1,50,000 to INR 4,50,000 for a unilateral (single side) procedure. The overall cost depends on the type of implant selected (ceramic vs. metal-on-polyethylene) and the patient's specific medical requirements.",
  },
  {
    q: "When is total hip replacement recommended?",
    a: "Total hip replacement is primarily recommended for severe hip joint damage due to osteoarthritis, avascular necrosis (AVN), rheumatoid arthritis, or complex hip fractures that do not respond to non-surgical treatment.",
  },
];

export const generalFaqs: Faq[] = [
  {
    q: "Do I need surgery for my joint pain?",
    a: "Not always. Many conditions respond to medication, physiotherapy and lifestyle changes. Surgery is recommended only when conservative treatment no longer relieves pain or restores function — Dr. Raheja always exhausts non-surgical options first.",
  },
  {
    q: "How long is recovery after knee replacement?",
    a: "Most patients stay 3–5 days in hospital. Pain relief is immediate, with real improvement felt after about a month. A walker or crutches support the recovering knee in the initial weeks, followed by guided physiotherapy.",
  },
  {
    q: "What is minimally invasive surgery?",
    a: "Techniques that use much smaller incisions — like arthroscopy (buttonhole-sized cuts with a camera) or minimal-incision hip replacement — which mean less pain, smaller scars and faster recovery.",
  },
  {
    q: "Which insurance / payment options are accepted?",
    a: "Procedures at Apollo Spectra and Jeewan Mala Hospital are covered by leading health insurers and TPAs. Contact the clinic with your policy details to confirm cashless eligibility.",
  },
];
