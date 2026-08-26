"use client";

import { useState } from "react";
import { contact } from "@/lib/site";
import { ArrowRight, Phone, Check } from "@/components/Icons";
import type { TreatmentPlanner } from "@/lib/treatmentContent";
import styles from "./TreatmentJourney.module.css";

// -----------------------------------------------------------------------------
// Plan-this-treatment-visit widget (ortho counterpart of the Tripti site's
// TreatmentJourneyWidget). Three quick choices per treatment build a focused
// visit plan + what to bring. Front-end only; data is CMS-ready.
// -----------------------------------------------------------------------------

type StepDef = {
  label: string;
  question: string;
  helper: string;
  options: { label: string; note: string }[];
};

type Path = TreatmentPlanner & {
  title: string;
  intro: string;
  steps: StepDef[];
  bring: string[];
  outcomes: string[];
};

const paths: Record<string, Path> = {
  "hip-replacement-surgery": {
    title: "Plan your hip visit",
    intro: "Pick what matters most so the consultation focuses on the right things.",
    steps: [
      {
        label: "Situation",
        question: "What best describes your hip today?",
        helper: "Choose the closest match.",
        options: [
          { label: "Pain even at rest", note: "Constant pain is a key sign the joint needs evaluation now." },
          { label: "Pain on walking", note: "We assess how far you can walk and what limits you." },
          { label: "After a fall / fracture", note: "Bring any X-rays. Timing matters after trauma." },
          { label: "Advised replacement elsewhere", note: "A second opinion visit compares your options." },
        ],
      },
      {
        label: "Decision",
        question: "What do you most need answered?",
        helper: "This becomes the visit focus.",
        options: [
          { label: "Do I really need surgery?", note: "We review what happens if you wait, and alternatives." },
          { label: "Minimal invasive option?", note: "Smaller incisions, faster recovery, if suitable for you." },
          { label: "Cost & insurance", note: "₹1.5L–₹4.5L typical range; cashless eligibility explained." },
          { label: "Recovery timeline", note: "Hospital stay, walking aid, and return to routine." },
        ],
      },
      {
        label: "Recovery",
        question: "What should the plan work around?",
        helper: "Keep it practical.",
        options: [
          { label: "Getting back to work", note: "We plan rest days and a realistic return date." },
          { label: "Living alone / stairs", note: "Home setup and support planned before admission." },
          { label: "Other health conditions", note: "BP, diabetes and heart checks folded into the plan." },
          { label: "Just want it fixed", note: "A clear surgery-to-walking schedule, end to end." },
        ],
      },
    ],
    bring: ["Hip / pelvis X-ray", "Medicine list", "Previous reports", "Insurance details"],
    outcomes: ["Surgery vs. wait decision", "Technique & implant plan", "Recovery schedule"],
  },
  "knee-replacement-surgery": {
    title: "Plan your knee visit",
    intro: "Three choices make the consultation sharper.",
    steps: [
      {
        label: "Situation",
        question: "What is your knee doing?",
        helper: "Choose the closest match.",
        options: [
          { label: "Pain climbing stairs", note: "Classic early sign, often manageable without surgery." },
          { label: "Pain on every step", note: "We check which of the three knee compartments is worn." },
          { label: "Knee gives way", note: "Instability may point to ligament injury, not arthritis." },
          { label: "Advised replacement elsewhere", note: "We compare partial vs. total and second-opinion it." },
        ],
      },
      {
        label: "Decision",
        question: "What matters most to you?",
        helper: "This becomes the visit focus.",
        options: [
          { label: "Avoid surgery if possible", note: "Medication, physio and injections come first." },
          { label: "Partial vs. total", note: "If only one compartment is worn, partial may be enough." },
          { label: "Recovery time", note: "3–5 days in hospital; real improvement at ~1 month." },
          { label: "Cost & insurance", note: "Package and cashless options explained clearly." },
        ],
      },
      {
        label: "Recovery",
        question: "What should we plan around?",
        helper: "Keep it practical.",
        options: [
          { label: "Work and commute", note: "Return-to-work timing built into the plan." },
          { label: "Stairs at home", note: "Initial weeks planned with walker/crutches in mind." },
          { label: "Sports and activity", note: "Honest talk about what the new knee can and can't do." },
          { label: "Caregiver planning", note: "What family should prepare before admission." },
        ],
      },
    ],
    bring: ["Standing knee X-ray", "MRI if available", "Medicine list", "Previous injections record"],
    outcomes: ["Compartment diagnosis", "Partial/total decision", "Rehab timeline"],
  },
  "spine-surgery": {
    title: "Plan your spine visit",
    intro: "Surgery is the last option. The visit finds the safest first one.",
    steps: [
      {
        label: "Situation",
        question: "How long has your back troubled you?",
        helper: "Duration changes the pathway.",
        options: [
          { label: "Under 2 months", note: "Most back pain settles with rest and medication in this window." },
          { label: "Over 2 months", note: "Persistent pain deserves imaging and specialist review." },
          { label: "Pain going down the leg", note: "May indicate a disc pressing a nerve and needs evaluation." },
          { label: "Advised surgery elsewhere", note: "Second opinion on whether surgery is truly needed." },
        ],
      },
      {
        label: "Decision",
        question: "What do you need answered?",
        helper: "Pick the main doubt.",
        options: [
          { label: "Can I avoid surgery?", note: "Heat/ice, therapy and medication options reviewed first." },
          { label: "What's causing it?", note: "Osteoarthritis outgrowths vs. ruptured disc. Imaging tells." },
          { label: "Is it getting worse?", note: "Warning signs that should never be ignored, explained." },
          { label: "Minimal invasive options", note: "Smaller spine procedures where indicated." },
        ],
      },
      {
        label: "Recovery",
        question: "What matters after treatment?",
        helper: "Keep it practical.",
        options: [
          { label: "Desk work return", note: "Sitting posture and phased return planned." },
          { label: "Physical job return", note: "Lifting limits and strengthening milestones set." },
          { label: "Long-term back health", note: "Exercise and habit plan to protect the spine." },
          { label: "Pain-free sleep", note: "Positioning and support until healing completes." },
        ],
      },
    ],
    bring: ["MRI / X-ray of spine", "Pain timeline notes", "Medicine list", "Previous physio records"],
    outcomes: ["Cause identified", "Surgery-vs-therapy call", "Back-care plan"],
  },
  "arthroscopic-surgery": {
    title: "Plan your arthroscopy discussion",
    intro: "Keyhole surgery suits specific problems. The visit confirms fit.",
    steps: [
      {
        label: "Situation",
        question: "Which joint is troubling you?",
        helper: "Arthroscopy works across joints.",
        options: [
          { label: "Knee", note: "Torn cartilage and ligament injuries are commonly treated." },
          { label: "Shoulder", note: "Scarring and inflamed linings respond well to keyhole work." },
          { label: "Ankle / wrist / elbow", note: "Small joints benefit most from tiny incisions." },
          { label: "Multiple / unsure", note: "Examination and X-ray locate the real problem first." },
        ],
      },
      {
        label: "Decision",
        question: "What do you want from the visit?",
        helper: "This becomes the focus.",
        options: [
          { label: "Confirm diagnosis", note: "The camera sees what scans sometimes miss." },
          { label: "Fix it same-sitting", note: "Many repairs happen during the same procedure." },
          { label: "Recovery expectations", note: "RICE protocol, slings and exercise timeline." },
          { label: "Compare to open surgery", note: "Why buttonhole incisions usually win here." },
        ],
      },
      {
        label: "Recovery",
        question: "What should we plan around?",
        helper: "Keep it practical.",
        options: [
          { label: "Sport return", note: "Milestones before returning to play, honestly set." },
          { label: "Work with hands", note: "Grip and load timelines for wrist/elbow cases." },
          { label: "Walking comfort", note: "Weight-bearing plan for knee and ankle work." },
          { label: "Minimal downtime", note: "The fastest safe path back to routine." },
        ],
      },
    ],
    bring: ["X-ray / MRI", "Injury story (when & how)", "Medicine list", "Brace or support you use"],
    outcomes: ["Keyhole suitability", "Repair plan", "Rehab milestones"],
  },
  "arthritis-treatment": {
    title: "Plan your arthritis visit",
    intro: "Early, clear answers stop arthritis from running the show.",
    steps: [
      {
        label: "Situation",
        question: "What are your joints telling you?",
        helper: "Choose the closest match.",
        options: [
          { label: "Morning stiffness", note: "A classic early arthritis sign worth investigating." },
          { label: "Swelling & redness", note: "Inflammation needs type-specific treatment." },
          { label: "Pain in multiple joints", note: "Pattern helps identify the arthritis type." },
          { label: "Known arthritis, getting worse", note: "Treatment plan likely needs an update." },
        ],
      },
      {
        label: "Decision",
        question: "What do you need to know?",
        helper: "Pick the main question.",
        options: [
          { label: "Which type is it?", note: "Exam + X-ray/MRI + blood work identify the type." },
          { label: "Can I stop the damage?", note: "Early treatment protects cartilage best." },
          { label: "Non-surgical relief", note: "Lifestyle, therapy and medication options first." },
          { label: "Is replacement coming?", note: "Honest view on if/when surgery may be needed." },
        ],
      },
      {
        label: "Recovery",
        question: "What outcome matters most?",
        helper: "Keep it practical.",
        options: [
          { label: "Daily comfort", note: "Managing stairs, chores and sitting without pain." },
          { label: "Staying active", note: "Joint-safe exercise that keeps you moving." },
          { label: "Avoiding surgery", note: "A monitoring plan that catches change early." },
          { label: "Long-term plan", note: "A written pathway for the years ahead." },
        ],
      },
    ],
    bring: ["Joint X-rays", "Blood reports if any", "Medicine list", "Symptom diary"],
    outcomes: ["Arthritis type", "Relief plan", "Monitoring schedule"],
  },
};

