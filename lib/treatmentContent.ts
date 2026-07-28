import type { Faq } from "@/lib/content";
import {
  hipFaqs,
  kneeFaqs,
  spineFaqs,
  arthroscopyFaqs,
  arthritisFaqs,
} from "@/lib/content";

// -----------------------------------------------------------------------------
// Treatment page content — transcribed/condensed from the client's live pages.
// Structured as numbered sections (per DESIGN_TASTE.md) so the layout can
// render 01/02/03 editorial blocks. CMS-ready plain data.
// -----------------------------------------------------------------------------

export type Section =
  | { type: "text"; heading: string; paragraphs: string[] }
  | { type: "list"; heading: string; intro?: string; items: string[] }
  | { type: "imageText"; heading: string; paragraphs: string[]; image: string; imageSide?: "left" | "right" };

/** Spec-sheet facts shown in the treatment "case file" header. */
export type Fact = { label: string; value: string };

export type TreatmentContent = {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  facts: Fact[];
  sections: Section[];
  faqs?: Faq[];
};

export const treatmentContent: Record<string, TreatmentContent> = {
  "hip-replacement-surgery": {
    slug: "hip-replacement-surgery",
    title: "Hip Replacement Surgeon in Delhi",
    subtitle:
      "Expert hip replacement surgery with the Direct Anterior Approach (DAA) — an advanced muscle-sparing technique for less pain and a faster recovery.",
    heroImage: "/images/2-rin034ev3rcl0zmgzeyaj1290zhgft7s4lqwaot0kw.png",
    facts: [
      { label: "Special interest", value: "Direct Anterior (DAA)" },
      { label: "Scope", value: "Primary · Complex · Revision" },
      { label: "Technique", value: "Muscle-sparing MIS" },
      { label: "Experience", value: "30+ years" },
    ],
    sections: [
      {
        type: "text",
        heading: "Expert hip replacement in Delhi",
        paragraphs: [
          "Living with hip pain can make even simple activities like walking, climbing stairs, getting into a car, or sleeping uncomfortable. When medications, physiotherapy, and injections no longer provide lasting relief, hip replacement surgery offers a reliable solution to restore mobility and improve quality of life.",
          "Dr. Anil Raheja is an internationally trained arthroplasty surgeon with 30+ years of experience in joint replacement surgery. He specialises in Primary, Complex and Revision Hip Replacement, with a special interest in the Direct Anterior Approach (DAA) — an advanced muscle-sparing technique that allows many patients to experience less pain, faster recovery, and an earlier return to normal activities.",
        ],
      },
      {
        type: "list",
        heading: "Why choose Dr. Anil Raheja?",
        items: [
          "30+ years of dedicated orthopaedic & arthroplasty experience",
          "International training in advanced hip replacement surgery",
          "Specialist in Direct Anterior Hip Replacement (DAA)",
          "Expertise in minimally invasive and muscle-sparing techniques",
          "Comprehensive management of complex primary and revision hip replacements",
          "Evidence-based treatment with personalised rehabilitation protocols",
        ],
      },
      {
        type: "imageText",
        heading: "Direct Anterior Hip Replacement (DAA)",
        image: "/images/4-rin03uqcf4calkun34o2hnycn7y6ift7b2jazz9lvk.png",
        imageSide: "right",
        paragraphs: [
          "Unlike conventional hip replacement approaches that require cutting through muscles, the Direct Anterior Approach reaches the hip joint through a natural inter-muscular and inter-nervous plane, preserving important muscles around the hip.",
        ],
      },
      {
        type: "list",
        heading: "Advantages of the Direct Anterior Approach",
        intro: "Potential advantages for appropriately selected patients include:",
        items: [
          "Smaller incision with minimal muscle damage",
          "Less postoperative pain",
          "Reduced blood loss",
          "Lower risk of hip dislocation",
          "Faster walking and rehabilitation",
          "Improved early recovery",
          "Better restoration of natural hip mechanics",
        ],
      },
      {
        type: "text",
        heading: "Is DAA right for you?",
        paragraphs: [
          "Not every patient is an ideal candidate for DAA. A detailed clinical evaluation and imaging help determine the safest and most effective approach for each individual.",
        ],
      },
      {
        type: "list",
        heading: "When should you consider hip replacement?",
        intro: "Hip replacement may be recommended if you have:",
        items: [
          "Persistent hip pain despite medications and physiotherapy",
          "Difficulty walking or climbing stairs",
          "Pain that disturbs sleep",
          "Marked stiffness with restricted movement",
          "Loss of independence in daily activities",
        ],
      },
      {
        type: "list",
        heading: "Conditions commonly treated",
        intro: "Hip replacement is commonly performed for:",
        items: [
          "Advanced osteoarthritis",
          "Avascular necrosis (AVN) of the hip",
          "Rheumatoid arthritis",
          "Hip fractures",
          "Post-traumatic arthritis",
          "Failed previous hip replacement requiring revision surgery",
        ],
      },
      {
        type: "imageText",
        heading: "Precision hip replacement",
        image: "/images/3-rin03a1w8rja4s6k9jrml74zwdi3fea1h3rpj0tp9k.png",
        imageSide: "left",
        paragraphs: [
          "Every hip replacement is individually planned based on your anatomy, bone quality, activity level and lifestyle. High-quality implants with proven long-term clinical performance are selected to maximise durability, stability and function.",
          "The objective is not merely to replace a damaged joint — but to restore confidence in walking, relieve pain, and help patients return to an active, independent life.",
        ],
      },
      {
        type: "text",
        heading: "Our philosophy",
        paragraphs: [
          "Hip replacement should never be performed simply because an X-ray shows arthritis. Surgery is recommended only when symptoms significantly affect quality of life and conservative treatment has failed.",
          "Our commitment is to provide the right operation, for the right patient, at the right time, using modern surgical techniques and evidence-based care to achieve the best possible long-term outcome.",
        ],
      },
      {
        type: "text",
        heading: "Take the first step today",
        paragraphs: [
          "Hip pain rarely improves on its own once it starts affecting daily life. Delaying treatment can lead to worsening stiffness, muscle weakness, and reduced mobility, making recovery more difficult later.",
          "If you are struggling with persistent hip pain, now is the right time to seek expert advice. Early consultation can help you avoid unnecessary suffering and explore both non-surgical and surgical options before the condition progresses further.",
        ],
      },
    ],
    faqs: hipFaqs,
  },

  "knee-replacement-surgery": {
    slug: "knee-replacement-surgery",
    title: "Knee Replacement Surgery in Delhi",
    subtitle:
      "For arthritis or injury that stops the knee moving freely — total and partial replacement with a planned path back to walking.",
    heroImage: "/images/5-rin0je0bdjmwhyt078hteyafkng66b5z5arspmipr4.png",
    facts: [
      { label: "Hospital stay", value: "3–5 days" },
      { label: "Walking aid", value: "First few weeks" },
      { label: "Real improvement", value: "~1 month" },
      { label: "Options", value: "Total or partial" },
    ],
    sections: [
      {
        type: "text",
        heading: "When is knee replacement recommended?",
        paragraphs: [
          "Knee replacement surgery is recommended for arthritis or injury on the knee that prevents it from moving freely. The knee comprises three compartments: the medial compartment (inside portion), the lateral compartment (outside) and the patellofemoral compartment (front).",
        ],
      },
      {
        type: "imageText",
        heading: "Total vs. partial knee replacement",
        image: "/images/6-rin0jnep9vy2caeho4ipikf0cyt8hm9qq4t5fijuw8.png",
        imageSide: "right",
        paragraphs: [
          "In a total knee replacement all three compartments of the knee are replaced. In a partial knee replacement only the affected portion is replaced, keeping the healthy portions intact — osteoarthritis patients often have only one compartment affected.",
        ],
      },
      {
        type: "text",
        heading: "Partial knee replacement",
        paragraphs: [
          "Partial (unicompartmental) knee replacement resurfaces only the damaged compartment of the knee, while the healthy bone, cartilage and ligaments are preserved. For patients whose arthritis is limited to a single compartment, it is a smaller, more targeted procedure than a total knee replacement.",
          "Because more of the natural knee is kept intact, many patients report a more natural-feeling knee and a quicker return to everyday activities.",
        ],
      },
      {
        type: "list",
        heading: "Benefits of partial knee replacement",
        intro: "For suitable candidates, partial knee replacement can offer:",
        items: [
          "Smaller incision and less bone removal",
          "Preservation of healthy cartilage and ligaments",
          "A more natural-feeling knee",
          "Faster recovery and rehabilitation",
          "Shorter hospital stay for many patients",
        ],
      },
      {
        type: "text",
        heading: "Recovery after knee surgery",
        paragraphs: [
          "After surgery the patient stays 3 to 5 days in the hospital. Pain is relieved quickly, but full improvement is noticed after about one month. A walker or crutches support the recovering knee in the initial weeks, followed by a guided physiotherapy programme.",
        ],
      },
      {
        type: "list",
        heading: "Recommendations for a smooth recovery",
        intro: "Simple habits that help the new joint heal well:",
        items: [
          "Keep the knee straight while resting in bed so it heals in a good position.",
          "Choose firm, straight-backed chairs that make standing up easier.",
          "Keep floors clear of rugs and loose items so walking stays safe.",
          "Follow your physiotherapy plan and take gentle, regular walks as advised.",
          "Use your walker or crutches for support during the first few weeks.",
        ],
      },
      {
        type: "text",
        heading: "Life after knee replacement",
        paragraphs: [
          "Most patients return to comfortable, independent daily activity after a knee replacement — walking, travelling and enjoying low-impact activities such as cycling and swimming. Every precaution is taken to keep the procedure safe, and surgery is offered at a reasonable cost.",
        ],
      },
    ],
    faqs: kneeFaqs,
  },

  "spine-surgery": {
    slug: "spine-surgery",
    title: "Spine Surgery Specialist in Delhi",
    subtitle:
      "Surgery is the last option for severe back pain — explored only after rest, medication and therapy have had their chance.",
    heroImage: "/images/7-rin0voqasihiuwa7q4jk2gejqza95myqfnjbrwt9e0.png",
    facts: [
      { label: "First line", value: "Rest & medication" },
      { label: "Review point", value: "~2 months of pain" },
      { label: "Technique", value: "Minimal invasive" },
      { label: "Surgery", value: "Only when needed" },
    ],
    sections: [
      {
        type: "text",
        heading: "When does back pain need surgery?",
        paragraphs: [
          "Spinal surgery is a major operation performed only when extreme need arises. Severe back pain is the major symptom, with spine movement becoming very difficult. Simple back pain heals with proper rest and medication within about two months — if pain persists beyond that, surgical evaluation is warranted.",
        ],
      },
      {
        type: "list",
        heading: "Non-surgical options first",
        intro: "A spine specialist may recommend these before considering surgery:",
        items: [
          "Heat and ice packs — alternate them and see which gives better relief for lower back pain.",
          "Simple exercises recommended by a physical therapist to strengthen and stretch the back.",
          "Therapeutic massage by a specialist to relieve muscular back pain.",
        ],
      },
      {
        type: "imageText",
        heading: "Conditions that need spine surgery",
        image: "/images/8-rin0vy4oouuobakpd9y20xy5vr80xjzn3ot3l5ot6k.png",
        imageSide: "right",
        paragraphs: [
          "Osteoarthritis can cause bone outgrowths on the spine that narrow the space for nerves through the spinal openings. Ruptured discs — the cushions separating the bones of the spine — may press tightly against a spinal nerve, requiring surgical decompression.",
        ],
      },
    ],
    faqs: spineFaqs,
  },

  "arthroscopic-surgery": {
    slug: "arthroscopic-surgery",
    title: "Arthroscopic Surgeon in Delhi",
    subtitle:
      "Keyhole surgery for joints — a fiber-optic camera through a buttonhole incision, for faster diagnosis and recovery.",
    heroImage: "/images/9-rin1b64ld9o9vd4f5a53dhtvtjqtb7fyxjnccilbdg.png",
    facts: [
      { label: "Incision", value: "Buttonhole-sized" },
      { label: "Joints", value: "Knee · hip · shoulder · more" },
      { label: "Recovery", value: "Faster than open surgery" },
      { label: "Protocol", value: "RICE + guided exercise" },
    ],
    sections: [
      {
        type: "text",
        heading: "What is arthroscopy?",
        paragraphs: [
          "Arthroscopy is a procedure apt for diagnosing and treating joint problems. The surgeon inserts a narrow tube through a small incision the size of a buttonhole, connected to a fiber-optic video camera. The instrument's small lens and lighting system give a clear view inside the joint.",
        ],
      },
      {
        type: "list",
        heading: "What it treats",
        intro: "Arthroscopy is performed on the knee, shoulder, hip, ankle, wrist and elbow — to diagnose and treat:",
        items: [
          "Torn meniscus — the cartilage cushion of the knee",
          "Damaged or worn joint cartilage",
          "Torn or unstable ligaments",
          "Inflamed joint linings",
          "Loose fragments of bone or cartilage within the joint",
          "Scarring and stiffness inside the joint",
        ],
      },
      {
        type: "list",
        heading: "Common indications by joint",
        intro: "Some of the most common reasons arthroscopy is recommended:",
        items: [
          "Knee — meniscus tears, cartilage damage and ligament (ACL) injuries",
          "Shoulder — rotator cuff tears, labral tears and impingement",
          "Ankle — cartilage injuries, impingement and loose bodies",
        ],
      },
      {
        type: "imageText",
        heading: "After the surgery",
        image: "/images/10-rin1bbrmi9wa1bkdedx320bnks748c1y92b68nmfuw.png",
        imageSide: "right",
        paragraphs: [
          "Your doctor or therapist will guide recovery with a simple protocol:",
        ],
      },
      {
        type: "list",
        heading: "Recovery protocol",
        items: [
          "Medication — to heal quickly and relieve pain.",
          "Protection — temporary slings or crutches keep the operated joint still.",
          "Exercise — simple prescribed movements strengthen muscles for a quick recovery.",
          "RICE — rest, ice, compression and elevation to relieve the joint and reduce swelling.",
        ],
      },
    ],
    faqs: arthroscopyFaqs,
  },

  "arthritis-treatment": {
    slug: "arthritis-treatment",
    title: "Arthritis Treatment in Delhi",
    subtitle:
      "From early diagnosis to joint-preserving care — managing the wear and tear of cartilage before it manages you.",
    heroImage: "/images/11-rin1ll6745xys2nshblgrx3t17md9dsgnuozueepxk.png",
    facts: [
      { label: "Diagnosis", value: "Exam · X-ray · MRI" },
      { label: "First line", value: "Lifestyle + medication" },
      { label: "Key factor", value: "Early detection" },
      { label: "Surgery", value: "Only if pain persists" },
    ],
    sections: [
      {
        type: "text",
        heading: "What is arthritis?",
        paragraphs: [
          "Arthritis happens when there is slow wear and tear of the cartilage surrounding the joints. Cartilage is the portion of the joint that allows it to move freely — when it breaks down, bones rub together, creating severe pain and inflammation.",
          "Dr. Anil Raheja is a leading arthritis specialist in Delhi, providing rheumatoid arthritis treatment at affordable cost.",
        ],
      },
      {
        type: "list",
        heading: "Symptoms of arthritis",
        items: [
          "Joint swelling",
          "Joint pain",
          "Stiffness in the morning",
          "Low mobility in moving the joint",
          "Skin redness around the joint",
        ],
      },
      {
        type: "imageText",
        heading: "Diagnosis",
        image: "/images/12-rin1lwg9e6dovovjtht7ve6ccravgp0u059qm77hdo.png",
        imageSide: "right",
        paragraphs: [
          "A specialist may diagnose arthritis from a physical examination of the affected joint. For a better picture, X-rays or MRI scanning may be done. In some cases urine, blood or joint fluid is tested to identify the type of arthritis.",
        ],
      },
      {
        type: "text",
        heading: "Getting relief from arthritis",
        paragraphs: [
          "Early diagnosis can prevent and minimise the pain that arises. Simple steps — weight management, guided exercise, heat/cold therapy and timely medication — can bring significant relief when started early.",
        ],
      },
      {
        type: "text",
        heading: "When surgery is needed",
        paragraphs: [
          "If pain is severe and medication or other remedies show no relief, the doctor may recommend surgery — replacing the joint or correcting the damage that has occurred over time.",
        ],
      },
    ],
    faqs: arthritisFaqs,
  },
};

export const treatmentSlugs = Object.keys(treatmentContent);
