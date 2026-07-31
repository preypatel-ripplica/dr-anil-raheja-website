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
  | { type: "imageText"; heading: string; paragraphs: string[]; image: string; imageSide?: "left" | "right" }
  | { type: "cta"; heading: string; text: string };

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
      "Expert hip replacement with the Direct Anterior Approach (DAA), a muscle-sparing technique that helps you recover faster and with less pain.",
    heroImage: "/images/2-rin034ev3rcl0zmgzeyaj1290zhgft7s4lqwaot0kw.png",
    facts: [
      { label: "Special interest", value: "Direct Anterior (DAA)" },
      { label: "Incision", value: "8 to 10 cm (single)" },
      { label: "Technique", value: "Muscle-sparing MIS" },
      { label: "Scope", value: "Primary, Complex, Revision" },
    ],
    sections: [
      {
        type: "text",
        heading: "Hip replacement that gets you moving again",
        paragraphs: [
          "Hip pain can turn simple things like walking, climbing stairs, getting into a car, or sleeping into a daily struggle. When medicines, physiotherapy, and injections no longer give lasting relief, hip replacement is a proven way to ease the pain and get your life back.",
          "Dr. Anil Raheja is an internationally trained hip replacement surgeon with over 30 years of experience. He performs primary, complex, and revision hip replacements, with a special focus on the Direct Anterior Approach (DAA), a muscle-sparing technique that helps many patients get back on their feet sooner.",
        ],
      },
      {
        type: "list",
        heading: "Why patients choose Dr. Anil Raheja",
        items: [
          "Over 30 years of experience in orthopaedics and joint replacement",
          "International training in advanced hip replacement surgery",
          "Specialist in the Direct Anterior Approach (DAA)",
          "Skilled in minimally invasive, muscle-sparing techniques",
          "Handles complex primary and revision hip replacements",
          "Care backed by evidence, with a recovery plan built around you",
        ],
      },
      {
        type: "imageText",
        heading: "What is the Direct Anterior Approach?",
        image: "/images/4-rin03uqcf4calkun34o2hnycn7y6ift7b2jazz9lvk.png",
        imageSide: "right",
        paragraphs: [
          "Most conventional hip replacements cut through muscle to reach the joint. The Direct Anterior Approach is different. It reaches the hip through a natural gap between the muscles, so the muscles around the hip stay intact.",
          "The surgery is done through a single incision of about 8 to 10 cm (roughly 9 cm). Because the muscles are preserved, many patients feel less pain and start walking again sooner.",
        ],
      },
      {
        type: "list",
        heading: "Benefits of the Direct Anterior Approach",
        intro: "For the right patient, the DAA can offer:",
        items: [
          "A smaller incision with minimal muscle damage",
          "Less pain after surgery",
          "Less blood loss",
          "A lower chance of the hip dislocating",
          "Faster walking and rehabilitation",
          "A smoother early recovery",
          "More natural hip movement",
        ],
      },
      {
        type: "text",
        heading: "Is the Direct Anterior Approach right for you?",
        paragraphs: [
          "The DAA is not the best choice for every patient. Dr. Raheja studies your examination and scans carefully, then recommends the safest and most effective approach for your hip.",
        ],
      },
      {
        type: "list",
        heading: "When to consider hip replacement",
        intro: "It may be time to consider hip replacement if you have:",
        items: [
          "Ongoing hip pain even after medicines and physiotherapy",
          "Trouble walking or climbing stairs",
          "Pain that disturbs your sleep",
          "Stiffness that limits how far the hip can move",
          "Difficulty managing everyday activities on your own",
        ],
      },
      {
        type: "cta",
        heading: "Not sure if you need surgery?",
        text: "Get a clear, honest assessment from Dr. Anil Raheja. You will leave knowing what is causing your hip pain and what your options are, surgical or not.",
      },
      {
        type: "list",
        heading: "Conditions we treat",
        intro: "Hip replacement is commonly done for:",
        items: [
          "Advanced osteoarthritis",
          "Avascular necrosis (AVN) of the hip",
          "Rheumatoid arthritis",
          "Hip fractures",
          "Arthritis after an old injury",
          "A previous hip replacement that has worn out or failed",
        ],
      },
      {
        type: "imageText",
        heading: "A hip replacement planned around you",
        image: "/images/3-rin03a1w8rja4s6k9jrml74zwdi3fea1h3rpj0tp9k.png",
        imageSide: "left",
        paragraphs: [
          "No two hips are the same, so every surgery is planned around your anatomy, bone quality, activity level, and lifestyle. Dr. Raheja uses trusted, long-lasting implants chosen for durability, stability, and comfortable movement.",
          "The goal is simple. Ease your pain, get you walking with confidence, and help you return to an active, independent life.",
        ],
      },
      {
        type: "text",
        heading: "Do not wait for the pain to get worse",
        paragraphs: [
          "Hip pain rarely improves on its own once it starts affecting daily life. The longer you wait, the more stiffness and muscle weakness can build up, which makes recovery harder later.",
          "An early consultation lets you look at both non-surgical and surgical options before things get worse. Book a visit with Dr. Anil Raheja for a clear assessment and a treatment plan made for you.",
        ],
      },
    ],
    faqs: hipFaqs,
  },

  "knee-replacement-surgery": {
    slug: "knee-replacement-surgery",
    title: "Knee Replacement Surgery in Delhi",
    subtitle:
      "Total and partial knee replacement for arthritis or injury that stops the knee moving freely, with a planned path back to walking.",
    heroImage: "/images/5-rin0je0bdjmwhyt078hteyafkng66b5z5arspmipr4.png",
    facts: [
      { label: "Hospital stay", value: "3 to 5 days" },
      { label: "Walking aid", value: "First few weeks" },
      { label: "Real improvement", value: "About 1 month" },
      { label: "Options", value: "Total or partial" },
    ],
    sections: [
      {
        type: "text",
        heading: "When is knee replacement needed?",
        paragraphs: [
          "Knee replacement is recommended when arthritis or injury stops the knee from moving freely and the pain no longer settles with medicines and physiotherapy. The knee has three compartments: the medial (inside), the lateral (outside), and the patellofemoral (front).",
        ],
      },
      {
        type: "imageText",
        heading: "Total vs partial knee replacement",
        image: "/images/6-rin0jnep9vy2caeho4ipikf0cyt8hm9qq4t5fijuw8.png",
        imageSide: "right",
        paragraphs: [
          "In a total knee replacement, all three compartments are resurfaced. In a partial knee replacement, only the affected compartment is replaced and the healthy parts are left intact. Many people with osteoarthritis have just one compartment affected, so a partial replacement is often possible.",
        ],
      },
      {
        type: "text",
        heading: "Partial (unicondylar) knee replacement",
        paragraphs: [
          "Partial knee replacement, also called unicondylar knee replacement, is a modern, joint-preserving option. It resurfaces only the damaged compartment while keeping the healthy bone, cartilage, and ligaments in place.",
          "Because more of the natural knee is preserved, many patients say the knee feels more natural and they get back to daily life sooner.",
        ],
      },
      {
        type: "list",
        heading: "Benefits of partial knee replacement",
        intro: "For the right patient, a partial replacement can offer:",
        items: [
          "A smaller incision and less bone removal",
          "Healthy cartilage and ligaments left in place",
          "A more natural-feeling knee",
          "Faster recovery and rehabilitation",
          "A shorter hospital stay for many patients",
        ],
      },
      {
        type: "cta",
        heading: "Which knee replacement is right for you?",
        text: "Book a consultation with Dr. Anil Raheja to find out whether a total or partial knee replacement suits your knee, based on a proper examination and X-rays.",
      },
      {
        type: "text",
        heading: "Recovery after knee replacement",
        paragraphs: [
          "Most patients stay in hospital for 3 to 5 days. Pain eases quickly, and real improvement is usually felt after about a month. A walker or crutches support the knee in the first few weeks, followed by a guided physiotherapy plan.",
        ],
      },
      {
        type: "list",
        heading: "Tips for a smooth recovery",
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
          "Most patients return to comfortable, independent daily life after a knee replacement. That includes walking, travelling, and low-impact activities like cycling and swimming. Every precaution is taken to keep the surgery safe, and it is offered at a reasonable cost.",
        ],
      },
    ],
    faqs: kneeFaqs,
  },

  "spine-surgery": {
    slug: "spine-surgery",
    title: "Spine Surgery Specialist in Delhi",
    subtitle:
      "Surgery is the last option for severe back pain. It is considered only after rest, medication, and therapy have had their chance.",
    heroImage: "/images/7-rin0voqasihiuwa7q4jk2gejqza95myqfnjbrwt9e0.png",
    facts: [
      { label: "First line", value: "Rest and medication" },
      { label: "Review point", value: "About 2 months of pain" },
      { label: "Technique", value: "Minimally invasive" },
      { label: "Surgery", value: "Only when needed" },
    ],
    sections: [
      {
        type: "text",
        heading: "When does back pain need surgery?",
        paragraphs: [
          "Spine surgery is a major operation, so it is done only when it is truly needed. The main symptom is severe back pain that makes movement very difficult. Most simple back pain settles with proper rest and medication within about two months. If the pain continues beyond that, it is worth getting a proper surgical assessment.",
        ],
      },
      {
        type: "list",
        heading: "Non-surgical options come first",
        intro: "A spine specialist will usually try these before considering surgery:",
        items: [
          "Heat and ice packs. Alternate them and see which gives you better relief.",
          "Simple exercises from a physiotherapist to strengthen and stretch the back.",
          "Therapeutic massage from a specialist to ease muscular back pain.",
        ],
      },
      {
        type: "cta",
        heading: "Back pain that will not settle?",
        text: "If back pain has lasted more than a few weeks or comes with leg pain, numbness, or weakness, book a consultation with Dr. Anil Raheja for a clear diagnosis and the right plan.",
      },
      {
        type: "imageText",
        heading: "Conditions that may need spine surgery",
        image: "/images/8-rin0vy4oouuobakpd9y20xy5vr80xjzn3ot3l5ot6k.png",
        imageSide: "right",
        paragraphs: [
          "Osteoarthritis can cause bony outgrowths on the spine that narrow the space around the nerves. Ruptured discs, the soft cushions between the bones of the spine, can press on a nerve and may need surgery to relieve the pressure.",
        ],
      },
    ],
    faqs: spineFaqs,
  },

  "arthroscopic-surgery": {
    slug: "arthroscopic-surgery",
    title: "Arthroscopic Surgeon in Delhi",
    subtitle:
      "Keyhole surgery for joints. A fibre-optic camera goes in through a small keyhole incision, for faster diagnosis and recovery.",
    heroImage: "/images/9-rin1b64ld9o9vd4f5a53dhtvtjqtb7fyxjnccilbdg.png",
    facts: [
      { label: "Technique", value: "Keyhole surgery" },
      { label: "Joints", value: "Knee, hip, shoulder, more" },
      { label: "Recovery", value: "Faster than open surgery" },
      { label: "Protocol", value: "RICE and guided exercise" },
    ],
    sections: [
      {
        type: "text",
        heading: "What is arthroscopy?",
        paragraphs: [
          "Arthroscopy, often called keyhole surgery, is used to diagnose and treat problems inside a joint. The surgeon passes a narrow tube with a fibre-optic camera through a small keyhole incision. The tiny lens and light give a clear view inside the joint, so the problem can be treated with very little disruption.",
        ],
      },
      {
        type: "list",
        heading: "What it treats",
        intro: "Arthroscopy is done on the knee, shoulder, hip, ankle, wrist, and elbow to diagnose and treat:",
        items: [
          "A torn meniscus, the cartilage cushion of the knee",
          "Damaged or worn joint cartilage",
          "Torn or unstable ligaments",
          "Inflamed joint lining",
          "Loose fragments of bone or cartilage inside the joint",
          "Scarring and stiffness inside the joint",
        ],
      },
      {
        type: "list",
        heading: "Common reasons by joint",
        intro: "Some of the most common reasons arthroscopy is recommended:",
        items: [
          "Knee: meniscus tears, cartilage damage, and ligament (ACL) injuries",
          "Shoulder: rotator cuff tears, labral tears, and impingement",
          "Ankle: cartilage injuries, impingement, and loose bodies",
        ],
      },
      {
        type: "cta",
        heading: "Think you may need arthroscopy?",
        text: "Book a consultation with Dr. Anil Raheja for a clear assessment of your joint and whether keyhole surgery is the right option for you.",
      },
      {
        type: "imageText",
        heading: "After the surgery",
        image: "/images/10-rin1bbrmi9wa1bkdedx320bnks748c1y92b68nmfuw.png",
        imageSide: "right",
        paragraphs: [
          "Your doctor or physiotherapist will guide your recovery with a simple plan built around four things.",
        ],
      },
      {
        type: "list",
        heading: "Your recovery plan",
        items: [
          "Medication to help you heal and stay comfortable.",
          "Protection, using a temporary sling or crutches to rest the joint.",
          "Exercise, with simple prescribed movements to rebuild strength.",
          "RICE: rest, ice, compression, and elevation to ease the joint and reduce swelling.",
        ],
      },
    ],
    faqs: arthroscopyFaqs,
  },

  "arthritis-treatment": {
    slug: "arthritis-treatment",
    title: "Arthritis Treatment in Delhi",
    subtitle:
      "From early diagnosis to joint-preserving care, managing the wear and tear of cartilage before it takes over your life.",
    heroImage: "/images/11-rin1ll6745xys2nshblgrx3t17md9dsgnuozueepxk.png",
    facts: [
      { label: "Diagnosis", value: "Exam, X-ray, MRI" },
      { label: "First line", value: "Lifestyle and medication" },
      { label: "Key factor", value: "Early detection" },
      { label: "Surgery", value: "Only if pain persists" },
    ],
    sections: [
      {
        type: "text",
        heading: "What is arthritis?",
        paragraphs: [
          "Arthritis is the slow wear and tear of the cartilage that cushions your joints. Cartilage is what lets a joint move smoothly. As it breaks down, the bones start to rub together, which causes pain and inflammation.",
          "Dr. Anil Raheja is a leading arthritis specialist in Delhi and offers arthritis and rheumatoid arthritis treatment at a reasonable cost.",
        ],
      },
      {
        type: "list",
        heading: "Symptoms of arthritis",
        items: [
          "Swelling in the joint",
          "Joint pain",
          "Stiffness in the morning",
          "Reduced movement in the joint",
          "Redness of the skin around the joint",
        ],
      },
      {
        type: "imageText",
        heading: "How arthritis is diagnosed",
        image: "/images/12-rin1lwg9e6dovovjtht7ve6ccravgp0u059qm77hdo.png",
        imageSide: "right",
        paragraphs: [
          "Diagnosis starts with a physical examination of the affected joint. X-rays or an MRI give a clearer picture, and in some cases blood, urine, or joint fluid is tested to find the exact type of arthritis.",
        ],
      },
      {
        type: "text",
        heading: "Getting relief from arthritis",
        paragraphs: [
          "Catching arthritis early makes a real difference. Simple steps like managing your weight, guided exercise, heat and cold therapy, and timely medication can bring a lot of relief when you start them early.",
        ],
      },
      {
        type: "cta",
        heading: "Joint pain slowing you down?",
        text: "Book a consultation with Dr. Anil Raheja for an early, accurate diagnosis and a treatment plan that protects your joints and keeps you moving.",
      },
      {
        type: "text",
        heading: "When surgery is needed",
        paragraphs: [
          "If the pain is severe and medicines or other treatments no longer help, surgery may be recommended, either to replace the joint or to correct the damage that has built up over time.",
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
      "Unicondylar knee replacement, a modern, joint-preserving option that resurfaces only the damaged compartment of the knee.",
    heroImage: "/images/6-rin0jnep9vy2caeho4ipikf0cyt8hm9qq4t5fijuw8.png",
    facts: [
      { label: "Also called", value: "Unicondylar" },
      { label: "Approach", value: "Joint-preserving" },
      { label: "Best for", value: "One-compartment arthritis" },
      { label: "Recovery", value: "Often quicker than total" },
    ],
    sections: [
      {
        type: "text",
        heading: "What is partial knee replacement?",
        paragraphs: [
          "Partial knee replacement, also called unicondylar or unicompartmental knee replacement, is a modern, joint-preserving procedure. It resurfaces only the damaged compartment of the knee and keeps the healthy bone, cartilage, and ligaments in place.",
          "If your arthritis is limited to one compartment, it is a smaller, more targeted option than a total knee replacement.",
        ],
      },
      {
        type: "list",
        heading: "Benefits of partial knee replacement",
        intro: "For the right patient, a partial replacement can offer:",
        items: [
          "A smaller incision and less bone removal",
          "Healthy cartilage and ligaments left in place",
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
          "A reasonable range of movement in the knee",
          "Pain that limits daily life despite non-surgical care",
        ],
      },
      {
        type: "cta",
        heading: "Could a partial replacement work for you?",
        text: "Book a consultation with Dr. Anil Raheja. A simple examination and X-rays will show whether a partial knee replacement is right for your knee.",
      },
      {
        type: "text",
        heading: "Recovery and rehabilitation",
        paragraphs: [
          "Many patients recover faster than after a total knee replacement, often with a shorter hospital stay. A guided physiotherapy plan supports a steady return to walking and everyday activities.",
        ],
      },
    ],
    faqs: partialKneeFaqs,
  },

  "knee-arthroscopy": {
    slug: "knee-arthroscopy",
    title: "Knee Arthroscopy in Delhi",
    subtitle:
      "Keyhole surgery for the knee. It diagnoses and treats meniscus, cartilage, and ligament problems through small incisions.",
    heroImage: "/images/9-rin1b64ld9o9vd4f5a53dhtvtjqtb7fyxjnccilbdg.png",
    facts: [
      { label: "Technique", value: "Keyhole surgery" },
      { label: "Camera", value: "Fibre-optic arthroscope" },
      { label: "Common use", value: "Meniscus and cartilage" },
      { label: "Recovery", value: "Faster than open surgery" },
    ],
    sections: [
      {
        type: "text",
        heading: "What is knee arthroscopy?",
        paragraphs: [
          "Knee arthroscopy is a keyhole procedure. A fibre-optic camera goes in through a small incision to give a clear view inside the knee, and fine instruments are used through a few more small incisions to treat the problem, with very little disruption to the surrounding tissue.",
        ],
      },
      {
        type: "list",
        heading: "What it treats",
        intro: "Knee arthroscopy is commonly used for:",
        items: [
          "A torn meniscus, the cartilage cushion of the knee",
          "Damaged or worn joint cartilage",
          "Ligament injuries, including the ACL",
          "Loose fragments of bone or cartilage",
          "Inflamed joint lining",
        ],
      },
      {
        type: "cta",
        heading: "Knee pain after a twist or injury?",
        text: "Book a consultation with Dr. Anil Raheja. An examination and scan will show what is going on inside the knee and whether keyhole surgery can help.",
      },
      {
        type: "imageText",
        heading: "Recovery after knee arthroscopy",
        image: "/images/cartilage-1.png",
        imageSide: "right",
        paragraphs: [
          "Recovery is usually faster than open surgery. Many patients start gentle walking soon after the procedure, with support as needed, and follow a guided physiotherapy plan to rebuild strength and movement.",
        ],
      },
    ],
    faqs: kneeArthroscopyFaqs,
  },

  "shoulder-arthroscopy": {
    slug: "shoulder-arthroscopy",
    title: "Shoulder Arthroscopy in Delhi",
    subtitle:
      "Keyhole surgery for the shoulder. It treats rotator cuff tears, labral tears, impingement, and instability.",
    heroImage: "/images/10-rin1bbrmi9wa1bkdedx320bnks748c1y92b68nmfuw.png",
    facts: [
      { label: "Technique", value: "Keyhole surgery" },
      { label: "Camera", value: "Fibre-optic arthroscope" },
      { label: "Common use", value: "Rotator cuff and labrum" },
      { label: "Recovery", value: "Guided rehabilitation" },
    ],
    sections: [
      {
        type: "text",
        heading: "What is shoulder arthroscopy?",
        paragraphs: [
          "Shoulder arthroscopy is a keyhole procedure. A fibre-optic camera and fine instruments are passed through small incisions to diagnose and treat problems inside the shoulder joint, with less disruption than open surgery.",
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
          "A shoulder that keeps dislocating, and instability",
          "Removal of loose bodies",
        ],
      },
      {
        type: "cta",
        heading: "Shoulder pain or a shoulder that keeps giving way?",
        text: "Book a consultation with Dr. Anil Raheja for a clear assessment of your shoulder and the best way to treat it.",
      },
      {
        type: "imageText",
        heading: "Recovery after shoulder arthroscopy",
        image: "/images/arthroscopic-surgery.png",
        imageSide: "right",
        paragraphs: [
          "A sling is usually worn for a short while to protect the shoulder as it heals. A structured physiotherapy programme then rebuilds movement and strength, and your surgeon guides your return to activities.",
        ],
      },
    ],
    faqs: shoulderArthroscopyFaqs,
  },

  "sports-injury-conservative-care": {
    slug: "sports-injury-conservative-care",
    title: "Sports Injury & Conservative Care in Delhi",
    subtitle:
      "Non-surgical treatment for sports and joint injuries, including physiotherapy, bracing, PRP injections, and guided rehabilitation.",
    heroImage: "/images/Orthopaedics-1.jpg",
    facts: [
      { label: "First approach", value: "Non-surgical" },
      { label: "Options", value: "PRP and physiotherapy" },
      { label: "Focus", value: "Restore function" },
      { label: "Surgery", value: "Only if needed" },
    ],
    sections: [
      {
        type: "text",
        heading: "Conservative care first",
        paragraphs: [
          "Many sports and joint injuries heal well without surgery. After a careful assessment, Dr. Raheja builds a personalised, non-surgical plan to ease your pain, restore movement, and get you safely back to activity.",
        ],
      },
      {
        type: "list",
        heading: "Non-surgical treatment options",
        intro: "Depending on your injury, your care may include:",
        items: [
          "Physiotherapy and guided strengthening",
          "Changing activity for a while, with bracing or support",
          "PRP (platelet-rich plasma) injections for suitable injuries",
          "Medication to ease pain and inflammation",
          "A step-by-step plan to get you back to your sport",
        ],
      },
      {
        type: "imageText",
        heading: "What are PRP injections?",
        image: "/images/cartilage-1.png",
        imageSide: "right",
        paragraphs: [
          "PRP, or platelet-rich plasma, is made from a small sample of your own blood and injected into the injured area to support your body's natural healing. It is one of several non-surgical options for suitable soft-tissue and joint injuries.",
        ],
      },
      {
        type: "cta",
        heading: "Injured and not sure what to do next?",
        text: "Book a consultation with Dr. Anil Raheja for a clear assessment and a recovery plan that gets you back to activity safely.",
      },
      {
        type: "text",
        heading: "When to see a specialist",
        paragraphs: [
          "Get it checked if you have lasting pain, swelling, or instability after an injury, or if things do not settle with rest. An early assessment gives you the safest, most effective recovery plan and picks up the rare cases where surgery is the better choice.",
        ],
      },
    ],
    faqs: sportsInjuryFaqs,
  },

  "fracture-trauma-treatment": {
    slug: "fracture-trauma-treatment",
    title: "Fracture & Trauma Treatment in Delhi",
    subtitle:
      "Prompt, expert care for fractures and orthopedic trauma, from simple breaks to complex, multiple injuries.",
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
        heading: "Expert fracture and trauma care",
        paragraphs: [
          "Injuries range from a simple break that heals in a cast to complex, unstable, or multiple injuries that need surgery. A prompt assessment and the right treatment plan give you the best chance of a full recovery.",
        ],
      },
      {
        type: "list",
        heading: "What we treat",
        intro: "Care is provided for:",
        items: [
          "Simple and displaced fractures",
          "Complex and multiple (poly) trauma",
          "Fractures around joints",
          "Injuries that need fixation with plates, screws, or nails",
          "Rehabilitation after an injury",
        ],
      },
      {
        type: "cta",
        heading: "Had a fall or an injury?",
        text: "Get it assessed early. Book a consultation with Dr. Anil Raheja for prompt fracture and trauma care and a clear plan to get you back on your feet.",
      },
      {
        type: "text",
        heading: "Treatment and recovery",
        paragraphs: [
          "Many fractures heal well with a cast or splint and close monitoring. Displaced, unstable, or complex fractures may need surgery to restore alignment and stability. After treatment, a guided rehabilitation programme rebuilds strength, movement, and confidence.",
        ],
      },
    ],
    faqs: fractureTraumaFaqs,
  },
};

export const treatmentSlugs = Object.keys(treatmentContent);
