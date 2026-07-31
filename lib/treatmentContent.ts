import type { Faq } from "@/lib/content";
import {
  hipFaqs,
  kneeFaqs,
  spineFaqs,
  arthroscopyFaqs,
  arthritisFaqs,
  partialKneeFaqs,
  kneeArthroscopyFaqs,
  shoulderArthroscopyFaqs,
  sportsInjuryFaqs,
  fractureTraumaFaqs,
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
  seoTitle?: string;
  metaDescription?: string;
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
      { label: "Incision", value: "8–10 cm (single)" },
      { label: "Technique", value: "Muscle-sparing MIS" },
      { label: "Scope", value: "Primary · Complex · Revision" },
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
          "The procedure is performed through a single incision of about 8–10 cm (approximately 9 cm), which — combined with the muscle-sparing technique — supports less pain and a faster early recovery.",
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
        heading: "Partial (unicondylar) knee replacement — a modern option",
        paragraphs: [
          "Partial knee replacement — also called unicondylar or unicompartmental knee replacement — is a modern, joint-preserving option that resurfaces only the damaged compartment of the knee, while the healthy bone, cartilage and ligaments are kept intact. For patients whose arthritis is limited to a single compartment, it is a smaller, more targeted procedure than a total knee replacement.",
          "Because more of the natural knee is preserved, many patients report a more natural-feeling knee and a quicker return to everyday activities.",
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
      "Keyhole surgery for joints — a fiber-optic camera through a small keyhole incision, for faster diagnosis and recovery.",
    heroImage: "/images/9-rin1b64ld9o9vd4f5a53dhtvtjqtb7fyxjnccilbdg.png",
    facts: [
      { label: "Technique", value: "Keyhole surgery" },
      { label: "Joints", value: "Knee · hip · shoulder · more" },
      { label: "Recovery", value: "Faster than open surgery" },
      { label: "Protocol", value: "RICE + guided exercise" },
    ],
    sections: [
      {
        type: "text",
        heading: "What is arthroscopy?",
        paragraphs: [
          "Arthroscopy — often called keyhole surgery — is a procedure apt for diagnosing and treating joint problems. The surgeon inserts a narrow tube through a small keyhole incision, connected to a fiber-optic video camera. The instrument's small lens and lighting system give a clear view inside the joint.",
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

  // ---------------------------------------------------------------------------
  // Newer standalone pages added after the client meeting.
  // Draft copy — please have Dr. Raheja review before publishing.
  // ---------------------------------------------------------------------------

  "partial-knee-replacement": {
    slug: "partial-knee-replacement",
    title: "Partial Knee Replacement in Delhi",
    subtitle:
      "Unicondylar knee replacement — a modern, joint-preserving option that resurfaces only the damaged compartment of the knee.",
    heroImage: "/images/6-rin0jnep9vy2caeho4ipikf0cyt8hm9qq4t5fijuw8.png",
    facts: [
      { label: "Also called", value: "Unicondylar" },
      { label: "Approach", value: "Joint-preserving" },
      { label: "Best for", value: "Single-compartment arthritis" },
      { label: "Recovery", value: "Often quicker than total" },
    ],
    sections: [
      {
        type: "text",
        heading: "What is partial knee replacement?",
        paragraphs: [
          "Partial knee replacement — also called unicondylar or unicompartmental knee replacement — is a modern, joint-preserving procedure that resurfaces only the damaged compartment of the knee. The healthy bone, cartilage and ligaments are kept intact.",
          "For patients whose arthritis is limited to a single compartment, it offers a smaller, more targeted alternative to total knee replacement.",
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
          "A shorter hospital stay for many patients",
        ],
      },
      {
        type: "list",
        heading: "Who is it suitable for?",
        intro: "Partial knee replacement may be an option if you have:",
        items: [
          "Osteoarthritis limited to one compartment of the knee",
          "Good ligament stability",
          "A reasonable range of knee movement",
          "Pain that limits daily activities despite non-surgical care",
        ],
      },
      {
        type: "text",
        heading: "Recovery and rehabilitation",
        paragraphs: [
          "Many patients recover more quickly than after a total knee replacement, often with a shorter hospital stay. A guided physiotherapy plan supports a steady return to walking and everyday activities.",
        ],
      },
    ],
    faqs: partialKneeFaqs,
  },

  "knee-arthroscopy": {
    slug: "knee-arthroscopy",
    title: "Knee Arthroscopy in Delhi",
    subtitle:
      "Keyhole surgery for the knee — diagnosing and treating meniscus, cartilage and ligament problems through small incisions.",
    heroImage: "/images/9-rin1b64ld9o9vd4f5a53dhtvtjqtb7fyxjnccilbdg.png",
    facts: [
      { label: "Technique", value: "Keyhole surgery" },
      { label: "Camera", value: "Fibre-optic arthroscope" },
      { label: "Common use", value: "Meniscus & cartilage" },
      { label: "Recovery", value: "Faster than open surgery" },
    ],
    sections: [
      {
        type: "text",
        heading: "What is knee arthroscopy?",
        paragraphs: [
          "Knee arthroscopy is a keyhole procedure in which a fibre-optic camera is inserted through a small incision to give a clear view inside the knee. Fine instruments are used through further small incisions to treat the problem — with minimal disruption to surrounding tissue.",
        ],
      },
      {
        type: "list",
        heading: "What it treats",
        intro: "Knee arthroscopy is commonly used for:",
        items: [
          "Torn meniscus — the cartilage cushion of the knee",
          "Damaged or worn joint cartilage",
          "Ligament injuries, including the ACL",
          "Loose fragments of bone or cartilage",
          "Inflamed joint lining",
        ],
      },
      {
        type: "imageText",
        heading: "Recovery after knee arthroscopy",
        image: "/images/cartilage-1.png",
        imageSide: "right",
        paragraphs: [
          "Recovery is generally faster than open surgery. Many patients begin gentle walking soon after the procedure, with support as needed, and follow a guided physiotherapy plan to restore strength and movement.",
        ],
      },
    ],
    faqs: kneeArthroscopyFaqs,
  },

  "shoulder-arthroscopy": {
    slug: "shoulder-arthroscopy",
    title: "Shoulder Arthroscopy in Delhi",
    subtitle:
      "Keyhole surgery for the shoulder — treating rotator cuff tears, labral tears, impingement and instability.",
    heroImage: "/images/10-rin1bbrmi9wa1bkdedx320bnks748c1y92b68nmfuw.png",
    facts: [
      { label: "Technique", value: "Keyhole surgery" },
      { label: "Camera", value: "Fibre-optic arthroscope" },
      { label: "Common use", value: "Rotator cuff & labrum" },
      { label: "Recovery", value: "Guided rehabilitation" },
    ],
    sections: [
      {
        type: "text",
        heading: "What is shoulder arthroscopy?",
        paragraphs: [
          "Shoulder arthroscopy is a keyhole procedure that uses a fibre-optic camera and fine instruments, passed through small incisions, to diagnose and treat problems inside the shoulder joint — with less disruption than open surgery.",
        ],
      },
      {
        type: "list",
        heading: "What it treats",
        intro: "Shoulder arthroscopy is commonly used for:",
        items: [
          "Rotator cuff tears",
          "Labral (SLAP) tears",
          "Shoulder impingement",
          "Recurrent shoulder dislocation and instability",
          "Removal of loose bodies",
        ],
      },
      {
        type: "imageText",
        heading: "Recovery after shoulder arthroscopy",
        image: "/images/arthroscopic-surgery.png",
        imageSide: "right",
        paragraphs: [
          "A sling is often used for a short period to protect the shoulder while it heals. A structured physiotherapy programme then gradually restores movement and strength, with a return to activities guided by your surgeon.",
        ],
      },
    ],
    faqs: shoulderArthroscopyFaqs,
  },

  "sports-injury-conservative-care": {
    slug: "sports-injury-conservative-care",
    title: "Sports Injury & Conservative Care in Delhi",
    subtitle:
      "Non-surgical treatment for sports and joint injuries — physiotherapy, bracing, PRP injections and guided rehabilitation.",
    heroImage: "/images/Orthopaedics-1.jpg",
    facts: [
      { label: "First approach", value: "Non-surgical" },
      { label: "Options", value: "PRP · physiotherapy" },
      { label: "Focus", value: "Restore function" },
      { label: "Surgery", value: "Only if needed" },
    ],
    sections: [
      {
        type: "text",
        heading: "Conservative care first",
        paragraphs: [
          "Many sports and joint injuries recover well without surgery. A careful assessment guides a personalised, non-surgical plan aimed at relieving pain, restoring movement and getting you safely back to activity.",
        ],
      },
      {
        type: "list",
        heading: "Non-surgical treatment options",
        intro: "Depending on your injury, care may include:",
        items: [
          "Physiotherapy and guided strengthening",
          "Activity modification and bracing or support",
          "PRP (platelet-rich plasma) injections for suitable injuries",
          "Pain-relief and anti-inflammatory measures",
          "A structured return-to-activity plan",
        ],
      },
      {
        type: "imageText",
        heading: "What are PRP injections?",
        image: "/images/cartilage-1.png",
        imageSide: "right",
        paragraphs: [
          "PRP (platelet-rich plasma) is prepared from a small sample of your own blood and injected into the injured area to support the body's natural healing. It is one of several non-surgical options used for suitable soft-tissue and joint injuries.",
        ],
      },
      {
        type: "text",
        heading: "When to see a specialist",
        paragraphs: [
          "Seek advice if you have persistent pain, swelling, instability or reduced movement after an injury, or if symptoms do not settle with rest. Early assessment helps guide the safest and most effective recovery plan — and identifies the rare cases where surgery is the better option.",
        ],
      },
    ],
    faqs: sportsInjuryFaqs,
  },

  "fracture-trauma-treatment": {
    slug: "fracture-trauma-treatment",
    title: "Fracture & Trauma Treatment in Delhi",
    subtitle:
      "Prompt, expert care for fractures and orthopedic trauma — from simple breaks to complex, multiple injuries.",
    heroImage: "/images/Orthopaedics.jpg",
    facts: [
      { label: "Covers", value: "Simple to complex" },
      { label: "Priority", value: "Prompt assessment" },
      { label: "Treatment", value: "Cast or surgery" },
      { label: "Goal", value: "Restore function" },
    ],
    sections: [
      {
        type: "text",
        heading: "Expert fracture & trauma care",
        paragraphs: [
          "Fractures and injuries range from simple breaks that heal with a cast to complex, unstable or multiple injuries that need surgery. Prompt assessment and the right treatment plan give the best chance of a full recovery.",
        ],
      },
      {
        type: "list",
        heading: "Conditions treated",
        intro: "Care is provided for:",
        items: [
          "Simple and displaced fractures",
          "Complex and multiple (poly-) trauma",
          "Fractures around joints",
          "Injuries needing fixation with plates, screws or nails",
          "Post-injury rehabilitation",
        ],
      },
      {
        type: "text",
        heading: "Treatment and recovery",
        paragraphs: [
          "Many fractures heal well with a cast or splint and close monitoring. Displaced, unstable or complex fractures may need surgery to restore alignment and stability. Treatment is followed by a guided rehabilitation programme to rebuild strength, movement and confidence.",
        ],
      },
    ],
    faqs: fractureTraumaFaqs,
  },
};

export const treatmentSlugs = Object.keys(treatmentContent);
