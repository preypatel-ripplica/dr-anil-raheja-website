// -----------------------------------------------------------------------------
// Blog articles — full content transcribed from the live dranilraheja.com posts.
// Structured as blocks so the article page renders clean editorial content.
// CMS-ready: swap `articles` for a CMS query later.
// -----------------------------------------------------------------------------

import type { Faq } from "@/lib/content";

export type Block =
  | { type: "lead"; text: string }
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "list"; items: string[] };

export type SelfCheck = {
  heading: string;
  prompt: string;
  items: string[];
  /** advice tiers by number of ticked items (evaluated high→low) */
  levels: { min: number; tone: "act" | "watch" | "ok"; title: string; note: string }[];
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readMins: number;
  source: string;
  body: Block[];
  related: string; // treatment slug this article maps to
  faqs?: Faq[];
  selfCheck?: SelfCheck; // optional: CMS entries may omit the checklist
  seoTitle?: string;
  metaDescription?: string;
};

export type ArticleSummary = Pick<
  Article,
  "slug" | "title" | "excerpt" | "image" | "category" | "date" | "readMins" | "related"
>;

export const toArticleSummary = (article: Article): ArticleSummary => ({
  slug: article.slug,
  title: article.title,
  excerpt: article.excerpt,
  image: article.image,
  category: article.category,
  date: article.date,
  readMins: article.readMins,
  related: article.related,
});

