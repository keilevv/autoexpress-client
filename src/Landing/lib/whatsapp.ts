// Número de WhatsApp — cambiar aquí para actualizar toda la web
const WHATSAPP_NUMBER = "573182066879";

interface WhatsAppLinkOptions {
  service?: string;
  center?: string;
}

export function getWhatsAppLink({ service, center }: WhatsAppLinkOptions = {}): string {
  let message: string;

  if (service) {
    message = `Hola, vengo de la web de Auto Express. Quiero cotizar: ${service}. Mi vehículo es: ____. Estoy en: ____. ¿Me ayudas?`;
  } else if (center) {
    message = `Hola, vengo de la web de Auto Express (${center}). Quiero una cotización. Mi vehículo es: ____. Estoy en: ____. ¿Me ayudas?`;
  } else {
    message = `Hola, vengo de la web de Auto Express. Quiero una cotización. Mi vehículo es: ____. Estoy en: ____. ¿Me ayudas?`;
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
