import Image from "next/image";

/**
 * Trust Logos Section - Display client/partner logos
 *
 * Approach: Simple grid of logos with Next.js Image optimization
 */
export function TrustLogos() {
  const logos = [
    { name: "Advanced Skin Medspa", logo: "/images/asm.webp" },
    { name: "Elco", logo: "/images/elco.webp" },
    { name: "HKS", logo: "/images/hks.webp" },
    { name: "HVP", logo: "/images/hvp.webp" },
    { name: "Mark Viera", logo: "/images/markviera.webp" },
    { name: "Marlon", logo: "/images/Marlon.webp" },
    { name: "Sagrah Beauty", logo: "/images/sagrah-beauty.webp" },
    { name: "Sagrah Luxe", logo: "/images/sagrah-luxe.webp" },
    { name: "Urban Flooring", logo: "/images/urban-flooring.webp" },
    { name: "Wrecktified", logo: "/images/wrecktified.webp" },
  ];

  return (
    <section className="border-y bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
          Trusted by innovative businesses
        </p>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center opacity-70 grayscale transition-opacity hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={logo.logo}
                alt={logo.name}
                width={300}
                height={120}
                className="h-24 w-auto object-contain md:h-32 lg:h-36"
              />
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-lg font-medium text-muted-foreground">
          And Many More!
        </p>
      </div>
    </section>
  );
}





