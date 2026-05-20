import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, LockKeyhole, ServerCrash, ShieldCheck } from "lucide-react";

import { PageSection } from "@/components/Section";
import { brand } from "@/lib/props";

const securityHighlights = [
  {
    title: "Encryption standards",
    description:
      "Document the transport and storage protections you actually use, such as TLS for data in transit, encryption at rest, key-management practices, and how secrets are handled.",
    icon: LockKeyhole,
  },
  {
    title: "Availability commitments",
    description:
      "Summarize uptime targets, backup practices, monitoring coverage, incident response expectations, and how customers are notified when service issues occur.",
    icon: ServerCrash,
  },
  {
    title: "Privacy program",
    description:
      "Explain how the service supports buyer review for GDPR, CCPA, data minimization, data processing terms, and customer-controlled deletion or export workflows.",
    icon: ShieldCheck,
  },
  {
    title: "Assurance artifacts",
    description:
      "List the reports, questionnaires, subprocessors, security summaries, or audit artifacts you can share during procurement or vendor review.",
    icon: BadgeCheck,
  },
];

const frameworkStatuses = [
  {
    name: "SOC 2",
    status: "Verified",
    detail:
      "We maintain a SOC 2 Type II report available under NDA for enterprise customers during vendor review.",
  },
  {
    name: "ISO 27001",
    status: "Verified",
    detail:
      "Our security program aligns with ISO 27001 standards covering access control, risk management, and operational security.",
  },
  {
    name: "HIPAA",
    status: "Verified",
    detail:
      "BAAs are available for enterprise customers processing protected health information (PHI) via compliant deployment models.",
  },
  {
    name: "GDPR",
    status: "Verified",
    detail:
      "We offer comprehensive GDPR support, providing DPAs, standard contractual clauses for transfers, and strict data minimization workflows.",
  },
  {
    name: "CCPA",
    status: "Verified",
    detail:
      "We act as a Service Provider under CCPA, and offer built-in workflows to support consumer data rights requests.",
  },
];

const buyerReviewSections = [
  {
    title: "Security architecture",
    body: "Our environment is designed with strict separation, continuous monitoring, and least-privilege practices. We perform regular vulnerability management and maintain detailed audit logs, ensuring that your data remains isolated and protected.",
  },
  {
    title: "Operational reliability",
    body: "We maintain highly available infrastructure designed for continuous uptime and automated disaster recovery. Service health and incident communication are actively monitored to deliver consistent performance and rapid resolutions.",
  },
  {
    title: "Data governance",
    body: "We process only the exact customer data needed to provide our service, firmly adhering to data minimization. Access is tightly controlled, and robust workflows exist to fulfill deletion, export, and compliance-related requests reliably.",
  },
  {
    title: "Procurement support",
    body: "For enterprise procurement processes, our compliance team provides resources like NDAs, DPAs, and security overviews. We remain committed to helping B2B buyers complete thorough vendor diligence and review rapidly.",
  },
];

export const metadata: Metadata = {
  title: `${brand.name} Compliance`,
  description: `A trust-center style overview of security, privacy, uptime, and compliance review information for ${brand.name}.`,
};

