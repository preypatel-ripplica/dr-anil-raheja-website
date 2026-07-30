// -----------------------------------------------------------------------------
// Central site configuration for Dr. Anil Raheja (Orthopedics).
// Plain data so the CMS integrator can swap these for CMS queries later.
// All values transcribed from the live dranilraheja.com.
// -----------------------------------------------------------------------------
import navTreatments from "./nav-treatments.json";

export const site = {
  name: "Dr. Anil Raheja",
  credentials: "MS (Ortho), M.Ch (Ortho)",
  tagline: "Director Orthopedics — Apollo Spectra Hospital & Jeewan Mala Hospital",
  title: "Hip Replacement Surgeon in Delhi | Dr. Anil Raheja — Direct Anterior Approach",
  description:
    "Dr. Anil Raheja is a leading Hip Replacement Surgeon in Delhi with 30+ years of experience, 100k+ happy patients and 25,000+ surgeries, specialising in the Direct Anterior Approach (DAA) and minimally invasive hip surgery, plus knee replacement, spine surgery, arthroscopy and arthritis care.",
  url: "https://www.dranilraheja.com",
};

export const appointmentUrl =
  "https://book.healthplix.com/dr-tripti-raheja-gynaecologist-single-storey-";

export const logo = {
  icon: "/images/dr-anil-raheja-logo-icon.svg",
};

export const contact = {
  phonePrimary: "9667694000",
  phoneDisplay: "+91-96676 94000",
  email: "dranilraheja@gmail.com",
  address:
    "Block C-25 A, Vijay Nagar, New Delhi, Delhi 110033",
  youtube: "https://youtube.com/@dranilrahejaortho",
  mapEmbed:
    "https://www.google.com/maps?q=Raheja+Ortho+And+Gynae+Clinic+C-25A+Vijay+Nagar+New+Delhi&output=embed",
};

export type Clinic = {
  id: string;
  name: string;
  area: string;
  days: string;
  hours: string;
  note?: string;
};

export const clinics: Clinic[] = [
  {
    id: "vijay-nagar",
    name: "Raheja Ortho And Gynae Clinic",
    area: "Vijay Nagar, Delhi",
    days: "Mon – Sat",
    hours: "5:00 PM – 8:00 PM",
    note: "Block C-25 A, Vijay Nagar",
  },
  {
    id: "apollo-spectra",
    name: "Apollo Spectra Hospitals",
    area: "Karol Bagh, Delhi",
    days: "Mon – Sat",
    hours: "10:30 AM – 12:00 PM",
    note: "Director Orthopedics",
  },
  {
    id: "jeewan-mala",
    name: "Jeewan Mala Hospital",
    area: "Karol Bagh, Delhi",
    days: "Mon – Sat",
    hours: "12:30 PM – 2:00 PM",
  },
];

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  {
    label: "Specialities & Services",
    href: "#",
    children: navTreatments as { label: string; href: string }[],
  },
  {
    label: "Media",
    href: "#",
    children: [
      { label: "Photo Gallery", href: "/photo-gallery" },
      { label: "Our Videos", href: "/our-videos" },
      { label: "Patient Testimonials", href: "/patient-testimonials" },
    ],
  },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact us", href: "/contact-us" },
];

export const treatmentHref = (slug: string) => `/treatment/${slug}`;

export const stats = [
  { value: 30, suffix: "+", label: "Years of Experience" },
  { value: 100000, suffix: "+", label: "Happy Patients" },
  { value: 25000, suffix: "+", label: "Surgeries Performed" },
  { value: 3, suffix: "", label: "Clinic Locations" },
];

export type Treatment = {
  slug: string;
  title: string;
  short: string;
  excerpt: string;
  image: string;
};

// Treatments shown in the header/footer menu and home services grid.
export const treatments: Treatment[] = [
  {
    slug: "hip-replacement-surgery",
    title: "Hip Replacement Surgery",
    short: "Hip Replacement",
    excerpt:
      "Primary, complex and revision hip replacement with a special focus on the muscle-sparing Direct Anterior Approach (DAA).",
    image: "/images/2-rin034ev3rcl0zmgzeyaj1290zhgft7s4lqwaot0kw.png",
  },
  {
    slug: "knee-replacement-surgery",
    title: "Knee Replacement Surgery",
    short: "Knee Replacement",
    excerpt:
      "Total and partial knee replacement for arthritis or injury that limits walking, movement and daily activities.",
    image: "/images/5-rin0je0bdjmwhyt078hteyafkng66b5z5arspmipr4.png",
  },
  {
    slug: "spine-surgery",
    title: "Spine Surgery",
    short: "Spine Surgery",
    excerpt:
      "Evaluation and surgical care for selected spine conditions after non-surgical treatment options have been considered.",
    image: "/images/7-rin0voqasihiuwa7q4jk2gejqza95myqfnjbrwt9e0.png",
  },
  {
    slug: "arthroscopic-surgery",
    title: "Arthroscopic Surgery",
    short: "Arthroscopy",
    excerpt:
      "Keyhole surgery for selected joint problems using a camera and fine instruments through small incisions.",
    image: "/images/9-rin1b64ld9o9vd4f5a53dhtvtjqtb7fyxjnccilbdg.png",
  },
  {
    slug: "arthritis-treatment",
    title: "Arthritis Treatment",
    short: "Arthritis Care",
    excerpt:
      "Diagnosis and treatment for painful joint wear, from medication and lifestyle guidance to surgery when needed.",
    image: "/images/11-rin1ll6745xys2nshblgrx3t17md9dsgnuozueepxk.png",
  },
  {
    slug: "partial-knee-replacement",
    title: "Partial Knee Replacement",
    short: "Partial Knee",
    excerpt:
      "Unicondylar knee replacement for arthritis limited to one compartment, preserving healthy ligaments and bone where appropriate.",
    image: "/images/6-rin0jnep9vy2caeho4ipikf0cyt8hm9qq4t5fijuw8.png",
  },
  {
    slug: "sports-injury-conservative-care",
    title: "Sports Injury & Conservative Care",
    short: "Sports Injury",
    excerpt:
      "Assessment and non-surgical care for sprains, ligament injuries, tendon pain and activity-related joint problems.",
    image: "/images/Orthopaedics-1.jpg",
  },
  {
    slug: "fracture-trauma-treatment",
    title: "Fracture & Trauma Treatment",
    short: "Fracture & Trauma",
    excerpt:
      "Prompt assessment and treatment for simple, displaced and complex fractures, followed by structured rehabilitation.",
    image: "/images/ffcf7431-82e0-415e-901e-f91cdd3a67f4-1.png",
  },
];
