import type { Faq } from "@/lib/content";
import { hipFaqs } from "@/lib/content";

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
    title: "Hip Replacement Surgery in Delhi",
    subtitle:
      "Replacing a worn or damaged hip with an artificial joint — relieving pain and restoring full hip function.",
    heroImage: "/images/2-rin034ev3rcl0zmgzeyaj1290zhgft7s4lqwaot0kw.png",
    facts: [
      { label: "Surgery time", value: "~1–2 hours" },
      { label: "Hospital stay", value: "3–5 days" },
      { label: "Technique", value: "Minimal invasive available" },
      { label: "Cost range", value: "₹1.5L – ₹4.5L" },
    ],
    sections: [
      {
        type: "text",
        heading: "What is hip replacement?",
        paragraphs: [
          "Hip replacement, also known as hip arthroplasty, is a procedure wherein a worn out or damaged hip is replaced with an artificial joint (prosthesis). This is a major surgery done when a person has suffered a hip fracture or has severe pain from arthritis. A hemi (half) or complete replacement is performed depending on the condition.",
          "The aim of surgery is to relieve hip pain and comprehensively improve hip function. The surgeon removes the femoral head and replaces it with an artificial one.",
        ],
      },
      {
        type: "list",
        heading: "Symptoms that need hip replacement",
        items: [
          "Severe pain in the hip",
          "Stiffness of the hip",
          "Limited mobility",
          "Walking with a limp",
          "Deformity of hip",
        ],
      },
      {
        type: "list",
        heading: "Reasons for hip replacement",
        items: [
          "Old age — hip arthritis is most common above 50, when osteoporosis and cartilage wear expose the bone within the joint.",
          "Excess body weight increases load on the joint and accelerates wear.",
          "Family history — hip arthritis can run in the family.",
          "Severe traumatic injury or fracture of the joint.",
        ],
      },
      {
        type: "imageText",
        heading: "How is it diagnosed?",
        image: "/images/3-rin03a1w8rja4s6k9jrml74zwdi3fea1h3rpj0tp9k.png",
        imageSide: "right",
        paragraphs: [
          "The doctor makes a physical examination of the affected area and orders X-rays for a clear picture of the injury. These are kept on record for later comparison — to track how much progress treatment or surgery has made.",
        ],
      },
      {
        type: "text",
        heading: "The procedure",
        paragraphs: [
          "The worn cartilage and bone of the hip joint are removed and replaced with artificial material. The hip is a ball-and-socket joint: the socket (acetabulum) is refitted with a durable cup, and the femoral head is replaced with a prosthetic ball anchored in the thigh bone.",
        ],
      },
      {
        type: "imageText",
        heading: "Minimal invasive hip replacement",
        image: "/images/4-rin03uqcf4calkun34o2hnycn7y6ift7b2jazz9lvk.png",
        imageSide: "left",
        paragraphs: [
          "One of the latest techniques, taking less time in surgery. The surgeon makes two small incisions of about 5 cm and 9 cm and uses small implements to remove the damaged bone and place the new prosthesis — making recovery faster with smaller scars.",
        ],
      },
      {
        type: "text",
        heading: "Other alternatives",
        paragraphs: [
          "Hip replacement is a major procedure and should be done as recommended by your surgeon. In early stages, simple steps can help avoid surgery: losing weight, and therapist-guided exercises to reduce discomfort.",
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
        heading: "Recovery after knee surgery",
        paragraphs: [
          "After surgery the patient stays 3 to 5 days in the hospital. Pain is relieved quickly, but full improvement is noticed after about one month. Since the recovering knee cannot yet support complete body weight, a walker or crutches are used in the initial weeks.",
        ],
      },
      {
        type: "list",
        heading: "Simple steps for speedy recovery",
        intro: "Precautions that protect the new joint while it heals:",
        items: [
          "Avoid kneeling and squatting after the surgery.",
          "Climbing stairs should be minimised initially.",
          "While lying in bed, keep the knee as straight as possible.",
          "Prefer straight-back chairs; avoid recliners.",
          "Remove rugs and loose materials from the floor to avoid falls.",
        ],
      },
      {
        type: "text",
        heading: "Risks — and why they're rare",
        paragraphs: [
          "After a total knee replacement, high-impact sports and jogging are no longer advised. Side effects like blood clotting, infection or scarring are possible but rare — and every precaution is taken to prevent them. Our knee replacement practice provides surgery at reasonable cost.",
        ],
      },
    ],
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
        intro: "Arthroscopy is performed on the knee, hip, shoulder, ankle, wrist and elbow — for:",
        items: [
          "Inflamed joint linings",
          "Damaged or torn cartilage",
          "Torn ligaments",
          "Carpal tunnel syndrome",
          "Scarring within the joint",
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
  },
};

export const treatmentSlugs = Object.keys(treatmentContent);
