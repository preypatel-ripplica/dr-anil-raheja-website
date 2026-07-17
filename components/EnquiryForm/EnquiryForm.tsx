"use client";

import { useState } from "react";
import { Check } from "@/components/Icons";
import styles from "./EnquiryForm.module.css";

/**
 * Compact per-treatment enquiry form ("Ask about knee replacement").
 * Pre-tagged with the treatment; front-end only, ready for CMS wiring.
 */
export default function EnquiryForm({ treatment }: { treatment: string }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className={styles.done}>
        <span className={styles.doneIcon}>
          <Check width={22} height={22} />
        </span>
        <strong>Question sent</strong>
        <p>Our team will call you back about {treatment.toLowerCase()}.</p>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <h3 className={styles.title}>Ask about {treatment.toLowerCase()}</h3>
      <p className={styles.sub}>Get a call back within one working day.</p>
      <input type="hidden" name="treatment" value={treatment} />
      <input type="text" name="name" placeholder="Your name" required aria-label="Your name" />
      <input type="tel" name="phone" placeholder="Phone number" required aria-label="Phone number" />
      <textarea name="question" rows={3} placeholder="Your question (optional)" aria-label="Your question" />
      <button type="submit" className="btn btn--primary" style={{ width: "100%" }}>
        Send Question
      </button>
    </form>
  );
}
