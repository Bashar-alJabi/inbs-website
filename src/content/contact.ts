/**
 * Public INBS contact information and official social channels.
 * Shared data for the footer and future contact-related pages.
 * Keep display values and destinations here, not in UI components.
 */
export const companyContact = {
  email: 'info@inbs-uae.com',
  emailHref: 'mailto:info@inbs-uae.com',
  phone: '+971 50 886 6555',
  phoneHref: 'tel:+971508866555',
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
