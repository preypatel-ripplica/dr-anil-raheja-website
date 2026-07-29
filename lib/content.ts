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
    a: "Dr. Anil Raheja is widely recognized as a leading hip replacement surgeon in Delhi, bringing over 30 years of surgical expertise and 15,000+ surgeries. An internationally trained arthroplasty surgeon, he specialises in Primary, Complex and Revision Hip Replacement, with a special interest in the muscle-sparing Direct Anterior Approach (DAA).",
  },
  {
    q: "What is the Direct Anterior Approach (DAA) in hip replacement?",
    a: "The Direct Anterior Approach reaches the hip joint through a natural inter-muscular and inter-nervous plane, rather than cutting through muscles as conventional approaches do. Because important muscles around the hip are preserved, many appropriately selected patients experience less pain and a faster, earlier return to normal activities.",
  },
  {
    q: "What are the advantages of Direct Anterior Hip Replacement?",
    a: "For appropriately selected patients, potential advantages include a smaller incision with minimal muscle damage, less postoperative pain, reduced blood loss, a lower risk of hip dislocation, faster walking and rehabilitation, and better restoration of natural hip mechanics. A detailed clinical evaluation and imaging determine whether DAA is the safest approach for each individual.",
  },
  {
    q: "What does hip replacement surgery cost in Delhi?",
    a: "Total hip replacement surgery cost in Delhi generally ranges from INR 3,00,000 to INR 4,50,000 for a unilateral (single side) procedure. The overall cost depends on the type of implant selected (ceramic vs. metal-on-polyethylene) and the patient's specific medical requirements.",
  },
  {
    q: "When is hip replacement recommended?",
    a: "Hip replacement may be recommended for persistent hip pain despite medications and physiotherapy, difficulty walking or climbing stairs, pain that disturbs sleep, marked stiffness with restricted movement, or loss of independence in daily activities — commonly due to advanced osteoarthritis, avascular necrosis (AVN), rheumatoid arthritis, hip fractures or a failed previous replacement.",
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
    a: "Techniques that use much smaller incisions — like arthroscopy (keyhole surgery with a camera) or minimal-incision hip replacement — which mean less pain, smaller scars and faster recovery.",
  },
  {
    q: "Which insurance / payment options are accepted?",
    a: "Procedures at Apollo Spectra and Jeewan Mala Hospital are covered by leading health insurers and TPAs. Contact the clinic with your policy details to confirm cashless eligibility.",
  },
];

export const kneeFaqs: Faq[] = [
  {
    q: "What is the difference between total and partial knee replacement?",
    a: "In a total knee replacement all three compartments of the knee are resurfaced. In a partial (unicompartmental) knee replacement only the damaged compartment is replaced while the healthy portions and ligaments are preserved — an option for patients whose arthritis is limited to one compartment.",
  },
  {
    q: "Am I a candidate for partial knee replacement?",
    a: "Partial knee replacement suits patients with osteoarthritis confined to a single compartment, good ligament stability and a reasonable range of motion. A clinical examination along with X-rays helps confirm whether it is the right choice for you.",
  },
  {
    q: "How long is recovery after knee replacement?",
    a: "Most patients stay 3–5 days in hospital, with pain relief soon after surgery and real improvement felt after about a month. A walker or crutches support the knee in the initial weeks, followed by a guided physiotherapy programme. Partial knee replacement often allows an even quicker recovery.",
  },
  {
    q: "How long does a knee replacement last?",
    a: "Modern implants with proven long-term performance are chosen to maximise durability, and most knee replacements last many years. Longevity depends on the implant, your activity level and body weight — all of which are considered when planning your surgery.",
  },
];

export const spineFaqs: Faq[] = [
  {
    q: "Do I need surgery for my back pain?",
    a: "Usually not. Most back pain settles with rest, medication and physiotherapy within about two months. Surgery is considered only when severe pain persists despite these measures, or when there is nerve compression that affects strength, sensation or bladder/bowel control.",
  },
  {
    q: "What non-surgical options are tried first?",
    a: "A spine specialist may recommend heat and ice therapy, physiotherapist-guided exercises to strengthen and stretch the back, activity modification, medication and, where appropriate, therapeutic massage — before any surgical option is considered.",
  },
  {
    q: "Is spine surgery minimally invasive?",
    a: "Where suitable, minimally invasive techniques are used — smaller incisions that mean less tissue disruption, reduced pain and a faster recovery. The right technique is chosen based on your diagnosis and imaging.",
  },
];

export const arthroscopyFaqs: Faq[] = [
  {
    q: "Which joints can be treated with arthroscopy?",
    a: "Arthroscopy is performed on the knee, shoulder, hip, ankle, wrist and elbow. Through a small keyhole incision, a fibre-optic camera lets the surgeon diagnose and treat problems inside the joint with minimal disruption to surrounding tissue.",
  },
  {
    q: "Can arthroscopy treat cartilage and meniscus injuries?",
    a: "Yes. Arthroscopy is commonly used to repair or trim a torn meniscus, treat damaged cartilage, address torn ligaments, remove loose fragments and clear inflamed joint lining — restoring smooth, pain-free movement.",
  },
  {
    q: "What is recovery after arthroscopy like?",
    a: "Recovery is generally faster than open surgery. Your doctor or therapist will guide a simple protocol — medication for comfort, temporary protection of the joint, prescribed strengthening exercises, and RICE (rest, ice, compression and elevation) to reduce swelling.",
  },
];