export default function TreatmentJourney({ slug, planner }: { slug: string; planner?: TreatmentPlanner }) {
  const path = planner ?? paths[slug] ?? paths["knee-replacement-surgery"];
  const [active, setActive] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [done, setDone] = useState(false);
  const step = path.steps[active];
  const isLast = active === path.steps.length - 1;

  const choose = (label: string) => setAnswers((a) => ({ ...a, [active]: label }));
  const next = () => {
    if (!answers[active]) return;
    if (isLast) setDone(true);
    else setActive((a) => a + 1);
  };
  const reset = () => {
    setActive(0);
    setAnswers({});
    setDone(false);
  };

  return (
    <div className={styles.widget}>
      <div className={styles.head}>
        <div>
          <span className={styles.stamp}>Plan this visit</span>
          <h2>{path.title}</h2>
          <p>{path.intro}</p>
        </div>
        <button type="button" className={styles.reset} onClick={reset}>
          ↺ Start over
        </button>
      </div>

      {/* step rail */}
      <div className={styles.rail}>
        {path.steps.map((s, i) => (
          <button
            key={s.label}
            type="button"
            className={`${styles.railBtn} ${i === active && !done ? styles.railActive : ""} ${
              answers[i] ? styles.railDone : ""
            }`}
            onClick={() => {
              setDone(false);
              setActive(i);
            }}
          >
            <span>{i + 1}</span>
            {s.label}
          </button>
        ))}
      </div>

      {!done ? (
        <div className={styles.pane} key={active}>
          <h3>{step.question}</h3>
          <p className={styles.helper}>{step.helper}</p>
          <div className={styles.options}>
            {step.options.map((o) => (
              <button
                key={o.label}
                type="button"
                className={`${styles.option} ${answers[active] === o.label ? styles.optionActive : ""}`}
                onClick={() => choose(o.label)}
                aria-pressed={answers[active] === o.label}
              >
                <strong>{o.label}</strong>
                <small>{o.note}</small>
              </button>
            ))}
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.back}
              onClick={() => setActive((a) => Math.max(a - 1, 0))}
              disabled={active === 0}
            >
              ← Back
            </button>
            <button type="button" className="btn btn--primary" onClick={next} disabled={!answers[active]}>
              {isLast ? "Show my visit plan" : "Next"} <ArrowRight width={17} height={17} />
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.pane}>
          <div className={styles.result}>
            <div className={styles.resultCol}>
              <span className={styles.resultLabel}>Your focus</span>
              <ul>
                {path.steps.map((s, i) => (
                  <li key={s.label}>
                    <Check width={15} height={15} />
                    <span>
                      <strong>{s.label}:</strong> {answers[i]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.resultCol}>
              <span className={styles.resultLabel}>Bring along</span>
              <ul>
                {path.bring.map((b) => (
                  <li key={b}>
                    <Check width={15} height={15} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.resultCol}>
              <span className={styles.resultLabel}>You leave with</span>
              <ul>
                {path.outcomes.map((o) => (
                  <li key={o}>
                    <Check width={15} height={15} />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.actions}>
            <button type="button" className={styles.back} onClick={reset}>
              ↺ Start over
            </button>
            <a href={`tel:${contact.phonePrimary}`} className="btn btn--primary">
              <Phone width={16} height={16} /> Call {contact.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