export const articles: Article[] = [
  {
    slug: "role-of-a-professional-orthopaedic-surgeon-in-thr",
    title: "The Role of a Professional Orthopaedic Surgeon in THR",
    excerpt:
      "Total Hip Replacement succeeds when surgical excellence and structured recovery work together. Here's what an expert surgeon actually contributes at every stage.",
    image: "/images/optimized/blog-thr-1200.jpg",
    category: "Hip Replacement",
    date: "2026-03-12",
    readMins: 5,
    source: "https://www.dranilraheja.com/role-of-a-professional-orthopaedic-surgeon-in-thr/",
    related: "hip-replacement-surgery",
    body: [
      { type: "lead", text: "A skilled orthopaedic surgeon ensures that both surgical excellence and post-operative care work together to deliver the best recovery outcomes after Total Hip Replacement (THR)." },
      { type: "h", text: "Pre-operative care: preparing body and mind" },
      { type: "p", text: "Before THR surgery, the orthopaedic surgeon focuses on getting the patient ready physically and psychologically:" },
      { type: "list", items: [
        "Detailed evaluation and accurate diagnosis",
        "Educating the patient about the surgery and recovery process",
        "Pre-habilitation exercises to strengthen hip muscles",
        "Managing pain and inflammation",
        "Setting realistic expectations with a clear recovery timeline",
        "Providing psychological reassurance to reduce fear and anxiety",
      ]},
      { type: "p", text: "This preparation significantly improves post-surgical outcomes." },
      { type: "h", text: "Post-operative care: a structured, personalised plan" },
      { type: "p", text: "After THR surgery, recovery becomes a guided and closely monitored journey. A professional orthopaedic surgeon ensures:" },
      { type: "list", items: [
        "Regular follow-ups and healing assessments",
        "Gradual progression from walker to stick to independent walking",
        "Personalised physiotherapy protocols",
        "Guidance on safe movements and precautions",
        "Early restoration of hip mobility",
        "Strengthening of hip and core muscles",
      ]},
      { type: "h", text: "The benefit of the right treatment at the right time" },
      { type: "p", text: "Early and expert intervention leads to faster and safer recovery. Key benefits include rapid pain relief, improved joint mobility, stronger hip muscles, a faster return to walking and daily activities, a reduced risk of complications, and better long-term joint function. Delaying treatment can lead to worsening pain, joint deformity and a reduced quality of life." },
      { type: "h", text: "Recovery is psychological too" },
      { type: "p", text: "THR recovery is not only physical. It is deeply psychological. Patients are empowered through clear communication at every stage, emotional support to reduce the fear of walking, motivational guidance to stay consistent with exercises, and positive reinforcement to build confidence. When patients feel supported, healing becomes faster and more meaningful." },
    ],
    selfCheck: {
      heading: "Is hip pain limiting your life?",
      prompt: "Tick each statement that applies to you right now.",
      items: [
        "Hip pain wakes me at night or is present at rest",
        "I walk with a limp or need support",
        "Stairs, socks or shoes have become hard",
        "Painkillers no longer give lasting relief",
        "I've been advised to consider hip replacement",
      ],
      levels: [
        { min: 3, tone: "act", title: "Worth a specialist review", note: "Several signs point to advanced hip wear. A consultation can clarify whether minimally invasive replacement is right for you." },
        { min: 1, tone: "watch", title: "Keep an eye on it", note: "Early hip issues often respond to conservative care. A check-up now can prevent it from progressing." },
        { min: 0, tone: "ok", title: "Sounds manageable", note: "No major red flags, but if pain changes, an early consultation is always the safe move." },
      ],
    },
  },
  {
    slug: "anterior-cruciate-ligament-injuries",
    title: "Anterior Cruciate Ligament (ACL) Injuries",
    excerpt:
      "The ACL is the knee's main restraint against forward slide of the tibia and one of the most commonly injured ligaments in sport. Diagnosis, treatment and rehab explained.",
    image: "/images/optimized/blog-acl-1200.jpg",
    category: "Arthroscopy",
    date: "2026-02-04",
    readMins: 6,
    source: "https://www.dranilraheja.com/anterior-cruciate-ligament-injuries/",
    related: "arthroscopic-surgery",
    body: [
      { type: "lead", text: "The knee is one of the largest joints in the body, where the thigh bone (femur) meets the leg bone (tibia), with the kneecap (patella) in front. It's stabilised by major ligaments, including two cruciate ligaments running criss-cross inside the joint." },
      { type: "p", text: "The ACL is the main restraint to forward translation of the tibia relative to the femur. It is one of the commonest ligaments to be injured in sport." },
      { type: "h", text: "Causes of ACL injuries" },
      { type: "p", text: "An ACL can be injured in isolation, or alongside the collateral ligaments or meniscus, depending on the force and mechanism of the injury, commonly a sudden twist, pivot or awkward landing." },
      { type: "h", text: "Main symptoms of an ACL tear" },
      { type: "list", items: [
        "A 'POP' sensation at the moment of injury or a fall",
        "Instability of the knee joint",
        "A 'give way' feeling, with locking if a meniscal tear is also present",
      ]},
      { type: "p", text: "On examination there is effusion (swelling) and instability, demonstrated by the Drawer's and Lachman's tests. Diagnosis is confirmed with an MRI, which shows the extent of the injury and guides the correct line of treatment. A standing X-ray of the lower limb tells us about the overall alignment of the knee." },
      { type: "h", text: "Treatment" },
      { type: "p", text: "The standard treatment of an ACL injury is arthroscopic ACL reconstruction using the patient's own (autologous) grafts, most commonly hamstrings, quadriceps or BTB (patella tendon) grafts. The patient is admitted on the day of surgery; after routine investigations, surgery is performed the same day and typically lasts around one hour." },
      { type: "h", text: "Rehabilitation" },
      { type: "list", items: [
        "Rehabilitation begins the same evening, under an expert physiotherapist",
        "The next day, the patient walks with crutches or a walker",
        "Rehabilitation continues for 4–6 weeks",
        "Driving is usually possible after 6 weeks",
        "Sports activities usually resume after 9–12 months, as the load on the knee is gradually increased",
      ]},
    ],
    selfCheck: {
      heading: "Could it be an ACL injury?",
      prompt: "After a twist, fall or sports knock, tick what you noticed.",
      items: [
        "I heard or felt a 'pop' at the moment of injury",
        "The knee swelled up within a few hours",
        "The knee feels unstable or 'gives way'",
        "The knee sometimes locks or catches",
        "I can't return to pivoting sports with confidence",
      ],
      levels: [
        { min: 2, tone: "act", title: "Get it imaged", note: "These are classic ACL-tear signs. An examination and MRI will confirm the extent and the right line of treatment." },
        { min: 1, tone: "watch", title: "Worth a check", note: "One sign alone isn't conclusive, but a knee that isn't settling deserves a specialist look before you load it again." },
        { min: 0, tone: "ok", title: "Reassuring", note: "No major instability signs, but persistent pain or swelling should still be reviewed." },
      ],
    },
  },
  {
    slug: "surviving-winters-with-arthritis",
    title: "Surviving Winters with Arthritis",
    excerpt:
      "Cold months make stiff joints stiffer. Practical, doctor-approved food and lifestyle tips to keep arthritic joints moving through a Delhi winter.",
    image: "/images/optimized/blog-arthritis-winter-1200.jpg",
    category: "Arthritis Care",
    date: "2026-01-08",
    readMins: 4,
    source: "https://www.dranilraheja.com/surviving-winters-with-arthritis/",
    related: "arthritis-treatment",
    body: [
      { type: "lead", text: "Winter isn't liked by many, particularly those with cardiac illness, lung disease or joint problems. People suffering from arthritis often feel their symptoms worsen: more morning stiffness, painful joint movement, and difficulty with daily activities. Here are some tips to beat the winter blues." },
      { type: "h", text: "Foods that fight the stiffness" },
      { type: "list", items: [
        "Broccoli, sprouts & cabbage contain sulforaphane, which helps slow cartilage damage.",
        "Fatty fish (salmon, tuna, trout) are rich in omega-3s that fight inflammation and reduce stiffness.",
        "Garlic contains diallyl disulphide, which may help decrease arthritis symptoms.",
        "Turmeric has a compound called curcumin that is beneficial in managing chronic inflammatory joint disease.",
        "Vitamin C (strawberries, kiwi, pineapple, orange, lemon) has antioxidants that slow the progression of osteoarthritis.",
        "Nuts & raisins are rich in omega-3 fatty acids that decrease inflammation.",
        "Green tea provides useful antioxidants that help manage weight and reduce symptoms.",
      ]},
      { type: "h", text: "Stay hydrated" },
      { type: "p", text: "Last but not least, keep yourself well hydrated with plenty of liquids. There's a tendency to drink less water in winter." },
      { type: "p", text: "Every arthritis patient is different, and you have to find what works best for you. But these tips, along with a positive mindset, are crucial to fighting the pain. Stay active, stay healthy and stay pain-free this winter." },
    ],
    selfCheck: {
      heading: "How winter-ready are your joints?",
      prompt: "Tick the winter habits you already keep.",
      items: [
        "I stay physically active even on cold days",
        "I eat omega-3 and anti-inflammatory foods",
        "I keep well hydrated through winter",
        "I keep affected joints warm and covered",
        "My pain is controlled without extra painkillers",
      ],
      levels: [
        { min: 4, tone: "ok", title: "Winter-ready", note: "You're doing the right things. Keep it up, and review with a specialist if stiffness still creeps in." },
        { min: 2, tone: "watch", title: "A few tweaks to make", note: "You've got the basics. Closing the remaining gaps can noticeably reduce winter stiffness." },
        { min: 0, tone: "act", title: "Let's build a plan", note: "Winter is clearly testing your joints. A short consultation can set you up with a simple, effective routine." },
      ],
    },
  },
];

export const articleSlugs = articles.map((a) => a.slug);
export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