export const arthritisFaqs: Faq[] = [
  {
    q: "Can arthritis be treated without surgery?",
    a: "In most cases, yes — especially when caught early. Weight management, guided exercise, heat and cold therapy, and timely medication can bring significant relief. Surgery is considered only when pain is severe and conservative measures no longer help.",
  },
  {
    q: "Why does early diagnosis of arthritis matter?",
    a: "Early diagnosis allows treatment to begin before the cartilage wears down further, helping to minimise pain, protect joint function and delay or avoid the need for surgery.",
  },
  {
    q: "How is arthritis diagnosed?",
    a: "Diagnosis begins with a physical examination of the affected joint, supported by X-rays or MRI for a clearer picture. In some cases, blood, urine or joint-fluid tests are done to identify the specific type of arthritis.",
  },
];

// --- FAQ sets for the newer standalone pages (draft copy — verify with the doctor) ---

export const partialKneeFaqs: Faq[] = [
  {
    q: "Who is a candidate for partial knee replacement?",
    a: "Partial (unicondylar) knee replacement suits patients whose arthritis is limited to one compartment of the knee, with good ligament stability and a reasonable range of motion. A clinical examination and X-rays confirm whether it is the right option for you.",
  },
  {
    q: "How is partial knee replacement different from total knee replacement?",
    a: "A partial replacement resurfaces only the damaged compartment while preserving the healthy bone, cartilage and ligaments. This usually means a smaller incision, less bone removal, a more natural-feeling knee and often a quicker recovery than a total knee replacement.",
  },
  {
    q: "How long does recovery take after partial knee replacement?",
    a: "Many patients recover faster than after a total knee replacement, often with a shorter hospital stay. A guided physiotherapy plan supports a steady return to walking and everyday activities.",
  },
];

export const kneeArthroscopyFaqs: Faq[] = [
  {
    q: "What knee conditions does arthroscopy treat?",
    a: "Knee arthroscopy is commonly used for meniscus (cartilage) tears, damaged joint cartilage, ligament injuries such as the ACL, removal of loose fragments and treatment of an inflamed joint lining.",
  },
  {
    q: "Is knee arthroscopy a major surgery?",
    a: "It is a keyhole procedure performed through small incisions with a fibre-optic camera, so it is far less invasive than open surgery. Most patients go home the same day or after a short stay.",
  },
  {
    q: "How soon can I walk after knee arthroscopy?",
    a: "Many patients begin gentle walking soon after surgery, with support as needed. Your surgeon and physiotherapist will guide the pace of rehabilitation based on the procedure performed.",
  },
];

export const shoulderArthroscopyFaqs: Faq[] = [
  {
    q: "What shoulder problems can arthroscopy treat?",
    a: "Shoulder arthroscopy is used for rotator cuff tears, labral tears, shoulder impingement, recurrent dislocation and removal of loose bodies — restoring stability and pain-free movement.",
  },
  {
    q: "Will I need a sling after shoulder arthroscopy?",
    a: "A sling is often used for a short period to protect the shoulder while it heals. A structured physiotherapy programme then gradually restores movement and strength.",
  },
  {
    q: "How long is recovery after shoulder arthroscopy?",
    a: "Recovery depends on the procedure, but the keyhole approach generally means less pain and a quicker return to daily activities than open surgery, supported by guided rehabilitation.",
  },
];

export const sportsInjuryFaqs: Faq[] = [
  {
    q: "Do all sports injuries need surgery?",
    a: "No. Many sports injuries respond well to conservative care — rest, physiotherapy, bracing, activity modification and treatments such as PRP injections. Surgery is considered only when non-surgical measures do not restore function.",
  },
  {
    q: "What is a PRP injection?",
    a: "PRP (platelet-rich plasma) is prepared from a small sample of your own blood and injected into the injured area to support the body's natural healing. It is one of several non-surgical options used for suitable soft-tissue and joint injuries.",
  },
  {
    q: "When should I see a specialist for a sports injury?",
    a: "Seek advice if you have persistent pain, swelling, instability or reduced movement after an injury, or if symptoms do not settle with rest. Early assessment helps guide the safest and most effective recovery plan.",
  },
];

export const fractureTraumaFaqs: Faq[] = [
  {
    q: "Do all fractures need surgery?",
    a: "No. Many fractures heal well with a cast or splint and close monitoring. Surgery is recommended for displaced, unstable or complex fractures to restore alignment and allow proper healing.",
  },
  {
    q: "How soon should a fracture be treated?",
    a: "Fractures and significant injuries should be assessed promptly. Timely treatment reduces complications and supports the best possible recovery of function.",
  },
  {
    q: "What does recovery after a fracture involve?",
    a: "Recovery depends on the injury and treatment, and typically combines a period of protection or immobilisation with a guided rehabilitation programme to restore strength, movement and confidence.",
  },
];
