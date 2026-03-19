// TODO: integrar Meta Pixel
// TODO: integrar Google Analytics
// Evento sugerido para Pixel: Lead (cuando hacen click a WhatsApp)

/**
 * Tracking interno simple.
 * Reemplazar console.log con la integración real de analytics.
 */
export function trackCTA(label: string) {
  console.log(`[AutoExpress CTA] ${label}`, {
    timestamp: new Date().toISOString(),
  });

  // TODO: Meta Pixel
  // if (typeof window !== 'undefined' && (window as any).fbq) {
  //   (window as any).fbq('track', 'Lead', { content_name: label });
  // }

  // TODO: Google Analytics
  // if (typeof window !== 'undefined' && (window as any).gtag) {
  //   (window as any).gtag('event', 'generate_lead', { event_label: label });
  // }
}
