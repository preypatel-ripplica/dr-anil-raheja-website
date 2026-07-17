// -----------------------------------------------------------------------------
// Central site configuration for Dr. Anil Raheja (Orthopedics).
// Plain data so the CMS integrator can swap these for CMS queries later.
// All values transcribed from the live dranilraheja.com.
// -----------------------------------------------------------------------------

export const site = {
  name: "Dr. Anil Raheja",
  credentials: "MS (Ortho), M.Ch (Ortho)",
  tagline: "Director Orthopedics — Apollo Spectra Hospital & Jeewan Mala Hospital",
  title: "Best Orthopedic Doctor in Delhi | #1 Orthopedic Surgeon - Dr Anil",
  description:
    "Dr. Anil Raheja is a renowned orthopedic surgeon in Delhi with 28 years of experience and 12,000+ surgeries — joint replacement, spine surgery, arthroscopy and arthritis care.",
  url: "https://www.dranilraheja.com",
};

export const contact = {
  phonePrimary: "9667694000",
  phoneDisplay: "+91-96676 94000",
  email: "dranilraheja@gmail.com",
  address:
    "Block C-25 A, Ground Floor, Vijay Nagar, New Delhi, Delhi 110033",
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
    hours: "6:00 PM – 9:00 PM",
    note: "Block C-25 A, Ground Floor, Vijay Nagar",
  },
  {
    id: "apollo-spectra",
    name: "Apollo Spectra Hospitals",
    area: "Karol Bagh, Delhi",
    days: "Mon – Sat",
    hours: "11:00 AM – 2:00 PM",
    note: "Director Orthopedics",
  },
  {
    id: "jeewan-mala",
    name: "Jeewan Mala Hospital",
    area: "Karol Bagh, Delhi",
    days: "Mon – Sat",
    hours: "11:00 AM – 2:00 PM",
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
    children: [
      { label: "Hip Replacement Surgery", href: "/hip-replacement-surgery" },
      { label: "Knee Replacement Surgery", href: "/knee-replacement-surgery" },
      { label: "Spine Surgery", href: "/spine-surgery" },
      { label: "Arthroscopic Surgery", href: "/arthroscopic-surgery" },
      { label: "Arthritis Treatment", href: "/arthritis-treatment" },
    ],
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

export const stats = [
  { value: 28, suffix: "+", label: "Years of Experience" },
  { value: 12000, suffix: "+", label: "Surgeries Performed" },
  { value: 212, suffix: "+", label: "Google Reviews" },
  { value: 3, suffix: "", label: "Clinic Locations" },
];

export type Treatment = {
  slug: string;
  title: string;
  short: string;
  excerpt: string;
  image: string;
};

// The five treatments in the header/footer menu and home services grid.
export const treatments: Treatment[] = [
  {
    slug: "hip-replacement-surgery",
    title: "Hip Replacement Surgery",
    short: "Hip Replacement",
    excerpt:
      "Hip replacement (hip arthroplasty) replaces a worn out or damaged hip with an artificial joint — done for hip fractures or severe arthritis pain.",
    image: "/images/2-rin034ev3rcl0zmgzeyaj1290zhgft7s4lqwaot0kw.png",
  },
  {
    slug: "knee-replacement-surgery",
    title: "Knee Replacement Surgery",
    short: "Knee Replacement",
    excerpt:
      "Recommended for arthritis or injury that stops the knee moving freely — total or partial replacement across the knee's three compartments.",
    image: "/images/5-rin0je0bdjmwhyt078hteyafkng66b5z5arspmipr4.png",
  },
  {
    slug: "spine-surgery",
    title: "Spine Surgery",
    short: "Spine Surgery",
    excerpt:
      "A major operation performed only when extreme need arises — for severe, persistent back pain after non-surgical options are exhausted.",
    image: "/images/7-rin0voqasihiuwa7q4jk2gejqza95myqfnjbrwt9e0.png",
  },
  {
    slug: "arthroscopic-surgery",
    title: "Arthroscopic Surgery",
    short: "Arthroscopy",
    excerpt:
      "Keyhole diagnosis and treatment of joint problems via a fiber-optic camera through a buttonhole-sized incision.",
    image: "/images/9-rin1b64ld9o9vd4f5a53dhtvtjqtb7fyxjnccilbdg.png",
  },
  {
    slug: "arthritis-treatment",
    title: "Arthritis Treatment",
    short: "Arthritis Care",
    excerpt:
      "Care for the slow wear and tear of joint cartilage — from early diagnosis and relief plans to surgery when medication no longer helps.",
    image: "/images/11-rin1ll6745xys2nshblgrx3t17md9dsgnuozueepxk.png",
  },
];
