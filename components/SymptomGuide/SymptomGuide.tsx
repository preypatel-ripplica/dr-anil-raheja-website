"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "@/components/Icons";
import { appointmentUrl, treatmentHref } from "@/lib/site";
import Reveal from "@/components/Motion/Reveal";
import styles from "./SymptomGuide.module.css";

// -----------------------------------------------------------------------------
// Symptom Guide — 3-question guided quiz that points the visitor to the most
// relevant treatment page. Pure front-end triage for navigation (not medical
// advice); data kept as plain objects for the CMS integrator.
// -----------------------------------------------------------------------------

type Option = { label: string; value: string };

const QUESTIONS: { id: string; title: string; options: Option[] }[] = [
  {
    id: "area",
    title: "Where is the problem?",
    options: [
      { label: "Hip", value: "hip" },
      { label: "Knee", value: "knee" },
      { label: "Back / Spine", value: "spine" },
      { label: "Shoulder, ankle or other joint", value: "joint" },
      { label: "Multiple joints", value: "multi" },
    ],
  },
  {
    id: "feel",
    title: "What does it feel like?",
    options: [
      { label: "Constant pain, even at rest", value: "constant" },
      { label: "Pain on movement or walking", value: "movement" },
      { label: "Stiffness, especially mornings", value: "stiffness" },
      { label: "Instability / gives way", value: "instability" },
      { label: "Swelling and inflammation", value: "swelling" },
    ],
  },
  {
    id: "duration",
    title: "How long has it troubled you?",
    options: [
      { label: "A few days", value: "days" },
      { label: "A few weeks", value: "weeks" },
      { label: "Months", value: "months" },
      { label: "Years", value: "years" },
    ],
  },
];

type Result = {
  slug: string;
  title: string;
  note: string;
};

function recommend(answers: Record<string, string>): Result {
  const { area, feel } = answers;
  if (area === "hip") {
    return {
      slug: "hip-replacement-surgery",
      title: "Hip Replacement Surgery",
      note: "Persistent hip pain, stiffness or limping are the classic signs evaluated for hip arthroplasty — from conservative care to minimally invasive replacement.",
    };
  }
  if (area === "knee") {
    if (feel === "instability") {
      return {
        slug: "arthroscopic-surgery",
        title: "Arthroscopic Surgery",
        note: "A knee that gives way often points to a ligament injury (like ACL) — usually assessed and treated arthroscopically through keyhole incisions.",
      };
    }
    return {
      slug: "knee-replacement-surgery",
      title: "Knee Replacement Surgery",
      note: "Knee pain that limits free movement is assessed across the knee's three compartments — treatment ranges from partial to total replacement.",
    };
  }
  if (area === "spine") {
    return {
      slug: "spine-surgery",
      title: "Spine Surgery",
      note: "Back pain that persists beyond ~2 months of rest and medication deserves specialist evaluation — surgery is always the last option.",
    };
  }
  if (area === "multi" || feel === "stiffness" || feel === "swelling") {
    return {
      slug: "arthritis-treatment",
      title: "Arthritis Treatment",
      note: "Morning stiffness, swelling or pain across joints are typical arthritis signs — early diagnosis prevents most of the damage.",
    };
  }
  return {
    slug: "arthroscopic-surgery",
    title: "Arthroscopic Surgery",
    note: "Joint problems in the shoulder, ankle, wrist or elbow are commonly diagnosed and treated with keyhole arthroscopy.",
  };
}

export default function SymptomGuide() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const done = step >= QUESTIONS.length;
  const result = useMemo(() => (done ? recommend(answers) : null), [done, answers]);

  const pick = (qid: string, value: string) => {
    setAnswers((a) => ({ ...a, [qid]: value }));
    setStep((s) => s + 1);
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
  };

  const progress = Math.min((step / QUESTIONS.length) * 100, 100);
  const answeredLabels = QUESTIONS.filter((q) => answers[q.id]).map(
    (q) => q.options.find((o) => o.value === answers[q.id])?.label
  );

  return (
    <section className={`section section--mint ${styles.wrap}`}>
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow">Not sure where to start?</span>
          <h2>
            Find the right <span className="grad-text">treatment</span> in 30 seconds
          </h2>
          <p>
            Answer three quick questions and we&apos;ll point you to the most relevant
            speciality. This is guidance, not a diagnosis.
          </p>
        </Reveal>

        <Reveal delay={0.1} className={styles.card}>
          {/* progress */}
          <div className={styles.progressRow}>
            <div className={styles.progressTrack} role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
            <span className={styles.progressLabel}>
              {done ? "Done" : `Question ${step + 1} of ${QUESTIONS.length}`}
            </span>
          </div>

          {!done ? (
            <div key={step} className={styles.stepPane}>
              <h3 className={styles.q}>{QUESTIONS[step].title}</h3>
              <div className={styles.options}>
                {QUESTIONS[step].options.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    className={styles.option}
                    onClick={() => pick(QUESTIONS[step].id, o.value)}
                  >
                    {o.label}
                    <ArrowRight width={16} height={16} />
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button type="button" className={styles.back} onClick={() => setStep((s) => s - 1)}>
                  ← Back
                </button>
              )}
            </div>
          ) : (
            result && (
              <div className={styles.resultPane}>
                <span className={styles.resultBadge}>
                  <Check width={16} height={16} /> Suggested speciality
                </span>
                <h3 className={styles.resultTitle}>{result.title}</h3>
                <p className={styles.resultNote}>{result.note}</p>
                <p className={styles.summary}>
                  You told us: <em>{answeredLabels.join(" · ")}</em>
                </p>
                <div className={styles.resultCtas}>
                  <Link href={treatmentHref(result.slug)} className="btn btn--primary">
                    Read about {result.title} <ArrowRight width={17} height={17} />
                  </Link>
                  <a href={appointmentUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
                    Book a visit
                  </a>
                </div>
                <button type="button" className={styles.back} onClick={reset}>
                  ↺ Start over
                </button>
              </div>
            )
          )}
        </Reveal>
      </div>
    </section>
  );
}