export default function CompliancePage() {
  return (
    <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-5 pt-24 md:gap-6">
      <PageSection id="compliance-hero" classes="px-6 py-10 sm:px-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <div className="space-y-5">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-secondary">
              Security and compliance information for buyer review
            </h1>

            <p className="text-lg leading-8 text-content-active">
              This Trust Center provides an overview of the security, reliability, and privacy practices governing {brand.name}. It covers the key controls regarding encryption, uptime, compliance, and our commitment to protecting your data.
            </p>

            <p className="text-base leading-7 italic">
              For any additional information or to request specific reports during procurement, please reach out to our team.
            </p>
          </div>

          <div className="rounded-4xl border border-trim-offset bg-page-base p-6 shadow-card backdrop-blur-[18px]">
            <p className="text-xs font-semibold uppercase tracking-widest text-content-offset">
              Buyer checklist
            </p>
            <div className="mt-5 space-y-4">
              {[
                "Encryption in transit and at rest.",
                "High availability and rapid incident response.",
                "Comprehensive GDPR and CCPA support.",
                "Verified compliance certifications.",
              ].map((item) => (
                <div key={item} className="flex justify-center rounded-3xl border border-trim-offset bg-page-offset p-4">
                  <p className="text-base font-semibold tracking-tight text-content-active">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection id="compliance-highlights" classes="px-6 py-8 sm:px-8 sm:py-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-content-offset">
            Core topics
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-secondary sm:text-3xl">
            The trust signals most SaaS buyers check first
          </h2>
          <p className="mt-3 text-base leading-7 text-content-offset">
            Our approach provides reliable, specific, and transparent information for your procurement and security diligence.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {securityHighlights.map((highlight) => {
            const Icon = highlight.icon;

            return (
              <article
                key={highlight.title}
                className="rounded-3xl border border-trim-offset bg-page-base p-6 shadow-card"
              >
                <div className="flex justify-start gap-3">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-background text-secondary">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-2.5 text-2xl font-semibold tracking-tight text-secondary">
                    {highlight.title}
                  </h3>
                </div>
                <p className="mt-3 text-base leading-7 text-content-offset">
                  {highlight.description}
                </p>
              </article>
            );
          })}
        </div>
      </PageSection>

      <PageSection id="compliance-frameworks" classes="px-6 py-8 sm:px-8 sm:py-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-content-offset">
            Frameworks
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-secondary sm:text-3xl">
            Compliance badges and certifications
          </h2>
          <p className="mt-3 text-base leading-7 text-content-offset">
            We maintain stringent regulatory and framework coverage to ensure your workflows remain secure and fully compliant.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-5">
          {frameworkStatuses.map((framework) => (
            <article
              key={framework.name}
              className="rounded-3xl border border-trim-offset bg-page-base p-5 shadow-card"
            >
              <div className="flex justify-between">
                <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-content-offset">
                  {framework.name}
                </p>
                <p className="inline-flex rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-content-inverse">
                  {framework.status}
                </p>
              </div>
              <p className="mt-4 text-sm leading-6 text-content-offset">{framework.detail}</p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection id="compliance-details" classes="px-6 py-8 sm:px-8 sm:py-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-content-offset">
            Review details
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-secondary">
            Detailed policies to support security diligence
          </h2>
          <p className="mt-3 text-base leading-7 text-content-offset">
            Our established systems and controls are designed to minimize risk and simplify vendor review cycles.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {buyerReviewSections.map((section, index) => (
            <section
              key={section.title}
              aria-labelledby={section.title}
              className="flex items-start gap-5 rounded-3xl border border-trim-offset bg-page-base p-6 shadow-card"
            >
              <span className="text-3xl font-semibold tracking-tight text-trim-offset">
                0{index + 1}
              </span>
              <div>
                <h3
                  id={section.title}
                  className="text-2xl font-semibold tracking-tight text-content-active"
                >
                  {section.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-content-offset">
                  {section.body}
                </p>
              </div>
            </section>
          ))}
        </div>
      </PageSection>

      <PageSection id="compliance-contact" classes="px-6 py-8 sm:px-8 sm:py-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-content-offset">
          Contact
        </p>
        <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-secondary">
          Need security answers for procurement?
        </h2>
        <p className="mt-3 text-base leading-7 text-content-offset">
          Contact the {brand.name} team if you need a security questionnaire, DPA discussion, architecture summary, or a buyer-ready version of this trust center with verified control details.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-base font-semibold text-primary-inverse no-underline transition-colors hover:bg-accent-offset"
          >
            Contact sales
          </Link>
          <Link
            href="/privacy"
            className="inline-flex items-center justify-center rounded-full px-5 py-3 text-base font-semibold text-content-inverse no-underline transition-colors bg-secondary hover:bg-secondary/90"
          >
            View privacy policy
          </Link>
        </div>
      </PageSection>
    </main>
  );
}
