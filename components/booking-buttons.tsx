"use client";

import { Video, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/context";
import { track } from "@/lib/analytics";

const CALENDLY_URLS = {
  virtual: "https://calendly.com/cq-marketing/discovery",
  inPerson: "https://calendly.com/cq-marketing/office-meeting",
  studio: "https://calendly.com/cq-marketing/hv-podcasting-in-studio-consult",
};

/**
 * BookingButtons — Reusable booking component used across the site.
 *
 * variant="default": Two options — Virtual Meeting or Office Visit
 * variant="studio": One option — Book a Studio Tour (in-person only)
 */
interface Props {
  variant?: "default" | "studio";
  location?: string;
  className?: string;
}

export function BookingButtons({ variant = "default", location = "unknown", className = "" }: Props) {
  const { t } = useLanguage();

  const handleClick = (type: string, url: string) => {
    track("cta_click", { cta_type: "booking", booking_type: type, location });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (variant === "studio") {
    return (
      <div className={className}>
        <Button
          size="lg"
          onClick={() => handleClick("studio_tour", CALENDLY_URLS.studio)}
        >
          <MapPin className="mr-2 h-4 w-4" />
          {t("booking.studioTour")}
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <Button
        size="lg"
        onClick={() => handleClick("virtual", CALENDLY_URLS.virtual)}
      >
        <Video className="mr-2 h-4 w-4" />
        {t("booking.virtual")}
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={() => handleClick("in_person", CALENDLY_URLS.inPerson)}
      >
        <MapPin className="mr-2 h-4 w-4" />
        {t("booking.inPerson")}
      </Button>
    </div>
  );
}
