export const contactDetails = {
  email: String(import.meta.env.VITE_CONTACT_EMAIL || '').trim(),
  whatsapp: String(import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, ''),
  instagram: String(import.meta.env.VITE_INSTAGRAM_URL || '').trim(),
  behance: String(import.meta.env.VITE_BEHANCE_URL || '').trim(),
}
export const formEndpoint = String(import.meta.env.VITE_FORM_ENDPOINT || '').trim()
// Populate only with client-approved, verified content. Empty collections stay hidden.
export const trustContent: { clients: { name: string; logo: string }[]; testimonials: { quote: string; name: string; role: string }[] } = { clients: [], testimonials: [] }
