import MainHeader from "@/components/layout/MainHeader";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/layout/ContactSection";
import WhatsAppButtonSticky from "@/components/WhatsAppButtonSticky";
import type { CenterSlug } from "@/data/centers";

interface MainLayoutProps {
  children: React.ReactNode;
  activeCenter?: CenterSlug;
  showContact?: boolean;
}

export default function MainLayout({
  children,
  showContact = true,
}: MainLayoutProps) {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {showContact && <ContactSection />}
      <Footer />
      <WhatsAppButtonSticky />
    </>
  );
}
