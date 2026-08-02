import { clinics, contact, logo, site, treatmentHref } from "@/lib/site";
import type { Faq } from "@/lib/content";
import type { Article } from "@/lib/blog";
import type { TreatmentContent } from "@/lib/treatmentContent";

export const absoluteUrl = (path = "/") => {
  if (/^https?:\/\//i.test(path)) return path;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
};

export const canonicalUrl = absoluteUrl;

export const jsonLd = (schema: object | object[]) =>
  JSON.stringify(schema).replace(/</g, "\\u003c");

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const faqSchema = (faqs?: Faq[]) =>
  faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      }
    : null;

export const physicianSchema = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "@id": absoluteUrl("/#physician"),
  name: site.name,
  url: site.url,
  image: absoluteUrl("/images/optimized/dr-anil-raheja-hero-900.png"),
  logo: absoluteUrl(logo.icon),
  description: site.description,
  medicalSpecialty: ["Orthopedic", "Orthopedic Surgery"],
  telephone: contact.phoneDisplay,
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Block C-25 A, Vijay Nagar",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110033",
    addressCountry: "IN",
  },
  availableService: [
    "Hip replacement surgery",
    "Knee replacement surgery",
    "Spine surgery",
    "Arthroscopic surgery",
    "Arthritis treatment",
    "Partial knee replacement",
    "Sports injury care",
    "Fracture and trauma treatment",
  ],
  department: clinics.map((clinic) => ({
    "@type": "MedicalClinic",
    name: clinic.name,
    address: clinic.note ? `${clinic.note}, ${clinic.area}` : clinic.area,
    openingHours: `${clinic.days} ${clinic.hours}`,
  })),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  name: site.name,
  url: site.url,
  publisher: {
    "@id": absoluteUrl("/#physician"),
  },
};

export const treatmentSchema = (content: TreatmentContent) => ({
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  name: content.title,
  url: absoluteUrl(treatmentHref(content.slug)),
  image: absoluteUrl(content.heroImage),
  description: content.metaDescription || content.subtitle,
  provider: {
    "@id": absoluteUrl("/#physician"),
  },
  medicalSpecialty: "Orthopedic",
});

export const articleSchema = (article: Article) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: article.title,
  description: article.metaDescription || article.excerpt,
  image: absoluteUrl(article.image),
  datePublished: article.date,
  dateModified: article.date,
  author: {
    "@type": "Person",
    name: site.name,
    url: site.url,
  },
  publisher: {
    "@id": absoluteUrl("/#physician"),
  },
  mainEntityOfPage: absoluteUrl(`/blogs/${article.slug}`),
});
