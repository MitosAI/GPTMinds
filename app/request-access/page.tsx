"use client";

import { FormEvent, useState } from "react";
import { CircleCheck } from "lucide-react";
import { Logo } from "../components";

export default function Page() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const form = event.currentTarget;

    try {
      const response = await fetch("/api/access-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw new Error("Submission failed");
      setSent(true);
      form.reset();
    } catch {
      setError("We couldn’t submit your request. Please try again, or email us directly if the problem continues.");
    } finally {
      setSubmitting(false);
    }
  }

  return <main className="accessPage"><div className="accessInfo"><Logo light/><span>EARLY ACCESS</span><h1>Build the decision layer your business is missing.</h1><p>We’re working hands-on with a small number of service businesses. Tell us where judgment still depends on the owner.</p><ul><li><CircleCheck/> Direct collaboration with the founding team</li><li><CircleCheck/> A customer-specific first version</li><li><CircleCheck/> Honest, early-stage product development</li></ul><small>GPTMinds · Decision infrastructure for small business</small></div><div className="accessForm">{sent?<div className="success"><CircleCheck/><h2>Thank you.</h2><p>We’ll review your note and reach out if there’s a strong fit for our current build phase.</p></div>:<form onSubmit={submitRequest}><span>REQUEST ACCESS</span><h2>Tell us about your business.</h2><label>Name<input required name="name" placeholder="Your name"/></label><label>Work email<input required type="email" name="email" placeholder="you@company.com"/></label><label>Business type<input required name="type" placeholder="e.g. dental practice"/></label><label>Where does judgment get stuck?<textarea required name="problem" placeholder="Describe a recurring decision that still needs the owner..." rows={5}/></label>{error&&<p className="formError" role="alert">{error}</p>}<button disabled={submitting} type="submit">{submitting?"Submitting…":"Submit request →"}</button><small>By submitting, you agree to our privacy policy.</small></form>}</div></main>;
}
