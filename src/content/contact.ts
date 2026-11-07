/**
 * Public INBS contact information and official social channels.
 * Shared data for the footer and future contact-related pages.
 * Keep display values and destinations here, not in UI components.
 */
const phones = [
  { label: '+971 50 886 6555', href: 'tel:+971508866555' },
  { label: '+971 4 221 9222', href: 'tel:+97142219222' },
] as const;

const emails = [
  { label: 'info@inbs-uae.com', href: 'mailto:info@inbs-uae.com' },
  { label: 'jalal.omar2021@gmail.com', href: 'mailto:jalal.omar2021@gmail.com' },
] as const;

export const companyContact = {
  phones,
  emails,
  // Existing single-contact consumers continue using the first listed entry.
  email: emails[0].label,
  emailHref: emails[0].href,
  phone: phones[0].label,
  phoneHref: phones[0].href,
  address: {
    en: 'Office 1720, ParkLane Tower, Business Bay, Dubai',
    ar: 'مكتب 1720، برج بارك لين، الخليج التجاري، دبي',
  },
  mapUrl: 'https://www.google.com/maps?q=Park+Lane+Tower+-+Business+Bay+-+Dubai',
} as const;

export const socialLinks = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/international-network-businessmen-services/' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/inbs_business/' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100089453280961' },
] as const;
