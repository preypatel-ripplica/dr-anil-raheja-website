"use client";

import { useState } from "react";
import { contact } from "@/lib/site";
import { Phone, Check, Clock, ArrowRight } from "@/components/Icons";
import Reveal from "@/components/Motion/Reveal";
import styles from "./CallPrepKit.module.css";

// -----------------------------------------------------------------------------
// Call Prep Kit — builds a one-line booking script so patients know exactly
// what to say when they phone the clinic (ortho counterpart of the Tripti
// site's ConsultationPrepKit). Front-end only.
// -----------------------------------------------------------------------------

const topics = [
  {
    label: "Joint pain",
    line: "ongoing joint pain",
    hint: "Knee, hip, shoulder or multiple joints.",
    bring: ["Any X-rays or MRI", "Medicine list"],
    goals: [
      {
        label: "Get a diagnosis",
        script: "I want to understand what is causing the pain and what tests I need.",
        ask: "What should I get checked first?",
      },
      {
        label: "Get relief",
        script: "The pain is affecting my daily routine and I want a relief plan.",
        ask: "What can reduce the pain quickly and safely?",
      },
      {
        label: "Avoid surgery",
        script: "I want to know if this can be managed without surgery.",
        ask: "What happens if I wait?",
      },
    ],
  },
  {
    label: "Surgery opinion",
    line: "a surgery opinion",
    hint: "Replacement advised, or a second opinion needed.",
    bring: ["Previous doctor's advice", "X-ray / MRI reports"],
    goals: [
      {
        label: "Confirm it's needed",
        script: "I have been advised surgery and want to confirm it is necessary.",
        ask: "Are there alternatives in my case?",
      },
      {
        label: "Compare techniques",
        script: "I want to understand minimal invasive options for my case.",
        ask: "Am I suitable for keyhole or minimal invasive surgery?",
      },
      {
        label: "Costs & insurance",
        script: "I want clarity on package cost and cashless insurance.",
        ask: "What does the package include?",
      },
    ],
  },
  {
    label: "After an injury",
    line: "a recent injury",
    hint: "Fall, sports injury, fracture or sudden pain.",
    bring: ["Injury X-rays", "Details of when and how it happened"],
    goals: [
      {
        label: "Rule out damage",
        script: "I had an injury and want to rule out serious damage.",
        ask: "Do I need an MRI or just an X-ray?",
      },
      {
        label: "Heal correctly",
        script: "I want the injury to heal correctly without long-term problems.",
        ask: "What should I avoid while it heals?",
      },
      {
        label: "Return to sport",
        script: "I want a safe plan to get back to activity.",
        ask: "When can I safely return to my sport?",
      },
    ],
  },
];

const timings = ["as soon as possible", "this week", "when convenient"];

export default function CallPrepKit() {
  const [topic, setTopic] = useState(0);
  const [goal, setGoal] = useState(0);
  const [timing, setTiming] = useState(0);
  const [step, setStep] = useState(0);
  const t = topics[topic];
  const g = t.goals[goal];
  const script = `I'm calling about ${t.line}. ${g.script} I'd like an appointment ${timings[timing]}.`;

  return (
    <section className={`section section--mint section--ruled ${styles.wrap}`}>
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Before you call</span>
          <h2>
            Know exactly <span className="mark-block">what to say</span>
          </h2>
          <p>Three taps build your booking script, no medical vocabulary needed.</p>
        </Reveal>

        <Reveal delay={0.1} className={styles.kit}>
          {step < 2 ? (
            <div className={styles.pane} key={step}>
              {step === 0 && (
                <>
                  <h3>What is this about?</h3>
                  <div className={styles.topicGrid}>
                    {topics.map((item, i) => (
                      <button
                        key={item.label}
                        type="button"
                        className={`${styles.topic} ${i === topic ? styles.topicActive : ""}`}
                        onClick={() => {
                          setTopic(i);
                          setGoal(0);
                        }}
                        aria-pressed={i === topic}
                      >
                        <strong>{item.label}</strong>
                        <small>{item.hint}</small>
                      </button>
                    ))}
                  </div>
                </>
              )}
              {step === 1 && (
                <>
                  <h3>What should the call achieve?</h3>
                  <div className={styles.goalGrid}>
                    {t.goals.map((item, i) => (
                      <button
                        key={item.label}
                        type="button"
                        className={`${styles.goal} ${i === goal ? styles.goalActive : ""}`}
                        onClick={() => setGoal(i)}
                        aria-pressed={i === goal}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <h3 className={styles.subQ}>How soon?</h3>
                  <div className={styles.goalGrid}>
                    {["Soon", "This week", "Flexible"].map((item, i) => (
                      <button
                        key={item}
                        type="button"
                        className={`${styles.goal} ${i === timing ? styles.goalActive : ""}`}
                        onClick={() => setTiming(i)}
                        aria-pressed={i === timing}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </>
              )}
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.back}
                  onClick={() => setStep((s) => Math.max(s - 1, 0))}
                  disabled={step === 0}
                >
                  ← Back
                </button>
                <button type="button" className="btn btn--primary" onClick={() => setStep(step + 1)}>
                  {step === 1 ? "Show my script" : "Next"} <ArrowRight width={17} height={17} />
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.pane}>
              <div className={styles.note}>
                <span className={styles.noteLabel}>Say this when calling</span>
                <p className={styles.script}>“{script}”</p>
                <div className={styles.noteMeta}>
                  <span>
                    <Check width={16} height={16} />
                    <strong>Ask:</strong> {g.ask}
                  </span>
                  <span>
                    <Clock width={16} height={16} />
                    <strong>Bring:</strong> {t.bring.join(", ")}
                  </span>
                </div>
              </div>
              <div className={styles.actions}>
                <button type="button" className={styles.back} onClick={() => setStep(0)}>
                  ↺ Start over
                </button>
                <a href={`tel:${contact.phonePrimary}`} className="btn btn--primary">
                  <Phone width={16} height={16} /> Call now
                </a>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
